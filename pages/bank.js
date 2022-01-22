/* eslint-disable no-unused-vars */
/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				bank.js
******************************************************************************/

import	React, {useState}				from	'react';
import	{ethers}						from	'ethers';
import	{Contract}						from	'ethcall';
import	useSWR							from	'swr';
import	Template						from	'components/templates/Adventurer';
import	useWeb3							from	'contexts/useWeb3';
import	{fetcher}						from	'utils';
import	{apeInVault, apeOutVault, depositInVault, withdrawFromVault}					from	'utils/actions/vaults';
import	{newEthCallProvider}			from	'utils';

const	VAULT_ABI = [
	{
		'inputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
		'name': 'balanceOf',
		'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [],
		'name': 'pricePerShare',
		'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
		'stateMutability': 'view',
		'type': 'function'
	}
];

function	BankCard({vault, situation, name, onDeposit}) {
	const	apy = vault?.apy?.net_apy * 100;

	return (
		<div className={'col-span-1 w-full box p-4 overflow-hidden'}>
			<div className={'bg-light-600 dark:bg-dark-600 -mx-4 -mt-4 py-3 mb-6'}>
				<h1 className={'font-nordic text-4xl text-plain opacity-80 text-center'}>{name}</h1>
			</div>
			<h2 className={'font-nordic text-3xl text-tag-warning text-center'}>
				{`${(apy).toFixed(2)}%`}
			</h2>
			<div className={'grid grid-cols-2 my-4'}>
				<div className={'font-story text-sm  normal-case'}>
					<p className={'text-plain opacity-20'}>{'In Wallet'}</p>
					<p className={'text-base'}>{Number(situation?.inWallet || 0).toFixed(2)}</p>
				</div>
				<div className={'font-story text-sm normal-case'}>
					<p className={'text-plain opacity-20'}>{'In Vault'}</p>
					<p className={'text-base'}>{Number(situation?.inVault || 0).toFixed(2)}</p>
				</div>
			</div>

			<div className={'font-story text-sm normal-case mt-8'}>
				<p className={'text-plain opacity-20'}>{'Deposit'}</p>
			</div>
			<div className={'grid grid-cols-2 mt-2 gap-x-4 gap-y-2'}>
				<div
					onClick={() => onDeposit(situation?.inWalletRaw[0])}
					className={'bg-light-600 dark:bg-dark-600 bg-opacity-60 rounded-md hover:bg-opacity-100 transition-visibility cursor-pointer font-story text-base text-center normal-case py-2'}>
					<p className={'text-plain'}>{'25%'}</p>
				</div>
				<div
					onClick={() => onDeposit(situation?.inWalletRaw[1])}
					className={'bg-light-600 dark:bg-dark-600 bg-opacity-60 rounded-md hover:bg-opacity-100 transition-visibility cursor-pointer font-story text-base text-center normal-case py-2'}>
					<p className={'text-plain'}>{'50%'}</p>
				</div>
				<div
					onClick={() => onDeposit(situation?.inWalletRaw[2])}
					className={'bg-light-600 dark:bg-dark-600 bg-opacity-60 rounded-md hover:bg-opacity-100 transition-visibility cursor-pointer font-story text-base text-center normal-case py-2'}>
					<p className={'text-plain'}>{'75%'}</p>
				</div>
				{name === 'FTM' ? null : <div
					onClick={() => onDeposit(situation?.inWalletRaw[3])}
					className={'bg-light-600 dark:bg-dark-600 bg-opacity-60 rounded-md hover:bg-opacity-100 transition-visibility cursor-pointer font-story text-base text-center normal-case py-2'}>
					<p className={'text-plain'}>{'100%'}</p>
				</div>}
			</div>
		</div>
	);
}

