/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday August 31st 2021
**	@Filename:				index.js
******************************************************************************/

import	{ethers}						from	'ethers';
import	{Provider}						from	'ethcall';

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

export const toAddress = (address) => {
	if (!address) {
		return ADDRESS_ZERO;
	}
	if (address === 'GENESIS') {
		return ADDRESS_ZERO;
	}
	try {
		return ethers.utils.getAddress(address);	
	} catch (error) {
		return ADDRESS_ZERO;
	}
};

export const bigNumber = ethers.BigNumber;

export function truncateAddress(address) {
	if (address !== undefined) {
		return `${address.slice(0, 4)}...${address.slice(-4)}`;
	}
	return '0x000...0000';
}

export async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

export function	formatAmount(amount, decimals = 2) {
	return (new Intl.NumberFormat('en-US', {minimumFractionDigits: 0, maximumFractionDigits: decimals}).format(amount));
}

export function	formatValue(value, decimals = 2) {
	return (new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: decimals}).format(value));
}

export const chunk = (arr, size) => arr.reduce((acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []);

export const fetcher = (...args) => fetch(...args).then(res => res.json());

export function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


export async function newEthCallProvider(provider, devMode) {
	const	ethcallProvider = new Provider();
	if (devMode) {
		await	ethcallProvider.init(new ethers.providers.JsonRpcProvider('http://localhost:8545'));
		ethcallProvider.multicallAddress = '0xc04d660976c923ddba750341fe5923e47900cf24';
		return ethcallProvider;
	}
	await	ethcallProvider.init(provider);
	return	ethcallProvider;
}