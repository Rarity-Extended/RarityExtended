import	React, {useState, useEffect}	from	'react';
import	Link							from	'next/link';
import	useWeb3							from	'contexts/useWeb3';
import	useRarity						from	'contexts/useRarity';
import	ModalLogin						from	'components/ModalLogin';
import	AdventurerModalMenu				from	'components/AdventurerModalMenu';

function	Navbar() {
	const	{active, address} = useWeb3();
	const	{openCurrentAventurerModal} = useRarity();
	const	[initialPopup, set_initialPopup] = useState(false);
	const	[modalLoginOpen, set_modalLoginOpen] = useState(false);

	useEffect(() => {
		if (initialPopup)
			return;

		if (active && !address) {
			set_modalLoginOpen(true);
		}
		set_initialPopup(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active, address]);

	function	renderWalletButton() {
		if (!active) {
			return (
				<button
					onClick={() => set_modalLoginOpen(true)}
					className={'inline-flex items-center py-2 px-3 text-xs font-semibold leading-4 whitespace-nowrap cursor-pointer'}>
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
		<>
			<div className={'block md:hidden'}>
				<div>
					<div className={'flex justify-between items-start pt-2 pb-4'}>
						<h1 className={'text-lg font-medium text-plain'}>
							{'Rarity Extended'}
						</h1>
						<div className={'flex items-center'}>
							{active ?
								<button
									type={'button'}
									className={'rounded-sm focus:outline-none text-plain'}
									onClick={openCurrentAventurerModal}>
									<span className={'sr-only'}>{'Close panel'}</span>
									<svg aria-hidden={'true'} focusable={'false'} data-prefix={'fas'} data-icon={'arrow-right-arrow-left'} className={'mt-1 w-4 h-4 text-plain'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}><path fill={'currentColor'} d={'M32 176h370.8l-57.38 57.38c-12.5 12.5-12.5 32.75 0 45.25C351.6 284.9 359.8 288 368 288s16.38-3.125 22.62-9.375l112-112c12.5-12.5 12.5-32.75 0-45.25l-112-112c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L402.8 112H32c-17.69 0-32 14.31-32 32S14.31 176 32 176zM480 336H109.3l57.38-57.38c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0l-112 112c-12.5 12.5-12.5 32.75 0 45.25l112 112C127.6 508.9 135.8 512 144 512s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L109.3 400H480c17.69 0 32-14.31 32-32S497.7 336 480 336z'}></path></svg>
								</button>
								:
								<button
									type={'button'}
									className={'rounded-sm focus:outline-none text-plain'}
									onClick={() => set_modalLoginOpen(true)}>
									<span className={'sr-only'}>{'Close panel'}</span>
									<svg aria-hidden={'true'} focusable={'false'} data-prefix={'fas'} data-icon={'wallet'} className={'mt-1 w-4 h-4 text-plain'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}><path fill={'currentColor'} d={'M448 32C465.7 32 480 46.33 480 64C480 81.67 465.7 96 448 96H80C71.16 96 64 103.2 64 112C64 120.8 71.16 128 80 128H448C483.3 128 512 156.7 512 192V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM416 336C433.7 336 448 321.7 448 304C448 286.3 433.7 272 416 272C398.3 272 384 286.3 384 304C384 321.7 398.3 336 416 336z'}></path></svg>
								</button>
							}
						</div>
					</div>
					<ModalLogin open={modalLoginOpen} set_open={set_modalLoginOpen} />
				</div>
			</div>

			<div className={'hidden md:block'}>
				<nav className={'flex relative flex-col justify-between pb-0 mb-4 w-full border-b-4 border-black dark:border-dark-100 md:flex-row md:pb-4 md:mb-4 md:h-20'}>
					<div className={'flex flex-row justify-start items-center w-full text-lg whitespace-normal md:w-3/12 md:whitespace-nowrap'}>
						<div className={'w-full'}>
							<Link href={'/'}>
								<p className={'block md:hidden'}>{'RE'}</p>
							</Link>
							<Link href={'/'}>
								<div>
									<p className={'hidden font-title cursor-pointer md:block'}>{'Rarity'}</p>
									<p className={'hidden font-title cursor-pointer md:block'}>{'Extended'}</p>
								</div>
							</Link>
						</div>
						<div className={'flex flex-row justify-end items-center w-full md:hidden'}>
							{renderWalletButton()}
						</div>
					</div>

					<div className={'flex flex-row justify-start items-center mt-3 w-3/12 md:justify-end md:mt-0'}>
						<div className={'hidden flex-row justify-end items-center pl-6 ml-6 md:flex'}>
							{renderWalletButton()}
						</div>
					</div>
					<ModalLogin open={modalLoginOpen} set_open={set_modalLoginOpen} />
				</nav>
			</div>
		</>
	);
}

export default Navbar;
