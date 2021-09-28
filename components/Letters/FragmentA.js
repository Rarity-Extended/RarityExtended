/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Monday September 27th 2021
**	@Filename:				FragmentA.js
******************************************************************************/

import	React			from	'react';

function	FragmentA() {
	return (
		<div className={'relative w-3 h-9'}>
			<div className={'absolute bg-black w-1 top-0 bottom-0 left-0'} />
			<div className={'absolute bg-black w-1 h-1 top-0 left-1'} />
			<div className={'absolute bg-black w-1 h-1 top-1 left-2'} />
			<div className={'absolute bg-black w-1 h-1 top-3 left-1'} />
			<div className={'absolute bg-black w-1 h-1 top-4 left-2'} />
		</div>
	);
}

export default FragmentA;