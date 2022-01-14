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
import	{getEligibility, getOpenMicDialogOption} 		from	'components/Openmic';
import	useRarity										from	'contexts/useRarity';
import	useWeb3											from	'contexts/useWeb3';
import	CLASSES											from	'utils/codex/classes';

dayjs.extend(relativeTime);

function	NCPHeadline({currentAdventurer}) {
	const	renderNCPText = () => {
		return (
			<>
				{'These hooligans show up at Facu\'s Tavern every weekend! They drink too much and scare away the other customers. Facu is fed up. Hopefully a bard can calm them down. Facu only has humble prizes to offer in return. But for the best performers, Facu will part with a secret mission pass!'}
				<div className={'my-4'} />

				{'Oh and I almost forgot. If you have any forest treasures with you, The Austrian will help you win over the crowd.'}
				<div className={'my-4'} />

				{'Will '}
				<span className={'text-highlight font-bold tooltip cursor-help group inline-flex justify-evenly'}>
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

function	DialogChoices({router, currentAdventurer, openCurrentAventurerModal}) {
	const options = [getOpenMicDialogOption(currentAdventurer, router, openCurrentAventurerModal)];
	const eligibility = getEligibility(currentAdventurer);
	if(eligibility.eligible) options.push({label: 'SELECT ANOTHER ADVENTURER', onClick: openCurrentAventurerModal});
	options.push({label: 'JUST HEAD BACK TO TOWN', onClick: () => router.push('/')});
	return <DialogNoBox options={options} />;
}

function	Index({router}) {
	const	{currentAdventurer, openCurrentAventurerModal} = useRarity();
	const	{chainTime} = useWeb3();

	return (
		<section>
			<div className={'mt-8 max-w-prose w-full flex-col flex flex-center mx-auto px-3'}>
				<Box className={'p-4 text-xs md:text-xs leading-normal md:leading-8 w-full relative'}>
					<div className={'relative'}>
						<div className={'filter grayscale -m-4 pb-8 opacity-70'}>
							<Image
								src={'/adventures/openmic/header.jpeg'}
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
							openCurrentAventurerModal={openCurrentAventurerModal} />
					</div>
				</Box>
			</div>
		</section>
	);
}

export default Index;
