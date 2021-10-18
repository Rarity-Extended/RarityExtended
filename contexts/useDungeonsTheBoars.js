/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 5th 2021
**	@Filename:				useDungeon.js
******************************************************************************/
/* eslint-disable react-hooks/exhaustive-deps */

import	React, {useState, useEffect, useContext, createContext}	from	'react';
import	useWeb3													from	'contexts/useWeb3';
import	{Contract}												from	'ethcall';
import	{newEthCallProvider}									from	'utils';

const	DungeonContext = createContext();

export const DungeonContextApp = ({children, adventurer}) => {
	const	{chainID, provider} = useWeb3();
	const	[dungeon, set_dungeon] = useState({});

	/**************************************************************************
	**	Prepare the multicall to get most of the data
	**************************************************************************/
	function		prepareDungeonCalls() {
		const	dungeon = new Contract(process.env.DUNGEON_BOARS_ADDR, process.env.DUNGEON_BOARS_ABI);
		return [
			dungeon.actions_log(adventurer.tokenID),
			dungeon.base_attack_bonus_by_class_and_level(adventurer.tokenID, adventurer.level),
			dungeon.armor_class(adventurer.attributes.dexterity),
			dungeon.attack_bonus(adventurer.class, adventurer.attributes.strength, adventurer.level),
			dungeon.health_by_class_and_level(adventurer.class, adventurer.level, adventurer.attributes.constitution),
			dungeon.damage(adventurer.attributes.strength),
			dungeon.dungeon_armor_class(),
			dungeon.dungeon_damage(),
			dungeon.dungeon_health(),
			dungeon.dungeon_to_hit(),
			dungeon.simulate_kill(adventurer.tokenID),
		];
	}
	/**************************************************************************
	**	Fetch the data from the prepared multicall to get most of the data
	**************************************************************************/
	async function	fetchDungeon(calls) {
		const	ethcallProvider = await newEthCallProvider(provider, Number(chainID) === 1337);
		const	callResult = await ethcallProvider.all(calls);
		return (callResult);
	}

	/**************************************************************************
	**	Actually update the state based on the data fetched
	**************************************************************************/
	function	setDungeon(multicallResult) {
		const	[log, adventurerBaseAttack, adventurerArmor, adventurerBonusAttack, adventurerHealth, adventurerDamage, dungeon_armor_class, dungeon_damage, dungeon_health, dungeon_to_hit, scout] = multicallResult;

		set_dungeon({
			tokenID: adventurer.tokenID,
			log: Number(log),
			adventurerBaseAttack: Number(adventurerBaseAttack),
			adventurerArmor: Number(adventurerArmor),
			adventurerBonusAttack: Number(adventurerBonusAttack),
			adventurerHealth: Number(adventurerHealth),
			adventurerDamage: Number(adventurerDamage),
			dungeonArmor: Number(dungeon_armor_class),
			dungeonDamage: Number(dungeon_damage),
			dungeonHealth: Number(dungeon_health),
			dungeonToHit: Number(dungeon_to_hit),
			scout: Number(scout),
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
