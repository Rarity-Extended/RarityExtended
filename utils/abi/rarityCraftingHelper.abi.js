/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 25th 2021
**	@Filename:				rarityCraftingHelper.js
******************************************************************************/

const	ABI = [{'inputs':[{'internalType':'address','name':'owner','type':'address'}],'name':'getItemsByAddress','outputs':[{'components':[{'internalType':'uint8','name':'base_type','type':'uint8'},{'internalType':'uint8','name':'item_type','type':'uint8'},{'internalType':'uint256','name':'crafter','type':'uint256'},{'internalType':'uint256','name':'item_id','type':'uint256'}],'internalType':'struct RarityCraftingHelper.Item[]','name':'','type':'tuple[]'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'_summoner','type':'uint256'},{'internalType':'uint8','name':'_base_type','type':'uint8'},{'internalType':'uint8','name':'_item_type','type':'uint8'},{'internalType':'uint256','name':'_crafting_materials','type':'uint256'}],'name':'safeCraft','outputs':[],'stateMutability':'nonpayable','type':'function'}];

export default ABI;