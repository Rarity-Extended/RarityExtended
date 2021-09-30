/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 12th 2021
**	@Filename:				Adventurer.js
******************************************************************************/

import	React		from	'react';
import	Image		from	'next/image';
import	Box			from	'components/Box';

function	Adventurer({rarityClass, adventurer, onClick, children, noHover}) {
	return (
		<Box
			className={`w-full p-4 flex justify-center items-center flex-col ${noHover ? '' : 'group hover:bg-gray-principal dark:hover:bg-dark-100'} transition-colors cursor-pointer relative mb-4 md:mb-0`}
			onClick={onClick}>
			<Image
				src={rarityClass.img}
				loading={'eager'}
				quality={90}
				width={160}
				height={160} />
			<p className={'text-sm text-black dark:text-white justify-center group-hover:underline'}>{adventurer.tokenID}</p>
			<p className={'text-xss text-black dark:text-white justify-center text-center mt-1'}>{`${rarityClass.name} level ${adventurer.level}`}</p>
			{children}
		</Box>
	);
}

export default Adventurer;