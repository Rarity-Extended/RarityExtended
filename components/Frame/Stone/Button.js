/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Wednesday September 29th 2021
**	@Filename:				Button.js
******************************************************************************/

import	React	from	'react';

function	Button({children, onClick, className}) {
	return (
		<button
			onClick={onClick}
			className={`relative transition-colors group bg-stone-secondary active:bg-stone-secondary hover:bg-stone-hover flex justify-center pl-4 w-full h-10 items-center text-regular text-white ${className}`}>
			{children}
			<div className={'bg-black absolute h-1 top-0 left-1 right-1'} />
			<div className={'bg-black absolute h-1 w-1 top-1 left-0'} />
			<div className={'bg-black absolute h-1 w-1 top-1 right-0'} />
			<div className={'bg-black absolute w-1 top-2 bottom-2 left-0'} />
			<div className={'bg-black absolute w-1 top-2 bottom-2 right-0'} />
			<div className={'bg-black absolute h-1 bottom-0 left-1 right-1'} />
			
			<div className={'bg-stone-primary absolute h-1 w-1 top-1 right-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-0 right-1'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-1 right-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-0 right-1'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-1 left-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-0 left-1'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-1 left-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-0 left-1'} />

			<div className={'bg-black absolute h-1 w-1 top-1 left-1'} />
			<div className={'bg-black absolute h-1 w-1 bottom-1 left-1'} />
			<div className={'bg-black absolute h-1 w-1 top-1 right-1'} />
			<div className={'bg-black absolute h-1 w-1 bottom-1 right-1'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-0 left-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-0 right-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-0 left-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-0 right-0'} />

			<div className={'group-active:bg-stone-secondary-shadow bg-stone-secondary-highlight absolute h-1 top-1 left-2 right-2'} />
			<div className={'group-active:bg-stone-secondary-shadow bg-stone-secondary-highlight absolute w-1 top-2 bottom-2 left-1'} />
			<div className={'group-active:bg-stone-secondary-highlight bg-stone-secondary-shadow absolute h-1 bottom-1 left-2 right-2'} />
			<div className={'group-active:bg-stone-secondary-highlight bg-stone-secondary-shadow absolute w-1 top-2 bottom-2 right-1'} />
		</button>
	);
}

export default Button;