/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday October 16th 2021
**	@Filename:				[tokenID].js
******************************************************************************/

import	React						from	'react';
import	SectionCharacterSheet		from	'sections/SectionCharacterSheet';
import	useWeb3						from	'contexts/useWeb3';
import	useRarity					from	'contexts/useRarity';

function	Index({router}) {
	const	{provider, chainTime} = useWeb3();
	const	{rarities, updateRarity} = useRarity();
	const	adventurer = Object.values(rarities).find(rarity => rarity.tokenID === router.query.tokenID);

	return (
		<section className={'mt-24 md:mt-12'}>
			<div className={'flex flex-col space-y-36 max-w-screen-lg w-full mx-auto'}>
				<SectionCharacterSheet
					key={adventurer.tokenID}
					rarity={adventurer}
					provider={provider}
					updateRarity={updateRarity}
					chainTime={chainTime}
					router={router} />
			</div>
		</section>
	);
}

export default Index;
