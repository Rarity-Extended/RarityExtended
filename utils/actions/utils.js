/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday October 17th 2021
**	@Filename:				utils.js
******************************************************************************/

import	{ethers}			from	'ethers';
import	toast				from	'react-hot-toast';

export async function	approveERC721({provider, contractAddress, spender, tokenID, name}, callback) {
	let		_toast = toast.loading(`Approving ${name}...`);
	const	signer = provider.getSigner();

	/**********************************************************************
	**	First, we need to approve this TX
	**********************************************************************/
	try {
		const	contract = new ethers.Contract(
			contractAddress, [
				'function approve(address spender, uint256 tokenID) external'
			],
			signer
		);
		const	transaction = await contract.approve(spender, tokenID);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			toast.dismiss(_toast);
			callback({error: false, data: undefined});
			return;
		} else {
			toast.dismiss(_toast);
			toast.error('Approve reverted');
			callback({error: true, data: undefined});
			return;
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
		return;
	}
}

export async function	approveERC20({provider, contractAddress, adventurerID, spender, amount, name}, callback) {
	let		_toast = toast.loading(`Approving ${name}...`);
	const	signer = provider.getSigner();

	/**********************************************************************
	**	First, we need to approve this TX
	**********************************************************************/
	try {
		const	contract = new ethers.Contract(
			contractAddress, [
				'function approve(uint256 from, uint256 spender, uint256 amount) external'
			],
			signer
		);
		const	transaction = await contract.approve(adventurerID, spender, amount);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			toast.dismiss(_toast);
			callback({error: false, data: undefined});
			return;
		} else {
			toast.dismiss(_toast);
			toast.error('Approve reverted');
			callback({error: true, data: undefined});
			return;
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
		return;
	}
}