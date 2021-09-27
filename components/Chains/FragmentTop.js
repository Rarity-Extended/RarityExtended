/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Monday September 27th 2021
**	@Filename:				FragmentTop.js
******************************************************************************/

import	React			from	'react';

function	FragmentTop() {
	return (
		<div className={'relative w-5 h-5'}>
			<div className={'bg-stone-secondary-highlight absolute h-1 top-0 right-1 left-1'} />
			<div className={'bg-stone-secondary-highlight absolute w-1 top-1 bottom-0 left-0'} />
			<div className={'bg-stone-secondary-highlight absolute w-1 top-1 bottom-0 right-0'} />
		</div>
	);
}

export default FragmentTop;