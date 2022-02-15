/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday August 31st 2021
**	@Filename:				actions.js
******************************************************************************/

import	{ethers}			from	'ethers';
import	toast				from	'react-hot-toast';
import	CLASSES				from	'utils/codex/core/classes';
import	{RARITY_EXTENDED_NAME_ABI}			from	'utils/abi/mixed.min.abi';

function	onSuccessToast(_toast) {
	toast.dismiss(_toast);
	toast.success('Transaction successful');
}

async function	_adventure(loader, {provider, contractAddress, tokenID}, callback) {
	const	_toast = toast.loading(loader);
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function adventure(uint256 _summoner) public'],
		signer
	);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.adventure(tokenID);
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
		const	transaction = await rarity.adventure(tokenID);
		const	transactionResult = await transaction.wait(2);
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

export async function	goAdventure({loader, provider, contractAddress, tokenID}, callback) {
	_adventure(loader || 'Going on an adventure...', {provider, contractAddress, tokenID}, callback);
}
export async function	lootDungeonTheCellar({provider, contractAddress, tokenID}, callback) {
	_adventure('Looting the Big Ugly Rat...', {provider, contractAddress, tokenID}, callback);
}

export async function	levelUp({provider, tokenID}, callback) {
	const	_toast = toast.loading(`Level-up ${tokenID}...`);
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		process.env.RARITY_ADDR,
		process.env.RARITY_ABI,
		signer
	);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.level_up(tokenID);
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
		const	transaction = await rarity.level_up(tokenID);
		const	transactionResult = await transaction.wait(2);
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

export async function	learnSkills({provider, tokenID, skills}, callback) {
	const	_toast = toast.loading('Learning new skills...');
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		process.env.RARITY_SKILLS_ADDR,
		process.env.RARITY_SKILLS_ABI,
		signer
	);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.set_skills(tokenID, skills);
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
		const	transaction = await rarity.set_skills(tokenID, skills);
		const	transactionResult = await transaction.wait(2);
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

export async function	learnFeat({provider, tokenID, feat}, callback) {
	const	_toast = toast.loading('Learning new feat...');
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		process.env.RARITY_FEATS_ADDR,
		process.env.RARITY_FEATS_ABI,
		signer
	);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.select_feat(tokenID, feat);
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
		const	transaction = await rarity.select_feat(tokenID, feat);
		const	transactionResult = await transaction.wait(2);
		if (transactionResult.status === 1) {
			callback({error: false, data: tokenID});
			toast.dismiss(_toast);
			toast.success('Your knowledge increased');
		} else {
			toast.dismiss(_toast);
			toast.error('You failed to learn a new feat');
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Something went wrong, please try again later.');
		callback({error, data: undefined});
	}
}

export async function	recruitAdventurer({provider, classID}, callback) {
	const	_toast = toast.loading(`Recruiting a ${CLASSES[classID].name}...`);
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		process.env.RARITY_ADDR,
		process.env.RARITY_ABI,
		signer
	);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.summon(classID);
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
		const	transaction = await rarity.summon(classID);
		const	transactionResult = await transaction.wait(2);
		if (transactionResult.status === 1) {
			callback({error: false, data: classID});
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

export async function	setAttributes({provider, _summoner, _str, _dex, _const, _int, _wis, _cha}, callback) {
	const	_toast = toast.loading(`Setting attributes for ${_summoner}...`);
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		process.env.RARITY_ATTR_ADDR,
		process.env.RARITY_ATTR_ABI,
		signer
	);

	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarity.callStatic.point_buy(_summoner, _str, _dex, _const, _int, _wis, _cha);
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
		const	transaction = await rarity.point_buy(_summoner, _str, _dex, _const, _int, _wis, _cha);
		const	transactionResult = await transaction.wait(2);
		if (transactionResult.status === 1) {
			callback({error: false, data: {_summoner, _str, _dex, _const, _int, _wis, _cha}});
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

export async function	claimGold({provider, tokenID}, callback) {
	const	_toast = toast.loading(`Claiming gold for ${tokenID}...`);
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		process.env.RARITY_GOLD_ADDR,
		process.env.RARITY_GOLD_ABI,
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
		callback({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarity.claim(tokenID);
		const	transactionResult = await transaction.wait(2);
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

export async function	craft({
	provider,
	tokenID,
	itemName,
	baseType,
	itemType,
	craftingMaterials,
	forced = false
}, callback) {
	let		_toast;
	const	signer = provider.getSigner();
	const	rarityCraft = new ethers.Contract(
		process.env.RARITY_CRAFTING_ADDR,
		process.env.RARITY_CRAFTING_ABI,
		signer
	);

	/**********************************************************************
	**	Then, we need to simulate the crafting to avoid absolute errors
	**********************************************************************/
	if (!forced) {
		const	simulation = await rarityCraft.simulate(
			tokenID,
			baseType,
			itemType,
			craftingMaterials
		);
		if (!simulation.crafted) {
			// callback({error: 'SIMULATION_FAILED', data: tokenID});
			toast.error('IT\'S A BAD IDEA TO CRAFT THAT RIGHT NOW. TRY AGAIN LATER');
			// return;
		}
	}

	_toast = toast.loading(`Trying to craft ${itemName}...`);
	/**********************************************************************
	**	In order to avoid dumb error, let's first check if the TX would
	**	be successful with a static call
	**********************************************************************/
	try {
		await rarityCraft.callStatic.craft(
			tokenID,
			baseType,
			itemType,
			craftingMaterials
		);
	} catch (error) {
		toast.dismiss(_toast);
		toast.error('You have a bad feeling about this. You should retry later.');
		callback({error, data: undefined});
		return;
	}

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await rarityCraft.craft(
			tokenID,
			baseType,
			itemType,
			craftingMaterials,
			{gasLimit: 400_000}
		);
		const	transactionResult = await transaction.wait(2);
		if (transactionResult.status === 1) {
			if (transactionResult.logs.length === 0) {
				callback({error: 'CRAFT_FAILED', data: tokenID});
				toast.dismiss(_toast);
				toast.error('Craft attempt failed');	
				return;
			}
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


export async function	setName({provider, tokenID, name}, onError, onSuccess = onSuccessToast) {
	const	_toast = toast.loading(`Name ${tokenID} to ${name}...`);
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		process.env.RARITY_EXTENDED_NAME,
		RARITY_EXTENDED_NAME_ABI,
		signer
	);

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
		onError({error, data: undefined});
	}
}
