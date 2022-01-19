/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				items.js
******************************************************************************/

import	{ethers}				from	'ethers';
import	{Contract}				from	'ethcall';
import	THE_FOREST_LOOT			from	'utils/codex/items/items_dungeon_theForest.json';
import	OPENMIC_LOOT			from	'utils/codex/items/items_dungeon_openmic.json';
// import	MANIFEST_GOODS			from	'utils/codex/items/items_manifest_goods.json';
// import	MANIFEST_ARMORS			from	'utils/codex/items/items_manifest_armors.json';
// import	MANIFEST_WEAPONS		from	'utils/codex/items/items_manifest_weapons.json';

const	items = [
	{
		name: 'Rat Skin',
		description: 'This skin looks like the best possible material for an armor. No?',
		img: `/items/${process.env.DUNGEON_THE_CELLAR_ADDR}.png`,
		address: process.env.DUNGEON_THE_CELLAR_ADDR,
		type: 'ERC20',
		level: 'Common',
		levelClassName: 'bg-items-common',
		fetch: (adventurerID) => new Contract(process.env.DUNGEON_THE_CELLAR_ADDR, process.env.DUNGEON_THE_CELLAR_ABI).balanceOf(adventurerID),
		parse: (item) => Number(item),
		dungeon: 'The Cellar',
		id: 0,
	},
	{
		name: 'Mushroom',
		description: 'A standard mushroom',
		img: `/items/${process.env.LOOT_MUSHROOM_ADDR}.png`,
		address: process.env.LOOT_MUSHROOM_ADDR,
		type: 'ERC20',
		level: 'Common',
		levelClassName: 'bg-items-common',
		fetch: (adventurerID) => new Contract(process.env.LOOT_MUSHROOM_ADDR, process.env.LOOT_ERC20_ABI).balanceOf(adventurerID),
		parse: (item) => Number(item),
		dungeon: 'Boars',
		id: 2,
	},
	{
		name: 'Wood',
		description: 'A standard piece of wood',
		img: `/items/${process.env.LOOT_WOOD_ADDR}.png`,
		address: process.env.LOOT_WOOD_ADDR,
		type: 'ERC20',
		level: 'Common',
		levelClassName: 'bg-items-common',
		fetch: (adventurerID) => new Contract(process.env.LOOT_WOOD_ADDR, process.env.LOOT_ERC20_ABI).balanceOf(adventurerID),
		parse: (item) => Number(item),
		dungeon: 'Boars',
		id: 3,
	},
	{
		name: 'Berries',
		description: 'Some berries',
		img: `/items/${process.env.LOOT_BERRIES_ADDR}.png`,
		address: process.env.LOOT_BERRIES_ADDR,
		type: 'ERC20',
		level: 'Common',
		levelClassName: 'bg-items-common',
		fetch: (adventurerID) => new Contract(process.env.LOOT_BERRIES_ADDR, process.env.LOOT_ERC20_ABI).balanceOf(adventurerID),
		parse: (item) => Number(item),
		dungeon: 'Boars',
		id: 4,
	},
	{
		name: 'Leather',
		description: 'Some boar leather',
		img: `/items/${process.env.LOOT_LEATHER_ADDR}.png`,
		address: process.env.LOOT_LEATHER_ADDR,
		type: 'ERC20',
		level: 'Common',
		levelClassName: 'bg-items-common',
		fetch: (adventurerID) => new Contract(process.env.LOOT_LEATHER_ADDR, process.env.LOOT_ERC20_ABI).balanceOf(adventurerID),
		parse: (item) => Number(item),
		dungeon: 'Boars',
		id: 5,
	},
	{
		name: 'Meat',
		description: 'A fresh piece of meat',
		img: `/items/${process.env.LOOT_MEAT_ADDR}.png`,
		address: process.env.LOOT_MEAT_ADDR,
		type: 'ERC20',
		level: 'Common',
		levelClassName: 'bg-items-common',
		fetch: (adventurerID) => new Contract(process.env.LOOT_MEAT_ADDR, process.env.LOOT_ERC20_ABI).balanceOf(adventurerID),
		parse: (item) => Number(item),
		dungeon: 'Boars',
		id: 6,
	},
	{
		name: 'Tusks',
		description: 'A tusk',
		img: `/items/${process.env.LOOT_TUSKS_ADDR}.png`,
		address: process.env.LOOT_TUSKS_ADDR,
		type: 'ERC20',
		level: 'Common',
		levelClassName: 'bg-items-common',
		fetch: (adventurerID) => new Contract(process.env.LOOT_TUSKS_ADDR, process.env.LOOT_ERC20_ABI).balanceOf(adventurerID),
		parse: (item) => Number(item),
		dungeon: 'Boars',
		id: 7,
	},
	{
		name: 'Candies',
		description: 'Some candies you can use to buy prices during the Spooky Festival',
		img: `/items/${process.env.LOOT_CANDIES_ADDR}.png`,
		address: process.env.LOOT_CANDIES_ADDR,
		type: 'ERC20',
		level: 'Uncommon',
		levelClassName: 'bg-items-uncommon',
		fetch: (adventurerID) => new Contract(process.env.LOOT_CANDIES_ADDR, process.env.LOOT_ERC20_ABI).balanceOf(adventurerID),
		parse: (item) => Number(item),
		dungeon: 'SpookyFestival',
		id: 9,
	},
	{
		name: 'TheForest_treasure',
		address: process.env.DUNGEON_THE_FOREST_ADDR,
		type: 'ERC721',
		fetch: (adventurerID) => new Contract(process.env.DUNGEON_THE_FOREST_ADDR, process.env.DUNGEON_THE_FOREST_ABI).getTreasuresBySummoner(adventurerID),
		dungeon: 'The Forest',
		parse: (item) => item,
		format: (item) => {
			const	result = ({
				tokenID: ethers.BigNumber.from(item.treasureId).toNumber(),
				name: item.itemName,
				img: THE_FOREST_LOOT[item.itemName].img,
				owner: item.summonerId,
				ownerType: 'Adventurer',
				level: ethers.BigNumber.from(item.level).toNumber(),
				magic: ethers.BigNumber.from(item.magic).toNumber(),
			});
			return result;
		},
		isSpecific: true,
		id: 1,
	},
	{
		name: 'OpenMic_prizes',
		address: process.env.DUNGEON_OPEN_MIC_V2_ADDR,
		type: 'ERC721',
		fetch: (adventurerID) => new Contract(process.env.DUNGEON_OPEN_MIC_V2_ADDR, process.env.DUNGEON_OPEN_MIC_V2_ABI).getPrizes(adventurerID),
		dungeon: 'OpenMic',
		parse: (item) => item,
		format: (item) => ({
			tokenID: ethers.BigNumber.from(item.tokenId).toNumber(),
			name: item.name,
			img: OPENMIC_LOOT[item.name].img,
			owner: undefined,
			ownerType: 'Adventurer',
			rare: item.rare,
			index: ethers.BigNumber.from(item.index).toNumber(),
		}),
		id: 8,
	}
];

export default items;
