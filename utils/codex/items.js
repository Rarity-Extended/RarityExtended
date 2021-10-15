/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				items.js
******************************************************************************/

import	{Contract}				from	'ethcall';
import	RARITY_GOLD_ABI			from	'utils/abi/rarityGold.abi';
import	THE_FOREST_ABI			from	'utils/abi/dungeonTheForest.abi';
import	LOOT_ERC20_ABI			from	'utils/abi/lootERC20.abi.js';

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
		name: 'Mushroom',
		description: 'A standard mushroom',
		img: '/items/loot_mushroom.png',
		address: process.env.LOOT_MUSHROOM_ADDR,
		level: 'Common',
		levelClassName: 'bg-items-common',
		fetch: (adventurerID) => new Contract(process.env.LOOT_MUSHROOM_ADDR, LOOT_ERC20_ABI).balanceOf(adventurerID),
		parse: (item) => Number(item),
		dungeon: 'Boars',
		id: 2,
	},
	{
		name: 'Wood',
		description: 'A standard piece of wood',
		img: '/items/loot_wood.png',
		address: process.env.LOOT_WOOD_ADDR,
		level: 'Common',
		levelClassName: 'bg-items-common',
		fetch: (adventurerID) => new Contract(process.env.LOOT_WOOD_ADDR, LOOT_ERC20_ABI).balanceOf(adventurerID),
		parse: (item) => Number(item),
		dungeon: 'Boars',
		id: 3,
	},
	{
		name: 'Berries',
		description: 'Some berries',
		img: '/items/loot_berries.png',
		address: process.env.LOOT_BERRIES_ADDR,
		level: 'Common',
		levelClassName: 'bg-items-common',
		fetch: (adventurerID) => new Contract(process.env.LOOT_BERRIES_ADDR, LOOT_ERC20_ABI).balanceOf(adventurerID),
		parse: (item) => Number(item),
		dungeon: 'Boars',
		id: 4,
	},
	{
		name: 'Leather',
		description: 'Some boar leather',
		img: '/items/loot_leather.png',
		address: process.env.LOOT_LEATHER_ADDR,
		level: 'Common',
		levelClassName: 'bg-items-common',
		fetch: (adventurerID) => new Contract(process.env.LOOT_LEATHER_ADDR, LOOT_ERC20_ABI).balanceOf(adventurerID),
		parse: (item) => Number(item),
		dungeon: 'Boars',
		id: 5,
	},
	{
		name: 'Meat',
		description: 'A fresh piece of meat',
		img: '/items/loot_meat.png',
		address: process.env.LOOT_MEAT_ADDR,
		level: 'Common',
		levelClassName: 'bg-items-common',
		fetch: (adventurerID) => new Contract(process.env.LOOT_MEAT_ADDR, LOOT_ERC20_ABI).balanceOf(adventurerID),
		parse: (item) => {
			console.warn(item);
			return Number(item);
		},
		dungeon: 'Boars',
		id: 6,
	},
	{
		name: 'Tusks',
		description: 'A tusk',
		img: '/items/loot_tusks.png',
		address: process.env.LOOT_TUSKS_ADDR,
		level: 'Common',
		levelClassName: 'bg-items-common',
		fetch: (adventurerID) => new Contract(process.env.LOOT_TUSKS_ADDR, LOOT_ERC20_ABI).balanceOf(adventurerID),
		parse: (item) => Number(item),
		dungeon: 'Boars',
		id: 7,
	},
];

export default items;
