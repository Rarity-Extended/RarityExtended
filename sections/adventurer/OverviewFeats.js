import	React									from	'react';
import	Link									from	'next/link';
import	Image									from	'next/image';
import	{featsPerClass, initialFeatsPerClass}	from	'utils/libs/rarityFeats';
import	FEATS									from	'utils/codex/feats.json';

function	OverviewFeats({adventurer}) {
	const	_maxFeatsForAventurer = featsPerClass(adventurer.class, adventurer?.level);
	const	_initialFeatsPerClass = initialFeatsPerClass(adventurer.class);
	const	_adventurerFeats = adventurer.feats || [];
	const	_unlockedFeats = [...new Set([..._initialFeatsPerClass, ..._adventurerFeats])];
	const	_pointLefts = _maxFeatsForAventurer - _unlockedFeats.length;

	function	isLearned(feat) {
		if (feat.prerequisites) {
			const	hasPrerequisitesFeat = feat.prerequisites_feat === 0 || _unlockedFeats.includes(feat.prerequisites_feat);
			const	hasPrerequisitesLevel = (feat.prerequisites_level <= adventurer.level);
			const	hasPrerequisitesClass = (feat.prerequisites_class.includes(adventurer.class));
			const	isLearned = _unlockedFeats.includes(feat.id);
			return	hasPrerequisitesLevel && hasPrerequisitesClass && hasPrerequisitesFeat && isLearned;
		}
		const	isLearned = _unlockedFeats.includes(feat.id);
		return isLearned;
	}

	return (
		<div className={'flex flex-col items-center font-story w-full mt-auto'} style={{height: 282}}>
			<div className={'mb-6'}>
				<p className={'font-story text-sm normal-case'}>
					<span className={'text-50'}>{'A feat represents a talent or an area of expertise that gives a character special capabilities. It embodies training, experience, and abilities beyond what a class provides. Some are inherent to the class, while others can be learned. You have '}</span>
					<Link href={'/adventurer/feats'}>
						<span className={'text-highlight font-bold cursor-pointer hover:underline'}>{`${_pointLefts <= 1 ? `${_pointLefts} point` : `${_pointLefts} points`} left`}</span>
					</Link>
					<span className={'text-50'}>{' to spend.'}</span>
				</p>
			</div>
			<div className={'grid grid-cols-3 gap-x-4 gap-y-5 w-full overflow-auto scrollbar-none'}>
				{Object.values(FEATS).filter(isLearned).map((feat) => (
					<div key={feat.id} className={'flex flex-row items-center justify-between'}>
						<div className={'flex flex-row items-center'}>
							<Image src={feat.img} width={56} height={56} />
							<div className={'flex flex-col justify-between h-14'}>
								<p className={'text-sm normal-case ml-2'}>{feat.name}</p>
								<p className={'text-xs normal-case ml-2 opacity-60'}>{`Type: ${feat?.type || '-'}`}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
export default OverviewFeats;