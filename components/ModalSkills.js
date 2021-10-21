/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 26th 2021
**	@Filename:				ModalSkills.js
******************************************************************************/

import	React, {Fragment, useState, useEffect}			from	'react';
import	Image											from	'next/image';
import	{Dialog, Transition}							from	'@headlessui/react';
import	Chevron											from	'components/Chevron';
import	useWeb3											from	'contexts/useWeb3';
import	useRarity										from	'contexts/useRarity';
import	{learnSkills}									from	'utils/actions';
import	{availableSkillPoints, calculatePointsForSet}	from	'utils/libs/raritySkills';
import	CLASSES											from	'utils/codex/classes';
import	SKILLS											from	'utils/codex/skills.json';

function	Skills({adventurer, isOpen, closeModal = () => null, updateSkills,
	set_updateSkills = () => null}) {
	const	{provider} = useWeb3();
	const	{updateRarity} = useRarity();

	const	_adventurerClass = Object.values(CLASSES).find((e) => e.id === adventurer.class);
	const	[classTab, set_classTab] = useState(0);
	const	[attributeTab, set_attributeTab] = useState(0);
	const	[search, set_search] = useState('');
	const	_availableSkillPoints = availableSkillPoints(adventurer.attributes.intelligence, adventurer.class, adventurer.level);
	const	_pointSpentByAdventurer = calculatePointsForSet(adventurer.class, adventurer?.skills || []);

	if (!updateSkills) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		[updateSkills, set_updateSkills] = useState(() => {
			const	skills = {
				initialPointsToSend: _availableSkillPoints - _pointSpentByAdventurer < 0 ? 0 : _availableSkillPoints - _pointSpentByAdventurer,
				remainingPoints: _availableSkillPoints - _pointSpentByAdventurer < 0 ? 0 : _availableSkillPoints - _pointSpentByAdventurer,
				canBuyPoint: _availableSkillPoints - _pointSpentByAdventurer > 0,
			};
			adventurer.skills.forEach((e, i) => skills[i + 1] = e);
			return skills;
		});
	}

	useEffect(() => {
		if (!updateSkills) {
			set_updateSkills(() => {
				const	skills = {
					initialPointsToSend: _availableSkillPoints - _pointSpentByAdventurer < 0 ? 0 : _availableSkillPoints - _pointSpentByAdventurer,
					remainingPoints: _availableSkillPoints - _pointSpentByAdventurer < 0 ? 0 : _availableSkillPoints - _pointSpentByAdventurer,
					canBuyPoint: _availableSkillPoints - _pointSpentByAdventurer > 0,
				};
				adventurer.skills.forEach((e, i) => skills[i + 1] = e);
				return skills;
			});
		}
	}, [adventurer?.tokenID, _availableSkillPoints, _pointSpentByAdventurer, adventurer.skills, set_updateSkills, updateSkills]);

	function	onSetSkills() {
		const	_skills = [];
		for (const key in updateSkills) {
			if (key !== 'remainingPoints' && key !== 'canBuyPoint') {
				_skills[key - 1] = updateSkills[key];
			}
		}
		learnSkills({
			provider,
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

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as={'div'}
				className={'fixed inset-0 z-10 overflow-none'}
				style={{zIndex: 1000}}
				onClose={closeModal}>
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

					<Transition.Child
						as={Fragment}
						enter={'ease-out duration-300'}
						enterFrom={'opacity-0 scale-95'}
						enterTo={'opacity-100 scale-100'}
						leave={'ease-in duration-200'}
						leaveFrom={'opacity-100 scale-100'}
						leaveTo={'opacity-0 scale-95'}>
						<div
							key={adventurer?.tokenID}
							className={'inline-block px-4 md:px-10 pt-9 pb-0 md:pb-9 mt-16 md:mt-23 text-left transition-all transform bg-white dark:bg-dark-600 shadow-xl max-w-screen-lg w-full uppercase font-title relative border-4 border-black'}>
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
								<svg onClick={closeModal} className={'cursor-pointer absolute md:relative top-0 right-0'} width={'24'} height={'24'} viewBox={'0 0 24 24'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
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
								
							<div className={'min-h-0 md:min-h-120 max-h-72 md:max-h-120 overflow-y-scroll'}>
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
																			className={adventurer.skills[skill?.id - 1] === updateSkills[skill?.id] || updateSkills[skill?.id] === 0 ? 'opacity-0 pointer-events-none' : 'p-2 -m-2 cursor-pointer'}
																			onClick={() => {
																				if (adventurer.skills[skill?.id - 1] === updateSkills[skill?.id])
																					return;
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
																			className={adventurer.skills[skill?.id - 1] === updateSkills[skill?.id] || updateSkills[skill?.id] === 0 ? 'opacity-0 pointer-events-none' : 'p-2 -m-2 cursor-pointer'}
																			onClick={() => {
																				if (adventurer.skills[skill?.id - 1] === updateSkills[skill?.id])
																					return;
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
	);
}

export default Skills;