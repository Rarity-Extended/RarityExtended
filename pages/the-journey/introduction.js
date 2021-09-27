/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Monday September 27th 2021
**	@Filename:				the-journey.js
******************************************************************************/

import	React, {useEffect, useState}		from	'react';
import	Image								from	'next/image';
import	Box									from	'components/Box';
import	Typer								from	'components/Typer';

function	Index() {
	const	[npcTextIndex, set_npcTextIndex] = useState(0);

	useEffect(() => {
		set_npcTextIndex(0);
	}, []);
	return (
		<section aria-label={'404'}>
			<div className={'mt-8 max-w-prose w-full flex-col flex justify-center items-center mx-auto'}>
				<div className={'mb-6'}>
					<audio controls className={'rounded-none'}>
						<source src={'/the-journey/introduction.wav'} type={'audio/wav'} />
					</audio>
				</div>

				<Box className={'p-4 text-xs md:text-xs leading-normal md:leading-8 w-full'}>
					<div className={'float-left mr-4'}>
						<Image
							src={'/the-journey/town.png'}
							loading={'eager'}
							quality={90}
							width={500}
							height={358} />
					</div>
					<Typer speed={40} onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
						{'Another summer morning came to Antar, a lovely little trading town in the middle of green valley of Silver River. The sun rises from behind the near forest starting to light the way home for night huntsmen. Here in town life is in full swing and the streets are starting to be overcrowded.'}
					</Typer>
					<div className={'my-4'} />
					<Typer speed={40} onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
						{'Many merchants and traders pave their ways through Antar. Many adventurers are trying to find fame and wealth helping local folks with killing forest beast, exploring ancient ruins near or fighting an endless amount of rats in Facu’s Tavern’s cellar.'}
					</Typer>
					<div className={'my-4'} />
					<Typer speed={40} onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
						{'Peasants and tradesmen, soldiers and priests, riches and poor - everyone has their own place and affairs. Everything goes on as usual.'}
					</Typer>
					<div className={'my-4'} />
					<Typer speed={40} onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
						{'But... It looks like something wrong happened this night. A strange wanderer is staggering through the streets. Wrapped in cloak and leaning on a staff he walks up to people and tells he saw a blood color moon last night. Wisemen know - that’s a bad sign. Sign of something from ancient legends. Or maybe not. They are not sure. Like true wisemen should be.'}
					</Typer>
					<div className={'my-4'} />
					<Typer speed={40} onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 4}>
						{'One way or another people of Antar are worrying. Some say stranger things are going on. Black crow just sat on a burning tree, woman’s flowers died without any reasons and a blacksmith\'s child said something weird with demonic voice and red eyes. Couple days passed, strange wanderer was gone. But the citizens are still scared and don’t want to leave their houses.'}
					</Typer>
					<div className={'my-4'} />
					<Typer speed={40} onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 5}>
						{'They need heroes. They are looking for someone who would take his armor and weapon and go out trough the town gates. Adventures need to find answers. And gold. And to save the Antar! And the world! And maybe to bring some gold. Because everyone loves gold. Especially in this lovely trading town.'}
					</Typer>
				</Box>
			</div>
		</section>
	);
}

export default Index;
