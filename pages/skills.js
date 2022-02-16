import	React, {useState}								from	'react';
import	useRarity										from	'contexts/useRarity';
import	useWeb3											from	'contexts/useWeb3';
import	Template										from	'components/templates/Head';
import	RowSkill										from	'components/layout/RowSkill';
import	Section											from	'components/layout/Section';
import	{learnSkills}									from	'utils/actions';
import	{availableSkillPoints, calculatePointsForSet}	from	'utils/libs/raritySkills';
import	CLASSES											from	'utils/codex/core/classes';
import	SKILLS											from	'utils/codex/core/skills.json';
import	performBatchedUpdates							from	'utils/performBatchedUpdates';

function	Index({tab, search, updateSkills, set_updateSkills, skillPoints, adventurerClass}) {
	const	{provider} = useWeb3();
	const	{currentAdventurer, updateRarity} = useRarity();

	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	When the user click the lower chevron, reduce the level by one and update the skills state
	**********************************************************************************************/
	function	onReduceLevel(skill, isClassSpecific) {
		if (currentAdventurer.skills[skill?.id - 1] === updateSkills[skill?.id])
			return;
		if ((updateSkills.remainingPoints - (isClassSpecific ? 1 : 2)) > skillPoints || updateSkills[skill?.id] === 0)
			return;
		set_updateSkills(s => ({
			...s,
			[skill?.id]: s[skill?.id] - 1,
			remainingPoints: s.remainingPoints + (isClassSpecific ? 1 : 2)
		}));
	}

	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	When the user click the upper chevron, increase the level by one and update the skills state
	**********************************************************************************************/
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

	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	Save the increase of one specific skill to the blockchain. Can only be called after the
	**	initial setup of the skills.
	**********************************************************************************************/
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

	return (
		<div className={'grid grid-cols-1 divide-y divide-light-primary-lighter dark:divide-dark-600'}>
			{
				Object.values(SKILLS)
					.filter((skill) => {
						if (tab === 0) {
							return true;
						} else if (tab === 1) {
							return adventurerClass.skills.includes(skill?.name);
						} else if (tab === 2){
							return !adventurerClass.skills.includes(skill?.name);
						}
						return skill;
					})
					.filter((skill) => {
						if (search === '')
							return true;
						return skill?.name.toLowerCase().includes(search.toLowerCase());
					})
					.map((skill) => {
						const	isClassSpecific = adventurerClass.skills.includes(skill?.name);
						return (
							<RowSkill
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
	);
}

function	Wrapper() {
	const	{provider} = useWeb3();
	const	{currentAdventurer, updateRarity} = useRarity();
	const	[updateSkills, set_updateSkills] = useState({});
	const	[adventurerClass, set_adventurerClass] = useState(Object.values(CLASSES).find(e => e.id === currentAdventurer.class));
	const	[skillPoints, set_skillPoints] = useState(availableSkillPoints(currentAdventurer.attributes.intelligence, currentAdventurer.class, currentAdventurer.level));
	const	[pointSpent, set_pointSpent] = useState(calculatePointsForSet(currentAdventurer.class, currentAdventurer?.skills || []));

	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	When the adventurer change, we need to update the skills displayed, this is what this hook
	**	does.
	**********************************************************************************************/
	React.useLayoutEffect(() => {
		performBatchedUpdates(() => {
			set_adventurerClass(Object.values(CLASSES).find(e => e.id === currentAdventurer.class));
			set_skillPoints(availableSkillPoints(currentAdventurer.attributes.intelligence, currentAdventurer.class, currentAdventurer.level));
			set_pointSpent(calculatePointsForSet(currentAdventurer.class, currentAdventurer?.skills || []));
			set_updateSkills(() => {
				const	skills = {
					initialPointsToSend: skillPoints - pointSpent < 0 ? 0 : skillPoints - pointSpent,
					remainingPoints: skillPoints - pointSpent < 0 ? 0 : skillPoints - pointSpent,
					canBuyPoint: skillPoints - pointSpent > 0,
				};
				currentAdventurer.skills.forEach((e, i) => skills[i + 1] = e);
				return skills;
			});
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentAdventurer.tokenID]);


	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	Action triggered to save the skills of the adventurer. This hook is called when the user
	**	clicks on the save button.
	**********************************************************************************************/
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

	return (
		<Section
			title={'Skills'}
			tabs={['All', adventurerClass.name, 'Cross-class']}
			headChildren={
				<div className={'flex text-xs whitespace-nowrap text-plain'}>
					{`${updateSkills.remainingPoints <= 1 ? 'Point left:' : 'Points left:'}`}&nbsp;
					<span className={'font-bold text-highlight'}>{updateSkills.remainingPoints}</span>
				</div>
			}
			button={{
				onClick: updateSkills.canBuyPoint && updateSkills.remainingPoints !== updateSkills.initialPointsToSend ? () => onSetSkills() : null,
				disabled: !updateSkills.canBuyPoint || updateSkills.remainingPoints === updateSkills.initialPointsToSend,
				label: 'LEARN SELECTED'
			}}>
			<Index
				adventurerClass={adventurerClass}
				skillPoints={skillPoints}
				updateSkills={updateSkills}
				set_updateSkills={set_updateSkills} />
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
