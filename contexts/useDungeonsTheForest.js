/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 5th 2021
**	@Filename:				useDungeon.js
******************************************************************************/
/* eslint-disable react-hooks/exhaustive-deps */

import	React, {useState, useEffect, useContext, createContext}	from	'react';
import	useWeb3													from	'contexts/useWeb3';
import	{ethers}												from	'ethers';
import	{Provider, Contract}									from	'ethcall';
import	THE_FOREST_ABI											from	'utils/abi/dungeonTheForest.abi.abi';

const	THE_FOREST_LOOT = {
	'7': {
		'Dead King crown': 'Once was a king, his name was lost but not his crown.',
		'Black gauntlet': 'A mysterious gauntlet, with mysterious power.',
		'Haunted ring': 'Tells the story, that belonged to a witch...',
		'Ancient book': 'The forest has a lot of stories, not as many as this book.',
		'Enchanted book': "I wouldn't take it if I was you ...",
		'Gold ring': "Crafted by nobody, 'belongs to whoever finds it' is engraved on the ring...",
		'Treasure map': 'Where does it lead? to the rarest destiny.',
		'Spell book': 'Beware! can cast a spell on you.',
		'Silver sword': 'Even the bravest enemy is afraid to reflect on this sword.',
		"Ancient Prince Andre's Sword": "Hope the prince doesn't claim his sword.",
		'Old damaged coin': 'An old coin, nobody uses it... right?',
		'Magic necklace': 'An unprecedented magic, anyway it looks cool.',
		'Mechanical hand': 'Solid and rigid, but disfigure every fighter that cross his path.'
	},
	'6': {
		'Silver sword': 'Even the bravest enemy is afraid to reflect on this sword.',
		'Haunted ring': 'Tells the story, that belonged to a witch...',
		'War helmet': 'Survived the battle, not as its former carrier.',
		'Fire boots': 'The God of Fire created this. Only a cold soul could carry them.',
		'War trophy': 'A war where too much was lost.',
		'Elf skull': 'The anatomy of an elf, the trophy of his assassin.',
		'Unknown ring': 'A mystery created in the hardest metal.',
		'Silver ring': 'Bright at first, dark in oblivion.',
		'War book': 'How to start a war, how to bury your soldier friends...',
		'Gold pot': 'Lucky one who discovered it.',
		'Demon head': 'Shadowy figure, now headless.',
		'Unknown key': "Whatever this may open, it's a complete mystery.",
		'Cursed book': 'An ancient enchantment. Whoever reads this will be forgotten forever.',
		'Giant plant seed': 'Little like a bug, tall like the sky.',
		'Old farmer sickle': 'Only the old ones remember this sickles.',
		'Enchanted useless tool': 'Very promising, but useless.'
	},
	'5': {
		'Dragon egg': 'The perfect pet.',
		'Bear claw': 'Now, you can claim you survived a Bear.',
		'Silver sword': 'Even the bravest enemy is afraid to reflect on this sword.',
		'Rare ring': 'Very rare, hope it has a good price in the market.',
		'Glove with diamonds': 'Glamor is just one of its characteristics.',
		'Haunted cloak': 'It has a life of its own, it protects those who use it.',
		'Dead hero cape': 'We honor his former owner, a hero with no name.',
		'Cursed talisman': 'When it was not enchanted it gave lucky, now it only gives death.',
		'Enchanted talisman': 'Luck and a random enchantment, what could go wrong?',
		'Haunted ring': 'Tells the story, that belonged to a witch...',
		'Time crystal': 'If the former owner of this crystal could go back in time, he would surely avoid losing it.',
		'Warrior watch': 'A warrior never has enough time.',
		'Paladin eye': 'Do not lose sight of it, it could be useful for its owner.',
		'Metal horse saddle': 'Now you only need a horse.',
		'Witcher book': 'Magic, spells, enchantments. Everything in your hand.',
		'Witch book': 'Shady secrets, nobody should see it.',
		'Unknown animal eye': 'From a beast, or a pet, a monster or a bunny.'
	},
	'4': {
		'Slain warrior armor':'I hope you find it useful.',
		'Witcher book':'Magic, spells, enchantments. Everything in your hand.',
		'Cursed talisman':'When it was not enchanted it gave lucky, now it only gives death.',
		'Antique ring':'An ancient power, a present from the gods, the future of its bearer.',
		"Ancient Prince Andre's Sword":"Hope the prince doesn't claim his sword.",
		"King's son sword":"'It will be yours when you grow'",
		'Old damaged coin':'An old coin, nobody uses it... right?',
		'Thunder hammer':'Forged in the storm, lightning in your hand.',
		'Time crystal':'If the former owner of this crystal could go back in time, he would surely avoid losing it.',
		'Skull fragment':'A puzzle to solve. What did the former owner of this head think?',
		'Hawk eye':'It gives you precision. In your decisions and in your shots.',
		'Meteorite fragment':'Unknown alien power.',
		'Mutant fisheye':'The sea is very strange...',
		'Wolf necklace':'For a wolf or a human, or both at the same time.',
		'Shadowy rabbit paw':'A one-legged rabbit is still a rabbit.',
		'Paladin eye':'Do not lose sight of it, it could be useful for its owner.'
	}
};


