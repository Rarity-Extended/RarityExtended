/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday September 21st 2021
**	@Filename:				SectionCrafting.js
******************************************************************************/
/* eslint-disable react-hooks/exhaustive-deps */

import	React, {useState, useEffect}	from	'react';
import	{ethers}						from	'ethers';
import	Box								from	'components/Box';
import	ListBox							from	'components/ListBox';
import	Chevron							from	'components/Chevron';
import	BoxAlternate					from	'components/BoxAlternate';
import	Button							from	'components/Button';
import	ButtonCounter					from	'components/ButtonCounter';
import	Image							from	'next/image';
import	useRarity						from	'contexts/useRarity';
import	useWeb3							from	'contexts/useWeb3';
import	MANIFEST_GOODS					from	'utils/codex/items_manifest_goods.json';
import	MANIFEST_ARMORS					from	'utils/codex/items_manifest_armors.json';
import	MANIFEST_WEAPONS				from	'utils/codex/items_manifest_weapons.json';
import	{craft}							from	'utils/actions';
import {craftSkillCheck, getGoodsDifficulty, getArmorDifficulty, getWeaponDifficulty}	from	'utils/libs/rarityCrafting';

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

function	getDifficulty(item) {
	if (item?.type === 1) {
		return getGoodsDifficulty();
	} else if (item?.type === 2) {
		return getArmorDifficulty(item.armor_bonus);
	} else if (item?.type === 3) {
		return getWeaponDifficulty(item.proficiency);
	}
	return getGoodsDifficulty();
}

function	SectionCraftAction({currentAdventurer, item, isSimulationError, selectedCraftingMaterials, set_selectedCraftingMaterials, onCraft}) {
	const	hasEnoughGold = (currentAdventurer?.gold?.balance || 0) >= item.cost;

	return (
		<div className={'flex flex-col md:flex-row space-x-0 md:space-x-2'}>
			<div className={'flex flex-row md:hidden justify-between'}>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'Add materials'}</p>
					<div>
						<ButtonCounter
							className={'bg-gray-principal hover:bg-white focus:bg-white dark:bg-dark-400 dark:hover:bg-dark-600 dark:focus:bg-dark-600'}
							backgroundColor={'bg-gray-principal dark:bg-dark-400'}
							value={selectedCraftingMaterials}
							threshold={10}
							inc={() => set_selectedCraftingMaterials(s => s + 10)}
							dec={() => set_selectedCraftingMaterials(s => s - 10)}
							setMin={() => set_selectedCraftingMaterials(0)}
							max={Number(currentAdventurer?.inventory?.[0] || 0)}
							isMax={craftSkillCheck(currentAdventurer.skills[5], currentAdventurer.attributes.intelligence, (getDifficulty(item) - selectedCraftingMaterials / 10)) === 100}
						/>
					</div>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'Chance to Craft'}</p>
					<BoxAlternate
						className={'bg-gray-principal dark:bg-dark-400'}
						backgroundColor={'bg-gray-principal dark:bg-dark-400'}>
						{`${craftSkillCheck(currentAdventurer.skills[5], currentAdventurer.attributes.intelligence, (getDifficulty(item) - selectedCraftingMaterials / 10))}%`}
					</BoxAlternate>
				</div>
			</div>
			<div className={'hidden md:block'}>
				<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'Add materials'}</p>
				<div>
					<ButtonCounter
						className={'bg-gray-principal hover:bg-white focus:bg-white dark:bg-dark-400 dark:hover:bg-dark-600 dark:focus:bg-dark-600'}
						backgroundColor={'bg-gray-principal dark:bg-dark-400'}
						value={selectedCraftingMaterials}
						threshold={10}
						inc={() => set_selectedCraftingMaterials(s => s + 10)}
						dec={() => set_selectedCraftingMaterials(s => s - 10)}
						setMin={() => set_selectedCraftingMaterials(0)}
						max={Number(currentAdventurer?.inventory?.[0] || 0)}
						isMax={craftSkillCheck(currentAdventurer.skills[5], currentAdventurer.attributes.intelligence, (getDifficulty(item) - selectedCraftingMaterials / 10)) === 100}
					/>
				</div>
			</div>
			<div className={'hidden md:block'}>
				<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'Chance to Craft'}</p>
				<BoxAlternate
					className={'bg-gray-principal dark:bg-dark-400'}
					backgroundColor={'bg-gray-principal dark:bg-dark-400'}>
					{`${craftSkillCheck(currentAdventurer.skills[5], currentAdventurer.attributes.intelligence, (getDifficulty(item) - selectedCraftingMaterials / 10))}%`}
				</BoxAlternate>
			</div>
			<div className={'flex-1'}>
				<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>&nbsp;</p>
				<Button
					onClick={() => onCraft()}
					className={`${hasEnoughGold ? 'cursor-pointer hover:bg-white focus:bg-white dark:hover:bg-dark-600 dark:focus:bg-dark-600' : 'cursor-not-allowed'} bg-gray-principal dark:bg-dark-400 text-center`}
					backgroundColor={'bg-gray-principal dark:bg-dark-400'}>
					{!hasEnoughGold ? 'NOT ENOUGH GOLD' : isSimulationError ? 'YOU WILL PROBABLY FAIL IF YOU CRAFT NOW' : 'TRY TO CRAFT'}
				</Button>
			</div>
		</div>
	);
}

