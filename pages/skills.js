import	React, {useState, useEffect}					from	'react';
import	Image											from	'next/image';
import	{useRouter}										from	'next/router';
import	useRarity										from	'contexts/useRarity';
import	useWeb3											from	'contexts/useWeb3';
import	Template										from	'components/templates/Adventurer';
import	{learnSkills}									from	'utils/actions';
import	{availableSkillPoints, calculatePointsForSet}	from	'utils/libs/raritySkills';
import	CLASSES											from	'utils/codex/core/classes';
import	SKILLS											from	'utils/codex/core/skills.json';

function	IconChevron({className}) {
	return (
		<svg className={`w-6 h-6 text-plain ${className}`} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M16 5v2h-2V5h2zm-4 4V7h2v2h-2zm-2 2V9h2v2h-2zm0 2H8v-2h2v2zm2 2v-2h-2v2h2zm0 0h2v2h-2v-2zm4 4v-2h-2v2h2z'} fill={'currentColor'}/> </svg>
	);
}

function	ElementSkill({currentAdventurer, skill, isClassSpecific, updateSkills, onIncreaseLevel, onReduceLevel, onLearn}) {
	const canReduce = currentAdventurer.skills[skill?.id - 1] === updateSkills[skill?.id] || updateSkills[skill?.id] === 0;
	const canIncrease = (updateSkills.remainingPoints === 0 || isClassSpecific && updateSkills[skill?.id] >= currentAdventurer.level + 3) || (!isClassSpecific && updateSkills[skill?.id] >= Math.floor((currentAdventurer.level + 3) / 2));
	const canSave = currentAdventurer.skills[skill?.id - 1] !== updateSkills[skill?.id];

	return (
		<div className={'box p-4 flex flex-col'}>
			<p className={'font-story text-plain font-bold text-base mb-4'}>
				{skill.name}
			</p>
			<div className={'flex flex-row pb-2 mb-4'}>
				<div className={'flex flex-col h-full pr-6'}>
					<div className={'flex h-23 w-23'}>
						<Image src={skill.img} width={96} height={96} />
					</div>
				</div>

				<div className={'flex flex-col px-4 w-full'}>
					<div className={'flex flex-row justify-between'}>
						<p className={'font-story text-200 text-sm mb-2'}>
							{'Attribute'}
						</p>
						<div className={'font-story text-50 text-sm normal-case'}>
							{skill?.attributeLabel || '-'}
						</div>
					</div>

					<div className={'flex flex-row justify-between'}>
						<p className={'font-story text-200 text-sm mb-2'}>
							{'Cost'}
						</p>
						<div className={'font-story text-50 text-sm normal-case'}>
							{isClassSpecific ? '1' : '2'}
						</div>
					</div>

					<div className={'flex flex-row justify-between'}>
						<p className={'font-story text-200 text-sm mb-2'}>
							{'Armor Check'}
						</p>
						<div className={'font-story text-50 text-sm normal-case'}>
							{skill?.armorCheckPenalty ? 'YES' : 'NO'}
						</div>
					</div>

					<div className={'flex flex-row justify-between'}>
						<p className={'font-story text-200 text-sm mb-2'}>
							{'Synergy'}
						</p>
						<div className={'font-story text-50 text-sm normal-case'}>
							{skill?.synergy > 0 ? Object.values(SKILLS).find(s => s.id === skill?.synergy)?.name || '-' : '-'}
						</div>
					</div>
				</div>
			</div>
			<div className={'font-story text-50 text-sm normal-case'}>
				{skill.check}
			</div>
			<div className={'mt-auto flex flex-row space-x-2'}>
				<div className={`bg-600 flex justify-between text-center items-center px-1 py-2 w-2/3 mt-4 ${updateSkills.canBuyPoint ? '' : 'opacity-60'}`}>
					<div onClick={() => onReduceLevel()}>
						<IconChevron
							className={`${canReduce ? 'opacity-0' : updateSkills.canBuyPoint ? 'opacity-10 hover:opacity-100 cursor-pointer' : 'opacity-10'}`} />
					</div>
					<p className={'text-plain font-story text-sm select-none'}>
						{`Level ${updateSkills[skill?.id]}`}
					</p>
					<div onClick={() => onIncreaseLevel()}>
						<IconChevron
							className={`${canIncrease ? 'opacity-0' : updateSkills.canBuyPoint ? 'opacity-10 hover:opacity-100 cursor-pointer' : 'opacity-10'} transform rotate-180`} />
					</div>
				</div>

				<div
					onClick={() => canSave ? onLearn() : null}
					className={`flex flex-center text-center px-4 py-2 mt-4 w-1/3 tracking-wide ${canSave ? 'cursor-pointer button-highlight font-bold' : 'bg-600 text-plain cursor-not-allowed opacity-60'}`}>
					<p className={'font-story text-sm select-none'}>{'Learn'}</p>
				</div>
			</div>
		</div>
	);
}

