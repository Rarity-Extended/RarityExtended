/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Wednesday September 29th 2021
**	@Filename:				rarityFeats.js
******************************************************************************/

export function featsPerLevel(_level) {
	return Math.floor((_level / 3) + 1);
}

export function initialFeatsPerClass(_class) {
	if (_class == 1) {
		return [91,75,5,6,63];
	} else if (_class == 2) {
		return [91,75,5,63];
	} else if (_class == 3) {
		return [91,5,6,7,63];
	} else if (_class == 4) {
		return [91,5,6,63];
	} else if (_class == 5) {
		return [91,75,5,6,7,63,96];
	} else if (_class == 6) {
		return [34,24];
	} else if (_class == 7) {
		return [91,75,5,6,7,63];
	} else if (_class == 8) {
		return [91,75,5,63];
	} else if (_class == 9) {
		return [91,75,5];
	} else if (_class == 10) {
		return [91];
	} else if (_class == 11) {
		return [91,88];
	}
	return [];
}

export function featsPerClass(_class, _level) {
	let	amount = featsPerLevel(_level);
	if (_class == 1) {
		amount += 5;
	} else if (_class == 2) {
		amount += 4;
	} else if (_class == 3) {
		amount += 5;
	} else if (_class == 4) {
		amount += 4;
	} else if (_class == 5) {
		amount += 7;
	} else if (_class == 6) {
		amount += 2;
	} else if (_class == 7) {
		amount += 6;
	} else if (_class == 8) {
		amount += 4;
	} else if (_class == 9) {
		amount += 3;
	} else if (_class == 10) {
		amount += 1;
	} else if (_class == 11) {
		amount += 2;
	}
	
	if (_class == 5) {
		amount += Math.floor((_level / 2) + 1);
	
	} else if (_class == 6) {
		if (_level >= 6) {
			amount += 3;
		} else if (_level >= 2) {
			amount += 2;
		} else {
			amount += 1;
		}
	} else if (_class == 11) {
		amount += Math.floor((_level / 5));
	}
	return amount;
}

