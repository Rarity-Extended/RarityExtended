import	{LOOTS} from 'utils/codex/items/items';

const MEALS_RECIPES = [
	{
		name: 'Grilled Meat',
		address: process.env.MEAL_GRILLED_MEAT,
		img: `/items/meals/${process.env.MEAL_GRILLED_MEAT}.png`,
		cost: [
			{...LOOTS[process.env.RARITY_GOLD_ADDR], amount: 10},
			{...LOOTS[process.env.LOOT_MEAT_ADDR], amount: 10},
		]
	},
	{
		name: 'Mushroom Soup',
		address: process.env.MEAL_MUSHROOM_SOUP,
		img: `/items/meals/${process.env.MEAL_MUSHROOM_SOUP}.png`,
		cost: [
			{...LOOTS[process.env.RARITY_GOLD_ADDR], amount: 10},
			{...LOOTS[process.env.LOOT_MUSHROOM_ADDR], amount: 10},
		]
	},
	{
		name: 'Berries Pie',
		address: process.env.MEAL_BERRIES_PIE,
		img: `/items/meals/${process.env.MEAL_BERRIES_PIE}.png`,
		cost: [
			{...LOOTS[process.env.RARITY_GOLD_ADDR], amount: 10},
			{...LOOTS[process.env.LOOT_BERRIES_ADDR], amount: 10},
		]
	},
	{
		name: 'Mushroom and Meat Skewer',
		address: process.env.MEAL_MUSHROOM_MEAT_SKEWER,
		img: `/items/meals/${process.env.MEAL_MUSHROOM_MEAT_SKEWER}.png`,
		cost: [
			{...LOOTS[process.env.RARITY_GOLD_ADDR], amount: 10},
			{...LOOTS[process.env.LOOT_MEAT_ADDR], amount: 10},
			{...LOOTS[process.env.LOOT_MUSHROOM_ADDR], amount: 10},
		]
	},
	{
		name: 'Mushroom and Berries Mix',
		address: process.env.MEAL_MUSHROOM_BERRIES_MIX,
		img: `/items/meals/${process.env.MEAL_MUSHROOM_BERRIES_MIX}.png`,
		cost: [
			{...LOOTS[process.env.RARITY_GOLD_ADDR], amount: 10},
			{...LOOTS[process.env.LOOT_BERRIES_ADDR], amount: 10},
			{...LOOTS[process.env.LOOT_MUSHROOM_ADDR], amount: 10},
		]
	},
	{
		address: process.env.MEAL_BERRIES_WINE,
		name: 'Berries Wine',
		img: `/items/meals/${process.env.MEAL_BERRIES_WINE}.png`,
		cost: [
			{...LOOTS[process.env.RARITY_GOLD_ADDR], amount: 50},
			{...LOOTS[process.env.LOOT_BERRIES_ADDR], amount: 100},
		]
	}
];

export {MEALS_RECIPES};