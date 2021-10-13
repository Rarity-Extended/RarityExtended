/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					October 14th 2021
**	@Filename:				SectionDungeonOpenMic.js
******************************************************************************/

import	React							from	'react';
import	dayjs							from	'dayjs';
import	relativeTime					from	'dayjs/plugin/relativeTime';
import	CLASSES							from	'utils/codex/classes';
import	Adventurer						from	'components/Adventurer';
import	useWeb3							from	'contexts/useWeb3';
dayjs.extend(relativeTime);

function	SectionDungeonOpenMic({shouldDisplay, adventurers, router, adventurersCount}) {
	const	{chainTime} = useWeb3();
  const bards = Object.values(adventurers)?.filter(a => CLASSES[a.class].id === 2);
  const bardCount = bards?.length;

	if (!shouldDisplay) {
		return null;
	}
	return (
		<div className={'flex flex-col w-full'}>
			<div className={'pb-10'}>
				<i className={'block text-sx md:text-xs text-black dark:text-white text-opacity-60 leading-6'}>
					{'These hooligans show up at Facu\'s Tavern every weekend. They drink too much and scare away the other customers. Facu is fed up. Hopefully a bard can calm them down. Facu said he only has door prizes to offer in return. But for the best performers, I bet Facu would part with a secret mission pass !'}
				</i>
				<i className={'block mt-4 text-sx md:text-xs text-black dark:text-white text-opacity-60 leading-6'}>
					{'Oh and I almost forgot. If you have any forest treasures with you, The Austrian will help you win over the crowd.'}
				</i>
				{bardCount > 0 ? <div className={'mt-6'}>
					<p className={'text-xs'}>
						{'> Which of your bards has the talent ?'}
					</p>
				</div> :
					<div className={'mt-6'}> 
						<p className={'text-xs'}>
							{'> You first need to recruit a bard !'}
						</p>
					</div>
				}
			</div>
			<div>
				<div className={'grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 gap-y-0 md:gap-y-4'}>
					{bards.map((adventurer) => {
						return (
							<div key={adventurer.tokenID} className={'w-full'}>
								<Adventurer
									onClick={() => router.push(`/dungeons/the-stage?adventurer=${adventurer.tokenID}`)}
									adventurer={adventurer}
									rarityClass={CLASSES[adventurer.class]} />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default SectionDungeonOpenMic;