/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 5th 2021
**	@Filename:				useWeb3.js
******************************************************************************/

import	React, {useState, useEffect, useContext, createContext, useCallback}	from	'react';
import	{ethers}																from	'ethers';
import	QRCodeModal																from	'@walletconnect/qrcode-modal';
import	{useWeb3React}															from	'@web3-react-fork/core';
import	{InjectedConnector}														from	'@web3-react-fork/injected-connector';
import	{ConnectorEvent}														from	'@web3-react-fork/types';
import	{WalletConnectConnector}												from	'@web3-react-fork/walletconnect-connector';
import	useLocalStorage															from	'hook/useLocalStorage';
import	useClientEffect															from	'hook/useClientEffect';
import	{toAddress}																from	'utils';
import	useSWR				 													from	'swr';

let fakeFetcherNonce = 0;
const fakeFetcher = () => fakeFetcherNonce++;

const walletType = {NONE: -1, METAMASK: 0, WALLET_CONNECT: 1};
const Web3Context = createContext();

function getProvider() {
	return new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools');
}

export const Web3ContextApp = ({children}) => {
	const	isClient = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	const	web3 = useWeb3React();
	const	[initialized, set_initialized] = useState(false);
	const	[provider, set_provider] = useState(undefined);
	const	[address, set_address] = useLocalStorage('address', '');
	const	[chainID, set_chainID] = useLocalStorage('chainID', -1);
	const	[lastWallet, set_lastWallet] = useLocalStorage('lastWallet', walletType.NONE);
	const	[, set_nonce] = useState(0);
	const	[chainTime, set_chainTime] = useState(new Date());
	const	[isActivated, set_isActivated] = useState(false);
	const	[currentBlock, set_currentBlock] = useState(0);

	const	{activate, active, library, connector, account, chainId, deactivate} = web3;
	const	{data: chainTimeNonce} = useSWR('chainTime', fakeFetcher, {
		refreshInterval: 2 * 1000,
		revalidateIfStale: true,
		revalidateOnMount: true,
		revalidateOnFocus: true,
		revalidateOnReconnect: true,
		refreshWhenHidden: true,
		dedupingInterval: 1.5 * 1000,
	});

	const onUpdate = useCallback(async (update) => {
		if (update.provider) {
			set_provider(library);
		}
		if (update.chainId) {
			if (update.chainId.startsWith('0x')) {
				set_chainID(parseInt(update.chainId, 16));
			} else {
				set_chainID(Number(update.chainId));
			}
		}
		if (update.account) {
			set_address(toAddress(update.account));
		}
		set_nonce(n => n + 1);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [library]);

	const onDesactivate = useCallback(() => {
		set_chainID(-1);
		set_provider(undefined);
		set_lastWallet(walletType.NONE);
		set_address('');
		if (connector !== undefined) {
			connector
				.off(ConnectorEvent.Update, onUpdate)
				.off(ConnectorEvent.Deactivate, onDesactivate);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [connector]);

	const onActivate = useCallback(async () => {
		set_provider(library);
		set_address(toAddress(account));
		library.getNetwork().then(e => set_chainID(e.chainId));
		library.getNetwork().then(e => set_chainTime(e.timestamp));
		library.on('block', (block) => set_currentBlock(block));

		connector
			.on(ConnectorEvent.Update, onUpdate)
			.on(ConnectorEvent.Deactivate, onDesactivate);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account, chainId, connector, library, onDesactivate, onUpdate]);

	const switchChain = useCallback(() => {
		if (Number(chainID) === 250) {
			return;
		}
		if (!provider || !active) {
			console.error('Not initialized');
			return;
		}
		provider.send('wallet_addEthereumChain', [{
			'chainId': '0xFA',
			'blockExplorerUrls': ['https://ftmscan.com'],
			'chainName': 'Fantom Opera',
			'rpcUrls': ['https://rpc.ftm.tools'],
			'nativeCurrency': {
				'name': 'Fantom',
				'symbol': 'FTM',
				'decimals': 18
			}
		}, address]).catch((error) => console.error(error));
	}, [active, address, chainID, provider]);

	/**************************************************************************
	**	connect
	**	What should we do when the user choose to connect it's wallet ?
	**	Based on the providerType (AKA Metamask or WalletConnect), differents
	**	actions should be done.
	**	Then, depending on the providerType, a similar action, but different
	**	code is executed to set :
	**	- The provider for the web3 actions
	**	- The current address/account
	**	- The current chain
	**	Moreover, we are starting to listen to events (disconnect, changeAccount
	**	or changeChain).
	**************************************************************************/
	async function connect(_providerType, desactivate = true) {
		if (_providerType === walletType.METAMASK) {
			if (active && !desactivate) {
				deactivate();
			}
			await (window.ethereum.send)('eth_accounts');

			const	injected = new InjectedConnector();
			await activate(injected, undefined, true);
			set_lastWallet(walletType.METAMASK);
			set_isActivated(true);
		} else if (_providerType === walletType.WALLET_CONNECT) {
			if (active) {
				deactivate();
			}
			const walletconnect = new WalletConnectConnector({
				rpc: {1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', 250: 'https://rpc.ftm.tools'},
				chainId: 250,
				bridge: 'https://bridge.walletconnect.org',
				pollingInterval: 12000,
				qrcodeModal: QRCodeModal,
				qrcode: true,
			});
			try {
				await activate(walletconnect, undefined, true);
				set_lastWallet(walletType.WALLET_CONNECT);
				set_isActivated(true);
			} catch (error) {
				console.error(error);
				set_lastWallet(walletType.NONE);
			}
		}
	}

	useClientEffect(() => {
		if (active) {
			set_initialized(true);
			onActivate();
		}
	}, [isClient, active, onActivate]);

	useClientEffect(() => {
		if (!active && lastWallet !== walletType.NONE) {
			connect(lastWallet);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isClient, active]);

	useEffect(() => {
		setTimeout(() => set_initialized(true), 1000);
	}, []);

	useEffect(() => {
		if (provider)
			provider.getBlock().then(e => set_chainTime(e.timestamp));
		else
			getProvider().getBlock().then(e => set_chainTime(e.timestamp));
	}, [chainTimeNonce, provider]);

	return (
		<Web3Context.Provider
			value={{
				address,
				connect,
				deactivate,
				onDesactivate,
				walletType,
				chainID,
				isActivated,
				active: active && (Number(chainID) === 250 || Number(chainID) === 1337),
				initialized,
				switchChain,
				chainTime,
				provider,
				getProvider,
				currentRPCProvider: provider,
				currentBlock
			}}>
			{children}
		</Web3Context.Provider>
	);
};

export const useWeb3 = () => useContext(Web3Context);
export default useWeb3;
