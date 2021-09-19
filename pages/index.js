/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 5th 2021
**	@Filename:				index.js
******************************************************************************/

import	React						from	'react';
import	SectionNoAdventurer			from	'sections/SectionNoAdventurer';
import	SectionCharacterSheet		from	'sections/SectionCharacterSheet';
import	useWeb3						from	'contexts/useWeb3';
import	useRarity					from	'contexts/useRarity';

function	Index({router}) {
	const	{provider, chainTime} = useWeb3();
	const	{rarities, updateRarity} = useRarity();
	const	adventurers = Object.values(rarities);

	if (adventurers?.length === 0) {
		return (
			<SectionNoAdventurer />
		);
	}

	return (
		<section className={'mt-24 md:mt-12'}>
			<div className={'flex flex-col space-y-32 max-w-screen-lg w-full mx-auto'}>
				{
					adventurers?.map((rarity) => (
						<SectionCharacterSheet
							key={rarity.tokenID}
							rarity={rarity}
							provider={provider}
							updateRarity={updateRarity}
							chainTime={chainTime}
							router={router} />
					))
				}
			</div>


		</section>
	);
}

export default Index;
