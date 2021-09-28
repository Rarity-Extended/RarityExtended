/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Monday September 27th 2021
**	@Filename:				FragmentR.js
******************************************************************************/

import	React			from	'react';

function	FragmentR() {
	return (
		<div className={'relative w-5 h-9'}>
			<div className={'absolute bg-black w-1 top-0 bottom-0 left-0'} />
			<div className={'absolute bg-black w-2 h-1 top-0 left-1'} />
			<div className={'absolute bg-black w-1 h-1 top-1 left-3'} />
			<div className={'absolute bg-black w-1 h-1 top-2 left-4'} />
			<div className={'absolute bg-black w-1 h-1 top-3 left-3'} />
			<div className={'absolute bg-black w-1 h-1 top-4 left-2'} />
			<div className={'absolute bg-black w-1 h-1 top-5 left-3'} />
			<div className={'absolute bg-black w-1 top-6 left-4 bottom-0'} />
		</div>
	);
}

export default FragmentR;