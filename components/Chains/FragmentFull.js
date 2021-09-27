/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Monday September 27th 2021
**	@Filename:				FragmentFull.js
******************************************************************************/

import	React			from	'react';

function	FragmentFull() {
	return (
		<div className={'relative w-5 h-10'}>
			<div className={'bg-stone-secondary-highlight absolute h-1 top-0 right-1 left-1'} />
			<div className={'bg-stone-secondary-highlight absolute w-1 top-1 bottom-1 left-0'} />
			<div className={'bg-stone-secondary-highlight absolute w-1 top-1 bottom-1 right-0'} />
			<div className={'bg-stone-secondary-highlight absolute h-1 bottom-0 right-1 left-1'} />
		</div>
	);
}

export default FragmentFull;