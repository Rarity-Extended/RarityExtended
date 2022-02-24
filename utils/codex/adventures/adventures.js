import	* as ITEMS from 'utils/codex/items/items';

const	ADVENTURES = [
	{
		'name': 'The Boars',
		'key': 'boars',
		'path': 'the-boars',
		'img': '/adventures/the-boars/header.jpeg',
		'address': '0xa79358CB5aefa3c550A8773848Dbb6E99e74300f',
		'overlayColor': '#554a40',
		'difficulty': 'easy',
		'minimalDescription': 'Kill or protect the boars. The destiny of the forest is in your hands ...',
		'description': [
			[
				{'text': 'You are walking near a large forest. The air fills with the scent of sap, leaves, and decaying leaves. The sun dips below the mountains, revealing the speckled green and brown of the forest floor, the slender trunks of stunted trees, the bird nests in the tops of branches.'}
			],
			[
				{'text': 'A burst of voices reach the ears of our adventurer. Two men are arguing about a '},
				{
					'text': 'boar',
					'highlighted': true,
					'tooltip': [
						{'text': 'The boars are big, black and bristly, their snouts curled like those of a ferret. They are like piglets, though much larger.'}
					]
				},
				{'text': ' problem. The youngest, an angry farmer, yells at the other, a man in his late middle ages. You can hear the conversation.'}
			],
			[
				{'text': "\"I tell you I saw it! A huge black boar... filthy thing! It tore up my prize plants! I only saw the beast, but it's big enough to be a dwarf a harvest price pig! It'll be back soon, you'll see! "},
				{
					'text': 'We need to kill them all',
					'highlighted': true,
					'tooltip': [
						{'text': "The boars are strong. Stronger than Facu's Rat. Only adventurer with a good amout of "},
						{'text': 'CONST', 'highlighted': true},
						{'text': ' and '},
						{'text': 'STR', 'highlighted': true},
						{'text': ' should start this fight.'}
					]
				},
				{'text': '!"'}
			],
			[
				{'text': "The older man ignores the farmer's rantings, though his face is hard. \"Look, there is no boar big enough to do what you say. What you saw was an elk, or one of those manticores that plague the land sometimes. "},
				{
					'text': 'Boars are necessary to maintain balance',
					'highlighted': true,
					'tooltip': [
						{'text': 'Less boars means more '},
						{'text': 'Mushroom', 'highlighted': true},
						{'text': ', '},
						{'text': 'Berries', 'highlighted': true},
						{'text': ' and '},
						{'text': 'Wood', 'highlighted': true},
						{'text': ', but much less '},
						{'text': 'Meat', 'highlighted': true},
						{'text': ', '},
						{'text': 'Tusks', 'highlighted': true},
						{'text': ' and '},
						{'text': 'Leather', 'highlighted': true},
						{'text': '. And the other way around.'}
					]
				},
				{'text': ' of this forest. They must be '},
				{
					'text': 'preserved, protected',
					'highlighted': true,
					'tooltip': [
						{'text': 'An adventurer knowing how to '},
						{'text': 'Handle Animal', 'highlighted': true},
						{'text': ' and having a good '},
						{'text': 'INT', 'highlighted': true},
						{'text': ', '},
						{'text': 'CHA', 'highlighted': true},
						{'text': ' and '},
						{'text': 'WIS', 'highlighted': true},
						{'text': '  will be perfect for this task.'}
					]
				},
				{'text': '. And with your hunting, it is about to be broken!"'}
			],
			[
				{'text': "It is getting dark, but our adventurer can still see the farmer's face clearly. He is angry, and quickly becoming hysterical. His jaw is trembling, and his eyes are red and watery. Seeing you, he calls you to ask for help."}
			]
		],
		'rewards': [
			{...ITEMS.LOOTS[process.env.LOOT_MUSHROOM_ADDR]},
			{...ITEMS.LOOTS[process.env.LOOT_BERRIES_ADDR]},
			{...ITEMS.LOOTS[process.env.LOOT_MEAT_ADDR]},
			{...ITEMS.LOOTS[process.env.LOOT_WOOD_ADDR]},
			{...ITEMS.LOOTS[process.env.LOOT_LEATHER_ADDR]},
			{...ITEMS.LOOTS[process.env.LOOT_TUSKS_ADDR]},
		]
	},
	{
		'name': 'The Tavern Hooligans',
		'path': 'openmic',
		'key': 'openMic',
		'img': '/adventures/openmic/header.jpeg',
		'address': '0x29d51E8736FCC8C2662aA1B2cf46753d5918606F',
		'overlayColor': '#FDAC53',
		'difficulty': 'easy',
		'minimalDescription': 'Hooligans are taking over the tavern. Get up there and give them a show, see if you can calm them down...',
		'description': [
			[
				{'text': "These hooligans show up at Facu's Tavern every weekend! They drink too much and scare away the other customers. Facu is fed up. Hopefully a "},
				{
					'text': 'bard',
					'highlighted': true,
					'tooltip': [
						{'text': 'One of the type of adventurer in Rarity. Your bard should be at least lvl 2.'}
					]
				},
				{'text': ' can calm them down.'}
			],
			[
				{'text': 'Facu only has humble '},
				{
					'text': 'prizes',
					'highlighted': true,
					'tooltip': [
						{'text': 'The prizes can be consomables, equipment or specific items that can be handfull at some point.'}
					]
				},
				{'text': ' to offer in return. But for the best performers, Facu will part with a secret mission pass!'}
			],
			[
				{'text': 'Oh and I almost forgot. If you have any '},
				{
					'text': 'Forest',
					'highlighted': true,
					'tooltip': [
						{'text': 'Their is a lot of treasure in this Forest. But they are all improving you charisma in some way.'}
					]
				},
				{'text': ' treasures with you, The Austrian will help you win over the crowd.'}
			]
		],
		'rewards': [
			{...ITEMS.OPENMIC['0x1000000000000000000000000000000000000011'], name: 'Random Signet Ring'},
			{...ITEMS.OPENMIC['0x1000000000000000000000000000000000000012']},
			{...ITEMS.OPENMIC['0x1000000000000000000000000000000000000013']},
			{...ITEMS.OPENMIC['0x1000000000000000000000000000000000000014']},
			{...ITEMS.OPENMIC['0x1000000000000000000000000000000000000017'], name: 'Random Secret Mission Pass'},
		]
	},
	{
		'name': 'The Forest',
		'key': 'forest',
		'path': 'the-forest',
		'img': '/adventures/the-forest/header.jpeg',
		'address': '0x48e6F88F1Ab05677675dE9d14a705f8A137ea2bC',
		'overlayColor': '#124712',
		'difficulty': 'easy',
		'minimalDescription': 'This drunk man in the tavern talked about treasure ... What does this big forest hide ?',
		'description': [
			[
				{'text': 'There is a dark looking man sitting at a table in the corner. His face is hidden under a full faced mask. He speaks of a forest to the north where he has buried a '},
				{
					'text': 'treasure',
					'highlighted': true,
					'tooltip': [
						{'text': 'Many treasures are buried in the forest. Nobody knows what they will be or what they may be used for, or even if you will be able to sell them... But are you a real treasure hunter?'}
					]
				},
				{'text': '.'}
			],
			[
				{'text': 'He leads you to a corner and starts looking through a pack with a sketchbook and a quill. You wait for him to find what he is looking for. He finally lifts a small piece of parchment and hands it to you. He has drawn a map of the area close to where he was found and circled a large oak tree with a pair of trees which look like they are kissing at the base.'}
			],
			[
				{'text': "You have to travel to that location and search for the two trees, then follow the game trail northeast. He doesn't know how long it will take, or how many days you will need, but says perhaps "},
				{
					'text': 'around a week',
					'highlighted': true,
					'tooltip': [
						{'text': 'You can spend between '},
						{'text': '4 and 7 days', 'highlighted': true},
						{'text': ' on this trail. Different times reap different treasures.'}
					]
				},
				{'text': ". Once you get to the forest, if you're still alive, look for the glowing mushrooms. Then, you will have to "},
				{
					'text': 'dig for the treasure',
					'highlighted': true,
					'tooltip': [
						{'text': 'After the time on the trail has ended, you will have to come back here to '},
						{'text': 'dig for a random treasure'},
						{'text': '.'}
					]
				},
				{'text': '.'}
			],
			[
				{'text': "He doesn't want anything in return for helping you. For now."}
			]
		],
		'rewards': [
			{...ITEMS.THE_FOREST['0x0000000000000000000000000000000000000041'], name: 'Random equipment'},
			{...ITEMS.THE_FOREST['0x0000000000000000000000000000000000000020']},
			{...ITEMS.THE_FOREST['0x0000000000000000000000000000000000000007']},
			{...ITEMS.THE_FOREST['0x0000000000000000000000000000000000000051'], name: 'Random item'},
		]
	},
	{
		'name': 'The Cellar',
		'key': 'cellar',
		'path': 'the-cellar',
		'img': '/adventures/the-cellar/header.jpeg',
		'address': '0x2A0F1cB17680161cF255348dDFDeE94ea8Ca196A',
		'overlayColor': '#000000',
		'difficulty': 'easy',
		'minimalDescription': 'A big ugly rat in the cellar? Sounds like the perfect adventurer for a beginner!',
		'description': [
			[
				{'text': 'Facu, the tavern’s owner, was sitting alone at a table. His old housecat laying on his lap and purring away. Facu had heard some scurrying about in his cellar and had gone down to check it out. He found swarms of hungry rats. In his earlier days, he would have squashed those pests, but these days he’s weak and frail.'}
			],
			[
				{'text': '“Ha! I told that Felipe that he should stop keeping such a messy cellar! He’ll never tidy up!”'}
			],
			[
				{'text': "You look at the cat. It's a very lazy cat. It mirror its owner; old and frail. Not the kind of hunter a house needs when there are plenty of rats."}
			],
			[
				{'text': "“Help me with this rat situation, adventurer. I have nothing much to offer, but you can keep everything you'll loot from these rats. And of course, a tankard of mead will be waiting for you.”"}
			],
			[
				{'text': 'You could do that. What is a rat for you? If you cannot handle the '},
				{
					'text': 'Big Ugly Rat',
					'highlighted': true,
					'tooltip': [
						{'text': 'The rat is not so weak. Only adventurer with a good amout of '},
						{'text': 'CONST', 'highlighted': true},
						{'text': ', '},
						{'text': 'STR', 'highlighted': true},
						{'text': ' and '},
						{'text': 'DEX', 'highlighted': true},
						{'text': ' should start the fight.'}
					]
				},
				{'text': ' in this cellar. If not, will you be able to fight the boars nearby? It could be you first act of bravery.'}
			],
			[
				{'text': 'You heard about this giant rat in the tavern. A big rat. Other adventurers have already killed it, but somehow it keeps coming back.'}
			]
		],
		'rewards': [
			{...ITEMS.LOOTS[process.env.DUNGEON_THE_CELLAR_ADDR]},
		]
	}
];


export default ADVENTURES;