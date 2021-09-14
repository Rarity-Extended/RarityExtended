/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@MajorTom_eth
**	@Date:					Sunday September 12th 2021
**	@Filename:				Adventurer.js
******************************************************************************/

import	React		from	'react';
import	Image		from	'next/image';

function	Adventurer({rarityClass, adventurer, onClick}) {
	return (
		<div
			className={'w-full md:w-60 border-black dark:border-dark-100 border-4 p-4 flex justify-center items-center flex-col group hover:bg-gray-principal dark:hover:bg-dark-100 transition-colors cursor-pointer relative mb-4 md:mb-0'}
			onClick={onClick}>
			<Image
				src={rarityClass.img}
				quality={100}
				width={240}
				height={240} />
			<p className={'text-sm justify-center group-hover:underline'}>{adventurer.tokenID}</p>
			<p className={'text-xss justify-center text-center mt-1'}>{`${rarityClass.name} level ${adventurer.level}`}</p>
		</div>
	);
}

export default Adventurer;