import	{LOOTS} from 'utils/codex/items/items';

const WOOD_TIERS = [
	{
		name: 'Wood',
		address: process.env.RARITY_EXTENDED_WOOD_FARM_0,
		tier: 0,
		img: '/items/farming/wood-log.png',
		width: 152,
		height: 248,
		cost: [],
		unlocked: true
	},
	{
		name: 'Soft Wood',
		address: process.env.RARITY_EXTENDED_WOOD_FARM_1,
		tier: 1,
		img: '/items/farming/wood-log-soft.png',
		width: 152,
		height: 248,
		cost: [
			{...LOOTS[process.env.LOOT_WOOD_ADDR], amount: 12}]
	},
	{
		name: 'Fine Wood',
		address: process.env.RARITY_EXTENDED_WOOD_FARM_2,
		tier: 2,
		img: '/items/farming/wood-log-fine.png',
		width: 152,
		height: 248,
		cost: [
			{...LOOTS[process.env.LOOT_WOOD_ADDR], amount: 6},
			{...LOOTS[process.env.LOOT_WOOD_SOFT_ADDR], amount: 36}
		]
	},
	{
		name: 'Seasoned Wood',
		address: process.env.RARITY_EXTENDED_WOOD_FARM_3,
		tier: 3,
		img: '/items/farming/wood-log-seasoned.png',
		width: 152,
		height: 248,
		cost: [
			{...LOOTS[process.env.LOOT_WOOD_ADDR], amount: 6},
			{...LOOTS[process.env.LOOT_WOOD_SOFT_ADDR], amount: 18},
			{...LOOTS[process.env.LOOT_WOOD_FINE_ADDR], amount: 72},
		]
	},
	{
		name: 'Hard Wood',
		address: process.env.RARITY_EXTENDED_WOOD_FARM_4,
		tier: 4,
		img: '/items/farming/wood-log-hard.png',
		width: 294,
		height: 271,
		cost: [
			{...LOOTS[process.env.LOOT_WOOD_ADDR], amount: 6},
			{...LOOTS[process.env.LOOT_WOOD_SOFT_ADDR], amount: 18},
			{...LOOTS[process.env.LOOT_WOOD_FINE_ADDR], amount: 36},
			{...LOOTS[process.env.LOOT_WOOD_SEASONED_ADDR], amount: 120},
		]
	},
	{
		name: 'Darkwood',
		address: process.env.RARITY_EXTENDED_WOOD_FARM_5,
		tier: 5,
		img: '/items/farming/wood-log-dark.png',
		width: 241,
		height: 212,
		cost: [
			{...LOOTS[process.env.LOOT_WOOD_ADDR], amount: 6},
			{...LOOTS[process.env.LOOT_WOOD_SOFT_ADDR], amount: 18},
			{...LOOTS[process.env.LOOT_WOOD_FINE_ADDR], amount: 36},
			{...LOOTS[process.env.LOOT_WOOD_SEASONED_ADDR], amount: 60},
			{...LOOTS[process.env.LOOT_WOOD_HARD_ADDR], amount: 180},
		]
	},
];

