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
import	{WalletConnectConnector}												from	'@web3-react-fork/walletconnect-connector';
import	useLocalStorage															from	'hook/useLocalStorage';
import	useClientEffect															from	'hook/useClientEffect';

const walletType = {NONE: -1, METAMASK: 0, WALLET_CONNECT: 1};
const Web3Context = createContext();

function getProvider() {
	return new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools');
}

const	isClient = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
export const Web3ContextApp = ({children}) => {
	const	{activate, active, library, account, chainId, deactivate} = useWeb3React();
	const	[lastWallet, set_lastWallet] = useLocalStorage('lastWallet', walletType.NONE);
	const	[chainTime, set_chainTime] = useState(-1);

	useEffect(() => {
		if (library)
			library.getBlock().then(e => set_chainTime(e.timestamp));
	}, [library]);

	const switchChain = useCallback(() => {
		if (Number(chainId) === 250) {
			return;
		}
		if (!library || !active) {
			console.error('Not initialized');
			return;
		}
		library.send('wallet_addEthereumChain', [{
			'chainId': '0xFA',
			'blockExplorerUrls': ['https://ftmscan.com'],
			'chainName': 'Fantom Opera',
			'rpcUrls': ['https://rpc.ftm.tools'],
			'nativeCurrency': {
				'name': 'Fantom',
				'symbol': 'FTM',
				'decimals': 18
			}
		}, account]).catch((error) => console.error(error));
	}, [active, account, chainId, library]);

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
			} catch (error) {
				console.error(error);
				set_lastWallet(walletType.NONE);
			}
		}
	}

	useClientEffect(() => {
		if (!active && lastWallet !== walletType.NONE) {
			connect(lastWallet);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isClient, active]);

	return (
		<Web3Context.Provider
			value={{
				address: account,
				connect,
				deactivate,
				walletType,
				chainID: Number(chainId || 0),
				active: active && (Number(chainId) === 250 || Number(chainId) === 1337),
				switchChain,
				chainTime,
				provider: library,
				getProvider
			}}>
			{children}
		</Web3Context.Provider>
	);
};

export const useWeb3 = () => useContext(Web3Context);
export default useWeb3;