function	Index() {
	const	{provider} = useWeb3();
	const	router = useRouter();
	const	{currentAdventurer, updateRarity} = useRarity();
	const	_availableSkillPoints = availableSkillPoints(currentAdventurer.attributes.intelligence, currentAdventurer.class, currentAdventurer.level);
	const	_pointSpentByAdventurer = calculatePointsForSet(currentAdventurer.class, currentAdventurer?.skills || []);
	const	[updateSkills, set_updateSkills] = useState(() => {
		const	skills = {
			initialPointsToSend: _availableSkillPoints - _pointSpentByAdventurer < 0 ? 0 : _availableSkillPoints - _pointSpentByAdventurer,
			remainingPoints: _availableSkillPoints - _pointSpentByAdventurer < 0 ? 0 : _availableSkillPoints - _pointSpentByAdventurer,
			canBuyPoint: _availableSkillPoints - _pointSpentByAdventurer > 0,
		};
		currentAdventurer.skills.forEach((e, i) => skills[i + 1] = e);
		return skills;
	});

	const	_adventurerClass = Object.values(CLASSES).find(e => e.id === currentAdventurer.class);
	const	[classTab, set_classTab] = useState(2);
	const	[attributeTab, set_attributeTab] = useState(0);
	const	[search, set_search] = useState(router?.query?.search || '');

	useEffect(() => {
		if (!updateSkills) {
			set_updateSkills(() => {
				const	skills = {
					initialPointsToSend: _availableSkillPoints - _pointSpentByAdventurer < 0 ? 0 : _availableSkillPoints - _pointSpentByAdventurer,
					remainingPoints: _availableSkillPoints - _pointSpentByAdventurer < 0 ? 0 : _availableSkillPoints - _pointSpentByAdventurer,
					canBuyPoint: _availableSkillPoints - _pointSpentByAdventurer > 0,
				};
				currentAdventurer.skills.forEach((e, i) => skills[i + 1] = e);
				return skills;
			});
		}
	}, [currentAdventurer?.tokenID]);

	useEffect(() => {
		if (router?.query?.search) set_search(router.query.search);
		if (router?.query?.tab) set_classTab(Number(router.query.tab));
	}, [router]);

	function	onReduceLevel(skill, isClassSpecific) {
		if (currentAdventurer.skills[skill?.id - 1] === updateSkills[skill?.id])
			return;
		if ((updateSkills.remainingPoints - (isClassSpecific ? 1 : 2)) > _availableSkillPoints || updateSkills[skill?.id] === 0)
			return;
		set_updateSkills(s => ({
			...s,
			[skill?.id]: s[skill?.id] - 1,
			remainingPoints: s.remainingPoints + (isClassSpecific ? 1 : 2)
		}));
	}

	function	onIncreaseLevel(skill, isClassSpecific) {
		if ((updateSkills.remainingPoints - (isClassSpecific ? 1 : 2)) < 0)
			return;
		if (isClassSpecific && updateSkills[skill?.id] >= currentAdventurer.level + 3)
			return;
		if (!isClassSpecific && updateSkills[skill?.id] >= Math.floor((currentAdventurer.level + 3) / 2))
			return;
		if (updateSkills.remainingPoints === 0)
			return;
		set_updateSkills(s => ({
			...s,
			[skill?.id]: s[skill?.id] + 1,
			remainingPoints: s.remainingPoints - (isClassSpecific ? 1 : 2)
		}));
	}

	function	onLearnSkill(id) {
		const	_skills = [...currentAdventurer.skills];
		_skills[id - 1] = updateSkills[id];
		learnSkills({
			provider,
			tokenID: currentAdventurer.tokenID,
			skills: _skills,
		}, ({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(data);
		});
	}

	function	onSetSkills() {
		const	_skills = [];
		for (const key in updateSkills) {
			if (key !== 'remainingPoints' && key !== 'canBuyPoint' && key !== 'initialPointsToSend') {
				_skills[key - 1] = updateSkills[key];
			}
		}
		learnSkills({
			provider,
			tokenID: currentAdventurer.tokenID,
			skills: _skills,
		}, ({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(data);
		});
	}

	function	renderFilters() {
		return (
			<div className={'w-full hidden md:flex flex-row justify-between font-story text-plain text-opacity-60 dark:text-opacity-60 text-sm mb-4'}>
				<div className={'flex flex-row space-x-4'}>
					<p
						onClick={() => set_classTab(2)}
						className={`transition-opacity hover:opacity-100 ${classTab === 2 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'All'}
					</p>
					<p
						onClick={() => set_classTab(0)}
						className={`transition-opacity hover:opacity-100 ${classTab === 0 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{_adventurerClass.name}
					</p>
					<p
						onClick={() => set_classTab(1)}
						className={`transition-opacity hover:opacity-100 ${classTab === 1 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Cross-class'}
					</p>
				</div>

				<div className={'flex flex-row space-x-4'}>
					<p
						onClick={() => set_attributeTab(0)}
						className={`transition-opacity hover:opacity-100 ${attributeTab === 0 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'All'}
					</p>
					<p
						onClick={() => set_attributeTab(1)}
						className={`transition-opacity hover:opacity-100 ${attributeTab === 1 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Strength'}
					</p>
					<p
						onClick={() => set_attributeTab(2)}
						className={`transition-opacity hover:opacity-100 ${attributeTab === 2 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Dexterity'}
					</p>
					<p
						onClick={() => set_attributeTab(3)}
						className={`transition-opacity hover:opacity-100 ${attributeTab === 3 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Intelligence'}
					</p>
					<p
						onClick={() => set_attributeTab(4)}
						className={`transition-opacity hover:opacity-100 ${attributeTab === 4 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Wisdom'}
					</p>
					<p
						onClick={() => set_attributeTab(5)}
						className={`transition-opacity hover:opacity-100 ${attributeTab === 5 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Charisma'}
					</p>
				</div>
			</div>
		);
	}	

	return (
		<div id={'content'}>
			<div className={'mt-6 flex flex-col md:flex-row mb-4 items-center justify-between'}>
				<div className={'w-full md:w-auto'}>
					<input
						value={search}
						onChange={e => set_search(e?.target?.value || '')}
						className={'border-2 border-black dark:border-dark-100 bg-white dark:bg-dark-600 border-solid h-10 w-full md:w-75 mr-0 md:mr-4 text-xs px-2 focus:outline-none text-plain'}
						placeholder={'SEARCH'} />
				</div>
				<div className={'flex flex-row items-center space-x-4 w-full md:w-auto justify-between md:justify-center mt-2 md:mt-0'}>
					<div className={'font-story text-xs text-plain flex'}>
						{`${updateSkills.remainingPoints <= 1 ? 'Point left:' : 'Points left:'}`}&nbsp;
						<span className={'text-highlight font-bold'}>{updateSkills.remainingPoints}</span>
					</div>

					<div className={'flex'}>
						<button
							onClick={() => {
								if (updateSkills.canBuyPoint && updateSkills.remainingPoints !== updateSkills.initialPointsToSend)
									onSetSkills();
							}}
							disabled={!updateSkills.canBuyPoint || updateSkills.remainingPoints === updateSkills.initialPointsToSend}
							className={`flex flex-center text-center px-4 py-2 w-full tracking-wide ${updateSkills.canBuyPoint && updateSkills.remainingPoints !== updateSkills.initialPointsToSend ? 'cursor-pointer button-highlight text-black font-bold' : 'cursor-not-allowed bg-600 opacity-60 text-plain'}`}>
							<p className={'font-story text-xs select-none'}>{'LEARN SELECTED'}</p>
						</button>
					</div>
				</div>
			</div>

			{renderFilters()}
				
			<div className={'grid grid-cols-1 md:grid-cols-3 gap-4'}>
				{
					Object.values(SKILLS)
						.filter((skill) => {
							if (classTab === 0) {
								if (attributeTab === 0) {
									return _adventurerClass.skills.includes(skill?.name);
								} else if (attributeTab === 1) {
									return _adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'strength';
								} else if (attributeTab === 2) {
									return _adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'dexterity';
								} else if (attributeTab === 3) {
									return _adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'constitution';
								} else if (attributeTab === 4) {
									return _adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'intelligence';
								} else if (attributeTab === 5) {
									return _adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'wisdom';
								} else if (attributeTab === 6) {
									return _adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'charisma';
								}
							} else if (classTab === 1) {
								if (attributeTab === 0) {
									return !_adventurerClass.skills.includes(skill?.name);
								} else if (attributeTab === 1) {
									return !_adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'strength';
								} else if (attributeTab === 2) {
									return !_adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'dexterity';
								} else if (attributeTab === 3) {
									return !_adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'constitution';
								} else if (attributeTab === 4) {
									return !_adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'intelligence';
								} else if (attributeTab === 5) {
									return !_adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'wisdom';
								} else if (attributeTab === 6) {
									return !_adventurerClass.skills.includes(skill?.name) && skill?.attributeName === 'charisma';
								}
							} else if (classTab === 2){
								if (attributeTab === 0) {
									return true;
								} else if (attributeTab === 1) {
									return skill?.attributeName === 'strength';
								} else if (attributeTab === 2) {
									return skill?.attributeName === 'dexterity';
								} else if (attributeTab === 3) {
									return skill?.attributeName === 'constitution';
								} else if (attributeTab === 4) {
									return skill?.attributeName === 'intelligence';
								} else if (attributeTab === 5) {
									return skill?.attributeName === 'wisdom';
								} else if (attributeTab === 6) {
									return skill?.attributeName === 'charisma';
								}
							}
							return skill;
						})
						.filter((skill) => {
							if (search === '')
								return true;
							return skill?.name.toLowerCase().includes(search.toLowerCase());
						})
						.map((skill) => {
							const	isClassSpecific = classTab === 1;
							return (
								<ElementSkill
									key={skill?.id}
									skill={skill}
									currentAdventurer={currentAdventurer}
									isClassSpecific={isClassSpecific}
									onLearn={() => onLearnSkill(skill?.id)}
									onReduceLevel={() => onReduceLevel(skill, isClassSpecific)}
									onIncreaseLevel={() => onIncreaseLevel(skill, isClassSpecific)}
									updateSkills={updateSkills}
								/>
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
