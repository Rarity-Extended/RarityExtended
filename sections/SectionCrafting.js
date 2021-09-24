/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday September 21st 2021
**	@Filename:				SectionCrafting.js
******************************************************************************/

import	Box from 'components/Box';
import	ListBox from 'components/ListBox';
import	Image from 'next/image';
import	React, {Fragment, useState} from 'react';
import	CLASSES from 'utils/codex/classes';
import	MANIFEST_GOODS				from	'utils/codex/items_manifest_goods.json';
import	MANIFEST_ARMORS				from	'utils/codex/items_manifest_armors.json';
import	MANIFEST_WEAPONS			from	'utils/codex/items_manifest_weapons.json';

import {availableSkillPoints, calculatePointsForSet} from 'utils/libs/raritySkills';

const	proficiencyOptions = [
	{name: 'All', value: 'All'},
	{name: 'Simple', value: 'Simple'},
	{name: 'Martial', value: 'Martial'},
	{name: 'Exotic', value: 'Exotic'},
];
const	encumbranceOptions = [
	{name: 'All', value: 'All'},
	{name: 'Unarmed', value: 'Unarmed'},
	{name: 'Light Melee', value: 'Light Melee Weapons'},
	{name: 'One-Handed Melee', value: 'One-Handed Melee Weapons'},
	{name: 'Two-Handed Melee', value: 'Two-Handed Melee Weapons'},
	{name: 'Ranged', value: 'Ranged Weapons'},
];
const	damageTypeOptions = [
	{name: 'All', value: 'All'},
	{name: 'Bludgeoning', value: 'Bludgeoning'},
	{name: 'Piercing', value: 'Piercing'},
	{name: 'Slashing', value: 'Slashing'},
];


function	Item({img, name, onClick, children, noHover}) {
	return (
		<Box
			className={`w-full p-4 flex justify-center items-center flex-col ${noHover ? '' : 'group hover:bg-gray-principal dark:hover:bg-dark-100'} transition-colors cursor-pointer relative mb-4 md:mb-0 tooltip`}
			onClick={onClick}>
			<Image
				src={img}
				quality={100}
				width={120}
				height={120} />
			<p className={'text-xs justify-center text-center group-hover:underline'}>{name}</p>
			{children}
		</Box>
	);
}

