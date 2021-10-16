/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 5th 2021
**	@Filename:				index.js
******************************************************************************/

import	React, {useState}				from	'react';
import	SectionNoAdventurer				from	'sections/SectionNoAdventurer';
import	useWeb3							from	'contexts/useWeb3';
import	useRarity						from	'contexts/useRarity';
import	Adventurer						from	'components/Adventurer';
import	ListBox							from	'components/ListBox';
import	Box								from	'components/Box';
import	TownNav							from	'components/TownNav';
import	Chevron											from	'components/Chevron';
import	CLASSES							from	'utils/codex/classes';
import	useLocalStorage					from	'hook/useLocalStorage';

const	levelOptions = [
	{name: 'All Levels', value: 0},
	{name: 'Level 1', value: 1},
	{name: 'Level 2', value: 2},
	{name: 'Level 3', value: 3},
	{name: 'Level 4', value: 4},
];
const	classOptions = [
	{name: 'All Classes', value: 0},
	{name: 'Barbarian', value: 1},
	{name: 'Bard', value: 2},
	{name: 'Cleric', value: 3},
	{name: 'Druid', value: 4},
	{name: 'Fighter', value: 5},
	{name: 'Monk', value: 6},
	{name: 'Paladin', value: 7},
	{name: 'Ranger', value: 8},
	{name: 'Rogue', value: 9},
	{name: 'Sorcerer', value: 10},
	{name: 'Wizard', value: 11},
];
function	Index({router}) {
	const	{provider, chainTime} = useWeb3();
	const	{rarities, currentAdventurer, set_currentAdventurer, updateRarity} = useRarity();
	const	adventurers = Object.values(rarities);

	const	[page, set_page] = useState(0);
	const	[search, set_search] = useState('');
	const	[classTab, set_classTab] = useState(0);
	const	[level, set_level] = useState(levelOptions[0]);
	const	[classSelected, set_classSelected] = useState(classOptions[0]);
	const	[favoritesAdventurers, set_favoritesAdventurers] = useLocalStorage('favorites', []);

	if (adventurers?.length === 0) {
		return (
			<SectionNoAdventurer />
		);
	}

	return (
		<section className={'mt-16 md:mt-12'}>
			<div className={'flex flex-col max-w-screen-lg w-full mx-auto'}>
				<div className={'grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 gap-y-0 md:gap-y-4 overflow-y-scroll px-1 mb-24'}>
					<div className={'w-full col-span-1'}>
						<Adventurer
							noHover
							onClick={() => set_currentAdventurer(currentAdventurer)}
							adventurer={currentAdventurer}
							rarityClass={CLASSES[currentAdventurer.class]}>
							<div
								onClick={() => {
									set_favoritesAdventurers(favoritesAdventurers.includes(currentAdventurer.tokenID) ? favoritesAdventurers.filter(id => id !== currentAdventurer.tokenID) : [...favoritesAdventurers, currentAdventurer.tokenID]);
								}}
								className={`absolute right-4 top-4 ${favoritesAdventurers.includes(currentAdventurer.tokenID) ? 'text-tag-info dark:text-tag-warning' : 'text-darkWhite dark:text-dark-400'}`}>
								<svg width={20} height={20} aria-hidden={'true'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 576 512'}><path fill={'currentColor'} d={'M316.7 17.8l65.43 132.4l146.4 21.29c26.27 3.796 36.79 36.09 17.75 54.59l-105.9 102.1l25.05 145.5c4.508 26.31-23.23 45.9-46.49 33.7L288 439.6l-130.9 68.7C133.8 520.5 106.1 500.9 110.6 474.6l25.05-145.5L29.72 226.1c-19.03-18.5-8.516-50.79 17.75-54.59l146.4-21.29l65.43-132.4C271.1-6.083 305-5.786 316.7 17.8z'}></path></svg>
							</div>
						</Adventurer>
					</div>
					<div className={'w-full col-span-3'}>
						<Box
							style={{height: 328}}
							className={'w-full p-4 flex flex-col relative mb-4 md:mb-0 h-full'}>
							<TownNav start={page * 6}/>
							<div className={'absolute bottom-4 right-4 flex w-full text-xss justify-end items-center text-black dark:text-dark-100 mt-4'}>
								<Chevron
									width={12}
									height={12}
									onClick={() => set_page(page - 1)}
									className={`mr-2 select-none ${page === 0 ? 'opacity-0' : 'cursor-pointer text-black dark:text-dark-100 dark:hover:text-white'}`} />
								{`${page + 1}/2`}
								<Chevron
									width={12}
									height={12}
									onClick={() => set_page(page + 1)}
									className={`ml-2 select-none transform rotate-180 ${page === 1 ? 'opacity-0' : 'cursor-pointer text-black dark:text-dark-100 dark:hover:text-white'}`} />

							</div>
						</Box>
					</div>
				</div>

				<h1 className={'text-black dark:text-white text-base mb-2'}>
					{'CHOOSE ANOTHER ADVENTURER'}
				</h1>

				<div className={'w-full flex flex-col md:flex-row text-megaxs mb-4 mt-6'}>
					<div className={'w-full flex flex-row'}>
						<input
							onChange={e => set_search(e?.target?.value || '')}
							className={'border-4 border-black dark:border-dark-100 bg-white dark:bg-dark-600 border-solid h-10 w-full md:w-75 mr-0 md:mr-4 text-xs px-2 focus:outline-none text-black dark:text-white'}
							placeholder={'SEARCH'} />
						<div
							onClick={() => set_classTab(0)}
							className={`p-2 cursor-pointer text-black dark:text-white flex justify-center items-center mr-4 ${classTab === 0 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
							{'ALL'}
						</div>
						<div
							onClick={() => set_classTab(1)}
							className={`p-2 cursor-pointer text-black dark:text-white ${classTab === 1 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
							{'FAVORITES'}
						</div>
					</div>

					<div className={'ml-0 md:ml-auto mt-2 md:mt-0 flex flex-row'}>
						<ListBox
							options={levelOptions}
							className={'mr-4 w-28'}
							set_selected={set_level}
							selected={level} />
						<ListBox
							options={classOptions}
							className={'mr-4 w-32'}
							set_selected={set_classSelected}
							selected={classSelected} />
					</div>
				</div>
				
				<div className={'grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 gap-y-0 md:gap-y-4 overflow-y-scroll px-1'}>
					{[...Object.values(rarities)]
						.filter((adventurer) => {
							if (classTab === 1)
								return favoritesAdventurers.includes(adventurer.tokenID);
							return true;
						})
						.filter((adventurer) => {
							if (level.value === 0)
								return true;
							return adventurer.level === level.value; 
						})
						.filter((adventurer) => {
							if (classSelected.value === 0)
								return true;
							return adventurer.class === classSelected.value; 
						})
						.filter((adventurer) => {
							if (search === '')
								return true;
							return (
								adventurer?.tokenID.toLowerCase().includes(search.toLowerCase())
								||
								adventurer?.name.toLowerCase().includes(search.toLowerCase())
							);
						})
						.sort((a, b) => {
							if (favoritesAdventurers.includes(a.tokenID))
								return -1;
							if (favoritesAdventurers.includes(b.tokenID))
								return 1;
							return 0;
						})
						.map((adventurer, i) => {
							return (
								<div key={`${adventurer.tokenID}_${i}`} className={'w-full'}>
									<Adventurer
										onClick={() => set_currentAdventurer(adventurer)}
										adventurer={adventurer}
										rarityClass={CLASSES[adventurer.class]}>
										<div
											onClick={() => {
												set_favoritesAdventurers(favoritesAdventurers.includes(adventurer.tokenID) ? favoritesAdventurers.filter(id => id !== adventurer.tokenID) : [...favoritesAdventurers, adventurer.tokenID]);
											}}
											className={`absolute right-4 top-4 ${favoritesAdventurers.includes(adventurer.tokenID) ? 'text-tag-info dark:text-tag-warning' : 'text-darkWhite dark:text-dark-400'}`}>
											<svg width={20} height={20} aria-hidden={'true'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 576 512'}><path fill={'currentColor'} d={'M316.7 17.8l65.43 132.4l146.4 21.29c26.27 3.796 36.79 36.09 17.75 54.59l-105.9 102.1l25.05 145.5c4.508 26.31-23.23 45.9-46.49 33.7L288 439.6l-130.9 68.7C133.8 520.5 106.1 500.9 110.6 474.6l25.05-145.5L29.72 226.1c-19.03-18.5-8.516-50.79 17.75-54.59l146.4-21.29l65.43-132.4C271.1-6.083 305-5.786 316.7 17.8z'}></path></svg>
										</div>
									</Adventurer>
								</div>
							);
						})}
				</div>
			</div>
		</section>
	);
}

export default Index;
