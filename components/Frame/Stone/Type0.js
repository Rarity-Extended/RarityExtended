/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Monday September 27th 2021
**	@Filename:				Type0.js
******************************************************************************/

import	React	from	'react';

function	Type0() {
	return (
		<>
			{/* TOP_LEFT_CROSS */}
			<div className={'absolute bg-stone-primary w-1 h-1 left-2 top-1'} />
			<div className={'absolute bg-stone-primary w-1 h-1 left-2 top-3'} />
			<div className={'absolute bg-stone-primary w-1 h-1 left-1 top-2'} />
			<div className={'absolute bg-stone-primary w-1 h-1 left-3 top-2'} />

			{/* TOP_RIGHT_CROSS */}
			<div className={'absolute bg-stone-primary w-1 h-1 right-2 top-1'} />
			<div className={'absolute bg-stone-primary w-1 h-1 right-2 top-3'} />
			<div className={'absolute bg-stone-primary w-1 h-1 right-1 top-2'} />
			<div className={'absolute bg-stone-primary w-1 h-1 right-3 top-2'} />

			{/* BOTTOM_LEFT_CROSS */}
			<div className={'absolute bg-stone-primary w-1 h-1 left-2 bottom-1'} />
			<div className={'absolute bg-stone-primary w-1 h-1 left-2 bottom-3'} />
			<div className={'absolute bg-stone-primary w-1 h-1 left-1 bottom-2'} />
			<div className={'absolute bg-stone-primary w-1 h-1 left-3 bottom-2'} />

			{/* BOTTOM_RIGHT_CROSS */}
			<div className={'absolute bg-stone-primary w-1 h-1 right-2 bottom-1'} />
			<div className={'absolute bg-stone-primary w-1 h-1 right-2 bottom-3'} />
			<div className={'absolute bg-stone-primary w-1 h-1 right-1 bottom-2'} />
			<div className={'absolute bg-stone-primary w-1 h-1 right-3 bottom-2'} />

			{/* BORDERS_PLAIN */}
			<div className={'absolute bg-stone-primary h-1 right-5 left-5 top-2'} />
			<div className={'absolute bg-stone-primary h-1 right-5 left-5 bottom-2'} />
			<div className={'absolute bg-stone-primary w-1 top-5 left-2 bottom-5'} />
			<div className={'absolute bg-stone-primary w-1 top-5 right-2 bottom-5'} />
								
			{/* BORDER_EXCEPTIONS */}
			<div className={'absolute bg-black h-1 w-1 top-2'} style={{left: 'calc(50% - 6px)'}} />
			<div className={'absolute bg-black h-1 w-1 top-2'} style={{right: 'calc(50% - 6px)'}} />
			<div className={'absolute bg-black h-1 w-1 bottom-2'} style={{left: 'calc(50% - 6px)'}} />
			<div className={'absolute bg-black h-1 w-1 bottom-2'} style={{right: 'calc(50% - 6px)'}} />
			<div className={'absolute bg-black h-1 w-1 left-2'} style={{top: 'calc(50% - 6px)'}} />
			<div className={'absolute bg-black h-1 w-1 left-2'} style={{bottom: 'calc(50% - 6px)'}} />
			<div className={'absolute bg-black h-1 w-1 right-2'} style={{top: 'calc(50% - 6px)'}} />
			<div className={'absolute bg-black h-1 w-1 right-2'} style={{bottom: 'calc(50% - 6px)'}} />
		</>
	);
}

export default Type0;