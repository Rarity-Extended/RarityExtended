/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday October 2nd 2021
**	@Filename:				mercenaries.js
******************************************************************************/

import	React, {useState}					from	'react';
import	Image								from	'next/image';
import	Box									from	'components/Box';
import	useRarity							from	'contexts/useRarity';
import	useWeb3								from	'contexts/useWeb3';
import	DialogNoBox							from	'components/DialogNoBox';
import	CLASSES								from	'utils/codex/classes';
import	{protectBoars}						from	'utils/actions/boar';

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

function	NCPHeadline() {
	const	renderNCPText = () => {
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
						<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'1384 boars'}</p>
						<p className={'text-sm leading-normal inline'}>{' in the Forest. If you hunt them all it will be much harder to find '}</p>
						<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'Mushroom'}</p>
						<p className={'text-sm leading-normal inline'}>{' and '}</p>
						<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'Berries'}</p>
						<p className={'text-sm leading-normal inline'}>{'. It will be impossible to get more '}</p>
						<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'Boar meat'}</p>
						<p className={'text-sm leading-normal inline'}>{', '}</p>
						<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'Tusks'}</p>
						<p className={'text-sm leading-normal inline'}>{' and '}</p>
						<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>{'Leather'}</p>
						<p className={'text-sm leading-normal inline'}>{'. '}</p>
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
			</>
		);
		
	};
	return (
		<h1 className={'text-base leading-normal md:leading-6 font-story normal-case'}>
			{renderNCPText()}
		</h1>
	);
}

function	Index({router}) {
	const	[hasDoneAdventure, set_hasDoneAdventure] = useState(false);
	const	[isProcessingTransaction, set_isProcessingTransaction] = useState(false);
	const	{currentAdventurer, openCurrentAventurerModal, updateRarity} = useRarity();
	const	{provider} = useWeb3();

	return (
		<section>
			<div className={'mt-8 max-w-prose w-full flex-col flex justify-center items-center mx-auto'}>
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
						hasDoneAdventure={hasDoneAdventure}
						isProcessingTransaction={isProcessingTransaction}>
					</NCPHeadline>
					<div className={'pt-2 mt-4 border-t-2 border-black dark:border-dark-100 font-story font-bold text-base uppercase'}>
						<DialogNoBox
							options={[
								{
									label: (
										<>
											{'HELP THE HUMBLE FARMER WITH '}
											<span className={'text-tag-info dark:text-tag-warning'}>{`${currentAdventurer?.name ? currentAdventurer?.name : currentAdventurer?.tokenID}, ${CLASSES[currentAdventurer?.class]?.name} LVL ${currentAdventurer?.level}`}</span>
											{'.'}
										</>
									),
									onClick: () => router.push(`/dungeons/the-boar-fight?adventurer=${currentAdventurer.tokenID}`)
								},
								{
									label: (
										<>
											{'DECIDE TO PROTECT AND PRESERVE THE BOARS WITH '}
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
												set_isProcessingTransaction(true);
												return;	
											}
											if (error) {
												return console.error(error);
											}
											set_hasDoneAdventure(true);
											set_isProcessingTransaction(false);
											updateRarity(currentAdventurer.tokenID);
										});
									}
								},
								{label: 'SELECT ANOTHER ADVENTURER', onClick: () => openCurrentAventurerModal()},
								{label: 'NO, JUST HEAD BACK TO TOWN', onClick: () => router.back()},
							]} />
					</div>
				</Box>
			</div>
		</section>
	);
}

export default Index;
