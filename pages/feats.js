import	React, {useState}								from	'react';
import	useRarity										from	'contexts/useRarity';
import	useWeb3											from	'contexts/useWeb3';
import	Template										from	'components/templates/Adventurer';
import	RowFeat											from	'components/layout/RowFeat';
import	Section											from	'components/layout/Section';
import	{learnFeat}										from	'utils/actions';
import	{featsPerClass, initialFeatsPerClass}			from	'utils/libs/rarityFeats';
import	FEATS											from	'utils/codex/core/feats.json';
import	performBatchedUpdates							from	'utils/performBatchedUpdates';

function	Index({tab, search, unlockedFeats}) {
	const	{provider} = useWeb3();
	const	{currentAdventurer, updateRarity} = useRarity();

	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	Action triggered to save the skills of the adventurer. This hook is called when the user
	**	clicks on the save button.
	**********************************************************************************************/
	function	onLearnFeat(featID) {
		learnFeat({
			provider,
			tokenID: currentAdventurer.tokenID,
			feat: featID,
		}, ({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(data);
		});
	}

	return (
		<div className={'grid grid-cols-1 divide-y divide-dark-600'}>
			{
				Object.values(FEATS)
					.filter((feat) => {
						if (tab === 0) {
							if (feat.prerequisites) {
								const	hasPrerequisitesFeat = feat.prerequisites_feat === 0 || unlockedFeats.includes(feat.prerequisites_feat);
								const	hasPrerequisitesLevel = (feat.prerequisites_level <= currentAdventurer.level);
								const	hasPrerequisitesClass = (feat.prerequisites_class.includes(currentAdventurer.class));
								const	isLearned = unlockedFeats.includes(feat.id);
								return hasPrerequisitesLevel && hasPrerequisitesClass && hasPrerequisitesFeat && !isLearned;
							} else {
								const	isLearned = unlockedFeats.includes(feat.id);
								return !isLearned;
							}
						} else if (tab === 1) {
							return unlockedFeats.includes(feat.id);
						}
						return true;
					})
					.filter((feat) => {
						if (search === '')
							return true;
						return feat?.name.toLowerCase().includes(search.toLowerCase());
					})
					.map((feat) => {
						const	isLearned = unlockedFeats.includes(feat.id);
						let		canLearn = !isLearned;
						if (feat.prerequisites) {
							const	hasPrerequisitesFeat = feat.prerequisites_feat === 0 || unlockedFeats.includes(feat.prerequisites_feat);
							const	hasPrerequisitesLevel = (feat.prerequisites_level <= currentAdventurer.level);
							const	hasPrerequisitesClass = (feat.prerequisites_class.includes(currentAdventurer.class));
							canLearn = hasPrerequisitesLevel && hasPrerequisitesClass && hasPrerequisitesFeat && !isLearned;
						}
						return (
							<RowFeat
								key={feat?.id}
								feat={feat}
								canLearn={canLearn}
								onLearn={() => onLearnFeat(feat?.id)}
							/>
						);
					})
			}
		</div>
	);
}

function	Wrapper() {
	const	{currentAdventurer} = useRarity();
	const	[unlockedFeats, set_unlockedFeats] = useState([]);
	const	[pointLefts, set_pointLefts] = useState(0);

	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	When the adventurer change, we need to update the skills displayed, this is what this hook
	**	does.
	**********************************************************************************************/
	React.useLayoutEffect(() => {
		performBatchedUpdates(() => {
			const	_maxFeatsForAventurer = featsPerClass(currentAdventurer.class, currentAdventurer?.level);
			const	_initialFeatsPerClass = initialFeatsPerClass(currentAdventurer.class);
			const	_adventurerFeats = currentAdventurer.feats || [];
			const	_unlockedFeats = [...new Set([..._initialFeatsPerClass, ..._adventurerFeats])];

			set_unlockedFeats(_unlockedFeats);
			set_pointLefts(_maxFeatsForAventurer - _unlockedFeats.length);
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentAdventurer.tokenID]);

	return (
		<Section
			title={'Feats'}
			tabs={['All', 'Learned', 'Learnable']}
			headChildren={
				<div className={'flex text-xs whitespace-nowrap text-plain'}>
					{`${pointLefts <= 1 ? 'Point left:' : 'Points left:'}`}&nbsp;
					<span className={'font-bold text-highlight'}>{pointLefts}</span>
				</div>
			}>
			<Index unlockedFeats={unlockedFeats} />
		</Section>
	);
}


Wrapper.getLayout = function getLayout(page) {
	return (
		<Template>
			{page}
		</Template>
	);
};

export default Wrapper;
