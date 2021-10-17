/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 5th 2021
**	@Filename:				useRarity.js
******************************************************************************/
/* eslint-disable react-hooks/exhaustive-deps */

import	React, {useState, useEffect, useContext, createContext}	from	'react';
import	useWeb3													from	'contexts/useWeb3';
import	{ethers}												from	'ethers';
import	{Provider, Contract}									from	'ethcall';
import	useSWR													from	'swr';
import	dayjs													from	'dayjs';
import	relativeTime											from	'dayjs/plugin/relativeTime';
import	ModalCurrentAdventurer									from	'components/ModalCurrentAdventurer';
import	{chunk, fetcher, toAddress}								from	'utils';
import	ITEMS													from	'utils/codex/items';
import	CLASSES													from	'utils/codex/classes';
import	RARITY_ABI												from	'utils/abi/rarity.abi';
import	RARITY_ATTR_ABI											from	'utils/abi/rarityAttr.abi';
import	RARITY_GOLD_ABI											from	'utils/abi/rarityGold.abi';
import	RARITY_SKILLS_ABI										from	'utils/abi/raritySkills.abi';
import	RARITY_FEATS_ABI										from	'utils/abi/rarityFeats.abi';
import	RARITY_CRAFTING_HELPER_ABI								from	'utils/abi/rarityCraftingHelper.abi';
import	THE_CELLAR_ABI											from	'utils/abi/dungeonTheCellar.abi';
import	THE_FOREST_ABI											from	'utils/abi/dungeonTheForest.abi';
import	OPENMIC_ABI													from	'utils/abi/dungeonOpenMic.abi';
import	EXTENDED_NAME_ABI										from	'utils/abi/rarityExtendedName.abi';
import	MANIFEST_GOODS											from	'utils/codex/items_manifest_goods.json';
import	MANIFEST_ARMORS											from	'utils/codex/items_manifest_armors.json';
import	MANIFEST_WEAPONS										from	'utils/codex/items_manifest_weapons.json';

dayjs.extend(relativeTime);

const	RarityContext = createContext();
let		isUpdatingRarities = false;

async function newEthCallProvider(provider, devMode) {
	const	ethcallProvider = new Provider();
	if (devMode) {
		await	ethcallProvider.init(new ethers.providers.JsonRpcProvider('http://localhost:8545'));
		ethcallProvider.multicallAddress = '0xc04d660976c923ddba750341fe5923e47900cf24';
		return ethcallProvider;
	}
	await	ethcallProvider.init(provider);
	return	ethcallProvider;
}

