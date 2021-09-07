/******************************************************************************
**	@Author:				The Ape Community
**	@Twitter:				@ape_tax
**	@Date:					Wednesday August 11th 2021
**	@Filename:				Navbar.js
******************************************************************************/

import	React, {useState}		from	'react';
import	useWeb3					from	'contexts/useWeb3';
import	ModalLogin				from	'components/ModalLogin';

function	Navbar({router}) {
	const	{active, address, deactivate, onDesactivate} = useWeb3();
	const	[initialPopup, set_initialPopup] = useState(false);
	const	[modalLoginOpen, set_modalLoginOpen] = useState(false);

	React.useEffect(() => {
		if (initialPopup)
			return;

		if (!address) {
			set_modalLoginOpen(true);
		}
		set_initialPopup(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address]);

	function	renderWalletButton() {
		if (!active) {
			return (
				<button
					onClick={() => set_modalLoginOpen(true)}
					className={'inline-flex px-3 py-2 items-center leading-4 text-xs cursor-pointer whitespace-nowrap font-semibold font-title uppercase'}>
					<span className={'hidden md:flex'}>{'Connect wallet'}</span>
					<span className={'flex md:hidden'}>{'Connect'}</span>
				</button>
			);
		}
		return (
			<p
				onClick={() => {deactivate(); onDesactivate();}}
				suppressHydrationWarning
				className={'inline-flex px-3 py-2 items-center leading-4 text-xs cursor-pointer whitespace-nowrap font-semibold font-title hover:underline'}>
				<span className={'flex'}>{`${address.slice(0, 4)}...${address.slice(-4)}`}</span>
			</p>
		);
	}
	return (
		<nav className={'w-full flex flex-row justify-start h-20 border-b-4 border-black mb-20'}>
			<div className={'items-center justify-start flex flex-row w-full font-title text-lg uppercase'}>
				{'Rarity Extended'}
			</div>
			<div className={'items-center justify-end flex flex-row w-full'}>
				<div className={'items-center justify-end flex-row flex mr-6'}>
					<label>
						<input type={'radio'} className={'nes-radio'} name={'tab'} checked={router.pathname === '/'} readOnly onClick={() => router.push('/')}/>
						<span className={'font-title text-sm uppercase'}>{'Adventurers'}</span>
					</label>
				</div>
				<div className={'items-center justify-end flex-row flex mr-6'}>
					<label>
						<input type={'radio'} className={'nes-radio'} name={'tab'} checked={router.pathname === '/tavern'} readOnly onClick={() => router.push('/tavern')}/>
						<span className={'font-title text-sm uppercase'}>{'Tavern'}</span>
					</label>
				</div>
				<div className={'items-center justify-end flex-row flex border-black border-l-4 pl-6 ml-6'}>
					{renderWalletButton()}
				</div>
			</div>
			<ModalLogin open={modalLoginOpen} set_open={set_modalLoginOpen} />
		</nav>
	);
}

export default Navbar;
