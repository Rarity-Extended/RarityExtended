/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@MajorTom_eth
**	@Date:					Sunday September 5th 2021
**	@Filename:				index.js
******************************************************************************/

import	React, {Fragment, useState}		from	'react';
import	Image							from	'next/image';
import	Link							from	'next/link';
import	dayjs							from	'dayjs';
import	relativeTime					from	'dayjs/plugin/relativeTime';
import	{Dialog, Transition}			from	'@headlessui/react';
import	SectionNoAdventurer				from	'sections/SectionNoAdventurer';
import	useWeb3							from	'contexts/useWeb3';
import	useRarity						from	'contexts/useRarity';
import	ITEMS							from	'utils/items';
import	CLASSES							from	'utils/classList';
import	SKILLS							from	'utils/skillList';
import	classNameMapping				from	'utils/classNameMapping';
import	{goAdventure, levelUp, setAttributes, claimGold, learnSkills}	from	'utils/actions';
import	{availableSkillPoints, calculatePointsForSet}				from	'lib/skills';
import	Chevron							from	'components/Chevron';

dayjs.extend(relativeTime);

const	classMappingImg = [
	'',
	'/front/barbarian.svg',
	'/bard.png',
	'/cleric.png',
	'/druid.png',
	'/fighter.png',
	'/monk.png',
	'/paladin.png',
	'/ranger.png',
	'/rogue.png',
	'/sorcerer.png',
	'/wizard.png',
];