const	DungeonContext = createContext();

async function newEthCallProvider(provider) {
	const	ethcallProvider = new Provider();
	await	ethcallProvider.init(provider);
	return	ethcallProvider;
}

export const DungeonContextApp = ({children, adventurer}) => {
	const	{chainID, provider} = useWeb3();
	const	[dungeon, set_dungeon] = useState({});

	/**************************************************************************
	**	Prepare the multicall to get most of the data
	**************************************************************************/
	function		prepareDungeonCalls() {
		const	dungeon = new Contract(process.env.DUNGEON_THE_FOREST_ADDR, THE_FOREST_ABI);
		return [
			dungeon.getResearchBySummoner(adventurer.tokenID),
		];
	}
	/**************************************************************************
	**	Fetch the data from the prepared multicall to get most of the data
	**************************************************************************/
	async function	fetchDungeon(calls) {
		if (Number(chainID) === 1337) {
			const	ethcallProvider = await newEthCallProvider(new ethers.providers.JsonRpcProvider('http://localhost:8545'));
			ethcallProvider.multicallAddress = '0xc04d660976c923ddba750341fe5923e47900cf24';
			const	callResult = await ethcallProvider.all(calls);
			return (callResult);
		} else {
			const	ethcallProvider = await newEthCallProvider(provider);
			const	callResult = await ethcallProvider.all(calls);
			return (callResult);
		}
	}

	/**************************************************************************
	**	Actually update the state based on the data fetched
	**************************************************************************/
	function	setDungeon(multicallResult) {
		const	[researchBySummoner] = multicallResult;

		set_dungeon({
			tokenID: adventurer.tokenID,
			canAdventure: researchBySummoner.discovered === true,
			timeInDays: Number(researchBySummoner.timeInDays),
			initBlockTs: Number(researchBySummoner.initBlockTs), //Block when research started
			endBlockTs: Number(researchBySummoner.endBlockTs), //Block when research will end
			discovered: researchBySummoner.discovered,
		});
	}

	/**************************************************************************
	**	Prepare the rarities update from ftmscan result
	**************************************************************************/
	async function	prepareDungeon() {
		const	callResults = await fetchDungeon(prepareDungeonCalls());
		setDungeon(callResults);
	}

	useEffect(() => {
		if (adventurer.tokenID)
			prepareDungeon();
	}, [adventurer.tokenID]);

	return (
		<DungeonContext.Provider value={{dungeon}}>
			{children}
		</DungeonContext.Provider>
	);
};

export const useDungeon = () => useContext(DungeonContext);
export default useDungeon;
