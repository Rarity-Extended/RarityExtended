/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				items.js
******************************************************************************/

import	{Contract}				from	'ethcall';

const	ITEMS_ERC20 = [
	{
		name: 'Rat Skin',
		description: 'This skin looks like the best possible material for an armor. No?',
		img: `/items/${process.env.DUNGEON_THE_CELLAR_ADDR}.png`,
		address: process.env.DUNGEON_THE_CELLAR_ADDR,
		type: 'enumerable',
		fetch: (adventurerID) => new Contract(process.env.DUNGEON_THE_CELLAR_ADDR, process.env.DUNGEON_THE_CELLAR_ABI).balanceOf(adventurerID),
		dungeon: 'The Cellar',
		id: 0,
	},
	{
		name: 'Mushroom',
		description: 'A standard mushroom',
		img: `/items/${process.env.LOOT_MUSHROOM_ADDR}.png`,
		address: process.env.LOOT_MUSHROOM_ADDR,
		type: 'enumerable',
		fetch: (adventurerID) => new Contract(process.env.LOOT_MUSHROOM_ADDR, process.env.LOOT_ERC20_ABI).balanceOf(adventurerID),
		dungeon: 'Boars',
		id: 2,
	},
	{
		name: 'Wood',
		description: 'A standard piece of wood',
		img: `/items/${process.env.LOOT_WOOD_ADDR}.png`,
		address: process.env.LOOT_WOOD_ADDR,
		type: 'enumerable',
		fetch: (adventurerID) => new Contract(process.env.LOOT_WOOD_ADDR, process.env.LOOT_ERC20_ABI).balanceOf(adventurerID),
		dungeon: 'Boars',
		id: 3,
	},
	{
		name: 'Berries',
		description: 'Some berries',
		img: `/items/${process.env.LOOT_BERRIES_ADDR}.png`,
		address: process.env.LOOT_BERRIES_ADDR,
		type: 'enumerable',
		fetch: (adventurerID) => new Contract(process.env.LOOT_BERRIES_ADDR, process.env.LOOT_ERC20_ABI).balanceOf(adventurerID),
		dungeon: 'Boars',
		id: 4,
	},
	{
		name: 'Leather',
		description: 'Some boar leather',
		img: `/items/${process.env.LOOT_LEATHER_ADDR}.png`,
		address: process.env.LOOT_LEATHER_ADDR,
		type: 'enumerable',
		fetch: (adventurerID) => new Contract(process.env.LOOT_LEATHER_ADDR, process.env.LOOT_ERC20_ABI).balanceOf(adventurerID),
		dungeon: 'Boars',
		id: 5,
	},
	{
		name: 'Meat',
		description: 'A fresh piece of meat',
		img: `/items/${process.env.LOOT_MEAT_ADDR}.png`,
		address: process.env.LOOT_MEAT_ADDR,
		type: 'enumerable',
		fetch: (adventurerID) => new Contract(process.env.LOOT_MEAT_ADDR, process.env.LOOT_ERC20_ABI).balanceOf(adventurerID),
		dungeon: 'Boars',
		id: 6,
	},
	{
		name: 'Tusks',
		description: 'A tusk',
		img: `/items/${process.env.LOOT_TUSKS_ADDR}.png`,
		address: process.env.LOOT_TUSKS_ADDR,
		type: 'enumerable',
		fetch: (adventurerID) => new Contract(process.env.LOOT_TUSKS_ADDR, process.env.LOOT_ERC20_ABI).balanceOf(adventurerID),
		dungeon: 'Boars',
		id: 7,
	},
	{
		name: 'Candies',
		description: 'Some candies you can use to buy prices during the Spooky Festival',
		img: `/items/${process.env.LOOT_CANDIES_ADDR}.png`,
		address: process.env.LOOT_CANDIES_ADDR,
		type: 'enumerable',
		fetch: (adventurerID) => new Contract(process.env.LOOT_CANDIES_ADDR, process.env.LOOT_ERC20_ABI).balanceOf(adventurerID),
		dungeon: 'SpookyFestival',
		id: 9,
	},
];

