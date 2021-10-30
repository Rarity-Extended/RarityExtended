/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Thursday October 14th 2021
**	@Filename:				boar.js
******************************************************************************/

import	{ethers}			from	'ethers';
import	toast				from	'react-hot-toast';

function	onSuccessToast(_toast) {
	toast.dismiss(_toast);
	toast.success('Transaction successful');
}

export async function	claimCandies({provider, tokenID}, onError, onSuccess = onSuccessToast) {
	const	_toast = toast.loading('Claiming free candies');
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		process.env.FESTIVAL_SPOOKY_ADDR,
		['function claim(uint _summoner)'],
		signer
	);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.claim(tokenID);
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Impossible to submit transaction');
		onError({error: true, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.claim(tokenID);
		const	transactionResult = await transaction.wait(2);
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
		onError({error: true, data: undefined});
	}
}

export async function	trickOrTreat({provider, tokenID, amount, choice}, onError, onSuccess = onSuccessToast) {
	let		hadApprove = false;
	let		_toast;
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		process.env.FESTIVAL_SPOOKY_ADDR,
		process.env.FESTIVAL_SPOOKY_ABI,
		signer
	);

	/**********************************************************************
	**	First, we need to approve the candies
	**********************************************************************/
	try {
		const	candies = new ethers.Contract(process.env.LOOT_CANDIES_ADDR, process.env.LOOT_ERC20_ABI, signer);
		const	approveAmount = await candies.allowance(tokenID, process.env.FESTIVAL_SPOOKY_ID);
		if (approveAmount.gte(ethers.BigNumber.from(amount))) {
			// already approved
		} else {
			hadApprove = true;
			_toast = toast.loading('1/2 - Approving candies ...');
			const	transaction = await candies.approve(tokenID, process.env.FESTIVAL_SPOOKY_ID, ethers.constants.MaxUint256);
			const	transactionResult = await transaction.wait();
			if (transactionResult.status === 1) {
				toast.dismiss(_toast);
			} else {
				toast.dismiss(_toast);
				toast.error('Approve reverted');
				return onError({error: true, data: undefined});
			}
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		return onError({error: true, data: undefined});
	}

	if (hadApprove) {
		_toast = toast.loading('2/2 - Playing Trick or Treat');
	} else {
		_toast = toast.loading('Playing Trick or Treat');
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.trick_or_treat(tokenID, amount, choice, {gasLimit: 300_000});
		const	transactionResult = await transaction.wait(2);
		if (transactionResult.status === 1) {
			if (transactionResult.logs.length === 2) {
				onSuccess(_toast, false); //transfer + burn
			} else if (transactionResult.logs.length === 3) {
				onSuccess(_toast, true); //transfer + burn + mint
			}
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			return onError({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		onError({error: true, data: undefined});
	}
}

export async function	spookyActivity({provider, tokenID, typeOfActivity}, onError, onSuccess = onSuccessToast) {
	let		_toast;
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		process.env.FESTIVAL_SPOOKY_ADDR,
		process.env.FESTIVAL_SPOOKY_ABI,
		signer
	);

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		let		transaction;

		if (typeOfActivity === 0) {
			_toast = toast.loading('Throwing a rock');
			transaction = await rarity.throw_a_rock(tokenID);
		} else if (typeOfActivity === 1) {
			_toast = toast.loading('Eating some cakes');
			transaction = await rarity.cake_eating_contest(tokenID);
		} else if (typeOfActivity === 2) {
			_toast = toast.loading('Stealing a pumpkin');
			transaction = await rarity.steal_a_pumpkin(tokenID);
		} else if (typeOfActivity === 3) {
			_toast = toast.loading('Telling a scary story');
			transaction = await rarity.tell_a_scary_story(tokenID);
		} else if (typeOfActivity === 4) {
			_toast = toast.loading('Doing some magic tricks');
			transaction = await rarity.do_a_magic_trick(tokenID);
		} else if (typeOfActivity === 5) {
			_toast = toast.loading('Doing some babysitting');
			transaction = await rarity.do_some_babysitting(tokenID);
		}
		const	transactionResult = await transaction.wait(2);
		if (transactionResult.status === 1) {
			onSuccess(_toast);
		} else {
			toast.dismiss(_toast);
			toast.error('Transaction reverted');
			return onError({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		onError({error: true, data: undefined});
	}
}

