/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 5th 2021
**	@Filename:				useDungeons.js
******************************************************************************/

import	React, {useState, useContext, createContext}	from	'react';
import	{ethers}										from	'ethers';
import	{Contract}										from	'ethcall';
import	dayjs											from	'dayjs';
import	relativeTime									from	'dayjs/plugin/relativeTime';
import	duration										from	'dayjs/plugin/duration';
import	useWeb3											from	'contexts/useWeb3';
import	useRarity										from	'contexts/useRarity';
import	useIndexDB										from	'hooks/useIDB';
import	performBatchedUpdates							from	'utils/performBatchedUpdates';
import	{chunk, newEthCallProvider}						from	'utils';

dayjs.extend(relativeTime);
dayjs.extend(duration);

const	DungeonContext = createContext();
export const DungeonsContextApp = ({children}) => {
	const	{chainID, chainTime, provider} = useWeb3();
	const	{rarities, isLoaded} = useRarity();
	const	[initialFetchSet, set_initialFetchSet] = useState(false);
	const	[dungeons, set_dungeons] = useIndexDB('dunegons', {});

	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	Prepare the calls for all the dungeons for the adventurers. This is a 3 steps process.
	**	1. Listen to update of `rarities` and for each adventurer, do the following
	**	2. Prepare the multicall for the tokenID
	**	3. Parse and assign the multicall result
	**********************************************************************************************/
	function		prepareDungeons(tokenID) {
		const	rarityDungeonCellar = new Contract(process.env.DUNGEON_THE_CELLAR_ADDR, process.env.DUNGEON_THE_CELLAR_ABI);
		const	rarityDungeonForest = new Contract(process.env.DUNGEON_THE_FOREST_ADDR, process.env.DUNGEON_THE_FOREST_ABI);
		const	rarityDungeonBoars = new Contract(process.env.DUNGEON_BOARS_ADDR, process.env.DUNGEON_BOARS_ABI);
		const	rarityDungeonOpenMic = new Contract(process.env.DUNGEON_OPEN_MIC_V2_ADDR, process.env.DUNGEON_OPEN_MIC_V2_ABI);

		return [
			rarityDungeonCellar.adventurers_log(tokenID),
			rarityDungeonCellar.scout(tokenID),
			rarityDungeonForest.getResearchBySummoner(tokenID),
			rarityDungeonBoars.actions_log(tokenID),
			rarityDungeonOpenMic.timeToNextPerformance(tokenID),
		];
	}

	/**************************************************************************
	**	Actually update the state based on the data fetched
	**************************************************************************/
	async function	assignDungeons(adventurer, multicallResult) {
		const	[cellarLog, cellarScout, forestResearch, boarsLog, timeToNextOpenMic] = multicallResult;

		const	_dungeons = {
			cellar: {
				log: Number(cellarLog),
				scout: Number(cellarScout),
				nextAdventure: Number(cellarLog) === 0 ? 'Now' : dayjs(new Date(Number(cellarLog) * 1000)).from(dayjs(new Date(chainTime * 1000))),
				canAdventure: dayjs(new Date(Number(cellarLog) * 1000)).isBefore(dayjs(new Date(chainTime * 1000))),
			},
			boars: {
				log: Number(boarsLog),
				nextAdventure: Number(boarsLog) === 0 ? 'Now' : dayjs(new Date(Number(boarsLog) * 1000)).from(dayjs(new Date(chainTime * 1000))),
				canAdventure: dayjs(new Date(Number(boarsLog) * 1000)).isBefore(dayjs(new Date(chainTime * 1000))),
			},
			forest: {
				initBlockTs: forestResearch?.initBlockTs,
				endBlockTs: forestResearch?.endBlockTs,
				nextAdventure: Number(forestResearch?.endBlockTs) === 0 ? 'Now' : dayjs(new Date(Number(forestResearch?.endBlockTs) * 1000)).from(dayjs(new Date(chainTime * 1000))),
				canAdventure: Number(forestResearch?.endBlockTs) <= chainTime && (forestResearch?.discovered === true || Number(forestResearch?.timeInDays) === 0)
			},
			openMic: {
				nextAdventure: Number(adventurer.class) === 2 && Number(adventurer.level) >= 2 ? dayjs.duration({seconds: ethers.BigNumber.from(timeToNextOpenMic).toNumber()}).humanize(true) : null,
				canAdventure: (
					Number(adventurer.class) === 2 &&
						Number(adventurer.level) >= 2 &&
						ethers.BigNumber.from(timeToNextOpenMic).toNumber() <= 0
				),
				timeToNextPerformance: timeToNextOpenMic
			}
		};
		set_dungeons((prev) => ({...prev, [adventurer.tokenID]: _dungeons}));
	}

	/**************************************************************************
	**	Prepare the rarities update from ftmscan result
	**************************************************************************/
	const	updateDungeons = React.useCallback(async (adventurers) => {
		if (!adventurers || adventurers.length === 0) {
			return;
		}

		const	ethcallProvider = await newEthCallProvider(provider, Number(chainID) === 1337);
		let		chunckLen = 0;
		const	preparedDungeonsCalls = [];
		for (let index = 0; index < adventurers.length; index++) {
			const	adventurer = adventurers[index];
			const	tokenID = adventurer.tokenID;
			const	calls = prepareDungeons(tokenID);
			if (chunckLen === 0)
				chunckLen = calls.length;
			preparedDungeonsCalls.push(...calls);
		}

		const	callResults = await ethcallProvider.tryAll(preparedDungeonsCalls);
		const	chunkedCallResult = chunk(callResults, chunckLen);
		performBatchedUpdates(() => {
			for (let index = 0; index < chunkedCallResult.length; index++) {
				const callResult = chunkedCallResult[index];
				assignDungeons(adventurers[index], callResult);
			}
		});
	}, [chainID, provider]);

	React.useEffect(() => {
		if (!isLoaded || initialFetchSet)
			return;
		set_initialFetchSet(true);
		updateDungeons(Object.values(rarities || {}));
	}, [rarities, updateDungeons, isLoaded, initialFetchSet]);


	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	Prepare the calls to update a specific adventurer. This should be called once a tx to do an
	**	action in one of the dungeon is done.
	**********************************************************************************************/
	async function updateDungeonForOne(adventurer) {
		if (!adventurer || !provider) {
			return;
		}
		const	ethcallProvider = await newEthCallProvider(provider, Number(chainID) === 1337);
		const	preparedDunegonsCalls = prepareDungeons(adventurer.tokenID);
		const	callResults = await ethcallProvider.tryAll(preparedDunegonsCalls);
		assignDungeons(adventurer, callResults);
	}

	return (
		<DungeonContext.Provider
			value={{
				dungeons,
				updateDungeonForOne
			}}>
			{children}
		</DungeonContext.Provider>
	);
};

export const useDungeons = () => useContext(DungeonContext);
export default useDungeons;
