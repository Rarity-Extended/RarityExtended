/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					October 14th 2021
**	@Filename:				SectionDungeonOpenMic.js
******************************************************************************/

import	React						from	'react';
import	dayjs						from	'dayjs';
import	duration					from	'dayjs/plugin/duration';
import	relativeTime				from	'dayjs/plugin/relativeTime';
import	CLASSES						from	'utils/codex/classes';
import	{OpenMicSignUpList}			from	'components/openmic';

dayjs.extend(duration);
dayjs.extend(relativeTime);

function	SectionDungeonOpenMic({shouldDisplay, adventurers, router}) {
	const bards = Object.values(adventurers)?.filter(a => CLASSES[a.class].id === 2);
	const bardCount = bards?.length;

	if (!shouldDisplay) {
		return null;
	}
	return (
		<div className={'flex flex-col w-full'}>
			<div className={'pb-10'}>
				<i className={'block text-sx md:text-xs text-black dark:text-white text-opacity-60 leading-6'}>
					{'These hooligans show up at Facu\'s Tavern every weekend. They drink too much and scare away the other customers. Facu is fed up. Hopefully a bard can calm them down. Facu said he only has humble prizes to offer in return. But for the best performers, I bet Facu would part with a secret mission pass !'}
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
				<OpenMicSignUpList bards={bards} router={router} />
			</div>
		</div>
	);
}

export default SectionDungeonOpenMic;