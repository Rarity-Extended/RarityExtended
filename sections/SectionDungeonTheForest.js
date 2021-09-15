/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 12th 2021
**	@Filename:				SectionDungeonTheForest.js
******************************************************************************/

import	React							from	'react';
import	dayjs							from	'dayjs';
import	relativeTime					from	'dayjs/plugin/relativeTime';
import	classNameMapping				from	'utils/classNameMapping';
import	classes							from	'utils/classList';
import	Adventurer						from	'components/Adventurer';
dayjs.extend(relativeTime);

function	SectionDungeonTheForest({shouldDisplay, adventurers, router, adventurersCount}) {
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
					{'He speaks of a Dark Forest to the North about a week\'s travel, there and back, with danger but treasure. He is willing to guide you there, but was hurt too much to enter the forest with you. He doesn\'t want anything in return for helping you.'}
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
				<div className={'grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8'}>
					{Object.values(adventurers)?.filter((adventurer) => {
						return adventurer.level >= 2 && adventurer?.dungeons?.forest?.canAdventure;
					}).map((adventurer) => {
						return (
							<div key={adventurer.tokenID} className={'w-full md:w-1/4'}>
								<Adventurer
									onClick={() => router.push(`/dungeons/the-forest?adventurer=${adventurer.tokenID}`)}
									adventurer={adventurer}
									rarityClass={classes[classNameMapping[adventurer.class]]} />
							</div>
						);
					})}
					{Object.values(adventurers)?.filter((adventurer) => {
						return adventurer.level >= 2 && !adventurer?.dungeons?.forest?.canAdventure;
					}).map((adventurer) => {
						return (
							<div key={adventurer.tokenID} className={'w-full md:w-1/4 relative'}>
								<Adventurer
									onClick={() => router.push(`/dungeons/the-forest?adventurer=${adventurer.tokenID}`)}
									noHover
									adventurer={adventurer}
									rarityClass={classes[classNameMapping[adventurer.class]]}>
									<div className={'absolute inset-0 backdrop-blur-3xl bg-black bg-opacity-60 cursor-not-allowed flex justify-center items-center text-center p-6'}>
										<p className={'text-white'}>
											{`BACK IN ${dayjs(new Date(adventurer?.dungeons?.forest?.endBlockTs * 1000)).from(dayjs(new Date(adventurer?.dungeons?.forest?.initBlockTs * 1000)))}`}
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