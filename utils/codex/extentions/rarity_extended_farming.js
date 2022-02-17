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
			{...LOOTS[process.env.RARITY_EXTENDED_WOOD_LOOT_0], amount: 12}]
	},
	{
		name: 'Fine Wood',
		address: process.env.RARITY_EXTENDED_WOOD_FARM_2,
		tier: 2,
		img: '/items/farming/wood-log-fine.png',
		width: 152,
		height: 248,
		cost: [
			{...LOOTS[process.env.RARITY_EXTENDED_WOOD_LOOT_0], amount: 6},
			{...LOOTS[process.env.RARITY_EXTENDED_WOOD_LOOT_1], amount: 36}
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
			{...LOOTS[process.env.RARITY_EXTENDED_WOOD_LOOT_0], amount: 6},
			{...LOOTS[process.env.RARITY_EXTENDED_WOOD_LOOT_1], amount: 18},
			{...LOOTS[process.env.RARITY_EXTENDED_WOOD_LOOT_2], amount: 72},
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
			{...LOOTS[process.env.RARITY_EXTENDED_WOOD_LOOT_0], amount: 6},
			{...LOOTS[process.env.RARITY_EXTENDED_WOOD_LOOT_1], amount: 18},
			{...LOOTS[process.env.RARITY_EXTENDED_WOOD_LOOT_2], amount: 36},
			{...LOOTS[process.env.RARITY_EXTENDED_WOOD_LOOT_3], amount: 120},
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
			{...LOOTS[process.env.RARITY_EXTENDED_WOOD_LOOT_0], amount: 6},
			{...LOOTS[process.env.RARITY_EXTENDED_WOOD_LOOT_1], amount: 18},
			{...LOOTS[process.env.RARITY_EXTENDED_WOOD_LOOT_2], amount: 36},
			{...LOOTS[process.env.RARITY_EXTENDED_WOOD_LOOT_3], amount: 60},
			{...LOOTS[process.env.RARITY_EXTENDED_WOOD_LOOT_4], amount: 180},
		]
	},
];

const ORE_TIERS = [
	{
		name: 'Copper Ore',
		address: process.env.RARITY_EXTENDED_ORE_FARM_0,
		tier: 0,
		img: '/items/farming/ore-copper.png',
		width: 256,
		height: 256,
		cost: [],
		unlocked: true
	},
	{
		name: 'Iron Ore',
		address: process.env.RARITY_EXTENDED_ORE_FARM_1,
		tier: 1,
		img: '/items/farming/ore-iron.png',
		width: 256,
		height: 256,
		cost: [
			{...LOOTS[process.env.RARITY_EXTENDED_ORE_LOOT_0], amount: 12}
		]
	},
	{
		name: 'Gold Ore',
		address: process.env.RARITY_EXTENDED_ORE_FARM_2,
		tier: 2,
		img: '/items/farming/ore-gold.png',
		width: 256,
		height: 256,
		cost: [
			{...LOOTS[process.env.RARITY_EXTENDED_ORE_LOOT_0], amount: 6},
			{...LOOTS[process.env.RARITY_EXTENDED_ORE_LOOT_1], amount: 36}
		]
	},
	{
		name: 'Platinum Ore',
		address: process.env.RARITY_EXTENDED_ORE_FARM_3,
		tier: 3,
		img: '/items/farming/ore-platinium.png',
		width: 256,
		height: 256,
		cost: [
			{...LOOTS[process.env.RARITY_EXTENDED_ORE_LOOT_0], amount: 6},
			{...LOOTS[process.env.RARITY_EXTENDED_ORE_LOOT_1], amount: 18},
			{...LOOTS[process.env.RARITY_EXTENDED_ORE_LOOT_2], amount: 72},
		]
	},
	{
		name: 'Mithril Ore',
		address: process.env.RARITY_EXTENDED_ORE_FARM_4,
		tier: 4,
		img: '/items/farming/ore-mirthril.png',
		width: 256,
		height: 256,
		cost: [
			{...LOOTS[process.env.RARITY_EXTENDED_ORE_LOOT_0], amount: 6},
			{...LOOTS[process.env.RARITY_EXTENDED_ORE_LOOT_1], amount: 18},
			{...LOOTS[process.env.RARITY_EXTENDED_ORE_LOOT_2], amount: 36},
			{...LOOTS[process.env.RARITY_EXTENDED_ORE_LOOT_3], amount: 120},
		]
	},
	{
		name: 'Adamantine Ore',
		address: process.env.RARITY_EXTENDED_ORE_FARM_5,
		tier: 5,
		img: '/items/farming/ore-adamantine.png',
		width: 256,
		height: 256,
		cost: [
			{...LOOTS[process.env.RARITY_EXTENDED_ORE_LOOT_0], amount: 6},
			{...LOOTS[process.env.RARITY_EXTENDED_ORE_LOOT_1], amount: 18},
			{...LOOTS[process.env.RARITY_EXTENDED_ORE_LOOT_2], amount: 36},
			{...LOOTS[process.env.RARITY_EXTENDED_ORE_LOOT_3], amount: 60},
			{...LOOTS[process.env.RARITY_EXTENDED_ORE_LOOT_4], amount: 180},
		]
	},
];

export {WOOD_TIERS, ORE_TIERS};