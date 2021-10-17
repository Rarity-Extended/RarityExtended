/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday October 2nd 2021
**	@Filename:				mercenaries.js
******************************************************************************/

import	React, {useEffect, useState}		from	'react';
import	Image								from	'next/image';
import	{Contract}							from	'ethcall';
import	{ethers}							from	'ethers';
import	dayjs								from	'dayjs';
import	relativeTime						from	'dayjs/plugin/relativeTime';
import	Box									from	'components/Box';
import	useRarity							from	'contexts/useRarity';
import	useWeb3								from	'contexts/useWeb3';
import	DialogNoBox							from	'components/DialogNoBox';
import	{newEthCallProvider}				from	'utils';
import	CLASSES								from	'utils/codex/classes';
import	{protectBoars}						from	'utils/actions/boar';

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

function	NCPHeadline({population, choice, chainTime, loot}) {
	const	renderNCPText = () => {
		if (Number(population.count) === 0) {
			return (
				<>
					{'You are walking near a large forest. The air fills with the scent of sap, leaves, and decaying leaves. The sun dips below the mountains, revealing the speckled green of forest floor, the slender trunks of stunted trees, the bird nests in the tops of branches.A burst of voice reaches the ears of our adventurer. Two men are arguing about a boar problem. There is no more boars.'}
					<div className={'my-4'} />

					{'It\'s been '}
					<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
						{`${dayjs(new Date(population.extinction * 1000)).from(dayjs(new Date(chainTime * 1000)), false)} since the last boar`}
						<Tooltip>
							<p className={'text-sm leading-normal inline'}>{'The last boar was killed the '}</p>
							<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>
								{`${dayjs(new Date(population.extinction * 1000)).format('DD/MM/YYYY [at] HH:mm:ss')}`}
							</p>
							<p className={'text-sm leading-normal inline'}>{'.'}</p>
						</Tooltip>
					</span>
					{' was killed by '}
					<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
						{`${population.extinctionBy}`}
						<Tooltip>
							<p className={'text-sm leading-normal inline'}>{'After this event, people started to call him '}</p>
							<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>
								{'“The Boarless”'}
							</p>
							<p className={'text-sm leading-normal inline'}>{'.'}</p>
						</Tooltip>
					</span>
					{'. This is not good for the village, particularly considering the heavy taxes on meat the king has recently set upon his citizens. The men are obviously upset. They are both pulling their blades out. The other man, obviously the leader, is trying to pacify the situation. He is talking about how they are not paying enough.'}
					<div className={'my-4'} />
				
					{'It looks like this whole boar situation leaded to unpleasant things...'}
				</>
			);
		}

		if (choice === 'kill') {
			return (
				<>
					{'The farmer directed you to the place he saw the boar.'}
					<div className={'my-4'} />

					{'You are in a big glade, hemmed all around by tall trees, except for a narrow trail leading in, obviously the trail the farmer came in by. There are ruts in the trail, traces of wheels and cart tracks. A patch of dry brown grass, trampled flat in some places, is growing here. There are small bushes, some of which have been bent almost flat to the ground.'}
					<div className={'my-4'} />

					{'In the center of it, the boar. The boar is angry. It is angry because the forest is angry. It is angry because it must prove its strength.'}
					<div className={'my-4'} />

					{'Judging by its size, you can expect to collect up to '}
					<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
						{`${loot} loots.`}
						<Tooltip>
							<p className={'text-sm leading-normal inline'}>{'Loot can be '}</p>
							<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'Meat'}</p>
							<p className={'text-sm leading-normal inline'}>{', '}</p>
							<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'Tusks'}</p>
							<p className={'text-sm leading-normal inline'}>{' or '}</p>
							<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'Leather'}</p>
							<p className={'text-sm leading-normal inline'}>{'. Distribution between these 3 is random.'}</p>
						</Tooltip>
					</span>

				</>
			);
		}

		if (choice === 'protect') {
			return (
				<>
					{'You take the direction of the forest to find these wild animals.'}
					<div className={'my-4'} />

					{'You are in a big glade, hemmed all around by tall trees, except for a narrow trail leading in, obviously the trail the farmer came in by. There are ruts in the trail, traces of wheels and cart tracks. A patch of dry brown grass, trampled flat in some places, is growing here. There are small bushes, some of which have been bent almost flat to the ground. There are many piles of wood in the clearing and the air is filled with scents of animals and plants. Some you can identify easily, while some you can\'t.'}
					<div className={'my-4'} />

					{'While searching for the boars, you could stop to gather some berries, mushroom or wood. You could get up to '}
					<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
						{`${loot} loots.`}
						<Tooltip>
							<p className={'text-sm leading-normal inline'}>{'Loot can be '}</p>
							<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'Berries'}</p>
							<p className={'text-sm leading-normal inline'}>{', '}</p>
							<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'Mushrooms'}</p>
							<p className={'text-sm leading-normal inline'}>{' or '}</p>
							<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'Woods'}</p>
							<p className={'text-sm leading-normal inline'}>{'. Distribution between these 3 is random.'}</p>
						</Tooltip>
					</span>

				</>
			);
		}


		return (
			<>
				{'You are walking near a large forest. The air fills with the scent of sap, leaves, and decaying leaves. The sun dips below the mountains, revealing the speckled green of forest floor, the slender trunks of stunted trees, the bird nests in the tops of branches.'}
					
				<div className={'my-4'} />
				{'A burst of voice reaches the ears of our adventurer. Two men are arguing about a '}
				<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
					{'boar'}
					<Tooltip>
						<p className={'text-sm leading-normal inline'}>{'The boars are big, black and bristly, their snouts curled like that of a ferret. They are like piglets, though much larger.'}</p>
					</Tooltip>
				</span>
				{' problem. The youngest, an angry farmer, yells at the other, a man in his late middle age. You can hear the conversation.'}
					
				<div className={'my-4'} />
				{'"I tell you I saw it! A huge black boar, filthy thing! It tore up my prize plants! I only saw the beast, but it\'s big enough to be a dwarven pig! It\'ll be back soon, you\'ll see! '}
				<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
					{'We need to kill them all'}
					<Tooltip>
						<p className={'text-sm leading-normal inline'}>{'The boars are strong. Stronger than Facu\'s Rat. Only adventurer with a good amout of '}</p>
						<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'CONST'}</p>
						<p className={'text-sm leading-normal inline'}>{' and '}</p>
						<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'STR'}</p>
						<p className={'text-sm leading-normal inline'}>{' should start this fight.'}</p>
					</Tooltip>
				</span>
				{'!"'}

				<div className={'my-4'} />
				{'The older man ignores the farmer\'s rantings, though his face is hard. "Look, there is no boar big enough to do what you say. What you saw was an elk, or one of those manticores that plague the land sometimes. '}
				<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
					{'Boars are necessary for the balance'}
					<Tooltip>
						<p className={'text-sm leading-normal inline'}>{'There is currently '}</p>
						<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{`${population.count} boars`}</p>
						<p className={'text-sm leading-normal inline'}>{' in the Forest. Less boars means more '}</p>
						<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'Mushroom'}</p>
						<p className={'text-sm leading-normal inline'}>{', '}</p>
						<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'Berries'}</p>
						<p className={'text-sm leading-normal inline'}>{' and '}</p>
						<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'Wood'}</p>
						<p className={'text-sm leading-normal inline'}>{', but much less '}</p>
						<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'Meat'}</p>
						<p className={'text-sm leading-normal inline'}>{', '}</p>
						<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'Tusks'}</p>
						<p className={'text-sm leading-normal inline'}>{' and '}</p>
						<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'Leather'}</p>
						<p className={'text-sm leading-normal inline'}>{'. And the other way around.'}</p>
					</Tooltip>
				</span>
				{' of this forest. They must be '}
				<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
					{'preserved, protected'}
					<Tooltip>
						<p className={'text-sm leading-normal inline'}>{'An adventurer knowing how to '}</p>
						<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'Handle Animal'}</p>
						<p className={'text-sm leading-normal inline'}>{' and having a good '}</p>
						<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'INT'}</p>
						<p className={'text-sm leading-normal inline'}>{', '}</p>
						<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'CHA'}</p>
						<p className={'text-sm leading-normal inline'}>{' and '}</p>
						<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'WIS'}</p>
						<p className={'text-sm leading-normal inline'}>{' will be perfect for this task.'}</p>
					</Tooltip>
				</span>
				{'. And with your hunting, it is about to be broken!"'}

				<div className={'my-4'} />
				{'It is getting dark, but our adventurer can still see the farmer\'s face clearly. He is angry, and quickly becoming hysterical. His jaw is trembling, and his eyes are red and watery. Seeing you, he calls you to ask for help.'}
				<div className={'my-4'} />
				{'There is '}
				<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
					{`${population.count == -1 ? 'some' : population.count} boar${population.count === 1 ? '' : 's'}`}
					<Tooltip>
						<p className={'text-sm leading-normal inline'}>{'The ecosystem will be balanced with '}</p>
						<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'10000'}</p>
						<p className={'text-sm leading-normal inline'}>{' boars. You will earn less rewards by hunting but more by protecting them if the boar population is below this number, and more by hunting but less by protecting them if the boar population is above this number.'}</p>
					</Tooltip>
				</span>
				{' in the Forest.'}
			</>
		);
	};
	return (
		<h1 className={'text-base leading-normal md:leading-6 font-story normal-case'}>
			{renderNCPText()}
		</h1>
	);
}

