import	{ethers}			from	'ethers';
import	toast				from	'react-hot-toast';


const	RARITY_CRAFTING = new ethers.Contract(
	process.env.RARITY_CRAFTING_ADDR, [
		'function approve(address spender, uint256 tokenID) external'
	]
);

const	slotsRegistry = {
	1: process.env.RARITY_EQUIPEMENT_ARMOR_HEAD_ADDR,
	2: process.env.RARITY_EQUIPEMENT_ARMOR_BODY_ADDR,
	3: process.env.RARITY_EQUIPEMENT_ARMOR_HAND_ADDR,
	4: process.env.RARITY_EQUIPEMENT_ARMOR_FOOT_ADDR,
	5: process.env.RARITY_EQUIPEMENT_WEAPON_PRIMARY_ADDR,
	6: process.env.RARITY_EQUIPEMENT_WEAPON_SECONDARY_ADDR,
	101: process.env.RARITY_EQUIPEMENT_WEAPON_SHIELD,
};

export async function	equip({provider, tokenID, itemID, itemName, slot}, callback) {
	let		_toast;
	const	signer = provider.getSigner();
	const	address = await signer.getAddress();

	_toast = toast.loading(`Approving ${itemName}...`);
	try {
		const	contract = RARITY_CRAFTING.connect(signer);
		const	transaction = await contract.approve(slotsRegistry[slot], itemID);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			toast.dismiss(_toast);
		} else {
			toast.dismiss(_toast);
			toast.error('Approve reverted');
			callback({error: true, data: undefined});
			return;
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	_toast = toast.loading(`Trying to equip ${itemName}...`);
	try {
		const	rarityEquipement = new ethers.Contract(
			slotsRegistry[slot],
			[{'inputs':[{'internalType':'uint256','name':'_adventurer','type':'uint256'},{'internalType':'address','name':'_operator','type':'address'},{'internalType':'address','name':'_registry','type':'address'},{'internalType':'uint256','name':'_tokenID','type':'uint256'}],'name':'set_equipement','outputs':[],'stateMutability':'nonpayable','type':'function'}],
			signer
		);
		const	transaction = await rarityEquipement.set_equipement(
			tokenID,
			address,
			process.env.RARITY_CRAFTING_ADDR,
			itemID
		);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			callback({error: false, data: tokenID});
			toast.dismiss(_toast);
			toast.success('Transaction successful');
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
	}
}