function	ItemRow({isExpanded, set_isExpanded, item, craftingSuccessPercent, children, overlay}) {
	return (
		<div className={'relative'}>
			<Box className={'bg-gray-principal dark:bg-dark-400 w-full z-10 cursor-pointer'}>
				<div className={'w-full flex flex-row px-4'} onClick={() => set_isExpanded(!isExpanded)}>
					<div className={'w-16 h-16 bg-gray-principal dark:bg-dark-400 flex justify-center items-center item relative my-4'}>
						<div className={`absolute ${item.levelClassName} left-0 top-0 w-2 h-1`} />
						<div className={`absolute ${item.levelClassName} left-0 top-0 w-1 h-2`} />
						<div className={`absolute ${item.levelClassName} right-0 top-0 w-2 h-1`} />
						<div className={`absolute ${item.levelClassName} right-0 top-0 w-1 h-2`} />
						<Image src={item.img} width={60} height={60} />
						<div className={`absolute ${item.levelClassName} left-0 bottom-0 w-2 h-1`} />
						<div className={`absolute ${item.levelClassName} left-0 bottom-0 w-1 h-2`} />
						<div className={`absolute ${item.levelClassName} right-0 bottom-0 w-2 h-1`} />
						<div className={`absolute ${item.levelClassName} right-0 bottom-0 w-1 h-2`} />
					</div>
					<div className={'grid grid-cols-1 md:grid-cols-5 gap-x-0 md:gap-x-4 gap-y-4 md:gap-y-0 pt-4 ml-16 w-full pb-4 md:pb-0'}>
						<div className={'w-full'}>
							<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'Name'}</p>
							<p className={'text-xs text-black dark:text-white'}>{item?.name}</p>
						</div>
						<div className={'w-full'}>
							<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'Cost (gold)'}</p>
							<p className={'text-xs text-black dark:text-white'}>{`${item?.cost} gold`}</p>
						</div>
						<div className={'w-full'}>
							<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'Cost (xp)'}</p>
							<p className={'text-xs text-black dark:text-white'}>{'250 XP'}</p>
						</div>
						<div className={'w-full'}>
							<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'Crafting success'}</p>
							<p className={`text-xs ${craftingSuccessPercent > 75 ? 'text-tag-new' : craftingSuccessPercent >= 50 ? 'text-tag-warning' : 'text-tag-withdraw'}`}>
								{`${craftingSuccessPercent}%`}
							</p>
						</div>
						<div className={'hidden md:flex w-full'}>
							<p className={'text-sx text-black dark:text-dark-100 text-opacity-50 pb-2'}>&nbsp;</p>
							<div className={'text-xs text-black dark:text-white flex flex-row justify-end items-center'}>
								<Chevron className={`ml-2 select-none cursor-pointer text-black dark:text-white transform transition-transform ${isExpanded ? '-rotate-90' : '-rotate-180'}`} />
							</div>
						</div>
					</div>
				</div>
				<div className={`bg-gray-principal dark:bg-dark-400 w-full mt-2 transition-max-height ${isExpanded ? 'max-h-full' : 'max-h-0 hidden'}`}>
					{children}
				</div>
			</Box>
			{overlay}
		</div>
	);
}