function	Index() {
	const	{provider, chainID, address} = useWeb3();
	const	[selectedVault, set_selectedVault] = useState({id: -1});
	const	[bankSituation, set_bankSituation] = useState({});
	const	[isTxPending, set_isTxPending] = useState(false);
	const	{data: vaults} = useSWR('https://api.yearn.finance/v1/chains/250/vaults/all', fetcher);

	const	fetchVaultsPositions = React.useCallback(async () => {
		const	vaults = [
			['0x0DEC85e74A92c52b7F708c4B10207D9560CEFaf0', 18],
			['0x637eC617c86D24E421328e6CAEa1d92114892439', 18],
			['0x0A0b23D9786963DE69CB2447dC125c49929419d8', 18],
			['0xEF0210eB96c7EB36AF8ed1c20306462764935607', 6],
			['0x148c05caf1Bb09B5670f00D511718f733C54bC4c', 6],
		];
		const	wants = [
			['0xEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', 18],
			['0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E', 18],
			['0x82f0B8B456c1A451378467398982d4834b6829c1', 18],
			['0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', 6],
			['0x049d68029688eAbF473097a2fC38ef61633A3C7A', 6],
		];
		const	ethcallProvider = await newEthCallProvider(provider, Number(chainID) === 1337);
		const	calls = [];
		for (let index = 0; index < vaults.length; index++) {
			const vault = vaults[index][0];
			const vaultContract = new Contract(vault, VAULT_ABI);
			calls.push(vaultContract.balanceOf(address));
			calls.push(vaultContract.pricePerShare());
		}
		for (let index = 0; index < wants.length; index++) {
			const want = wants[index][0];
			if (want === '0xEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE') {
				calls.push(ethcallProvider.getEthBalance(address));
				continue;
			}
			const wantContract = new Contract(want, VAULT_ABI);
			calls.push(wantContract.balanceOf(address));
		}

		const	callResults = await ethcallProvider.tryAll(calls);
		const	_bankSituation = {};
		let		rIndex = 0;
		let		wantIndex = (vaults.length * 2);
		for (let index = 0; index < vaults.length; index++) {
			const vault = vaults[index];
			const wantBalance = callResults[wantIndex++];
			_bankSituation[vault[0]] = {
				inVault: ethers.utils.formatUnits(callResults[rIndex++], vault[1]) * ethers.utils.formatUnits(callResults[rIndex++], vault[1]),
				inWallet: ethers.utils.formatUnits(wantBalance, vault[1]),
				inWalletRaw: [
					wantBalance.mul(25).div(100),
					wantBalance.mul(50).div(100),
					wantBalance.mul(75).div(100),
					wantBalance,
				],
			};
		}

		console.log(_bankSituation);
		set_bankSituation(_bankSituation);
	}, [provider, address, chainID]);
	React.useEffect(() => fetchVaultsPositions(), [fetchVaultsPositions]);

	function	performApeIn(amount) {
		if (isTxPending)
			return;
		set_isTxPending(true);
		apeInVault({
			provider,
			contractAddress: selectedVault?.zap,
			amount: amount
		}, () => {
			set_isTxPending(false);
			fetchVaultsPositions();
		});	
	}
	function	performApeOut(amount) {
		if (isTxPending)
			return;
		set_isTxPending(true);
		apeOutVault({
			provider,
			address,
			zapAddress: selectedVault?.zap,
			contractAddress: selectedVault?.address,
			amount: amount,
			wantTokenName: selectedVault?.token
		}, () => {
			set_isTxPending(false);
			fetchVaultsPositions();
		});	
	}
	function	performDeposit(vault, want, wantName, amount) {
		if (isTxPending)
			return;
		set_isTxPending(true);
		depositInVault({
			provider,
			address,
			contractAddress: vault,
			amount: amount,
			wantTokenAddress: want,
			wantTokenName: wantName
		}, () => {
			set_isTxPending(false);
			fetchVaultsPositions();
		});	
	}
	function	performWithdraw(amount) {
		if (isTxPending)
			return;
		set_isTxPending(true);
		withdrawFromVault({
			provider,
			contractAddress: selectedVault?.address,
			amount: amount,
			wantTokenName: selectedVault?.token
		}, () => {
			set_isTxPending(false);
			fetchVaultsPositions();
		});
	}


	return (
		<div className={'flex flex-col max-w-full'}>
			<div className={'grid grid-cols-1 md:grid-cols-5 w-full gap-4 md:gap-6'}>
				<BankCard
					name={'FTM'}
					vault={vaults?.find(e => e.address === '0x0DEC85e74A92c52b7F708c4B10207D9560CEFaf0') || {}}
					situation={bankSituation['0x0DEC85e74A92c52b7F708c4B10207D9560CEFaf0']} />
				<BankCard
					name={'DAI'}
					onDeposit={(amount) => {
						performDeposit(
							'0x637eC617c86D24E421328e6CAEa1d92114892439',
							'0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E',
							'DAI',
							amount
						);
					}}
					vault={vaults?.find(e => e.address === '0x637eC617c86D24E421328e6CAEa1d92114892439') || {}}
					situation={bankSituation['0x637eC617c86D24E421328e6CAEa1d92114892439']} />
				<BankCard
					name={'MIM'}
					onDeposit={(amount) => {
						performDeposit(
							'0x0A0b23D9786963DE69CB2447dC125c49929419d8',
							'0x82f0B8B456c1A451378467398982d4834b6829c1',
							'MIM',
							amount
						);
					}}
					vault={vaults?.find(e => e.address === '0x0A0b23D9786963DE69CB2447dC125c49929419d8') || {}}
					situation={bankSituation['0x0A0b23D9786963DE69CB2447dC125c49929419d8']} />
				<BankCard
					name={'USDC'}
					onDeposit={(amount) => {
						performDeposit(
							'0xEF0210eB96c7EB36AF8ed1c20306462764935607',
							'0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
							'USDC',
							amount
						);
					}}
					vault={vaults?.find(e => e.address === '0xEF0210eB96c7EB36AF8ed1c20306462764935607') || {}}
					situation={bankSituation['0xEF0210eB96c7EB36AF8ed1c20306462764935607']} />
				<BankCard
					name={'USDT'}
					onDeposit={(amount) => {
						performDeposit(
							'0x148c05caf1Bb09B5670f00D511718f733C54bC4c',
							'0x049d68029688eAbF473097a2fC38ef61633A3C7A',
							'USDT',
							amount
						);
					}}
					vault={vaults?.find(e => e.address === '0x148c05caf1Bb09B5670f00D511718f733C54bC4c') || {}}
					situation={bankSituation['0x148c05caf1Bb09B5670f00D511718f733C54bC4c']} />
			</div>
			<div className={'text-sx text-50 font-story normal-case mt-8'}>
				{'The Bank is powered by '}
				<a className={'font-bold cursor-pointer hover:underline'} href={'https://yearn.finance.com'} target={'_blank'} rel={'noreferrer'}>{'Yearn Finance'}</a>
				{'. You check details about the Vaults and the Strategies and withdraw your funds on Yearn\'s website.'}

			</div>
		</div>
	);		
}

Index.getLayout = function getLayout(page) {
	return (
		<Template>
			{page}
		</Template>
	);
};


export default Index;
