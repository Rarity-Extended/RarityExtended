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
import	THE_CELLAR_ABI											from	'utils/abi/dungeonTheCellar.abi';

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
		const	dungeon = new Contract(process.env.DUNGEON_THE_CELLAR_ADDR, THE_CELLAR_ABI);
		return [
			dungeon.adventurers_log(adventurer.tokenID),
			dungeon.base_attack_bonus_by_class_and_level(adventurer.tokenID, adventurer.level),
			dungeon.armor_class(adventurer.attributes.dexterity),
			dungeon.attack_bonus(adventurer.class, adventurer.attributes.strength, adventurer.level),
			dungeon.health_by_class_and_level(adventurer.class, adventurer.level, adventurer.attributes.constitution),
			dungeon.damage(adventurer.attributes.strength),
			dungeon.dungeon_armor_class(),
			dungeon.dungeon_damage(),
			dungeon.dungeon_health(),
			dungeon.dungeon_to_hit(),
			dungeon.scout(adventurer.tokenID),
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
		const	[log, adventurerBaseAttack, adventurerArmor, adventurerBonusAttack, adventurerHealth, adventurerDamage, scout] = multicallResult;

		set_dungeon({
			tokenID: adventurer.tokenID,
			log: Number(log),
			adventurerBaseAttack: Number(adventurerBaseAttack),
			adventurerArmor: Number(adventurerArmor),
			adventurerBonusAttack: Number(adventurerBonusAttack),
			adventurerHealth: Number(adventurerHealth),
			adventurerDamage: Number(adventurerDamage),
			dungeonArmor: Number(2),
			dungeonDamage: Number(2),
			dungeonHealth: Number(10),
			dungeonToHit: Number(3),
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
			<div className={'absolute top-8 left-8 p-4 border-4 border-black flex flex-col z-50'}>
				<label className={'text-xss'}>{'DUNGEON_ARMOR'}</label>
				<input
					value={dungeon?.dungeonArmor}
					onChange={(e) => set_dungeon({...dungeon, dungeonArmor: Number(e.target.value)})}
					type={'number'}
					className={'w-28 bg-gray-principal my-1 text-xs p-2'} />
				<label className={'text-xss mt-2'}>{'DUNGEON_DAMAGE'}</label>
				<input
					value={dungeon?.dungeonDamage}
					onChange={(e) => set_dungeon({...dungeon, dungeonDamage: Number(e.target.value)})}
					type={'number'}
					className={'w-28 bg-gray-principal my-1 text-xs p-2'} />
				<label className={'text-xss mt-2'}>{'DUNGEON_HEALTH'}</label>
				<input
					value={dungeon?.dungeonHealth}
					onChange={(e) => set_dungeon({...dungeon, dungeonHealth: Number(e.target.value)})}
					type={'number'}
					className={'w-28 bg-gray-principal my-1 text-xs p-2'} />
				<label className={'text-xss mt-2'}>{'DUNGEON_TOHIT'}</label>
				<input
					value={dungeon?.dungeonToHit}
					onChange={(e) => set_dungeon({...dungeon, dungeonToHit: Number(e.target.value)})}
					type={'number'}
					className={'w-28 bg-gray-principal my-1 text-xs p-2'} />
			</div>
			{children}
		</DungeonContext.Provider>
	);
};

export const useDungeon = () => useContext(DungeonContext);
export default useDungeon;
