/******************************************************************************
**	@Author:				Thomas Bouder <Tbouder>
**	@Email:					Tbouder@protonmail.com
**	@Date:					Monday September 13th 2021
**	@Filename:				skills.js
******************************************************************************/

function basePerClass(_class) {
	if (_class == 1) {
		return 4;
	} else if (_class == 2) {
		return 6;
	} else if (_class == 3) {
		return 2;
	} else if (_class == 4) {
		return 4;
	} else if (_class == 5) {
		return 2;
	} else if (_class == 6) {
		return 4;
	} else if (_class == 7) {
		return 2;
	} else if (_class == 8) {
		return 6;
	} else if (_class == 9) {
		return 8;
	} else if (_class == 10) {
		return 2;
	} else if (_class == 11) {
		return 2;
	}
}

function modifierForAttribute(_attribute) {
	if (_attribute == 9) {
		return -1;
	}
	return (_attribute - 10) / 2;
}

function skillsPerLevel(_int, _class, _level) {
	const	modifier = modifierForAttribute(_int);

	return ((basePerClass(_class)) + modifier) * (_level + 3);
}


export {skillsPerLevel as availableSkillPoints};