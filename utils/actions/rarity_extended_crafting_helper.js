/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday August 31st 2021
**	@Filename:				rarity_extended_crafting_helper.js
******************************************************************************/

import	{ethers}			from	'ethers';
import	toast				from	'react-hot-toast';

function	onSuccessToast(_toast) {
	toast.dismiss(_toast);
	toast.success('Transaction successful');
}

const	RARITY_MANIFEST = new ethers.Contract(
	process.env.RARITY_ADDR, [
		'function isApprovedForAll(address owner, address operator) external view returns (bool)',
		'function setApprovalForAll(address operator, bool approved) external',
	]
);

export async function	isApprovedForAll({provider}) {
	const	signer = provider.getSigner();
	const	address = await signer.getAddress();
	const	raritySource = RARITY_MANIFEST.connect(signer);
	const	isApprovedForAll = await raritySource.isApprovedForAll(
		address,
		process.env.RARITY_CRAFTING_HELPER_ADDR
	);
	return isApprovedForAll;
}

export async function	approveForAll(
	{provider, contract},
	onError = () => null,
	onSuccess = () => null
) {
	let		_toast;
	const	signer = provider.getSigner();
	const	raritySource = RARITY_MANIFEST.connect(signer);
	try {
		_toast = toast.loading('Approving Crafting...');
		const	transaction = await raritySource.setApprovalForAll(contract, true);
		const	transactionResult = await transaction.wait(2);
		if (transactionResult.status === 1) {
			onSuccessToast();
			onSuccess();
		} else {
			toast.dismiss(_toast);
			toast.error('Approve reverted');
			onError({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Approve reverted');
		onError({error: true, data: undefined});
	}
}

export async function	craft({
	provider,
	tokenID,
	itemName,
	baseType,
	itemType,
	craftingMaterials
}, callback) {
	let		_toast;
	const	signer = provider.getSigner();
	const	rarityCraft = new ethers.Contract(
		process.env.RARITY_CRAFTING_HELPER_ADDR,
		process.env.RARITY_CRAFTING_ABI,
		signer
	);

	_toast = toast.loading(`Trying to craft ${itemName}...`);
	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarityCraft.callStatic.craft(
			tokenID,
			baseType,
			itemType,
			craftingMaterials
		);
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('You have a bad feeling about this. You should retry later.');
		callback({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarityCraft.craft(
			tokenID,
			baseType,
			itemType,
			craftingMaterials
		);
		const	transactionResult = await transaction.wait(2);
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

export async function	cook({
	provider,
	tokenID,
	mealAddress,
	itemName,
}, callback) {
	let		_toast;
	const	signer = provider.getSigner();
	const	rarityCook = new ethers.Contract(
		process.env.RARITY_COOKING_HELPER_ADDR,
		[{'inputs': [{'internalType': 'address', 'name': '_meal', 'type': 'address'}, {'internalType': 'uint256', 'name': '_adventurer', 'type': 'uint256'}, {'internalType': 'uint256', 'name': '_receiver', 'type': 'uint256'}], 'name': 'cook', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}],
		signer
	);

	_toast = toast.loading(`Trying to cook ${itemName}...`);

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarityCook.cook(
			mealAddress,
			tokenID,
			tokenID
		);
		const	transactionResult = await transaction.wait(2);
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

