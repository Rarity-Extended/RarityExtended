import	React, {useState}								from	'react';
import	Image											from	'next/image';
import	useRarity										from	'contexts/useRarity';
import	useWeb3											from	'contexts/useWeb3';
import	Template										from	'components/templates/Adventurer';
import	{learnFeat}										from	'utils/actions';
import	{featsPerClass, initialFeatsPerClass}			from	'utils/libs/rarityFeats';
import	FEATS											from	'utils/codex/core/feats.json';

function	ElementFeat({feat, canLearn, learn}) {
	return (
		<div className={'flex flex-col p-4 box'}>
			<p className={'mb-4 text-base font-bold text-plain'}>
				{feat.name}
			</p>
			<div className={'flex flex-row pb-2 mb-4'}>
				<div className={'flex flex-col pr-6 h-full'}>
					<div className={'flex w-23 h-23'}>
						<Image src={feat.img} width={96} height={96} />
					</div>
				</div>

				<div className={'flex flex-col px-4 w-full'}>
					<div className={'flex flex-col justify-between'}>
						<p className={'mb-2 text-sm text-200 text-opacity-60'}>
							{'Prerequisites'}
						</p>
						<div className={'text-sm text-50'}>
							{feat?.prerequisites ? Object.values(FEATS).find(s => s.id === feat?.prerequisites_feat)?.name || '-' : '-'}
						</div>
					</div>
				</div>
			</div>
			<div className={'text-sm text-50'}>
				{feat.benefit}
			</div>
			<div className={'flex flex-row mt-auto space-x-2'}>
				<button
					disabled={!canLearn}
					onClick={() => canLearn ? learn() : null}
					className={'flex mt-4 w-full flex-center button-highlight'}>
					<p>{'Learn'}</p>
				</button>
			</div>
		</div>
	);
}

function	Index() {
	const	{provider} = useWeb3();
	const	{currentAdventurer, updateRarity} = useRarity();
	const	_maxFeatsForAventurer = featsPerClass(currentAdventurer.class, currentAdventurer?.level);
	const	_initialFeatsPerClass = initialFeatsPerClass(currentAdventurer.class);
	const	_adventurerFeats = currentAdventurer.feats || [];
	const	_unlockedFeats = [...new Set([..._initialFeatsPerClass, ..._adventurerFeats])];
	const	_pointLefts = _maxFeatsForAventurer - _unlockedFeats.length;
	const	[learnTab, set_learnTab] = useState(0);
	const	[typeTab, set_typeTab] = useState(0);
	const	[search, set_search] = useState('');

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

	function	renderFilters() {
		return (
			<div className={'hidden flex-row justify-between mb-4 w-full text-sm md:flex text-plain text-opacity-60 dark:text-opacity-60'}>
				<div className={'flex flex-row space-x-4'}>
					<p
						onClick={() => set_learnTab(0)}
						className={`transition-opacity hover:opacity-100 ${learnTab === 0 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Learnable'}
					</p>
				</div>

				<div className={'flex flex-row space-x-4'}>
					<p
						onClick={() => set_typeTab(0)}
						className={`transition-opacity hover:opacity-100 ${typeTab === 0 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'All'}
					</p>
					<p
						onClick={() => set_typeTab(1)}
						className={`transition-opacity hover:opacity-100 ${typeTab === 1 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'General'}
					</p>
					<p
						onClick={() => set_typeTab(2)}
						className={`transition-opacity hover:opacity-100 ${typeTab === 2 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Item Creation'}
					</p>
					<p
						onClick={() => set_typeTab(3)}
						className={`transition-opacity hover:opacity-100 ${typeTab === 3 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Metamagic'}
					</p>
				</div>
			</div>
		);
	}	

	return (
		<div id={'content'}>
			<div className={'flex flex-col justify-between items-center mt-6 mb-4 md:flex-row'}>
				<div className={'w-full md:w-auto'}>
					<input
						onChange={e => set_search(e?.target?.value || '')}
						className={'px-2 mr-0 w-full h-10 text-xs bg-white dark:bg-dark-600 border-2 border-black dark:border-dark-100 border-solid focus:outline-none md:mr-4 md:w-75 text-plain'}
						placeholder={'SEARCH'} />
				</div>
				<div className={'flex flex-row justify-between items-center mt-2 space-x-4 w-full md:justify-center md:mt-0 md:w-auto'}>
					<div className={'flex text-xs text-plain'}>
						{`${_pointLefts <= 1 ? 'Point left:' : 'Points left:'}`}&nbsp;
						<span className={'font-bold text-highlight'}>{_pointLefts}</span>
					</div>
				</div>
			</div>

			{renderFilters()}
				
			<div className={'grid grid-cols-1 gap-4 md:grid-cols-3'}>
				{
					Object.values(FEATS)
						.filter((feat) => {
							if (learnTab === 0) {
								if (feat.prerequisites) {
									const	hasPrerequisitesFeat = feat.prerequisites_feat === 0 || _unlockedFeats.includes(feat.prerequisites_feat);
									const	hasPrerequisitesLevel = (feat.prerequisites_level <= currentAdventurer.level);
									const	hasPrerequisitesClass = (feat.prerequisites_class.includes(currentAdventurer.class));
									const	isLearned = _unlockedFeats.includes(feat.id);
									return hasPrerequisitesLevel && hasPrerequisitesClass && hasPrerequisitesFeat && !isLearned;
								} else {
									const	isLearned = _unlockedFeats.includes(feat.id);
									return !isLearned;
								}
							} else if (learnTab === 1) {
								return _unlockedFeats.includes(feat.id);
							}
							return true;
						})
						.filter((feat) => {
							if (typeTab === 0) {
								return true;
							} else if (typeTab === 1) {
								return feat.type === 'General';
							} else if (typeTab === 2) {
								return feat.type === 'Item Creation';
							} else if (typeTab === 3) {
								return feat.type === 'Metamagic';
							}
							return true;
						})
						.filter((feat) => {
							if (search === '')
								return true;
							return feat?.name.toLowerCase().includes(search.toLowerCase());
						})
						.map((feat) => {
							const	isLearned = _unlockedFeats.includes(feat.id);
							let		canLearn = !isLearned;
							if (feat.prerequisites) {
								const	hasPrerequisitesFeat = feat.prerequisites_feat === 0 || _unlockedFeats.includes(feat.prerequisites_feat);
								const	hasPrerequisitesLevel = (feat.prerequisites_level <= currentAdventurer.level);
								const	hasPrerequisitesClass = (feat.prerequisites_class.includes(currentAdventurer.class));
								canLearn = hasPrerequisitesLevel && hasPrerequisitesClass && hasPrerequisitesFeat && !isLearned;
							}
							return (
								<ElementFeat
									key={feat?.id}
									feat={feat}
									canLearn={canLearn}
									learn={() => onLearnFeat(feat.id)} />
							);
						})
				}
			</div>
		</div>
	);
}


Index.getLayout = function getLayout(page) {
	return (
		<Template>
			{page}
		</Template>
	);
};

export default Index;