function	Crafting({shouldDisplay}) {
	const	[category, set_category] = useState(0);
	const	[subCategory, set_subCategory] = useState(0);
	const	[search, set_search] = useState('');
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
			return (
				<div
					onClick={() => set_armorType('All')}
					className={`hidden md:block p-2 cursor-pointer text-black dark:text-white mr-4 ${armorType === 'All' ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary ml-auto`}>
					{'All'}
				</div>
			);
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
					className={'mr-4 w-28'}

					set_selected={set_proficiency}
					selected={proficiency}
				/>
				<ListBox
					options={encumbranceOptions}
					className={'mr-4 w-40'}
					set_selected={set_encumbrance}
					selected={encumbrance}
				/>
				<ListBox
					options={damageTypeOptions}
					className={'w-32'}
					set_selected={set_damageType}
					selected={damageType} />
			</div>
		);
	}

	function	renderGoods() {
		return (
			<div className={'grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 gap-y-0 md:gap-y-4'}>
				{
					Object.values(MANIFEST_GOODS)
						.filter((item) => {
							if (search === '')
								return true;
							return item?.name.toLowerCase().includes(search.toLowerCase());
						})
						.map((item) => {
							return (
								<Item
									key={`goods_${item?.id}`}
									img={item.img}
									name={item?.name}
									onClick={() => null}>
									<Box className={'tooltiptext shadow-xl invisible group-hover:visible bg-white dark:bg-dark-600 w-full center'}>
										<div className={'p-4'}>
											<p className={'text-sx mb-1'}>{item.level}</p>
											<div className={'text-megaxs flex flex-row'}>
												<p>{'WEIGHT: '}</p>
												<p className={'text-tag-withdraw ml-2'}>{`${item?.weight || 0}`}</p>
											</div>
											<div className={'text-megaxs flex flex-row -mt-2'}>
												<p>{'COST: '}</p>
												<p className={'text-tag-withdraw ml-2'}>{`${item?.cost || 0} Gold`}</p>
											</div>
											<p className={'text-megaxs mt-2 text-gray-darker dark:text-white dark:text-opacity-60 leading-normal'}>
												{item.description}
											</p>
										</div>
									</Box>
								</Item>
							);
						})
				}
			</div>
		);
	}

	function	renderArmors() {
		return (
			<div className={'grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 gap-y-0 md:gap-y-4'}>
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
								<Item
									key={`armors_${item?.id}`}
									img={item.img}
									name={item?.name}
									onClick={() => null}>
									<div className={'text-sx flex flex-row mt-1'}>
										<p>{'ARMOR: '}</p>
										<p className={'text-tag-new ml-2'}>{`${item?.armor_bonus || 0}`}</p>
									</div>
									<Box className={'tooltiptext shadow-xl invisible group-hover:visible bg-white dark:bg-dark-600 w-full center'}>
										<div className={'p-4'}>
											<p className={'text-sx mb-1'}>{item.level}</p>
											<div className={'text-megaxs flex flex-row'}>
												<p>{'PENALTY: '}</p>
												<p className={'text-tag-withdraw ml-2'}>{`${item?.penalty || 0}`}</p>
											</div>
											<div className={'text-megaxs flex flex-row -mt-2'}>
												<p>{'SPELL FAILURE: '}</p>
												<p className={'text-tag-withdraw ml-2'}>{`${item?.spell_failure || 0}%`}</p>
											</div>
											<div className={'text-megaxs flex flex-row -mt-2'}>
												<p>{'WEIGHT: '}</p>
												<p className={'text-tag-withdraw ml-2'}>{`${item?.weight || 0}`}</p>
											</div>
											<div className={'text-megaxs flex flex-row -mt-2'}>
												<p>{'COST: '}</p>
												<p className={'text-tag-withdraw ml-2'}>{`${item?.cost || 0} Gold`}</p>
											</div>
											<p className={'text-megaxs mt-2 text-gray-darker dark:text-white dark:text-opacity-60 leading-normal'}>
												{item.description}
											</p>
										</div>
									</Box>
								</Item>
							);
						})
				}
			</div>
		);
	}

	function	renderWeapons() {
		return (
			<div className={'grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 gap-y-0 md:gap-y-4'}>
				{
					Object.values(MANIFEST_WEAPONS)
						.filter((item) => {
							if (search === '')
								return true;
							return item?.name.toLowerCase().includes(search.toLowerCase());
						})
						.filter((item) => {
							if (proficiency.value === 'All')
								return true;
							return item.proficiency === proficiency.value; 
						})
						.filter((item) => {
							if (encumbrance.value === 'All')
								return true;
							return item.encumbrance === encumbrance.value; 
						})
						.filter((item) => {
							if (damageType.value === 'All')
								return true;
							return item.damageType === damageType.value; 
						})
						.filter((item) => {
							if (search === '')
								return true;
							return item?.name.toLowerCase().includes(search.toLowerCase());
						})
						.map((item) => {
							return (
								<Item
									key={`weapons_${item?.id}`}
									img={item.img}
									name={item?.name}
									onClick={() => null}>
									<div className={'text-sx flex flex-row mt-1'}>
										<p>{'DAMAGE: '}</p>
										<p className={'text-tag-new ml-2'}>{`${item?.damage || 0}`}</p>
									</div>
									<Box className={'tooltiptext shadow-xl invisible group-hover:visible bg-white dark:bg-dark-600 w-full center'}>
										<div className={'p-4'}>
											<p className={'text-sx mb-1'}>{item.level}</p>
											<div className={'text-megaxs flex flex-row'}>
												<p>{'CRITICAL: '}</p>
												<p className={'text-tag-new ml-2'}>{item?.critical_modifier ? `${`${(20+item?.critical_modifier)}-20`}/x${item?.critical || 0}` : `x${item?.critical || 0}`}</p>
											</div>
											<div className={'text-megaxs flex flex-row -mt-2'}>
												<p>{'RANGE: '}</p>
												<p className={'text-tag-new ml-2'}>{`${item?.range_increment || 0}`}</p>
											</div>
											<div className={'text-megaxs flex flex-row -mt-2'}>
												<p>{'WEIGHT: '}</p>
												<p className={'text-tag-withdraw ml-2'}>{`${item?.weight || 0}`}</p>
											</div>
											<div className={'text-megaxs flex flex-row -mt-2'}>
												<p>{'COST: '}</p>
												<p className={'text-tag-withdraw ml-2'}>{`${item?.cost || 0} Gold`}</p>
											</div>
											<p className={'text-megaxs mt-2 text-gray-darker dark:text-white dark:text-opacity-60 leading-normal'}>
												{item.description}
											</p>
										</div>
									</Box>
								</Item>
							);
						})
				}
			</div>
		);
	}

	if (!shouldDisplay) {
		return null;
	}
	return (
		<>
			<div className={'inline-block py-9 text-left transition-all transform bg-white dark:bg-dark-600 max-w-screen-lg w-full uppercase font-title relative'}>
				<h3 className={'relative text-lg font-medium leading-6 text-black dark:text-white flex flex-col md:flex-row justify-between'}>
					{'WORKSHOP'}
				</h3>
				<div className={'mt-6 flex flex-col md:flex-row mb-4 items-center'}>
					<input
						onChange={e => set_search(e?.target?.value || '')}
						className={'border-4 border-black dark:border-dark-100 bg-white dark:bg-dark-600 border-solid h-10 w-full md:w-75 mr-0 md:mr-4 text-xs px-2 focus:outline-none text-black dark:text-white'}
						placeholder={'SEARCH'} />
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