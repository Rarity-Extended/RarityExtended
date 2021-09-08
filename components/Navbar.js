/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@MajorTom_eth
**	@Date:					Monday September 6th 2021
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
				<span className={'flex md:hidden'}>{`${address.slice(0, 4)}`}</span>
				<span className={'hidden md:flex'}>{`${address.slice(0, 4)}...${address.slice(-4)}`}</span>
			</p>
		);
	}
	return (
		<nav className={'w-full flex flex-col md:flex-row justify-start md:h-20 border-b-4 border-black mb-20 pb-4'}>
			<div className={'items-center justify-start flex flex-row whitespace-normal md:whitespace-nowrap font-title text-lg uppercase'}>
				{'Rarity Extended'}
				<div className={'items-center justify-end flex-row flex md:hidden'}>
					{renderWalletButton()}
				</div>
			</div>
			<div className={'items-center justify-center md:justify-end flex flex-row w-full mt-3 md:mt-0 -ml-6 md:ml-0'}>
				<div className={'items-center justify-end flex-row flex mr-6'}>
					<label>
						<input type={'radio'} className={'nes-radio'} name={'tab'} checked={router.pathname === '/'} readOnly onClick={() => router.push('/')}/>
						<span className={'font-title text-xs md:text-sm uppercase'}>{'Adventurers'}</span>
					</label>
				</div>
				<div className={'items-center justify-end flex-row flex mr-6'}>
					<label>
						<input type={'radio'} className={'nes-radio'} name={'tab'} checked={router.pathname === '/tavern'} readOnly onClick={() => router.push('/tavern')}/>
						<span className={'font-title text-xs md:text-sm uppercase'}>{'Tavern'}</span>
					</label>
				</div>
				<div className={'items-center justify-end flex-row border-black border-l-4 pl-6 ml-6 hidden md:flex'}>
					{renderWalletButton()}
				</div>
			</div>
			<ModalLogin open={modalLoginOpen} set_open={set_modalLoginOpen} />
		</nav>
	);
}

export default Navbar;
