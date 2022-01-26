/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 5th 2021
**	@Filename:				useRarity.js
******************************************************************************/

import	React, {useState, useContext, createContext}	from	'react';
import	{ethers}										from	'ethers';
import	{Contract}										from	'ethcall';
import	useWeb3											from	'contexts/useWeb3';
import	useRarity										from	'contexts/useRarity';
import	{chunk, newEthCallProvider}						from	'utils';
import	* as ITEMS										from	'utils/codex/items/items';
import	MANIFEST_GOODS									from	'utils/codex/items/items_manifest_goods.json';
import	MANIFEST_ARMORS									from	'utils/codex/items/items_manifest_armors.json';
import	MANIFEST_WEAPONS								from	'utils/codex/items/items_manifest_weapons.json';
import	MANIFEST_SHIELDS								from	'utils/codex/items/items_manifest_shields.json';

const	MEAL_ABI = [
	{'inputs': [{'internalType': 'uint256','name': 'summonerId','type': 'uint256'}],'name': 'getTotalMealsBySummoner','outputs': [{'components': [{'internalType': 'address','name': 'meal','type': 'address'},{'internalType': 'uint256[]','name': 'balance','type': 'uint256[]'}],'internalType': 'struct Cooking.MealBalance[]','name': '','type': 'tuple[]'}],'stateMutability': 'view','type': 'function'},
];

