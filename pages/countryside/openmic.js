/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday October 2nd 2021
**	@Filename:				mercenaries.js
******************************************************************************/

import	React											from	'react';
import	Image											from	'next/image';
import	dayjs											from	'dayjs';
import	relativeTime									from	'dayjs/plugin/relativeTime';
import	Box												from	'components/Box';
import	DialogNoBox										from	'components/DialogNoBox';
import	useRarity										from	'contexts/useRarity';
import	useWeb3											from	'contexts/useWeb3';
import	CLASSES											from	'utils/codex/classes';
import	{exploreTheForest, discoverTreasureTheForest}	from	'utils/actions/dungeon_theForest';

dayjs.extend(relativeTime);

function	Tooltip({children}) {
	return (
		<div className={'invisible group-hover:visible absolute mt-6 w-80 shadow-2xl'} style={{zIndex: 10000}}>
			<div className={'bg-white dark:bg-dark-600 border-2 border-black dark:border-dark-100 mx-auto text-black dark:text-white font-normal'}>
				<div className={'p-2'}>
					{children}
				</div>
			</div>
		</div>
	);
}

function	NCPHeadline({currentAdventurer, chainTime}) {
	const	renderNCPText = () => {
		return (
			<>
				{'The stage at the front of the tavern was lit by a single brazier. A robed figure took the stage with a flourish. "What\'s this?" the figure said. "A tavern full of drunkards and not a single bard? How dare you show such disrespect?"'}
				<div className={'my-4'} />

				{'The brazier’s flames dance wildly in the air. Giving off heat, filling the room with warmth. It is the only source of light. It is hard to breathe.'}
				<div className={'my-4'} />

				{'“Let’s have a song!”'}
				<div className={'my-4'} />

				{'The tavern owner stands, his weathered face red from the drink and the smoke. The crowd roars and whistles and shouts and chants. They call for a song. The owner, a large man, wide in the shoulder, with a bald head that shines like an apple in the light, waves his hands above his head and shouts for quiet.'}
				<div className={'my-4'} />

				{'The crowd hushes. They look around at one another in confusion. Some of them are drunk, but not all of them.'}
				<div className={'my-4'} />

				{'Will '}
				<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
					{`${currentAdventurer?.name ? currentAdventurer?.name : currentAdventurer?.tokenID}, ${CLASSES[currentAdventurer?.class]?.name} LVL ${currentAdventurer?.level}`}
					<Tooltip>
						<p className={'text-sm leading-normal inline'}>{'This is you. But maybe another you can sing ?'}</p>
					</Tooltip>
				</span>
				{' be up to the challenge ?'}
			</>
		);
	};
	return (
		<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
			{renderNCPText()}
		</h1>
	);
}

