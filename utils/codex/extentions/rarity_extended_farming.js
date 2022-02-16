const WOOD_TIERS = [
	{
		name: 'Wood',
		address: process.env.RARITY_EXTENDED_WOOD_FARM_0,
		tier: 0,
		src: '/items/farming/tree_1.png',
		width: 152,
		height: 248,
		cost: [],
		unlocked: true
	},
	{
		name: 'Soft Wood',
		address: process.env.RARITY_EXTENDED_WOOD_FARM_1,
		tier: 1,
		src: '/items/farming/tree_5.png',
		width: 152,
		height: 248,
		cost: [{
			name: 'Wood',
			address: process.env.RARITY_EXTENDED_WOOD_LOOT_0,
			src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png',
			amount: 12
		}]
	},
	{
		name: 'Fine Wood',
		address: process.env.RARITY_EXTENDED_WOOD_FARM_2,
		tier: 2,
		src: '/items/farming/tree_8.png',
		width: 152,
		height: 248,
		cost: [{
			name: 'Wood',
			address: process.env.RARITY_EXTENDED_WOOD_LOOT_0,
			src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png',
			amount: 6
		},
		{
			name: 'Soft Wood',
			address: process.env.RARITY_EXTENDED_WOOD_LOOT_1,
			src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png',
			amount: 36
		}
		]
	},
	{
		name: 'Seasoned Wood',
		address: process.env.RARITY_EXTENDED_WOOD_FARM_3,
		tier: 3,
		src: '/items/farming/tree_4.png',
		width: 152,
		height: 248,
		cost: [{
			name: 'Wood',
			address: process.env.RARITY_EXTENDED_WOOD_LOOT_0,
			src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png',
			amount: 6
		},
		{
			name: 'Soft Wood',
			address: process.env.RARITY_EXTENDED_WOOD_LOOT_1,
			src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png',
			amount: 18
		},
		{
			name: 'Fine Wood',
			address: process.env.RARITY_EXTENDED_WOOD_LOOT_2,
			src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png',
			amount: 72
		},
		]
	},
	{
		name: 'Hard Wood',
		address: process.env.RARITY_EXTENDED_WOOD_FARM_4,
		tier: 4,
		src: '/items/farming/tree_7.png',
		width: 152,
		height: 248,
		cost: [{
			name: 'Wood',
			address: process.env.RARITY_EXTENDED_WOOD_LOOT_0,
			src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png',
			amount: 6
		},
		{
			name: 'Soft Wood',
			address: process.env.RARITY_EXTENDED_WOOD_LOOT_1,
			src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png',
			amount: 18
		},
		{
			name: 'Fine Wood',
			address: process.env.RARITY_EXTENDED_WOOD_LOOT_2,
			src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png',
			amount: 36
		},
		{
			name: 'Seasoned Wood',
			address: process.env.RARITY_EXTENDED_WOOD_LOOT_3,
			src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png',
			amount: 120
		},
		]
	},
	{
		name: 'Elder Wood',
		address: process.env.RARITY_EXTENDED_WOOD_FARM_5,
		tier: 5,
		src: '/items/farming/tree_11.png',
		width: 294,
		height: 271,
		cost: [{
			name: 'Wood',
			address: process.env.RARITY_EXTENDED_WOOD_LOOT_0,
			src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png',
			amount: 6
		},
		{
			name: 'Soft Wood',
			address: process.env.RARITY_EXTENDED_WOOD_LOOT_1,
			src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png',
			amount: 18
		},
		{
			name: 'Fine Wood',
			address: process.env.RARITY_EXTENDED_WOOD_LOOT_2,
			src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png',
			amount: 36
		},
		{
			name: 'Seasoned Wood',
			address: process.env.RARITY_EXTENDED_WOOD_LOOT_3,
			src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png',
			amount: 60
		},
		{
			name: 'Hard Wood',
			address: process.env.RARITY_EXTENDED_WOOD_LOOT_4,
			src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png',
			amount: 180
		},
		]
	},
];