const	InventoryContext = createContext();
export const InventoryContextApp = ({children}) => {
	const	{address, chainID, provider} = useWeb3();
	const	{rarities, isLoaded} = useRarity();
	const	[inventory, set_inventory] = useState({});
	const	[sharedInventory, set_sharedInventory] = useState({});
	const	[nonce, set_nonce] = useState(0);

	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	Some elements are share between all the adventurers, aka linked to the address and not the
	**	adventurer. We need to fetch that and assign it.
	**********************************************************************************************/
	const	assignSharedInventory = React.useCallback(async () => {
		if (!provider || !address) {
			return;
		}
		const	contract = new ethers.Contract(
			process.env.RARITY_CRAFTING_HELPER_ADDR,
			process.env.RARITY_CRAFTING_HELPER_ABI,
			provider
		);
		const	results = await contract.getItemsByAddress(address);
		const	_sharedInventory = [];
		const	allWeapons = Object.values(MANIFEST_WEAPONS);
		const	allArmors = [...Object.values(MANIFEST_ARMORS), ...Object.values(MANIFEST_SHIELDS)];
		const	allGoods = Object.values(MANIFEST_GOODS);

		for (let index = 0; index < results.length; index++) {
			const item = results[index];
			_sharedInventory[item.item_id] = {
				tokenID: ethers.BigNumber.from(item.item_id).toNumber(),
				crafter: item.crafter.toString(),
				address: item.item_id,
				type: 'unique',
				balance: 1
			};

			if (item.base_type === 3) {
				const	weapon = allWeapons.find(e => e.id === item.item_type);
				_sharedInventory[item.item_id] = {
					..._sharedInventory[item.item_id],
					name: weapon.name,
					description: weapon.description,
					img: weapon.img,
				};
			}
			if (item.base_type === 2) {
				const	armor = allArmors.find(e => e.id === item.item_type);
				_sharedInventory[item.item_id] = {
					..._sharedInventory[item.item_id],
					name: armor.name,
					description: armor.description,
					img: armor.img,
				};
			}
			if (item.base_type === 1) {
				const	good = allGoods.find(e => e.id === item.item_type);
				_sharedInventory[item.item_id] = {
					..._sharedInventory[item.item_id],
					name: good.name,
					description: good.description,
					img: good.img,
				};
			}	
		}
		setTimeout(() => {
			set_sharedInventory(_sharedInventory);
			set_nonce(n => n + 1);
		}, 1);
	}, [address, provider]);
	React.useEffect(() => assignSharedInventory(), [assignSharedInventory]);
	
	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	Prepare the calls for all the inventory of a specific adventurer. This is a 3 steps process.
	**	1. Listen to update of `rarities` and for each adventurer, do the following
	**	2. Prepare the multicall for the tokenID
	**	3. Parse and assign the multicall result
	**********************************************************************************************/
	function		prepareInventory(tokenID) {
		const	rarityGold = new Contract(process.env.RARITY_GOLD_ADDR, process.env.RARITY_GOLD_ABI);
		const	rarityMealts = new Contract(process.env.RARITY_COOKING_ADDR, MEAL_ABI);
		const	raritytheForest = new Contract(process.env.DUNGEON_THE_FOREST_ADDR, process.env.DUNGEON_THE_FOREST_ABI);
		const	rarityOpenMic = new Contract(process.env.DUNGEON_OPEN_MIC_V2_ADDR, process.env.DUNGEON_OPEN_MIC_V2_ABI);

		return [
			rarityGold.balanceOf(tokenID),
			...ITEMS.ITEMS_ERC20.map(item => item.fetch(tokenID)),
			rarityMealts.getTotalMealsBySummoner(tokenID),
			raritytheForest.getTreasuresBySummoner(tokenID),
			rarityOpenMic.getPrizes(tokenID),
		];
	}
	async function	assignInventory(tokenID, inventoryCallResult) {
		const	_inventory = [];
		
		let	rIndex = 0;
		_inventory[process.env.RARITY_GOLD_ADDR] = {
			name: 'Gold',
			description: 'Currency in the realm',
			img: `/items/${process.env.RARITY_GOLD_ADDR}.png`,
			address: process.env.RARITY_GOLD_ADDR,
			type: 'enumerable',
			balance: ethers.utils.formatEther(inventoryCallResult[rIndex])
		};
		rIndex++;

		for (let index = 0; index < ITEMS.ITEMS_ERC20.length; index++) {
			const item = ITEMS.ITEMS_ERC20[index];
			_inventory[item.address] = {
				name: item.name,
				description: item.description,
				img: item.img,
				address: item.address,
				type: item.type,
				balance: ethers.BigNumber.from(inventoryCallResult[rIndex++]).toNumber()
			};
		}
		
		for (let index = 0; index < inventoryCallResult[rIndex].length; index++) {
			const item = inventoryCallResult[rIndex][index];
			const meal = ITEMS.ITEMS_MEALS.find(m => m.address === item.meal);
			_inventory[meal.address] = {
				name: meal.name,
				description: meal.description,
				img: meal.img,
				address: meal.address,
				type: meal.type,
				balance: ethers.BigNumber.from(item?.balance?.length || '0').toNumber()
			};
		}

		rIndex++;
		for (let index = 0; index < inventoryCallResult[rIndex].length; index++) {
			const item = inventoryCallResult[rIndex][index];
			const treasure = ITEMS.ITEMS_THE_FOREST.find(m => m.name === item.itemName);
			_inventory[treasure.address] = {
				tokenID: ethers.BigNumber.from(item.treasureId).toNumber(),
				name: treasure.name,
				description: treasure.description,
				img: treasure.img,
				address: treasure.address,
				type: 'unique',
				balance: 1
			};
		}

		rIndex++;
		for (let index = 0; index < inventoryCallResult[rIndex].length; index++) {
			const item = inventoryCallResult[rIndex][index];
			const element = ITEMS.ITEMS_OPENMIC.find(m => m.name === item.name);
			_inventory[element.address] = {
				tokenID: ethers.BigNumber.from(item.tokenId).toNumber(),
				name: element.name,
				description: element.description,
				img: element.img,
				address: element.address,
				type: 'unique',
				balance: 1
			};
		}
		//Hack to bactch all of this in only 1 render
		setTimeout(() => {
			set_nonce(n => n + 1);
			set_inventory((prev) => ({...prev, [tokenID]: _inventory}));
		}, 1);
	}
	const updateInventories = React.useCallback(async (adventurers) => {
		if (!adventurers || adventurers.length === 0) {
			return;
		}
		const	ethcallProvider = await newEthCallProvider(provider, Number(chainID) === 1337);

		let		chunckLen = 0;
		const	preparedInventoryCalls = [];
		for (let index = 0; index < adventurers.length; index++) {
			const	adventurer = adventurers[index];
			const	tokenID = adventurer.tokenID;
			const	calls = prepareInventory(tokenID);
			if (chunckLen === 0)
				chunckLen = calls.length;
			preparedInventoryCalls.push(...calls);
		}

		const	callResults = await ethcallProvider.tryAll(preparedInventoryCalls);
		const	chunkedCallResult = chunk(callResults, chunckLen);
		for (let index = 0; index < chunkedCallResult.length; index++) {
			const callResult = chunkedCallResult[index];
			assignInventory(adventurers[index].tokenID, callResult);
		}
	}, [rarities, provider]);
	React.useEffect(() => {
		if (!isLoaded)
			return;
		updateInventories(Object.values(rarities || {}));
	}, [updateInventories, rarities, isLoaded]);

	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	Prepare the calls for all the inventory of a specific adventurer. This is the same 3 steps
	**	process as above, but for one unique adventurer at a time
	**********************************************************************************************/
	async function updateInventory(adventurerTokenID) {
		if (!adventurerTokenID || !provider) {
			return;
		}
		const	ethcallProvider = await newEthCallProvider(provider, Number(chainID) === 1337);
		const	tokenID = adventurerTokenID;
		const	preparedInventoryCalls = prepareInventory(tokenID);
		const	callResults = await ethcallProvider.tryAll(preparedInventoryCalls);
		assignInventory(tokenID, callResults);
		assignSharedInventory();
	}

	return (
		<InventoryContext.Provider
			value={{
				inventory,
				sharedInventory,
				updateInventory,
				updateInventories,
				nonce
			}}>
			{children}
		</InventoryContext.Provider>
	);
};

export const useInventory = () => useContext(InventoryContext);
export default useInventory;
