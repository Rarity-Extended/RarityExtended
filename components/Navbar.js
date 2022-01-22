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
		<>
			<div className={'block md:hidden'}>
				<div>
					<div className={'flex items-start justify-between pt-2 pb-4'}>
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
									<svg aria-hidden={'true'} focusable={'false'} data-prefix={'fas'} data-icon={'arrow-right-arrow-left'} className={'w-4 h-4 text-plain mt-1'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}><path fill={'currentColor'} d={'M32 176h370.8l-57.38 57.38c-12.5 12.5-12.5 32.75 0 45.25C351.6 284.9 359.8 288 368 288s16.38-3.125 22.62-9.375l112-112c12.5-12.5 12.5-32.75 0-45.25l-112-112c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L402.8 112H32c-17.69 0-32 14.31-32 32S14.31 176 32 176zM480 336H109.3l57.38-57.38c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0l-112 112c-12.5 12.5-12.5 32.75 0 45.25l112 112C127.6 508.9 135.8 512 144 512s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L109.3 400H480c17.69 0 32-14.31 32-32S497.7 336 480 336z'}></path></svg>
								</button>
								:
								<button
									type={'button'}
									className={'rounded-sm focus:outline-none text-plain'}
									onClick={() => set_modalLoginOpen(true)}>
									<span className={'sr-only'}>{'Close panel'}</span>
									<svg aria-hidden={'true'} focusable={'false'} data-prefix={'fas'} data-icon={'wallet'} className={'w-4 h-4 text-plain mt-1'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}><path fill={'currentColor'} d={'M448 32C465.7 32 480 46.33 480 64C480 81.67 465.7 96 448 96H80C71.16 96 64 103.2 64 112C64 120.8 71.16 128 80 128H448C483.3 128 512 156.7 512 192V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM416 336C433.7 336 448 321.7 448 304C448 286.3 433.7 272 416 272C398.3 272 384 286.3 384 304C384 321.7 398.3 336 416 336z'}></path></svg>
								</button>
							}
						</div>
					</div>
					<ModalLogin open={modalLoginOpen} set_open={set_modalLoginOpen} />
				</div>
			</div>

			<div className={'hidden md:block'}>
				<nav className={'relative w-full flex flex-col md:flex-row justify-between md:h-20 border-b-4 border-black dark:border-dark-100 mb-4 md:mb-4 pb-0 md:pb-4'}>
					<div className={'items-center justify-start flex flex-row w-full md:w-3/12 whitespace-normal md:whitespace-nowrap text-lg'}>
						<div className={'w-full'}>
							<Link href={'/'}>
								<p className={'block md:hidden'}>{'RE'}</p>
							</Link>
							<Link href={'/'}>
								<div>
									<p className={'hidden md:block font-title cursor-pointer'}>{'Rarity'}</p>
									<p className={'hidden md:block font-title cursor-pointer'}>{'Extended'}</p>
								</div>
							</Link>
						</div>
						<div className={'items-center justify-end flex-row flex md:hidden w-full'}>
							{renderWalletButton()}
						</div>
					</div>

					<div className={'items-center justify-start md:justify-end flex flex-row w-3/12 mt-3 md:mt-0'}>
						<div className={'items-center justify-end flex-row pl-6 ml-6 hidden md:flex'}>
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