const	ITEMS_MEALS = [
	{
		name: 'Grilled Meat',
		description: 'Reduce the time between two adventures by 1 hours.',
		img: '/items/meals/0x97e8f1061224cb532F808b074786C76e977BA6EE.png',
		address: '0x97e8f1061224cb532F808b074786C76e977BA6EE',
		type: 'enumerable',
		cost: [
			[process.env.RARITY_GOLD_ADDR, 10],
			[process.env.LOOT_MEAT_ADDR, 10]
		]
	},
	{
		name: 'Mushroom Soup',
		description: 'Reduce the time between two adventures by 1 hours.',
		img: '/items/meals/0x2e3e1C1F49A288ebF88be66a3ED3539B5971f25D.png',
		address: '0x2e3e1C1F49A288ebF88be66a3ED3539B5971f25D',
		type: 'enumerable',
		cost: [
			[process.env.RARITY_GOLD_ADDR, 10],
			[process.env.LOOT_MUSHROOM_ADDR, 10]
		]
	},
	{
		name: 'Berries Pie',
		description: 'Reduce the time between two adventures by 1 hours.',
		img: '/items/meals/0x57e4cD55289da26aa7cb607c00c5dDcd0f7980a2.png',
		address: '0x57e4cD55289da26aa7cb607c00c5dDcd0f7980a2',
		type: 'enumerable',
		cost: [
			[process.env.RARITY_GOLD_ADDR, 10],
			[process.env.LOOT_BERRIES_ADDR, 10]
		]
	},
	{
		name: 'Mushroom and Meat Skewer',
		description: 'Reduce the time between two adventures by 2 hours.',
		img: '/items/meals/0x65567a2fBC14B4aBCd414bb6902384745d4353f6.png',
		address: '0x65567a2fBC14B4aBCd414bb6902384745d4353f6',
		type: 'enumerable',
		cost: [
			[process.env.RARITY_GOLD_ADDR, 10],
			[process.env.LOOT_MEAT_ADDR, 10],
			[process.env.LOOT_MUSHROOM_ADDR, 10]
		]
	},
	{
		name: 'Mushroom and Berries Mix',
		description: 'Reduce the time between two adventures by 1 hours.',
		img: '/items/meals/0xF06FfE67CB96641eEC55eA19126BD8F0107Ff0Ad.png',
		address: '0xF06FfE67CB96641eEC55eA19126BD8F0107Ff0Ad',
		type: 'enumerable',
		cost: [
			[process.env.RARITY_GOLD_ADDR, 10],
			[process.env.LOOT_BERRIES_ADDR, 10],
			[process.env.LOOT_MUSHROOM_ADDR, 10]
		]
	},
	{
		name: 'Berries Wine',
		description: 'A tasty wine made from berries. Useful to get drunk.',
		img: '/items/meals/0xA0e9159EfC4407c4465bbCDF0e7538D6869d81a3.png',
		address: '0xA0e9159EfC4407c4465bbCDF0e7538D6869d81a3',
		type: 'enumerable',
		cost: [
			[process.env.RARITY_GOLD_ADDR, 50],
			[process.env.LOOT_BERRIES_ADDR, 100]
		]
	},
];