function	DialogChoices({router, currentAdventurer, openCurrentAventurerModal, provider, updateRarity, remainingBoars, chainTime, choice, onChoice}) {
	if (Number(remainingBoars) === 0) {
		return (
			<DialogNoBox
				options={[
					{label: 'LOOK AT THE FOREST WITH DESPAIR AND HEAD BACK TO TOWN', onClick: router.back},
					{label: 'JUST HEAD BACK TO TOWN', onClick: router.back},
				]} />
		);
	}
	if (!currentAdventurer?.dungeons?.boars?.canAdventure) {
		return (
			<DialogNoBox
				options={[
					{label: (
						<>
							<span className={'text-tag-info dark:text-tag-warning'}>
								{`${currentAdventurer?.name ? currentAdventurer?.name : currentAdventurer?.tokenID}, ${CLASSES[currentAdventurer?.class]?.name} LVL ${currentAdventurer?.level}`}
							</span>
							{' WILL BE READY FOR MORE BOAR ADVENTURE '}
							<span className={'text-tag-info dark:text-tag-warning'}>{`${dayjs(new Date(currentAdventurer?.dungeons?.boars?.log * 1000)).from(dayjs(new Date(chainTime * 1000)))}`}</span>
							{'.'}
						</>
					),
					onClick: openCurrentAventurerModal},
					{label: 'SELECT ANOTHER ADVENTURER', onClick: openCurrentAventurerModal},
					{label: 'JUST HEAD BACK TO TOWN', onClick: router.back},
				]} />
		);
	}
	if (choice === 'kill') {
		return (
			<DialogNoBox
				options={[
					{
						label: (
							<>
								{'FIGHT THE BOAR WITH '}
								<span className={'text-tag-info dark:text-tag-warning'}>{`${currentAdventurer?.name ? currentAdventurer?.name : currentAdventurer?.tokenID}, ${CLASSES[currentAdventurer?.class]?.name} LVL ${currentAdventurer?.level}`}</span>
								{'.'}
							</>
						),
						onClick: () => router.push(`/dungeons/the-boar-fight?adventurer=${currentAdventurer.tokenID}`)
					},
					{
						label: 'NEVERMIND, GO BACK TO THE EDGE OF THE FOREST.',
						onClick: () => onChoice(''),
					}
				]} />
		);
	}

	if (choice === 'protect') {
		return (
			<DialogNoBox
				options={[
					{
						label: (
							<>
								{'SPEND SOME TIME GATHERING RESOURCES WITH '}
								<span className={'text-tag-info dark:text-tag-warning'}>{`${currentAdventurer?.name ? currentAdventurer?.name : currentAdventurer?.tokenID}, ${CLASSES[currentAdventurer?.class]?.name} LVL ${currentAdventurer?.level}`}</span>
								{'.'}
							</>
						),
						onClick: () => {
							protectBoars({
								provider,
								tokenID: currentAdventurer?.tokenID,
							}, ({error, wait}) => {
								if (wait) {
									return;	
								}
								if (error) {
									return console.error(error);
								}
								updateRarity(currentAdventurer.tokenID);
							});
						}
					},
					{
						label: 'NEVERMIND, GO BACK TO THE EDGE OF THE FOREST.',
						onClick: () => onChoice(''),
					}
				]} />
		);
	}

	return (
		<DialogNoBox
			options={[
				{
					label: (
						<>
							{'HUNT THE BOAR TO HELP THE HUMBLE FARMER WITH '}
							<span className={'text-tag-info dark:text-tag-warning'}>{`${currentAdventurer?.name ? currentAdventurer?.name : currentAdventurer?.tokenID}, ${CLASSES[currentAdventurer?.class]?.name} LVL ${currentAdventurer?.level}`}</span>
							{'.'}
						</>
					),
					onClick: () => onChoice('kill'),
				},
				{
					label: (
						<>
							{'DECIDE TO PROTECT AND PRESERVE THE BOARS WITH '}
							<span className={'text-tag-info dark:text-tag-warning'}>{`${currentAdventurer?.name ? currentAdventurer?.name : currentAdventurer?.tokenID}, ${CLASSES[currentAdventurer?.class]?.name} LVL ${currentAdventurer?.level}`}</span>
							{'.'}
						</>
					),
					onClick: () => onChoice('protect'),
				},
				{label: 'SELECT ANOTHER ADVENTURER', onClick: () => openCurrentAventurerModal()},
				{label: 'NO, JUST HEAD BACK TO TOWN', onClick: () => router.back()},
			]} />
	);
}

