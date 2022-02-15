export const RARITY_EXTENDED_EQUIPEMENT_BASIC_SET_ABI = [
	{'inputs':[{'internalType':'uint256','name':'_adventurerID','type':'uint256'}],'name':'getOwnedItems','outputs':[{'components':[{'internalType':'uint8','name':'base_type','type':'uint8'},{'internalType':'uint8','name':'item_type','type':'uint8'},{'internalType':'uint32','name':'crafted','type':'uint32'},{'internalType':'uint256','name':'crafter','type':'uint256'},{'internalType':'uint256','name':'tokenID','type':'uint256'}],'internalType':'struct rarity_extended_basic_set.item[]','name':'','type':'tuple[]'}],'stateMutability':'view','type':'function'},
	{'inputs':[{'internalType':'uint256','name':'_id','type':'uint256'},{'internalType':'uint256','name':'_receiver','type':'uint256'}],'name':'buySet','outputs':[],'stateMutability':'payable','type':'function'}
];

export const RARITY_EQUIPEMENT_ABI = [
	{'inputs':[{'internalType':'uint256','name':'_adventurer','type':'uint256'},{'internalType':'uint256','name':'_slot','type':'uint256'}],'name':'getEquipementBySlot','outputs':[{'internalType':'uint256','name':'','type':'uint256'},{'internalType':'address','name':'','type':'address'},{'internalType':'address','name':'','type':'address'},{'internalType':'uint8','name':'','type':'uint8'},{'internalType':'uint8','name':'','type':'uint8'},{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'}
];

export const RARITY_EXTENDED_MEAL_ABI = [
	{'inputs': [{'internalType': 'uint256','name': 'summonerId','type': 'uint256'}],'name': 'getTotalMealsBySummoner','outputs': [{'components': [{'internalType': 'address','name': 'meal','type': 'address'},{'internalType': 'uint256[]','name': 'balance','type': 'uint256[]'}],'internalType': 'struct Cooking.MealBalance[]','name': '','type': 'tuple[]'}],'stateMutability': 'view','type': 'function'},
];

export const RARITY_EXTENDED_NAME_ABI = [
	{'inputs':[{'internalType':'uint256','name':'_adventurer','type':'uint256'}],'name':'get_name','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'},
	{'inputs':[{'internalType':'uint256','name':'_adventurer','type':'uint256'},{'internalType':'string','name':'_name','type':'string'}],'name':'set_name','outputs':[],'stateMutability':'nonpayable','type':'function'}
];

export const RARITY_SKIN_HELPER_ABI = [
	{'inputs':[{'internalType':'uint256','name':'_summoner','type':'uint256'}],'name':'getAdventurerSkin','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'}
];

export const RARITY_CRAFTING_HELPER_ABI = [
	{'inputs':[{'internalType':'address','name':'owner','type':'address'}],'name':'getItemsByAddress','outputs':[{'components':[{'internalType':'uint8','name':'base_type','type':'uint8'},{'internalType':'uint8','name':'item_type','type':'uint8'},{'internalType':'uint256','name':'crafter','type':'uint256'},{'internalType':'uint256','name':'item_id','type':'uint256'}],'internalType':'struct RarityCraftingHelper.Item[]','name':'','type':'tuple[]'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'_summoner','type':'uint256'},{'internalType':'uint8','name':'_base_type','type':'uint8'},{'internalType':'uint8','name':'_item_type','type':'uint8'},{'internalType':'uint256','name':'_crafting_materials','type':'uint256'}],'name':'safeCraft','outputs':[],'stateMutability':'nonpayable','type':'function'
	}
];

export const RARITY_EXTENDEDN_FARM_CORE_ABI = [
	{'inputs': [{'internalType': 'uint256','name': '_adventurer','type': 'uint256'}, {'internalType': 'uint256','name': '_farmType','type': 'uint256'}],'name': 'adventurerStatus','outputs': [{'internalType': 'uint256','name': 'level','type': 'uint256'}, {'internalType': 'uint256','name': 'xp','type': 'uint256'}],'stateMutability': 'view','type': 'function'},
];