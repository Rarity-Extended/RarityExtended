/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 12th 2021
**	@Filename:				SectionDungeonTheCellar.js
******************************************************************************/

import	React							from	'react';
import	dayjs							from	'dayjs';
import	relativeTime					from	'dayjs/plugin/relativeTime';
import	CLASSES							from	'utils/codex/classes';
import	Adventurer						from	'components/Adventurer';
import	useWeb3							from	'contexts/useWeb3';
dayjs.extend(relativeTime);

function	SectionDungeonTheCellar({shouldDisplay, adventurers, router, adventurersCount}) {
	const	{chainTime} = useWeb3();

	if (!shouldDisplay) {
		return null;
	}
	return (
		<div className={'flex flex-col w-full'}>
			<div className={'pb-10'}>
				<i className={'text-sx md:text-xs text-black dark:text-white text-opacity-60 leading-6'}>
					{'Facu, the Tavern’s owner, has heard some scurrying about down in his cellar. He went down to check it and found swarms of hungry rats. In his earlier days, Facu the Committer would have squashed those pests, but these days he’s weak and frail. Do you want to help him out? Anything you find you get to keep.'}
				</i>
				{adventurersCount !== 0 ? <div className={'mt-6'}>
					<p className={'text-xs'}>
						{'> Which one of your brave adventurer should go ?'}
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
						const	canAdventure = !dayjs(new Date(adventurer?.dungeons?.cellar * 1000)).isAfter(dayjs(new Date(chainTime * 1000)));
						return canAdventure;
					}).map((adventurer) => {
						return (
							<div key={adventurer.tokenID} className={'w-full'}>
								<Adventurer
									onClick={() => router.push(`/dungeons/the-cellar?adventurer=${adventurer.tokenID}`)}
									adventurer={adventurer}
									rarityClass={CLASSES[adventurer.class]} />
							</div>
						);
					})}
					{Object.values(adventurers)?.filter((adventurer) => {
						const	canAdventure = !dayjs(new Date(adventurer?.dungeons?.cellar * 1000)).isAfter(dayjs(new Date(chainTime * 1000)));
						return !canAdventure;
					}).map((adventurer) => {
						return (
							<div key={adventurer.tokenID} className={'w-full'}>
								<Adventurer
									noHover
									adventurer={adventurer}
									rarityClass={CLASSES[adventurer.class]}>
									<div className={'absolute inset-0 backdrop-blur-3xl bg-black bg-opacity-60 cursor-not-allowed flex justify-center items-center text-center p-6'}>
										<p className={'text-white'}>
											{`READY IN ${dayjs(new Date(adventurer?.dungeons?.cellar * 1000)).from(dayjs(new Date(chainTime * 1000)))}`}
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

export default SectionDungeonTheCellar;