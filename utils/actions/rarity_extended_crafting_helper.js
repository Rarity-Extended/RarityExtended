/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday August 31st 2021
**	@Filename:				rarity_extended_crafting_helper.js
******************************************************************************/

import	{ethers}			from	'ethers';
import	toast				from	'react-hot-toast';
import	* as ABI			from	'utils/abi/mixed.min.abi';

function	onSuccessToast(_toast) {
	toast.dismiss(_toast);
	toast.success('Transaction successful');
}

export async function	isApprovedForAll({provider, toApprove}) {
	const	signer = provider.getSigner();
	const	address = await signer.getAddress();
	const	raritySource = new ethers.Contract(
		process.env.RARITY_ADDR, [
			'function isApprovedForAll(address owner, address operator) external view returns (bool)',
			'function setApprovalForAll(address operator, bool approved) external',
		], signer
	);
	const	isApprovedForAll = await raritySource.isApprovedForAll(
		address,
		toApprove
	);
	return isApprovedForAll;
}

export async function	approveForAll({provider, contract}, onError = () => null, onSuccess = () => null) {
	let		_toast;
	const	signer = provider.getSigner();
	const	raritySource = new ethers.Contract(
		process.env.RARITY_ADDR, [
			'function isApprovedForAll(address owner, address operator) external view returns (bool)',
			'function setApprovalForAll(address operator, bool approved) external',
		], signer
	);
	try {
		_toast = toast.loading('Approving Crafting...');
		const	transaction = await raritySource.setApprovalForAll(contract, true);
		const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
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
		ABI.RARITY_CRAFTING_HELPER_ABI,
		signer
	);

	const	isApproved = await isApprovedForAll({provider, toApprove: process.env.RARITY_CRAFTING_HELPER_ADDR});
	if (!isApproved) {
		const	raritySource = new ethers.Contract(
			process.env.RARITY_ADDR, [
				'function isApprovedForAll(address owner, address operator) external view returns (bool)',
				'function setApprovalForAll(address operator, bool approved) external',
			], signer
		);
		try {
			_toast = toast.loading('Approving crafting...');
			const	transaction = await raritySource.setApprovalForAll(process.env.RARITY_CRAFTING_HELPER_ADDR, true);
			const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
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
			toast.error('Approve reverted');
			callback({error: true, data: undefined});
			return;
		}
	}

	_toast = toast.loading(`Trying to craft ${itemName}...`);
	try {
		const	transaction = await rarityCraft.craft(
			tokenID,
			baseType,
			itemType,
			craftingMaterials
		);
		const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
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

	const	isApproved = await isApprovedForAll({provider, toApprove: process.env.RARITY_COOKING_HELPER_ADDR});
	if (!isApproved) {
		const	raritySource = new ethers.Contract(
			process.env.RARITY_ADDR, [
				'function isApprovedForAll(address owner, address operator) external view returns (bool)',
				'function setApprovalForAll(address operator, bool approved) external',
			], signer
		);
		try {
			_toast = toast.loading('Approving crafting...');
			const	transaction = await raritySource.setApprovalForAll(process.env.RARITY_COOKING_HELPER_ADDR, true);
			const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
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
			toast.error('Approve reverted');
			callback({error: true, data: undefined});
			return;
		}
	}

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
		const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
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

