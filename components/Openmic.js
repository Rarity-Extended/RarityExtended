import React from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import CLASSES from 'utils/codex/core/classes';

dayjs.extend(duration);
dayjs.extend(relativeTime);

function getEligibility(bard) {
	let result = {eligible: true, reason: null};
	if(bard?.class !== 2)
		result = {eligible: false, reason: 'Is not a bard'};
	else if(bard?.level < 2)
		result = {eligible: false, reason: 'Is not level 2 or higher'};
	else if(bard?.adventures?.openMic?.timeToNextPerformance > 0)
		result = {eligible: false, reason: ` Will be ready in ${dayjs.duration({seconds: bard?.adventures?.openMic?.timeToNextPerformance}).humanize()}`};
	if(!result.eligible)
		result.sheild = (
			<div className={'absolute inset-0 backdrop-blur-3xl bg-black bg-opacity-60 cursor-not-allowed flex flex-center text-center p-6'}>
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
			<span className={'text-highlight'}>{`${bard.tokenID}, ${bard.name ? bard.name : CLASSES[bard.class].name} LVL ${bard.level}`}</span>
		</>)}
		{bard && !eligibility.eligible && (<>
			<span className={'text-highlight'}>{`${bard.tokenID}, ${bard.name ? bard.name : CLASSES[bard.class].name} LVL ${bard.level}`}</span>
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
				router.push(`/adventures/openmic/perform?adventurer=${bard.tokenID}`);
			} else {
				openCurrentAventurerModal();
			}
		}
	};
}

export {
	getEligibility,
	getOpenMicDialogOption
};