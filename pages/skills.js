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
		<svg aria-hidden={'true'} focusable={'false'} data-prefix={'fas'} data-icon={'chevron-right'} className={`w-3 h-3 ${className}`} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 320 512'}><path fill={'currentColor'} d={'M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z'}></path></svg>
	);
}

function	ElementSkill({currentAdventurer, skill, isClassSpecific, updateSkills, onIncreaseLevel, onReduceLevel, onLearn}) {
	const canReduce = currentAdventurer.skills[skill?.id - 1] === updateSkills[skill?.id] || updateSkills[skill?.id] === 0;
	const canIncrease = (updateSkills.remainingPoints === 0 || isClassSpecific && updateSkills[skill?.id] >= currentAdventurer.level + 3) || (!isClassSpecific && updateSkills[skill?.id] >= Math.floor((currentAdventurer.level + 3) / 2));
	const canSave = currentAdventurer.skills[skill?.id - 1] !== updateSkills[skill?.id];

	return (
		<div className={'flex flex-col p-4 box'}>
			<p className={'mb-4 text-base font-bold text-plain'}>
				{skill.name}
			</p>
			<div className={'flex flex-row pb-2 mb-4'}>
				<div className={'flex flex-col pr-6 h-full'}>
					<div className={'flex w-23 h-23'}>
						<Image src={skill.img} width={96} height={96} />
					</div>
				</div>

				<div className={'flex flex-col px-4 w-full'}>
					<div className={'flex flex-row justify-between'}>
						<p className={'mb-2 text-sm text-200'}>
							{'Attribute'}
						</p>
						<div className={'text-sm text-50'}>
							{skill?.attributeLabel || '-'}
						</div>
					</div>

					<div className={'flex flex-row justify-between'}>
						<p className={'mb-2 text-sm text-200'}>
							{'Cost'}
						</p>
						<div className={'text-sm text-50'}>
							{isClassSpecific ? '1' : '2'}
						</div>
					</div>

					<div className={'flex flex-row justify-between'}>
						<p className={'mb-2 text-sm text-200'}>
							{'Armor Check'}
						</p>
						<div className={'text-sm text-50'}>
							{skill?.armorCheckPenalty ? 'YES' : 'NO'}
						</div>
					</div>

					<div className={'flex flex-row justify-between'}>
						<p className={'mb-2 text-sm text-200'}>
							{'Synergy'}
						</p>
						<div className={'text-sm text-50'}>
							{skill?.synergy > 0 ? Object.values(SKILLS).find(s => s.id === skill?.synergy)?.name || '-' : '-'}
						</div>
					</div>
				</div>
			</div>
			<div className={'text-sm text-50'}>
				{skill.check}
			</div>
			<div className={'flex flex-row mt-auto space-x-2'}>
				<div className={'flex justify-between items-center mt-4 w-2/3 button-fake'}>
					<div onClick={() => onReduceLevel()}>
						<IconChevron
							className={`${canReduce ? 'opacity-0' : 'text-gray-100 cursor-pointer'} transform rotate-180`} />
					</div>
					<p>{`Level ${updateSkills[skill?.id]}`}</p>
					<div onClick={() => onIncreaseLevel()}>
						<IconChevron
							className={`${canIncrease ? 'opacity-0' : 'text-gray-100 cursor-pointer'}`} />
					</div>
				</div>

				<button
					disabled={!canSave}
					onClick={() => canSave ? onLearn() : null}
					className={'flex mt-4 w-1/3 flex-center button-highlight'}>
					<p className={'select-none'}>{'Learn'}</p>
				</button>
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
			<div className={'hidden flex-row justify-between mb-4 w-full text-sm md:flex text-plain text-opacity-60 dark:text-opacity-60'}>
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
			<div className={'flex flex-col justify-between items-center mt-6 mb-4 md:flex-row'}>
				<div className={'w-full md:w-auto'}>
					<input
						value={search}
						onChange={e => set_search(e?.target?.value || '')}
						className={'px-2 mr-0 w-full h-10 text-xs bg-white dark:bg-dark-600 border-2 border-black dark:border-dark-100 border-solid focus:outline-none md:mr-4 md:w-75 text-plain'}
						placeholder={'SEARCH'} />
				</div>
				<div className={'flex flex-row justify-between items-center mt-2 space-x-4 w-full md:justify-center md:mt-0 md:w-auto'}>
					<div className={'flex text-xs text-plain'}>
						{`${updateSkills.remainingPoints <= 1 ? 'Point left:' : 'Points left:'}`}&nbsp;
						<span className={'font-bold text-highlight'}>{updateSkills.remainingPoints}</span>
					</div>

					<div className={'flex'}>
						<button
							onClick={() => {
								if (updateSkills.canBuyPoint && updateSkills.remainingPoints !== updateSkills.initialPointsToSend)
									onSetSkills();
							}}
							disabled={!updateSkills.canBuyPoint || updateSkills.remainingPoints === updateSkills.initialPointsToSend}
							className={'flex w-full flex-center button-highlight'}>
							<p className={'select-none'}>{'LEARN SELECTED'}</p>
						</button>
					</div>
				</div>
			</div>

			{renderFilters()}
				
			<div className={'grid grid-cols-1 gap-4 md:grid-cols-3'}>
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
