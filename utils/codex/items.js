/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				items.js
******************************************************************************/

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
		img: '/items/default_artifact.png',
		address: process.env.DUNGEON_THE_FOREST_ADDR,
		level: 'Relic',
		levelClassName: 'bg-items-relic',
		fetch: (adventurerID) => new Contract(process.env.DUNGEON_THE_FOREST_ADDR, THE_FOREST_ABI).getTreasuresBySummoner(adventurerID),
		dungeon: 'The Forest',
		parse: (item) => item,
		id: 1,
	}
];

export default items;
