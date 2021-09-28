/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Friday September 24th 2021
**	@Filename:				rarityCrafting.js
******************************************************************************/

export function getGoodsDifficulty() {
	return 20;
}

export function getArmorDifficulty(armorBonus) {
	return 20 + armorBonus;
}

export function getWeaponDifficulty(proficiency) {
	if (proficiency == 'Simple') {
		return 20;
	} else if (proficiency == 'Martial') {
		return 25;
	} else if (proficiency == 'Exotic') {
		return 30;
	}
	return 20;
}

export function modifierForAttribute(_attribute) {
	if (_attribute == 9) {
		return -1;
	}
	return Math.floor((_attribute - 10) / 2);
}

export function craftSkillCheck(cratingLevel, int, difficulty) {
	let	check = cratingLevel;
	if (check == 0) {
		return 0;
	}
	check += modifierForAttribute(int);
	if (check <= 0) {
		return 0;
	}
	const	minValueToReachWithDice = difficulty - check;
	if (minValueToReachWithDice <= 0) {
		return 100;
	}
	const result = ((1 - (minValueToReachWithDice / 20)) * 100);
	if (result < 0)	{
		return (0);
	}
	return result.toFixed(2);
}

export function craftingMaterialsRequired(cratingLevel, int, difficulty) {
	let	check = cratingLevel;
	if (check == 0) {
		return 0;
	}
	check += modifierForAttribute(int);
	if (check <= 0) {
		return 0;
	}
	const	minValueToReachWithDice = difficulty - check;
	if (minValueToReachWithDice <= 0) {
		return 100;
	}
	return minValueToReachWithDice * 10;
}