import	React, {useState}								from	'react';
import	Image											from	'next/image';
import	useRarity										from	'contexts/useRarity';
import	useWeb3											from	'contexts/useWeb3';
import	{learnFeat}										from	'utils/actions';
import	{featsPerClass, initialFeatsPerClass}			from	'utils/libs/rarityFeats';
import	FEATS											from	'utils/codex/feats.json';

function	ElementSkill({feat, canLearn, learn}) {
	return (
		<div className={'rounded-md bg-gray-lighter dark:bg-dark-400 p-4 flex flex-col'}>
			<p className={'font-story text-black dark:text-white font-bold text-base mb-4'}>
				{feat.name}
			</p>
			<div className={'flex flex-row pb-2 mb-4'}>
				<div className={'flex flex-col h-full pr-6'}>
					<div className={'flex h-23 w-23'}>
						<Image src={feat?.img || '/skills/appraise.png'} width={96} height={96} />
					</div>
				</div>

				<div className={'flex flex-col px-4 w-full'}>
					<div className={'flex flex-col justify-between'}>
						<p className={'font-story text-black dark:text-dark-200 text-opacity-60 text-sm mb-2'}>
							{'Prerequisites'}
						</p>
						<div className={'font-story text-black dark:text-white opacity-60 text-sm normal-case'}>
							{feat?.prerequisites ? Object.values(FEATS).find(s => s.id === feat?.prerequisites_feat)?.name || '-' : '-'}
						</div>
					</div>
				</div>
			</div>
			<div className={'font-story text-black dark:text-white opacity-60 text-sm normal-case'}>
				{feat.benefit}
			</div>
			<div className={'mt-auto flex flex-row space-x-2'}>
				<div
					onClick={() => canLearn ? learn() : null}
					className={`bg-gray-principal dark:bg-dark-600 flex justify-center text-center items-center px-4 py-2 mt-4 w-full ${canLearn ? 'cursor-pointer dark:hover:bg-dark-900 hover:bg-gray-secondary' : 'cursor-not-allowed opacity-60'}`}>
					<p className={'text-black dark:text-white font-story text-sm select-none'}>{'Learn'}</p>
				</div>
			</div>
		</div>
	);
}

function	Feats() {
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
			<div className={'w-full flex flex-row justify-between font-story text-black dark:text-white text-opacity-60 dark:text-opacity-60 text-sm mb-4'}>
				<div className={'flex flex-row space-x-4'}>
					<p
						onClick={() => set_learnTab(0)}
						className={`transition-opacity hover:opacity-100 ${learnTab === 0 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Learnable'}
					</p>
					<p
						onClick={() => set_learnTab(1)}
						className={`transition-opacity hover:opacity-100 ${learnTab === 1 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Learned'}
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
		<div>
			<div className={'mb-10'}>
				<h1 className={'text-black dark:text-white font-story text-4xl mb-4'}>
					{'Feats'}
				</h1>
				<div className={'flex flex-col'}>
					<p className={'text-black dark:text-white font-story text-base max-w-full md:max-w-4xl'}>
						{'What do you know, stranger ? What can you do ? What\'s your talent ? I am sure your are skillful, so I will give you a few tips to help you to be more efficient and to be more effective. But first, let\'s start with the basics. Select your skills.'}
					</p>
					<p className={'text-black dark:text-white font-story text-base max-w-full md:max-w-4xl mt-2'}>
						{'You have '}
						<span className={'text-tag-warning font-bold'}>{`${_pointLefts <= 1 ? `${_pointLefts} point` : `${_pointLefts} points`} left`}</span>
						{'.'}
					</p>
				</div>
			</div>
			<div className={'mt-6 flex flex-col md:flex-row mb-4 items-center justify-between'}>
				<div>
					<input
						onChange={e => set_search(e?.target?.value || '')}
						className={'border-2 border-black dark:border-dark-100 bg-white dark:bg-dark-600 border-solid h-10 w-full md:w-75 mr-0 md:mr-4 text-xs px-2 focus:outline-none text-black dark:text-white'}
						placeholder={'SEARCH'} />
				</div>
				<div className={'flex flex-row items-center justify-center space-x-4'}>
					<div className={'font-story text-xs text-black dark:text-white flex'}>
						{`${_pointLefts <= 1 ? `Point left: ${_pointLefts}` : `Points left: ${_pointLefts}`}`}
					</div>
				</div>
			</div>

			{renderFilters()}
				
			<div className={'grid grid-cols-1 md:grid-cols-3 gap-4'}>
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
								<ElementSkill
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

export default Feats;