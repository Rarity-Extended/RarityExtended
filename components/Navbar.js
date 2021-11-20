/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Monday September 6th 2021
**	@Filename:				Navbar.js
******************************************************************************/

import	React, {useState, useEffect}	from	'react';
import	Image							from	'next/image';
import	Link							from	'next/link';
import	useWeb3							from	'contexts/useWeb3';
import	ModalLogin						from	'components/ModalLogin';
import	AdventurerModalMenu				from	'components/AdventurerModalMenu';
import	BoxAlternate					from	'components/BoxAlternate';
import	useUI							from	'contexts/useUI';
import	useRarity						from	'contexts/useRarity';
import	CLASSES							from	'utils/codex/classes';
import	FrameArrow						from	'components/Frame/Stone/Arrow';
import	FrameButton						from	'components/Frame/Stone/Button';
import 	Townwidget 						from 	'components/TownWidget';

function	BoxExpandable({children}) {
	return (
		<div className={'relative flex justify-center w-full items-center text-regular bg-stone-primary'}>
			{children}

			{/* BOTTOM */}
			<div className={'bg-black absolute h-1 -top-2 right-2 left-2'} />
			<div className={'bg-black absolute h-1 w-1 -top-2 right-0'} />
			<div className={'bg-black absolute h-1 w-1 -top-2 left-0'} />
			<div className={'bg-black absolute h-1 w-1 -top-1 right-2'} />
			<div className={'bg-black absolute h-1 w-1 -top-1 left-2'} />
			<div className={'bg-stone-primary absolute h-1 -top-1 left-3 right-3'} />
			<div className={'bg-black absolute h-1 w-1 top-0 right-1'} />
			<div className={'bg-black absolute h-1 w-1 top-0 left-1'} />
			<div className={'bg-black absolute h-1 w-1 top-0 right-0'} />
			<div className={'bg-black absolute h-1 w-1 top-0 left-0'} />

			{/* BOTTOM */}
			<div className={'bg-black absolute h-1 -bottom-2 right-2 left-2'} />
			<div className={'bg-black absolute h-1 w-1 -bottom-2 right-0'} />
			<div className={'bg-black absolute h-1 w-1 -bottom-2 left-0'} />
			<div className={'bg-black absolute h-1 w-1 -bottom-1 right-2'} />
			<div className={'bg-black absolute h-1 w-1 -bottom-1 left-2'} />
			<div className={'bg-stone-primary absolute h-1 -bottom-1 left-3 right-3'} />
			<div className={'bg-black absolute h-1 w-1 bottom-0 right-1'} />
			<div className={'bg-black absolute h-1 w-1 bottom-0 left-1'} />
			<div className={'bg-black absolute h-1 w-1 bottom-0 right-0'} />
			<div className={'bg-black absolute h-1 w-1 bottom-0 left-0'} />

			{/* SIDES */}
			<div className={'bg-black absolute w-1 left-0 top-0 bottom-0'} />
			<div className={'bg-black absolute w-1 right-0 top-0 bottom-0'} />
		</div>
	);
}