function	DialogChoices({router, currentAdventurer, openCurrentAventurerModal, chainTime, onExploreTheForest, onDiscoverTreasure}) {
	if (!currentAdventurer?.dungeons?.forest?.canAdventure) {
		const	hasToDig = dayjs(new Date(currentAdventurer?.dungeons?.forest?.endBlockTs * 1000)).isBefore(dayjs(new Date(chainTime * 1000)));
		if (hasToDig) {
			return (
				<DialogNoBox
					options={[
						{label: (
							<>
								<span className={'text-tag-info dark:text-tag-warning'}>
									{`${currentAdventurer?.name ? currentAdventurer?.name : currentAdventurer?.tokenID}, ${CLASSES[currentAdventurer?.class]?.name} LVL ${currentAdventurer?.level}`}
								</span>
								{' FOUND A TREASURE!'}
							</>
						),
						onClick: onDiscoverTreasure},
						{label: 'SELECT ANOTHER ADVENTURER', onClick: openCurrentAventurerModal},
						{label: 'JUST HEAD BACK TO TOWN', onClick: () => router.push('/')},
					]} />
			);
		}
		return (
			<DialogNoBox
				options={[
					{label: 'SELECT ANOTHER ADVENTURER', onClick: openCurrentAventurerModal},
					{label: 'JUST HEAD BACK TO TOWN', onClick: () => router.push('/')},
				]} />
		);
	}

	return (
		<DialogNoBox
			options={[
				{
					label: (
						<>
							{'TAKE PROVISIONS FOR 4 DAYS WITH '}
							<span className={'text-tag-info dark:text-tag-warning'}>{`${currentAdventurer?.name ? currentAdventurer?.name : currentAdventurer?.tokenID}, ${CLASSES[currentAdventurer?.class]?.name} LVL ${currentAdventurer?.level}`}</span>
							{'.'}
						</>
					),
					onClick: () => onExploreTheForest(4),
				},
				{
					label: (
						<>
							{'TAKE PROVISIONS FOR 5 DAYS WITH '}
							<span className={'text-tag-info dark:text-tag-warning'}>{`${currentAdventurer?.name ? currentAdventurer?.name : currentAdventurer?.tokenID}, ${CLASSES[currentAdventurer?.class]?.name} LVL ${currentAdventurer?.level}`}</span>
							{'.'}
						</>
					),
					onClick: () => onExploreTheForest(5),
				},
				{
					label: (
						<>
							{'TAKE PROVISIONS FOR 6 DAYS WITH '}
							<span className={'text-tag-info dark:text-tag-warning'}>{`${currentAdventurer?.name ? currentAdventurer?.name : currentAdventurer?.tokenID}, ${CLASSES[currentAdventurer?.class]?.name} LVL ${currentAdventurer?.level}`}</span>
							{'.'}
						</>
					),
					onClick: () => onExploreTheForest(6),
				},
				{
					label: (
						<>
							{'TAKE PROVISIONS FOR 7 DAYS WITH '}
							<span className={'text-tag-info dark:text-tag-warning'}>{`${currentAdventurer?.name ? currentAdventurer?.name : currentAdventurer?.tokenID}, ${CLASSES[currentAdventurer?.class]?.name} LVL ${currentAdventurer?.level}`}</span>
							{'.'}
						</>
					),
					onClick: () => onExploreTheForest(7),
				},
				{label: 'SELECT ANOTHER ADVENTURER', onClick: () => openCurrentAventurerModal()},
				{label: 'NO, JUST HEAD BACK TO TOWN', onClick: () => router.push('/')},
			]} />
	);
}

function	Index({router}) {
	const	{currentAdventurer, openCurrentAventurerModal, updateRarity} = useRarity();
	const	{provider, chainTime} = useWeb3();

	function	onExploreTheForest(time) {
		exploreTheForest({
			provider,
			tokenID: currentAdventurer.tokenID,
			timeInDays: time
		}, ({error}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(currentAdventurer.tokenID);
		});
	}

	function	onDiscoverTreasure() {
		discoverTreasureTheForest({
			provider,
			tokenID: currentAdventurer.tokenID
		}, ({error}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(currentAdventurer.tokenID);
		});
	}

	return (
		<section>
			<div className={'mt-8 max-w-prose w-full flex-col flex justify-center items-center mx-auto px-3'}>
				<Box className={'p-4 text-xs md:text-xs leading-normal md:leading-8 w-full relative'}>
					<div className={'relative'}>
						<div className={'filter grayscale -m-4 pb-8 opacity-70'}>
							<Image
								src={'/illustrations/illuOpenMic.jpeg'}
								loading={'eager'}
								objectFit={'cover'}
								objectPosition={'center'}
								quality={85}
								width={1550}
								height={400} />
						</div>
					</div>
					<NCPHeadline
						chainTime={chainTime}
						currentAdventurer={currentAdventurer} />
					<div className={'pt-2 mt-4 border-t-2 border-black dark:border-dark-100 font-story font-bold text-sm md:text-base uppercase'}>
						<DialogChoices
							router={router}
							currentAdventurer={currentAdventurer}
							openCurrentAventurerModal={openCurrentAventurerModal}
							chainTime={chainTime}
							onExploreTheForest={onExploreTheForest}
							onDiscoverTreasure={onDiscoverTreasure}
						/>
					</div>
				</Box>
			</div>
		</section>
	);
}

export default Index;
