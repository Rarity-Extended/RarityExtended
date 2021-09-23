/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				bank.js
******************************************************************************/

import	React, {useState, useEffect}	from	'react';
import	Image							from	'next/image';
import	{ethers}						from	'ethers';
import	useSWR							from	'swr';
import	useWeb3							from	'contexts/useWeb3';
import	Typer							from	'components/Typer';
import	DialogBox						from	'components/DialogBox';
import	{fetcher}						from	'utils';
import	{apeInVault, apeOutVault, depositInVault, withdrawFromVault}					from	'utils/actions';

function	NPCHeadline({selectedVault, isTxPending, hasDeposited, hasDepositError, isDeposit}) {
	const	[nonce, set_nonce] = useState(0);
	const	[npcTextIndex, set_npcTextIndex] = useState(0);
	
	useEffect(() => {
		set_npcTextIndex(0);
		set_nonce(n => n+1);
	}, [selectedVault?.id, isTxPending, hasDeposited, hasDepositError, isDeposit]);

	const	renderNPCText = () => {
		if (selectedVault?.id >= 0) {
			if (isTxPending) {
				return (
					<Typer>{'GREAT CHOICE! LET\'S PROCESS YOUR TRANSACTION'}</Typer>
				);
			}
			if (hasDeposited) {
				return (
					<>
						<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>{'THANK YOU FOR YOUR DEPOSIT! THIS IS A GREAT INVESTMENT! TRUST ME!'}</Typer>
					</>
				);
			}
			if (hasDepositError) {
				return (
					<Typer>{'OH YOU CHANGED YOUR MIND!'}</Typer>
				);
			}
			if (!isDeposit) {
				if (Number(selectedVault?.share || 0) > 0) {
					return (
						<>
							<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
								{'OH, YOU WOULD LIKE TO GET YOUR INVESTMENT BACK? HOW MANY '}
							</Typer>
							<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
								{selectedVault?.token}
							</Typer></span>
							<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
								{' DO YOU WANT TO WITHDRAW?'}
							</Typer>
						</>
					);
				}
			}
			if (Number(selectedVault?.balance || 0) === 0) {
				if (Number(selectedVault?.share || 0) > 0) {
					return (
						<>
							<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
								{'OH, YOU WOULD LIKE TO GET YOUR INVESTMENT BACK? HOW MANY '}
							</Typer>
							<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
								{selectedVault?.token}
							</Typer></span>
							<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
								{' DO YOU WANT TO WITHDRAW?'}
							</Typer>
						</>
					);
				}
				return (
					<>
						<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
							{'I WOULD LOVE TO, TRAVELER! BUT YOU DON\'T HAVE ANY '}
						</Typer>
						<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
							{selectedVault?.token}
						</Typer></span>
						<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
							{'!'}
						</Typer>
					</>
				);
			}
			return (
				<>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
						{'GREAT CHOICE, TRAVELER! YOU HAVE '}
					</Typer>
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
						{`${Number(selectedVault?.balance || 0).toFixed(4)} ${selectedVault?.token}`}
					</Typer></span>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
						{', HOW MUCH WILL YOU DEPOSIT IN '}
					</Typer>
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
						{selectedVault?.name}
					</Typer></span>
				</>
			);
		}
		return (
			<>
				<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
					{'LOOK WHO IS HERE! WELCOME TO '}
				</Typer>
				<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
					{'IVAN’S BANK'}
				</Typer></span>
				<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
					{', MIGHTY HERO! SO YOU’VE EARNED SOME COINS IN YOUR LEGENDARY ADVENTURES, HAVEN’T YOU? I CAN EARN YOU EVEN MORE! JUST DEPOSIT IN THE ONE OF THESE VERY NICE VAULTS...'}
				</Typer>
			</>
		);
	};
	return (
		<h1 key={nonce} className={'text-sm md:text-lg leading-normal md:leading-10'}>
			{renderNPCText()}
		</h1>
	);
}