function	SectionCraft({item, currentAdventurer, children}) {
	const	{provider, currentBlock} = useWeb3();
	const	[isSimulationError, set_isSimulationError] = useState(false);
	const	[selectedCraftingMaterials, set_selectedCraftingMaterials] = useState(0);
	const	[isExpanded, set_isExpanded] = useState(false);
	const	craftingSuccessPercent = craftSkillCheck(currentAdventurer.skills[5], currentAdventurer.attributes.intelligence, getDifficulty(item));
	const	hasEnoughGold = (currentAdventurer?.gold?.balance || 0) >= item.cost;
	const	[txStatus, set_txStatus] = useState({none: true, isPending: false, isSuccess: false, isError: false, isFailed: false, isSimulationFailed: false});

	useEffect(() => {
		if (isExpanded && hasEnoughGold) {
			simulateCrafting();
		}
	}, [isExpanded, currentBlock, currentAdventurer?.tokenID, hasEnoughGold, selectedCraftingMaterials]);

	function	onCraft(forced = false) {
		if (!hasEnoughGold) {
			return;
		}
		set_txStatus({none: false, isPending: true, isSuccess: false, isError: false, isFailed: false, isSimulationFailed: false});
		craft({
			provider,
			tokenID: currentAdventurer.tokenID,
			itemName: item.name,
			baseType: item.type,
			itemType: item.id,
			craftingMaterials: selectedCraftingMaterials,
			forced
		}, ({error}) => {
			if (error === 'SIMULATION_FAILED') {
				return set_txStatus({none: false, isPending: false, isSuccess: false, isError: false, isFailed: false, isSimulationFailed: true});
			} else if (error === 'CRAFT_FAILED') {
				return set_txStatus({none: false, isPending: false, isSuccess: false, isError: false, isFailed: true, isSimulationFailed: false});
			} else if (error) {
				return set_txStatus({none: false, isPending: false, isSuccess: false, isError: true, isFailed: false, isSimulationFailed: false});
			}
			return set_txStatus({none: false, isPending: false, isSuccess: true, isError: false, isFailed: false, isSimulationFailed: false});
		});
	}

	async function simulateCrafting() {
		const	signer = provider.getSigner();
		const	rarityCraft = new ethers.Contract(
			process.env.RARITY_CRAFTING_ADDR,
			['function simulate(uint _summoner, uint _base_type, uint _item_type, uint _crafting_materials) view returns (bool crafted, int check, uint cost, uint dc)'],
			signer
		);

		const	simulation = await rarityCraft.simulate(currentAdventurer.tokenID, item.type, item.id, selectedCraftingMaterials);
		if (!simulation.crafted) {
			set_isSimulationError(true);
		} else {
			set_isSimulationError(false);
		}
	}

	function	renderTxStatusOverlay() {
		if (txStatus.isPending) {
			return (
				<div className={'absolute inset-0 backdrop-blur-3xl bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 cursor-not-allowed flex flex-col justify-center items-center text-center p-6'}>
					<div className={'loader'} />
				</div>
			);
		}
		if (txStatus.isSuccess) {
			return (
				<div className={'absolute inset-0 backdrop-blur-3xl bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 cursor-not-allowed flex flex-col justify-center items-center text-center p-6'}>
					<p>{`YOU HAVE SUCCESSFULLY CRAFTED 1 ${item?.name}!`}</p>
					<Button
						onClick={() => set_txStatus({none: true, isPending: false, isSuccess: false, isError: false, isFailed: false, isSimulationFailed: false})}
						className={'cursor-pointer hover:bg-gray-secondary focus:bg-gray-secondary dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-white dark:bg-dark-900 text-center mt-4'}
						backgroundColor={'bg-white dark:bg-black bg-opacity-40 dark:bg-opacity-40'}>
						{'OK'}
					</Button>
				</div>
			);
		}
		if (txStatus.isFailed) {
			return (
				<div className={'absolute inset-0 backdrop-blur-3xl bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 cursor-not-allowed flex flex-col justify-center items-center text-center p-6'}>
					<p>{`YOU FAILED TO BUILD THE ${item?.name}.`}</p>
					<Button
						onClick={() => set_txStatus({none: true, isPending: false, isSuccess: false, isError: false, isFailed: false, isSimulationFailed: false})}
						className={'cursor-pointer hover:bg-gray-secondary focus:bg-gray-secondary dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-white dark:bg-dark-900 text-center mt-4'}
						backgroundColor={'bg-white dark:bg-black bg-opacity-40 dark:bg-opacity-40'}>
						{'OK'}
					</Button>
				</div>
			);
		}
		if (txStatus.isSimulationFailed) {
			return (
				<div className={'absolute inset-0 backdrop-blur-3xl bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 cursor-not-allowed flex flex-col justify-center items-center text-center p-6'}>
					<p>{'CEAZOR HAS STOPPED YOU.'}</p>
					<p>{'YOU WILL FAIL IF YOU TRY IT NOW.'}</p>
					<div className={'flex flex-row space-x-4'}>
						<Button
							onClick={() => onCraft(true)}
							className={'cursor-pointer hover:bg-gray-secondary focus:bg-gray-secondary dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-white dark:bg-dark-900 text-center mt-4'}
							backgroundColor={'bg-white dark:bg-black bg-opacity-40 dark:bg-opacity-40'}>
							{'CONTINUE ANYWAY'}
						</Button>
						<Button
							onClick={() => set_txStatus({none: true, isPending: false, isSuccess: false, isError: false, isFailed: false, isSimulationFailed: false})}
							className={'cursor-pointer hover:bg-gray-secondary focus:bg-gray-secondary dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-white dark:bg-dark-900 text-center mt-4'}
							backgroundColor={'bg-white dark:bg-black bg-opacity-40 dark:bg-opacity-40'}>
							{'CANCEL'}
						</Button>
					</div>
				</div>
			);
		}
		if (txStatus.isError) {
			return (
				<div className={'absolute inset-0 backdrop-blur-3xl bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 cursor-not-allowed flex flex-col justify-center items-center text-center p-6'}>
					<p>{'THERE WAS AN ERROR PROCESSING THE TRANSACTION'}</p>
					<Button
						onClick={() => set_txStatus({none: true, isPending: false, isSuccess: false, isError: false, isFailed: false, isSimulationFailed: false})}
						className={'cursor-pointer hover:bg-gray-secondary focus:bg-gray-secondary dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-white dark:bg-dark-900 text-center mt-4'}
						backgroundColor={'bg-white dark:bg-black bg-opacity-40 dark:bg-opacity-40'}>
						{'OK'}
					</Button>
				</div>
			);
		}
		return null;
	}

	return (
		<ItemRow isExpanded={isExpanded} set_isExpanded={set_isExpanded} item={item} craftingSuccessPercent={craftingSuccessPercent}>
			<div className={'w-full flex flex-col px-4 pt-4 pb-6 space-y-6 cursor-default'}>
				<div className={'grid grid-cols-3 gap-x-4 gap-y-6'}>
					{children}
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'Description'}</p>
					<p className={'text-megaxs text-black dark:text-white'}>{item.description}</p>
				</div>
				<SectionCraftAction
					currentAdventurer={currentAdventurer}
					item={item}
					onCraft={onCraft}
					isSimulationError={isSimulationError}
					selectedCraftingMaterials={selectedCraftingMaterials}
					set_selectedCraftingMaterials={set_selectedCraftingMaterials} />
			</div>
			{renderTxStatusOverlay()}
		</ItemRow>
	);
}


