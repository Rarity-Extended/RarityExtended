/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@MajorTom_eth
**	@Date:					Sunday September 5th 2021
**	@Filename:				useRarity.js
******************************************************************************/
/* eslint-disable react-hooks/exhaustive-deps */

import	React, {useState, useEffect, useContext, createContext}	from	'react';
import	useWeb3													from	'contexts/useWeb3';
import	{ethers}												from	'ethers';
import	{Provider, Contract}									from	'ethcall';
import	useSWR													from	'swr';
import	{chunk, fetcher, toAddress}								from	'utils';
import	ITEMS													from	'utils/items';
import	RARITY_ABI												from	'utils/rarity.abi';
import	RARITY_ATTR_ABI											from	'utils/rarityAttr.abi';
import	RARITY_GOLD_ABI											from	'utils/rarityGold.abi';
import	THE_CELLAR_ABI											from	'utils/dungeonTheCellar.abi';

const	RarityContext = createContext();

async function newEthCallProvider(provider) {
	const	ethcallProvider = new Provider();
	await	ethcallProvider.init(provider);
	return	ethcallProvider;
}

export const RarityContextApp = ({children}) => {
	const	{active, address, chainID, provider} = useWeb3();
	const	getRaritiesRequestURI = `
		https://api.ftmscan.com/api
		?module=account
		&action=tokennfttx
		&contractaddress=${process.env.RARITY_ADDR}
		&address=${address}
		&apikey=${process.env.FMT_KEY}`;
	const	{data} = useSWR(active && address ? getRaritiesRequestURI : null, fetcher);

	const	[rarities, set_rarities] = useState({});
	const	[rNonce, set_rNonce] = useState(0);
	const	[loaded, set_loaded] = useState(false);

	/**************************************************************************
	**	Reset the rarities when the chain changes, when the address changes or
	**	when the web3 become inactive.
	**************************************************************************/
	useEffect(() => {
		set_rarities({});
		set_rNonce(n => n + 1);
	}, [active, address, chainID]);

	/**************************************************************************
	**	Prepare the multicall to get most of the data
	**************************************************************************/
	function		prepareAdventurer(tokenID) {
		const	rarity = new Contract(process.env.RARITY_ADDR, RARITY_ABI);
		const	rarityAttr = new Contract(process.env.RARITY_ATTR_ADDR, RARITY_ATTR_ABI);
		const	rarityGold = new Contract(process.env.RARITY_GOLD_ADDR, RARITY_GOLD_ABI);
		const	rarityDungeonCellar = new Contract(process.env.DUNGEON_THE_CELLAR_ADDR, THE_CELLAR_ABI);

		return [
			rarity.ownerOf(tokenID),
			rarity.summoner(tokenID),
			rarityAttr.character_created(tokenID),
			rarityAttr.ability_scores(tokenID),
			rarityGold.balanceOf(tokenID),
			rarityDungeonCellar.balanceOf(tokenID),
			rarityDungeonCellar.adventurers_log(tokenID),
		];
	}
	/**************************************************************************
	**	Fetch the data from the prepared multicall to get most of the data
	**************************************************************************/
	async function	fetchAdventurer(calls) {
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
	**	Prepare the multicall to get most of the data
	**************************************************************************/
	function		prepareAdventurerInventory(tokenID) {
		return ITEMS.map(item => new Contract(item.address, RARITY_GOLD_ABI).balanceOf(tokenID));
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
	function	setRarity(tokenID, multicallResult, callResult, inventoryCallResult) {
		const	[owner, adventurer, initialAttributes, abilityScores, balanceOfGold, balanceOfCellar, cellarLog] = multicallResult;
		const	[claimableGold] = callResult;

		if (toAddress(owner) !== toAddress(address)) {
			return;
		}
		set_rarities((prev) => ({...prev, [tokenID]: {
			tokenID: tokenID,
			owner: owner,
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
			dungeons: {
				cellar: Number(cellarLog),
			},
			inventory: inventoryCallResult.map(item => Number(item))
		}}));
		set_rNonce(prev => prev + 1);
	}

	/**************************************************************************
	**	Prepare the rarities update from ftmscan result
	**************************************************************************/
	async function	updateRarities(elements) {
		const	preparedCalls = [];
		const	preparedExtraCalls = [];
		const	preparedInventoryCalls = [];
		const	tokensIDs = [];
		elements?.forEach((token) => {
			preparedCalls.push(...prepareAdventurer(token.tokenID));
			preparedExtraCalls.push(...prepareAdventurerExtra(token.tokenID));
			preparedInventoryCalls.push(...prepareAdventurerInventory(token.tokenID));
			tokensIDs.push(token.tokenID);
		});

		// preparedCalls.push(...prepareAdventurer(258181)); preparedExtraCalls.push(...prepareAdventurerExtra(258181)); tokensIDs.push(258181);

		const	callResults = await fetchAdventurer(preparedCalls);
		const	chunkedCallResult = chunk(callResults, 7);
		const	extraCallResults = await fetchAdventurerExtra(preparedExtraCalls);
		const	chunkedExtraCallResult = chunk(extraCallResults, 1);
		const	inventoryCallResult = await fetchAdventurerInventory(preparedInventoryCalls);
		const	chunkedinventoryCallResult = chunk(inventoryCallResult, ITEMS.length);

		tokensIDs?.forEach((tokenID, i) => {
			setRarity(tokenID, chunkedCallResult[i], chunkedExtraCallResult[i], chunkedinventoryCallResult[i]);
		});
		set_loaded(true);
	}

	/**************************************************************************
	**	Prepare the rarities update from in-app update
	**************************************************************************/
	async function	updateRarity(tokenID) {
		const	callResults = await fetchAdventurer(prepareAdventurer(tokenID));
		const	chunkedCallResult = chunk(callResults, 7);
		const	extraCallResults = await fetchAdventurerExtra(prepareAdventurerExtra(tokenID));
		const	chunkedExtraCallResult = chunk(extraCallResults, 1);
		const	inventoryCallResult = await fetchAdventurerInventory(prepareAdventurerInventory(tokenID));
		const	chunkedinventoryCallResult = chunk(inventoryCallResult, ITEMS.length);
		setRarity(tokenID, chunkedCallResult[0], chunkedExtraCallResult[0], chunkedinventoryCallResult[0]);
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

	return (
		<RarityContext.Provider
			value={{
				isLoaded: loaded,
				rarities,
				updateRarity,
				fetchRarity,
				rNonce,
			}}>
			{children}
		</RarityContext.Provider>
	);
};

export const useRarity = () => useContext(RarityContext);
export default useRarity;
