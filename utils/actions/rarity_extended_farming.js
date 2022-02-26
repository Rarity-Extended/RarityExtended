import	{ethers}			from	'ethers';
import	toast				from	'react-hot-toast';

export async function	harvest({provider, tokenID, farm}, callback) {
	let		_toast;
	const	signer = provider.getSigner();
	const	rarityFarm = new ethers.Contract(
		farm,
		['function harvest(uint _adventurer) public'],
		signer
	);

	_toast = toast.loading('Trying to harvest...');
	try {
		const	transaction = await rarityFarm.harvest(tokenID,);
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

export async function	levelup({provider, tokenID, farmID, jobName}, callback) {
	let		_toast;
	const	signer = provider.getSigner();
	const	rarityFarm = new ethers.Contract(
		process.env.RARITY_EXTENDED_FARM_CORE,
		['function levelup(uint _adventurer, uint _farm) public'],
		signer
	);

	_toast = toast.loading(`Trying to level-up ${jobName}...`);
	try {
		const	transaction = await rarityFarm.levelup(tokenID, farmID);
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

export async function	unlock({provider, tokenID, farm, farmName, farmCost}, callback) {
	let		_toast;
	let		currentStep = 1;
	let		steps = 1;
	const	signer = provider.getSigner();
	const	rarityFarm = new ethers.Contract(farm, [
		'function RARITY_EXTENDED_NPC() public view returns (uint256)',
		'function unlock(uint _adventurer) public'
	], signer);

	const	manager = await rarityFarm.RARITY_EXTENDED_NPC();
	for (let index = 0; index < farmCost.length; index++) {
		const element = farmCost[index];
		try {
			const	IERC20 = new ethers.Contract(element.address, [
				'function allowance(uint from, uint spender) external view returns (uint256)',
				'function approve(uint from, uint spender, uint amount) external returns (bool)',
			], signer);
			const	allowance = await IERC20.allowance(tokenID, manager);
			if (allowance.gte(element.amount)) {
				toast.dismiss(_toast);
			} else {
				_toast = toast.loading(`${currentStep++}/${++steps} - Approving ${element.name}...`);
				const	transaction = await IERC20.approve(tokenID, manager, element.amount);
				const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
				if (transactionResult.status === 1) {
					toast.dismiss(_toast);
				} else {
					toast.dismiss(_toast);
					toast.error('Approve reverted');
					callback({error: true, data: undefined});
					return;
				}
			}
		} catch (error) {
			console.error(error);
			toast.dismiss(_toast);
			toast.error('Something went wrong, please try again later.');
			callback({error, data: undefined});
		}	
	}


	_toast = toast.loading(`${currentStep++}/${steps} - Unlocking ${farmName}...`);
	try {
		const	transaction = await rarityFarm.unlock(tokenID);
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

export async function	upgrade({provider, tokenID, farm, value}, callback) {
	let		_toast;
	const	signer = provider.getSigner();
	const	rarityFarm = new ethers.Contract(
		farm,
		['function upgrade(uint _adventurer) payable public'],
		signer
	);

	_toast = toast.loading('Upgrading farm...');
	try {
		const	transaction = await rarityFarm.upgrade(tokenID, {value: value});
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