/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday September 21st 2021
**	@Filename:				SectionCrafting.js
******************************************************************************/

import	React, {Fragment, useState}						from	'react';
import	Image											from	'next/image';
import	{Listbox, Transition}							from	'@headlessui/react';
import	Chevron											from	'components/Chevron';
import	{availableSkillPoints, calculatePointsForSet}	from	'utils/libs/raritySkills';
import	CLASSES											from	'utils/codex/classes';
import	SKILLS											from	'utils/codex/skills.json';

const people = [
	{name: 'Simple'},
	{name: 'Martial'},
	{name: 'Exotic'},
];

function	Crafting({adventurer}) {
	const	_availableSkillPoints = availableSkillPoints(adventurer.attributes.intelligence, adventurer.class, adventurer.level);
	const	_pointSpentByAdventurer = calculatePointsForSet(adventurer.class, adventurer?.skills || []);
	const	_adventurerClass = Object.values(CLASSES).find((e) => e.id === adventurer.class);
	const	[category, set_category] = useState(0);
	const	[subCategory, set_subCategory] = useState(0);
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

	const [selected, setSelected] = useState(people[0]);


	function	renderCategories() {
		return (
			<>
				<div
					onClick={() => {set_category(0); set_subCategory(0);}}
					className={`p-2 cursor-pointer text-black dark:text-white mr-4 ${category === 0 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
					{'GOODS'}
				</div>
				<div
					onClick={() => {set_category(1); set_subCategory(0);}}
					className={`p-2 cursor-pointer text-black dark:text-white mr-4 ${category === 1 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
					{'ARMOR'}
				</div>
				<div
					onClick={() => {set_category(2); set_subCategory(0);}}
					className={`p-2 cursor-pointer text-black dark:text-white ${category === 2 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
					{'WEAPONS'}
				</div>
			</>
		);
	}

	function	renderSubCategories() {
		if (category === 0) {
			return null;
		}
		if (category === 1) {
			return (
				<>
					<div
						onClick={() => set_subCategory(0)}
						className={`hidden md:block p-2 cursor-pointer text-black dark:text-white mr-4 ${subCategory === 0 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary ml-auto`}>
						{'Light'}
					</div>
					<div
						onClick={() => set_subCategory(1)}
						className={`hidden md:block p-2 cursor-pointer text-black dark:text-white mr-4 ${subCategory === 1 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
						{'Medium'}
					</div>
					<div
						onClick={() => set_subCategory(2)}
						className={`hidden md:block p-2 cursor-pointer text-black dark:text-white mr-4 ${subCategory === 2 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
						{'Heavy'}
					</div>
					<div
						onClick={() => set_subCategory(3)}
						className={`hidden md:block p-2 cursor-pointer text-black dark:text-white ${subCategory === 3 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
						{'Shields'}
					</div>
				</>
			);
		}
		return (
			<div className={'ml-auto'}>
				<Listbox value={selected} onChange={setSelected}>
					<div className={'relative'}>
						<Listbox.Button className={`hidden md:block p-2 cursor-pointer text-black dark:text-white mr-4 ${subCategory === 0 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary text-megaxs border-none uppercase relative`}>
							<span className={'block truncate'}>{selected.name}</span>
						</Listbox.Button>
						<Transition
							as={Fragment}
							leave={'transition ease-in duration-100'}
							leaveFrom={'opacity-100'}
							leaveTo={'opacity-0'}>
							<Listbox.Options className={'absolute mt-1 overflow-auto text-sx bg-white max-h-60 focus:outline-none z-20 min-w-full border-2 border-black -left-7 w-28'}>
								{people.map((person, personIdx) => (
									<Listbox.Option
										key={personIdx}
										className={({active}) => `${active ? 'bg-gray-principal' : 'bg-white'} cursor-pointer select-none relative p-2`}
										value={person}>
										<span className={'block truncate'}>
											{person.name}
										</span>
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</Listbox>
				{/* <select
					onChange={e => set_subCategory(e.target.value)}
					className={`hidden md:block p-2 cursor-pointer text-black dark:text-white mr-4 ${subCategory === 0 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary ml-auto text-megaxs border-none`}>
					<option className={'text-xs'} value={'Simple'}>{'Simple'}</option>
					<option className={'text-xs'} value={'Martial'}>{'Martial'}</option>
					<option className={'text-xs'} value={'Exotic'}>{'Exotic'}</option>
				</select>

				<select
					onChange={e => set_subCategory(e.target.value)}
					className={'bg-opacity-0 bg-black ml-4 border-2 border-black dark:border-dark-100 focus:outline-none text-xs uppercase'}>
					<option value={'Unarmed'}>{'Unarmed'}</option>
					<option value={'Light Melee Weapons'}>{'Light Melee Weapons'}</option>
					<option value={'One-Handed Melee Weapons'}>{'One-Handed Melee Weapons'}</option>
					<option value={'Two-Handed Melee Weapons'}>{'Two-Handed Melee Weapons'}</option>
					<option value={'Ranged Weapons'}>{'Ranged Weapons'}</option>
				</select> */}
			</div>
		);

		return (
			<>
				<div
					onClick={() => set_category(0)}
					className={`p-2 cursor-pointer text-black dark:text-white mr-4 ${category === 0 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
					{'GOODS'}
				</div>
				<div
					onClick={() => set_category(1)}
					className={`p-2 cursor-pointer text-black dark:text-white mr-4 ${category === 1 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
					{'ARMOR'}
				</div>
				<div
					onClick={() => set_category(2)}
					className={`p-2 cursor-pointer text-black dark:text-white ${category === 2 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
					{'WEAPONS'}
				</div>
			</>
		);
	}

	return (
		<>
			<div className={'inline-block px-4 md:px-10 py-9 mt-16 md:mt-32 text-left transition-all transform bg-white dark:bg-dark-600 max-w-screen-lg w-full uppercase font-title relative border-4 border-black dark:border-dark-100'}>
				<h3 className={'relative text-lg font-medium leading-6 text-black dark:text-white flex flex-col md:flex-row justify-between'}>
					{'WORKSHOP'}
				</h3>
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
					{renderCategories()}
					{renderSubCategories()}
				</div>
								
				<div className={'min-h-0 md:min-h-120 max-h-64 md:max-h-120 overflow-y-scroll'}>
					{
						Object.values(SKILLS)
							.filter((skill) => {
								if (category === 0) {
									if (subCategory === 0) {
										return _adventurerClass.skills.includes(skill?.name);
									} else if (subCategory === 1) {
										return _adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'strength';
									} else if (subCategory === 2) {
										return _adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'dexterity';
									} else if (subCategory === 3) {
										return _adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'constitution';
									} else if (subCategory === 4) {
										return _adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'intelligence';
									} else if (subCategory === 5) {
										return _adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'wisdom';
									} else if (subCategory === 6) {
										return _adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'charisma';
									}
								} else {
									if (subCategory === 0) {
										return !_adventurerClass.skills.includes(skill?.name);
									} else if (subCategory === 1) {
										return !_adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'strength';
									} else if (subCategory === 2) {
										return !_adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'dexterity';
									} else if (subCategory === 3) {
										return !_adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'constitution';
									} else if (subCategory === 4) {
										return !_adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'intelligence';
									} else if (subCategory === 5) {
										return !_adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'wisdom';
									} else if (subCategory === 6) {
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
								const	isClassSpecific = category === 0;
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
		</>
	);
}

export default Crafting;