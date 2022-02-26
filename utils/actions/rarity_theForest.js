/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday October 17th 2021
**	@Filename:				dungeon_theForest.js
******************************************************************************/

import	{ethers}			from	'ethers';
import	toast				from	'react-hot-toast';

export async function	exploreTheForest({provider, tokenID, timeInDays}, callback) {
	const	_toast = toast.loading('Heading to the Forest...');
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		process.env.DUNGEON_THE_FOREST_ADDR,
		process.env.DUNGEON_THE_FOREST_ABI,
		signer
	);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.startResearch(tokenID, timeInDays, {gasLimit: 200_000});
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Impossible to explore The Forest');
		callback({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.startResearch(tokenID, timeInDays, {gasLimit: 200_000});
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

export async function	discoverTreasureTheForest({provider, tokenID}, callback) {
	const	_toast = toast.loading('Digging in the Forest...');
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		process.env.DUNGEON_THE_FOREST_ADDR,
		process.env.DUNGEON_THE_FOREST_ABI,
		signer
	);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.discover(tokenID, {gasLimit: 300_000});
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('Your shovel broke ... Try another one');
		callback({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.discover(tokenID, {gasLimit: 300_000});
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
		toast.error('Your shovel broke ... Try another one');
		callback({error, data: undefined});
	}
}

export async function	levelUpTreasureTheForest({provider, tokenID, adventurerID, treasureName, xpRequired}, callback) {
	let		_toast = toast.loading(`1/3 - Approving Proxy Spender ${adventurerID}...`);
	const	signer = provider.getSigner();
	const	address = await signer.getAddress();
	const	rarity = new ethers.Contract(
		process.env.DUNGEON_THE_FOREST_ADDR,
		process.env.DUNGEON_THE_FOREST_ABI,
		signer
	);

	/**********************************************************************
	**	First, we need to approve this TX
	**********************************************************************/
	try {
		const	raritySource = new ethers.Contract(
			process.env.RARITY_ADDR, [
				'function setApprovalForAll(address operator, bool approved) external',
				'function isApprovedForAll(address owner, address operator) external view returns (bool)',
			],
			signer
		);
		const	isApprovedForAll = await raritySource.isApprovedForAll(address, process.env.RARITY_EXTENDED_XP_ADDR);
		if (isApprovedForAll) {
			//
		} else {
			const	transaction = await raritySource.setApprovalForAll(process.env.RARITY_EXTENDED_XP_ADDR, true);
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
	**	Then we need to allow the spender to spend amount XP
	**********************************************************************/
	try {
		_toast = toast.loading(`2/3 - Approving ${ethers.utils.formatEther(xpRequired)} XP to be used...`);
		const	rarityXpProxy = new ethers.Contract(
			process.env.RARITY_EXTENDED_XP_ADDR, [
				'function allowance(address _owner, uint _adventurer, address _operator) external view returns (uint256)',
				'function approve(uint _adventurer, address _operator, uint _amount) external returns (bool)',
			],
			signer
		);
		const	hasAllowance = await rarityXpProxy.allowance(address, adventurerID, process.env.DUNGEON_THE_FOREST_ADDR);
		if (hasAllowance.gte(xpRequired)) {
			toast.dismiss(_toast);
		} else {
			const	transaction = await rarityXpProxy.approve(adventurerID, process.env.DUNGEON_THE_FOREST_ADDR, xpRequired);
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


	_toast = toast.loading(`3/3 - Level-up treasure ${treasureName}...`);
	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.levelUp(tokenID, {gasLimit: 200_000});
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
		const	transaction = await rarity.levelUp(tokenID, {gasLimit: 200_000});
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

export async function	restoreTreasureTheForest({provider, tokenID, treasureName, adventurerID}, callback) {
	let		_toast = toast.loading(`1/2 - Approving treasure ${treasureName}...`);
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		process.env.DUNGEON_THE_FOREST_ADDR,
		process.env.DUNGEON_THE_FOREST_ABI,
		signer
	);

	/**********************************************************************
	**	First, we need to approve this TX
	**********************************************************************/
	try {
		const	raritySource = new ethers.Contract(
			process.env.DUNGEON_THE_FOREST_V1_ADDR, [
				'function getApproved(uint256 tokenId) external view returns (address operator)',
				'function approve(address to, uint256 tokenId) external'
			],
			signer
		);
		const	approvedAddr = await raritySource.getApproved(tokenID);
		if (approvedAddr === process.env.DUNGEON_THE_FOREST_ADDR) {
			toast.dismiss(_toast);
		} else {
			const	transaction = await raritySource.approve(process.env.DUNGEON_THE_FOREST_ADDR, tokenID);
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

	_toast = toast.loading(`2/2 - Restoring treasure ${treasureName}...`);
	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.restoreTreasure(tokenID, adventurerID, {gasLimit: 300_000});
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
		const	transaction = await rarity.restoreTreasure(tokenID, adventurerID, {gasLimit: 300_000});
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