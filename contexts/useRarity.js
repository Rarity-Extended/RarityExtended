/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 5th 2021
**	@Filename:				useRarity.js
******************************************************************************/

import	React, {useState, useEffect, useContext, createContext}	from	'react';
import	NProgress												from	'nprogress';
import	{ethers}												from	'ethers';
import	{Contract}												from	'ethcall';
import	useSWR													from	'swr';
import	dayjs													from	'dayjs';
import	relativeTime											from	'dayjs/plugin/relativeTime';
import	duration												from	'dayjs/plugin/duration';
import	useWeb3													from	'contexts/useWeb3';
import 	ModalSelectAdventurer 									from	'components/modals/ModalSelectAdventurer';
import	useIndexDB												from	'hook/useIDB';
import	performBatchedUpdates									from	'utils/performBatchedUpdates';
import	{chunk, fetcher, toAddress, newEthCallProvider}			from	'utils';
import	CLASSES													from	'utils/codex/core/classes';

dayjs.extend(relativeTime);
dayjs.extend(duration);

let isUpdatingRarities = false;

const	isEmptyObject = (obj) => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
const	RarityContext = createContext();
export const RarityContextApp = ({children}) => {
	const	{active, address, chainID, chainTime, provider} = useWeb3();
	const	getRaritiesRequestURI = `
		https://api.ftmscan.com/api
		?module=account
		&action=tokennfttx
		&contractaddress=${process.env.RARITY_ADDR}
		&address=${address}
		&apikey=${process.env.FMT_KEY}`;
	const	{data} = useSWR(active && address ? getRaritiesRequestURI : null, fetcher);
	const	[currentAdventurer, set_currentAdventurer] = useIndexDB('currentAdventurer', null);
	const	[rarities, set_rarities] = useIndexDB('adventurers', {});
	const	[skins, set_skins] = useIndexDB('adventurersSkins', {});
	const	[specialApprovals, set_specialApprovals] = useState(null);
	const	[loaded, set_loaded] = useState(false);
	const	[isModalOpen, set_isModalOpen] = useState(false);

	async function	fetchRaritySkins(tokensIDs) {
		const	raritySkinHelper = new Contract(process.env.RARITY_EXTENDED_SKIN_HELPER_ADDR, process.env.RARITY_EXTENDED_SKIN_HELPER_ABI);
		const	ethcallProvider = await newEthCallProvider(provider, Number(chainID) === 1337);

		const	calls = [];
		for (let index = 0; index < tokensIDs.length; index++) {
			calls.push(raritySkinHelper.getAdventurerSkin(tokensIDs[index]));
		}
		const callResult = await ethcallProvider.tryAll(calls);
		performBatchedUpdates(() => {
			for (let index = 0; index < tokensIDs.length; index++) {
				const tokenID = tokensIDs[index];
				const element = callResult[index];
				set_skins((prev) => ({...prev, [tokenID]: element ? JSON.parse(element).image : ''}));
			}
		});
	}


	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	Check if some approval are made or not to avoid fetching theses data on the page and create
	**	a delay/bad visual effect.
	**********************************************************************************************/
	const	checkSpecialApprovals = React.useCallback(async () => {
		if (!provider || !address) {
			return;
		}
		const	ethcallProvider = await newEthCallProvider(provider, Number(chainID) === 1337);
		const	rarity = new Contract(process.env.RARITY_ADDR, process.env.RARITY_ABI);
		const	calls = [
			rarity.isApprovedForAll(address, process.env.RARITY_CRAFTING_HELPER_ADDR),
			rarity.isApprovedForAll(address, process.env.RARITY_COOKING_HELPER_ADDR),
		];
		const	callResults = await ethcallProvider.tryAll(calls);
		performBatchedUpdates(() => {
			set_specialApprovals({
				[process.env.RARITY_CRAFTING_HELPER_ADDR]: callResults[0],
				[process.env.RARITY_COOKING_HELPER_ADDR]: callResults[1],
			});
		});
	}, [address, provider]);
	React.useEffect(() => checkSpecialApprovals(), [checkSpecialApprovals]);

	/**************************************************************************
	**	Prepare the multicall to get most of the data
	**************************************************************************/
	function		prepareAdventurer(tokenID) {
		const	rarity = new Contract(process.env.RARITY_ADDR, process.env.RARITY_ABI);
		const	rarityAttr = new Contract(process.env.RARITY_ATTR_ADDR, process.env.RARITY_ATTR_ABI);
		const	rarityGold = new Contract(process.env.RARITY_GOLD_ADDR, process.env.RARITY_GOLD_ABI);
		const	raritySkills = new Contract(process.env.RARITY_SKILLS_ADDR, process.env.RARITY_SKILLS_ABI);
		const	rarityFeats = new Contract(process.env.RARITY_FEATS_ADDR, process.env.RARITY_FEATS_ABI);
		const	rarityDungeonCellar = new Contract(process.env.DUNGEON_THE_CELLAR_ADDR, process.env.DUNGEON_THE_CELLAR_ABI);
		const	rarityDungeonForest = new Contract(process.env.DUNGEON_THE_FOREST_ADDR, process.env.DUNGEON_THE_FOREST_ABI);
		const	rarityExtendedName = new Contract(process.env.RARITY_EXTENDED_NAME, process.env.RARITY_EXTENDED_NAME_ABI);
		const	rarityDungeonBoars = new Contract(process.env.DUNGEON_BOARS_ADDR, process.env.DUNGEON_BOARS_ABI);
		const	rarityDungeonOpenMic = new Contract(process.env.DUNGEON_OPEN_MIC_V2_ADDR, process.env.DUNGEON_OPEN_MIC_V2_ABI);

		return [
			rarity.ownerOf(tokenID),
			rarity.summoner(tokenID),
			rarityExtendedName.get_name(tokenID),
			rarityAttr.character_created(tokenID),
			rarityAttr.ability_scores(tokenID),
			rarityAttr.level_points_spent(tokenID),
			rarityGold.balanceOf(tokenID),
			rarityGold.claimable(tokenID),
			raritySkills.get_skills(tokenID),
			rarityFeats.get_feats_by_id(tokenID),
			rarityDungeonCellar.adventurers_log(tokenID),
			rarityDungeonCellar.scout(tokenID),
			rarityDungeonForest.getResearchBySummoner(tokenID),
			rarityDungeonBoars.actions_log(tokenID),
			rarityDungeonOpenMic.timeToNextPerformance(tokenID),
		];
	}

	/**************************************************************************
	**	Fetch all the items for the adventurer.
	**************************************************************************/
	async function	multicall(calls) {
		const	ethcallProvider = await newEthCallProvider(provider, Number(chainID) === 1337);
		const	callResult = await ethcallProvider.tryAll(calls);
		return (callResult);
	}

	/**************************************************************************
	**	Actually update the state based on the data fetched
	**************************************************************************/
	async function	setRarity(tokenID, multicallResult) {
		const	[
			owner, adventurer, name,
			initialAttributes, abilityScores, extraPointsSpents,
			balanceOfGold, claimableGold,
			skills, feats,
			cellarLog, cellarScout, forestResearch, boarsLog, timeToNextOpenMic,
		] = multicallResult;

		if (toAddress(owner) !== toAddress(address)) {
			set_rarities((prev) => {
				delete prev[tokenID];
				return ({...prev});
			});
			return;
		}

		const	_adventurer = {
			tokenID: tokenID,
			owner: owner,
			name: name,
			displayName: `${name ? name : tokenID}, ${CLASSES[Number(adventurer['_class'])]?.name} LVL ${Number(adventurer['_level'])}`,
			xp: ethers.utils.formatEther(adventurer['_xp']),
			class: Number(adventurer['_class']),
			level: Number(adventurer['_level']),
			log: Number(adventurer['_log']),
			nextAdventure: Number(adventurer['_log']) === 0 ? 'Now' : dayjs(new Date(Number(adventurer['_log']) * 1000)).from(dayjs(new Date(chainTime * 1000))),
			canAdventure: dayjs(new Date(Number(adventurer['_log']) * 1000)).isBefore(dayjs(new Date(chainTime * 1000))),
			gold: {
				balance: ethers.utils.formatEther(balanceOfGold),
				claimable: claimableGold ? ethers.utils.formatEther(claimableGold) : '0'
			},
			attributes: {
				isInit: initialAttributes,
				remainingPoints: initialAttributes ? -1 : 32,
				extraPointsSpents: Number(extraPointsSpents),
				extraPoints: Math.floor(Number(adventurer['_level']) / 4),
				strength: initialAttributes ? abilityScores['strength'] : 8,
				dexterity: initialAttributes ? abilityScores['dexterity'] : 8,
				constitution: initialAttributes ? abilityScores['constitution'] : 8,
				intelligence: initialAttributes ? abilityScores['intelligence'] : 8,
				wisdom: initialAttributes ? abilityScores['wisdom'] : 8,
				charisma: initialAttributes ? abilityScores['charisma'] : 8,
			},
			skills: skills,
			feats: (feats || []).map(f => Number(f)),
			skin: CLASSES[Number(adventurer['_class'])]?.images?.front,
			adventures: {
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
					nextAdventure: Number(adventurer['_class']) === 2 && Number(adventurer['_level']) >= 2 ? dayjs.duration({seconds: ethers.BigNumber.from(timeToNextOpenMic).toNumber()}).humanize(true) : null,
					canAdventure: (
						Number(adventurer['_class']) === 2 &&
						Number(adventurer['_level']) >= 2 &&
						ethers.BigNumber.from(timeToNextOpenMic).toNumber() <= 0
					),
					timeToNextPerformance: timeToNextOpenMic
				}
			}
		};

		//Hack to bactch all of this in only 1 render
		if (!currentAdventurer || (currentAdventurer && tokenID === currentAdventurer.tokenID)) {
			set_currentAdventurer(p => (!p || (p && tokenID === p.tokenID)) ? _adventurer : p);
		}
		set_rarities((prev) => ({...prev, [tokenID]: _adventurer}));
	}

	/**************************************************************************
	**	Prepare the rarities update from ftmscan result
	**************************************************************************/
	async function	updateRarities(elements) {
		if (isUpdatingRarities) {
			return;
		}
		NProgress.start();
		isUpdatingRarities = true;
		const	preparedCalls = [];
		const	tokensIDs = [];

		let		uniqueElements = [];
		for (let i = 0; i < elements.length; i++) {
			const	element = elements[i];
			if (toAddress(element.to) !== toAddress(address)) {
				uniqueElements = uniqueElements.filter(e => e.tokenID !== element.tokenID);
			} else {
				uniqueElements.push(element);
			}
		}

		const	chunkSize = prepareAdventurer(0).length;
		uniqueElements?.forEach((token) => {
			preparedCalls.push(...prepareAdventurer(token.tokenID));
			tokensIDs.push(token.tokenID);
		});

		const	callResults = await multicall(preparedCalls);
		const	chunkedCallResult = chunk(callResults, chunkSize);
		performBatchedUpdates(() => {
			tokensIDs?.forEach((tokenID, i) => {
				setRarity(tokenID, chunkedCallResult[i]);
			});
		});
		isUpdatingRarities = false;
		NProgress.done();
		
		//Extra stuffs
		fetchRaritySkins(tokensIDs);
	}

	/**************************************************************************
	**	Prepare the rarity update from in-app update
	**************************************************************************/
	async function	updateRarity(tokenID) {
		const	chunkSize = prepareAdventurer(0).length;
		const	callResults = await multicall(prepareAdventurer(tokenID));
		const	chunkedCallResult = chunk(callResults, chunkSize);
		setRarity(tokenID, chunkedCallResult[0]);
	}

	/**************************************************************************
	**	Prepare the rarities update from in-app update
	**************************************************************************/
	async function	updateBatchRarity(elements, callback = () => null) {
		if (isUpdatingRarities) {
			return;
		}
		isUpdatingRarities = true;
		const	preparedCalls = [];
		const	tokensIDs = [];

		const	chunkSize = prepareAdventurer(0).length;
		elements?.forEach((token) => {
			preparedCalls.push(...prepareAdventurer(token));
			tokensIDs.push(token);
		});

		const	callResults = await multicall(preparedCalls);
		const	chunkedCallResult = chunk(callResults, chunkSize);
		performBatchedUpdates(() => {
			tokensIDs?.forEach((tokenID, i) => {
				setRarity(tokenID, chunkedCallResult[i]);
			});
		});
		isUpdatingRarities = false;
		callback();
	}

	/**************************************************************************
	**	Trigger a re-fetch of the rarities from an in-app update
	**************************************************************************/
	async function	fetchRarity() {
		const {result} = await fetcher(`https://api.ftmscan.com/api
			?module=account
			&action=tokennfttx
			&contractaddress=${process.env.RARITY_ADDR}
			&address=${address}
			&apikey=${process.env.FMT_KEY}`);
		await updateRarities(result);
	}



	useEffect(() => {
		if (!isEmptyObject(rarities) && address && active) {
			set_loaded(true);
		}
	}, [rarities, address, active]);

	/**************************************************************************
	**	Reset the rarities when the chain changes, when the address changes or
	**	when the web3 become inactive.
	**************************************************************************/
	useEffect(() => {
		if (active && provider && address) {
			fetchRarity();
		}
	}, [active, address, chainID, provider]);

	/**************************************************************************
	**	Once we got data from FTMScan, try to build the rarities
	**************************************************************************/
	useEffect(() => {
		if (data?.result && provider) {
			if (data?.status === 0) {
				return setTimeout(() => fetchRarity(), 100);
			}
			updateRarities(data?.result);
		}
	}, [data, provider]);

	useEffect(() => {
		if (loaded === false)
			setTimeout(() => !active ? set_loaded(true) : null, 5000); //5s before unlock
	}, [active, loaded]);

	return (
		<RarityContext.Provider
			value={{
				isLoaded: loaded,
				rarities,
				skins,
				currentAdventurer,
				set_currentAdventurer,
				updateRarity,
				updateBatchRarity,
				fetchRarity,
				specialApprovals, set_specialApprovals,
				openCurrentAventurerModal: () => set_isModalOpen(true)
			}}>
			{children}
			<ModalSelectAdventurer 
				isOpen={isModalOpen} 
				onClose={() => set_isModalOpen(false)} 
				onSelect={(adventurer) => set_currentAdventurer(adventurer)}>
			</ModalSelectAdventurer>
		</RarityContext.Provider>
	);
};

export const useRarity = () => useContext(RarityContext);
export default useRarity;