function	DailyBalloon({rarity, chainTime, provider, updateRarity}) {
	const	[ask, set_ask] = useState(0);
	const	canAdventure = !dayjs(new Date(rarity.log * 1000)).isAfter(dayjs(new Date(chainTime * 1000)));
	const	canGold = Number(rarity?.gold?.claimable || 0) > 0;

	function	onGoToAdventure() {
		goAdventure({
			provider,
			contractAddress: process.env.RARITY_ADDR,
			tokenID: rarity.tokenID,
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
			tokenID: rarity.tokenID,
		}, ({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(data);
		});
	}

	if (ask <= 0 && canAdventure) {
		return (
			<div className={'nes-balloon rounded-lg border-black dark:border-dark-100 border-4 relative from-left text-xs md:text-base'}>
				<div className={'mb-2'}>
					{'Would you like to go on an adventure ?'}
					<div className={'mt-6'}>
						<span className={'cursor-pointer'} onClick={onGoToAdventure}>
							<span className={'inline mb-1 mr-2 group-hover:opacity-100'} style={{cursor: 'pointer'}}>{'>'}</span>
							<span>{'Yes'}</span>
						</span>
						<span className={'ml-6 cursor-pointer'} onClick={() => canGold ? set_ask(1) : null}>
							<span className={'inline mb-1 mr-2 opacity-5'} style={{cursor: 'pointer'}}>{'>'}</span>
							<span className={'opacity-40'}>{'no'}</span>
						</span>
					</div>
				</div>
				{canGold ? <div className={'absolute right-0 bottom-0 text-xl animate-bounce-r cursor-pointer p-2'} onClick={() => set_ask(1)}>
					{'▸'}
				</div> : null}
			</div>
		);
	}
	if (ask <= 1 && canGold) {
		return (
			<div className={'nes-balloon rounded-lg border-black dark:border-dark-100 border-4 relative from-left text-xs md:text-base '}>
				<div className={'mb-2'}>
					{`Would you like to claim your ${Number(rarity?.gold?.claimable)} golds ?`}
					<div className={'mt-6'}>
						<span className={'cursor-pointer'} onClick={onClaimGold}>
							<span className={'inline mb-1 mr-2 group-hover:opacity-100'} style={{cursor: 'pointer'}}>{'>'}</span>
							<span>{'Claim'}</span>
						</span>
						<span className={'ml-6 cursor-pointer'} onClick={() => canGold ? set_ask(1) : null}>
							<span className={'inline mb-1 mr-2 opacity-5'} style={{cursor: 'pointer'}}>{'>'}</span>
							<span className={'opacity-40'}>{'no'}</span>
						</span>
					</div>
				</div>
				{canAdventure ? <div className={'absolute right-0 bottom-0 text-xl animate-bounce-r cursor-pointer p-2'} onClick={() => set_ask(0)}>
					{'◂'}
				</div> : null}
			</div>
		);
	}

	return (
		<div className={'nes-balloon rounded-lg border-black dark:border-dark-100 border-4 relative from-left text-xs md:text-base'}>
			<p>{`Next adventure ready ${dayjs(new Date(rarity.log * 1000)).from(dayjs(new Date(chainTime * 1000)))}`}</p>
		</div>
	);
}

function	Attribute({isInit, name, value, updateAttribute, set_updateAttribute, toUpdate}) {
	function pointCost(val) {
		if (val <= 14) {
			return val - 8;
		} else {
			return Math.floor(((val - 8)**2)/6);
		}
	}

	const	getPreviousRemainingPoints = () => {
		let	_remainingPoints = updateAttribute.remainingPoints;
		let _pointsToRemove = pointCost(updateAttribute[name] - 1) - pointCost(updateAttribute[name]);
		_remainingPoints = _remainingPoints - _pointsToRemove;
		return (_remainingPoints);
	};
	const	getNextRemainingPoints = () => {
		let	_remainingPoints = updateAttribute.remainingPoints;
		let _pointsToRemove = pointCost(updateAttribute[name]) - pointCost(updateAttribute[name] + 1);
		_remainingPoints = _remainingPoints + _pointsToRemove;
		return (_remainingPoints);
	};

	return (
		<div className={'flex flex-row items-center w-full py-2'}>
			<div className={'opacity-80 text-xs md:text-sm'}>{`${name}: `}</div>
			<div className={'w-full text-right'}>
				<div className={'flex flex-row items-center justify-end'}>
					<div 
						onClick={() => {
							if (isInit || updateAttribute[name] === value || !toUpdate)
								return;
							const	previousRemainingPoints = getPreviousRemainingPoints();
							if (updateAttribute.remainingPoints !== updateAttribute.maxPoints) {
								set_updateAttribute(u => ({
									...u,
									[name]: u[name] - 1,
									remainingPoints: previousRemainingPoints
								}));
							}
						}}
						className={`text-sm w-4 text-left ${isInit || updateAttribute[name] === value || !toUpdate ? 'opacity-0' : 'cursor-pointer'}`}>
						{'-'}
					</div>
					<div className={'w-9 text-center'}>{updateAttribute[name]}</div>
					<div 
						onClick={() => {
							if (isInit || !toUpdate)
								return;
							const	nextRemainingPoints = getNextRemainingPoints();
							if (getNextRemainingPoints() >= 0) {
								set_updateAttribute(u => ({
									...u,
									[name]: u[name] + 1,
									remainingPoints: nextRemainingPoints
								}));
							}
						}}
						className={`text-sm w-4 text-right ${isInit || getNextRemainingPoints() < 0 || !toUpdate ? 'opacity-0' : 'cursor-pointer'}`}>
						{'+'}
					</div>
				</div>
			</div>
		</div>
	);
}
function	Attributes({rarity, updateRarity, provider}) {
	const	[updateAttribute, set_updateAttribute] = useState({
		strength: rarity?.attributes?.strength,
		dexterity: rarity?.attributes?.dexterity,
		constitution: rarity?.attributes?.constitution,
		intelligence: rarity?.attributes?.intelligence,
		wisdom: rarity?.attributes?.wisdom,
		charisma: rarity?.attributes?.charisma,
		maxPoints: rarity?.attributes?.maxPoints,
		remainingPoints: rarity?.attributes?.remainingPoints
	});

	async function buyPoints() {
		if (updateAttribute.remainingPoints === 0) {
			setAttributes({
				provider,
				contractAddress: process.env.RARITY_ATTR_ADDR,
				_summoner: rarity.tokenID,
				_str: updateAttribute.strength,
				_dex: updateAttribute.dexterity,
				_const: updateAttribute.constitution,
				_int: updateAttribute.intelligence,
				_wis: updateAttribute.wisdom,
				_cha: updateAttribute.charisma
			}, ({error, data}) => {
				if (error) {
					return console.error(error);
				}
				set_updateAttribute(u => ({
					...u,
					remainingPoints: -1
				}));
				updateRarity(data._summoner);
			});
		}
	}

	return (
		<div className={'nes-container pt-6 pb-0 px-4 border-4 border-solid border-black dark:border-dark-100 with-title w-full md:w-1/3 -mt-1 md:mt-0'}>
			<div className={'title bg-white dark:bg-dark-600 mb-1'}>{'Attributes'}</div>
			{updateAttribute.remainingPoints >= 0 ? (
				<p onClick={buyPoints} className={`text-xss border-t-2 border-b-2 border-black dark:border-dark-100 flex justify-center items-center py-1 my-2 ${updateAttribute.remainingPoints === 0 ? 'animate-pulse text-center cursor-pointer hover:bg-black hover:animate-none hover:text-white' : ''}`}>
					{updateAttribute.remainingPoints === 0 ?
						'▶ Save you stats ! ◀'
						:
						`▶ You have ${updateAttribute.remainingPoints} points to spend ! ◀`
					}
				</p>
			) : null}
			<Attribute
				isInit={rarity?.attributes?.isInit}
				value={rarity.attributes.strength}
				updateAttribute={updateAttribute}
				set_updateAttribute={set_updateAttribute}
				toUpdate={updateAttribute.remainingPoints >= 0}
				name={'strength'} />
			<Attribute
				isInit={rarity?.attributes?.isInit}
				value={rarity.attributes.dexterity}
				updateAttribute={updateAttribute}
				set_updateAttribute={set_updateAttribute}
				toUpdate={updateAttribute.remainingPoints >= 0}
				name={'dexterity'} />
			<Attribute
				isInit={rarity?.attributes?.isInit}
				value={rarity.attributes.constitution}
				updateAttribute={updateAttribute}
				set_updateAttribute={set_updateAttribute}
				toUpdate={updateAttribute.remainingPoints >= 0}
				name={'constitution'} />
			<Attribute
				isInit={rarity?.attributes?.isInit}
				value={rarity.attributes.intelligence}
				updateAttribute={updateAttribute}
				set_updateAttribute={set_updateAttribute}
				toUpdate={updateAttribute.remainingPoints >= 0}
				name={'intelligence'} />
			<Attribute
				isInit={rarity?.attributes?.isInit}
				value={rarity.attributes.wisdom}
				updateAttribute={updateAttribute}
				set_updateAttribute={set_updateAttribute}
				toUpdate={updateAttribute.remainingPoints >= 0}
				name={'wisdom'} />
			<Attribute
				isInit={rarity?.attributes?.isInit}
				value={rarity.attributes.charisma}
				updateAttribute={updateAttribute}
				set_updateAttribute={set_updateAttribute}
				toUpdate={updateAttribute.remainingPoints >= 0}
				name={'charisma'} />
		</div>
	);
}
function	Inventory({adventurer}) {
	const	OFFSET_SIZE = 9;
	const	[offset, set_offset] = useState(0);
	const	allItems = ITEMS;
	// const	allItems = [...ITEMS, ...ITEMS,...ITEMS, ...ITEMS,...ITEMS, ...ITEMS,...ITEMS, ...ITEMS,...ITEMS, ...ITEMS,...ITEMS, ...ITEMS,...ITEMS, ...ITEMS,...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS,...ITEMS, ...ITEMS,...ITEMS, ...ITEMS,...ITEMS, ...ITEMS,...ITEMS, ...ITEMS,...ITEMS, ...ITEMS,...ITEMS, ...ITEMS,...ITEMS, ...ITEMS];

	function	renderInventory() {
		let		hasItem = false;
		const	toRender = allItems
			.filter((e, i) => i >= offset && i < (offset + OFFSET_SIZE))
			.map((item, i) => {
				if ((Number(adventurer?.inventory?.[item.id]) > 0 || item.shouldAlwaysDisplay) && !item.shouldNeverDisplay) {
					hasItem = true;
					return (
						<div className={'flex flex-row space-x-4 w-full'} key={`${item.id}_${i}`}>
							<div className={'w-16 h-16 bg-gray-50 dark:bg-dark-400 flex justify-center items-center relative item'}>
								<div className={`absolute ${item.levelClassName} left-0 top-0 w-2 h-1`} />
								<div className={`absolute ${item.levelClassName} left-0 top-0 w-1 h-2`} />
								<div className={`absolute ${item.levelClassName} right-0 top-0 w-2 h-1`} />
								<div className={`absolute ${item.levelClassName} right-0 top-0 w-1 h-2`} />
								<Image src={item.img} width={48} height={48} />
								<div className={`absolute ${item.levelClassName} left-0 bottom-0 w-2 h-1`} />
								<div className={`absolute ${item.levelClassName} left-0 bottom-0 w-1 h-2`} />
								<div className={`absolute ${item.levelClassName} right-0 bottom-0 w-2 h-1`} />
								<div className={`absolute ${item.levelClassName} right-0 bottom-0 w-1 h-2`} />
							</div>
							<div className={'text-left'}>
								<p>{item.name}</p>
								<p className={'text-xs'}>{`QTY: ${Number(adventurer?.inventory?.[item.id])}`}</p>
							</div>
						</div>
					);
				}
				return (null);
			});

		if (!hasItem) {
			return (
				<div className={'w-full'}>
					<div className={'p-4 flex text-black dark:text-white text-sx normal-case w-full md:w-1/2 pr-0 md:pr-32'}>
						{'You have no items yet, traveler, find them in Dungeons!'}
					</div>
					<div className={'flex flex-col md:flex-row'}>
						<div className={'flex w-full md:w-1/2 px-4 pb-4 md:pb-0'}>
							<Link href={'/town/quest'}>
								<div
									className={'border-4 border-black dark:border-dark-100 px-10 py-2 text-black dark:text-white hover:bg-gray-secondary dark:hover:bg-dark-400 cursor-pointer transition-colors flex items-center text-center justify-center text-xs w-full'}>
									<p>{'GO TO THE QUEST OFFICE'}</p>
								</div>
							</Link>
						</div>
						<div className={'flex w-full md:w-1/2 px-4'}>
							<Link href={'/town/tavern'}>
								<div
									className={'border-4 border-black dark:border-dark-100 px-10 py-2 text-black dark:text-white hover:bg-gray-secondary dark:hover:bg-dark-400 cursor-pointer transition-colors flex items-center text-center justify-center text-xs w-full'}>
									<p>{'GO TO THE TAVERN'}</p>
								</div>
							</Link>
						</div>
					</div>
				</div>
			);
		}
		return (
			<div className={'w-full'}>
				<div className={'w-full p-4 grid grid-cols-3 gap-4'}>
					{toRender}
				</div>
				<div className={'-mt-8 h-8 px-4'}>
					<div className={'w-full h-full flex justify-end items-center space-x-4'}>
						<p className={`text-xs ${offset > OFFSET_SIZE ? 'opacity-40 hover:opacity-100 cursor-pointer' : 'opacity-0'}`} onClick={() => set_offset(o => o > OFFSET_SIZE ? o - OFFSET_SIZE : 0)}>{'<'}</p>
						<p className={`text-xs ${offset + OFFSET_SIZE <= allItems.length ? 'opacity-40 hover:opacity-100 cursor-pointer' : 'opacity-0'}`} onClick={() => set_offset(o => o + OFFSET_SIZE <= allItems.length ? o + OFFSET_SIZE : o)}>{'>'}</p>
					</div>
				</div>
			</div>
		);
	}
	return (renderInventory());
}
function	Skills({adventurer, updateRarity, provider}) {
	const	_availableSkillPoints = availableSkillPoints(adventurer.attributes.intelligence, adventurer.class, adventurer.level);
	const	_pointSpentByAdventurer = calculatePointsForSet(adventurer.class, adventurer?.skills || []);
	const	_adventurerClass = Object.values(CLASSES).find((e) => e.id === adventurer.class);
	const	[isOpen, set_isOpen] = useState(false);
	const	[classTab, set_classTab] = useState(0);
	const	[attributeTab, set_attributeTab] = useState(0);
	const	[search, set_search] = useState('');
	const	[updateSkills, set_updateSkills] = useState(() => {
		const	skills = {
			initialPointsToSend: _availableSkillPoints - _pointSpentByAdventurer < 0 ? 0 : _availableSkillPoints - _pointSpentByAdventurer,
			remainingPoints: _availableSkillPoints - _pointSpentByAdventurer < 0 ? 0 : _availableSkillPoints - _pointSpentByAdventurer,
			canBuyPoint: _availableSkillPoints - _pointSpentByAdventurer > 0,
		};
		adventurer.skills.forEach((e, i) => skills[i + 1] = e);
		return skills;
	});

	function closeModal() {
		set_isOpen(false);
	}
  
	function openModal() {
		set_isOpen(true);
	}

	function	onSetSkills() {
		const	_skills = [];
		for (const key in updateSkills) {
			if (key !== 'remainingPoints' && key !== 'canBuyPoint') {
				_skills[key - 1] = updateSkills[key];
			}
		}
		learnSkills({
			provider,
			contractAddress: process.env.RARITY_SKILLS_ADDR,
			tokenID: adventurer.tokenID,
			skills: _skills,
		}, ({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(data);
			closeModal();
		});
	}

	function	renderSkills() {
		let		hasSkills = false;
		const	skillList = (adventurer?.skills || []).map((level, index) => {
			if (level === 0) {
				return null;
			}
			hasSkills = true;
			const	skill = Object.values(SKILLS).find(e => e.id === index + 1);
			return (
				<div className={'flex flex-row space-x-4 w-full mb-6'} key={`${adventurer.tokenID}-${skill.name}`}>
					<div className={'w-16 h-16 bg-gray-principal dark:bg-dark-400 flex justify-center items-center relative item'}>
						<Image src={skill.img} width={64} height={64} />
					</div>
					<div className={'h-16 flex flex-col justify-between'}>
						<p className={'text-xs'}>{skill?.name}</p>
						<p className={'text-megaxs mt-auto'}>{skill?.attributeName}</p>
						<p className={'text-megaxs'}>{`level: ${level}`}</p>
					</div>
				</div>
			);
		});

		if (!adventurer?.attributes?.isInit) {
			return (
				<div className={'w-full'}>
					<div className={'p-4 pb-0 flex text-black dark:text-white text-sx normal-case w-full md:w-1/2 pr-0 md:pr-20'} onClick={openModal}>
						{'You first need to set your attributes adventurer! Spend your points!'}
					</div>
				</div>
			);
		}

		if (!hasSkills) {
			return (
				<div className={'w-full'}>
					<div className={'p-4 flex text-black dark:text-white text-sx normal-case w-full md:w-1/2 pr-0 md:pr-32'} onClick={openModal}>
						{'You have no skills yet, traveler, spend your points!'}
					</div>
					<div className={'flex w-full md:w-1/2 px-4'}>
						<div
							onClick={openModal}
							className={'border-4 border-black dark:border-dark-100 px-10 py-2 text-black dark:text-white hover:bg-gray-secondary dark:hover:bg-dark-400 cursor-pointer transition-colors flex items-center text-center justify-center text-xs w-full'}>
							<p>{'SKILLBOOK'}</p>
							{updateSkills.remainingPoints > 0 ? <p className={'inline text-megaxs ml-2'}>
								{`(POINTS LEFT: ${updateSkills.remainingPoints})`}
							</p> : null}
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className={'flex flex-col md:flex-row w-full space-x-0 md:space-x-2'}>
				<div className={'w-full px-4 -mb-6'}>
					<div className={'flex w-full md:w-1/2 pr-4'}>
						<div
							onClick={openModal}
							className={'border-4 border-black dark:border-dark-100 px-10 py-2 text-black dark:text-white hover:bg-gray-secondary dark:hover:bg-dark-400 cursor-pointer transition-colors flex items-center text-center justify-center text-xs w-full'}>
							<p>{'SKILLBOOK'}</p>
							{updateSkills.remainingPoints > 0 ? <p className={'inline text-megaxs ml-2'}>
								{`(POINTS LEFT: ${updateSkills.remainingPoints})`}
							</p> : null}
						</div>
					</div>
					<div className={'w-full grid grid-cols-4 gap-x-6 pt-6'}>
						{skillList}
					</div>
				</div>
			</div>
		);
	}
	return (
		<>
			{renderSkills()}
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as={'div'} className={'fixed inset-0 z-10 overflow-none'} onClose={closeModal}>
					<div className={'min-h-screen px-4 text-center'}>
						<Transition.Child
							as={Fragment}
							enter={'ease-out duration-300'}
							enterFrom={'opacity-0'}
							enterTo={'opacity-100'}
							leave={'ease-in duration-200'}
							leaveFrom={'opacity-100'}
							leaveTo={'opacity-0'}>
							<Dialog.Overlay className={'fixed inset-0 bg-black bg-opacity-80'} />
						</Transition.Child>

						<span
							className={'inline-block h-screen align-middle'}
							aria-hidden={'true'}>&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter={'ease-out duration-300'}
							enterFrom={'opacity-0 scale-95'}
							enterTo={'opacity-100 scale-100'}
							leave={'ease-in duration-200'}
							leaveFrom={'opacity-100 scale-100'}
							leaveTo={'opacity-0 scale-95'}>
							<div className={'inline-block px-4 md:px-10 py-9 mt-16 md:mt-32 text-left transition-all transform bg-white dark:bg-dark-600 shadow-xl max-w-screen-lg w-full uppercase font-title relative'}>
								<Dialog.Title as={'h3'} className={'relative text-lg font-medium leading-6 text-black dark:text-white flex flex-col md:flex-row justify-between'}>
									{'SKILLBOOK'}
									<div className={'flex flex-row text-megaxs space-x-2 md:space-x-4 text-gray-darker dark:text-dark-100 mt-2 md:mt-0 ml-0 md:-ml-20 leading-3'}>
										<p>{`STR: ${adventurer?.attributes?.strength || 8}`}</p>
										<p>{`DEX: ${adventurer?.attributes?.dexterity || 8}`}</p>
										<p>{`CONST: ${adventurer?.attributes?.constitution || 8}`}</p>
										<p>{`INT: ${adventurer?.attributes?.intelligence || 8}`}</p>
										<p>{`WIS: ${adventurer?.attributes?.wisdom || 8}`}</p>
										<p>{`CHA: ${adventurer?.attributes?.charisma || 8}`}</p>
									</div>
									<svg onClick={closeModal} className={'absolute md:relative top-0 right-0'} width={'24'} height={'24'} viewBox={'0 0 24 24'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
										<path d={'M6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289Z'} fill={'currentcolor'}/>
									</svg>
								</Dialog.Title>
								<div className={'mt-6 flex flex-col md:flex-row mb-4 items-center'}>
									<input
										onChange={e => set_search(e?.target?.value || '')}
										className={'border-4 border-black dark:border-dark-100 bg-white dark:bg-dark-600 border-solid h-10 w-full md:w-75 mr-0 md:mr-4 text-xs px-2 focus:outline-none text-black dark:text-white'}
										placeholder={'SEARCH'} />
									<div className={'ml-auto text-xs mr-6 text-black dark:text-white hidden md:block'}>
										{`POINTS LEFT: ${updateSkills.remainingPoints}`}
									</div>
									<button
										onClick={() => {
											if (updateSkills.canBuyPoint && updateSkills.remainingPoints !== updateSkills.initialPointsToSend)
												onSetSkills();
										}}
										disabled={!updateSkills.canBuyPoint || updateSkills.remainingPoints === updateSkills.initialPointsToSend}
										className={`border-4 border-black dark:border-dark-100 border-solid my-4 md:my-0 w-full md:w-auto h-10 px-12 text-xs text-black dark:text-white ${updateSkills.canBuyPoint && updateSkills.remainingPoints !== updateSkills.initialPointsToSend ? 'hover:bg-gray-secondary dark:hover:bg-dark-900 cursor-pointer' : 'cursor-not-allowed'}`}>
										{'LEARN'}
									</button>
									<div className={'text-xs text-black dark:text-white block md:hidden text-center'}>
										{`POINTS LEFT: ${updateSkills.remainingPoints}`}
									</div>
								</div>
								<div className={'w-full flex flex-row text-megaxs mb-4'}>
									<div
										onClick={() => set_classTab(0)}
										className={`p-2 cursor-pointer text-black dark:text-white mr-4 ${classTab === 0 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
										{_adventurerClass.name}
									</div>
									<div
										onClick={() => set_classTab(1)}
										className={`p-2 cursor-pointer text-black dark:text-white ${classTab === 1 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
										{'CROSS-CLASS'}
									</div>

									<div
										onClick={() => set_attributeTab(0)}
										className={`hidden md:block p-2 cursor-pointer text-black dark:text-white mr-4 ${attributeTab === 0 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary ml-auto`}>
										{'ALL'}
									</div>
									<div
										onClick={() => set_attributeTab(1)}
										className={`hidden md:block p-2 cursor-pointer text-black dark:text-white mr-4 ${attributeTab === 1 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
										{'STRENGTH'}
									</div>
									<div
										onClick={() => set_attributeTab(2)}
										className={`hidden md:block p-2 cursor-pointer text-black dark:text-white mr-4 ${attributeTab === 2 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
										{'DEXTERITY'}
									</div>
									<div
										onClick={() => set_attributeTab(3)}
										className={`hidden md:block p-2 cursor-pointer text-black dark:text-white mr-4 ${attributeTab === 3 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
										{'CONSTITUTION'}
									</div>
									<div
										onClick={() => set_attributeTab(4)}
										className={`hidden md:block p-2 cursor-pointer text-black dark:text-white mr-4 ${attributeTab === 4 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
										{'INTELLIGENCE'}
									</div>
									<div
										onClick={() => set_attributeTab(5)}
										className={`hidden md:block p-2 cursor-pointer text-black dark:text-white mr-4 ${attributeTab === 5 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
										{'WISDOM'}
									</div>
									<div
										onClick={() => set_attributeTab(6)}
										className={`hidden md:block p-2 cursor-pointer text-black dark:text-white ${attributeTab === 6 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
										{'CHARISMA'}
									</div>
								</div>
								
								<div className={'min-h-0 md:min-h-120 max-h-64 md:max-h-120 overflow-y-scroll'}>
									{
										Object.values(SKILLS)
											.filter((skill) => {
												if (classTab === 0) {
													if (attributeTab === 0) {
														return _adventurerClass.skills.includes(skill?.name);
													} else if (attributeTab === 1) {
														return _adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'strength';
													} else if (attributeTab === 2) {
														return _adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'dexterity';
													} else if (attributeTab === 3) {
														return _adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'constitution';
													} else if (attributeTab === 4) {
														return _adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'intelligence';
													} else if (attributeTab === 5) {
														return _adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'wisdom';
													} else if (attributeTab === 6) {
														return _adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'charisma';
													}
												} else {
													if (attributeTab === 0) {
														return !_adventurerClass.skills.includes(skill?.name);
													} else if (attributeTab === 1) {
														return !_adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'strength';
													} else if (attributeTab === 2) {
														return !_adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'dexterity';
													} else if (attributeTab === 3) {
														return !_adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'constitution';
													} else if (attributeTab === 4) {
														return !_adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'intelligence';
													} else if (attributeTab === 5) {
														return !_adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'wisdom';
													} else if (attributeTab === 6) {
														return !_adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'charisma';
													}
												}
												return skill;
											})
											.filter((skill) => {
												if (search === '')
													return true;
												return skill?.name.toLowerCase().includes(search.toLowerCase());
											})
											.map((skill) => {
												const	isClassSpecific = classTab === 0;
												return (
													<details key={skill?.id} className={'flex flex-row w-full mb-2 transition-colors'}>
														<summary className={'transition-colors'}>
															<div className={'flex flex-row space-x-4 w-full h-auto md:h-16 cursor-pointer'}>
																<div className={'w-16 h-16 flex justify-center items-center relative item'}>
																	<Image src={skill.img} width={64} height={64} />
																</div>
																<div className={'hidden md:flex flex-row space-between w-full relative text-black dark:text-white'}>
																	<div className={'mt-3.5 w-57'}>
																		<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'SKILL:'}</p>
																		<p className={'text-sx'}>{skill?.name}</p>
																	</div>
																	<div className={'mt-3.5 pr-6'}>
																		<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'ATTRIBUTE:'}</p>
																		<p className={'text-sx'}>{skill?.attributeLabel || '-'}</p>
																	</div>
																	<div className={'mt-3.5 pr-6'}>
																		<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'COST:'}</p>
																		<p className={'text-sx'}>{isClassSpecific ? '1' : '2'}</p>
																	</div>
																	<div className={'mt-3.5 pr-6'}>
																		<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'ARMOR CHECK:'}</p>
																		<p className={'text-sx'}>{skill?.armorCheckPenalty ? 'YES' : 'NO'}</p>
																	</div>
																	<div className={'mt-3.5 pr-6'}>
																		<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'RETRY:'}</p>
																		<p className={'text-sx'}>{skill?.retry ? 'YES' : 'NO'}</p>
																	</div>
																	<div className={'mt-3.5'}>
																		<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'SYNERGY:'}</p>
																		<p className={'text-sx'}>{skill?.synergy > 0 ? Object.values(SKILLS).find(s => s.id === skill?.synergy)?.name || '-' : '-'}</p>
																	</div>
																	<div className={'mt-3.5 ml-auto px-4 cursor-default'} onClick={(e) => e.preventDefault()}>
																		<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'LEVEL:'}</p>
																		<div className={'flex flex-row'}>
																			<div
																				className={adventurer.skills[skill?.id - 1] > 0 || updateSkills[skill?.id] === 0 ? 'opacity-0 pointer-events-none' : 'p-2 -m-2 cursor-pointer'}
																				onClick={() => {
																					if (adventurer.skills[skill?.id - 1] > 0)
																						return; //If adventurer skill more than 0, already set, cannot be removed
																					if ((updateSkills.remainingPoints - (isClassSpecific ? 1 : 2)) > _availableSkillPoints || updateSkills[skill?.id] === 0)
																						return;
																					set_updateSkills(s => ({
																						...s,
																						[skill?.id]: s[skill?.id] - 1,
																						remainingPoints: s.remainingPoints + (isClassSpecific ? 1 : 2)
																					}));
																				}}>
																				<Chevron className={'mr-2 select-none cursor-pointer text-black dark:text-white'} />
																			</div>
																			<p className={'text-xs w-5 text-center'}>{updateSkills[skill?.id]}</p>
																			<div
																				className={(updateSkills.remainingPoints === 0 || isClassSpecific && updateSkills[skill?.id] >= adventurer.level + 3) || (!isClassSpecific && updateSkills[skill?.id] >= Math.floor((adventurer.level + 3) / 2)) ? 'opacity-0 pointer-events-none' : 'p-2 -m-2 cursor-pointer'}
																				onClick={() => {
																					if ((updateSkills.remainingPoints - (isClassSpecific ? 1 : 2)) < 0)
																						return;
																					if (isClassSpecific && updateSkills[skill?.id] >= adventurer.level + 3)
																						return;
																					if (!isClassSpecific && updateSkills[skill?.id] >= Math.floor((adventurer.level + 3) / 2))
																						return;
																					if (updateSkills.remainingPoints === 0)
																						return;
																					set_updateSkills(s => ({
																						...s,
																						[skill?.id]: s[skill?.id] + 1,
																						remainingPoints: s.remainingPoints - (isClassSpecific ? 1 : 2)
																					}));
																				}}>
																				<Chevron className={'ml-2 select-none transform rotate-180 text-black dark:text-white'} />
																			</div>
																		</div>
																	</div>
																</div>

																<div className={'md:hidden grid grid-cols-2 space-between w-full relative text-black dark:text-white pb-4'}>
																	<div className={'mt-3.5'}>
																		<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'SKILL:'}</p>
																		<p className={'text-sx'}>{skill?.name}</p>
																	</div>
																	<div />
																	<div className={'mt-3.5'}>
																		<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'ATTRIBUTE:'}</p>
																		<p className={'text-sx'}>{skill?.attributeLabel || '-'}</p>
																	</div>
																	<div className={'mt-3.5'}>
																		<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'COST:'}</p>
																		<p className={'text-sx'}>{isClassSpecific ? '1' : '2'}</p>
																	</div>
																	<div className={'mt-3.5'}>
																		<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'ARMOR CHECK:'}</p>
																		<p className={'text-sx'}>{skill?.armorCheckPenalty ? 'YES' : 'NO'}</p>
																	</div>
																	<div className={'mt-3.5'}>
																		<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'RETRY:'}</p>
																		<p className={'text-sx'}>{skill?.retry ? 'YES' : 'NO'}</p>
																	</div>
																	<div className={'mt-3.5'}>
																		<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'SYNERGY:'}</p>
																		<p className={'text-sx'}>{skill?.synergy > 0 ? Object.values(SKILLS).find(s => s.id === skill?.synergy)?.name || '-' : '-'}</p>
																	</div>
																	<div className={'mt-3.5 cursor-default'} onClick={(e) => e.preventDefault()}>
																		<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'LEVEL:'}</p>
																		<div className={'flex flex-row'}>
																			<div
																				className={adventurer.skills[skill?.id - 1] > 0 || updateSkills[skill?.id] === 0 ? 'opacity-0 pointer-events-none' : 'p-2 -m-2 cursor-pointer'}
																				onClick={() => {
																					if (adventurer.skills[skill?.id - 1] > 0)
																						return; //If adventurer skill more than 0, already set, cannot be removed
																					if ((updateSkills.remainingPoints - (isClassSpecific ? 1 : 2)) > _availableSkillPoints || updateSkills[skill?.id] === 0)
																						return;
																					set_updateSkills(s => ({
																						...s,
																						[skill?.id]: s[skill?.id] - 1,
																						remainingPoints: s.remainingPoints + (isClassSpecific ? 1 : 2)
																					}));
																				}}>
																				<Chevron className={'mr-2 select-none cursor-pointer text-black dark:text-white'} />
																			</div>
																			<p className={'text-xs w-5 text-center'}>{updateSkills[skill?.id]}</p>
																			<div
																				className={(updateSkills.remainingPoints === 0 || isClassSpecific && updateSkills[skill?.id] >= adventurer.level + 3) || (!isClassSpecific && updateSkills[skill?.id] >= Math.floor((adventurer.level + 3) / 2)) ? 'opacity-0 pointer-events-none' : 'p-2 -m-2 cursor-pointer'}
																				onClick={() => {
																					if ((updateSkills.remainingPoints - (isClassSpecific ? 1 : 2)) < 0)
																						return;
																					if (isClassSpecific && updateSkills[skill?.id] >= adventurer.level + 3)
																						return;
																					if (!isClassSpecific && updateSkills[skill?.id] >= Math.floor((adventurer.level + 3) / 2))
																						return;
																					if (updateSkills.remainingPoints === 0)
																						return;
																					set_updateSkills(s => ({
																						...s,
																						[skill?.id]: s[skill?.id] + 1,
																						remainingPoints: s.remainingPoints - (isClassSpecific ? 1 : 2)
																					}));
																				}}>
																				<Chevron className={'ml-2 select-none transform rotate-180 text-black dark:text-white'} />
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</summary>

														<div className={'flex flex-row space-x-4 w-full py-4'}>
															<div className={'w-16 h-16 hidden justify-center items-center relative item md:flex'} />
															<div className={'flex flex-col space-between w-full pr-4'}>
																<p className={'text-megaxs mb-2 text-black dark:text-white'}>{'CHECK'}</p>
																<p className={'text-megaxs leading-4 mb-4 text-gray-darker dark:text-white dark:text-opacity-60 normal-case text-left md:text-justify'}>{skill?.check}</p>
																<p className={'text-megaxs mb-2 text-black dark:text-white'}>{'ACTION'}</p>
																<p className={'text-megaxs leading-4 text-gray-darker dark:text-white dark:text-opacity-60 normal-case text-left md:text-justify'}>{skill?.action}</p>
															</div>
														</div>

													</details>
												);
											})
									}
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}

