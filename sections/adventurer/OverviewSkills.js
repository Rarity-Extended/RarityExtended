import	React											from	'react';
import	Image											from	'next/image';
import	{availableSkillPoints, calculatePointsForSet}	from	'utils/libs/raritySkills';
import	SKILLS											from	'utils/codex/skills.json';

function	OverviewSkills({adventurer}) {
	const	availableSkills = adventurer.skills;
	const	skillPointsAvailable = availableSkillPoints(adventurer.attributes.intelligence, adventurer.class, adventurer.level);
	const	pointSpentByAdventurer = calculatePointsForSet(adventurer.class, adventurer?.skills || []);
	const	remainingPoints = skillPointsAvailable - pointSpentByAdventurer < 0 ? 0 : skillPointsAvailable - pointSpentByAdventurer;

	return (
		<div className={'flex flex-col items-center font-story w-full mt-auto'}>
			<div className={'mb-6'}>
				<p className={'font-story text-sm normal-case'}>
					<span className={'text-50'}>{'Skills represent the other, non-weapon, non-magical, non-standard checks. They help with combat and magic, as well as movement and general conversation. You have '}</span>
					<span className={'text-highlight font-bold'}>{`${remainingPoints <= 1 ? `${remainingPoints} point` : `${remainingPoints} points`} left`}</span>
					<span className={'text-50'}>{' to spend.'}</span>
				</p>
			</div>
			<div className={'grid grid-cols-3 gap-x-8 gap-y-4 w-full overflow-auto scrollbar-none'}>
				{Object.values(SKILLS).filter((skill) => availableSkills[skill?.id - 1] > 0).map((skill) => (
					<div key={skill.id} className={'flex flex-row items-center justify-between'}>
						<div className={'flex flex-row items-center'}>
							<Image src={skill.img} width={56} height={56} />
							<div className={'flex flex-col justify-between h-14 ml-2'}>
								<p className={'text-sm normal-case'}>{skill.name}</p>
								<div>
									<p className={'text-xs normal-case opacity-60'}>{`Level: ${availableSkills[skill?.id - 1]}`}</p>
									<p className={'text-xs normal-case opacity-60'}>{`Attribute: ${skill?.attributeLabel || '-'}`}</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
export default OverviewSkills;