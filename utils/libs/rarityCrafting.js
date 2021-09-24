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
	if (proficiency == 1) {
		return 20;
	} else if (proficiency == 2) {
		return 25;
	} else if (proficiency == 3) {
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