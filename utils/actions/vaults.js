/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday October 17th 2021
**	@Filename:				vaults.js
******************************************************************************/

import	{ethers}			from	'ethers';
import	toast				from	'react-hot-toast';

export async function	apeInVault({provider, contractAddress, amount}, callback) {
	const	_toast = toast.loading('Processing deposit...');
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function deposit() public payable'],
		signer
	);

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.deposit({value: amount});
		const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
		if (transactionResult.status === 1) {
			callback({error: false, data: undefined});
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
export async function	apeOutVault({provider, address, zapAddress, contractAddress, amount, wantTokenName}, callback) {
	let		_toast = toast.loading(`1/2 - Approving token yv${wantTokenName}...`);
	const	signer = provider.getSigner();
	const	vault = new ethers.Contract(
		contractAddress, [
			'function allowance(address, address) external view returns (uint256)',
			'function approve(address to, uint256 amount) external'
		],
		signer
	);
	const	zap = new ethers.Contract(
		zapAddress,
		['function withdraw(uint256) public'],
		signer
	);

	/**********************************************************************
	**	First, we need to approve this TX
	**********************************************************************/
	try {
		const	approvedAmount = await vault.allowance(address, zapAddress);
		if (ethers.BigNumber.from(approvedAmount).gte(amount)) {
			toast.dismiss(_toast);
		} else {
			const	transaction = await vault.approve(zapAddress, amount);
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
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await zap.withdraw(amount);
		const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
		if (transactionResult.status === 1) {
			callback({error: false, data: undefined});
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
export async function	depositInVault({provider, address, contractAddress, amount, wantTokenAddress, wantTokenName}, callback) {
	let		_toast = toast.loading(`1/2 - Approving token ${wantTokenName}...`);
	const	signer = provider.getSigner();
	const	vault = new ethers.Contract(
		contractAddress,
		['function deposit(uint256) public'],
		signer
	);

	/**********************************************************************
	**	First, we need to approve this TX
	**********************************************************************/
	try {
		const	wantContract = new ethers.Contract(
			wantTokenAddress, [
				'function allowance(address, address) external view returns (uint256)',
				'function approve(address to, uint256 amount) external'
			],
			signer
		);
		const	approvedAmount = await wantContract.allowance(address, contractAddress);
			
		if (ethers.BigNumber.from(approvedAmount).gte(amount)) {
			toast.dismiss(_toast);
		} else {
			const	transaction = await wantContract.approve(contractAddress, amount);
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
		return;
	}

	_toast = toast.loading(`2/2 - Deposit ${wantTokenName}...`);
	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await vault.callStatic.deposit(amount);
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Impossible to deposit tokens');
		callback({error, data: undefined});
		return;
	}
	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await vault.deposit(amount);
		const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
		if (transactionResult.status === 1) {
			callback({error: false, data: undefined});
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
export async function	withdrawFromVault({provider, contractAddress, amount, wantTokenName}, callback) {
	const	_toast = toast.loading(`Withdrawing yv${wantTokenName}...`);
	const	signer = provider.getSigner();
	const	vault = new ethers.Contract(
		contractAddress, [
			'function withdraw(uint256) public',
			'function allowance(address, address) external view returns (uint256)',
			'function approve(address to, uint256 amount) external'
		],
		signer
	);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await vault.callStatic.withdraw(amount);
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Impossible to withdraw tokens');
		callback({error, data: undefined});
		return;
	}
	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await vault.withdraw(amount);
		const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
		if (transactionResult.status === 1) {
			callback({error: false, data: undefined});
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