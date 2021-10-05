/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Thursday September 23rd 2021
**	@Filename:				Bubble.js
******************************************************************************/

import	React		from	'react';

function	BoxBubble({children, className}) {
	return (
		<div className={`nes-balloon from-left text-xs md:text-base relative ${className}`}>
			<div className={'absolute h-1 bg-black dark:bg-dark-100 top-0 left-1 right-1'} />
			<div className={'absolute h-1 w-1 bg-black dark:bg-dark-100 top-1 left-0'} />
			<div className={'absolute h-1 w-1 bg-black dark:bg-dark-100 top-1 right-0'} />
			<div className={'absolute w-1 bg-black dark:bg-dark-100 top-2 bottom-2 -left-1'} />
			<div className={'px-4 py-5'}>
				{children}
			</div>
			<div className={'absolute w-1 bg-black dark:bg-dark-100 top-2 bottom-2 -right-1'} />
			<div className={'absolute h-1 w-1 bg-black dark:bg-dark-100 bottom-1 left-0'} />
			<div className={'absolute h-1 w-1 bg-black dark:bg-dark-100 bottom-1 right-0'} />
			<div className={'absolute h-1 bg-black dark:bg-dark-100 bottom-0 left-1 right-1'} />

			<div className={'absolute h-1 w-1 bg-white dark:bg-dark-600 top-0 right-0'} />
			<div className={'absolute h-1 w-1 bg-white dark:bg-dark-600 top-0 left-0'} />
			<div className={'absolute h-1 w-1 bg-white dark:bg-dark-600 bottom-0 right-0'} />
			<div className={'absolute h-1 w-1 bg-white dark:bg-dark-600 bottom-0 left-0'} />
		</div>
	);
}

export default BoxBubble;