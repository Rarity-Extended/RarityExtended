/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Thursday September 23rd 2021
**	@Filename:				Bubble.js
******************************************************************************/

import	React		from	'react';

function	Box({children, className, style, onClick, borderStyle = 'bg-black dark:bg-dark-100'}) {
	return (
		<div
			style={style}
			className={`relative bg-white dark:bg-dark-600 ${className}`} onClick={onClick}>
			{children}
			<div className={`absolute h-1 ${borderStyle} top-0 left-1 right-1`} />
			<div className={`absolute h-1 w-1 ${borderStyle} top-1 left-0`} />
			<div className={`absolute h-1 w-1 ${borderStyle} top-1 right-0`} />
			<div className={`absolute w-1 ${borderStyle} top-2 bottom-2 -left-1`} />
			<div className={`absolute w-1 ${borderStyle} top-2 bottom-2 -right-1`} />
			<div className={`absolute h-1 w-1 ${borderStyle} bottom-1 left-0`} />
			<div className={`absolute h-1 w-1 ${borderStyle} bottom-1 right-0`} />
			<div className={`absolute h-1 ${borderStyle} bottom-0 left-1 right-1`} />

			<div className={`absolute h-1 w-1 bg-white dark:bg-dark-600 top-0 right-0`} />
			<div className={`absolute h-1 w-1 bg-white dark:bg-dark-600 top-0 left-0`} />
			<div className={`absolute h-1 w-1 bg-white dark:bg-dark-600 bottom-0 right-0`} />
			<div className={`absolute h-1 w-1 bg-white dark:bg-dark-600 bottom-0 left-0`} />
		</div>
	);
}

export default Box;