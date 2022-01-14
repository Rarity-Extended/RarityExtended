/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 19th 2021
**	@Filename:				Skills.js
******************************************************************************/

import	React, {useState}								from	'react';
import	Image											from	'next/image';
import	ModalSkills										from	'components/ModalSkills';
import	{availableSkillPoints, calculatePointsForSet}	from	'utils/libs/raritySkills';
import	SKILLS											from	'utils/codex/skills.json';

function	Skills({adventurer}) {
	const	_availableSkillPoints = availableSkillPoints(adventurer.attributes.intelligence, adventurer.class, adventurer.level);
	const	_pointSpentByAdventurer = calculatePointsForSet(adventurer.class, adventurer?.skills || []);
	const	[isOpen, set_isOpen] = useState(false);
	const	[updateSkills, set_updateSkills] = useState(() => {
		const	skills = {
			initialPointsToSend: _availableSkillPoints - _pointSpentByAdventurer < 0 ? 0 : _availableSkillPoints - _pointSpentByAdventurer,
			remainingPoints: _availableSkillPoints - _pointSpentByAdventurer < 0 ? 0 : _availableSkillPoints - _pointSpentByAdventurer,
			canBuyPoint: _availableSkillPoints - _pointSpentByAdventurer > 0,
		};
		adventurer.skills.forEach((e, i) => skills[i + 1] = e);
		return skills;
	});

	function closeModal() {
		set_isOpen(false);
	}
  
	function openModal() {
		set_isOpen(true);
	}

	function	renderSkills() {
		let		hasSkills = false;
		const	skillList = (adventurer?.skills || []).map((level, index) => {
			if (level === 0) {
				return null;
			}
			hasSkills = true;
			const	skill = Object.values(SKILLS).find(e => e.id === index + 1);
			return (
				<div className={'flex flex-row space-x-4 w-full mb-6'} key={`${adventurer.tokenID}-${skill.name}`}>
					<div className={'w-16 h-16 bg-gray-principal dark:bg-dark-400 flex flex-center relative item'}>
						<Image src={skill.img} width={64} height={64} />
					</div>
					<div className={'h-16 flex flex-col justify-between'}>
						<p className={'text-xs'}>{skill?.name}</p>
						<p className={'text-megaxs mt-auto'}>{skill?.attributeName}</p>
						<p className={'text-megaxs'}>{`level: ${level}`}</p>
					</div>
				</div>
			);
		});

		if (!adventurer?.attributes?.isInit) {
			return (
				<div className={'w-full'}>
					<div className={'p-4 pb-0 flex text-plain text-sx normal-case w-full md:w-1/2 pr-0 md:pr-20'} onClick={openModal}>
						{'You first need to set your attributes adventurer! Spend your points!'}
					</div>
				</div>
			);
		}

		if (!hasSkills) {
			return (
				<div className={'w-full'}>
					<div className={'p-4 flex text-plain text-sx normal-case w-full md:w-1/2 pr-0 md:pr-32'} onClick={openModal}>
						{'You have no skills yet, traveler, spend your points!'}
					</div>
					<div className={'flex w-full md:w-1/2 px-4'}>
						<div
							onClick={openModal}
							className={'border-4 border-black dark:border-dark-100 px-10 py-2 text-plain hover:bg-gray-secondary dark:hover:bg-dark-400 cursor-pointer transition-colors flex flex-center text-center text-xs w-full'}>
							<p>{'SKILLBOOK'}</p>
							{updateSkills.remainingPoints > 0 ? <p className={'inline text-megaxs ml-2'}>
								{`(POINTS LEFT: ${updateSkills.remainingPoints})`}
							</p> : null}
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className={'flex flex-col md:flex-row w-full space-x-0 md:space-x-2'}>
				<div className={'w-full px-4 -mb-6'}>
					<div className={'flex w-full md:w-1/2 pr-4'}>
						<div
							onClick={openModal}
							className={'border-4 border-black dark:border-dark-100 px-10 py-2 text-plain hover:bg-gray-secondary dark:hover:bg-dark-400 cursor-pointer transition-colors flex flex-center text-center text-xs w-full'}>
							<p>{'SKILLBOOK'}</p>
							{updateSkills.remainingPoints > 0 ? <p className={'inline text-megaxs ml-2'}>
								{`(POINTS LEFT: ${updateSkills.remainingPoints})`}
							</p> : null}
						</div>
					</div>
					<div className={'w-full grid grid-cols-1 md:grid-cols-4 gap-x-6 pt-6'}>
						{skillList}
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			{renderSkills()}
			<ModalSkills
				adventurer={adventurer}
				isOpen={isOpen}
				closeModal={closeModal}
				updateSkills={updateSkills}
				set_updateSkills={set_updateSkills} />
		</>
	);
}

export default Skills;