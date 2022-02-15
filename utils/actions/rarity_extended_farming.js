import	{ethers}			from	'ethers';
import	toast				from	'react-hot-toast';

export async function	harvest({provider, tokenID, farm}, callback) {
	let		_toast;
	let		currentStep = 1;
	let		steps = 1;
	const	signer = provider.getSigner();
	const	rarityFarm = new ethers.Contract(
		farm,
		['function harvest(uint _adventurer) public'],
		signer
	);

	_toast = toast.loading(`${currentStep}/${steps} - Trying to harvest...`);
	try {
		const	transaction = await rarityFarm.harvest(tokenID,);
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
