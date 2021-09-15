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
function classSkills(_class) {
	if (_class == 1) {
		return [false,false,false,true,false,true,false,false,false,false,false,false,false,true,false,false,true,true,false,true,false,false,false,false,true,false,false,false,false,false,false,true,true,false,false,false];
	} else if (_class == 2) {
		return [true,true,true,true,true,true,true,true,false,true,true,false,true,false,false,true,false,true,true,true,true,false,true,true,false,false,true,true,true,true,false,false,true,true,true,false];
	} else if (_class == 3) {
		return [false,false,false,false,true,true,false,true,false,false,false,false,false,false,true,false,false,false,true,false,false,false,false,true,false,false,false,false,false,true,false,false,false,false,false,false];
	} else if (_class == 4) {
		return [false,false,false,false,true,true,false,true,false,false,false,false,false,true,true,false,false,false,true,true,false,false,false,true,true,false,false,false,false,true,true,true,true,false,false,false];
	} else if (_class == 5) {
		return [false,false,false,true,false,true,false,false,false,false,false,false,false,true,false,false,true,true,false,false,false,false,false,false,true,false,false,false,false,false,false,false,true,false,false,false];
	} else if (_class == 6) {
		return [false,true,false,true,true,true,false,true,false,false,true,false,false,false,false,true,false,true,true,true,true,false,true,true,false,false,true,false,false,false,true,false,true,true,false,false];
	} else if (_class == 7) {
		return [false,false,false,false,true,true,false,true,false,false,false,false,false,true,true,false,false,false,true,false,false,false,false,true,true,false,true,false,false,false,false,false,false,false,false,false];
	} else if (_class == 8) {
		return [false,false,false,true,true,true,false,false,false,false,false,false,false,true,true,false,false,true,true,true,true,false,false,true,true,true,false,false,false,false,true,true,true,false,false,true];
	} else if (_class == 9) {
		return [true,true,true,true,false,true,true,true,true,true,true,true,true,false,false,true,true,true,true,true,true,true,true,true,false,true,true,true,false,false,true,false,true,true,true,true];
	} else if (_class == 10) {
		return [false,false,true,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,true,false,false,false,false,false,true,false,false,false,false,false,false];
	} else if (_class == 11) {
		return [false,false,false,false,true,false,true,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,true,false,false,false,false,false,true,false,false,false,false,false,false];
	}
}

function calculatePointsForSet(_class, _skills){
	let		points = 0;
	const	_classSkills = classSkills(_class);
	for (let i = 0; i < 36; i++) {
		if (_classSkills[i]) {
			points += _skills[i];
		} else {
			points += _skills[i]*2;
		}
	}
	return points;
}


export {skillsPerLevel as availableSkillPoints, calculatePointsForSet};