function	triggerNotification(title, options) {
	if (typeof(window) === 'undefined') {
		return;
	}
	if (!('Notification' in window)) {
		return;
	}

	if (Notification.permission !== 'granted') {
		Notification.requestPermission().then(permission => {
			if (permission === 'granted') {
				new Notification(title, options);
			}
		});
	} else {
		new Notification(title, options);
	}
}

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
	const	[currentAdventurer, set_currentAdventurer] = useState(null);
	const	[rarities, set_rarities] = useState({});
	const	[inventory, set_inventory] = useState({});
	const	[rNonce, set_rNonce] = useState(0);
	const	[loaded, set_loaded] = useState(false);
	const	[isModalOpen, set_isModalOpen] = useState(false);

	//NOTIFICATION SYSTEM
	useEffect(() => {
		Object.values(rarities).forEach((adventurer) => {
			if (!adventurer.logCanAdventure) {
				const	nowCanAdventure = dayjs(new Date(adventurer.log * 1000)).isBefore(dayjs(new Date(chainTime * 1000)));
				if (nowCanAdventure) {
					triggerNotification(
						`${adventurer.tokenID} IS READY FOR A NEW ADVENTURE`,
						{
							body: `Your adventurer ${adventurer.tokenID}, a ${CLASSES[currentAdventurer?.class].name} LVL ${currentAdventurer.level}, is ready for a new adventure!`,
							icon: CLASSES[currentAdventurer?.class].img,
							onclick: () => console.log('HELLLOOO')
						});
					set_rarities((prev) => ({...prev, [adventurer.tokenID]: {
						...prev[adventurer.tokenID],
						logCanAdventure: true,
					}}));
				}
			}
		});
	}, [chainTime]);

	/**************************************************************************
	**	Reset the rarities when the chain changes, when the address changes or
	**	when the web3 become inactive.
	**************************************************************************/
	useEffect(() => {
		set_rarities({});
		set_currentAdventurer(null);
		set_rNonce(n => n + 1);
		if (active && provider && address) {
			set_loaded(false);
			fetchRarity();
		}
	}, [active, address, chainID, provider]);

	async function	sharedCalls() {
		const	rarityCraftingHelper = new Contract(process.env.RARITY_CRAFTING_HELPER_ADDR, RARITY_CRAFTING_HELPER_ABI);
		const	ethcallProvider = await newEthCallProvider(provider, Number(chainID) === 1337);
		const	callResult = await ethcallProvider.all([
			rarityCraftingHelper.getItemsByAddress(address)
		]);
		return (callResult);
	}

	function	prepareSharedInventory(result) {
		result.forEach((item) => {
			if (item.base_type === 3) {
				set_inventory((prev) => ({...prev, [item.item_id]: {
					crafter: item.crafter.toString(),
					...Object.values(MANIFEST_WEAPONS).find(e => e.id === item.item_type),
				}}));
			}
			if (item.base_type === 2) {
				set_inventory((prev) => ({...prev, [item.item_id]: {
					crafter: item.crafter.toString(),
					...Object.values(MANIFEST_ARMORS).find(e => e.id === item.item_type),
				}}));
			}
			if (item.base_type === 1) {
				set_inventory((prev) => ({...prev, [item.item_id]: {
					crafter: item.crafter.toString(),
					...Object.values(MANIFEST_GOODS).find(e => e.id === item.item_type),
				}}));
			}
		});

	}

	/**************************************************************************
	**	Prepare the multicall to get most of the data
	**************************************************************************/
	function		prepareAdventurer(tokenID) {
		const	rarity = new Contract(process.env.RARITY_ADDR, RARITY_ABI);
		const	rarityAttr = new Contract(process.env.RARITY_ATTR_ADDR, RARITY_ATTR_ABI);
		const	rarityGold = new Contract(process.env.RARITY_GOLD_ADDR, RARITY_GOLD_ABI);
		const	raritySkills = new Contract(process.env.RARITY_SKILLS_ADDR, RARITY_SKILLS_ABI);
		const	rarityDungeonCellar = new Contract(process.env.DUNGEON_THE_CELLAR_ADDR, THE_CELLAR_ABI);
		const	rarityDungeonForest = new Contract(process.env.DUNGEON_THE_FOREST_ADDR, THE_FOREST_ABI);
		const	rarityDungeonOpenMic = new Contract(process.env.DUNGEON_OPEN_MIC_V1_ADDR, OPENMIC_ABI);
		const	rarityExtendedName = new Contract(process.env.RARITY_EXTENDED_NAME, EXTENDED_NAME_ABI);
		const	rarityFeats = new Contract(process.env.RARITY_FEATS_ADDR, RARITY_FEATS_ABI);

		return [
			rarity.ownerOf(tokenID),
			rarity.summoner(tokenID),
			rarityAttr.character_created(tokenID),
			rarityAttr.ability_scores(tokenID),
			rarityGold.balanceOf(tokenID),
			raritySkills.get_skills(tokenID),
			rarityFeats.get_feats_by_id(tokenID),
			rarityDungeonCellar.adventurers_log(tokenID),
			rarityDungeonCellar.scout(tokenID),
			rarityDungeonForest.getResearchBySummoner(tokenID),
			rarityDungeonOpenMic.getPrizes(tokenID),
			rarityDungeonOpenMic.timeToNextPerformance(tokenID),
			rarityExtendedName.get_name(tokenID)
		];
	}

	/**************************************************************************
	**	Fetch the data from the prepared multicall to get most of the data
	**************************************************************************/
	async function	fetchAdventurer(calls) {
		const	ethcallProvider = await newEthCallProvider(provider, Number(chainID) === 1337);
		const	callResult = await ethcallProvider.all(calls);
		return (callResult);
	}

	/**************************************************************************
	**	Prepare the multicall to get most of the data
	**************************************************************************/
	function		prepareAdventurerInventory(tokenID) {
		return ITEMS.map(item => item.fetch(tokenID));
	}

	/**************************************************************************
	**	Fetch all the items for the adventurer.
	**************************************************************************/
	async function	fetchAdventurerInventory(calls) {
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
	**	Prepare some extra data that can not be fetched with a multicall
	**	because of the msg.sender limitation
	**************************************************************************/
	function		prepareAdventurerExtra(tokenID) {
		const	rarityGold = new ethers.Contract(process.env.RARITY_GOLD_ADDR, RARITY_GOLD_ABI, provider).connect(provider.getSigner());
		return [
			rarityGold.claimable(tokenID)
		];
	}
	/**************************************************************************
	**	Fetch the data from the prepared extra call
	**************************************************************************/
	async function	fetchAdventurerExtra(calls) {
		const	results = await Promise.all(calls.map(p => p.catch(() => ethers.BigNumber.from(0))));
		return	results.map(result => (result instanceof Error) ? undefined : result);
	}

	/**************************************************************************
	**	Actually update the state based on the data fetched
	**************************************************************************/
	function		setRarity(tokenID, multicallResult, callResult, inventoryCallResult) {
		const	[owner, adventurer, initialAttributes, abilityScores, balanceOfGold, skills, feats, cellarLog, cellarScout, forestResearch, openMicPrizes, timeToNextOpenMic, name] = multicallResult;
		const	[claimableGold] = callResult;

		if (toAddress(owner) !== toAddress(address)) {
			return;
		}
		if (!currentAdventurer || (currentAdventurer && tokenID === currentAdventurer.tokenID)) {
			set_currentAdventurer(p => (!p || (p && tokenID === p.tokenID)) ? {
				tokenID: tokenID,
				owner: owner,
				name: name,
				xp: ethers.utils.formatEther(adventurer['_xp']),
				class: Number(adventurer['_class']),
				level: Number(adventurer['_level']),
				log: Number(adventurer['_log']),
				gold: {
					balance: ethers.utils.formatEther(balanceOfGold),
					claimable: claimableGold ? ethers.utils.formatEther(claimableGold) : '0'
				},
				attributes: {
					isInit: initialAttributes,
					remainingPoints: initialAttributes ? -1 : 32,
					strength: initialAttributes ? abilityScores['strength'] : 8,
					dexterity: initialAttributes ? abilityScores['dexterity'] : 8,
					constitution: initialAttributes ? abilityScores['constitution'] : 8,
					intelligence: initialAttributes ? abilityScores['intelligence'] : 8,
					wisdom: initialAttributes ? abilityScores['wisdom'] : 8,
					charisma: initialAttributes ? abilityScores['charisma'] : 8,
				},
				skills: skills,
				dungeons: {
					cellar: {
						log: Number(cellarLog),
						scout: Number(cellarScout),
					},
					forest: {
						initBlockTs: forestResearch?.initBlockTs,
						endBlockTs: forestResearch?.endBlockTs,
						canAdventure: Number(forestResearch?.endBlockTs) <= chainTime && (forestResearch?.discovered === true || Number(forestResearch?.timeInDays) === 0)
					},
					openMic: {
						prizes: openMicPrizes,
						timeToNextPerformance: timeToNextOpenMic
					}
				},
				inventory: inventoryCallResult
			} : p);
		}

		set_rarities((prev) => ({...prev, [tokenID]: {
			tokenID: tokenID,
			owner: owner,
			name: name,
			xp: ethers.utils.formatEther(adventurer['_xp']),
			class: Number(adventurer['_class']),
			level: Number(adventurer['_level']),
			log: Number(adventurer['_log']),
			logCanAdventure: dayjs(new Date(Number(adventurer['_log']) * 1000)).isBefore(dayjs(new Date(chainTime * 1000))),
			gold: {
				balance: ethers.utils.formatEther(balanceOfGold),
				claimable: claimableGold ? ethers.utils.formatEther(claimableGold) : '0'
			},
			attributes: {
				isInit: initialAttributes,
				remainingPoints: initialAttributes ? -1 : 32,
				strength: initialAttributes ? abilityScores['strength'] : 8,
				dexterity: initialAttributes ? abilityScores['dexterity'] : 8,
				constitution: initialAttributes ? abilityScores['constitution'] : 8,
				intelligence: initialAttributes ? abilityScores['intelligence'] : 8,
				wisdom: initialAttributes ? abilityScores['wisdom'] : 8,
				charisma: initialAttributes ? abilityScores['charisma'] : 8,
			},
			skills: skills,
			feats: (feats || []).map(f => Number(f)),
			dungeons: {
				cellar: {
					log: Number(cellarLog),
					scout: Number(cellarScout),
				},
				forest: {
					initBlockTs: forestResearch?.initBlockTs,
					endBlockTs: forestResearch?.endBlockTs,
					canAdventure: Number(forestResearch?.endBlockTs) <= chainTime && (forestResearch?.discovered === true || Number(forestResearch?.timeInDays) === 0)
				},
				openMic: {
					prizes: openMicPrizes,
					timeToNextPerformance: timeToNextOpenMic
				}
			},
			inventory: inventoryCallResult
		}}));
		set_rNonce(prev => prev + 1);
	}

	/**************************************************************************
	**	Prepare the rarities update from ftmscan result
	**************************************************************************/
	async function	updateRarities(elements) {
		if (isUpdatingRarities) {
			return;
		}
		isUpdatingRarities = true;
		const	preparedCalls = [];
		const	preparedExtraCalls = [];
		const	preparedInventoryCalls = [];
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

		uniqueElements?.forEach((token) => {
			preparedCalls.push(...prepareAdventurer(token.tokenID));
			preparedExtraCalls.push(...prepareAdventurerExtra(token.tokenID));
			preparedInventoryCalls.push(...prepareAdventurerInventory(token.tokenID));
			tokensIDs.push(token.tokenID);
		});

		const	callResults = await fetchAdventurer(preparedCalls);
		const	chunkedCallResult = chunk(callResults, 13);
		const	extraCallResults = await fetchAdventurerExtra(preparedExtraCalls);
		const	chunkedExtraCallResult = chunk(extraCallResults, 1);
		const	inventoryCallResult = await fetchAdventurerInventory(preparedInventoryCalls);
		const	chunkedinventoryCallResult = chunk(inventoryCallResult, ITEMS.length);
		tokensIDs?.forEach((tokenID, i) => {
			setRarity(tokenID, chunkedCallResult[i], chunkedExtraCallResult[i], chunkedinventoryCallResult[i]);
		});
		sharedCalls().then(result => prepareSharedInventory(result[0]));

		set_loaded(true);
		isUpdatingRarities = false;
	}

	/**************************************************************************
	**	Prepare the rarity update from in-app update
	**************************************************************************/
	async function	updateRarity(tokenID) {
		const	callResults = await fetchAdventurer(prepareAdventurer(tokenID));
		const	chunkedCallResult = chunk(callResults, 11);
		const	extraCallResults = await fetchAdventurerExtra(prepareAdventurerExtra(tokenID));
		const	chunkedExtraCallResult = chunk(extraCallResults, 1);
		const	inventoryCallResult = await fetchAdventurerInventory(prepareAdventurerInventory(tokenID));
		const	chunkedinventoryCallResult = chunk(inventoryCallResult, ITEMS.length);
		setRarity(tokenID, chunkedCallResult[0], chunkedExtraCallResult[0], chunkedinventoryCallResult[0]);
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
		const	preparedExtraCalls = [];
		const	preparedInventoryCalls = [];
		const	tokensIDs = [];

		elements?.forEach((token) => {
			preparedCalls.push(...prepareAdventurer(token));
			preparedExtraCalls.push(...prepareAdventurerExtra(token));
			preparedInventoryCalls.push(...prepareAdventurerInventory(token));
			tokensIDs.push(token);
		});

		const	callResults = await fetchAdventurer(preparedCalls);
		const	chunkedCallResult = chunk(callResults, 9);
		const	extraCallResults = await fetchAdventurerExtra(preparedExtraCalls);
		const	chunkedExtraCallResult = chunk(extraCallResults, 1);
		const	inventoryCallResult = await fetchAdventurerInventory(preparedInventoryCalls);
		const	chunkedinventoryCallResult = chunk(inventoryCallResult, ITEMS.length);
		tokensIDs?.forEach((tokenID, i) => {
			setRarity(tokenID, chunkedCallResult[i], chunkedExtraCallResult[i], chunkedinventoryCallResult[i]);
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
			setTimeout(() => !active ? set_loaded(true) : null, 10000); //10s before unlock
	}, [loaded]);

	return (
		<RarityContext.Provider
			value={{
				isLoaded: loaded,
				rarities,
				inventory,
				currentAdventurer,
				set_currentAdventurer,
				updateRarity,
				updateBatchRarity,
				fetchRarity,
				rNonce,
				openCurrentAventurerModal: () => set_isModalOpen(true)
			}}>
			{children}
			<ModalCurrentAdventurer isOpen={isModalOpen} closeModal={() => set_isModalOpen(false)} />
		</RarityContext.Provider>
	);
};

export const useRarity = () => useContext(RarityContext);
export default useRarity;
