import	React										from	'react';
import	{ethers}									from	'ethers';
import	useWeb3										from	'contexts/useWeb3';
import	useRarity									from	'contexts/useRarity';
import	ModalSkills									from	'components/ModalSkills';
import	ElementInventoryList						from	'sections/pages/crafting/ElementInventoryList';
import	ElementRecipeRarityCrafting					from	'sections/pages/crafting/ElementRecipeRarityCrafting';
import	MANIFEST_ARMORS								from	'utils/codex/items_manifest_armors.json';
import	MANIFEST_GOODS								from	'utils/codex/items_manifest_goods.json';
import	MANIFEST_WEAPONS 							from	'utils/codex/items_manifest_weapons.json';
import	MANIFEST_SHIELDS							from	'utils/codex/items_manifest_shields.json';
import	{approveERC20, approveAllAdventurers}		from	'utils/actions/utils';
import	{craft}										from	'utils/actions/rarity_extended_crafting_helper';
import 	{getGoodsDifficulty, getArmorDifficulty, getWeaponDifficulty}	from	'utils/libs/rarityCrafting';

function	SectionRarityCrafting() {
	const	{provider} = useWeb3();
	const	{currentAdventurer} = useRarity();
	const	[tab, set_tab] = React.useState(0);
	const	[nonce, set_nonce] = React.useState(0);
	const	[isModalSkillsOpen, set_isModalSkillsOpen] = React.useState(false);

	function	onApprove(ingredient, ingredientName = '') {
		if (ingredient === process.env.RARITY_EXTENDED_XP) {
			approveAllAdventurers({
				provider,
				name: currentAdventurer?.name || currentAdventurer.tokenID
			}, () => set_nonce(nonce + 1));
		} else {
			approveERC20({
				provider,
				contractAddress: ingredient,
				spender: process.env.RARITY_CRAFTING_ID,
				adventurerID: currentAdventurer.tokenID,
				amount: ethers.constants.MaxUint256,
				name: ingredientName
			}, () => set_nonce(nonce + 1));
		}
	}

	function onCraft(item, materialsToUse) {
		craft({
			provider,
			tokenID: currentAdventurer.tokenID,
			itemName: item.name,
			baseType: item.type,
			itemType: item.id,
			craftingMaterials: materialsToUse,
			forced: false
		}, () => set_nonce(nonce + 1));
	}

	return (
		<>
			<div className={'hidden md:grid grid-cols-12 gap-x-12 font-story text-plain text-opacity-60 dark:text-opacity-60 text-sm mb-4'}>
				<div className={'col-span-3 grid grid-cols-1 pl-1'}>
					{'Inventory'}
				</div>
				<div className={'col-span-9 pl-1'}>
					<div className={'flex flex-row space-x-4'}>
						<p
							onClick={() => set_tab(0)}
							className={`transition-opacity hover:opacity-100 ${tab === 0 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
							{`Goods (${Object.values(MANIFEST_GOODS).length})`}
						</p>
						<p
							onClick={() => set_tab(1)}
							className={`transition-opacity hover:opacity-100 ${tab === 1 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
							{`Weapons (${Object.values(MANIFEST_WEAPONS).length})`}
						</p>
						<p
							onClick={() => set_tab(2)}
							className={`transition-opacity hover:opacity-100 ${tab === 2 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
							{`Armors (${Object.values(MANIFEST_ARMORS).length})`}
						</p>
						<p
							onClick={() => set_tab(3)}
							className={`transition-opacity hover:opacity-100 ${tab === 3 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
							{`Shields (${Object.values(MANIFEST_SHIELDS).length})`}
						</p>
					</div>
				</div>
			</div>

			<div className={'flex flex-col md:grid grid-cols-12 gap-x-16'}>
				<div className={'col-span-3 relative'}>
					<div className={'grid grid-cols-2 md:grid-cols-1 gap-4 sticky top-4 max-h-screen'}>
						{Number(currentAdventurer?.skills?.[5] || 0) <= 0 ? 
							<div
								onClick={() => set_isModalSkillsOpen(true)}
								className={'rounded-md bg-gray-lighter dark:bg-tag-warning hover:dark:bg-tag-warningDarker flex flex-center p-4 cursor-pointer'}>
								<p className={'text-black font-story text-sm font-bold'}>{'Learn crafting'}</p>
							</div>
							: 
							<div className={'rounded-md bg-gray-lighter dark:bg-dark-400 flex flex-center p-4'}>
								<p className={'text-plain font-story text-sm font-bold'}>{`Crafting level ${currentAdventurer?.skills?.[5]}`}</p>
							</div>
						}
						<ElementInventoryList
							withXP
							onApprove={onApprove}
							currentAdventurer={currentAdventurer}
							craftingContractAddress={process.env.RARITY_CRAFTING_ADDR}
							craftingContractID={process.env.RARITY_CRAFTING_ID}
							ingredients={[process.env.DUNGEON_THE_CELLAR_ADDR]}
							nonce={nonce} />
					</div>
				</div>
				<div className={'col-span-9'}>
					<div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>

						{tab === 0 ? Object.values(MANIFEST_GOODS).map((recipe) => (
							<ElementRecipeRarityCrafting
								key={recipe.name}
								currentAdventurer={currentAdventurer}
								difficultyCheckFunc={() => getGoodsDifficulty()}
								onCraft={materials => onCraft(recipe, materials)}
								recipe={{
									...recipe,
									cost: [
										[process.env.RARITY_GOLD_ADDR, recipe.cost],
										[process.env.RARITY_EXTENDED_XP, 250],
										[process.env.DUNGEON_THE_CELLAR_ADDR, -1],
									]
								}} />
						)) : null}

						{tab === 1 ? Object.values(MANIFEST_WEAPONS).map((recipe) => (
							<ElementRecipeRarityCrafting
								key={recipe.name}
								currentAdventurer={currentAdventurer}
								difficultyCheckFunc={() => getWeaponDifficulty(recipe.armor_bonus)}
								onCraft={materials => onCraft(recipe, materials)}
								recipe={{
									...recipe,
									effect: (recipe.description).substring(0, 100),
									cost: [
										[process.env.RARITY_GOLD_ADDR, recipe.cost],
										[process.env.RARITY_EXTENDED_XP, 250],
										[process.env.DUNGEON_THE_CELLAR_ADDR, -1],
									]
								}} />
						)) : null}

						{tab === 2 ? Object.values(MANIFEST_ARMORS).map((recipe) => (
							<ElementRecipeRarityCrafting
								key={recipe.name}
								currentAdventurer={currentAdventurer}
								difficultyCheckFunc={() => getArmorDifficulty(recipe.armor_bonus)}
								onCraft={materials => onCraft(recipe, materials)}
								recipe={{
									...recipe,
									effect: (recipe.description).substring(0, 100),
									cost: [
										[process.env.RARITY_GOLD_ADDR, recipe.cost],
										[process.env.RARITY_EXTENDED_XP, 250],
										[process.env.DUNGEON_THE_CELLAR_ADDR, -1],
									]
								}} />
						)) : null}

						{tab === 3 ? Object.values(MANIFEST_SHIELDS).map((recipe) => (
							<ElementRecipeRarityCrafting
								key={recipe.name}
								currentAdventurer={currentAdventurer}
								difficultyCheckFunc={() => getArmorDifficulty(recipe.armor_bonus)}
								onCraft={materials => onCraft(recipe, materials)}
								recipe={{
									...recipe,
									effect: (recipe.description).substring(0, 100),
									cost: [
										[process.env.RARITY_GOLD_ADDR, recipe.cost],
										[process.env.RARITY_EXTENDED_XP, 250],
										[process.env.DUNGEON_THE_CELLAR_ADDR, -1],
									]
								}} />
						)) : null}
					</div>
				</div>
			</div>
			{isModalSkillsOpen && <ModalSkills
				adventurer={currentAdventurer}
				isOpen={isModalSkillsOpen}
				closeModal={() => set_isModalSkillsOpen(false)} />}
		</>
	);
}

export default SectionRarityCrafting;