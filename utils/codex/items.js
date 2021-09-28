/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				items.js
******************************************************************************/

import	{ethers}				from	'ethers';
import	{Contract}				from	'ethcall';
import	RARITY_GOLD_ABI			from	'utils/abi/rarityGold.abi';
import	THE_FOREST_ABI			from	'utils/abi/dungeonTheForest.abi';

const	items = [
	{
		name: 'Rat Skin',
		description: 'This skin looks like the best possible material for an armor. No?',
		img: '/items/rat_skin.png',
		address: process.env.DUNGEON_THE_CELLAR_ADDR,
		level: 'Common',
		levelClassName: 'bg-items-common',
		fetch: (adventurerID) => new Contract(process.env.DUNGEON_THE_CELLAR_ADDR, RARITY_GOLD_ABI).balanceOf(adventurerID),
		parse: (item) => Number(item),
		dungeon: 'The Cellar',
		id: 0,
	},
	{
		name: 'TheForest_treasure',
		address: process.env.DUNGEON_THE_FOREST_ADDR,
		fetch: (adventurerID) => new Contract(process.env.DUNGEON_THE_FOREST_ADDR, THE_FOREST_ABI).getTreasuresBySummoner(adventurerID),
		dungeon: 'The Forest',
		parse: (item) => item,
		id: 1,
	},
	{
		name: 'Craft_weapons',
		address: process.env.RARITY_CRAFTING_ADDR,
		fetch: (adventurerID) => new Contract(process.env.DUNGEON_THE_FOREST_ADDR, THE_FOREST_ABI).getTreasuresBySummoner(adventurerID),
		parse: (item) => item,
		id: 2,
	}
];

export default items;