function	AdventurerTab({adventurer, updateRarity, provider}) {
	const	[selectedTab, set_selectedTab] = useState(0);

	return (
		<div className={'flex flex-col w-full mt-2'}>
			<div className={'flex flex-col md:flex-row w-full space-x-0 md:-space-x-1'}>
				<div
					onClick={() => set_selectedTab(0)}
					className={`w-full cursor-pointer nes-container border-4 text-center border-solid ${selectedTab === 0 ? 'border-b-0 bg-gray-principal md:bg-white dark:bg-dark-400 md:dark:bg-dark-600' : ''} border-black dark:border-dark-100 text-center py-4`}>
					<p>{'Skills'}</p>
				</div>
				<div
					onClick={() => set_selectedTab(1)}
					className={`w-full cursor-pointer nes-container border-4 text-center border-solid ${selectedTab === 1 ? 'border-b-4 md:border-b-0 border-t-0 md:border-t-4 bg-gray-principal md:bg-white dark:bg-dark-400 md:dark:bg-dark-600' : ''} border-black dark:border-dark-100 text-center py-4`}>
					<p>{'Inventory'}</p>
				</div>
			</div>
			<div className={'w-full nes-container border-4 border-solid border-t-0 border-black dark:border-dark-100 py-4 md:-mt-1'}>
				{selectedTab === 0 ? <Skills adventurer={adventurer} updateRarity={updateRarity} provider={provider} /> : <Inventory adventurer={adventurer} />}
			</div>
		</div>
	);
}