const	ITEMS_THE_FOREST = [
	{
		name: 'Dead King crown',
		description: 'Once was a king, his name was lost but not his crown.',
		img: '/items/the-forest/dead_king_crown.png',
		address: '0x0000000000000000000000000000000000000001',
	},
	{
		name: 'Black gauntlet',
		description: 'A mysterious gauntlet, with mysterious power.',
		img: '/items/the-forest/black_gauntlet.png',
		address: '0x0000000000000000000000000000000000000002',
	},
	{
		name: 'Haunted ring',
		description: 'Tells the story, that belonged to a witch...',
		img: '/items/the-forest/haunted_ring.png',
		address: '0x0000000000000000000000000000000000000003',
	},
	{
		name: 'Ancient book',
		description: 'The forest has a lot of stories, not as many as this book.',
		img: '/items/the-forest/ancient_book.png',
		address: '0x0000000000000000000000000000000000000004',
	},
	{
		name: 'Enchanted book',
		description: "I wouldn't take it if I was you ...",
		img: '/items/the-forest/enchanted_book.png',
		address: '0x0000000000000000000000000000000000000005',
	},
	{
		name: 'Gold ring',
		description: "Crafted by nobody, 'belongs to whoever finds it' is engraved on the ring...",
		img: '/items/the-forest/gold_ring.png',
		address: '0x0000000000000000000000000000000000000006',
	},
	{
		name: 'Treasure map',
		description: 'Where does it lead? to the rarest destiny.',
		img: '/items/the-forest/treasure_map.png',
		address: '0x0000000000000000000000000000000000000007',
	},
	{
		name: 'Spell book',
		description: 'Beware! can cast a spell on you.',
		img: '/items/the-forest/spell_book.png',
		address: '0x0000000000000000000000000000000000000008',
	},
	{
		name: 'Magic necklace',
		description: 'An unprecedented magic, anyway it looks cool.',
		img: '/items/the-forest/magic_necklace.png',
		address: '0x0000000000000000000000000000000000000009',
	},
	{
		name: 'Mechanical hand',
		description: 'Solid and rigid, but precise and delicate.',
		img: '/items/the-forest/mechanical_hand.png',
		address: '0x0000000000000000000000000000000000000010',
	},
	{
		name: 'War helmet',
		description: 'Survived the battle, not as its former carrier.',
		img: '/items/the-forest/war_helmet.png',
		address: '0x0000000000000000000000000000000000000011',
	},
	{
		name: 'Fire boots',
		description: 'The God of Fire created these. Only a cold soul could carry them.',
		img: '/items/the-forest/fire_boots.png',
		address: '0x0000000000000000000000000000000000000012',
	},
	{
		name: 'War trophy',
		description: 'A war where too much was lost.',
		img: '/items/the-forest/war_trophy.png',
		address: '0x0000000000000000000000000000000000000013',
	},
	{
		name: 'Elf skull',
		description: 'The anatomy of an elf, the trophy of his assassin.',
		img: '/items/the-forest/elf_skull.png',
		address: '0x0000000000000000000000000000000000000014',
	},
	{
		name: 'Unknown ring',
		description: 'A mystery created in the hardest metal.',
		img: '/items/the-forest/unknown_ring.png',
		address: '0x0000000000000000000000000000000000000015',
	},
	{
		name: 'Silver ring',
		description: 'Bright at first, dark in oblivion.',
		img: '/items/the-forest/silver_ring.png',
		address: '0x0000000000000000000000000000000000000016',
	},
	{
		name: 'War book',
		description: 'How to start a war, how to bury your soldier friends...',
		img: '/items/the-forest/war_book.png',
		address: '0x0000000000000000000000000000000000000017',
	},
	{
		name: 'Gold pot',
		description: 'The temptation to put coin inside is hard to resist',
		img: '/items/the-forest/gold_pot.png',
		address: '0x0000000000000000000000000000000000000018',
	},
	{
		name: 'Demon head',
		description: 'Shadowy figure, now headless.',
		img: '/items/the-forest/demon_head.png',
		address: '0x0000000000000000000000000000000000000019',
	},
	{
		name: 'Unknown key',
		description: "Whatever this may open, it's a complete mystery.",
		img: '/items/the-forest/unknown_key.png',
		address: '0x0000000000000000000000000000000000000020',
	},
	{
		name: 'Cursed book',
		description: 'An ancient enchantment. Whoever reads this will be forgotten forever.',
		img: '/items/the-forest/cursed_book.png',
		address: '0x0000000000000000000000000000000000000021',
	},
	{
		name: 'Giant plant seed',
		description: 'Little like a bug, tall like the sky.',
		img: '/items/the-forest/giant_plant_seed.png',
		address: '0x0000000000000000000000000000000000000022',
	},
	{
		name: 'Old farmer sickle',
		description: 'Only the old ones remember this sickle.',
		img: '/items/the-forest/old_farmer_sickle.png',
		address: '0x0000000000000000000000000000000000000023',
	},
	{
		name: 'Enchanted useless tool',
		description: 'Very promising, but useless.',
		img: '/items/the-forest/enchanted_useless_tool.png',
		address: '0x0000000000000000000000000000000000000024',
	},
	{
		name: 'Dragon egg',
		description: 'The perfect pet.',
		img: '/items/the-forest/dragon_egg.png',
		address: '0x0000000000000000000000000000000000000025',
	},
	{
		name: 'Bear claw',
		description: 'Now, you can claim you survived a Bear.',
		img: '/items/the-forest/bear_claw.png',
		address: '0x0000000000000000000000000000000000000026',
	},
	{
		name: 'Silver sword',
		description: 'Even the bravest enemy is afraid to reflect on this sword.',
		img: '/items/the-forest/silver_sword.png',
		address: '0x0000000000000000000000000000000000000027',
	},
	{
		name: 'Rare ring',
		description: 'Very rare, hope it has a good price in the market.',
		img: '/items/the-forest/rare_ring.png',
		address: '0x0000000000000000000000000000000000000028',
	},
	{
		name: 'Glove with diamonds',
		description: 'Glamor is just one of its characteristics.',
		img: '/items/the-forest/glove_with_diamonds.png',
		address: '0x0000000000000000000000000000000000000029',
	},
	{
		name: 'Haunted cloak',
		description: 'It has a life of its own, it protects those who use it.',
		img: '/items/the-forest/haunted_cloak.png',
		address: '0x0000000000000000000000000000000000000030',
	},
	{
		name: 'Dead hero cape',
		description: 'We honor his former owner, a hero with no name.',
		img: '/items/the-forest/dead_hero_cape.png',
		address: '0x0000000000000000000000000000000000000031',
	},
	{
		name: 'Enchanted talisman',
		description: 'When it was not enchanted it gave luck, now it only gives death.',
		img: '/items/the-forest/enchanted_talisman.png',
		address: '0x0000000000000000000000000000000000000032',
	},
	{
		name: 'Warrior watch',
		description: 'A warrior never has enough time.',
		img: '/items/the-forest/warrior_watch.png',
		address: '0x0000000000000000000000000000000000000033',
	},
	{
		name: 'Metal horse saddle',
		description: 'Now you only need a horse.',
		img: '/items/the-forest/metal_horse_saddle.png',
		address: '0x0000000000000000000000000000000000000034',
	},
	{
		name: 'Witch book',
		description: 'Shady secrets, nobody should see it.',
		img: '/items/the-forest/witch_book.png',
		address: '0x0000000000000000000000000000000000000035',
	},
	{
		name: 'Unknown animal eye',
		description: 'From a beast, or a pet, a monster or a bunny.',
		img: '/items/the-forest/unknown_animal_eye.png',
		address: '0x0000000000000000000000000000000000000036',
	},
	{
		name: 'Slain warrior armor',
		description: 'I hope you find it useful.',
		img: '/items/the-forest/slain_warrior_armor.png',
		address: '0x0000000000000000000000000000000000000037',
	},
	{
		name: 'Witcher book',
		description: 'Magic, spells, enchantments. Everything in your hand.',
		img: '/items/the-forest/witcher_book.png',
		address: '0x0000000000000000000000000000000000000038',
	},
	{
		name: 'Cursed talisman',
		description: 'When it was not enchanted it gave lucky, now it only gives death.',
		img: '/items/the-forest/cursed_talisman.png',
		address: '0x0000000000000000000000000000000000000039',
	},
	{
		name: 'Antique ring',
		description: 'An ancient power, a present from the gods, the future of its bearer.',
		img: '/items/the-forest/antique_ring.png',
		address: '0x0000000000000000000000000000000000000040',
	},
	{
		name: 'Ancient Prince Sword',
		description: "Hope the prince doesn't claim his sword.",
		img: '/items/the-forest/ancient_prince_andre_s_sword.png',
		address: '0x0000000000000000000000000000000000000041',
	},
	{
		name: "King's son sword",
		description: 'It will be yours when you grow',
		img: '/items/the-forest/king_s_son_sword.png',
		address: '0x0000000000000000000000000000000000000042',
	},
	{
		name: 'Old damaged coin',
		description: 'An old coin, nobody uses it... right?',
		img: '/items/the-forest/old_damaged_coin.png',
		address: '0x0000000000000000000000000000000000000043',
	},
	{
		name: 'Thunder hammer',
		description: 'Forged in the storm, lightning in your hand.',
		img: '/items/the-forest/thunder_hammer.png',
		address: '0x0000000000000000000000000000000000000044',
	},
	{
		name: 'Time crystal',
		description: 'If the former owner of this crystal could go back in time, he would surely avoid losing it.',
		img: '/items/the-forest/time_crystal.png',
		address: '0x0000000000000000000000000000000000000045',
	},
	{
		name: 'Skull fragment',
		description: 'A puzzle to solve. What did the former owner of this head think?',
		img: '/items/the-forest/skull_fragment.png',
		address: '0x0000000000000000000000000000000000000046',
	},
	{
		name: 'Hawk eye',
		description: 'It gives you precision. In your decisions and in your shots.',
		img: '/items/the-forest/hawk_eye.png',
		address: '0x0000000000000000000000000000000000000047',
	},
	{
		name: 'Meteorite fragment',
		description: 'Unknown alien power.',
		img: '/items/the-forest/meteorite_fragment.png',
		address: '0x0000000000000000000000000000000000000048',
	},
	{
		name: 'Mutant fisheye',
		description: 'The sea is very strange...',
		img: '/items/the-forest/mutant_fisheye.png',
		address: '0x0000000000000000000000000000000000000049',
	},
	{
		name: 'Wolf necklace',
		description: 'For a wolf or a human, or both at the same time.',
		img: '/items/the-forest/wolf_necklace.png',
		address: '0x0000000000000000000000000000000000000050',
	},
	{
		name: 'Shadowy rabbit paw',
		description: 'A one-legged rabbit is still a rabbit.',
		img: '/items/the-forest/shadowy_rabbit_paw.png',
		address: '0x0000000000000000000000000000000000000051',
	},
	{
		name: 'Paladin eye',
		description: 'Do not lose sight of it, it could be useful for its owner.',
		img: '/items/the-forest/paladin_eye.png',
		address: '0x0000000000000000000000000000000000000052',
	},
	{
		name: 'Paladin heart',
		description: 'Filled with Valor, glory, but most important, Alturisum',
		img: '/items/the-forest/paladin_heart.png',
		address: '0x0000000000000000000000000000000000000053',
	},
	{
		name: 'Red Tanned Gloves',
		description: 'Were these tanned with blood? No one can know.',
		img: '/items/the-forest/red_tanned_gloves.png',
		address: '0x0000000000000000000000000000000000000054',
	},
	{
		name: 'Cat Claw glove',
		description: 'Which feline was the owner of such claws? Matters not. You may wear don them now.',
		img: '/items/the-forest/cat_clow_glove.png',
		address: '0x0000000000000000000000000000000000000055',
	},
	{
		name: 'Foreign Armor',
		description: 'Made of foreign metal, by foreign hands.',
		img: '/items/the-forest/foreign_armor.png',
		address: '0x0000000000000000000000000000000000000056',
	}
];

