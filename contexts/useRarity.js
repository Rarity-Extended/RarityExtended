/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@MajorTom_eth
**	@Date:					Sunday September 5th 2021
**	@Filename:				useRarity.js
******************************************************************************/
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import	React, {useState, useEffect, useContext, createContext}	from	'react';
import	useWeb3													from	'contexts/useWeb3';
import	{ethers}												from	'ethers';
import	{Provider, Contract}									from	'ethcall';
import	useSWR, {useSWRConfig} 									from	'swr';

import	{chunk, fetcher, toAddress}										from	'utils';
import	RARITY_ABI												from	'utils/rarity.abi';
import	RARITY_ATTR_ABI											from	'utils/rarityAttr.abi';
import	RARITY_GOLD_ABI											from	'utils/rarityGold.abi';

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

	const	{mutate} = useSWRConfig();
	const	{data} = useSWR(active && address ? getRaritiesRequestURI : null, fetcher);

	//You rarities are you adventurers
	const	[rarities, set_rarities] = useState({});
	//Nonce used to force the re-render of the app
	const	[rNonce, set_rNonce] = React.useState(0);

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
		return [
			rarity.ownerOf(tokenID),
			rarity.summoner(tokenID),
			rarityAttr.character_created(tokenID),
			rarityAttr.ability_scores(tokenID),
			rarityGold.balanceOf(tokenID),
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
	function	setRarity(tokenID, multicallResult, callResult) {
		const	[owner, adventurer, initialAttributes, abilityScores, balanceOfGold] = multicallResult;
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
			}
		}}));
		set_rNonce(prev => prev + 1);
	}

	/**************************************************************************
	**	Prepare the rarities update from ftmscan result
	**************************************************************************/
	async function	updateRarities(elements) {
		const	preparedCalls = [];
		const	preparedExtraCalls = [];
		const	tokensIDs = [];
		elements?.forEach((token) => {
			preparedCalls.push(...prepareAdventurer(token.tokenID));
			preparedExtraCalls.push(...prepareAdventurerExtra(token.tokenID));
			tokensIDs.push(token.tokenID);
		});

		// preparedCalls.push(...prepareAdventurer(29010)); preparedExtraCalls.push(...prepareAdventurerExtra(29010)); tokensIDs.push(29010);

		const	callResults = await fetchAdventurer(preparedCalls);
		const	chunkedCallResult = chunk(callResults, 5);
		const	extraCallResults = await fetchAdventurerExtra(preparedExtraCalls);
		const	chunkedExtraCallResult = chunk(extraCallResults, 1);
		tokensIDs?.forEach((tokenID, i) => {
			setRarity(tokenID, chunkedCallResult[i], chunkedExtraCallResult[i]);
		});
	}

	/**************************************************************************
	**	Prepare the rarities update from in-app update
	**************************************************************************/
	async function	updateRarity(tokenID) {
		const	callResults = await fetchAdventurer(prepareAdventurer(tokenID));
		const	chunkedCallResult = chunk(callResults, 5);
		const	extraCallResults = await fetchAdventurerExtra(prepareAdventurerExtra(tokenID));
		const	chunkedExtraCallResult = chunk(extraCallResults, 1);
		setRarity(tokenID, chunkedCallResult[0], chunkedExtraCallResult[0]);
	}

	/**************************************************************************
	**	Trigger a re-fetch of the rarities from an in-app update
	**************************************************************************/
	async function	fetchRarity() {
		const {result} = await mutate(getRaritiesRequestURI);
		await updateRarities(result);
	}

	/**************************************************************************
	**	Once we got data from FTMScan, try to build the rarities
	**************************************************************************/
	useEffect(() => {
		if (data?.result && provider) {
			updateRarities(data?.result);
		}
	}, [data, provider]);

	return (
		<RarityContext.Provider
			value={{
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
