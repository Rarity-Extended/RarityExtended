/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday October 19th 2021
**	@Filename:				perform.js
******************************************************************************/


import	{ethers}			from	'ethers';
import	toast				from	'react-hot-toast';

export async function	perform({provider, tokenID}, callback) {
	const	_toast = toast.loading('Performing on the tavern stage...');
	const	signer = provider.getSigner();
	const	openmic = new ethers.Contract(
		process.env.DUNGEON_OPEN_MIC_V2_ADDR,
		process.env.DUNGEON_OPEN_MIC_V2_ABI,
		signer
	);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await openmic.callStatic.perform(tokenID);
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Impossible to submit transaction.');
		callback({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await openmic.perform(tokenID, {gasLimit: 400_000});
		const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
		if (transactionResult.status === 1) {
			const {check, success, crit} = (transactionResult?.events[0]?.args || {});
			const prizes = [];
			if(success) {
				const allPrizes = await openmic.getPrizes(tokenID);
				prizes.push(allPrizes[allPrizes.length - 1]);
				if(crit) prizes.push(allPrizes[allPrizes.length - 2]);
			}

			callback({error: false, data: {check, success, crit, prizes}});
			toast.dismiss(_toast);
			toast.success('You won over the crowd!');
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
