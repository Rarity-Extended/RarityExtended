/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Friday September 17th 2021
**	@Filename:				levels.js
******************************************************************************/

export function xpRequired(curent_level) {
	let	xpToNextLevel = curent_level * 1000;
	for (let i = 1; i < curent_level; i++) {
		xpToNextLevel += i * 1000;
	}
	return xpToNextLevel;
}