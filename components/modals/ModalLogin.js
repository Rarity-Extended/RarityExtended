/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday August 31st 2021
**	@Filename:				ModalLogin.js
******************************************************************************/

import	React, {Fragment, useRef}		from	'react';
import	{Dialog, Transition}			from	'@headlessui/react';
import	useWeb3							from	'contexts/useWeb3';

function	LoginBox({set_open}) {
	const	{connect, walletType} = useWeb3();

	return (
		<div className={'box'}>
			<div className={'p-6 space-y-4'}>
				<div
					onClick={() => {
						connect(walletType.METAMASK);
						set_open(false);
					}}
					className={'flex flex-col p-6 text-center hover:shadow-sm transition-colors cursor-pointer bg-600 hover-bg-900 flex-center'}>
					<div className={'text-5xl web3modal-icon'}>{'🦊'}</div>
					<div className={'mt-2 mb-1 text-xl font-bold text-plain'}>{'MetaMask'}</div>
					<div className={'mt-2 text-xs text-plain'}>{'Connect to your MetaMask Wallet'}</div>
				</div>
				<div
					onClick={() => {
						connect(walletType.WALLET_CONNECT);
						set_open(false);
					}}
					className={'flex flex-col p-6 text-center hover:shadow-sm transition-colors cursor-pointer bg-600 hover-bg-900 flex-center'}>
					<div className={'web3modal-icon'}>
						<div className={'text-5xl web3modal-icon'} style={{filter: 'hue-rotate(250deg)'}}>{'👛'}</div>
					</div>
					<div className={'mt-2 mb-1 text-xl font-bold text-plain'}>{'WalletConnect'}</div>
					<div className={'mt-2 text-xs text-plain'}>{'Scan with WalletConnect'}</div>
				</div>
			</div>
		</div>
	);
}
function	ModalLogin({open, set_open}) {
	const	walletConnectRef = useRef();

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as={'div'}
				static
				className={'overflow-y-auto fixed inset-0 z-10 font-title uppercase'}
				style={{zIndex: 9999999}}
				initialFocus={walletConnectRef}
				open={open}
				onClose={set_open}>
				<div className={'flex justify-center items-end px-4 pt-4 pb-20 min-h-screen text-center sm:block sm:p-0'}>
					<Transition.Child
						as={Fragment}
						enter={'ease-out duration-300'} enterFrom={'opacity-0'} enterTo={'opacity-100'}
						leave={'ease-in duration-200'} leaveFrom={'opacity-100'} leaveTo={'opacity-0'}>
						<Dialog.Overlay className={'fixed inset-0 bg-black/50 transition-opacity'} />
					</Transition.Child>

					<span className={'hidden sm:inline-block sm:h-screen sm:align-middle'} aria-hidden={'true'}>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter={'ease-out duration-300'}
						enterFrom={'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}
						enterTo={'opacity-100 translate-y-0 sm:scale-100'}
						leave={'ease-in duration-200'}
						leaveFrom={'opacity-100 translate-y-0 sm:scale-100'}
						leaveTo={'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}>
						<div ref={walletConnectRef} className={'absolute inset-0 mx-auto mt-20 sm:w-full sm:max-w-lg md:mb-96'}>
							<LoginBox set_open={set_open} />
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export {LoginBox};
export default ModalLogin;