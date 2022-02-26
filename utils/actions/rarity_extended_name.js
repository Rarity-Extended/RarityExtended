import	{ethers}			from	'ethers';
import	toast				from	'react-hot-toast';
import	* as ABI			from	'utils/abi/mixed.min.abi';

function	onSuccessToast(_toast) {
	toast.dismiss(_toast);
	toast.success('Transaction successful');
}

export async function	setName({provider, tokenID, name}, onError, onSuccess = onSuccessToast) {
	const	_toast = toast.loading(`Name ${tokenID} to ${name}...`);
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(process.env.RARITY_EXTENDED_NAME, ABI.RARITY_EXTENDED_NAME_ABI, signer);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.set_name(tokenID, name);
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Impossible to name your adventurer');
		onError({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.set_name(tokenID, name);
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
