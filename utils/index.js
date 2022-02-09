/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday August 31st 2021
**	@Filename:				index.js
******************************************************************************/

import	{ethers}						from	'ethers';
import	{Provider}						from	'ethcall';

export const toAddress = (address) => {
	if (!address) {
		return ethers.constants.AddressZero;
	}
	if (address === 'GENESIS') {
		return ethers.constants.AddressZero;
	}
	try {
		return ethers.utils.getAddress(address);	
	} catch (error) {
		return ethers.constants.AddressZero;
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
		ethcallProvider.multicall = {address: '0xc04d660976c923ddba750341fe5923e47900cf24'};
		ethcallProvider.multicall2 = {address: '0x470ADB45f5a9ac3550bcFFaD9D990Bf7e2e941c9'};
		return ethcallProvider;
	}
	await	ethcallProvider.init(provider);
	return	ethcallProvider;
}

export const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');