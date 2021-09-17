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
		img: '/items/rat_skin.png',
		address: '0x2A0F1cB17680161cF255348dDFDeE94ea8Ca196A',
		level: 'Common',
		levelClassName: 'bg-items-common',
		fetch: (adventurerID) => new Contract('0x2A0F1cB17680161cF255348dDFDeE94ea8Ca196A', RARITY_GOLD_ABI).balanceOf(adventurerID),
		parse: (item) => Number(item),
		dungeon: 'The Cellar',
		id: 0,
	},
	{
		name: 'TheForest_treasure',
		img: '/items/default_artifact.png',
		address: '0xC0829347f43fB20d17aA248223081F16ADe20B17',
		level: 'Relic',
		levelClassName: 'bg-items-relic',
		fetch: (adventurerID) => new Contract('0xC0829347f43fB20d17aA248223081F16ADe20B17', THE_FOREST_ABI).getTreasuresBySummoner(adventurerID),
		dungeon: 'The Forest',
		parse: (item) => item,
		id: 1,
	}
];

export default items;
