/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Wednesday September 29th 2021
**	@Filename:				Type3.js
******************************************************************************/

import	React	from	'react';

function	Type3() {
	return (
		<>
			{/* CORNER_DECORATIONS */}
			<div className={'w-1 h-1 absolute top-1 left-1 bg-black'} />
			<div className={'w-1 h-1 absolute top-2 left-2 bg-black'} />
			<div className={'w-1 h-1 absolute top-1 right-1 bg-black'} />
			<div className={'w-1 h-1 absolute top-2 right-2 bg-black'} />
			<div className={'w-1 h-1 absolute bottom-1 left-1 bg-black'} />
			<div className={'w-1 h-1 absolute bottom-2 left-2 bg-black'} />
			<div className={'w-1 h-1 absolute bottom-1 right-1 bg-black'} />
			<div className={'w-1 h-1 absolute bottom-2 right-2 bg-black'} />
			<div className={'absolute bottom-2 top-2 right-4 left-4 bg-stone-primary'} />
			<div className={'absolute bottom-4 top-4 right-2 left-2 bg-stone-primary'} />
			{/* TOP_LEFT_TO_TOP_RIGHT */}
			<div className={'h-1 absolute top-1 left-5 right-5 bg-black'} />
			{/* TOP_BOTTOM_TO_BOTTOM_RIGHT */}
			<div className={'h-1 absolute bottom-1 left-5 right-5 bg-black'} />
			{/* TOP_LEFT */}
			<div className={'w-1 h-1 absolute top-2 left-4 bg-black'} />
			<div className={'w-1 h-1 absolute top-3 left-4 bg-black'} />
			<div className={'w-1 h-1 absolute top-4 left-3 bg-black'} />
			<div className={'w-1 h-1 absolute top-4 left-2 bg-black'} />
			<div className={'w-1 h-1 absolute top-5 left-1 bg-black'} />
			{/* TOP_TO_BOTTOM_LEFT */}
			<div className={'w-1 absolute top-6 bottom-6 left-1 bg-black'} />
			{/* BOTTOM_LEFT */}
			<div className={'w-1 h-1 absolute bottom-2 left-4 bg-black'} />
			<div className={'w-1 h-1 absolute bottom-3 left-4 bg-black'} />
			<div className={'w-1 h-1 absolute bottom-4 left-3 bg-black'} />
			<div className={'w-1 h-1 absolute bottom-4 left-2 bg-black'} />
			<div className={'w-1 h-1 absolute bottom-5 left-1 bg-black'} />
			{/* TOP_LEFT */}
			<div className={'w-1 h-1 absolute top-2 right-4 bg-black'} />
			<div className={'w-1 h-1 absolute top-3 right-4 bg-black'} />
			<div className={'w-1 h-1 absolute top-4 right-3 bg-black'} />
			<div className={'w-1 h-1 absolute top-4 right-2 bg-black'} />
			<div className={'w-1 h-1 absolute top-5 right-1 bg-black'} />
			{/* TOP_TO_BOTTOM_RIGHT */}
			<div className={'w-1 absolute top-6 bottom-6 right-1 bg-black'} />
			{/* BOTTOM_RIGHT */}
			<div className={'w-1 h-1 absolute bottom-2 right-4 bg-black'} />
			<div className={'w-1 h-1 absolute bottom-3 right-4 bg-black'} />
			<div className={'w-1 h-1 absolute bottom-4 right-3 bg-black'} />
			<div className={'w-1 h-1 absolute bottom-4 right-2 bg-black'} />
			<div className={'w-1 h-1 absolute bottom-5 right-1 bg-black'} />
			{/* TOP HIGHLIGHT */}
			<div className={'h-1 absolute top-2 left-5 right-5 bg-stone-primary-highlight'} />
			<div className={'h-2 w-1 absolute top-3 left-5 bg-stone-primary-highlight'} />
			<div className={'h-2 w-1 absolute top-4 left-4 bg-stone-primary-highlight'} />
			<div className={'h-1 w-2 absolute top-5 left-2 bg-stone-primary-highlight'} />
			<div className={'w-1 absolute top-5 bottom-5 left-2 bg-stone-primary-highlight'} />
			{/* BOTTOM SHADOW */}
			<div className={'h-1 absolute bottom-2 left-5 right-5 bg-stone-primary-shadow'} />
			<div className={'h-2 w-1 absolute bottom-3 right-5 bg-stone-primary-shadow'} />
			<div className={'h-2 w-1 absolute bottom-4 right-4 bg-stone-primary-shadow'} />
			<div className={'h-1 w-2 absolute bottom-5 right-2 bg-stone-primary-shadow'} />
			<div className={'w-1 absolute bottom-5 top-5 right-2 bg-stone-primary-shadow'} />
		</>
	);
}

export default Type3;