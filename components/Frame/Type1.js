/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Monday September 27th 2021
**	@Filename:				Type1.js
******************************************************************************/

import	React	from	'react';

function	Type1({children}) {
	return (
		<div className={'relative flex justify-center w-full items-center text-regular bg-stone-primary'}>
			{children}

			{/* BOTTOM */}
			<div className={'bg-black absolute h-1 -top-2 right-2 left-2'} />
			<div className={'bg-black absolute h-1 w-1 -top-2 right-0'} />
			<div className={'bg-black absolute h-1 w-1 -top-2 left-0'} />
			<div className={'bg-black absolute h-1 w-1 -top-1 right-2'} />
			<div className={'bg-black absolute h-1 w-1 -top-1 left-2'} />
			<div className={'bg-stone-primary absolute h-1 -top-1 left-3 right-3'} />
			<div className={'bg-black absolute h-1 w-1 top-0 right-1'} />
			<div className={'bg-black absolute h-1 w-1 top-0 left-1'} />
			<div className={'bg-black absolute h-1 w-1 top-0 right-0'} />
			<div className={'bg-black absolute h-1 w-1 top-0 left-0'} />

			{/* BOTTOM */}
			<div className={'bg-black absolute h-1 -bottom-2 right-2 left-2'} />
			<div className={'bg-black absolute h-1 w-1 -bottom-2 right-0'} />
			<div className={'bg-black absolute h-1 w-1 -bottom-2 left-0'} />
			<div className={'bg-black absolute h-1 w-1 -bottom-1 right-2'} />
			<div className={'bg-black absolute h-1 w-1 -bottom-1 left-2'} />
			<div className={'bg-stone-primary absolute h-1 -bottom-1 left-3 right-3'} />
			<div className={'bg-black absolute h-1 w-1 bottom-0 right-1'} />
			<div className={'bg-black absolute h-1 w-1 bottom-0 left-1'} />
			<div className={'bg-black absolute h-1 w-1 bottom-0 right-0'} />
			<div className={'bg-black absolute h-1 w-1 bottom-0 left-0'} />

			{/* SIDES */}
			<div className={'bg-black absolute w-1 left-0 top-0 bottom-0'} />
			<div className={'bg-black absolute w-1 right-0 top-0 bottom-0'} />
		</div>
	);
}

export default Type1;