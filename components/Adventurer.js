/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 12th 2021
**	@Filename:				Adventurer.js
******************************************************************************/

import	React		from	'react';
import	Image		from	'next/image';
import	Box			from	'components/Box';
import	useUI		from	'contexts/useUI';
import	useRarity	from	'contexts/useRarity';
import	CLASSES		from	'utils/codex/classes';

function	Adventurer({rarityClass, adventurer, onClick, children, noHover, width, height, borderStyle = 'bg-black dark:bg-dark-100', bgStyle = 'bg-white dark:bg-dark-600'}) {
	const adventurerClass = rarityClass || CLASSES[adventurer.class];
	const	{raritySkins} = useUI();
	const	{skins} = useRarity();

	return (
		<Box
			className={`w-full p-4 flex justify-center items-center flex-col ${noHover ? '' : 'group hover:bg-gray-principal dark:hover:bg-dark-900 cursor-pointer'} transition-colors relative mb-4 md:mb-0 ${bgStyle}`}
			borderStyle={borderStyle}
			onClick={onClick}>
			<Image
				src={raritySkins ? skins[adventurer?.tokenID] || adventurer?.skin : adventurer?.skin}
				loading={'eager'}
				quality={90}
				width={width || 160}
				height={height || 160} />
			<p className={'text-sm text-black dark:text-white justify-center group-hover:underline'}>
				{adventurer.name || adventurer.tokenID}
			</p>
			<p className={'text-xss text-black dark:text-white justify-center text-center mt-1'}>{`${adventurerClass.name} level ${adventurer.level}`}</p>
			{children}
		</Box>
	);
}

export default Adventurer;