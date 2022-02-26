import	{ethers}			from	'ethers';
import	toast				from	'react-hot-toast';
import	* as ABI			from	'utils/abi/mixed.min.abi';


const	slotsRegistry = {
	1: process.env.RARITY_EQUIPMENT_ARMOR_HEAD_ADDR,
	2: process.env.RARITY_EQUIPMENT_ARMOR_BODY_ADDR,
	3: process.env.RARITY_EQUIPMENT_ARMOR_HAND_ADDR,
	4: process.env.RARITY_EQUIPMENT_ARMOR_FOOT_ADDR,
	5: process.env.RARITY_EQUIPMENT_WEAPON_PRIMARY_ADDR,
	6: process.env.RARITY_EQUIPMENT_WEAPON_SECONDARY_ADDR,
	101: process.env.RARITY_EQUIPMENT_WEAPON_SHIELD_ADDR,
};

function	onSuccessToast(_toast) {
	toast.dismiss(_toast);
	toast.success('Transaction successful');
}

const	RARITY_MANIFEST = new ethers.Contract(
	process.env.RARITY_ADDR, [
		'function isApprovedForAll(address owner, address operator) external view returns (bool)',
		'function setApprovalForAll(address operator, bool approved) external',
	]
);

export async function	isApprovedForAll({provider}) {
	const	signer = provider.getSigner();
	const	address = await signer.getAddress();
	const	raritySource = RARITY_MANIFEST.connect(signer);
	const	isApprovedForAll = await raritySource.isApprovedForAll(
		address,
		process.env.RARITY_EQUIPMENT_WRAPPER_ADDR
	);
	return isApprovedForAll;
}