function	Index({router}) {
	const	[population, set_population] = useState({count: -1, extinction: 0, extinctionBy: 0});
	const	[choice, set_choice] = useState('');
	const	{currentAdventurer, openCurrentAventurerModal, updateRarity} = useRarity();
	const	{provider, chainID, chainTime} = useWeb3();

	async function	fetchBoarsData(calls) {
		const	ethcallProvider = await newEthCallProvider(provider, Number(chainID) === 1337);
		const	multicallResult = await ethcallProvider.all(calls);
		const	[boar_population, extinction, extinctionBy, simulate_reproduce, simulate_kill] = multicallResult;
		let		extinctionByName = '';

		if (extinctionBy > 0) {
			const	nameContract = new ethers.Contract(
				process.env.RARITY_EXTENDED_NAME,
				process.env.RARITY_EXTENDED_NAME_ABI,
				provider
			);
			extinctionByName = await nameContract.get_name(extinctionBy);
		}
		set_population({count: boar_population, extinction: extinction, extinctionBy: extinctionByName || extinctionBy, lootReproduce: Number(simulate_reproduce || 0), lootKill: Number(simulate_kill || 0)});
	}

	useEffect(() => {
		const	contract = new Contract(process.env.DUNGEON_BOARS_ADDR, process.env.DUNGEON_BOARS_ABI);
		fetchBoarsData([
			contract.boar_population(),
			contract.extinction(),
			contract.extinctionBy(),
			currentAdventurer?.tokenID ? contract.simulate_reproduce(currentAdventurer?.tokenID) : null,
			currentAdventurer?.tokenID ? contract.simulate_kill(currentAdventurer?.tokenID) : null,
		]);
	}, [chainTime, currentAdventurer.tokenID]);

	return (
		<section>
			<div className={'mt-8 max-w-prose w-full flex-col flex justify-center items-center mx-auto px-3'}>
				<Box className={'p-4 text-xs md:text-xs leading-normal md:leading-8 w-full relative'}>
					<div className={'relative'}>
						<div className={'filter grayscale -m-4 pb-8 opacity-70'}>
							<Image
								src={'/illustrations/illuBoars.jpeg'}
								loading={'eager'}
								objectFit={'cover'}
								objectPosition={'top'}
								quality={85}
								width={1550}
								height={400} />
						</div>
					</div>
					<NCPHeadline
						population={population}
						chainTime={chainTime}
						choice={choice}
						loot={choice === 'kill' ? population.lootKill : population.lootReproduce}
					/>
					<div className={'pt-2 mt-4 border-t-2 border-black dark:border-dark-100 font-story font-bold text-base uppercase'}>
						<DialogChoices
							router={router}
							remainingBoars={population.count}
							currentAdventurer={currentAdventurer}
							openCurrentAventurerModal={openCurrentAventurerModal}
							provider={provider}
							updateRarity={updateRarity}
							chainTime={chainTime}
							choice={choice}
							onChoice={set_choice}
						/>
					</div>
				</Box>
			</div>
		</section>
	);
}

export default Index;
