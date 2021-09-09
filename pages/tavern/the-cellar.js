/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@MajorTom_eth
**	@Date:					Tuesday September 7th 2021
**	@Filename:				tavern.js
******************************************************************************/

import	React			from	'react';
import	Image			from	'next/image';
import	dayjs			from	'dayjs';
import	relativeTime	from	'dayjs/plugin/relativeTime';
import	useWeb3			from	'contexts/useWeb3';
dayjs.extend(relativeTime);

const	classNameMapping = [
	'',
	'Barbarian',
	'Bard',
	'Cleric',
	'Druid',
	'Fighter',
	'Monk',
	'Paladin',
	'Ranger',
	'Rogue',
	'Sorcerer',
	'Wizard',
];

function	DungeonTab({rarities, router}) {
	const	{chainTime} = useWeb3();
	return (
		<div className={'flex flex-col w-full'}>
			<div className={'pt-6 pb-10'}>
				<i className={'text-xs'}>
					{'Facu, the Tavern’s owner, has heard some scurrying about down in his cellar. He went down to check it and found swarms of hungry rats. In his earlier days, Facu the Committer would have squashed those pests, but these days he’s weak and frail. Do you want to help him out? Anything you find you get to keep.'}
				</i>
			</div>
			<div>
				<div className={'nes-container mt-0 text-sm space-y-8 mb-8'}>
					{Object.values(rarities)?.filter((rarity) => {
						const	canAdventure = !dayjs(new Date(rarity?.dungeons?.cellar?.nextAvailability * 1000)).isAfter(dayjs(new Date(chainTime * 1000)));
						return canAdventure;
					}).map((rarity) => {
						return (
							<div key={rarity.tokenID}>
								<label>
									<input type={'radio'} className={'nes-radio'} name={'adventurerforthecellar'} readOnly onClick={() => router.push(`/dungeons/the-cellar?adventurer=${rarity.tokenID}`)} />
									<span>{`Send ${rarity.tokenID}, your ${classNameMapping[rarity.class]} level ${rarity.level} ?`}</span>
								</label>
							</div>
						);
					})}
					<div>
						<label>
							<input type={'radio'} className={'nes-radio'} name={'adventurerforthecellar'} readOnly onClick={() => router.push('/tavern')}/>
							<span>{'Cancel'}</span>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}

function	Index({rarities, router}) {
	return (
		<section className={'mt-12'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
				<div className={'flex flex-row items-center'}>
					<div className={'w-60 mr-16'} style={{minWidth: 240}}>
						<Image
							src={'/avatar/banker.png'}
							loading={'eager'}
							quality={100}
							width={240}
							height={240} />
					</div>
					<h1 className={'text-lg whitespace-pre-line justify-center mb-4'}>{'Those rats be hungry. Those rats be many. Best if ye Constitution be plenty'}</h1>
				</div>
				<DungeonTab router={router} rarities={rarities} />
			</div>

		</section>
	);
}

export default Index;
