/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 12th 2021
**	@Filename:				SectionDungeonTheForest.js
******************************************************************************/

import	React							from	'react';
import	Image							from	'next/image';
import	dayjs							from	'dayjs';
import	relativeTime					from	'dayjs/plugin/relativeTime';
import	useWeb3							from	'contexts/useWeb3';
import	useRarity						from	'contexts/useRarity';
import	CLASSES							from	'utils/codex/classes';
import	Adventurer						from	'components/Adventurer';
import	{discoverTreasureTheForest}		from	'utils/actions';
import	Box								from	'components/Box';

dayjs.extend(relativeTime);

function	SectionDungeonTheForest({shouldDisplay, adventurers, router, adventurersCount}) {
	const	{provider, chainTime} = useWeb3();
	const	{updateRarity} = useRarity();

	if (!shouldDisplay) {
		return null;
	}
	return (
		<div className={'flex flex-col w-full'}>
			<div className={'pb-10'}>
				<i className={'text-sx md:text-xs text-black dark:text-white text-opacity-60 leading-6'}>
					{'There is a dark looking man sitting at a table in the corner. His face is hidden under a full faced mask.'}
				</i>
				<div />
				<i className={'text-sx md:text-xs text-black dark:text-white text-opacity-60 leading-6'}>
					{'He speaks of a forest to the North about a week\'s travel, there and back, with danger but treasure. He isn\'t willing to guide you there, because he was hurt too much but he will tell you where to go. He doesn\'t want anything in return for helping you.'}
				</i>
				{adventurersCount !== 0 ? <div className={'mt-6'}>
					<p className={'text-xs'}>
						{'>  WOULD YOU LIKE TO HEAD TO THE FOREST?'}
					</p>
				</div> :
					<div className={'mt-6'}> 
						<p className={'text-xs'}>
							{'> You first need to recruit an adventurer !'}
						</p>
					</div>
				}
			</div>
			<div>
				<div className={'grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 gap-y-0 md:gap-y-4'}>
					{Object.values(adventurers)?.filter((adventurer) => {
						return adventurer.level >= 2 && adventurer?.dungeons?.forest?.canAdventure;
					}).map((adventurer) => {
						return (
							<div key={adventurer.tokenID} className={'w-full'}>
								<Adventurer
									onClick={() => router.push(`/dungeons/the-forest?adventurer=${adventurer.tokenID}`)}
									adventurer={adventurer}
									rarityClass={CLASSES[adventurer.class]} />
							</div>
						);
					})}
					{Object.values(adventurers)?.filter((adventurer) => {
						return adventurer.level >= 2 && !adventurer?.dungeons?.forest?.canAdventure;
					}).map((adventurer) => {
						const	isBack = dayjs(new Date(adventurer?.dungeons?.forest?.endBlockTs * 1000)).isBefore(dayjs(new Date(chainTime * 1000)));

						if (isBack) {
							return (
								<Box
									onClick={() => {
										discoverTreasureTheForest({provider, contractAddress: process.env.DUNGEON_THE_FOREST_ADDR, tokenID: adventurer.tokenID},
											({error}) => {
												if (error) {
													return console.error(error);
												}
												updateRarity(adventurer.tokenID);
												router.push('/');
											});
									}}
									className={'w-full p-4 flex justify-center items-center flex-col group hover:bg-gray-principal dark:hover:bg-dark-100 transition-colors cursor-pointer relative mb-4 md:mb-0'}>
									<Image
										src={'/menu/shovel.png'}
										quality={100}
										width={160}
										height={160} />
									<p className={'text-sm justify-center group-hover:underline'}>{adventurer.tokenID}</p>
									<p className={'text-xss justify-center text-center mt-1'}>{`${CLASSES[adventurer.class].name} level ${adventurer.level}`}</p>
									<div className={'absolute inset-0 backdrop-blur-3xl bg-black bg-opacity-60 cursor-pointer flex justify-center items-center text-center p-6'}>
										<p className={'text-white'}>
											{'YOU FOUND A TREASURE !'}
										</p>
									</div>
								</Box>
							);
						}

						return (
							<div key={adventurer.tokenID} className={'w-full relative'}>
								<Adventurer
									noHover
									adventurer={adventurer}
									rarityClass={CLASSES[adventurer.class]}>
									<div className={'absolute inset-0 backdrop-blur-3xl bg-black bg-opacity-60 cursor-not-allowed flex justify-center items-center text-center p-6'}>
										<p className={'text-white'}>
											{`BACK ${dayjs(new Date(adventurer?.dungeons?.forest?.endBlockTs * 1000)).from(dayjs(new Date(chainTime * 1000)))}`}
										</p>
									</div>
								</Adventurer>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default SectionDungeonTheForest;