const ORE_TIERS = [
	{
		name: 'Copper Ore',
		address: process.env.RARITY_EXTENDED_ORE_FARM_0,
		tier: 0,
		img: `/items/${process.env.LOOT_ORE_COPPER_ADDR}.png`,
		width: 256,
		height: 256,
		cost: [],
		unlocked: true
	},
	{
		name: 'Iron Ore',
		address: process.env.RARITY_EXTENDED_ORE_FARM_1,
		tier: 1,
		img: `/items/${process.env.LOOT_ORE_IRON_ADDR}.png`,
		width: 256,
		height: 256,
		cost: [
			{...LOOTS[process.env.LOOT_ORE_COPPER_ADDR], amount: 12}
		]
	},
	{
		name: 'Gold Ore',
		address: process.env.RARITY_EXTENDED_ORE_FARM_2,
		tier: 2,
		img: `/items/${process.env.LOOT_ORE_GOLD_ADDR}.png`,
		width: 256,
		height: 256,
		cost: [
			{...LOOTS[process.env.LOOT_ORE_COPPER_ADDR], amount: 6},
			{...LOOTS[process.env.LOOT_ORE_IRON_ADDR], amount: 36}
		]
	},
	{
		name: 'Platinum Ore',
		address: process.env.RARITY_EXTENDED_ORE_FARM_3,
		tier: 3,
		img: `/items/${process.env.LOOT_ORE_PLATINIUM_ADDR}.png`,
		width: 256,
		height: 256,
		cost: [
			{...LOOTS[process.env.LOOT_ORE_COPPER_ADDR], amount: 6},
			{...LOOTS[process.env.LOOT_ORE_IRON_ADDR], amount: 18},
			{...LOOTS[process.env.LOOT_ORE_GOLD_ADDR], amount: 72},
		]
	},
	{
		name: 'Cold Iron Ore',
		address: process.env.RARITY_MURDERTEETH_COLD_IRON_FARM,
		tier: 3,
		img: `/items/${process.env.LOOT_ORE_COLD_IRON}.png`,
		width: 256,
		height: 256,
		cost: [
			{...LOOTS[process.env.LOOT_ORE_COPPER_ADDR], amount: 6},
			{...LOOTS[process.env.LOOT_ORE_IRON_ADDR], amount: 18},
			{...LOOTS[process.env.LOOT_ORE_GOLD_ADDR], amount: 72},
		]
	},
	{
		name: 'Mithril Ore',
		address: process.env.RARITY_EXTENDED_ORE_FARM_4,
		tier: 4,
		img: `/items/${process.env.LOOT_ORE_MITHRIL_ADDR}.png`,
		width: 256,
		height: 256,
		cost: [
			{...LOOTS[process.env.LOOT_ORE_COPPER_ADDR], amount: 6},
			{...LOOTS[process.env.LOOT_ORE_IRON_ADDR], amount: 18},
			{...LOOTS[process.env.LOOT_ORE_GOLD_ADDR], amount: 36},
			{...LOOTS[process.env.LOOT_ORE_PLATINIUM_ADDR], amount: 120},
		]
	},
	{
		name: 'Orichalcum Ore',
		address: process.env.RARITY_EXTENDED_ORE_FARM_5,
		tier: 5,
		img: `/items/${process.env.LOOT_ORE_ORICHALCUM_ADDR}.png`,
		width: 256,
		height: 256,
		cost: [
			{...LOOTS[process.env.LOOT_ORE_COPPER_ADDR], amount: 6},
			{...LOOTS[process.env.LOOT_ORE_IRON_ADDR], amount: 18},
			{...LOOTS[process.env.LOOT_ORE_GOLD_ADDR], amount: 36},
			{...LOOTS[process.env.LOOT_ORE_PLATINIUM_ADDR], amount: 60},
			{...LOOTS[process.env.LOOT_ORE_MITHRIL_ADDR], amount: 180},
		]
	},
	{
		name: 'Adamantine Ore',
		address: process.env.RARITY_MURDERTEETH_ADAMANTINE_FARM,
		tier: 5,
		img: `/items/${process.env.LOOT_ORE_ADAMANTINE}.png`,
		width: 256,
		height: 256,
		cost: [
			{...LOOTS[process.env.LOOT_ORE_COPPER_ADDR], amount: 6},
			{...LOOTS[process.env.LOOT_ORE_IRON_ADDR], amount: 18},
			{...LOOTS[process.env.LOOT_ORE_GOLD_ADDR], amount: 36},
			{...LOOTS[process.env.LOOT_ORE_COLD_IRON], amount: 180},
			{...LOOTS[process.env.LOOT_ORE_MITHRIL_ADDR], amount: 90},
		]
	},
];

export {WOOD_TIERS, ORE_TIERS};