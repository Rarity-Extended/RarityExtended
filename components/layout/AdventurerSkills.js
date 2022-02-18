import	React											from	'react';
import	Link											from	'next/link';
import	Image											from	'next/image';
import	{availableSkillPoints, calculatePointsForSet}	from	'utils/libs/raritySkills';
import	SKILLS											from	'utils/codex/core/skills.json';

function	OverviewSkills({adventurer}) {
	const	availableSkills = adventurer.skills;
	const	skillPointsAvailable = availableSkillPoints(adventurer.attributes.intelligence, adventurer.class, adventurer.level);
	const	pointSpentByAdventurer = calculatePointsForSet(adventurer.class, adventurer?.skills || []);
	const	remainingPoints = skillPointsAvailable - pointSpentByAdventurer < 0 ? 0 : skillPointsAvailable - pointSpentByAdventurer;

	return (
		<div className={'flex flex-col items-center p-4 mt-auto w-full h-auto md:p-0 md:h-292px'}>
			<div className={'mb-6'}>
				<p className={'text-sm'}>
					<span className={'text-plain-60'}>{'Skills represent the other, non-weapon, non-magical, non-standard checks. They help with combat and magic, as well as movement and general conversation. You have '}</span>
					<Link href={'/skills#content'}>
						<span className={'font-bold hover:underline cursor-pointer text-highlight'}>{`${remainingPoints <= 1 ? `${remainingPoints} point` : `${remainingPoints} points`} left`}</span>
					</Link>
					<span className={'text-plain-60'}>{' to spend.'}</span>
				</p>
			</div>
			<div className={'overflow-scroll w-full md:h-186px'}>
				<div className={'grid grid-cols-1 gap-x-8 gap-y-4 w-full md:grid-cols-3 scrollbar-none'}>
					{Object.values(SKILLS).filter((skill) => availableSkills[skill?.id - 1] > 0).map((skill) => (
						<div key={skill.id} className={'flex flex-row justify-between items-center'}>
							<div className={'flex flex-row items-center'}>
								<div style={{minWidth: 56}}>
									<Image src={skill.img} width={56} height={56} />
								</div>
								<div className={'flex flex-col justify-between -mt-2 ml-2 h-14 md:mt-0'}>
									<p className={'text-sm'}>{skill.name}</p>
									<div>
										<p className={'text-xs opacity-60'}>{`Level: ${availableSkills[skill?.id - 1]}`}</p>
										<p className={'text-xs opacity-60'}>{`Attribute: ${skill?.attributeLabel || '-'}`}</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
export default OverviewSkills;