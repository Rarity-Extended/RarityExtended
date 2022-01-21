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
		<div className={'box font-story'}>
			<div className={'p-6 space-y-4'}>
				<div
					onClick={() => {
						connect(walletType.METAMASK);
						set_open(false);
					}}
					className={'bg-600 hover-bg-900 hover:shadow-sm cursor-pointer flex flex-col flex-center transition-colors p-6 text-center'}>
					<div className={'web3modal-icon text-5xl'}>{'🦊'}</div>
					<div className={'mt-2 text-plain font-bold text-xl mb-1'}>{'MetaMask'}</div>
					<div className={'mt-2 text-plain text-xs'}>{'Connect to your MetaMask Wallet'}</div>
				</div>
				<div
					onClick={() => {
						connect(walletType.WALLET_CONNECT);
						set_open(false);
					}}
					className={'bg-600 hover-bg-900 hover:shadow-sm cursor-pointer flex flex-col flex-center transition-colors p-6 text-center'}>
					<div className={'web3modal-icon'}>
						<div className={'web3modal-icon text-5xl'} style={{filter: 'hue-rotate(250deg)'}}>{'👛'}</div>
					</div>
					<div className={'mt-2 text-plain font-bold text-xl mb-1'}>{'WalletConnect'}</div>
					<div className={'mt-2 text-plain text-xs'}>{'Scan with WalletConnect'}</div>
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
				className={'fixed z-10 inset-0 overflow-y-auto uppercase font-title'}
				style={{zIndex: 9999999}}
				initialFocus={walletConnectRef}
				open={open}
				onClose={set_open}>
				<div className={'flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'}>
					<Transition.Child
						as={Fragment}
						enter={'ease-out duration-300'} enterFrom={'opacity-0'} enterTo={'opacity-100'}
						leave={'ease-in duration-200'} leaveFrom={'opacity-100'} leaveTo={'opacity-0'}>
						<Dialog.Overlay className={'fixed inset-0 bg-opacity-50 bg-black transition-opacity'} />
					</Transition.Child>

					<span className={'hidden sm:inline-block sm:align-middle sm:h-screen'} aria-hidden={'true'}>
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
						<div ref={walletConnectRef} className={'absolute inset-0 sm:max-w-lg sm:w-full md:mb-96 mx-auto mt-20'}>
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