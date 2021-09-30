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
		img: '/front/barbarian.svg',
		description: 'No friend of the books, unlike any librarian.\nStrength, weapons, and anger serve the Barbarian',
		skills: ['Climb', 'Craft', 'Handle Animal', 'Intimidate', 'Jump', 'Listen', 'Ride', 'Survival', 'Swim'],
		baseSkill: 4,
		baseFeats: [
			'Simple Weapon Proficiency',
			'Martial Weapon Proficiency',
			'Armor Proficiency (Light)',
			'Armor Proficiency (Medium)',
			'Shield Proficiency'
		]
	},
	'Bard': {
		id: 2,
		name: 'Bard',
		img: '/bard.png',
		description: 'Words, songs, and music are certainly not hard.\n The magic of the voice is the weapon of the Bard',
		skills: ['Appraise', 'Balance', 'Bluff', 'Climb', 'Concentration', 'Craft', 'Decipher Script', 'Diplomacy', 'Disguise', 'Escape Artist', 'Gather Information', 'Hide', 'Jump', 'Knowledge', 'Listen', 'Move Silently', 'Perform', 'Profession', 'Sense Motive', 'Sleight Of Hand', 'Speak Language', 'Spellcraft', 'Swim', 'Tumble', 'Use Magic Device'],
		baseSkill: 6,
		baseFeats: [
			'Simple Weapon Proficiency',
			'Martial Weapon Proficiency',
			'Armor Proficiency (Light)',
			'Shield Proficiency',
		]
	},
	'Cleric': {
		id: 3,
		name: 'Cleric',
		img: '/cleric.png',
		description: 'In the world of adventure, pains and wounds are quite generic.\nIf you live a life or danger, you best know a Cleric',
		skills: ['Concentration', 'Craft', 'Diplomacy', 'Heal', 'Knowledge', 'Knowledge', 'Knowledge', 'Knowledge', 'Profession', 'Spellcraft'],
		baseSkill: 2,
		baseFeats: [
			'Simple Weapon Proficiency',
			'Armor Proficiency (Light)',
			'Armor Proficiency (Medium)',
			'Armor Proficiency (Heavy)',
			'Shield Proficiency',
		]
	},
	'Druid': {
		id: 4,
		name: 'Druid',
		img: '/druid.png',
		description: 'All life is connected in something that is rather fluid.\nThe trees, insects, and animals are all friends of the Druid',
		skills: ['Concentration', 'Craft', 'Diplomacy', 'Handle Animal', 'Heal', 'Knowledge', 'Listen', 'Profession', 'Ride', 'Spellcraft', 'Spot', 'Survival', 'Swim'],
		baseSkill: 4,
		baseFeats: [
			'Simple Weapon Proficiency',
			'Armor Proficiency (Light)',
			'Armor Proficiency (Medium)',
			'Shield Proficiency',
		]
	},
	'Fighter': {
		id: 5,
		name: 'Fighter',
		img: '/fighter.png',
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
		]
	},
	'Monk': {
		id: 6,
		name: 'Monk',
		img: '/monk.png',
		description: 'Some pursue vanity, and others just want to get drunk.\nInner peace, and control of the body are the goals of a monk',
		skills: ['Balance', 'Climb', 'Concentration', 'Craft', 'Diplomacy', 'Escape Artist', 'Hide', 'Jump', 'Knowledge', 'Knowledge', 'Listen', 'Move Silently', 'Perform', 'Profession', 'Sense Motive', 'Spot', 'Swim', 'Tumble'],
		baseSkill: 4,
		baseFeats: [
			'Exotic Weapon Proficiency',
			'Improved Unarmed Strike',
		]
	},
	'Paladin': {
		id: 7,
		name: 'Paladin',
		img: '/paladin.png',
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
		]
	},
	'Ranger': {
		id: 8,
		name: 'Ranger',
		img: '/ranger.png',
		description: 'Most, avoid, flee, and fear only a little bit of danger.\nWith a bow in the wilderness, you might find a Ranger',
		skills: ['Climb', 'Concentration', 'Craft', 'Handle Animal', 'Heal', 'Hide', 'Jump', 'Knowledge', 'Knowledge', 'Knowledge', 'Listen', 'Move Silently', 'Profession', 'Ride', 'Search', 'Spot', 'Survival', 'Swim', 'Use Rope'],
		baseSkill: 6,
		baseFeats: [
			'Simple Weapon Proficiency',
			'Martial Weapon Proficiency',
			'Armor Proficiency (Light)',
			'Shield Proficiency'
		]
	},
	'Rogue': {
		id: 9,
		name: 'Rogue',
		img: '/rogue.png',
		description: 'The rich are rich and the poor are poor is in vogue.\nBut with sticky fingers and sharp daggers you find the Rogue',
		skills: ['Appraise', 'Balance', 'Bluff', 'Climb', 'Craft', 'Decipher Script', 'Diplomacy', 'Disable Device', 'Disguise', 'Escape Artist', 'Forgery', 'Gather Information', 'Hide', 'Intimidate', 'Jump', 'Knowledge', 'Listen', 'Move Silently', 'Open Lock', 'Perform', 'Profession', 'Search', 'Sense Motive', 'Sleight Of Hand', 'Spot', 'Swim', 'Tumble', 'Use Magic Device', 'Use Rope'],
		baseSkill: 8,
		baseFeats: [
			'Simple Weapon Proficiency',
			'Martial Weapon Proficiency',
			'Armor Proficiency (Light)',
		]
	},
	'Sorcerer': {
		id: 10,
		name: 'Sorcerer',
		img: '/sorcerer.png',
		description: 'A scholarly teacher of magic seems like a torturer.\nBut this is not of concern to the innate magic of a Sorcerer',
		skills: ['Bluff', 'Concentration', 'Craft', 'Knowledge', 'Profession', 'Spellcraft'],
		baseSkill: 2,
		baseFeats: [
			'Simple Weapon Proficiency',
		]
	},
	'Wizard': {
		id: 11,
		name: 'Wizard',
		img: '/wizard.png',
		description: 'Many waste their time on a log, idle like a lizard.\nHowever, through study, immense power is granted to the Wizard',
		skills: ['Concentration', 'Craft', 'Decipher Script', 'Knowledge', 'Profession', 'Spellcraft'],
		baseSkill: 2,
		baseFeats: [
			'Simple Weapon Proficiency',
			'Scribe Scroll',
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