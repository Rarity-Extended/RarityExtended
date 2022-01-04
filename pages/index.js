/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 5th 2021
**	@Filename:				index.js
******************************************************************************/

import	React, {useState}								from	'react';
import	router											from	'next/router';
import	Image											from	'next/image';
import	Link											from	'next/link';
import	dayjs											from	'dayjs';
import	relativeTime									from	'dayjs/plugin/relativeTime';
import	SectionNoAdventurer								from	'sections/SectionNoAdventurer';
import	SectionCharacterSheet							from	'sections/SectionCharacterSheet';
import	useWeb3											from	'contexts/useWeb3';
import	useRarity										from	'contexts/useRarity';
import	useUI											from	'contexts/useUI';
import	Adventurer										from	'components/Adventurer';
import	ListBox											from	'components/ListBox';
import	Box												from	'components/Box';
import	TownNav											from	'components/TownNav';
import	Chevron											from	'components/Chevron';
import	ModalSkills										from	'components/ModalSkills';
import	ModalFeats										from	'components/ModalFeats';
import	useLocalStorage									from	'hook/useLocalStorage';
import	CLASSES											from	'utils/codex/classes';
import	{availableSkillPoints, calculatePointsForSet}	from	'utils/libs/raritySkills';
import	{featsPerClass, initialFeatsPerClass}			from	'utils/libs/rarityFeats';
import	{xpRequired}									from	'utils/libs/rarity';
import	{goAdventure, claimGold, levelUp}				from	'utils/actions';
import	Candy												from 	'components/icons/Candy';

dayjs.extend(relativeTime);

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

function	AdventurerList({favoritesAdventurers, set_favoritesAdventurers}) {
	const	{rarities, currentAdventurer, set_currentAdventurer} = useRarity();

	const	[search, set_search] = useState('');
	const	[classTab, set_classTab] = useState(0);
	const	[level, set_level] = useState(levelOptions[0]);
	const	[classSelected, set_classSelected] = useState(classOptions[0]);

	return (
		<>
			<h1 className={'text-black dark:text-white text-base mb-2 text-center md:text-left'}>
				{'CHOOSE ANOTHER ADVENTURER'}
			</h1>

			<div className={'w-full flex flex-col md:flex-row text-megaxs mb-4 mt-6 items-center'}>
				<div>
					<input
						onChange={e => set_search(e?.target?.value || '')}
						className={'border-4 border-black dark:border-dark-100 bg-white dark:bg-dark-600 border-solid h-10 w-full md:w-75 mr-0 md:mr-4 text-xs px-2 focus:outline-none text-black dark:text-white'}
						placeholder={'SEARCH'} />
				</div>
				<div className={'w-full'}>
					<div className={'w-full hidden md:flex flex-row'}>
						<div
							onClick={() => set_classTab(0)}
							className={`p-2 cursor-pointer text-black dark:text-white mr-4 ${classTab === 0 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
							{'ALL'}
						</div>
						<div
							onClick={() => set_classTab(1)}
							className={`p-2 cursor-pointer text-black dark:text-white ${classTab === 1 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
							{'FAVORITES'}
						</div>
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
				
			<div className={'grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 gap-y-0 md:gap-y-4 px-1'}>
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
									onClick={() => router.push(`/adventurer/${adventurer.tokenID}`)}
									adventurer={adventurer}
									rarityClass={CLASSES[adventurer.class]}>
									<div
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											set_favoritesAdventurers(favoritesAdventurers.includes(adventurer.tokenID) ? favoritesAdventurers.filter(id => id !== adventurer.tokenID) : [...favoritesAdventurers, adventurer.tokenID]);
										}}
										className={`absolute transition-colors left-4 top-4 ${favoritesAdventurers.includes(adventurer.tokenID) ? 'text-tag-info dark:text-tag-warning' : 'text-gray-secondary hover:text-tag-info dark:text-dark-400 dark:hover:text-tag-warning'}`}>
										<svg width={20} height={20} aria-hidden={'true'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 576 512'}><path fill={'currentColor'} d={'M316.7 17.8l65.43 132.4l146.4 21.29c26.27 3.796 36.79 36.09 17.75 54.59l-105.9 102.1l25.05 145.5c4.508 26.31-23.23 45.9-46.49 33.7L288 439.6l-130.9 68.7C133.8 520.5 106.1 500.9 110.6 474.6l25.05-145.5L29.72 226.1c-19.03-18.5-8.516-50.79 17.75-54.59l146.4-21.29l65.43-132.4C271.1-6.083 305-5.786 316.7 17.8z'}></path></svg>
									</div>
									<div
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											set_currentAdventurer(adventurer);
										}}
										className={`absolute transition-colors right-4 top-0 ${adventurer.tokenID === currentAdventurer.tokenID ? 'text-tag-info dark:text-dark-100' : 'text-gray-secondary hover:text-tag-info dark:text-dark-400 dark:hover:text-dark-100'}`}>
										<svg width={24} height={24} xmlns={'http://www.w3.org/2000/svg'} x={'0px'} y={'0px'} viewBox={'0 0 24 24'}>
											<path d={'M18,2H6v2h12v16h-2v-2h-2v-2h-4v2H8v2H6V2H4v20h4v-2h2v-2h4v2h2v2h4V2H18z'} fill={'currentcolor'}/>
											<polygon fill={'currentcolor'} points={'6,4 18,4 18,20 16,20 16,18 14,18 14,16 10,16 10,18 8,18 8,20 6,20 '}/>
										</svg>
									</div>
								</Adventurer>
							</div>
						);
					})}
			</div>
		</>
	);
}

