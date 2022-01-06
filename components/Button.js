/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 25th 2021
**	@Filename:				Button.js
******************************************************************************/

import	React		from	'react';

function	Button({
	children, onClick, disabled,
	className,
	disabledClassName,
	borderStyle = 'bg-black dark:bg-dark-100',
	disabledBorderStyle = 'bg-dark-100 dark:bg-dark-600',
	backgroundColor = 'bg-white dark:bg-dark-600 hover:bg-gray-primary dark:hover:bg-dark-400'}) {
	return (
		<div className={`relative ${disabled ? disabledClassName : className} py-3 px-14 text-regular ${disabled ? '' : 'cursor-pointer'}`} onClick={() => {if(!disabled) onClick();}}>
			<div className={`${disabled ? disabledBorderStyle : borderStyle} absolute h-1 top-0 left-1 right-1`} />
			<div className={`${disabled ? disabledBorderStyle : borderStyle} absolute h-1 w-1 top-1 left-0`} />
			<div className={`${disabled ? disabledBorderStyle : borderStyle} absolute h-1 w-1 top-1 right-0`} />
			<div className={`${disabled ? disabledBorderStyle : borderStyle} absolute w-1 top-2 bottom-2 left-0`} />
			{children}
			<div className={`${disabled ? disabledBorderStyle : borderStyle} absolute w-1 top-2 bottom-2 right-0`} />
			<div className={`${disabled ? disabledBorderStyle : borderStyle} absolute h-1 w-1 bottom-1 left-0`} />
			<div className={`${disabled ? disabledBorderStyle : borderStyle} absolute h-1 w-1 bottom-1 right-0`} />
			<div className={`${disabled ? disabledBorderStyle : borderStyle} absolute h-1 bottom-0 left-1 right-1`} />

			<div className={`${disabled ? disabledBorderStyle : borderStyle} absolute h-1 w-1 top-2 right-2`} />
			<div className={`${disabled ? disabledBorderStyle : borderStyle} absolute h-1 w-1 top-2 left-2`} />
			<div className={`${disabled ? disabledBorderStyle : borderStyle} absolute h-1 w-1 bottom-2 right-2`} />
			<div className={`${disabled ? disabledBorderStyle : borderStyle} absolute h-1 w-1 bottom-2 left-2`} />

			<div className={`${backgroundColor} absolute h-1 w-1 top-0 right-0`} />
			<div className={`${backgroundColor} absolute h-1 w-1 top-0 left-0`} />
			<div className={`${backgroundColor} absolute h-1 w-1 bottom-0 right-0`} />
			<div className={`${backgroundColor} absolute h-1 w-1 bottom-0 left-0`} />
		</div>
	);
}

export default Button;