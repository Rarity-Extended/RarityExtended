/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Thursday October 14th 2021
**	@Filename:				boar.js
******************************************************************************/


import	{ethers}			from	'ethers';
import	toast				from	'react-hot-toast';

export async function	killBoar({provider, tokenID}, callback) {
	const	_toast = toast.loading('Killing a boar');
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		process.env.DUNGEON_BOARS_ADDR,
		['function kill(uint256 _summoner) public'],
		signer
	);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.kill(tokenID);
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Impossible to submit transaction');
		callback({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.kill(tokenID, {gasLimit: 300_000});
		const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
		if (transactionResult.status === 1) {
			callback({error: false, data: tokenID});
			toast.dismiss(_toast);
			toast.success('You successfully killed the boar');
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

export async function	protectBoars({provider, tokenID}, callback) {
	const	_toast = toast.loading('Protecting the boars');
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		process.env.DUNGEON_BOARS_ADDR,
		['function reproduce(uint256 _summoner) public'],
		signer
	);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.reproduce(tokenID);
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Impossible to submit transaction');
		callback({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.reproduce(tokenID, {gasLimit: 300_000});
		const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
		if (transactionResult.status === 1) {
			callback({error: false, data: tokenID});
			toast.dismiss(_toast);
			toast.success('You successfully helped the boars!');
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