const ORE_TIERS = [
	{
		name: 'Copper Ore',
		address: process.env.RARITY_EXTENDED_ORE_FARM_0,
		tier: 0,
		src: '/items/farming/ore-copper.png',
		width: 256,
		height: 256,
		cost: [],
		unlocked: true
	},
	{
		name: 'Iron Ore',
		address: process.env.RARITY_EXTENDED_ORE_FARM_1,
		tier: 1,
		src: '/items/farming/ore-iron.png',
		width: 256,
		height: 256,
		cost: [{
			name: 'Copper Ore',
			address: process.env.RARITY_EXTENDED_ORE_LOOT_0,
			src: '/items/farming/ore-copper.png',
			amount: 12
		}]
	},
	{
		name: 'Gold Ore',
		address: process.env.RARITY_EXTENDED_ORE_FARM_2,
		tier: 2,
		src: '/items/farming/ore-gold.png',
		width: 256,
		height: 256,
		cost: [{
			name: 'Copper Ore',
			address: process.env.RARITY_EXTENDED_ORE_LOOT_0,
			src: '/items/farming/ore-copper.png',
			amount: 6
		},
		{
			name: 'Iron Ore',
			address: process.env.RARITY_EXTENDED_ORE_LOOT_1,
			src: '/items/farming/ore-iron.png',
			amount: 36
		}
		]
	},
	{
		name: 'Platinum Ore',
		address: process.env.RARITY_EXTENDED_ORE_FARM_3,
		tier: 3,
		src: '/items/farming/ore-platinium.png',
		width: 256,
		height: 256,
		cost: [{
			name: 'Copper Ore',
			address: process.env.RARITY_EXTENDED_ORE_LOOT_0,
			src: '/items/farming/ore-copper.png',
			amount: 6
		},
		{
			name: 'Iron Ore',
			address: process.env.RARITY_EXTENDED_ORE_LOOT_1,
			src: '/items/farming/ore-iron.png',
			amount: 18
		},
		{
			name: 'Gold Ore',
			address: process.env.RARITY_EXTENDED_ORE_LOOT_2,
			src: '/items/farming/ore-gold.png',
			amount: 72
		},
		]
	},
	{
		name: 'Mithril Ore',
		address: process.env.RARITY_EXTENDED_ORE_FARM_4,
		tier: 4,
		src: '/items/farming/ore-mirthril.png',
		width: 256,
		height: 256,
		cost: [{
			name: 'Copper Ore',
			address: process.env.RARITY_EXTENDED_ORE_LOOT_0,
			src: '/items/farming/ore-copper.png',
			amount: 6
		},
		{
			name: 'Iron Ore',
			address: process.env.RARITY_EXTENDED_ORE_LOOT_1,
			src: '/items/farming/ore-iron.png',
			amount: 18
		},
		{
			name: 'Gold Ore',
			address: process.env.RARITY_EXTENDED_ORE_LOOT_2,
			src: '/items/farming/ore-gold.png',
			amount: 36
		},
		{
			name: 'Platinum Ore',
			address: process.env.RARITY_EXTENDED_ORE_LOOT_3,
			src: '/items/farming/ore-platinium.png',
			amount: 120
		},
		]
	},
	{
		name: 'Orichalcum Ore',
		address: process.env.RARITY_EXTENDED_ORE_FARM_5,
		tier: 5,
		src: '/items/farming/ore-orichalcum.png',
		width: 256,
		height: 256,
		cost: [{
			name: 'Copper Ore',
			address: process.env.RARITY_EXTENDED_ORE_LOOT_0,
			src: '/items/farming/ore-copper.png',
			amount: 6
		},
		{
			name: 'Iron Ore',
			address: process.env.RARITY_EXTENDED_ORE_LOOT_1,
			src: '/items/farming/ore-iron.png',
			amount: 18
		},
		{
			name: 'Gold Ore',
			address: process.env.RARITY_EXTENDED_ORE_LOOT_2,
			src: '/items/farming/ore-gold.png',
			amount: 36
		},
		{
			name: 'Platinum Ore',
			address: process.env.RARITY_EXTENDED_ORE_LOOT_3,
			src: '/items/farming/ore-platinium.png',
			amount: 60
		},
		{
			name: 'Mithril Ore',
			address: process.env.RARITY_EXTENDED_ORE_LOOT_4,
			src: '/items/farming/ore-mirthril.png',
			amount: 180
		},
		]
	},
];

export {WOOD_TIERS, ORE_TIERS};