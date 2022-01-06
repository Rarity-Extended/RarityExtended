import	React									from	'react';
import	{ethers}								from	'ethers';
import	useWeb3									from	'contexts/useWeb3';
import	useRarity								from	'contexts/useRarity';
import	ElementInventoryList					from	'sections/crafting/ElementInventoryList';
import	ElementRecipeCrafting					from	'sections/crafting/ElementRecipeCrafting';
import	{approveERC20, approveAllAdventurers}	from	'utils/actions/utils';
import	{craft}									from	'utils/actions';

const	MANIFEST_COOK = [
	{
		img: '/items/meal/meal_mushroomsoup.png',
		name: 'Mushroom soup',
		effect: 'Reduce the time between two adventures by 1 hours.',
		cost: [
			[process.env.RARITY_GOLD_ADDR, 4],
			[process.env.LOOT_MUSHROOM_ADDR, 2],
		]
	},
	{
		img: '/items/meal/meal_pie.png',
		name: 'Berries pie',
		effect: 'Reduce the time between two adventures by 1 hours.',
		cost: [
			[process.env.RARITY_GOLD_ADDR, 4],
			[process.env.LOOT_BERRIES_ADDR, 2],
		]
	},
	{
		img: '/items/meal/meal_fruitandmushroommix.png',
		name: 'Mushroom and fruid mix',
		effect: 'Reduce the time between two adventures by 2 hours.',
		cost: [
			[process.env.RARITY_GOLD_ADDR, 4],
			[process.env.LOOT_MUSHROOM_ADDR, 2],
			[process.env.LOOT_BERRIES_ADDR, 2],
		]
	},
	{
		img: '/items/meal/meal_mushroomandmeatskewer.png',
		name: 'Mushroom meat skewer',
		effect: 'Reduce the time between two adventures by 3 hours.',
		cost: [
			[process.env.RARITY_GOLD_ADDR, 4],
			[process.env.LOOT_MUSHROOM_ADDR, 2],
			[process.env.LOOT_MEAT_ADDR, 1],
		]
	},
	{
		img: '/items/meal/meal_gourmetfruitandmushroom.png',
		name: 'Gourmet meal with Mushroom',
		effect: 'Reduce the time between two adventures by 4 hours.',
		cost: [
			[process.env.RARITY_GOLD_ADDR, 4],
			[process.env.LOOT_MUSHROOM_ADDR, 2],
			[process.env.LOOT_BERRIES_ADDR, 2],
			[process.env.LOOT_MEAT_ADDR, 1],
		]
	},
];

function	SectionRarityCrafting() {
	const	{provider} = useWeb3();
	const	{currentAdventurer} = useRarity();
	const	[nonce, set_nonce] = React.useState(0);

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

	function	onCraft(item, materialsToUse) {
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
			<div className={'mb-10'}>
				<h1 className={'text-black dark:text-white font-story text-4xl mb-4'}>
					{'Kitchen'}
				</h1>
				<div className={'flex flex-row'}>
					<p className={'text-black dark:text-white font-story text-base max-w-full md:max-w-4xl'}>{'The kitchen is large, warn and full of pleasant smells. The Cook is a big guy with big knives and a big moustache. If you bring him enough materials he can give you a fair meal in exchange.'}</p>
				</div>
			</div>

			{/* Hidden on mobile */}
			<div className={'hidden md:grid grid-cols-12 gap-x-12 font-story text-black dark:text-white text-opacity-60 dark:text-opacity-60 text-sm mb-4'}>
				<div className={'col-span-3 grid grid-cols-1 pl-1'}>
					{'Inventory'}
				</div>
				<div className={'col-span-9 pl-1'}>
					<div className={'flex flex-row space-x-4'}>
						<p className={'transition-opacity hover:opacity-100 opacity-100'}>
							{`Recipes (${Object.values(MANIFEST_COOK).length})`}
						</p>
					</div>
				</div>
			</div>

			<div className={'flex flex-col md:grid grid-cols-12 gap-x-16 max-w-full'}>
				<div className={'col-span-3 relative'}>
					<div className={'grid grid-cols-2 md:grid-cols-1 gap-4 sticky top-4 max-h-screen'}>
						<ElementInventoryList
							onApprove={onApprove}
							currentAdventurer={currentAdventurer}
							craftingContractAddress={process.env.RARITY_CRAFTING_ADDR}
							craftingContractID={process.env.RARITY_CRAFTING_ID}
							ingredients={[
								process.env.RARITY_GOLD_ADDR,
								process.env.LOOT_MUSHROOM_ADDR,
								process.env.LOOT_BERRIES_ADDR,
								process.env.LOOT_MEAT_ADDR
							]}
							nonce={nonce} />
					</div>
				</div>
				<div className={'col-span-9'}>
					<div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
						{MANIFEST_COOK.map((recipe) => (
							<ElementRecipeCrafting
								key={recipe.name}
								currentAdventurer={currentAdventurer}
								onCraft={materials => onCraft(recipe, materials)}
								recipe={recipe} />
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default SectionRarityCrafting;