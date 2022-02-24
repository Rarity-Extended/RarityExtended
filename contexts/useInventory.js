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
import	performBatchedUpdates							from	'utils/performBatchedUpdates';
import	* as ABI										from	'utils/abi/mixed.min.abi';
import	* as ITEMS										from	'utils/codex/items/items';

const	InventoryContext = createContext();
export const InventoryContextApp = ({children}) => {
	const	{address, chainID, provider} = useWeb3();
	const	{rarities, isLoaded} = useRarity();
	const	[inventory, set_inventory] = useState({});
	const	[equipment, set_equipment] = useState([]);
	const	[sharedInventory, set_sharedInventory] = useState({});
	const	[initialFetchSet, set_initialFetchSet] = useState(false);
	const	[nonce, set_nonce] = useState(0);

	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	Some elements are share between all the adventurers, aka linked to the address and not the
	**	adventurer. We need to fetch that and assign it.
	**********************************************************************************************/
	const	assignSharedInventory = React.useCallback(async () => {
		if (!provider || !address) {
			return;
		}
		const	contract = new ethers.Contract(process.env.RARITY_CRAFTING_HELPER_ADDR, ABI.RARITY_CRAFTING_HELPER_ABI, provider);
		const	results = await contract.getItemsByAddress(address);
		const	_sharedInventory = [];
		const	allWeapons = ITEMS.CORE_CRAFTING_WEAPONS;
		const	allArmors = ITEMS.CORE_CRAFTING_ARMORS;
		const	allGoods = ITEMS.CORE_CRAFTING_GOODS;

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
					...weapon,
					minter: process.env.RARITY_CRAFTING_ADDR
				};
			}
			if (item.base_type === 2) {
				const	armor = allArmors.find(e => e.id === item.item_type);
				_sharedInventory[item.item_id] = {
					..._sharedInventory[item.item_id],
					...armor,
					minter: process.env.RARITY_CRAFTING_ADDR
				};
			}
			if (item.base_type === 1) {
				const	good = allGoods.find(e => e.id === item.item_type);
				_sharedInventory[item.item_id] = {
					..._sharedInventory[item.item_id],
					...good,
					minter: process.env.RARITY_CRAFTING_ADDR
				};
			}	
		}
		performBatchedUpdates(() => {
			set_sharedInventory(_sharedInventory);
			set_nonce(n => n + 1);
		});
	}, [address, provider]);
	React.useEffect(() => assignSharedInventory(), [assignSharedInventory]);
	
	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	Prepare the calls for all the inventory of a specific adventurer. This is a 3 steps process.
	**	1. Listen to update of `rarities` and for each adventurer, do the following
	**	2. Prepare the multicall for the tokenID
	**	3. Parse and assign the multicall result
	**********************************************************************************************/
	function		prepareInventory(tokenID) {
		const	rarityMealts = new Contract(process.env.RARITY_EXTENDED_COOKING_ADDR, ABI.RARITY_EXTENDED_MEAL_ABI);
		const	raritytheForest = new Contract(process.env.DUNGEON_THE_FOREST_ADDR, process.env.DUNGEON_THE_FOREST_ABI);
		const	rarityOpenMic = new Contract(process.env.DUNGEON_OPEN_MIC_V2_ADDR, process.env.DUNGEON_OPEN_MIC_V2_ABI);
		const	rarityBasicSet = new Contract(process.env.RARITY_EXTENDED_EQUIPMENT_BASIC_SET_ADDR, ABI.RARITY_EXTENDED_EQUIPMENT_BASIC_SET_ABI);
		const	rarityEquipmentWrapper = new Contract(process.env.RARITY_EQUIPMENT_WRAPPER_ADDR, ABI.RARITY_EQUIPMENT_ABI);

		return [
			...ITEMS.LOOTS.map(item => item.fetch(tokenID)),
			rarityMealts.getTotalMealsBySummoner(tokenID),
			raritytheForest.getTreasuresBySummoner(tokenID),
			rarityOpenMic.getPrizes(tokenID),
			rarityBasicSet.getOwnedItems(tokenID),

			rarityEquipmentWrapper.getEquipementBySlot(tokenID, 1), //Head
			rarityEquipmentWrapper.getEquipementBySlot(tokenID, 2), //Chest
			rarityEquipmentWrapper.getEquipementBySlot(tokenID, 3), //Hand
			rarityEquipmentWrapper.getEquipementBySlot(tokenID, 4), //Feet
			rarityEquipmentWrapper.getEquipementBySlot(tokenID, 5), //Primary weapon
			rarityEquipmentWrapper.getEquipementBySlot(tokenID, 6), //Secondary weapon
			rarityEquipmentWrapper.getEquipementBySlot(tokenID, 101), //Secondary weapon
		];
	}
	async function	assignInventory(tokenID, inventoryCallResult) {
		const	_inventory = [];
		const	_equipment = [];
		
		let	rIndex = 0;
		for (let index = 0; index < ITEMS.LOOTS.length; index++) {
			const item = ITEMS.LOOTS[index];
			_inventory[item.address] = {
				name: item.name,
				description: item.description,
				img: item.img,
				address: item.address,
				type: item.type,
				balance: Number(ethers.utils.formatUnits(inventoryCallResult[rIndex++], item.decimals))
			};
		}
		
		for (let index = 0; index < inventoryCallResult[rIndex].length; index++) {
			const item = inventoryCallResult[rIndex][index];
			const meal = ITEMS.MEALS.find(m => m.address === item.meal);
			_inventory[meal.address] = {
				name: meal.name,
				description: meal.description,
				img: meal.img,
				address: meal.address,
				type: meal.type,
				balance: Number(ethers.utils.formatUnits(item?.balance?.length || '0', item.decimals))
			};
		}

		rIndex++;
		for (let index = 0; index < inventoryCallResult[rIndex].length; index++) {
			const item = inventoryCallResult[rIndex][index];
			const element = ITEMS.THE_FOREST.find(m => m.name === item.itemName);
			if (_inventory[element.address]?.balance > 0) {
				_inventory[element.address].balance++;
			} else {
				_inventory[element.address] = {
					tokenID: ethers.BigNumber.from(item.treasureId).toNumber(),
					type: 'unique',
					balance: 1,
					...element
				};
			}
		}

		rIndex++;
		for (let index = 0; index < inventoryCallResult[rIndex].length; index++) {
			const item = inventoryCallResult[rIndex][index];
			const element = ITEMS.OPENMIC.find(m => m.name === item.name);
			if (_inventory[element.address]?.balance > 0) {
				_inventory[element.address].balance++;
			} else {
				_inventory[element.address] = {
					tokenID: ethers.BigNumber.from(item.tokenId).toNumber(),
					type: 'unique',
					balance: 1,
					...element
				};
			}
		}

		rIndex++;
		for (let index = 0; index < inventoryCallResult[rIndex].length; index++) {
			const item = inventoryCallResult[rIndex][index];
			// const initialIndex = (item.base_type === 3 ? 19 : 0) - 1;
			const initialIndex = (item.base_type === 3 ? 19 : 0) - 1;
			let element = ITEMS.BASIC_SET[initialIndex + item.item_type];
			if (item.item_type === 19) {
				element = ITEMS.BASIC_SET[18];
			}
			if (_inventory[element.address]?.balance > 0) {
				_inventory[element.address].balance++;
			} else {
				_inventory[element.address] = {
					tokenID: ethers.BigNumber.from(item.tokenID).toNumber(),
					type: 'unique',
					balance: 1,
					...element,
				};
			}
		}

		rIndex++;
		for (let index = 1; index < 8; index++) {
			const	element = inventoryCallResult[rIndex++];
			if (!element) {
				continue;
			}
			const	elementDetails = {
				tokenID: (element[0]).toNumber(),
				registry: (element[1]),
				codex: (element[2]),
				baseType: (element[3]),
				itemType: (element[4])
			};

			if (index <= 4) {
				let	_equipment = null;
				if (elementDetails.registry === process.env.RARITY_EXTENDED_EQUIPMENT_BASIC_SET_ADDR) {
					_equipment = ITEMS.BASIC_SET[(elementDetails.baseType === 3 ? 19 : 0) - 1 + elementDetails.itemType];
				} else if (elementDetails.registry === process.env.RARITY_CRAFTING_ADDR) {
					_equipment = ITEMS.CORE_CRAFTING_ARMORS.find(e => e.id === elementDetails.itemType);
				}
				if (_equipment) {
					_equipment[index] = {...elementDetails, ..._equipment};
				}
			}

			if (index === 5 || index === 6) {
				let	_equipment = null;
				if (elementDetails.registry === process.env.RARITY_EXTENDED_EQUIPMENT_BASIC_SET_ADDR) {
					_equipment = ITEMS.BASIC_SET[(elementDetails.baseType === 3 ? 19 : 0) - 1 + elementDetails.itemType];
				} else if (elementDetails.registry === process.env.RARITY_CRAFTING_ADDR) {
					_equipment = ITEMS.CORE_CRAFTING_WEAPONS.find(e => e.id === elementDetails.itemType);
				}
				if (_equipment) {
					_equipment[index] = {...elementDetails, ..._equipment};
				}
			}
			if (index === 7) {
				let	_equipment = null;
				if (elementDetails.registry === process.env.RARITY_EXTENDED_EQUIPMENT_BASIC_SET_ADDR) {
					_equipment = ITEMS.BASIC_SET[(elementDetails.baseType === 3 ? 19 : 0) - 1 + elementDetails.itemType];
				} else if (elementDetails.registry === process.env.RARITY_CRAFTING_ADDR) {
					_equipment = ITEMS.CORE_CRAFTING_ARMORS.find(e => e.id === elementDetails.itemType);
				}
				if (_equipment) {
					_equipment[101] = {...elementDetails, ..._equipment};
				}
			}
		}
	
		//Hack to bactch all of this in only 1 render
		performBatchedUpdates(() => {
			set_nonce(n => n + 1);
			set_inventory((prev) => ({...prev, [tokenID]: _inventory}));
			set_equipment((prev) => ({...prev, [tokenID]: _equipment}));
		});
	}
	const	updateInventories = React.useCallback(async (adventurers) => {
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
		performBatchedUpdates(() => {
			for (let index = 0; index < chunkedCallResult.length; index++) {
				const callResult = chunkedCallResult[index];
				assignInventory(adventurers[index].tokenID, callResult);
			}
		});
	}, [chainID, provider]);

	React.useEffect(() => {
		if (!isLoaded || initialFetchSet)
			return;
		set_initialFetchSet(true);
		updateInventories(Object.values(rarities || {}));
	}, [rarities, updateInventories, isLoaded, initialFetchSet]);

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
				equipment,
				nonce
			}}>
			{children}
		</InventoryContext.Provider>
	);
};

export const useInventory = () => useContext(InventoryContext);
export default useInventory;
