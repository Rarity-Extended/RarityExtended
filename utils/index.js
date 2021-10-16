/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday August 31st 2021
**	@Filename:				index.js
******************************************************************************/

import	{ethers}						from	'ethers';

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


export const TOWN = {
	'tavern': {
		label: 'Tavern',
		icon: '/menu/tavern.png',
		text: 'Best place to get some news!',
		href: '/town/tavern'
	},
	'blacksmith': {
		label: 'Blacksmith',
		icon: '/menu/blacksmith.png',
		text: 'Come and craft mighty armors!',
		href: '/town/blacksmith'
	},
	'quest': {
		label: 'Quest Office',
		icon: '/menu/quest.png',
		text: 'Find an adventure worth your time',
		href: '/town/quest'
	},
	'market': {
		label: 'Market',
		icon: '/menu/market.png',
		text: 'Spend all your gold!',
		href: '/town/market'
	},
	'bank': {
		label: 'Bank',
		icon: '/menu/banker.png',
		text: 'Earn some yield on your Tokens',
		href: '/town/bank'
	},
	'guildHouse': {
		label: 'Guild House',
		icon: '/menu/guild house.png',
		text: 'Care for all your party',
		href: '/town/guild-house'
	},
	'apothecary': {
		label: 'Apothecary',
		icon: '/menu/apothecary.png',
		text: 'Craft potions, remedies and poisons',
		href: '/town/apothecary'
	},
	'cook': {
		label: 'Cook',
		icon: '/menu/cook.png',
		text: 'Become a Chef',
		href: '/town/cook'
	},
	'storage': {
		label: 'Storage',
		icon: '/menu/storage.png',
		text: 'Store some extra items',
		href: '/town/storage'
	},
};