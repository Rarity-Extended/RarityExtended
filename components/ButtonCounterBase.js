/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 25th 2021
**	@Filename:				ButtonCounter.js
******************************************************************************/

import	React		from	'react';

function	ButtonCounterBase({
	className,
	value,
	onIncrement,
	onDecrement,
	backgroundColor = 'bg-white dark:bg-dark-600 hover:bg-gray-principal dark:hover:bg-dark-400'
}) {
	const	borderStyle = 'absolute bg-black dark:bg-dark-100';
	return (
		<div className={'flex flex-row items-center'}>
			<button>
				<div
					className={`relative ${className} w-10 h-10 flex flex-center text-regular text-black dark:text-dark-100`}
					onClick={onDecrement}>
					{/* CHEVRON */}
					<svg className={'mr-0.5 transform rotate-180'} width={'24'} height={'24'} viewBox={'0 0 24 24'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
						<path d={'M8 2H12V6H16V10H20V14H16V18H12V22H8V18H12V14H16V10H12V6H8V2Z'} fill={'currentcolor'}/>
					</svg>

					{/* PIXEL CUSTOM BORDER */}
					<div className={`${borderStyle} h-1 top-0 left-1 right-1`} />
					<div className={`${borderStyle} h-1 w-1 top-1 left-0`} />
					<div className={`${borderStyle} h-1 w-1 top-1 right-0`} />
					<div className={`${borderStyle} w-1 top-2 bottom-2 left-0`} />
					<div className={`${borderStyle} w-1 top-2 bottom-2 right-0`} />
					<div className={`${borderStyle} h-1 bottom-0 left-1 right-1`} />
					<div className={`${borderStyle} h-1 w-1 top-0 right-0`} />
					<div className={`${borderStyle} h-1 w-1 top-0 left-0`} />
					<div className={`${borderStyle} h-1 w-1 bottom-0 right-0`} />
					<div className={`${borderStyle} h-1 w-1 bottom-0 left-0`} />

					{/* PIXEL CUSTOM EXTRA BORDER */}
					<div className={`${borderStyle} h-1 w-1 top-1 left-2`} />
					<div className={`${borderStyle} h-1 w-1 top-1 right-2`} />
					<div className={`${borderStyle} h-1 w-1 top-2 left-1`} />
					<div className={`${borderStyle} h-1 w-1 top-2 right-1`} />
					<div className={`${borderStyle} h-1 w-1 bottom-1 left-2`} />
					<div className={`${borderStyle} h-1 w-1 bottom-1 right-2`} />
					<div className={`${borderStyle} h-1 w-1 bottom-2 left-1`} />
					<div className={`${borderStyle} h-1 w-1 bottom-2 right-1`} />

					{/* PIXEL CUSTOM BACKGROUND */}
					<div className={`${backgroundColor} absolute h-1 w-1 top-1 right-0`} />
					{/* <div className={`${backgroundColor} absolute h-1 w-1 top-0 right-1`} /> */}
					<div className={`${backgroundColor} absolute h-1 w-1 top-1 right-1`} />
					<div className={`${backgroundColor} absolute h-1 w-1 bottom-1 right-0`} />
					{/* <div className={`${backgroundColor} absolute h-1 w-1 bottom-0 right-1`} /> */}
					<div className={`${backgroundColor} absolute h-1 w-1 bottom-1 right-1`} />
					<div className={`${backgroundColor} absolute h-1 w-1 top-1 left-0`} />
					<div className={`${backgroundColor} absolute h-1 w-1 top-0 left-1`} />
					<div className={`${backgroundColor} absolute h-1 w-1 top-1 left-1`} />
					<div className={`${backgroundColor} absolute h-1 w-1 bottom-1 left-0`} />
					<div className={`${backgroundColor} absolute h-1 w-1 bottom-0 left-1`} />
					<div className={`${backgroundColor} absolute h-1 w-1 bottom-1 left-1`} />
				</div>
			</button>
			<div className={'px-5 w-20 h-10 border-t-4 border-b-4 border-black dark:border-dark-100 text-regular flex flex-center'}>
				{value}
			</div>
			<button>
				<div
					className={`relative ${className} w-10 h-10 flex flex-center text-regular text-black dark:text-dark-100`}
					onClick={onIncrement}>
					{/* CHEVRON */}
					<svg className={'ml-0.5'} width={'24'} height={'24'} viewBox={'0 0 24 24'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
						<path d={'M8 2H12V6H16V10H20V14H16V18H12V22H8V18H12V14H16V10H12V6H8V2Z'} fill={'currentcolor'}/>
					</svg>

					{/* PIXEL CUSTOM BORDER */}
					<div className={`${borderStyle} h-1 top-0 left-1 right-1`} />
					<div className={`${borderStyle} h-1 w-1 top-1 left-0`} />
					<div className={`${borderStyle} h-1 w-1 top-1 right-0`} />
					<div className={`${borderStyle} w-1 top-2 bottom-2 left-0`} />
					<div className={`${borderStyle} w-1 top-2 bottom-2 right-0`} />
					<div className={`${borderStyle} h-1 bottom-0 left-1 right-1`} />
					<div className={`${borderStyle} h-1 w-1 top-0 right-0`} />
					<div className={`${borderStyle} h-1 w-1 top-0 left-0`} />
					<div className={`${borderStyle} h-1 w-1 bottom-0 right-0`} />
					<div className={`${borderStyle} h-1 w-1 bottom-0 left-0`} />

					{/* PIXEL CUSTOM EXTRA BORDER */}
					<div className={`${borderStyle} h-1 w-1 top-1 left-2`} />
					<div className={`${borderStyle} h-1 w-1 top-1 right-2`} />
					<div className={`${borderStyle} h-1 w-1 top-2 left-1`} />
					<div className={`${borderStyle} h-1 w-1 top-2 right-1`} />
					<div className={`${borderStyle} h-1 w-1 bottom-1 left-2`} />
					<div className={`${borderStyle} h-1 w-1 bottom-1 right-2`} />
					<div className={`${borderStyle} h-1 w-1 bottom-2 left-1`} />
					<div className={`${borderStyle} h-1 w-1 bottom-2 right-1`} />

					{/* PIXEL CUSTOM BACKGROUND */}
					<div className={`${backgroundColor} absolute h-1 w-1 top-1 right-0`} />
					<div className={`${backgroundColor} absolute h-1 w-1 top-0 right-1`} />
					<div className={`${backgroundColor} absolute h-1 w-1 top-1 right-1`} />
					<div className={`${backgroundColor} absolute h-1 w-1 bottom-1 right-0`} />
					<div className={`${backgroundColor} absolute h-1 w-1 bottom-0 right-1`} />
					<div className={`${backgroundColor} absolute h-1 w-1 bottom-1 right-1`} />
					<div className={`${backgroundColor} absolute h-1 w-1 top-1 left-0`} />
					{/* <div className={`${backgroundColor} absolute h-1 w-1 top-0 left-1`} /> */}
					<div className={`${backgroundColor} absolute h-1 w-1 top-1 left-1`} />
					<div className={`${backgroundColor} absolute h-1 w-1 bottom-1 left-0`} />
					{/* <div className={`${backgroundColor} absolute h-1 w-1 bottom-0 left-1`} /> */}
					<div className={`${backgroundColor} absolute h-1 w-1 bottom-1 left-1`} />
				</div>
			</button>
		</div>
	);
}

export default ButtonCounterBase;