function	Crafting({shouldDisplay, category}) {
	const	{currentAdventurer} = useRarity();
	const	[search, set_search] = useState('');
	const	[armorType, set_armorType] = useState('All');
	const	[proficiency, set_proficiency] = useState(proficiencyOptions[0]);
	const	[encumbrance, set_encumbrance] = useState(encumbranceOptions[0]);
	const	[damageType, set_damageType] = useState(damageTypeOptions[0]);
	
	function	renderSubCategories() {
		if (category === 0) {
			return (
				<div
					onClick={() => set_armorType('All')}
					className={`hidden md:block h-min p-2 cursor-pointer text-black dark:text-white mr-4 ${armorType === 'All' ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary ml-auto`}>
					{'All'}
				</div>
			);
		}
		if (category === 1) {
			return (
				<>
					<div
						onClick={() => set_armorType('All')}
						className={`hidden md:block h-min p-2 cursor-pointer text-black dark:text-white mr-4 ${armorType === 'All' ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary ml-auto`}>
						{'All'}
					</div>
					<div
						onClick={() => set_armorType('Light')}
						className={`hidden md:block h-min p-2 cursor-pointer text-black dark:text-white mr-4 ${armorType === 'Light' ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
						{'Light'}
					</div>
					<div
						onClick={() => set_armorType('Medium')}
						className={`hidden md:block h-min p-2 cursor-pointer text-black dark:text-white mr-4 ${armorType === 'Medium' ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
						{'Medium'}
					</div>
					<div
						onClick={() => set_armorType('Heavy')}
						className={`hidden md:block h-min p-2 cursor-pointer text-black dark:text-white mr-4 ${armorType === 'Heavy' ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
						{'Heavy'}
					</div>
					<div
						onClick={() => set_armorType('Shields')}
						className={`hidden md:block h-min p-2 cursor-pointer text-black dark:text-white ${armorType === 'Shields' ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
						{'Shields'}
					</div>
				</>
			);
		}
		return (
			<div className={'ml-auto flex flex-row w-full md:w-auto'}>
				<ListBox
					options={proficiencyOptions}
					className={'mr-4 w-24 md:w-28'}
					set_selected={set_proficiency}
					selected={proficiency} />
				<ListBox
					options={encumbranceOptions}
					className={'mr-4 w-24 md:w-40'}
					set_selected={set_encumbrance}
					selected={encumbrance} />
				<ListBox
					options={damageTypeOptions}
					className={'w-24 md:w-32'}
					set_selected={set_damageType}
					selected={damageType} />
			</div>
		);
	}

	function	renderGoods() {
		return (
			<div className={'grid grid-cols-1 gap-4 md:gap-8 gap-y-4'}>
				{
					Object.values(MANIFEST_GOODS)
						.filter((item) => {
							if (search === '')
								return true;
							return item?.name.toLowerCase().includes(search.toLowerCase());
						})
						.map((item) => {
							return (
								<SectionCraft key={`goods_${item?.id}`} item={item} currentAdventurer={currentAdventurer}>
									<>
										<div>
											<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'WEIGHT'}</p>
											<p className={'text-sx text-black dark:text-white break-words'}>{item?.weight || 0}</p>
										</div>
									</>
								</SectionCraft>
							);
						})
				}
			</div>
		);
	}

	function	renderArmors() {
		return (
			<div className={'grid grid-cols-1 gap-4 md:gap-8 gap-y-4'}>
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
								<SectionCraft key={`goods_${item?.id}`} item={item} currentAdventurer={currentAdventurer}>
									<>
										<div>
											<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'ARMOR TYPE'}</p>
											<p className={'text-sx text-black dark:text-white break-words'}>{item?.proficiency}</p>
										</div>
										<div>
											<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'ARMOR'}</p>
											<p className={'text-sx text-black dark:text-white break-words'}>{item?.armor_bonus}</p>
										</div>
										<div>
											<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'MAX DEX BONUS'}</p>
											<p className={'text-sx text-black dark:text-white break-words'}>{item?.max_dex_bonus}</p>
										</div>
										<div>
											<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'PENALTY'}</p>
											<p className={'text-sx text-black dark:text-white break-words'}>{item?.penalty}</p>
										</div>
										<div>
											<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'SPELL FAILURE'}</p>
											<p className={'text-sx text-black dark:text-white break-words'}>{item?.spell_failure}</p>
										</div>

										<div>
											<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'WEIGHT'}</p>
											<p className={'text-sx text-black dark:text-white break-words'}>{item?.weight || 0}</p>
										</div>
									</>
								</SectionCraft>
							);
						})
				}
			</div>
		);
	}

	function	renderWeapons() {
		return (
			<div className={'grid grid-cols-1 gap-4 md:gap-8 gap-y-4'}>
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
								<SectionCraft key={`weapons_${item?.id}`} item={item} currentAdventurer={currentAdventurer}>
									<>
										<div>
											<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'DMG TYPE'}</p>
											<p className={'text-sx text-black dark:text-white break-words'}>{item?.damageType}</p>
										</div>
										<div>
											<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'ENCUMBRANCE'}</p>
											<p className={'text-sx text-black dark:text-white break-words'}>{item?.encumbrance}</p>
										</div>
										<div>
											<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'PROFICIENCY'}</p>
											<p className={'text-sx text-black dark:text-white break-words'}>{item?.proficiency}</p>
										</div>

										<div>
											<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'DAMAGE'}</p>
											<p className={'text-sx text-black dark:text-white break-words'}>{item?.damage || 0}</p>
										</div>
										<div>
											<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'CRITICAL'}</p>
											<p className={'text-sx text-black dark:text-white break-words'}>{item?.critical_modifier ? `${`${(20+item?.critical_modifier)}-20`}/x${item?.critical || 0}` : `x${item?.critical || 0}`}</p>
										</div>
										<div>
											<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'RANGE'}</p>
											<p className={'text-sx text-black dark:text-white break-words'}>{item?.range_increment || 0}</p>
										</div>

										<div>
											<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'WEIGHT'}</p>
											<p className={'text-sx text-black dark:text-white break-words'}>{item?.weight || 0}</p>
										</div>
									</>
								</SectionCraft>
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
				<div className={'w-full flex flex-col md:flex-row text-megaxs mb-4'}>
					<Box>
						<input
							onChange={e => set_search(e?.target?.value || '')}
							className={'bg-white dark:bg-dark-600 border-solid h-10 w-full md:w-75 mr-0 md:mr-4 text-xs px-2 focus:outline-none text-black dark:text-white'}
							placeholder={'SEARCH'} />
					</Box>
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