const	ITEMS_OPENMIC = [
	{
		name: 'Hawk signet ring',
		description: 'A common signet ring',
		img: '/items/openmic/hawk.png',
		address: '0x1000000000000000000000000000000000000001',
	},
	{
		name: 'Badger signet ring',
		description: 'A common signet ring',
		img: '/items/openmic/badger.png',
		address: '0x1000000000000000000000000000000000000002',
	},
	{
		name: 'Song Bird signet ring',
		description: 'A common signet ring',
		img: '/items/openmic/bird.png',
		address: '0x1000000000000000000000000000000000000003',
	},
	{
		name: 'Skunk signet ring',
		description: 'A common signet ring',
		img: '/items/openmic/skunk.png',
		address: '0x1000000000000000000000000000000000000004',
	},
	{
		name: 'Cat signet ring',
		description: 'A common signet ring',
		img: '/items/openmic/cat.png',
		address: '0x1000000000000000000000000000000000000005',
	},
	{
		name: 'Dog signet ring',
		description: 'A common signet ring',
		img: '/items/openmic/dog.png',
		address: '0x1000000000000000000000000000000000000006',
	},
	{
		name: 'Fish signet ring',
		description: 'A common signet ring',
		img: '/items/openmic/fish.png',
		address: '0x1000000000000000000000000000000000000007',
	},
	{
		name: 'Shark signet ring',
		description: 'A common signet ring',
		img: '/items/openmic/shark.png',
		address: '0x1000000000000000000000000000000000000008',
	},
	{
		name: 'Lion signet ring',
		description: 'A common signet ring',
		img: '/items/openmic/lion.png',
		address: '0x1000000000000000000000000000000000000009',
	},
	{
		name: 'Tiger signet ring',
		description: 'A common signet ring',
		img: '/items/openmic/tiger.png',
		address: '0x1000000000000000000000000000000000000010',
	},
	{
		name: 'Snake signet ring',
		description: 'A common signet ring',
		img: '/items/openmic/snake.png',
		address: '0x1000000000000000000000000000000000000011',
	},
	{
		name: 'Crate of Goblin Wine',
		description: 'A crate of the liquid foulness',
		img: '/items/openmic/wine.png',
		address: '0x1000000000000000000000000000000000000012',
	},
	{
		name: 'Expired rations',
		description: 'This was a tidy meal once',
		img: '/items/openmic/expired-rations.png',
		address: '0x1000000000000000000000000000000000000013',
	},
	{
		name: 'Mysterious black stone',
		description: 'This stone seems lost...',
		img: '/items/openmic/blackstone.png',
		address: '0x1000000000000000000000000000000000000014',
	},
	{
		name: 'Secret mission pass from Prince Andre',
		description: 'This envelope feels hot',
		img: '/items/openmic/missionpass-prince.png',
		address: '0x1000000000000000000000000000000000000015',
	},
	{
		name: 'Secret mission pass from The Austrian',
		description: 'This envelope feels cold',
		img: '/items/openmic/missionpass-austrian.png',
		address: '0x1000000000000000000000000000000000000016',
	},
	{
		name: 'Secret mission pass from Murderteeth',
		description: 'This envelope feels just right',
		img: '/items/openmic/missionpass-murderteeth.png',
		address: '0x1000000000000000000000000000000000000017',
	}
];

export {ITEMS_ERC20, ITEMS_MEALS, ITEMS_THE_FOREST, ITEMS_OPENMIC};
