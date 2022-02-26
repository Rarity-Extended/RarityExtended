/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday October 5th 2021
**	@Filename:				daycare.js
******************************************************************************/

import	{ethers}			from	'ethers';
import	toast				from	'react-hot-toast';

function	onSuccessToast(_toast) {
	toast.dismiss(_toast);
	toast.success('Transaction successful');
}

async function	approveRarityExtendedCare({provider, steps}) {
	let		_toast;
	const	signer = provider.getSigner();
	const	address = await signer.getAddress();

	const	raritySource = new ethers.Contract(
		process.env.RARITY_ADDR, [
			'function setApprovalForAll(address operator, bool approved) external',
			'function isApprovedForAll(address owner, address operator) external view returns (bool)',
		],
		signer
	);
	const	isApprovedForAll = await raritySource.isApprovedForAll(address, process.env.RARITY_EXTENDED_CARE);
	if (isApprovedForAll) {
		return [false, true];
	} else {
		try {
			_toast = toast.loading(`1/${steps} - Approving Extended Care...`);
			const	transaction = await raritySource.setApprovalForAll(process.env.RARITY_EXTENDED_CARE, true);
			const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
			if (transactionResult.status === 1) {
				toast.dismiss(_toast);
				return [true, true];
			} else {
				toast.dismiss(_toast);
				toast.error('Approve reverted');
				return [false, false];
			}
		} catch (error) {
			console.error(error);
			toast.dismiss(_toast);
			toast.error('Approve reverted');
			return [false, false];
		}
	}
}

export async function	careOfAll({provider, tokensID}, onError, onSuccess = onSuccessToast) {
	const	[hadToApprove, success] = await approveRarityExtendedCare({provider, steps: 2});
	if (!success) {
		toast.dismiss(_toast);
		toast.error('Approve reverted');
		onError({error: true, data: undefined});
		return;
	}
	let		_toast;
	if (hadToApprove) {
		_toast = toast.loading('2/2 - Taking care of your adventurers...');
	} else {
		_toast = toast.loading('Taking care of your adventurers...');
	}

	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		process.env.RARITY_EXTENDED_CARE, [
			'function care_of(uint[] memory _summoners, bool[4] memory _whatToDo, uint _threshold_cellar) external'
		],
		signer
	);

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.care_of(
			tokensID,
			[true, true, true, true],
			1
		);
		const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
		if (transactionResult.status === 1) {
			onSuccess(_toast);
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			onError({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		onError({error, data: undefined});
	}
}

export async function	careAdventure({provider, tokensID}, onError, onSuccess = onSuccessToast) {
	const	[hadToApprove, success] = await approveRarityExtendedCare({provider, steps: 2});
	if (!success) {
		toast.error('Approve reverted');
		onError({error: true, data: undefined});
		return;
	}
	let		_toast;
	if (hadToApprove) {
		_toast = toast.loading('2/2 - Sending adventurers in an adventure...');
	} else {
		_toast = toast.loading('Sending adventurers in an adventure...');
	}

	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		process.env.RARITY_EXTENDED_CARE, [
			'function adventure(uint[] memory _summoners) external'
		],
		signer
	);

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.adventure(tokensID);
		const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
		if (transactionResult.status === 1) {
			onSuccess(_toast);
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			onError({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		onError({error, data: undefined});
	}
}

export async function	careCellar({provider, tokensID}, onError, onSuccess = onSuccessToast) {
	const	[hadToApprove, success] = await approveRarityExtendedCare({provider, steps: 2});
	if (!success) {
		toast.error('Approve reverted');
		onError({error: true, data: undefined});
		return;
	}
	let		_toast;
	if (hadToApprove) {
		_toast = toast.loading('2/2 - Sending adventurers in the Cellar adventurers...');
	} else {
		_toast = toast.loading('Sending adventurers in the Cellar adventurers...');
	}

	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		process.env.RARITY_EXTENDED_CARE, [
			'function adventure_cellar(uint[] memory _summoners, uint _threshold) external'
		],
		signer
	);

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.adventure_cellar(tokensID, 1);
		const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
		if (transactionResult.status === 1) {
			onSuccess(_toast);
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			onError({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		onError({error, data: undefined});
	}
}

export async function	careLevelup({provider, tokensID}, onError, onSuccess = onSuccessToast) {
	const	[hadToApprove, success] = await approveRarityExtendedCare({provider, steps: 2});
	if (!success) {
		toast.error('Approve reverted');
		onError({error: true, data: undefined});
		return;
	}
	let		_toast;
	if (hadToApprove) {
		_toast = toast.loading('2/2 - Level up your adventurers...');
	} else {
		_toast = toast.loading('Level up your adventurers...');
	}

	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		process.env.RARITY_EXTENDED_CARE, [
			'function level_up(uint[] memory _summoners) external'
		],
		signer
	);

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.level_up(tokensID);
		const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
		if (transactionResult.status === 1) {
			onSuccess(_toast);
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			onError({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		onError({error, data: undefined});
	}
}

export async function	careGold({provider, tokensID}, onError, onSuccess = onSuccessToast) {
	const	[hadToApprove, success] = await approveRarityExtendedCare({provider, steps: 2});
	if (!success) {
		toast.error('Approve reverted');
		onError({error: true, data: undefined});
		return;
	}
	let		_toast;
	if (hadToApprove) {
		_toast = toast.loading('2/2 - Claiming gold for your adventurers...');
	} else {
		_toast = toast.loading('Claiming gold for your adventurers...');
	}

	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		process.env.RARITY_EXTENDED_CARE, [
			'function claim_gold(uint[] memory _summoners) external'
		],
		signer
	);

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.claim_gold(tokensID);
		const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
		if (transactionResult.status === 1) {
			onSuccess(_toast);
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			onError({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		onError({error, data: undefined});
	}
}