function	Overview({router, favoritesAdventurers, set_favoritesAdventurers}) {
	const	{provider, chainTime} = useWeb3();
	const	{currentAdventurer, updateRarity} = useRarity();
	const	[page, set_page] = useState(0);
	const	[tab, set_tab] = useState(0);
	const	[modalSkillsOpen, set_modalSkillsOpen] = useState(false);
	const	[modalFeatsOpen, set_modalFeatsOpen] = useState(false);
	const	isInTheForest = currentAdventurer?.level >= 2 && !currentAdventurer?.dungeons?.forest?.canAdventure;

	const	taskList = [
		{
			label: 'Set attributes',
			condition: () => currentAdventurer?.attributes?.remainingPoints > 0,
			onClick: () => router.push(`/adventurer/${currentAdventurer.tokenID}`)
		},
		{
			label: 'Set skills',
			condition: () => {
				const	_availableSkillPoints = availableSkillPoints(currentAdventurer.attributes.intelligence, currentAdventurer.class, currentAdventurer.level);
				const	_pointSpentByAdventurer = calculatePointsForSet(currentAdventurer.class, currentAdventurer?.skills || []);
				return _availableSkillPoints > _pointSpentByAdventurer;
			},
			onClick: () => set_modalSkillsOpen(true)
		},
		{
			label: 'Set feats',
			condition: () => {
				const	_maxFeatsForAventurer = featsPerClass(currentAdventurer.class, currentAdventurer?.level);
				const	_initialFeatsPerClass = initialFeatsPerClass(currentAdventurer.class);
				const	_adventurerFeats = currentAdventurer.feats || [];
				const	_unlockedFeats = [...new Set([..._initialFeatsPerClass, ..._adventurerFeats])];
				const	_pointLefts = _maxFeatsForAventurer - _unlockedFeats.length;
				return _pointLefts > 0;
			},
			onClick: () => set_modalFeatsOpen(true)
		},
		{
			label: 'Claim XP',
			condition: () => currentAdventurer.logCanAdventure,
			onClick: () => onGoToAdventure()
		},
		{
			label: 'Claim Gold',
			condition: () => currentAdventurer?.gold?.claimable > 0,
			onClick: () => onClaimGold()
		},
		{
			label: 'Level up',
			condition: () => currentAdventurer.xp >= (xpRequired(currentAdventurer.level)),
			onClick: () => onLevelUp()
		},
		{
			label: 'Set Name',
			condition: () => currentAdventurer.name === '',
			onClick: () => router.push(`/adventurer/${currentAdventurer.tokenID}`)
		},
		{
			label: 'Handle the Big Ugly Rat in the Cellar',
			condition: () => currentAdventurer?.dungeons?.cellar?.canAdventure,
			onClick: () => router.push('/countryside/cellar')
		},
		{
			label: 'Go in the Forest',
			condition: () => currentAdventurer?.dungeons?.forest?.canAdventure,
			onClick: () => router.push('/countryside/forest')
		},
		{
			label: 'Handle the Boar situation',
			condition: () => currentAdventurer?.dungeons?.boars?.canAdventure,
			onClick: () => router.push('/countryside/boars')
		},
	];
	const	availableTasks = taskList.filter(t => t.condition());

	function	onGoToAdventure() {
		goAdventure({
			loader: isInTheForest ? 'Claiming XP...' : 'Going on an adventure...',
			provider,
			contractAddress: process.env.RARITY_ADDR,
			tokenID: currentAdventurer.tokenID,
		}, ({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(data);
		});
	}
	function	onClaimGold() {
		claimGold({
			provider,
			contractAddress: process.env.RARITY_GOLD_ADDR,
			tokenID: currentAdventurer.tokenID,
		}, ({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(data);
		});
	}
	function	onLevelUp() {
		levelUp({
			provider,
			tokenID: currentAdventurer.tokenID,
		}, ({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(data);
		});
	}

	function	renderDungeonsNav() {
		return (
			<div style={{height: 312}} className={'w-full px-4 flex flex-col relative mb-4 md:mb-1 h-full'}>
				<div className={'flex flex-col items-center overflow-y-scroll scrollbar-none text-white'}>
					<Link href={'/countryside/boars'}>
						<div className={'mt-2 mb-4 w-full relative bg-dark-400 border-2 border-black dark:border-dark-100 group cursor-pointer'}>
							<div className={'opacity-40 overflow-hidden -mb-1'}>
								<Image
									src={'/illustrations/illuBoars.jpeg'}
									loading={'eager'}
									objectFit={'cover'}
									objectPosition={'top'}
									quality={70}
									width={800}
									height={150} />
							</div>
							<div className={'absolute inset-0 opacity-30'} style={{backgroundColor: '#554a40'}} />

							<div className={'absolute inset-0 flex flex-row'}>
								<div className={'w-1/2 h-full p-6'}>
									<h1 className={'text-shadow-lg'}>{'The Boars'}</h1>
									<p className={'text-shadow-lg text-regular pt-2'}>{'Kill or Protect the Boars. The destiny of the Forest is in your hands ...'}</p>
								</div>
								<div className={'w-1/2 h-full p-6 flex justify-end items-center'}>
									<svg className={'group-hover:animate-bounce-r opacity-30 group-hover:opacity-100 transition-opacity'} width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M4 11v2h12v2h2v-2h2v-2h-2V9h-2v2H4zm10-4h2v2h-2V7zm0 0h-2V5h2v2zm0 10h2v-2h-2v2zm0 0h-2v2h2v-2z'} fill={'currentColor'}/> </svg>
								</div>
							</div>
						</div>
					</Link>

					<Link href={'/countryside/openmic'}>
						<div className={'mb-4 w-full relative bg-dark-400 border-2 border-black dark:border-dark-100 group cursor-pointer'}>
							<div className={'opacity-40 overflow-hidden -mb-1'}>
								<Image
									src={'/illustrations/illuOpenMic.jpeg'}
									loading={'eager'}
									objectFit={'cover'}
									objectPosition={'top'}
									quality={70}
									width={800}
									height={150} />
							</div>
							<div className={'absolute inset-0 opacity-30'} style={{backgroundColor: '#FDAC53'}} />

							<div className={'absolute inset-0 flex flex-row'}>
								<div className={'w-1/2 h-full p-6'}>
									<h1 className={'text-shadow-lg'}>{'Tavern Hooligans'}</h1>
									<p className={'text-shadow-lg text-regular pt-2'}>{'Hooligans are taking over the tavern. Get up there and give them a show, see if you can calm them down...'}</p>
								</div>
								<div className={'w-1/2 h-full p-6 flex justify-end items-center'}>
									<svg className={'group-hover:animate-bounce-r opacity-30 group-hover:opacity-100 transition-opacity'} width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M4 11v2h12v2h2v-2h2v-2h-2V9h-2v2H4zm10-4h2v2h-2V7zm0 0h-2V5h2v2zm0 10h2v-2h-2v2zm0 0h-2v2h2v-2z'} fill={'currentColor'}/> </svg>
								</div>
							</div>
						</div>
					</Link>

					<Link href={'/countryside/forest'}>
						<div className={'mb-4 w-full relative bg-dark-400 border-2 border-black dark:border-dark-100 group cursor-pointer'}>
							<div className={'opacity-40 overflow-hidden -mb-1'}>
								<Image
									src={'/illustrations/illuForest.jpeg'}
									className={'filter'}
									loading={'eager'}
									objectFit={'cover'}
									objectPosition={'top'}
									quality={70}
									width={800}
									height={150} />
							</div>
							<div className={'absolute inset-0 opacity-30'} style={{backgroundColor: '#124712'}} />

							<div className={'absolute inset-0 flex flex-row'}>
								<div className={'w-1/2 h-full p-6'}>
									<h1 className={'text-shadow-lg'}>{'The Forest'}</h1>
									<p className={'text-shadow-lg text-regular pt-2'}>{'This drunk man in the Tavern talked about treasure ... What does this big Forest hide ?'}</p>
								</div>
								<div className={'w-1/2 h-full p-6 flex justify-end items-center'}>
									<svg className={'group-hover:animate-bounce-r opacity-30 group-hover:opacity-100 transition-opacity'} width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M4 11v2h12v2h2v-2h2v-2h-2V9h-2v2H4zm10-4h2v2h-2V7zm0 0h-2V5h2v2zm0 10h2v-2h-2v2zm0 0h-2v2h2v-2z'} fill={'currentColor'}/> </svg>
								</div>
							</div>
						</div>
					</Link>

					<Link href={'/countryside/cellar'}>
						<div className={'mb-4 w-full relative bg-dark-400 border-2 border-black dark:border-dark-100 group cursor-pointer'}>
							<div className={'opacity-40 overflow-hidden -mb-1'}>
								<Image
									src={'/illustrations/illuCellar.jpeg'}
									className={'filter'}
									loading={'eager'}
									objectFit={'cover'}
									objectPosition={'left'}
									quality={70}
									width={800}
									height={150} />
							</div>
							<div className={'absolute inset-0 flex flex-row'}>
								<div className={'w-1/2 h-full p-6'}>
									<h1 className={'text-shadow-lg'}>{'The Cellar'}</h1>
									<p className={'text-shadow-lg text-regular pt-2'}>{'A Big Ugly Rat in the Cellar? Sounds like the perfect adventurer for a beginner!'}</p>
								</div>
								<div className={'w-1/2 h-full p-6 flex justify-end items-center'}>
									<svg className={'group-hover:animate-bounce-r opacity-30 group-hover:opacity-100 transition-opacity'} width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M4 11v2h12v2h2v-2h2v-2h-2V9h-2v2H4zm10-4h2v2h-2V7zm0 0h-2V5h2v2zm0 10h2v-2h-2v2zm0 0h-2v2h2v-2z'} fill={'currentColor'}/> </svg>
								</div>
							</div>
						</div>
					</Link>
				</div>
			</div>
		);
	}

	function	renderTasks() {
		return (
			<div style={{height: 312}} className={'w-full px-4 flex flex-col relative mb-4 md:mb-1 h-full'}>
				<div className={'flex flex-col items-center overflow-y-scroll scrollbar-none'}>
					{availableTasks.length > 0 ? availableTasks.map((task, index) => (
						<div
							key={task.label}
							onClick={task.onClick}
							className={`${index === 0 ? 'mt-2' : ''} flex w-full flex-row items-center p-2 text-regular hover:bg-gray-principal dark:hover:bg-dark-400 cursor-pointer`}>
							<div className={'mr-6'}>
								<svg width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M3 3h18v18H3V3zm16 16V5H5v14h14z'} fill={'currentColor'}/> </svg>
							</div>
							<div>
								{task.label}
							</div>
						</div>
					)) : (
						<div className={'mt-16 text-black dark:text-dark-100 dark:text-opacity-60 text-opacity-60'}>
							<svg width={120} height={120} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M5 3h14v2H5V3zm0 16H3V5h2v14zm14 0v2H5v-2h14zm0 0h2V5h-2v14zM10 8H8v2h2V8zm4 0h2v2h-2V8zm-5 6v-2H7v2h2zm6 0v2H9v-2h6zm0 0h2v-2h-2v2z'} fill={'currentColor'}/> </svg>
						</div>
					)}
				</div>
				{modalSkillsOpen && <ModalSkills
					adventurer={currentAdventurer}
					isOpen={modalSkillsOpen}
					closeModal={() => set_modalSkillsOpen(false)} />}
				{modalFeatsOpen && <ModalFeats
					adventurer={currentAdventurer}
					isOpen={modalFeatsOpen}
					closeModal={() => set_modalFeatsOpen(false)} />}
			</div>
		);
	}

	function	renderTownNav() {
		return (
			<>
				<div
					style={{height: 312}}
					className={'w-full p-4 flex flex-col relative mb-4 md:mb-1 h-full'}>
					<TownNav start={page * 6} />
				</div>
				<div className={'absolute bottom-4 right-4 flex w-full text-xss justify-end items-center text-black dark:text-dark-100 mt-4'}>
					<Chevron
						width={12}
						height={12}
						onClick={() => page !== 0 && set_page(page - 1)}
						className={`mr-2 select-none ${page === 0 ? 'opacity-0' : 'cursor-pointer text-black dark:text-dark-100 dark:hover:text-white'}`} />
					{`${page + 1}/1`}
					<Chevron
						width={12}
						height={12}
						onClick={() => page !== 0 && set_page(page + 1)}
						className={`ml-2 select-none transform rotate-180 ${page === 0 ? 'opacity-0' : 'cursor-pointer text-black dark:text-dark-100 dark:hover:text-white'}`} />
				</div>
			</>
		);
	}

	return (
		<div className={'grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 gap-y-0 md:gap-y-4 px-1 mb-24'}>
			<div className={'w-full col-span-4 md:col-span-1'}>
				<Adventurer
					onClick={() => router.push(`/adventurer/${currentAdventurer.tokenID}`)}
					adventurer={currentAdventurer}
					rarityClass={CLASSES[currentAdventurer.class]}>
					<div
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							set_favoritesAdventurers(favoritesAdventurers.includes(currentAdventurer.tokenID) ? favoritesAdventurers.filter(id => id !== currentAdventurer.tokenID) : [...favoritesAdventurers, currentAdventurer.tokenID]);
						}}
						className={`absolute transition-colors left-4 top-4 ${favoritesAdventurers.includes(currentAdventurer.tokenID) ? 'text-tag-info dark:text-tag-warning' : 'text-gray-secondary hover:text-tag-info dark:text-dark-400 dark:hover:text-tag-warning'}`}>
						<svg width={20} height={20} aria-hidden={'true'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 576 512'}><path fill={'currentColor'} d={'M316.7 17.8l65.43 132.4l146.4 21.29c26.27 3.796 36.79 36.09 17.75 54.59l-105.9 102.1l25.05 145.5c4.508 26.31-23.23 45.9-46.49 33.7L288 439.6l-130.9 68.7C133.8 520.5 106.1 500.9 110.6 474.6l25.05-145.5L29.72 226.1c-19.03-18.5-8.516-50.79 17.75-54.59l146.4-21.29l65.43-132.4C271.1-6.083 305-5.786 316.7 17.8z'}></path></svg>
					</div>

					<div className={'absolute right-4 top-0 text-tag-info dark:text-dark-100'}>
						<svg width={24} height={24} xmlns={'http://www.w3.org/2000/svg'} x={'0px'} y={'0px'} viewBox={'0 0 24 24'}>
							<path d={'M18,2H6v2h12v16h-2v-2h-2v-2h-4v2H8v2H6V2H4v20h4v-2h2v-2h4v2h2v2h4V2H18z'} fill={'currentcolor'}/>
							<polygon fill={'currentcolor'} points={'6,4 18,4 18,20 16,20 16,18 14,18 14,16 10,16 10,18 8,18 8,20 6,20 '}/>
						</svg>
					</div>
				</Adventurer>
				<div className={'mt-2'}>
					<div>
						{currentAdventurer.logCanAdventure ? (
							<Box
								onClick={onGoToAdventure}
								className={'px-4 py-3 w-full relative text-sx flex items-center justify-center cursor-pointer group'}>
								<div className={'absolute inset-0 bg-blackLight dark:bg-dark-200 animate-pulse bg-opacity-20 dark:bg-opacity-40 group-hover:animate-none'} />
								<>
									<svg className={'relative'} width={24} height={24} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M6 2h2v2H6V2zm2 3H6v3H2v9h6v-2h2v2h4v-2h2v2h6V8h-4V5h-2v3h-3V5h-2v3H8V5zm12 10h-4v-3h-2v3h-4v-3H8v3H4v-5h16v5zM2 20h20v2H2v-2zM13 2h-2v2h2V2zm3 0h2v2h-2V2zM2 17h2v3H2zm18 0h2v3h-2z'} fill={'currentcolor'}/> </svg>
									<p className={'pl-4 pt-1 relative'}>
										{'Claim XP'}
									</p>
								</>
							</Box>
						) : (
							<Box className={'px-4 py-3 w-full relative text-sx flex items-center justify-center'}>
								<svg className={'relative'} width={24} height={24} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M0 4h2v12h10V8h10v2h-8v6h8v-6h2v10h-2v-2H2v2H0V4zm3 5h2v4H3V9zm6 4v2H5v-2h4zm0-4h2v4H9V9zm0 0H5V7h4v2z'} fill={'currentColor'}/> </svg>
								<p className={'pl-4 pt-1 relative'}>
									{`${dayjs(new Date(currentAdventurer.log * 1000)).from(dayjs(new Date(chainTime * 1000)))}`}
								</p>
							</Box>
						)}
					</div>
				</div>
			</div>
			<div className={'w-full col-span-4 md:col-span-3 mt-4 md:mt-0 hidden md:block'}>
				<Box className={'w-full flex flex-col relative'}>

					<div className={'flex flex-row w-full relative'}>
						<div
							onClick={() => set_tab(0)}
							className={`flex flex-row items-center text-regular p-4 px-6 border-r-2 border-black dark:border-dark-100 text-black dark:text-white ${tab !== 0 ? 'border-b-4 dark:text-dark-200 dark:hover:text-dark-100 cursor-pointer' : ''}`}>
							<svg width={16} height={16} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M14 2h-4v2H8v2H6v2H4v2H2v2h2v10h7v-6h2v6h7V12h2v-2h-2V8h-2V6h-2V4h-2V2zm0 2v2h2v2h2v2h2v2h-2v8h-3v-6H9v6H6v-8H4v-2h2V8h2V6h2V4h4z'} fill={'currentColor'}/> </svg>
							<p className={'mt-1 ml-2'}>{'TOWN'}</p>
						</div>
						<div
							onClick={() => set_tab(1)}
							className={`flex flex-row items-center text-regular p-4 px-6 border-l-2 border-r-2 border-black dark:border-dark-100 text-black dark:text-white ${tab !== 1 ? 'border-b-4 dark:text-dark-200 dark:hover:text-dark-100 cursor-pointer' : ''}`}>
							<svg width={16} height={16} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M6 3h14v2h2v6h-2v8h-2V5H6V3zm8 14v-2H6V5H4v10H2v4h2v2h14v-2h-2v-2h-2zm0 0v2H4v-2h10zM8 7h8v2H8V7zm8 4H8v2h8v-2z'} fill={'currentColor'}/> </svg>
							<p className={'mt-1 ml-2'}>{'QUESTS'}</p>
						</div>
						<div
							onClick={() => set_tab(2)}
							className={`flex flex-row items-center text-regular p-4 px-6 w-full border-l-2 border-black dark:border-dark-100 text-black dark:text-white ${tab !== 2 ? 'border-b-4 dark:text-dark-200 dark:hover:text-dark-100 cursor-pointer' : ''}`}>
							<svg width={16} height={16} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M19 4h2v2h-2V4zm-2 4V6h2v2h-2zm-2 0h2v2h-2V8zm0 0h-2V6h2v2zM3 6h8v2H3V6zm8 10H3v2h8v-2zm7 2v-2h2v-2h-2v2h-2v-2h-2v2h2v2h-2v2h2v-2h2zm0 0v2h2v-2h-2z'} fill={'currentColor'}/> </svg>
							<p className={'mt-1 ml-2'}>{`TASKS ${availableTasks.length > 0 ? `(${availableTasks.length})` : ''}`}</p>
						</div>

						<div
							onClick={() => router.push('/town/guild-house')}
							className={'absolute right-0 top-1 flex flex-row items-center text-regular p-4 px-6 text-black cursor-pointer dark:text-dark-200 dark:hover:text-tag-warning'}>
							<svg width={16} height={16} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M12 1h2v8h8v4h-2v-2h-8V5h-2V3h2V1zM8 7V5h2v2H8zM6 9V7h2v2H6zm-2 2V9h2v2H4zm10 8v2h-2v2h-2v-8H2v-4h2v2h8v6h2zm2-2v2h-2v-2h2zm2-2v2h-2v-2h2zm0 0h2v-2h-2v2z'} fill={'currentColor'}/> </svg>
						</div>
					</div>

					{tab === 0 ? renderTownNav() : null}
					{tab === 1 ? renderDungeonsNav() : null}
					{tab === 2 ? renderTasks() : null}
				</Box>
			</div>
		</div>
	);
}

function	Index({router}) {
	const	{provider, chainTime} = useWeb3();
	const	{rarities, updateRarity} = useRarity();
	const	{layout} = useUI();
	const	adventurers = Object.values(rarities);
	const	[favoritesAdventurers, set_favoritesAdventurers] = useLocalStorage('favorites', []);

	if (adventurers?.length === 0) {
		return (
			<SectionNoAdventurer />
		);
	}

	return (
		<section className={'mt-16 md:mt-8'}>
			<div className={'flex flex-col max-w-screen-lg w-full mx-auto'}>
				<Overview
					router={router}
					favoritesAdventurers={favoritesAdventurers}
					set_favoritesAdventurers={set_favoritesAdventurers} />

				{layout === 'legacy' ? (
					<div className={'flex flex-col space-y-36 mt-12 md:mt-0 max-w-screen-lg w-full mx-auto'}>
						{
							adventurers?.map((adventurer) => (
								<SectionCharacterSheet
									key={adventurer.tokenID}
									rarity={adventurer}
									provider={provider}
									updateRarity={updateRarity}
									chainTime={chainTime}
									router={router} />
							))
						}
					</div>
				) : (
					<AdventurerList
						favoritesAdventurers={favoritesAdventurers}
						set_favoritesAdventurers={set_favoritesAdventurers} />
				)
				}
			</div>
		</section>
	);
}

export default Index;
