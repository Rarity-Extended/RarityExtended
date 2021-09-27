/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Thursday September 23rd 2021
**	@Filename:				Bubble.js
******************************************************************************/

import	React		from	'react';

function	Box({
	children, 
	className, 
	onClick, 
	backgroundColor = 'bg-white dark:bg-dark-600 hover:bg-gray-principal dark:hover:bg-dark-400',
	borderStyle = 'bg-black dark:bg-dark-100'
}) {
	return (
		<div className={`relative ${className} w-full h-10 flex justify-center items-center text-regular text-black dark:text-white`} onClick={onClick}>
			{children}
			{/* PIXEL CUSTOM BORDER */}
			<div className={`${borderStyle} absolute h-1 top-0 left-1 right-1`} />
			<div className={`${borderStyle} absolute h-1 w-1 top-1 left-0`} />
			<div className={`${borderStyle} absolute h-1 w-1 top-1 right-0`} />
			<div className={`${borderStyle} absolute w-1 top-2 bottom-2 left-0`} />
			<div className={`${borderStyle} absolute w-1 top-2 bottom-2 right-0`} />
			<div className={`${borderStyle} absolute h-1 bottom-0 left-1 right-1`} />
			<div className={`${borderStyle} absolute h-1 w-1 top-0 right-0`} />
			<div className={`${borderStyle} absolute h-1 w-1 top-0 left-0`} />
			<div className={`${borderStyle} absolute h-1 w-1 bottom-0 right-0`} />
			<div className={`${borderStyle} absolute h-1 w-1 bottom-0 left-0`} />

			{/* PIXEL CUSTOM EXTRA BORDER */}
			<div className={`${borderStyle} absolute h-1 w-1 top-1 left-2`} />
			<div className={`${borderStyle} absolute h-1 w-1 top-1 right-2`} />
			<div className={`${borderStyle} absolute h-1 w-1 top-2 left-1`} />
			<div className={`${borderStyle} absolute h-1 w-1 top-2 right-1`} />
			<div className={`${borderStyle} absolute h-1 w-1 bottom-1 left-2`} />
			<div className={`${borderStyle} absolute h-1 w-1 bottom-1 right-2`} />
			<div className={`${borderStyle} absolute h-1 w-1 bottom-2 left-1`} />
			<div className={`${borderStyle} absolute h-1 w-1 bottom-2 right-1`} />

			{/* PIXEL CUSTOM BACKGROUND */}
			<div className={`${backgroundColor} absolute h-1 w-1 top-1 right-0`} />
			<div className={`${backgroundColor} absolute h-1 w-1 top-0 right-1`} />
			<div className={`${backgroundColor} absolute h-1 w-1 top-1 right-1`} />
			<div className={`${backgroundColor} absolute h-1 w-1 bottom-1 right-0`} />
			<div className={`${backgroundColor} absolute h-1 w-1 bottom-0 right-1`} />
			<div className={`${backgroundColor} absolute h-1 w-1 bottom-1 right-1`} />
			<div className={`${backgroundColor} absolute h-1 w-1 top-1 left-0`} />
			<div className={`${backgroundColor} absolute h-1 w-1 top-0 left-1`} />
			<div className={`${backgroundColor} absolute h-1 w-1 top-1 left-1`} />
			<div className={`${backgroundColor} absolute h-1 w-1 bottom-1 left-0`} />
			<div className={`${backgroundColor} absolute h-1 w-1 bottom-0 left-1`} />
			<div className={`${backgroundColor} absolute h-1 w-1 bottom-1 left-1`} />
		</div>
	);
}

export default Box;