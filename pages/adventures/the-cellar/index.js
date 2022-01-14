/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday October 2nd 2021
**	@Filename:				mercenaries.js
******************************************************************************/

import	React, {useEffect, useState}		from	'react';
import	Image								from	'next/image';
import	dayjs								from	'dayjs';
import	relativeTime						from	'dayjs/plugin/relativeTime';
import	{Contract}							from	'ethcall';
import	{newEthCallProvider}				from	'utils';
import	Box									from	'components/Box';
import	DialogNoBox							from	'components/DialogNoBox';
import	Tooltip								from	'components/Tooltip';
import	useRarity							from	'contexts/useRarity';
import	useWeb3								from	'contexts/useWeb3';
import	CLASSES								from	'utils/codex/classes';

dayjs.extend(relativeTime);

function	NCPHeadline({currentAdventurer, chainTime, loot}) {
	const	renderNCPText = () => {
		if (!currentAdventurer?.adventures?.cellar?.canAdventure) {
			return (
				<>
					{'You killed all the nasty, dirty rats that had infested the walls and floors of the tavern, and now you were back in the Tavern. The same bartender that still remembers you is behind the counter, cleaning a mug with a rag. There is a broad smile on his broad face.'}
					<div className={'my-4'} />

					{'"Well, well, well, look at you," he said. "I was just thinking about you. I\'m glad to see you back. Sit down anywhere you want."'}
					<div className={'my-4'} />

					{'You go to a table in the corner, one that you knew was devoid of rats. They will be back. You know that. They always come back '}
					<span className={'text-highlight font-bold tooltip cursor-help group inline-flex justify-evenly'}>
						{dayjs(new Date(currentAdventurer?.adventures?.cellar?.log * 1000)).from(dayjs(new Date(chainTime * 1000)))}
						<Tooltip>
							<p className={'text-sm leading-normal inline'}>{'They\'re not magic, but the rats really like this dwelling. Now that you\'ve killed the King of the Cellar, a new one will appear in a while...'}</p>
						</Tooltip>
					</span>
					{'.'}
				</>
			);
		}
		

		return (
			<>
				{'Facu, the tavern’s owner, was sitting alone at a table. His old housecat laying on his lap and purring away. Facu had heard some scurrying about in his cellar and had gone down to check it out. He found swarms of hungry rats. In his earlier days, he would have squashed those pests, but these days he’s weak and frail.'}
				<div className={'my-4'} />
				{'“Ha! I told that Felipe that he should stop keeping such a messy cellar! He’ll never tidy up!”'}
				<div className={'my-4'} />
				{'You look at the cat. It\'s a very lazy cat. It mirror its owner; old and frail. Not the kind of hunter a house needs when there are plenty of rats.'}
				<div className={'my-4'} />
				{'“Help me with this rat situation, adventurer. I have nothing much to offer, but you can keep everything you\'ll loot from these rats. And of course, a tankard of mead will be waiting for you.”'}
				<div className={'my-4'} />

				{'You could do that. What is a rat for you? If you cannot handle the '}
				<span className={'text-highlight font-bold tooltip cursor-help group inline-flex justify-evenly'}>
					{'Big Ugly Rat'}
					<Tooltip>
						<p className={'text-sm leading-normal inline'}>{'The rat is not so weak. Only adventurer with a good amout of '}</p>
						<p className={'text-sm leading-normal inline text-highlight font-bold'}>{'CONST'}</p>
						<p className={'text-sm leading-normal inline'}>{', '}</p>
						<p className={'text-sm leading-normal inline text-highlight font-bold'}>{'STR'}</p>
						<p className={'text-sm leading-normal inline'}>{' and '}</p>
						<p className={'text-sm leading-normal inline text-highlight font-bold'}>{'DEXT'}</p>
						<p className={'text-sm leading-normal inline'}>{' should start this fight.'}</p>
					</Tooltip>
				</span>
				{' in this cellar. If not, will you be able to fight the boars nearby? It could be you first act of bravery.'}
				
				<div className={'my-4'} />
				{'You heard about this giant rat in the tavern. A big rat. Other adventurers have already killed it, but somehow it keeps coming back. Based on your strength, you can expect up to '}
				<span className={'text-highlight font-bold tooltip cursor-help group inline-flex justify-evenly'}>
					{`${loot} rat skin${loot === 0 ? '' : 's'}`}
					<Tooltip>
						<p className={'text-sm leading-normal inline'}>{'The Rat Skin is a basic crafting material that can be used by the '}</p>
						<p className={'text-sm leading-normal inline text-highlight font-bold'}>{'Blacksmith'}</p>
						<p className={'text-sm leading-normal inline'}>{' to craft you some armor, weapons, or other items.'}</p>
					</Tooltip>
				</span>
				{'.'}
			</>
		);
	};
	return (
		<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
			{renderNCPText()}
		</h1>
	);
}

function	DialogChoices({router, currentAdventurer, openCurrentAventurerModal, onFightRat}) {
	if (!currentAdventurer?.adventures?.cellar?.canAdventure) {
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
							{'FIGHT THE RAT WITH '}
							<span className={'text-highlight'}>{`${currentAdventurer?.name ? currentAdventurer?.name : currentAdventurer?.tokenID}, ${CLASSES[currentAdventurer?.class]?.name} LVL ${currentAdventurer?.level}`}</span>
							{'.'}
						</>
					),
					onClick: () => onFightRat(4),
				},
				{label: 'SELECT ANOTHER ADVENTURER', onClick: () => openCurrentAventurerModal()},
				{label: 'NO, JUST HEAD BACK TO TOWN', onClick: () => router.push('/')},
			]} />
	);
}

function	Index({router}) {
	const	{currentAdventurer, openCurrentAventurerModal} = useRarity();
	const	{provider, chainID, chainTime} = useWeb3();
	const	[loot, set_loot] = useState(0);

	async function	fetchData(calls) {
		const	ethcallProvider = await newEthCallProvider(provider, Number(chainID) === 1337);
		const	multicallResult = await ethcallProvider.all(calls);
		const	[_loot] = multicallResult;
		set_loot(_loot);
	}

	useEffect(() => {
		const	contract = new Contract(process.env.DUNGEON_THE_CELLAR_ADDR, process.env.DUNGEON_THE_CELLAR_ABI);
		fetchData([
			currentAdventurer?.tokenID ? contract.scout(currentAdventurer?.tokenID) : null,
		]);
	}, [chainTime, currentAdventurer.tokenID]);

	return (
		<section>
			<div className={'mt-8 max-w-prose w-full flex-col flex flex-center mx-auto px-3'}>
				<Box className={'p-4 text-xs md:text-xs leading-normal md:leading-8 w-full relative'}>
					<div className={'relative'}>
						<div className={'filter grayscale -m-4 pb-8 opacity-70'}>
							<Image
								src={'/adventures/the-cellar/header.jpeg'}
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
						loot={loot}
						currentAdventurer={currentAdventurer} />
					<div className={'pt-2 mt-4 border-t-2 border-black dark:border-dark-100 font-story font-bold text-sm md:text-base uppercase'}>
						<DialogChoices
							router={router}
							currentAdventurer={currentAdventurer}
							openCurrentAventurerModal={openCurrentAventurerModal}
							onFightRat={() => router.push(`/adventures/the-cellar/fight?adventurer=${currentAdventurer.tokenID}`)} />
					</div>
				</Box>
			</div>
		</section>
	);
}

export default Index;
