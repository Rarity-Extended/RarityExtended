/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Wednesday September 29th 2021
**	@Filename:				Arrow.js
******************************************************************************/

import	React	from	'react';

function	Arrow({iconClassName, disabled, onClick}) {
	if (disabled) {
		return (
			<button disabled className={'cursor-not-allowed'}>
				<div className={'relative w-10 h-10'}>
					<div className={'bg-black absolute w-1 top-2 bottom-2 left-0'} />
					<div className={'bg-black absolute w-1 top-2 bottom-2 right-0'} />
					<div className={'bg-black absolute h-1 w-1 top-1 left-2'} />
					<div className={'bg-black absolute h-1 w-1 top-1 right-2'} />
					<div className={'bg-black absolute h-1 w-1 top-2 left-1'} />
					<div className={'bg-black absolute h-1 w-1 top-2 right-1'} />
					<div className={'bg-black absolute h-1 w-1 bottom-1 left-2'} />
					<div className={'bg-black absolute h-1 w-1 bottom-1 right-2'} />
					<div className={'bg-black absolute h-1 w-1 bottom-2 left-1'} />
					<div className={'bg-black absolute h-1 w-1 bottom-2 right-1'} />
				</div>
			</button>
		);
	}
	return (
		<button onClick={onClick}>
			<div className={'relative w-10 h-10 flex justify-center items-center group bg-stone-secondary active:bg-stone-secondary hover:bg-stone-hover'}>
				{/* CHEVRON */}
				<svg className={`${iconClassName}`} width={'24'} height={'24'} viewBox={'0 0 24 24'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
					<path d={'M8 2H12V6H16V10H20V14H16V18H12V22H8V18H12V14H16V10H12V6H8V2Z'} fill={'currentcolor'}/>
				</svg>

				{/* PIXEL CUSTOM BORDER */}
				<div className={'bg-black absolute h-1 top-0 left-1 right-1'} />
				<div className={'bg-black absolute h-1 w-1 top-1 left-0'} />
				<div className={'bg-black absolute h-1 w-1 top-1 right-0'} />
				<div className={'bg-black absolute w-1 top-2 bottom-2 left-0'} />
				<div className={'bg-black absolute w-1 top-2 bottom-2 right-0'} />
				<div className={'bg-black absolute h-1 bottom-0 left-1 right-1'} />
				<div className={'bg-black absolute h-1 w-1 top-0 right-0'} />
				<div className={'bg-black absolute h-1 w-1 top-0 left-0'} />
				<div className={'bg-black absolute h-1 w-1 bottom-0 right-0'} />
				<div className={'bg-black absolute h-1 w-1 bottom-0 left-0'} />

				{/* PIXEL CUSTOM EXTRA BORDER */}
				<div className={'bg-black absolute h-1 w-1 top-1 left-2'} />
				<div className={'bg-black absolute h-1 w-1 top-1 right-2'} />
				<div className={'bg-black absolute h-1 w-1 top-2 left-1'} />
				<div className={'bg-black absolute h-1 w-1 top-2 right-1'} />
				<div className={'bg-black absolute h-1 w-1 bottom-1 left-2'} />
				<div className={'bg-black absolute h-1 w-1 bottom-1 right-2'} />
				<div className={'bg-black absolute h-1 w-1 bottom-2 left-1'} />
				<div className={'bg-black absolute h-1 w-1 bottom-2 right-1'} />

				{/* PIXEL CUSTOM BACKGROUND */}
				<div className={'bg-stone-primary absolute h-1 w-1 top-1 right-0'} />
				<div className={'bg-stone-primary absolute h-1 w-1 top-0 right-1'} />
				<div className={'bg-stone-primary absolute h-1 w-1 top-1 right-1'} />
				<div className={'bg-stone-primary absolute h-1 w-1 bottom-1 right-0'} />
				<div className={'bg-stone-primary absolute h-1 w-1 bottom-0 right-1'} />
				<div className={'bg-stone-primary absolute h-1 w-1 bottom-1 right-1'} />
				<div className={'bg-stone-primary absolute h-1 w-1 top-1 left-0'} />
				<div className={'bg-stone-primary absolute h-1 w-1 top-1 left-1'} />
				<div className={'bg-stone-primary absolute h-1 w-1 bottom-1 left-0'} />
				<div className={'bg-stone-primary absolute h-1 w-1 bottom-1 left-1'} />
				<div className={'group-active:bg-stone-secondary-shadow bg-stone-secondary-highlight absolute h-1 w-4 top-1 left-3'} />
				<div className={'group-active:bg-stone-secondary-shadow bg-stone-secondary-highlight absolute h-4 w-1 top-3 left-1'} />
				<div className={'group-active:bg-stone-secondary-highlight bg-stone-secondary-shadow absolute h-1 w-4 bottom-1 right-3'} />
				<div className={'group-active:bg-stone-secondary-highlight bg-stone-secondary-shadow absolute h-4 w-1 bottom-3 right-1'} />

			</div>
		</button>
	);
}

export default Arrow;