export async function	approveForAll({provider}, onError = () => null, onSuccess = () => null) {
	let		_toast;
	const	signer = provider.getSigner();
	const	raritySource = RARITY_MANIFEST.connect(signer);
	try {
		_toast = toast.loading('Approving equipment...');
		const	transaction = await raritySource.setApprovalForAll(process.env.RARITY_EQUIPMENT_WRAPPER_ADDR, true);
		const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
		if (transactionResult.status === 1) {
			onSuccessToast();
			onSuccess();
		} else {
			toast.dismiss(_toast);
			toast.error('Approve reverted');
			onError({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		toast.dismiss(_toast);
		toast.error('Approve reverted');
		onError({error: true, data: undefined});
	}
}

export async function	equip({provider, tokenID, minter, itemID, itemName, slot}, callback) {
	let		_toast;
	let		currentStep = 1;
	let		steps = 1;
	const	signer = provider.getSigner();
	const	address = await signer.getAddress();
	const	rarityEquipmentContract = new ethers.Contract(
		process.env.RARITY_EQUIPMENT_WRAPPER_ADDR, [
			'function RARITY_EXTENDED_NPC() public view returns (uint256)',
			'function set_equipement(uint _slot, uint _adventurer, address _operator, address _registry, uint256 _tokenID) public',
		], signer
	);

	const	isApproved = await isApprovedForAll({provider});
	if (!isApproved) {
		try {
			_toast = toast.loading('Approving equipment...');
			const	raritySource = RARITY_MANIFEST.connect(signer);
			const	transaction = await raritySource.setApprovalForAll(
				process.env.RARITY_EQUIPMENT_WRAPPER_ADDR,
				true
			);
			const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
			if (transactionResult.status === 1) {
				toast.dismiss(_toast);
			} else {
				toast.dismiss(_toast);
				toast.error('Approve reverted');
				callback({error: true, data: undefined});
				return;
			}
		} catch (error) {
			console.error(error);
			toast.dismiss(_toast);
			toast.error('Approve reverted');
			callback({error: true, data: undefined});
			return;
		}
	}
	

	try {
		const	minterContract = new ethers.Contract(minter, [
			'function approve(address to, uint256 tokenId) external',
			'function getApproved(uint256 tokenId) external view returns (address operator)',
		], signer);
		const	approved = await minterContract.getApproved(itemID);
		if (approved !== process.env.RARITY_EQUIPMENT_WRAPPER_ADDR) {
			_toast = toast.loading(`${currentStep++}/${++steps} - Approving ${itemName}...`);
			const	transaction = await minterContract.approve(process.env.RARITY_EQUIPMENT_WRAPPER_ADDR, itemID);
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

	_toast = toast.loading(`${currentStep}/${steps} - Trying to equip ${itemName}...`);
	try {
		const	transaction = await rarityEquipmentContract.set_equipement(
			slot,
			tokenID,
			address,
			minter,
			itemID
		);
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

export async function	rEquip({provider, tokenID, minter, itemID, itemName, slot}, callback) {
	let		_toast;
	let		currentStep = 1;
	let		steps = 1;
	const	signer = provider.getSigner();
	const	rarityEquipmentContract = new ethers.Contract(
		process.env.RARITY_EQUIPMENT_WRAPPER_ADDR, [
			'function RARITY_EXTENDED_NPC() public view returns (uint256)',
			'function set_rEquipement(uint _slot, uint _adventurer, uint _operator, address _registry, uint256 _tokenID) public',
		],
		signer
	);

	//3 steps : Approve adventurer, approve Token and equip
	const	isApproved = await isApprovedForAll({provider});
	if (!isApproved) {
		const	raritySource = RARITY_MANIFEST.connect(signer);
		try {
			_toast = toast.loading('Approving equipment...');
			const	transaction = await raritySource.setApprovalForAll(process.env.RARITY_EQUIPMENT_WRAPPER_ADDR, true);
			const	transactionResult = await transaction.wait(process.env.DEFAULT_WAIT);
			if (transactionResult.status === 1) {
				toast.dismiss(_toast);
			} else {
				toast.dismiss(_toast);
				toast.error('Approve reverted');
				callback({error: true, data: undefined});
				return;
			}
		} catch (error) {
			console.error(error);
			toast.dismiss(_toast);
			toast.error('Approve reverted');
			callback({error: true, data: undefined});
			return;
		}
	}

	try {
		const	minterContract = new ethers.Contract(minter, [
			'function approve(uint, uint, uint) external',
			'function getApproved(uint, uint) external view returns (uint)'
		], signer);
		const	[manager, approved] = await Promise.all([
			rarityEquipmentContract.RARITY_EXTENDED_NPC(),
			minterContract.getApproved(tokenID, itemID)
		]);
		if (Number(approved) !== Number(manager)) {
			_toast = toast.loading(`${currentStep++}/${++steps} - Approving ${itemName}...`);
			const	transaction = await minterContract.approve(tokenID, manager, itemID);
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

	toast.dismiss(_toast);
	_toast = toast.loading(`${currentStep}/${steps} - Trying to equip ${itemName}...`);
	try {
		const	transaction = await rarityEquipmentContract.set_rEquipement(slot, tokenID, tokenID, minter, itemID);
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

export async function	unequip({provider, tokenID, itemName, slot}, callback) {
	let		_toast;
	const	signer = provider.getSigner();
	const	rarityEquipmentContract = new ethers.Contract(
		slotsRegistry[slot], [
			'function unset_equipement(uint _adventurer) public',
		],
		signer
	);

	toast.dismiss(_toast);
	_toast = toast.loading(`Trying to unequip ${itemName}...`);
	try {
		const	transaction = await rarityEquipmentContract.unset_equipement(tokenID);
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

export async function	buyBasicSet({provider, tokenID, setID, setName}, callback) {
	let		_toast;
	const	signer = provider.getSigner();

	_toast = toast.loading(`Buying ${setName}...`);
	try {
		const	rarityEquipmentBasicSet = new ethers.Contract(
			process.env.RARITY_EXTENDED_EQUIPMENT_BASIC_SET_ADDR,
			ABI.RARITY_EXTENDED_EQUIPMENT_BASIC_SET_ABI,
			signer
		);
		const	transaction = await rarityEquipmentBasicSet.buySet(setID, tokenID, {value: ethers.utils.parseEther('5')});
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