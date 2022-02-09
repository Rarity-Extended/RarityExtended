import	React, {useState}	from	'react';
import	Image				from	'next/image';
import	SKILLS				from	'utils/codex/core/skills.json';
import	IconChevron			from	'components/icons/IconChevron';

function	RowSkill({currentAdventurer, skill, isClassSpecific, updateSkills, onIncreaseLevel, onReduceLevel, onLearn}) {
	const	[expanded, set_expanded] = useState(false);
	const	canReduce = currentAdventurer.skills[skill?.id - 1] === updateSkills[skill?.id] || updateSkills[skill?.id] === 0;
	const	canIncrease = (updateSkills.remainingPoints === 0 || isClassSpecific && updateSkills[skill?.id] >= currentAdventurer.level + 3) || (!isClassSpecific && updateSkills[skill?.id] >= Math.floor((currentAdventurer.level + 3) / 2));
	const	canSave = currentAdventurer.skills[skill?.id - 1] !== updateSkills[skill?.id];

	return (
		<div className={'p-4'}>
			<div className={'grid grid-cols-12 gap-x-8'}>
				<div className={'flex flex-row col-span-3'}>
					<div className={'flex w-20 min-w-20 h-20 bg-500 flex-center'}>
						<Image src={skill.img} width={80} height={80} objectFit={'contain'} />
					</div>
					<div className={'flex flex-col ml-4 w-full'}>
						<p className={'mb-1 text-base font-bold text-plain'}>
							{skill.name}
						</p>
						<p className={'text-sm text-plain-60'}>
							{`Attribute: ${skill?.attributeLabel || 'None'}`}
						</p>
					</div>
				</div>

				<div className={'flex flex-col col-span-6'}>
					<div className={`text-sm text-plain-60 cursor-help ${expanded ? 'line-clamp-none' : skill?.synergy > 0 && skill?.armorCheckPenalty > 0 ? 'line-clamp-2' : skill?.synergy > 0 || skill?.armorCheckPenalty > 0 ? 'line-clamp-3' : 'line-clamp-4'}`} onClick={() => set_expanded(!expanded)}>
						{skill.check}
					</div>
					{skill?.synergy > 0 ? 
						<div className={'text-sm text-plain-60'}>
							{'Has a synergy with '}
							<span className={'font-bold text-highlight'}>{Object.values(SKILLS).find(s => s.id === skill?.synergy)?.name}</span>
							{'.'}
						</div> : null}
					{skill?.armorCheckPenalty > 0 ? 
						<div className={'text-sm text-plain-60'}>
							{'There is an'}
							<span className={'font-bold text-highlight'}>{' armor penalty '}</span>
							{'for this skill.'}
						</div> : null}
				</div>

				<div className={'flex col-span-3 justify-center items-start w-full'}>
					<div className={'flex flex-row space-x-4 w-full'}>
						<div className={'flex relative justify-between items-center w-1/2 button-fake'}>
							<div onClick={onReduceLevel}>
								<IconChevron className={`${canReduce ? 'opacity-0' : 'text-gray-100 cursor-pointer'} transform rotate-180`} />
							</div>
							<p>{`Level ${updateSkills[skill?.id]}`}</p>
							<div onClick={onIncreaseLevel}>
								<IconChevron className={`${canIncrease ? 'opacity-0' : 'text-gray-100 cursor-pointer'}`} />
							</div>
						</div>

						<button
							disabled={!canSave}
							onClick={() => canSave ? onLearn() : null}
							className={'flex w-1/2 flex-center button-highlight'}>
							<p className={'select-none'}>{'Craft'}</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RowSkill;