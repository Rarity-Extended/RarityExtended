import	React									from	'react';
import	Link									from	'next/link';
import	Image									from	'next/image';
import	{featsPerClass, initialFeatsPerClass}	from	'utils/libs/rarityFeats';
import	FEATS									from	'utils/codex/core/feats.json';

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
		<div className={'flex flex-col items-center p-4 mt-auto w-full h-auto md:p-0 md:h-292px'}>
			<div className={'mb-6'}>
				<p className={'text-sm'}>
					<span className={'text-plain-60'}>{'A feat represents a talent or an area of expertise that gives a character special capabilities. It embodies training, experience, and abilities beyond what a class provides. Some are inherent to the class, while others can be learned. You have '}</span>
					<Link href={'/feats#content'}>
						<span className={'font-bold hover:underline cursor-pointer text-highlight'}>{`${_pointLefts <= 1 ? `${_pointLefts} point` : `${_pointLefts} points`} left`}</span>
					</Link>
					<span className={'text-plain-60'}>{' to spend.'}</span>
				</p>
			</div>
			<div className={'overflow-scroll w-full md:h-186px'}>
				<div className={'grid grid-cols-1 gap-x-8 gap-y-4 w-full md:grid-cols-3 scrollbar-none'}>
					{Object.values(FEATS).filter(isLearned).map((feat) => (
						<div key={feat.id} className={'flex flex-row justify-between items-center'}>
							<div className={'flex flex-row items-center'}>
								<div style={{minWidth: 56}}>
									<Image src={feat.img} width={56} height={56} />
								</div>
								<div className={'flex flex-col justify-between -mt-2 ml-2 h-14 md:mt-0'}>
									<p className={'ml-2 text-sm'}>{feat.name}</p>
									<p className={'ml-2 text-xs opacity-60'}>{`Type: ${feat?.type || '-'}`}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
export default OverviewFeats;