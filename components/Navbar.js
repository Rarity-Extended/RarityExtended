/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Monday September 6th 2021
**	@Filename:				Navbar.js
******************************************************************************/

import	React, {useState, useEffect}	from	'react';
import	Link							from	'next/link';
import	useWeb3							from	'contexts/useWeb3';
import	ModalLogin						from	'components/ModalLogin';
import	AdventurerModalMenu				from	'components/AdventurerModalMenu';
import 	Townwidget 						from 	'components/TownWidget';

function	Navbar() {
	const	{active, address} = useWeb3();
	const	[initialPopup, set_initialPopup] = useState(false);
	const	[modalLoginOpen, set_modalLoginOpen] = useState(false);

	useEffect(() => {
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
					className={'inline-flex px-3 py-2 items-center leading-4 text-xs cursor-pointer whitespace-nowrap font-semibold '}>
					<span className={'hidden md:flex'}>{'Connect wallet'}</span>
					<span className={'flex md:hidden'}>{'Connect'}</span>
				</button>
			);
		}
		return (
			<AdventurerModalMenu />
		);
	}
	return (
		<nav className={'relative w-full flex flex-col md:flex-row justify-start md:h-20 border-b-4 border-black dark:border-dark-100 mb-4 md:mb-4 pb-0 md:pb-4'}>
			<div className={'items-center justify-start flex flex-row w-full md:w-3/12 whitespace-normal md:whitespace-nowrap text-lg'}>
				<div className={'w-full'}>
					<Link href={'/'}>
						<p className={'block md:hidden'}>{'RE'}</p>
					</Link>
					<Link href={'/'}>
						<div>
							<p className={'hidden md:block cursor-pointer'}>{'Rarity'}</p>
							<p className={'hidden md:block cursor-pointer'}>{'Extended'}</p>
						</div>
					</Link>
				</div>
				<div className={'items-center justify-end flex-row flex md:hidden w-full'}>
					{renderWalletButton()}
				</div>
			</div>
			<div className={'items-center flex w-full md:w-6/12 mt-3 md:mt-0'}>
				<Townwidget />
			</div>

			<div className={'items-center justify-start md:justify-end flex flex-row w-3/12 mt-3 md:mt-0'}>
				<div className={'items-center justify-end flex-row pl-6 ml-6 hidden md:flex'}>
					{renderWalletButton()}
				</div>
			</div>
			<ModalLogin open={modalLoginOpen} set_open={set_modalLoginOpen} />
		</nav>
	);
}

export default Navbar;
