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
		const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
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
		const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
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

export async function	isERC20Approved({provider, contractAddress, spender}) {
	const	signer = provider.getSigner();
	const	address = await signer.getAddress();

	try {
		const	contract = new ethers.Contract(
			contractAddress,
			['function allowance(address _owner, address _spender) public view returns (uint256)'],
			provider
		);
		return await contract.allowance(address, spender);
	} catch (error) {
		return ethers.BigNumber.from(0);
	}
}

export async function	isERC20ApprovedUint({provider, contractAddress, adventurerID, spender}) {
	try {
		const	contract = new ethers.Contract(
			contractAddress,
			['function allowance(uint256 _owner, uint256 _spender) public view returns (uint256)'],
			provider
		);
		return !(await contract.allowance(adventurerID, spender)).isZero();
	} catch (error) {
		return false;
	}
}

export async function	approveAllAdventurers({provider, name}, callback) {
	let		_toast = toast.loading(`Approving ${name}...`);
	const	signer = provider.getSigner();

	/**********************************************************************
	**	First, we need to approve this TX
	**********************************************************************/
	try {
		const	raritySource = new ethers.Contract(
			process.env.RARITY_ADDR, ['function setApprovalForAll(address operator, bool approved) external'], signer
		);
		const	transaction = await raritySource.setApprovalForAll(process.env.RARITY_CRAFTING_ADDR, true);
		const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
		if (transactionResult.status === 1) {
			toast.dismiss(_toast);
			callback({error: false, data: undefined});
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

export async function	approveAdventurer({provider, adventurerID, name}, callback) {
	let		_toast = toast.loading(`Approving ${name}...`);
	const	signer = provider.getSigner();

	/**********************************************************************
	**	First, we need to approve this TX
	**********************************************************************/
	try {
		const	raritySource = new ethers.Contract(
			process.env.RARITY_ADDR, ['function approve(address to, uint256 tokenId) external'], signer
		);
		const	transaction = await raritySource.approve(process.env.RARITY_CRAFTING_ADDR, adventurerID);
		const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
		if (transactionResult.status === 1) {
			toast.dismiss(_toast);
			callback({error: false, data: undefined});
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

export async function	isAdventurerApproved({provider, adventurerID, spender}) {
	const	signer = provider.getSigner();
	const	address = await signer.getAddress();

	try {
		const	contract = new ethers.Contract(
			process.env.RARITY_ADDR, [
				'function getApproved(uint256 tokenId) external view returns (address operator)',
				'function isApprovedForAll(address owner, address operator) external view returns (bool)'
			], provider
		);
		const	[isApprovedForAll, approvedAddress] = await Promise.all([
			contract.isApprovedForAll(address, spender),
			contract.getApproved(adventurerID),
		]);

		if (isApprovedForAll || approvedAddress === spender) {
			return true;
		}
		return false;
	} catch (error) {
		return false;
	}
}