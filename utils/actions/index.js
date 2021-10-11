/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday August 31st 2021
**	@Filename:				actions.js
******************************************************************************/

import	{ethers}			from	'ethers';
import	toast				from	'react-hot-toast';
import	CLASSES				from	'utils/codex/classes';
import	RARITY_CRAFTING_ABI	from	'utils/abi/rarityCrafting.abi';
import	EXTENDED_NAME_ABI	from	'utils/abi/rarityExtendedName.abi';

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

export async function	goAdventure({loader, provider, contractAddress, tokenID}, callback) {
	_adventure(loader || 'Going on an adventure...', {provider, contractAddress, tokenID}, callback);
}
export async function	lootDungeonTheCellar({provider, contractAddress, tokenID}, callback) {
	_adventure('Looting the Big Ugly Rat...', {provider, contractAddress, tokenID}, callback);
}

export async function	levelUp({provider, contractAddress, tokenID}, callback) {
	const	_toast = toast.loading(`Level-up ${tokenID}...`);
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function level_up(uint256 _summoner) public'],
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

export async function	learnSkills({provider, contractAddress, tokenID, skills}, callback) {
	const	_toast = toast.loading('Learning new skills...');
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function set_skills(uint256 _summoner, uint8[36] _skills) public'],
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

export async function	learnFeat({provider, contractAddress, tokenID, feat}, callback) {
	const	_toast = toast.loading('Learning new feat...');
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function select_feat(uint _summoner, uint _feat)'],
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
		const	transactionResult = await transaction.wait();
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

export async function	recruitAdventurer({provider, contractAddress, classID}, callback) {
	const	_toast = toast.loading(`Recruiting a ${CLASSES[classID].name}...`);
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function summon(uint256 _class) public'],
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
		const	transactionResult = await transaction.wait();
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

export async function	setAttributes({provider, contractAddress, _summoner, _str, _dex, _const, _int, _wis, _cha}, callback) {
	const	_toast = toast.loading(`Setting attributes for ${_summoner}...`);
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function point_buy(uint _summoner, uint32 _str, uint32 _dex, uint32 _const, uint32 _int, uint32 _wis, uint32 _cha) public'],
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
		const	transactionResult = await transaction.wait();
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

export async function	claimGold({provider, contractAddress, tokenID}, callback) {
	const	_toast = toast.loading(`Claiming gold for ${tokenID}...`);
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function claim(uint256 _summoner) public'],
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
		const	transactionResult = await transaction.wait();
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
			const	transactionResult = await transaction.wait();
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
		const	transactionResult = await transaction.wait();
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
			const	transactionResult = await transaction.wait();
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
		const	transactionResult = await transaction.wait();
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
		const	transactionResult = await transaction.wait();
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

export async function	exploreTheForest({provider, contractAddress, tokenID, timeInDays}, callback) {
	const	_toast = toast.loading('Heading to the Forest...');
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function startResearch(uint256 _summoner, uint256 timeInDays) public'],
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

export async function	discoverTreasureTheForest({provider, contractAddress, tokenID}, callback) {
	const	_toast = toast.loading('Digging in the Forest...');
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function discover(uint256 _summoner) public'],
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
		toast.error('Your shovel broke ... Try another one');
		callback({error, data: undefined});
	}
}

export async function	levelUpTreasureTheForestOld({provider, contractAddress, tokenID, adventurerID, treasureName}, callback) {
	let		_toast = toast.loading(`1/2 - Approving adventurer ${adventurerID}...`);
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function levelUp(uint256 tokenId) public'],
		signer
	);

	/**********************************************************************
	**	First, we need to approve this TX
	**********************************************************************/
	try {
		const	raritySource = new ethers.Contract(
			process.env.RARITY_ADDR, [
				'function getApproved(uint256 tokenId) external view returns (address operator)',
				'function approve(address to, uint256 tokenId) external'
			],
			signer
		);
		const	approvedAddr = await raritySource.getApproved(adventurerID);
		if (approvedAddr === process.env.RARITY_EXTENDED_XP) {
			toast.dismiss(_toast);
		} else {
			const	transaction = await raritySource.approve(process.env.RARITY_EXTENDED_XP, adventurerID);
			const	transactionResult = await transaction.wait();
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

	_toast = toast.loading(`2/2 - Level-up treasure ${treasureName}...`);
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

export async function	levelUpTreasureTheForest({provider, contractAddress, tokenID, adventurerID, treasureName, xpRequired}, callback) {
	let		_toast = toast.loading(`1/3 - Approving Proxy Spender ${adventurerID}...`);
	const	signer = provider.getSigner();
	const	address = await signer.getAddress();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function levelUp(uint256 tokenId) public'],
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
		const	isApprovedForAll = await raritySource.isApprovedForAll(address, process.env.RARITY_EXTENDED_XP);
		if (isApprovedForAll) {
			//
		} else {
			const	transaction = await raritySource.setApprovalForAll(process.env.RARITY_EXTENDED_XP, true);
			const	transactionResult = await transaction.wait();
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
			process.env.RARITY_EXTENDED_XP, [
				'function allowance(address _owner, uint _adventurer, address _operator) external view returns (uint256)',
				'function approve(uint _adventurer, address _operator, uint _amount) external returns (bool)',
			],
			signer
		);
		const	hasAllowance = await rarityXpProxy.allowance(address, adventurerID, contractAddress);
		if (hasAllowance.gte(xpRequired)) {
			toast.dismiss(_toast);
		} else {
			const	transaction = await rarityXpProxy.approve(adventurerID, contractAddress, xpRequired);
			const	transactionResult = await transaction.wait();
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


export async function	restoreTreasureTheForest({provider, contractAddress, tokenID, treasureName, adventurerID}, callback) {
	let		_toast = toast.loading(`1/2 - Approving treasure ${treasureName}...`);
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		contractAddress,
		['function restoreTreasure(uint256 tokenId, uint256 receiver) public'],
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
		if (approvedAddr === contractAddress) {
			toast.dismiss(_toast);
		} else {
			const	transaction = await raritySource.approve(contractAddress, tokenID);
			const	transactionResult = await transaction.wait();
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

export async function	craft({
	provider,
	contractAddress,
	tokenID,
	itemName,
	baseType,
	itemType,
	craftingMaterials,
	forced = false
}, callback) {
	let		hadApprove = false;
	let		_toast;
	const	signer = provider.getSigner();
	const	rarityCraft = new ethers.Contract(
		contractAddress,
		RARITY_CRAFTING_ABI,
		signer
	);

	/**********************************************************************
	**	First, we need to approve this TX
	**********************************************************************/
	try {
		const	raritySource = new ethers.Contract(
			process.env.RARITY_ADDR, [
				'function getApproved(uint256 tokenId) external view returns (address operator)',
				'function approve(address to, uint256 tokenId) external'
			],
			signer
		);
		const	approvedAddr = await raritySource.getApproved(tokenID);
		if (approvedAddr !== contractAddress) {
			hadApprove = true;
			_toast = toast.loading('1/2 - Approving craft ...');
			const	transaction = await raritySource.approve(contractAddress, tokenID);
			const	transactionResult = await transaction.wait();
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
			callback({error: 'SIMULATION_FAILED', data: tokenID});
			toast.error('IT\'S A BAD IDEA TO CRAFT THAT RIGHT NOW. TRY AGAIN LATER');
			return;
		}
	}

	if (hadApprove) {
		_toast = toast.loading(`2/2 Trying to craft ${itemName}...`);
	} else {
		_toast = toast.loading(`Trying to craft ${itemName}...`);
	}
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
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			if (transactionResult.logs.length === 0) {
				callback({error: 'CRAFT_FAILED', data: tokenID});
				toast.dismiss(_toast);
				toast.error('YOU FAILED YOUR CRAFT ATTEMPT');	
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

export async function	setName({provider, tokenID, name}, onError, onSuccess = onSuccessToast) {
	const	_toast = toast.loading(`Name ${tokenID} to ${name}...`);
	const	signer = provider.getSigner();
	const	rarity = new ethers.Contract(
		process.env.RARITY_EXTENDED_NAME,
		EXTENDED_NAME_ABI,
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
		const	transactionResult = await transaction.wait();
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
