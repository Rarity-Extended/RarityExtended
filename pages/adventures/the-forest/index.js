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
import	Tooltip											from	'components/Tooltip';
import	useRarity										from	'contexts/useRarity';
import	useWeb3											from	'contexts/useWeb3';
import	CLASSES											from	'utils/codex/classes';
import	{exploreTheForest, discoverTreasureTheForest}	from	'utils/actions/dungeon_theForest';

dayjs.extend(relativeTime);

function	NCPHeadline({currentAdventurer, chainTime}) {
	const	renderNCPText = () => {
		if (!currentAdventurer?.adventures?.forest?.canAdventure) {
			const	hasToDig = dayjs(new Date(currentAdventurer?.adventures?.forest?.endBlockTs * 1000)).isBefore(dayjs(new Date(chainTime * 1000)));
			if (hasToDig) {
				return (
					<>
						{'You searched the area for days before you came to the location of theses glowing mushrooms. As you prepare to dig, you notice that the whole forest is very quiet.'}
						<div className={'my-4'} />
	
						{'You dig with a shovel for hours, but you can\'t seem to go deep enough. It\'s getting dark. You know you have to escape the forest before it gets too dark, but you still have a goal, a quest to finish. So you start digging again.'}
						<div className={'my-4'} />
						{'Hours later, the sun has set and you have yet to find anything. You were about to give up digging when you finally see something shine under the dirt. More hours pass and you finally reach the prize. You lift out a small wooden box. The treasure is yours.'}
					</>
				);
			}
			return (
				<>
					{'You begin to study the map and then notice that the masked man has not moved at all. He has been staring at the same spot on the wall.'}
					<div />
					{'You touch his arm. He looks toward you and smiles. He smiles as if to say, "Go. I will be here when you return."'}
					<div className={'my-4'} />

					{'It takes you several hours to make your way to the location the map shows and after a few more hours of searching, you find the two trees.'}

					<div className={'my-4'} />
					{'The trail is a narrow dirt path winding through the forest, the trees are old, some are grand trees reaching up to the sky while others are barely taller than bushes. You can see green everywhere and the ground is muddy. Some patches are covered in fallen leaves while some are not, some parts are bare of trees, while some parts are slightly overgrown, dense with green.'}
					<div />
					{'It\'s quiet. You can hear the sound of the wind rustling through the trees and leaves finding their way.'}
					<div className={'my-4'} />

					{'Now, you just have to enjoy this walk ... '}
					<span className={'text-highlight font-bold tooltip cursor-help group inline-flex justify-evenly'}>
						{`${currentAdventurer?.name ? currentAdventurer?.name : currentAdventurer?.tokenID}, ${CLASSES[currentAdventurer?.class]?.name} LVL ${currentAdventurer?.level}`}
						<Tooltip>
							<p className={'text-sm leading-normal inline'}>{'This is you.'}</p>
						</Tooltip>
					</span>
					{' will be near the glowing mushrooms '}

					<span className={'text-highlight font-bold tooltip cursor-help group inline-flex justify-evenly'}>
						{dayjs(new Date(currentAdventurer?.adventures?.forest?.endBlockTs * 1000)).from(dayjs(new Date(chainTime * 1000)))}
						<Tooltip>
							<p className={'text-sm leading-normal inline'}>{'You will find the glowing mushrooms after this long journey. Use this time to think about the state of our ecosystem.'}</p>
						</Tooltip>
					</span>
					{'.'}
				</>
			);
		}



		return (
			<>
				{'There is a dark looking man sitting at a table in the corner. His face is hidden under a full faced mask. He speaks of a forest to the north where he has buried '}
				<span className={'text-highlight font-bold tooltip cursor-help group inline-flex justify-evenly'}>
					{'a treasure'}
					<Tooltip>
						<p className={'text-sm leading-normal inline'}>{'Many treasures are buried in the forest. Nobody knows what they will be or what they may be used for, or even if you will be able to sell them... But are you a real treasure hunter?'}</p>
					</Tooltip>
				</span>
				{'.'}
					
				<div className={'my-4'} />
				{'He leads you to a corner and starts looking through a pack with a sketchbook and a quill. You wait for him to find what he is looking for. He finally lifts a small piece of parchment and hands it to you. He has drawn a map of the area close to where he was found and circled a large oak tree with a pair of trees which look like they are kissing at the base.'}
				<div className={'my-4'} />
				{'You have to travel to that location and search for the two trees, then follow the game trail northeast. He doesn\'t know how long it will take, or how many days you will need, but says perhaps '}
				<span className={'text-highlight font-bold tooltip cursor-help group inline-flex justify-evenly'}>
					{'around a week'}
					<Tooltip>
						<p className={'text-sm leading-normal inline'}>{'You can spend between '}</p>
						<p className={'text-sm leading-normal inline text-highlight font-bold'}>{'4 and 7 days '}</p>
						<p className={'text-sm leading-normal inline'}>{' on this trail. Different times reap different treasures.'}</p>
					</Tooltip>
				</span>
				{'. Once you get to the forest, if you\'re still alive, look for the glowing mushrooms. Then, you will have to '}
				<span className={'text-highlight font-bold tooltip cursor-help group inline-flex justify-evenly'}>
					{'dig for the treasure'}
					<Tooltip>
						<p className={'text-sm leading-normal inline'}>{'After the time on the trail has ended, you will have to come back here to '}</p>
						<p className={'text-sm leading-normal inline text-highlight font-bold'}>{'dig for a random treasure'}</p>
						<p className={'text-sm leading-normal inline'}>{'.'}</p>
					</Tooltip>
				</span>
				{'.'}

				<div className={'my-4'} />
				{'He doesn\'t want anything in return for helping you. For now.'}
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
	if (!currentAdventurer?.adventures?.forest?.canAdventure) {
		const	hasToDig = dayjs(new Date(currentAdventurer?.adventures?.forest?.endBlockTs * 1000)).isBefore(dayjs(new Date(chainTime * 1000)));
		if (hasToDig) {
			return (
				<DialogNoBox
					options={[
						{label: (
							<>
								<span className={'text-highlight'}>
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
							<span className={'text-highlight'}>{`${currentAdventurer?.name ? currentAdventurer?.name : currentAdventurer?.tokenID}, ${CLASSES[currentAdventurer?.class]?.name} LVL ${currentAdventurer?.level}`}</span>
							{'.'}
						</>
					),
					onClick: () => onExploreTheForest(4),
				},
				{
					label: (
						<>
							{'TAKE PROVISIONS FOR 5 DAYS WITH '}
							<span className={'text-highlight'}>{`${currentAdventurer?.name ? currentAdventurer?.name : currentAdventurer?.tokenID}, ${CLASSES[currentAdventurer?.class]?.name} LVL ${currentAdventurer?.level}`}</span>
							{'.'}
						</>
					),
					onClick: () => onExploreTheForest(5),
				},
				{
					label: (
						<>
							{'TAKE PROVISIONS FOR 6 DAYS WITH '}
							<span className={'text-highlight'}>{`${currentAdventurer?.name ? currentAdventurer?.name : currentAdventurer?.tokenID}, ${CLASSES[currentAdventurer?.class]?.name} LVL ${currentAdventurer?.level}`}</span>
							{'.'}
						</>
					),
					onClick: () => onExploreTheForest(6),
				},
				{
					label: (
						<>
							{'TAKE PROVISIONS FOR 7 DAYS WITH '}
							<span className={'text-highlight'}>{`${currentAdventurer?.name ? currentAdventurer?.name : currentAdventurer?.tokenID}, ${CLASSES[currentAdventurer?.class]?.name} LVL ${currentAdventurer?.level}`}</span>
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
			<div className={'mt-8 max-w-prose w-full flex-col flex flex-center mx-auto px-3'}>
				<Box className={'p-4 text-xs md:text-xs leading-normal md:leading-8 w-full relative'}>
					<div className={'relative'}>
						<div className={'filter grayscale -m-4 pb-8 opacity-70'}>
							<Image
								src={'/adventures/the-forest/header.jpeg'}
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
