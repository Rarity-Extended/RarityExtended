/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				ClassList.js
******************************************************************************/

/******************************************************************************
**	Classes structure :
**	- id : the id of the class as in the solidity file
**	- name : the name of the class
**	- img : the image used to represent this class
**	- skills : an array of string, matching the skills for the class
**	- baseSill : a number corresponding to the base point of skills for it
******************************************************************************/
const	_CLASSES = {
	'Barbarian': {
		id: 1,
		name: 'Barbarian',
		images: {
			front: '/classes/front/barbarian.svg',
			back: '/classes/back/barbarian.svg',			
		},
		icon: '/classes/icon/barbarian.png',
		description: 'No friend of the books, unlike any librarian.\nStrength, weapons, and anger serve the Barbarian',
		skills: ['Climb', 'Craft', 'Handle Animal', 'Intimidate', 'Jump', 'Listen', 'Ride', 'Survival', 'Swim'],
		baseSkill: 4,
		baseFeats: [
			'Simple Weapon Proficiency',
			'Martial Weapon Proficiency',
			'Armor Proficiency (Light)',
			'Armor Proficiency (Medium)',
			'Shield Proficiency'
		],
		info: [
			'For ability scores, there are two different paths you can take when building a barbarian. The first is to take your highest roll and put it into Str. This will maximize your ability to hit and deal damage with melee weapons and with your barbarian abilities. If you choose this option, put your second-highest roll into Con to get as much HP as possible when you level, but without sacrificing Str. Consider spending your ability increases until you get your Strength to at least 18.',
			'The second path for a barbarian build is to put your highest roll into Con. This will maximize your HP as you level. Since barbarians do not wear heavy armor, some players believe this to be the best build for the class. If you choose this option, put your second-highest roll into Str so as not to harm your ability to use barbarian features and melee attacks.',
			'Regardless of which of these builds you choose, put your third-highest roll into Dex. If you wear light armor or no armor, having a high Dex will help your armor class. Dex saves are also very common in D&D 5E, so that is an added benefit to having a high score in this ability.',
			'Intelligence, Wisdom, and Charisma are not very useful at any barbarian level. Your Intelligence modifier and Charisma Modifier are the least useful, with Wisdom at least potentially useful just for the Perception and Survival ability checks. But each one is still a bad ability for you and you\'ll still be putting your bad rolls into these abilities.'
		]
	},
	'Bard': {
		id: 2,
		name: 'Bard',
		images: {
			front: '/classes/front/bard.png',
			back: '/classes/back/bard.png',			
		},
		icon: '/classes/icon/bard.png',
		description: 'Words, songs, and music are certainly not hard.\n The magic of the voice is the weapon of the Bard',
		skills: ['Appraise', 'Balance', 'Bluff', 'Climb', 'Concentration', 'Craft', 'Decipher Script', 'Diplomacy', 'Disguise', 'Escape Artist', 'Gather Information', 'Hide', 'Jump', 'Knowledge', 'Listen', 'Move Silently', 'Perform', 'Profession', 'Sense Motive', 'Sleight Of Hand', 'Speak Language', 'Spellcraft', 'Swim', 'Tumble', 'Use Magic Device'],
		baseSkill: 6,
		baseFeats: [
			'Simple Weapon Proficiency',
			'Martial Weapon Proficiency',
			'Armor Proficiency (Light)',
			'Shield Proficiency',
		],
		info: [
			'Charisma is your spell casting ability score for bards, and no matter what build (there’s probably some obscure build to prove me wrong here) you’ll want your Charisma to be high, if not your highest ability score.',
			'Next, you’ll need Dexterity, both for raising your AC to stay alive, but also for utilizing the ranged or finesse weapons that are typically a bard’s go-to.',
			'Finally, you’ll want to choose between Constitution, and the remaining mental ability scores of Intelligence and Wisdom. As a bard, you’ll be gaining some major bonuses to your skill checks and having a higher Intelligence or Wisdom can push some of those key skills further. However, Constitution is useful for not dying.',
			'If you’re going down a more combat oriented path with your bard, consider making your 3rd highest ability score Constitution. If you’re going down a more skill and utility-oriented path, consider making Intelligence or Wisdom your 3rd highest ability score.',
			'Strength is the only ability score that usually isn’t useful for a bard, and it should typically be your dump stat.',
		]
	},
	'Cleric': {
		id: 3,
		name: 'Cleric',
		images: {
			front: '/classes/front/cleric.png',
			back: '/classes/back/cleric.png',			
		},
		icon: '/classes/icon/cleric.png',
		description: 'In the world of adventure, pains and wounds are quite generic.\nIf you live a life or danger, you best know a Cleric',
		skills: ['Concentration', 'Craft', 'Diplomacy', 'Heal', 'Knowledge', 'Knowledge', 'Knowledge', 'Knowledge', 'Profession', 'Spellcraft'],
		baseSkill: 2,
		baseFeats: [
			'Simple Weapon Proficiency',
			'Armor Proficiency (Light)',
			'Armor Proficiency (Medium)',
			'Armor Proficiency (Heavy)',
			'Shield Proficiency',
		],
		info: [
			'Wisdom is your spellcasting ability score for clerics, and you\'re going to want your Wisdom to be high and quite likely your highest ability score.',
			'Past that it gets more complicated because of all the routes you can take when building your cleric. Most if it revolves around what armor you plan on taking, and if you plan on being a "combat cleric" or more of a "spellcasting cleric". Strength, Dexterity, and Constitution are all in the running here for your 2nd highest ability score.',
			'If you end up with heavy armor (more on that later), you\'ll most likely want to make Constitution your next highest ability score. If you\'re relying on light or medium armor, Dexterity should be your next highest. And finally, while not all builds will want it, some of the more combat oriented cleric builds will want Strength as their next highest score.',
			'In any case, none of these "physical scores" should be your dump stats and should at least be neutral "10\'s". Charisma and Intelligence however are largely useless for you, and you should put as few points as possible into them unless you\'re doing some very specific and odd builds of cleric.',
			'Finally, while there are a few feats to consider for your ability score increases, I recommend simply loading up on Wisdom unless you\'ve absolutely got your heart set on a specific build.',
		]
	},
	'Druid': {
		id: 4,
		name: 'Druid',
		images: {
			front: '/classes/front/druid.png',
			back: '/classes/back/druid.png',			
		},
		icon: '/classes/icon/druid.png',
		description: 'All life is connected in something that is rather fluid.\nThe trees, insects, and animals are all friends of the Druid',
		skills: ['Concentration', 'Craft', 'Diplomacy', 'Handle Animal', 'Heal', 'Knowledge', 'Listen', 'Profession', 'Ride', 'Spellcraft', 'Spot', 'Survival', 'Swim'],
		baseSkill: 4,
		baseFeats: [
			'Simple Weapon Proficiency',
			'Armor Proficiency (Light)',
			'Armor Proficiency (Medium)',
			'Shield Proficiency',
		],
		info: [
			'Wisdom is your spellcasting ability score for druids and you’re going to want it to be as high as possible.',
			'Next, many druid spells rely on concentration, which means you’ll want to prioritize Constitution as your second highest ability score. This will also make you far more survivable if you’re trying to serve more of a tank or DPS role for your party.',
			'Past those two, Dexterity is usually the next priority to aid with your AC while you aren’t in a wild shape.',
			'Strength, Intelligence, and Charisma are all unlikely to be useful for you, though pumping up Intelligence or Charisma can be helpful to aid some key skills, and there are some interesting combat druid builds that rely on a high Strength score.',
		]
	},
	'Fighter': {
		id: 5,
		name: 'Fighter',
		images: {
			front: '/classes/front/fighter.png',
			back: '/classes/back/fighter.png',			
		},
		icon: '/classes/icon/fighter.png',
		description: 'Scorn should not be directed at one with a dream to be a writer.\nBut tactics and sword play are what drive the Fighter',
		skills: ['Climb', 'Craft', 'Handle Animal', 'Intimidate', 'Jump', 'Ride', 'Swim'],
		baseSkill: 2,
		baseFeats: [
			'Simple Weapon Proficiency',
			'Martial Weapon Proficiency',
			'Armor Proficiency (Light)',
			'Armor Proficiency (Medium)',
			'Armor Proficiency (Heavy)',
			'Shield Proficiency',
			'Tower Shield Proficiency'
		],
		info: [
			'For a traditional fighter build, put your highest ability roll into strength and strongly consider spending your ability score improvements on Strength.',
			'Another option is to create a fighter that uses ranged or finesse weapons, such as crossbows, rapiers, scimitars, or shortswords. These weapons are lighter, and do not require high strength to use effectively. Because of this, they use Dex instead of Str for attack rolls. If you plan on playing this type of fighter, put your highest roll into Dex instead of Str and strongly consider spending your ability score improvement in Dexterity.',
			'Constitution is important for any D&D character. The higher your Constitution ability modifier, the more hit points you will gain as you level. This will improve your ability to survive long fights. Put your second-highest roll into Con.',
			'Wisdom is another important ability score for all D&D characters. If you have low Wis, you may often fall victim to magic spells and other types of mental manipulation that your foes may try to dominate you with. And Wisdom is important for succeeding at perception rolls, which happens often in D&D. Put your third-highest roll into Wis.',
			'If you chose a traditional high-Str fighter build, dump your bad rolls into Dex, Cha, and Int. If you chose a finesse or ranged weapon fighter build, dump your bad rolls into Str, Cha, and Int.',
		]
	},
	'Monk': {
		id: 6,
		name: 'Monk',
		images: {
			front: '/classes/front/monk.svg',
			back: '/classes/back/monk.svg',			
		},
		icon: '/classes/icon/monk.png',
		description: 'Some pursue vanity, and others just want to get drunk.\nInner peace, and control of the body are the goals of a monk',
		skills: ['Balance', 'Climb', 'Concentration', 'Craft', 'Diplomacy', 'Escape Artist', 'Hide', 'Jump', 'Knowledge', 'Knowledge', 'Listen', 'Move Silently', 'Perform', 'Profession', 'Sense Motive', 'Spot', 'Swim', 'Tumble'],
		baseSkill: 4,
		baseFeats: [
			'Exotic Weapon Proficiency',
			'Improved Unarmed Strike',
		],
		info: [
			'To maximize the advantages of the monk class, put your highest ability roll into Dexterity. Most of the weapons you use as a monk will rely on your Dexterity score for attack rolls. So Dex will be your most important ability.',
			'Monk’s use ki, the mystical energy that flows through living bodies, to enhance their physical power. But the use of ki often requires Wisdom. So put your second-highest roll into Wis.',
			'Con is also an important stat for any D&D 5E character. It will allow you to gain more hit points as you level, giving you more survivability in combat. And it will help in many situations that require saving throws. Put your third-highest roll into Con.',
			'Charisma, Intelligence, and Strength are generally not useful to monks. So put your low rolls into these.',
		]
	},
	'Paladin': {
		id: 7,
		name: 'Paladin',
		images: {
			front: '/classes/front/paladin.png',
			back: '/classes/back/paladin.png',			
		},
		icon: '/classes/icon/paladin.png',
		description: 'Some hearts when inspected are found with malice therein.\nBut righteous and honor are the tenets of the Paladin',
		skills: ['Concentration', 'Craft', 'Diplomacy', 'Handle Animal', 'Heal', 'Knowledge', 'Knowledge', 'Profession', 'Ride', 'Sense Motive'],
		baseSkill: 2,
		baseFeats: [
			'Simple Weapon Proficiency',
			'Martial Weapon Proficiency',
			'Armor Proficiency (Light)',
			'Armor Proficiency (Medium)',
			'Armor Proficiency (Heavy)',
			'Shield Proficiency',
		],
		info: [
			'Paladins are very straightforward when it comes to their abilities, they want high Strength, high Charisma, and high Constitution.',
			'There is a strong argument to be made about dropping Charisma, your Lay on Hands, and Divine Smite abilities don’t need it, and you can essentially drop it if you don’t care about spellcasting, oath features, or party face roleplaying.',
			'However, unless you’re trying to absolutely maximize your damage potential and survivability at the cost of other features, you’ll want at least some Charisma.',
			'Beyond that, you should be rocking full heavy armor and swinging Strength weapons, meaning Dexterity won’t be much use to you. Similarly, Intelligence and Wisdom don’t fuel any of your class features and should be dump stats and only considered if you’ve got spare points and want to boost a few skills.',	
		]
	},
	'Ranger': {
		id: 8,
		name: 'Ranger',
		images: {
			front: '/classes/front/ranger.png',
			back: '/classes/back/ranger.png',			
		},
		icon: '/classes/icon/ranger.png',
		description: 'Most, avoid, flee, and fear only a little bit of danger.\nWith a bow in the wilderness, you might find a Ranger',
		skills: ['Climb', 'Concentration', 'Craft', 'Handle Animal', 'Heal', 'Hide', 'Jump', 'Knowledge', 'Knowledge', 'Knowledge', 'Listen', 'Move Silently', 'Profession', 'Ride', 'Search', 'Spot', 'Survival', 'Swim', 'Use Rope'],
		baseSkill: 6,
		baseFeats: [
			'Simple Weapon Proficiency',
			'Martial Weapon Proficiency',
			'Armor Proficiency (Light)',
			'Shield Proficiency'
		],
		info: [
			'For your standard ranger using archery or most forms of two-weapon fighting, you’ll want to make Dexterity your highest ability score, followed closely by Wisdom, and then Constitution.',
			'Wisdom is the spellcasting ability for rangers, and while there are some builds that will utilize Strength, the majority of standard builds will be using Dexterity.',
			'Beyond that Constitution is usually the next highest score to keep your ranger survivable.',
			'Strength or Dexterity (whichever one you’re not using), Intelligence, and Charisma can all be treated as dump stats.',
		]
	},
	'Rogue': {
		id: 9,
		name: 'Rogue',
		images: {
			front: '/classes/front/rogue.png',
			back: '/classes/back/rogue.png',			
		},
		icon: '/classes/icon/rogue.png',
		description: 'The rich are rich and the poor are poor is in vogue.\nBut with sticky fingers and sharp daggers you find the Rogue',
		skills: ['Appraise', 'Balance', 'Bluff', 'Climb', 'Craft', 'Decipher Script', 'Diplomacy', 'Disable Device', 'Disguise', 'Escape Artist', 'Forgery', 'Gather Information', 'Hide', 'Intimidate', 'Jump', 'Knowledge', 'Listen', 'Move Silently', 'Open Lock', 'Perform', 'Profession', 'Search', 'Sense Motive', 'Sleight Of Hand', 'Spot', 'Swim', 'Tumble', 'Use Magic Device', 'Use Rope'],
		baseSkill: 8,
		baseFeats: [
			'Simple Weapon Proficiency',
			'Martial Weapon Proficiency',
			'Armor Proficiency (Light)',
		],
		info: [
			'Rogues more than most classes get their ability priorities shifted around depending on what archetype they take but there are a few constants that you should consider on character creation and when your ability increases.',
			'With very few exceptions, Dexterity is always going to be the ability score you\'ll want as high as possible. The attacks you\'ll be making rely on Dexterity, and you\'ll likely be wearing light armor which will be enhanced by a high Dexterity score. At character creation you\'ll want to try and get your Dexterity up to 16, and you\'ll likely want it up to 18 with your first ability score improvement and may very well be best served by spending all of your ability score increases in Dex at later levels.',
			'Next is Constitution. As with most martial classes that expect to get into combat every now and again, it\'s helpful to stack up a few points of Con to get some extra hit points. For many rogues, you\'ll want a Constitution of 14 or 12.',
			'Then when it comes to the mental abilities of Intelligence, Wisdom, and Charisma, it will really depend on your rogue archetype and what skills you\'d like to focus on. If you plan on playing the magical arcane trickster, you\'ll want to prioritize Intelligence. If you\'re playing a dashing swashbuckler or want to be a devious face of the party, you\'ll want to prioritize Charisma. Wisdom doesn\'t have any specific archetype function, but it is linked to some key skills like Perception you may want to improve.',
			'Finally, while I have seen some very strange builds make use of it, for most Rogues Strength is a bad ability score that they can\'t really utilize, and this should usually be a rogue\'s dump stat.',
		]
	},
	'Sorcerer': {
		id: 10,
		name: 'Sorcerer',
		images: {
			front: '/classes/front/sorcerer.png',
			back: '/classes/back/sorcerer.png',			
		},
		icon: '/classes/icon/sorcerer.png',
		description: 'A scholarly teacher of magic seems like a torturer.\nBut this is not of concern to the innate magic of a Sorcerer',
		skills: ['Bluff', 'Concentration', 'Craft', 'Knowledge', 'Profession', 'Spellcraft'],
		baseSkill: 2,
		baseFeats: [
			'Simple Weapon Proficiency',
		],
		info: [
			'A sorcerer\'s magic comes from their ancestor as an deep wellspring that resides within them, and their Charisma score is their spellcasting ability that shows how well they tap into those sorcerous powers. Regardless of what sorcerer build you\'re shooting for, you\'ll want your Charisma spellcasting ability to be at least 16, and usually you\'ll want it as high as possible. You\'ll also probably want to spend your first ability score improvement to reach a Charisma of 18 to get up to a +4 attack modifier on those spell attack rolls.',
			'Sorcerers don\'t normally get any armor, which means they\'re typically on the squishy end. Having some Dexterity improves your AC which you\'ll want high to save you from whatever attacks make it to you. You\'ll want a Dexterity of at least 14, and possibly higher if you can manage it.',
			'Next, you can\'t stop every attack from hitting you, and a decent Constitution can keep you alive through a few more attacks. Try to reach at least a 12 Constitution, and preferably 14 or higher.',
			'There are some specific builds that this won\'t be true for, but most sorcerers can\'t really make use of Intelligence, Wisdom, or Strength.',
			'If you have some spare ability score points, improving any of these for saving throws or skill checks can be useful, but they should typically be 12 or lower.',
		]
	},
	'Wizard': {
		id: 11,
		name: 'Wizard',
		images: {
			front: '/classes/front/wizard.png',
			back: '/classes/back/wizard.png',			
		},
		icon: '/classes/icon/wizard.png',
		description: 'Many waste their time on a log, idle like a lizard.\nHowever, through study, immense power is granted to the Wizard',
		skills: ['Concentration', 'Craft', 'Decipher Script', 'Knowledge', 'Profession', 'Spellcraft'],
		baseSkill: 2,
		baseFeats: [
			'Simple Weapon Proficiency',
			'Scribe Scroll',
		],
		info: [
			'Wizard spells are powered up by your Intelligence bonus, so you should always make sure your Intelligence modifier is as high as possible. High Intelligence bonuses boosts your spell attack bonus and difficulty, so your spell attack rolls will be higher and will deal more damage to creatures if you have a higher Intelligence modifier.',
			'Dexterity and Constitution are also important to wizards. Your Mage Armor spell will make your AC 13 + Dexterity modifier. So, the higher your Dexterity is, the harder it will be for your foes to hit you. And wizards have naturally low hit points, so having a high Constitution helps to reduce this problem. Additionally, "concentration spells" require you to concentrate, and keeping that concentration requires a decent Constitution. Since you won\'t be able to add your proficiency bonus (wizards aren\'t proficient in Constitution saves) you\'ll need at least a bit of Constitution score buffer. Put your second and third highest rolls into Constitution and Dexterity.',
			'Perception checks are a common occurrence in most D&D campaigns and a good selection of other powerful skills on the skill list rely on Wisdom. For better perception put your fourth-highest ability score into Wisdom and try to pick up the Perception skill proficiency.',
			'Strength and Charisma are not very useful to wizards. Put your bad ability scores into Strength and Charisma.',
			'There are some times where you will be thwarted by their low Strength or Charisma at a rope climb or a prickly conversation, but your bookworm will have plenty of times where they\'re the only solution with all that sweet Intelligence.',
		]
	},
};

function _prepareClasses() {
	const	_classes = {};
	for (const key in _CLASSES) {
		_classes[key] = _CLASSES[key];
		_classes[_CLASSES[key].id] = _CLASSES[key];
	}
	return _classes;
}

const	CLASSES = _prepareClasses();
export default CLASSES;