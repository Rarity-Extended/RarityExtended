/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday September 21st 2021
**	@Filename:				SectionCrafting.js
******************************************************************************/

import Chevron from 'components/Chevron';
import ListBox from 'components/ListBox';
import Image from 'next/image';
import React, {Fragment, useState} from 'react';
import CLASSES from 'utils/codex/classes';
import SKILLS from 'utils/codex/skills.json';
import	MANIFEST_GOODS				from	'utils/codex/items_manifest_goods.json';
import	MANIFEST_ARMORS				from	'utils/codex/items_manifest_armors.json';
import	MANIFEST_WEAPONS			from	'utils/codex/items_manifest_weapons.json';

import {availableSkillPoints, calculatePointsForSet} from 'utils/libs/raritySkills';
import {ethers} from 'ethers';

const	proficiencyOptions = [
	{name: 'All'},
	{name: 'Simple'},
	{name: 'Martial'},
	{name: 'Exotic'},
];
const	encumbranceOptions = [
	{name: 'All'},
	{name: 'Unarmed'},
	{name: 'Light Melee Weapons'},
	{name: 'One-Handed Melee Weapons'},
	{name: 'Two-Handed Melee Weapons'},
	{name: 'Ranged Weapons'},
];
const	damageTypeOptions = [
	{name: 'All'},
	{name: 'Bludgeoning'},
	{name: 'Piercing'},
	{name: 'Slashing'},
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

	const	[armorType, set_armorType] = useState('All');
	const	[proficiency, set_proficiency] = useState(proficiencyOptions[0]);
	const	[encumbrance, set_encumbrance] = useState(encumbranceOptions[0]);
	const	[damageType, set_damageType] = useState(damageTypeOptions[0]);


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
						onClick={() => set_armorType('All')}
						className={`hidden md:block p-2 cursor-pointer text-black dark:text-white mr-4 ${armorType === 'All' ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary ml-auto`}>
						{'All'}
					</div>
					<div
						onClick={() => set_armorType('Light')}
						className={`hidden md:block p-2 cursor-pointer text-black dark:text-white mr-4 ${armorType === 'Light' ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
						{'Light'}
					</div>
					<div
						onClick={() => set_armorType('Medium')}
						className={`hidden md:block p-2 cursor-pointer text-black dark:text-white mr-4 ${armorType === 'Medium' ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
						{'Medium'}
					</div>
					<div
						onClick={() => set_armorType('Heavy')}
						className={`hidden md:block p-2 cursor-pointer text-black dark:text-white mr-4 ${armorType === 'Heavy' ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
						{'Heavy'}
					</div>
					<div
						onClick={() => set_armorType('Shields')}
						className={`hidden md:block p-2 cursor-pointer text-black dark:text-white ${armorType === 'Shields' ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
						{'Shields'}
					</div>
				</>
			);
		}
		return (
			<div className={'ml-auto flex flex-row'}>
				<ListBox
					options={proficiencyOptions}
					className={'mr-4'}
					set_selected={set_proficiency}
					selected={proficiency}
				/>
				<ListBox
					options={encumbranceOptions}
					className={'mr-4'}
					set_selected={set_encumbrance}
					selected={encumbrance}
				/>
				<ListBox
					options={damageTypeOptions}
					className={''}
					set_selected={set_damageType}
					selected={damageType} />
			</div>
		);
	}

	function	renderGoods() {
		return (
			<div className={'min-h-0 md:min-h-120 max-h-64 md:max-h-120 overflow-y-scroll'}>
				{
					Object.values(MANIFEST_GOODS)
						.filter((skill) => {
							if (search === '')
								return true;
							return skill?.name.toLowerCase().includes(search.toLowerCase());
						})
						.map((item) => {
							return (
								<details key={item?.id} className={'flex flex-row w-full mb-2 transition-colors'}>
									<summary className={'transition-colors'}>
										<div className={'flex flex-row space-x-4 w-full h-auto md:h-16 cursor-pointer'}>
											<div className={'w-16 h-16 flex justify-center items-center relative item'}>
												<div className={`absolute ${item.levelClassName} left-0 top-0 w-2 h-1`} />
												<div className={`absolute ${item.levelClassName} left-0 top-0 w-1 h-2`} />
												<div className={`absolute ${item.levelClassName} right-0 top-0 w-2 h-1`} />
												<div className={`absolute ${item.levelClassName} right-0 top-0 w-1 h-2`} />
												<Image src={item.img} width={64} height={64} />
												<div className={`absolute ${item.levelClassName} left-0 bottom-0 w-2 h-1`} />
												<div className={`absolute ${item.levelClassName} left-0 bottom-0 w-1 h-2`} />
												<div className={`absolute ${item.levelClassName} right-0 bottom-0 w-2 h-1`} />
												<div className={`absolute ${item.levelClassName} right-0 bottom-0 w-1 h-2`} />

											</div>
											<div className={'hidden md:flex flex-row space-between w-full relative text-black dark:text-white'}>
												<div className={'mt-3.5 w-56'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'NAME:'}</p>
													<p className={'text-sx'}>{item?.name}</p>
												</div>
												<div className={'mt-3.5 pr-16'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'WEIGHT:'}</p>
													<p className={'text-sx'}>{item?.weight || '0'}</p>
												</div>
												<div className={'mt-3.5 pr-6'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'COST:'}</p>
													<p className={'text-sx'}>{`${item.cost}G`}</p>
												</div>
											</div>

											<div className={'md:hidden grid grid-cols-2 space-between w-full relative text-black dark:text-white pb-4'}>
												<div className={'mt-3.5'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'NAME:'}</p>
													<p className={'text-sx'}>{item?.name}</p>
												</div>
												<div />
												<div className={'mt-3.5'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'WEIGHT:'}</p>
													<p className={'text-sx'}>{item?.weight || '0'}</p>
												</div>
												<div className={'mt-3.5'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'COST:'}</p>
													<p className={'text-sx'}>{`${item.cost}G`}</p>
												</div>
											</div>
										</div>
									</summary>

									<div className={'flex flex-row space-x-4 w-full py-4'}>
										<div className={'w-16 h-1 hidden justify-center items-center relative md:flex'} />
										<div className={'flex flex-col space-between w-full pr-4'}>
											<p className={'text-megaxs mb-2 text-black dark:text-white'}>{'DESCRIPTION'}</p>
											<p className={'text-megaxs leading-4 text-gray-darker dark:text-white dark:text-opacity-60 normal-case text-left md:text-justify'}>{item?.description}</p>
										</div>
									</div>

								</details>
							);
						})
				}
			</div>
		);
	}
	function	renderArmors() {
		return (
			<div className={'min-h-0 md:min-h-120 max-h-64 md:max-h-120 overflow-y-scroll'}>
				{
					Object.values(MANIFEST_ARMORS)
						.filter((item) => {
							if (armorType === 'All')
								return true;
							return item.proficiency === armorType; 
						})
						.filter((item) => {
							if (search === '')
								return true;
							return item?.name.toLowerCase().includes(search.toLowerCase());
						})
						.map((item) => {
							return (
								<details key={item?.id} className={'flex flex-row w-full mb-2 transition-colors'}>
									<summary className={'transition-colors'}>
										<div className={'flex flex-row space-x-4 w-full h-auto md:h-16 cursor-pointer'}>
											<div className={'w-16 h-16 flex justify-center items-center relative item'}>
												<div className={`absolute ${item.levelClassName} left-0 top-0 w-2 h-1`} />
												<div className={`absolute ${item.levelClassName} left-0 top-0 w-1 h-2`} />
												<div className={`absolute ${item.levelClassName} right-0 top-0 w-2 h-1`} />
												<div className={`absolute ${item.levelClassName} right-0 top-0 w-1 h-2`} />
												<Image src={item.img} width={64} height={64} />
												<div className={`absolute ${item.levelClassName} left-0 bottom-0 w-2 h-1`} />
												<div className={`absolute ${item.levelClassName} left-0 bottom-0 w-1 h-2`} />
												<div className={`absolute ${item.levelClassName} right-0 bottom-0 w-2 h-1`} />
												<div className={`absolute ${item.levelClassName} right-0 bottom-0 w-1 h-2`} />

											</div>
											<div className={'hidden md:flex flex-row space-between w-full relative text-black dark:text-white'}>
												<div className={'mt-3.5 w-56'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'NAME:'}</p>
													<p className={'text-sx'}>{item?.name}</p>
												</div>
												<div className={'mt-3.5 pr-6'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'WEIGHT:'}</p>
													<p className={'text-sx'}>{item?.weight || '0'}</p>
												</div>
												<div className={'mt-3.5 pr-6'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'COST:'}</p>
													<p className={'text-sx'}>{`${item.cost}G`}</p>
												</div>
												<div className={'mt-3.5 pr-6'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'ARMOR:'}</p>
													<p className={'text-sx'}>{`${item?.armor_bonus || 0}`}</p>
												</div>
												<div className={'mt-3.5 pr-6'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'PENALTY:'}</p>
													<p className={'text-sx'}>{`${item?.penalty || 0}`}</p>
												</div>
												<div className={'mt-3.5 pr-6'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'SPELL FAILURE:'}</p>
													<p className={'text-sx'}>{`${item?.spell_failure || 0}`}</p>
												</div>
											</div>

											<div className={'md:hidden grid grid-cols-2 space-between w-full relative text-black dark:text-white pb-4'}>
												<div className={'mt-3.5'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'NAME:'}</p>
													<p className={'text-sx'}>{item?.name}</p>
												</div>
												<div />
												<div className={'mt-3.5'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'WEIGHT:'}</p>
													<p className={'text-sx'}>{item?.weight || '0'}</p>
												</div>
												<div className={'mt-3.5'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'COST:'}</p>
													<p className={'text-sx'}>{`${item.cost}G`}</p>
												</div>
												<div className={'mt-3.5'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'ARMOR:'}</p>
													<p className={'text-sx'}>{`${item?.armor_bonus || 0}`}</p>
												</div>
												<div className={'mt-3.5'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'PENALTY:'}</p>
													<p className={'text-sx'}>{`${item?.penalty || 0}`}</p>
												</div>
												<div className={'mt-3.5'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'SPELL FAILURE:'}</p>
													<p className={'text-sx'}>{`${item?.spell_failure || 0}`}</p>
												</div>
											</div>
										</div>
									</summary>

									<div className={'flex flex-row space-x-4 w-full py-4'}>
										<div className={'w-16 h-1 hidden justify-center items-center relative md:flex'} />
										<div className={'flex flex-col space-between w-full pr-4'}>
											<p className={'text-megaxs mb-2 text-black dark:text-white'}>{'DESCRIPTION'}</p>
											<p className={'text-megaxs leading-4 text-gray-darker dark:text-white dark:text-opacity-60 normal-case text-left md:text-justify'}>{item?.description}</p>
										</div>
									</div>

								</details>
							);
						})
				}
			</div>
		);
	}
	function	renderWeapons() {
		return (
			<div className={'min-h-0 md:min-h-120 max-h-64 md:max-h-120 overflow-y-scroll'}>
				{
					Object.values(MANIFEST_WEAPONS)
						.filter((item) => {
							if (proficiency.name === 'All')
								return true;
							return item.proficiency === proficiency.name; 
						})
						.filter((item) => {
							if (encumbrance.name === 'All')
								return true;
							return item.encumbrance === encumbrance.name; 
						})
						.filter((item) => {
							if (damageType.name === 'All')
								return true;
							return item.damageType === damageType.name; 
						})
						.filter((item) => {
							if (search === '')
								return true;
							return item?.name.toLowerCase().includes(search.toLowerCase());
						})
						.map((item) => {
							return (
								<details key={item?.id} className={'flex flex-row w-full mb-2 transition-colors'}>
									<summary className={'transition-colors'}>
										<div className={'flex flex-row space-x-4 w-full h-auto md:h-16 cursor-pointer'}>
											<div className={'w-16 h-16 flex justify-center items-center relative item'}>
												<div className={`absolute ${item.levelClassName} left-0 top-0 w-2 h-1`} />
												<div className={`absolute ${item.levelClassName} left-0 top-0 w-1 h-2`} />
												<div className={`absolute ${item.levelClassName} right-0 top-0 w-2 h-1`} />
												<div className={`absolute ${item.levelClassName} right-0 top-0 w-1 h-2`} />
												<Image src={item.img} width={64} height={64} />
												<div className={`absolute ${item.levelClassName} left-0 bottom-0 w-2 h-1`} />
												<div className={`absolute ${item.levelClassName} left-0 bottom-0 w-1 h-2`} />
												<div className={`absolute ${item.levelClassName} right-0 bottom-0 w-2 h-1`} />
												<div className={`absolute ${item.levelClassName} right-0 bottom-0 w-1 h-2`} />

											</div>
											<div className={'hidden md:flex flex-row space-between w-full relative text-black dark:text-white'}>
												<div className={'mt-3.5 w-56'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'NAME:'}</p>
													<p className={'text-sx'}>{item?.name}</p>
												</div>
												<div className={'mt-3.5 pr-6'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'WEIGHT:'}</p>
													<p className={'text-sx'}>{item?.weight || '0'}</p>
												</div>
												<div className={'mt-3.5 pr-6'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'COST:'}</p>
													<p className={'text-sx'}>{`${item.cost}G`}</p>
												</div>
												<div className={'mt-3.5 pr-6'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'DAMAGE:'}</p>
													<p className={'text-sx'}>{`${item?.damage || 0}`}</p>
												</div>
												<div className={'mt-3.5 pr-6'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'CRITICAL:'}</p>
													<p className={'text-sx normal-case'}>
														{item?.critical_modifier ? `${`${(20+item?.critical_modifier)}-20`}/x${item?.critical || 0}` : `x${item?.critical || 0}`}
													</p>
												</div>
												<div className={'mt-3.5 pr-6'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'RANGE:'}</p>
													<p className={'text-sx'}>{`${item?.range_increment || 0}`}</p>
												</div>
											</div>

											<div className={'md:hidden grid grid-cols-2 space-between w-full relative text-black dark:text-white pb-4'}>
												<div className={'mt-3.5'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'NAME:'}</p>
													<p className={'text-sx'}>{item?.name}</p>
												</div>
												<div />
												<div className={'mt-3.5'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'WEIGHT:'}</p>
													<p className={'text-sx'}>{item?.weight || '0'}</p>
												</div>
												<div className={'mt-3.5'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'COST:'}</p>
													<p className={'text-sx'}>{`${item.cost}G`}</p>
												</div>
												<div className={'mt-3.5'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'ARMOR:'}</p>
													<p className={'text-sx'}>{`${item?.armor_bonus || 0}`}</p>
												</div>
												<div className={'mt-3.5'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'PENALTY:'}</p>
													<p className={'text-sx'}>{`${item?.penalty || 0}`}</p>
												</div>
												<div className={'mt-3.5'}>
													<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'SPELL FAILURE:'}</p>
													<p className={'text-sx'}>{`${item?.spell_failure || 0}`}</p>
												</div>
											</div>
										</div>
									</summary>

									<div className={'flex flex-row space-x-4 w-full py-4'}>
										<div className={'w-16 h-1 hidden justify-center items-center relative md:flex'} />
										<div className={'flex flex-col space-between w-full pr-4'}>
											<p className={'text-megaxs mb-2 text-black dark:text-white'}>{'DESCRIPTION'}</p>
											<p className={'text-megaxs leading-4 text-gray-darker dark:text-white dark:text-opacity-60 normal-case text-left md:text-justify'}>{item?.description}</p>
										</div>
									</div>

								</details>
							);
						})
				}
			</div>
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

				<div>
					{category === 0 ? renderGoods() : null}
					{category === 1 ? renderArmors() : null}
					{category === 2 ? renderWeapons() : null}
				</div>
			</div>
		</>
	);
}

export default Crafting;