function	Index() {
	const	{provider, address} = useWeb3();
	const	[selectedVault, set_selectedVault] = useState({id: -1});
	const	[ftmBalance, set_ftmBalance] = useState(0);
	const	[daiBalance, set_daiBalance] = useState(0);
	const	[daiShare, set_daiShare] = useState(0);
	const	[daiShareRaw, set_daiShareRaw] = useState(0);
	const	[ftmShare, set_ftmShare] = useState(0);
	const	[ftmShareRaw, set_ftmShareRaw] = useState(0);
	const	[isDeposit, set_isDeposit] = useState(1);
	const	{data: vaultTheFantom} = useSWR(`https://ape.tax/api/specificApy?address=${process.env.FTM_VAULT_ADDR}&network=250`, fetcher);
	const	{data: vaultDaiHard} = useSWR(`https://ape.tax/api/specificApy?address=${process.env.DAI_VAULT_ADDR}&network=250`, fetcher);

	const	[nonce, set_nonce] = useState(0);
	const	[isTxPending, set_isTxPending] = useState(false);
	const	[hasDeposited, set_hasDeposited] = useState(false);
	const	[hasDepositError, set_hasDepositError] = useState(false);

	useEffect(() => {
		if (provider && address) {
			provider.getBalance(address).then(b => set_ftmBalance(ethers.utils.formatEther(b)));
			const	DAI_CONTRACT = new ethers.Contract(
				process.env.DAI_TOKEN_ADDR, [
					'function balanceOf(address) view returns (uint256)',
				],
				provider
			);
			const	THE_FANTOM_VAULT_CONTRACT = new ethers.Contract(
				process.env.FTM_VAULT_ADDR, [
					'function balanceOf(address) view returns (uint256)',
					'function pricePerShare() view returns (uint256)',
				],
				provider
			);
			const	DAI_HARD_VAULT_CONTRACT = new ethers.Contract(
				process.env.DAI_VAULT_ADDR, [
					'function balanceOf(address) view returns (uint256)',
					'function pricePerShare() view returns (uint256)',
				],
				provider
			);
			DAI_CONTRACT.balanceOf(address).then(b => set_daiBalance(ethers.utils.formatEther(b)));
			Promise.all([
				DAI_HARD_VAULT_CONTRACT.balanceOf(address),
				DAI_HARD_VAULT_CONTRACT.pricePerShare()
			]).then(([_balance, _share]) => {
				set_daiShareRaw(_balance);
				set_daiShare((ethers.utils.formatEther(_balance) * ethers.utils.formatEther(_share)).toString());
			});
			Promise.all([
				THE_FANTOM_VAULT_CONTRACT.balanceOf(address),
				THE_FANTOM_VAULT_CONTRACT.pricePerShare()
			]).then(([_balance, _share]) => {
				set_ftmShareRaw(_balance);
				set_ftmShare((ethers.utils.formatEther(_balance) * ethers.utils.formatEther(_share)).toString());
			});
		}
	}, [address, provider, nonce]);

	useEffect(() => {
		set_isTxPending(false);
		set_hasDeposited(false);
		set_hasDepositError(false);
	}, [selectedVault?.id]);

	function	onTxExecuted({error}) {
		if (error) {
			set_hasDepositError(true);
			return console.error(error);
		}
		set_nonce(n => n+1);
		set_hasDepositError(false);
		set_hasDeposited(true);
		set_isTxPending(false);
		set_selectedVault({id: -1});
	}
	function	performApeIn(amount) {
		if (isTxPending)
			return;
		set_isTxPending(true);
		set_hasDeposited(false);
		apeInVault({
			provider,
			contractAddress: selectedVault?.zap,
			amount: amount
		}, (e) => {
			set_isTxPending(false);
			onTxExecuted(e);
		});	
	}
	function	performApeOut(amount) {
		if (isTxPending)
			return;
		set_isTxPending(true);
		set_hasDeposited(false);
		apeOutVault({
			provider,
			address,
			zapAddress: selectedVault?.zap,
			contractAddress: selectedVault?.address,
			amount: amount,
			wantTokenName: selectedVault?.token
		}, (e) => {
			set_isTxPending(false);
			onTxExecuted(e);
		});	
	}
	function	performDeposit(amount) {
		if (isTxPending)
			return;
		set_isTxPending(true);
		set_hasDeposited(false);
		depositInVault({
			provider,
			address,
			contractAddress: selectedVault?.address,
			amount: amount,
			wantTokenAddress: selectedVault?.wantAddress,
			wantTokenName: selectedVault?.token
		}, (e) => {
			set_isTxPending(false);
			onTxExecuted(e);
		});	
	}
	function	performWithdraw(amount) {
		if (isTxPending)
			return;
		set_isTxPending(true);
		set_hasDeposited(false);
		withdrawFromVault({
			provider,
			contractAddress: selectedVault?.address,
			amount: amount,
			wantTokenName: selectedVault?.token
		}, (e) => {
			set_isTxPending(false);
			onTxExecuted(e);
		});
	}

	function	renderNPCDialog() {
		if (selectedVault?.id === 1 && (Number(selectedVault?.balance || 0) > 0 || Number(selectedVault?.share || 0) > 0)) {
			if ((Number(selectedVault?.balance || 0) === 0 && Number(selectedVault?.share || 0) > 0) || !isDeposit) {
				return (
					<DialogBox
						options={[
							{label: 'Withdraw 100%', onClick: () => performApeOut((selectedVault?.shareRaw))},
							{label: 'Withdraw 75%', onClick: () => performApeOut((selectedVault?.shareRaw).mul(75).div(100))},
							{label: 'Withdraw 50%', onClick: () => performApeOut((selectedVault?.shareRaw).mul(50).div(100))},
							{label: 'Withdraw 25%', onClick: () => performApeOut((selectedVault?.shareRaw).mul(25).div(100))},
							{label: 'Nevermind', onClick: () => {
								if (!isDeposit) {
									return set_isDeposit(true);
								}
								set_selectedVault({id: -1});
							}},
						]} />
				);
			}
			if (Number(selectedVault?.share || 0) === 0) {
				return (
					<DialogBox
						options={[
							{label: 'Deposit 75%', onClick: () => performApeIn(ethers.utils.parseEther(selectedVault?.balance).mul(75).div(100))},
							{label: 'Deposit 50%', onClick: () => performApeIn(ethers.utils.parseEther(selectedVault?.balance).mul(50).div(100))},
							{label: 'Deposit 25%', onClick: () => performApeIn(ethers.utils.parseEther(selectedVault?.balance).mul(25).div(100))},
							{label: 'Nevermind', onClick: () => set_selectedVault({id: -1})},
						]} />
				);
			}
			return (
				<DialogBox
					options={[
						{label: 'Deposit 75%', onClick: () => performApeIn(ethers.utils.parseEther(selectedVault?.balance).mul(75).div(100))},
						{label: 'Deposit 50%', onClick: () => performApeIn(ethers.utils.parseEther(selectedVault?.balance).mul(50).div(100))},
						{label: 'Deposit 25%', onClick: () => performApeIn(ethers.utils.parseEther(selectedVault?.balance).mul(25).div(100))},
						{label: 'I want to withdraw', onClick: () => set_isDeposit(false)},
						{label: 'Nevermind', onClick: () => set_selectedVault({id: -1})},
					]} />
			);
		}
		if (selectedVault?.id === 2 && (Number(selectedVault?.balance || 0) > 0 || Number(selectedVault?.share || 0) > 0)) {
			if ((Number(selectedVault?.balance || 0) === 0 && Number(selectedVault?.share || 0) > 0) || !isDeposit) {
				return (
					<DialogBox
						options={[
							{label: 'Withdraw 100%', onClick: () => performWithdraw(selectedVault.shareRaw)},
							{label: 'Withdraw 75%', onClick: () => performWithdraw((selectedVault?.shareRaw).mul(75).div(100))},
							{label: 'Withdraw 50%', onClick: () => performWithdraw((selectedVault?.shareRaw).mul(50).div(100))},
							{label: 'Withdraw 25%', onClick: () => performWithdraw((selectedVault?.shareRaw).mul(25).div(100))},
							{label: 'Nevermind', onClick: () => {
								if (!isDeposit) {
									return set_isDeposit(true);
								}
								set_selectedVault({id: -1});
							}},
						]} />
				);
			}
			if (Number(selectedVault?.share || 0) === 0) {
				return (
					<DialogBox
						options={[
							{label: 'Deposit 100%', onClick: () => performDeposit(ethers.utils.parseEther(selectedVault?.balance))},
							{label: 'Deposit 75%', onClick: () => performDeposit(ethers.utils.parseEther(selectedVault?.balance).mul(75).div(100))},
							{label: 'Deposit 50%', onClick: () => performDeposit(ethers.utils.parseEther(selectedVault?.balance).mul(50).div(100))},
							{label: 'Deposit 25%', onClick: () => performDeposit(ethers.utils.parseEther(selectedVault?.balance).mul(25).div(100))},
							{label: 'Nevermind', onClick: () => set_selectedVault({id: -1})},
						]} />
				);
			}
			return (
				<DialogBox
					options={[
						{label: 'Deposit 100%', onClick: () => performDeposit(ethers.utils.parseEther(selectedVault?.balance))},
						{label: 'Deposit 75%', onClick: () => performDeposit(ethers.utils.parseEther(selectedVault?.balance).mul(75).div(100))},
						{label: 'Deposit 50%', onClick: () => performDeposit(ethers.utils.parseEther(selectedVault?.balance).mul(50).div(100))},
						{label: 'Deposit 25%', onClick: () => performDeposit(ethers.utils.parseEther(selectedVault?.balance).mul(25).div(100))},
						{label: 'I want to withdraw', onClick: () => set_isDeposit(false)},
						{label: 'Nevermind', onClick: () => set_selectedVault({id: -1})},
					]} />
			);
		}
		return (
			<div className={'py-6 px-8 border-4 border-solid border-black dark:border-dark-100 mt-0 text-sm mb-8'}>
				<div className={'flex flex-row items-center text-megaxs text-black dark:text-white text-opacity-60 mb-4'}>
					<div className={'w-4/12'}><p>{'Vault:'}</p></div>
					<div className={'w-2/12'}><p>{'Token:'}</p></div>
					<div className={'w-2/12'}><p>{'APY:'}</p></div>
					<div className={'w-2/12'}><p>{'Available:'}</p></div>
					<div className={'w-2/12'}><p>{'In Vault:'}</p></div>
				</div>
				<div
					onClick={() => set_selectedVault({
						id: 1,
						token: 'FTM',
						name: 'The Fantom',
						address: process.env.FTM_VAULT_ADDR,
						zap: process.env.ZAP_VAULT_ADDR,
						wantAddress: process.env.WFTM_TOKEN_ADDR,
						balance: ftmBalance,
						share: ftmShare,
						shareRaw: ftmShareRaw
					})}
					className={`py-4 flex flex-row items-center text-xs text-black dark:text-white group ${selectedVault?.id === 1 ? 'bg-gray-principal dark:bg-dark-100' : ''} hover:bg-gray-principal dark:hover:bg-dark-100 cursor-pointer -ml-4 px-2`}>
					<span className={`inline mb-1 mr-2 group-hover:opacity-100 opacity-5 ${selectedVault?.id === 1 ? 'opacity-100' : ''}`} style={{cursor: 'pointer'}}>{'>'}</span>

					<div className={'w-4/12'}><p>{'The Fantom'}</p></div>
					<div className={'w-2/12'}><p>{'wFTM'}</p></div>
					<div className={'w-2/12'}><p>{vaultTheFantom?.data?.week}</p></div>
					<div className={'w-2/12'}><p>{Number(ftmBalance || 0)?.toFixed(2)}</p></div>
					<div className={'w-2/12'}><p>{Number(ftmShare || 0)?.toFixed(2)}</p></div>
				</div>
				<div
					onClick={() => set_selectedVault({
						id: 2,
						token: 'DAI',
						name: 'Fantom\'s Dai Hard',
						address: process.env.DAI_VAULT_ADDR,
						wantAddress: process.env.DAI_TOKEN_ADDR,
						balance: daiBalance,
						share: daiShare,
						shareRaw: daiShareRaw
					})}
					className={`py-4 flex flex-row items-center text-xs text-black dark:text-white group ${selectedVault?.id === 2 ? 'bg-gray-principal dark:bg-dark-100' : ''} hover:bg-gray-principal dark:hover:bg-dark-100 cursor-pointer -ml-4 px-2`}>
					<span className={`inline mb-1 mr-2 group-hover:opacity-100 opacity-5 ${selectedVault?.id === 2 ? 'opacity-100' : ''}`} style={{cursor: 'pointer'}}>{'>'}</span>

					<div className={'w-4/12'}><p>{'Fantom\'s Dai Hard'}</p></div>
					<div className={'w-2/12'}><p>{'DAI'}</p></div>
					<div className={'w-2/12'}><p>{vaultDaiHard?.data?.week}</p></div>
					<div className={'w-2/12'}><p>{Number(daiBalance || 0)?.toFixed(2)}</p></div>
					<div className={'w-2/12'}><p>{Number(daiShare || 0)?.toFixed(2)}</p></div>
				</div>
			</div>
		);
	}

	return (
		<section className={'mt-12 max-w-full'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
				<div className={'flex flex-col md:flex-row items-center md:items-center mb-8 md:mb-8'}>
					<div className={'w-auto md:w-64 mr-0 md:mr-16'} style={{minWidth: 256}}>
						<Image
							src={'/avatar/ivan.gif'}
							loading={'eager'}
							quality={100}
							width={256}
							height={256} />
					</div>
					<NPCHeadline
						selectedVault={selectedVault}
						isTxPending={isTxPending}
						hasDeposited={hasDeposited}
						hasDepositError={hasDepositError}
						isDeposit={isDeposit}
					/>
				</div>
				{renderNPCDialog()}
			</div>
		</section>
	);		
}

export default Index;
