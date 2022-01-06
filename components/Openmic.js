import React from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import Adventurer from 'components/Adventurer';
import CLASSES from 'utils/codex/classes';

dayjs.extend(duration);
dayjs.extend(relativeTime);

function getEligibility(bard) {
	let result = {eligible: true, reason: null};
	if(bard?.class !== 2)
		result = {eligible: false, reason: 'Is not a bard'};
	else if(bard?.level < 2)
		result = {eligible: false, reason: 'Is not level 2 or higher'};
	else if(bard?.dungeons?.openMic?.timeToNextPerformance > 0)
		result = {eligible: false, reason: ` Will be ready in ${dayjs.duration({seconds: bard?.dungeons?.openMic?.timeToNextPerformance}).humanize()}`};
	if(!result.eligible)
		result.sheild = (
			<div className={'absolute inset-0 backdrop-blur-3xl bg-black bg-opacity-60 cursor-not-allowed flex justify-center items-center text-center p-6'}>
				<p className={'text-white'}>
					{result.reason}
				</p>
			</div>
		);
	return result;
}

function getOpenMicDialogOption(bard, router, openCurrentAventurerModal) {
	const eligibility = getEligibility(bard);
	const label = <>
		{bard && eligibility.eligible && (<>
			{'TAKE THE STAGE WITH '}
			<span className={'text-tag-info dark:text-tag-warning'}>{`${bard.tokenID}, ${bard.name ? bard.name : CLASSES[bard.class].name} LVL ${bard.level}`}</span>
		</>)}
		{bard && !eligibility.eligible && (<>
			<span className={'text-tag-info dark:text-tag-warning'}>{`${bard.tokenID}, ${bard.name ? bard.name : CLASSES[bard.class].name} LVL ${bard.level}`}</span>
			{` ${eligibility.reason}, CHOOSE SOMEONE ELSE `}
		</>)}
		{!bard && (<>
			{'CHOOSE A BARD WITH LEVEL > 1 and PERFORM > 0 '}
		</>)}
	</>;
	return {
		label,
		onClick: () => {
			if (eligibility.eligible) {
				router.push(`//adventures/openmic/perform?adventurer=${bard.tokenID}`);
			} else {
				openCurrentAventurerModal();
			}
		}
	};
}

function OpenMicSignUpList({bards, router}) {
	return <div className={'grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 gap-y-0 md:gap-y-4'}>
		{bards.map((bard) => {
			const eligibility = getEligibility(bard);
			return (
				<div key={bard.tokenID} className={'w-full'}>
					<Adventurer
						onClick={() => {
							if(eligibility.eligible) {
								router.push(`//adventures/openmic/perform?adventurer=${bard.tokenID}`);
							}
						}}
						adventurer={bard}
						rarityClass={CLASSES[bard.class]}>
						{eligibility.sheild}
					</Adventurer>
				</div>
			);
		})}
	</div>;
}

export {
	getEligibility,
	getOpenMicDialogOption,
	OpenMicSignUpList
};