function	Navbar({router}) {
	const	{customTheme} = useUI();
	const	{active, address} = useWeb3();
	const	{rarities, currentAdventurer, set_currentAdventurer} = useRarity();
	const	[initialPopup, set_initialPopup] = useState(false);
	const	[modalLoginOpen, set_modalLoginOpen] = useState(false);
	const	[menuOpen, set_menuOpen] = useState(false);
	const	[currentAdventurerMenuOpen, set_currentAdventurerMenuOpen] = useState(false);

	useEffect(() => {
		if (initialPopup)
			return;

		if (!address) {
			set_modalLoginOpen(true);
		}
		set_initialPopup(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address]);

	function	leftBlock() {
		return (
			<div className={'w-82 min-w-82 relative bg-stone-primary border-r-4 border-black z-50'}>
				{/* CORNER_DECORATIONS */}
				<div className={'w-1 h-1 absolute top-1 left-1 bg-black'} />
				<div className={'w-1 h-1 absolute top-2 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-1 right-1 bg-black'} />
				<div className={'w-1 h-1 absolute top-2 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-1 left-1 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-2 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-1 right-1 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-2 right-2 bg-black'} />
				{/* TOP_LEFT_TO_TOP_RIGHT */}
				<div className={'h-1 absolute top-1 left-5 right-5 bg-black'} />
				{/* TOP_BOTTOM_TO_BOTTOM_RIGHT */}
				<div className={'h-1 absolute bottom-1 left-5 right-5 bg-black'} />
				{/* TOP_LEFT */}
				<div className={'w-1 h-1 absolute top-2 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-3 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 left-3 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-5 left-1 bg-black'} />
				{/* TOP_TO_BOTTOM_LEFT */}
				<div className={'w-1 h-10 absolute top-6 left-1 bg-black'} />
				{/* BOTTOM_LEFT */}
				<div className={'w-1 h-1 absolute bottom-2 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-3 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 left-3 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-5 left-1 bg-black'} />
				{/* TOP_LEFT */}
				<div className={'w-1 h-1 absolute top-2 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-3 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 right-3 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-5 right-1 bg-black'} />
				{/* TOP_TO_BOTTOM_RIGHT */}
				<div className={'w-1 h-10 absolute top-6 right-1 bg-black'} />
				{/* BOTTOM_RIGHT */}
				<div className={'w-1 h-1 absolute bottom-2 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-3 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 right-3 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-5 right-1 bg-black'} />
				{/* TOP HIGHLIGHT */}
				<div className={'h-1 absolute top-2 left-5 right-5 bg-stone-primary-highlight'} />
				<div className={'h-2 w-1 absolute top-3 left-5 bg-stone-primary-highlight'} />
				<div className={'h-2 w-1 absolute top-4 left-4 bg-stone-primary-highlight'} />
				<div className={'h-1 w-2 absolute top-5 left-2 bg-stone-primary-highlight'} />
				<div className={'h-10 w-1 absolute top-5 left-2 bg-stone-primary-highlight'} />
				{/* BOTTOM SHADOW */}
				<div className={'h-1 absolute bottom-2 left-5 right-5 bg-stone-primary-shadow'} />
				<div className={'h-2 w-1 absolute bottom-3 right-5 bg-stone-primary-shadow'} />
				<div className={'h-2 w-1 absolute bottom-4 right-4 bg-stone-primary-shadow'} />
				<div className={'h-1 w-2 absolute bottom-5 right-2 bg-stone-primary-shadow'} />
				<div className={'h-10 w-1 absolute bottom-5 right-2 bg-stone-primary-shadow'} />
				<div className={'px-5 h-full flex items-center'}>
					<BoxAlternate
						onClick={() => set_menuOpen(!menuOpen)}
						className={'bg-stone-primary flex justify-between pl-4 text-white'}
						backgroundColor={'bg-stone-primary'}
						borderStyle={'bg-black'}>
						{'TOWN'}
						<FrameArrow iconClassName={menuOpen ? 'transform rotate-90 transition-transform ml-0' : 'transform transition-transform'} />
						<div className={`absolute top-full mt-1 w-full left-0 ${menuOpen ? 'visible' : 'hidden'}`}>
							<BoxExpandable>
								<div className={'h-full grid text-white'}>
									<Link href={'/town/tavern'}>
										<a className={'flex items-center bg-stone-primaryy hover:bg-stone-secondary-highlight'}>
											<div className={'w-20 h-20 rounded-lg flex justify-center items-center'} style={{minWidth: 80}}>
												<Image
													src={'/menu/tavern.png'}
													loading={'eager'}
													width={80}
													height={80} />
											</div>
											<div className={'ml-0'}>
												<span className={'text-xs cursor-pointer uppercase'}>
													<span className={'hidden md:inline cursor-pointer'}>{'Tavern'}</span>
													<span className={'inline md:hidden cursor-pointer'}>{'Tavern'}</span>
												</span>
												<div className={'text-caption cursor-pointer uppercase'}>
													<p>
														{'Best place to get some news!'}
													</p>
												</div>
											</div>
										</a>
									</Link>
									<Link href={'/town/blacksmith'}>
										<a className={'flex items-center bg-stone-primaryy hover:bg-stone-secondary-highlight'}>
											<div className={'w-20 h-20 rounded-lg flex justify-center items-center'} style={{minWidth: 80}}>
												<Image
													src={'/menu/blacksmith.png'}
													loading={'eager'}
													width={80}
													height={80} />
											</div>
											<div className={'ml-0'}>
												<span className={'text-xs cursor-pointer uppercase'}>
													<span className={'hidden md:inline cursor-pointer'}>{'BLACKSMITH'}</span>
													<span className={'inline md:hidden cursor-pointer'}>{'BLACKSMITH'}</span>
												</span>
												<div className={'text-caption cursor-pointer uppercase'}>
													<p>
														{'Come and craft mighty armors!'}
													</p>
												</div>
											</div>
										</a>
									</Link>
									<Link href={'/town/quest'}>
										<a className={'flex items-center bg-stone-primaryy hover:bg-stone-secondary-highlight'}>
											<div className={'w-20 h-20 rounded-lg flex justify-center items-center'} style={{minWidth: 80}}>
												<Image
													src={'/menu/quest.png'}
													loading={'eager'}
													width={80}
													height={80} />
											</div>
											<div className={'ml-0'}>
												<span className={'text-xs cursor-pointer uppercase'}>
													<span className={'hidden md:inline cursor-pointer'}>{'QUEST OFFICE'}</span>
													<span className={'inline md:hidden cursor-pointer'}>{'QUEST OFFICE'}</span>
												</span>
												<div className={'text-caption cursor-pointer uppercase'}>
													<p>
														{'Loot is not guaranteed.'}
													</p>
												</div>
											</div>
										</a>
									</Link>
									<Link href={'/town/market'}>
										<a className={'flex items-center bg-stone-primaryy hover:bg-stone-secondary-highlight'}>
											<div className={'w-20 h-20 rounded-lg flex justify-center items-center'} style={{minWidth: 80}}>
												<Image
													src={'/menu/market.png'}
													loading={'eager'}
													width={80}
													height={80} />
											</div>
											<div className={'ml-0'}>
												<span className={'text-xs cursor-pointer uppercase'}>
													<span className={'hidden md:inline cursor-pointer'}>{'MARKET'}</span>
													<span className={'inline md:hidden cursor-pointer'}>{'MARKET'}</span>
												</span>
												<div className={'text-caption cursor-pointer uppercase'}>
													<p>
														{'Spend all your gold!'}
													</p>
												</div>
											</div>
										</a>
									</Link>
									<Link href={'/town/bank'}>
										<a className={'flex items-center bg-stone-primaryy hover:bg-stone-secondary-highlight'}>
											<div className={'w-20 h-20 rounded-lg flex justify-center items-center'} style={{minWidth: 80}}>
												<Image
													src={'/menu/banker.png'}
													loading={'eager'}
													width={80}
													height={80} />
											</div>
											<div className={'ml-0'}>
												<span className={'text-xs cursor-pointer uppercase'}>
													<span className={'hidden md:inline cursor-pointer'}>{'BANK'}</span>
													<span className={'inline md:hidden cursor-pointer'}>{'BANK'}</span>
												</span>
												<div className={'text-caption cursor-pointer uppercase'}>
													<p>
														{'Trust us with your gold!'}
													</p>
												</div>
											</div>
										</a>
									</Link>
									<Link href={'/town/guild-house'}>
										<a className={'flex items-center bg-stone-primaryy hover:bg-stone-secondary-highlight'}>
											<div className={'w-20 h-20 rounded-lg flex justify-center items-center'} style={{minWidth: 80}}>
												<Image
													src={'/menu/guild house.png'}
													loading={'eager'}
													width={80}
													height={80} />
											</div>
											<div className={'ml-0'}>
												<span className={'text-xs cursor-pointer uppercase'}>
													<span className={'hidden md:inline cursor-pointer'}>{'GUILD HOUSE'}</span>
													<span className={'inline md:hidden cursor-pointer'}>{'GUILD HOUSE'}</span>
												</span>
												<div className={'text-caption cursor-pointer uppercase'}>
													<p>
														{'Hustle and bustle!'}
													</p>
												</div>
											</div>
										</a>
									</Link>
								</div>			
							</BoxExpandable>
						</div>
					</BoxAlternate>
				</div>
			</div>
		);
	}
	function	centerBlock() {
		return (
			<div className={'w-full relative bg-stone-primary border-r-4 border-black'}>
				{/* CORNER_DECORATIONS */}
				<div className={'w-1 h-1 absolute top-1 left-1 bg-black'} />
				<div className={'w-1 h-1 absolute top-2 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-1 right-1 bg-black'} />
				<div className={'w-1 h-1 absolute top-2 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-1 left-1 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-2 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-1 right-1 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-2 right-2 bg-black'} />
				{/* TOP_LEFT_TO_TOP_RIGHT */}
				<div className={'h-1 absolute top-1 left-5 right-5 bg-black'} />
				{/* TOP_BOTTOM_TO_BOTTOM_RIGHT */}
				<div className={'h-1 absolute bottom-1 left-5 right-5 bg-black'} />
				{/* TOP_LEFT */}
				<div className={'w-1 h-1 absolute top-2 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-3 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 left-3 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-5 left-1 bg-black'} />
				{/* TOP_TO_BOTTOM_LEFT */}
				<div className={'w-1 h-10 absolute top-6 left-1 bg-black'} />
				{/* BOTTOM_LEFT */}
				<div className={'w-1 h-1 absolute bottom-2 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-3 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 left-3 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-5 left-1 bg-black'} />
				{/* TOP_LEFT */}
				<div className={'w-1 h-1 absolute top-2 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-3 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 right-3 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-5 right-1 bg-black'} />
				{/* TOP_TO_BOTTOM_RIGHT */}
				<div className={'w-1 h-10 absolute top-6 right-1 bg-black'} />
				{/* BOTTOM_RIGHT */}
				<div className={'w-1 h-1 absolute bottom-2 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-3 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 right-3 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-5 right-1 bg-black'} />

				{/* TOP HIGHLIGHT */}
				<div className={'h-1 absolute top-2 left-5 right-5 bg-stone-primary-highlight'} />
				<div className={'h-2 w-1 absolute top-3 left-5 bg-stone-primary-highlight'} />
				<div className={'h-2 w-1 absolute top-4 left-4 bg-stone-primary-highlight'} />
				<div className={'h-1 w-2 absolute top-5 left-2 bg-stone-primary-highlight'} />
				<div className={'h-10 w-1 absolute top-5 left-2 bg-stone-primary-highlight'} />

				{/* BOTTOM SHADOW */}
				<div className={'h-1 absolute bottom-2 left-5 right-5 bg-stone-primary-shadow'} />
				<div className={'h-2 w-1 absolute bottom-3 right-5 bg-stone-primary-shadow'} />
				<div className={'h-2 w-1 absolute bottom-4 right-4 bg-stone-primary-shadow'} />
				<div className={'h-1 w-2 absolute bottom-5 right-2 bg-stone-primary-shadow'} />
				<div className={'h-10 w-1 absolute bottom-5 right-2 bg-stone-primary-shadow'} />

				<div className={'px-8 h-full flex items-center text-white'}>
					{'RARITY EXTENDED'}
				</div>
			</div>
		);
	}
	function	rightBlock() {
		return (
			<div className={'w-81 min-w-81 flex relative bg-stone-primary border-r-4 border-black z-50'}>
				{/* CORNER_DECORATIONS */}
				<div className={'w-1 h-1 absolute top-1 left-1 bg-black'} />
				<div className={'w-1 h-1 absolute top-2 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-1 right-1 bg-black'} />
				<div className={'w-1 h-1 absolute top-2 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-1 left-1 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-2 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-1 right-1 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-2 right-2 bg-black'} />
				{/* TOP_LEFT_TO_TOP_RIGHT */}
				<div className={'h-1 absolute top-1 left-5 right-5 bg-black'} />
				{/* TOP_BOTTOM_TO_BOTTOM_RIGHT */}
				<div className={'h-1 absolute bottom-1 left-5 right-5 bg-black'} />
				{/* TOP_LEFT */}
				<div className={'w-1 h-1 absolute top-2 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-3 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 left-3 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-5 left-1 bg-black'} />
				{/* TOP_TO_BOTTOM_LEFT */}
				<div className={'w-1 h-10 absolute top-6 left-1 bg-black'} />
				{/* BOTTOM_LEFT */}
				<div className={'w-1 h-1 absolute bottom-2 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-3 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 left-3 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-5 left-1 bg-black'} />
				{/* TOP_LEFT */}
				<div className={'w-1 h-1 absolute top-2 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-3 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 right-3 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-5 right-1 bg-black'} />
				{/* TOP_TO_BOTTOM_RIGHT */}
				<div className={'w-1 h-10 absolute top-6 right-1 bg-black'} />
				{/* BOTTOM_RIGHT */}
				<div className={'w-1 h-1 absolute bottom-2 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-3 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 right-3 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-5 right-1 bg-black'} />

				{/* TOP HIGHLIGHT */}
				<div className={'h-1 absolute top-2 left-5 right-5 bg-stone-primary-highlight'} />
				<div className={'h-2 w-1 absolute top-3 left-5 bg-stone-primary-highlight'} />
				<div className={'h-2 w-1 absolute top-4 left-4 bg-stone-primary-highlight'} />
				<div className={'h-1 w-2 absolute top-5 left-2 bg-stone-primary-highlight'} />
				<div className={'h-10 w-1 absolute top-5 left-2 bg-stone-primary-highlight'} />

				{/* BOTTOM SHADOW */}
				<div className={'h-1 absolute bottom-2 left-5 right-5 bg-stone-primary-shadow'} />
				<div className={'h-2 w-1 absolute bottom-3 right-5 bg-stone-primary-shadow'} />
				<div className={'h-2 w-1 absolute bottom-4 right-4 bg-stone-primary-shadow'} />
				<div className={'h-1 w-2 absolute bottom-5 right-2 bg-stone-primary-shadow'} />
				<div className={'h-10 w-1 absolute bottom-5 right-2 bg-stone-primary-shadow'} />

				<div className={'px-5 h-full flex items-center w-full'}>
					<BoxAlternate
						onClick={() => set_currentAdventurerMenuOpen(!currentAdventurerMenuOpen)}
						className={'bg-stone-primary flex justify-between pl-4 text-white'}
						backgroundColor={'bg-stone-primary'}
						borderStyle={'bg-black'}>
						{currentAdventurer ? `${CLASSES[currentAdventurer?.class]?.name} LVL ${currentAdventurer?.level}` : 'NOBODY'}
						<FrameArrow iconClassName={currentAdventurerMenuOpen ? 'transform rotate-90 transition-transform ml-0' : 'transform transition-transform'} />
						<div className={`absolute top-full mt-1 w-full left-0 ${currentAdventurerMenuOpen ? 'visible' : 'hidden'}`}>
							<BoxExpandable>
								<div className={'h-full w-full grid text-white'}>
									{[...Object.values(rarities)].map((adventurer, i) => (
										<div
											key={`${adventurer.tokenID}_${i}`}
											onClick={() => set_currentAdventurer(adventurer)}
											className={'h-8 flex w-full items-center cursor-pointer hover:bg-stone-secondary-highlight px-4'}>
											{`${CLASSES[adventurer.class].name} LVL ${adventurer.level}`}
										</div>
									))}
								</div>			
							</BoxExpandable>
						</div>
					</BoxAlternate>
				</div>
			</div>
		);
	}
	function	rightestBlock() {
		return (
			<div className={'w-69 min-w-69 flex relative bg-stone-primary'}>
				{/* CORNER_DECORATIONS */}
				<div className={'w-1 h-1 absolute top-1 left-1 bg-black'} />
				<div className={'w-1 h-1 absolute top-2 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-1 right-1 bg-black'} />
				<div className={'w-1 h-1 absolute top-2 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-1 left-1 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-2 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-1 right-1 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-2 right-2 bg-black'} />
				{/* TOP_LEFT_TO_TOP_RIGHT */}
				<div className={'h-1 absolute top-1 left-5 right-5 bg-black'} />
				{/* TOP_BOTTOM_TO_BOTTOM_RIGHT */}
				<div className={'h-1 absolute bottom-1 left-5 right-5 bg-black'} />
				{/* TOP_LEFT */}
				<div className={'w-1 h-1 absolute top-2 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-3 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 left-3 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-5 left-1 bg-black'} />
				{/* TOP_TO_BOTTOM_LEFT */}
				<div className={'w-1 h-10 absolute top-6 left-1 bg-black'} />
				{/* BOTTOM_LEFT */}
				<div className={'w-1 h-1 absolute bottom-2 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-3 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 left-3 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-5 left-1 bg-black'} />
				{/* TOP_LEFT */}
				<div className={'w-1 h-1 absolute top-2 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-3 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 right-3 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-5 right-1 bg-black'} />
				{/* TOP_TO_BOTTOM_RIGHT */}
				<div className={'w-1 h-10 absolute top-6 right-1 bg-black'} />
				{/* BOTTOM_RIGHT */}
				<div className={'w-1 h-1 absolute bottom-2 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-3 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 right-3 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-5 right-1 bg-black'} />

				{/* TOP HIGHLIGHT */}
				<div className={'h-1 absolute top-2 left-5 right-5 bg-stone-primary-highlight'} />
				<div className={'h-2 w-1 absolute top-3 left-5 bg-stone-primary-highlight'} />
				<div className={'h-2 w-1 absolute top-4 left-4 bg-stone-primary-highlight'} />
				<div className={'h-1 w-2 absolute top-5 left-2 bg-stone-primary-highlight'} />
				<div className={'h-10 w-1 absolute top-5 left-2 bg-stone-primary-highlight'} />

				{/* BOTTOM SHADOW */}
				<div className={'h-1 absolute bottom-2 left-5 right-5 bg-stone-primary-shadow'} />
				<div className={'h-2 w-1 absolute bottom-3 right-5 bg-stone-primary-shadow'} />
				<div className={'h-2 w-1 absolute bottom-4 right-4 bg-stone-primary-shadow'} />
				<div className={'h-1 w-2 absolute bottom-5 right-2 bg-stone-primary-shadow'} />
				<div className={'h-10 w-1 absolute bottom-5 right-2 bg-stone-primary-shadow'} />

				<div className={'px-5 flex items-center w-full'}>
					<FrameButton>
						{address && active ? `${address.slice(0, 4)}...${address.slice(-4)}` : 'CONNECT WALLET'}
					</FrameButton>
				</div>
			</div>
		);
	}


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
	if (customTheme === 'stone') {
		return (
			<nav className={'relative w-full flex flex-row border-4 border-black h-22'}>
				{leftBlock()}
				{centerBlock()}
				{rightBlock()}
				{rightestBlock()}
				<ModalLogin open={modalLoginOpen} set_open={set_modalLoginOpen} />
			</nav>
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
