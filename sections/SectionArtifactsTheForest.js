/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 12th 2021
**	@Filename:				SectionArtifactsTheForest.js
******************************************************************************/

import	React							from	'react';
import	Image							from	'next/image';
import	dayjs							from	'dayjs';
import	relativeTime					from	'dayjs/plugin/relativeTime';
import	useWeb3							from	'contexts/useWeb3';
import	useRarity						from	'contexts/useRarity';
import	{levelUpTreasureTheForest}		from	'utils/actions';
import	{xpRequired}					from	'utils/libs/rarity';
import	THE_FOREST_LOOT					from	'utils/codex/theForestLoot.json';

dayjs.extend(relativeTime);

function	Artifact({img, name, cost, onClick, children, noHover}) {
	return (
		<div
			className={`w-full md:w-60 border-black dark:border-dark-100 border-4 p-4 flex justify-center items-center flex-col ${noHover ? '' : 'group hover:bg-gray-principal dark:hover:bg-dark-100'} transition-colors cursor-pointer relative mb-4 md:mb-0`}
			onClick={onClick}>
			<Image
				src={img}
				quality={100}
				width={240}
				height={240} />
			<p className={'text-xs justify-center text-center group-hover:underline'}>{name}</p>
			<p className={'text-xss justify-center text-center mt-1'}>{`Upgrade for ${cost} XP`}</p>
			{children}
		</div>
	);
}

function	SectionArtifactsTheForest({shouldDisplay, adventurers, router, adventurersCount}) {
	const	{provider} = useWeb3();
	const	{updateRarity} = useRarity();

	if (!shouldDisplay) {
		return null;
	}
	return (
		<div className={'flex flex-col w-full'}>
			<div className={'pb-10'}>
				{adventurersCount !== 0 ? <div>
					<p className={'text-xs'}>
						{'> WHICH ARTIFACT WOULD YOU LIKE TO UPGRADE?'}
					</p>
				</div> :
					<div> 
						<p className={'text-xs'}>
							{'> You first need to recruit an adventurer !'}
						</p>
					</div>
				}
			</div>
			<div>
				<div className={'grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8'}>
					{Object.values(adventurers).map((adventurer) => {
						return (
							adventurer?.inventory[1].map((item, i) => {
								return (
									<Artifact
										key={`${item.id}_${i}`}
										onClick={() => {
											levelUpTreasureTheForest({
												provider,
												contractAddress: process.env.DUNGEON_THE_FOREST_ADDR,
												tokenID: item.treasureId.toString(),
												adventurerID: adventurer.tokenID,
												treasureName: item.itemName
											}, ({error}) => {
												if (error) {
													return console.error(error);
												}
												updateRarity(adventurer.tokenID);
												router.push('/');
											});
										}}
										noHover={Number(adventurer.xp) < xpRequired(item.level)}
										img={THE_FOREST_LOOT[item.itemName].img}
										name={item.itemName}
										cost={xpRequired(item.level)}>
										{Number(adventurer.xp) < xpRequired(item.level) ?
											<div className={'absolute inset-0 backdrop-blur-3xl bg-black bg-opacity-60 cursor-not-allowed flex justify-center items-center text-center p-6'}>
												<p className={'text-white'}>
													{'YOU NEED MORE XP'}
												</p>
											</div>
											:
											null
										}
									</Artifact>
								);
							})
						);
					})}
					
				</div>
			</div>
		</div>
	);
}

export default SectionArtifactsTheForest;