/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 12th 2021
**	@Filename:				Adventurer.js
******************************************************************************/

import	React, {useState, useEffect, useCallback}		from	'react';
import	Image		from	'next/image';
import	Box			from	'components/Box';
import	useWeb3		from	'contexts/useWeb3';
import	{getSkinNFT}									from	'utils/actions/skins';
import useSkins from 'contexts/useSkins';

function	Adventurer({rarityClass, adventurer, onClick, children, noHover}) {
	const 	{provider} = useWeb3();
	const	[skinNft, set_skinNft] = useState();
	const	{skins} = useSkins();

	const fetchSkinNft = useCallback(async () => {
		if(adventurer?.skin){
			const nft = await getSkinNFT({
				provider, 
				tokenID: adventurer?.skin?.tokenID}, 
				({error}) => {
					if (error) {
						return console.error(error);
					}
			});
			set_skinNft(nft);
		}
	  }, [adventurer, provider, set_skinNft]) 

	useEffect(() => {
		fetchSkinNft();
	}, [fetchSkinNft]);

	return (
		<Box
			className={`w-full p-4 flex justify-center items-center flex-col ${noHover ? '' : 'group hover:bg-gray-principal dark:hover:bg-dark-900 cursor-pointer'} transition-colors relative mb-4 md:mb-0`}
			onClick={onClick}>
			<Image
				src={skins === 'on' && skinNft || rarityClass.img}
				loading={'eager'}
				quality={90}
				width={160}
				height={160} />
			<p className={'text-sm text-black dark:text-white justify-center group-hover:underline'}>
				{adventurer.name || adventurer.tokenID}
			</p>
			<p className={'text-xss text-black dark:text-white justify-center text-center mt-1'}>{`${rarityClass.name} level ${adventurer.level}`}</p>
			{children}
		</Box>
	);
}

export default Adventurer;