function	Aventurers({rarity, provider, updateRarity, router, chainTime}) {
	return (
		<div className={'w-full'}>
			<div className={'flex flex-row w-full mb-6'}>
				<div className={'w-full flex flex-col-reverse md:flex-row justify-start'}>
					<div className={'w-64'} style={{minWidth: 256}}>
						<Image
							src={classMappingImg[rarity.class]}
							loading={'eager'}
							quality={100}
							width={256}
							height={256} />
					</div>
					<div>
						<section className={'message -left'}>
							<DailyBalloon
								rarity={rarity}
								chainTime={chainTime}
								updateRarity={updateRarity}
								provider={provider}
								router={router} />
						</section>
					</div>
				</div>
			</div>
			<div className={'flex flex-col md:flex-row w-full space-x-0 md:space-x-2'}>
				<div className={'nes-container pt-6 px-4 border-4 border-solid border-black dark:border-dark-100 with-title w-full md:w-2/3'}>
					<p className={'title bg-white dark:bg-dark-600 mb-1'}>{rarity.tokenID}</p>
					<div className={'flex flex-row items-center w-full py-2'}>
						<div className={'opacity-80 text-xs md:text-sm w-48'}>{'ID:'}</div>
						<div className={'w-full text-right md:text-left pr-4 md:pr-0'}>
							<p>{rarity.tokenID}</p>
						</div>
					</div>
					<div className={'flex flex-row items-center w-full py-2'}>
						<div className={'opacity-80 text-xs md:text-sm w-48'}>{'CLASS:'}</div>
						<div className={'w-full text-right md:text-left pr-4 md:pr-0'}>
							<p>{classNameMapping[rarity.class]}</p>
						</div>
					</div>
					<div className={'flex flex-row items-center w-full py-2'}>
						<div className={'opacity-80 text-xs md:text-sm w-48'}>{'LEVEL:'}</div>
						<div className={'w-full text-right md:text-left pr-4 md:pr-0'}>
							<p>{rarity.level}</p>
						</div>
					</div>
					<div className={'flex flex-row items-center w-full py-2'}>
						<div className={'opacity-80 text-xs md:text-sm w-48'}>{'GOLD:'}</div>
						<div className={'w-full text-right md:text-left pr-4 md:pr-0'}>
							<p>{`${Number(rarity?.gold?.balance || 0) === 0 ? '0' : rarity.gold.balance}`}</p>
						</div>
					</div>
					<div className={'flex flex-row items-center w-full py-2'}>
						<div className={'opacity-80 text-sm w-48'}>{'XP:'}</div>
						<div className={'w-full'}>
							<div
								onClick={() => {
									if (rarity.xp >= (rarity.level * 1000)) {
										levelUp({
											provider,
											contractAddress: process.env.RARITY_ADDR,
											tokenID: rarity.tokenID,
										}, ({error, data}) => {
											if (error) {
												return console.error(error);
											}
											updateRarity(data);
										});
									}
								}}
								className={`nes-progress border-solid border-2 border-black dark:border-dark-400 w-full relative ${rarity.xp >= (rarity.level * 1000) ? 'cursor-pointer' : ''}`}>
								<progress
									className={`progressbar h-full ${rarity.xp >= (rarity.level * 1000) ? 'is-warning animate-pulse' : 'is-primary'} w-full absolute p-1.5 inset-0`}
									value={rarity.xp}
									max={rarity.level * 1000} />
								<p className={`text-sm absolute inset-0 h-full w-full text-center flex justify-center items-center ${rarity.xp >= (rarity.level * 1000) ? '' : 'hidden'}`}>{'LEVEL-UP!'}</p>
							</div>
						</div>
					</div>
				</div>
				<Attributes rarity={rarity} updateRarity={updateRarity} provider={provider} />
			</div>
			<AdventurerTab adventurer={rarity} updateRarity={updateRarity} provider={provider} />
			{/* <Inventory rarity={rarity} />
			<Skills rarity={rarity} /> */}
		</div>
	);
}


function	Index({router}) {
	const	{provider, chainTime} = useWeb3();
	const	{rarities, updateRarity} = useRarity();
	const	adventurers = Object.values(rarities);

	if (adventurers?.length === 0) {
		return (
			<SectionNoAdventurer />
		);
	}

	return (
		<section className={'mt-24 md:mt-12'}>
			<div className={'flex flex-col space-y-32 max-w-screen-lg w-full mx-auto'}>
				{
					adventurers?.map((rarity) => (
						<Aventurers
							key={rarity.tokenID}
							rarity={rarity}
							provider={provider}
							updateRarity={updateRarity}
							chainTime={chainTime}
							router={router} />
					))
				}
			</div>


		</section>
	);
}

export default Index;
