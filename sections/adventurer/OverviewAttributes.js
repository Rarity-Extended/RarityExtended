import	React						from	'react';
import	{xpRequired}				from	'utils/libs/rarity';
import	IconAttributeArmor			from	'components/icons/IconAttributeArmor';
import	IconAttributeAttack			from	'components/icons/IconAttributeAttack';
import	IconAttributeCharisma		from	'components/icons/IconAttributeCharisma';
import	IconAttributeConstitution	from	'components/icons/IconAttributeConstitution';
import	IconAttributeDamage			from	'components/icons/IconAttributeDamage';
import	IconAttributeDexterity		from	'components/icons/IconAttributeDexterity';
import	IconAttributeStrength		from	'components/icons/IconAttributeStrength';
import	IconAttributeWisdom			from	'components/icons/IconAttributeWisdom';

function modifier_for_attribute(_attribute) {
	if (_attribute == 9) {
		return -1;
	}
	return Math.floor((_attribute - 10) / 2);
}
function health_by_class(_class) {
	const	health = [0, 12, 6, 8, 8, 10, 8, 10, 8, 6, 4, 4];
	return	health[_class];
}
function health_by_class_and_level(_class, _level, _const) {
	let _mod = modifier_for_attribute(_const);
	let _base_health = health_by_class(_class) + _mod;
	if (_base_health <= 0) {
		_base_health = 1;
	}
	return (_base_health * _level);
}
function base_attack_bonus_by_class(_class) {
	const	attackBonus = [0, 4, 3, 3, 3, 4, 3, 4, 4, 3, 2, 2];
	return	attackBonus[_class];
}
function base_attack_bonus_by_class_and_level(_class, _level) {
	return _level * base_attack_bonus_by_class(_class) / 4;
}
function attack_bonus(_class, _str, _level) {
	const	attack = base_attack_bonus_by_class_and_level(_class, _level) + modifier_for_attribute(_str);
	if (attack < 1) {
		return 1;
	}
	return attack;
}
function damage(_str) {
	const	_mod = modifier_for_attribute(_str);
	if (_mod <= 1) {
		return 1;
	}
	return (_mod);
}

function	OverviewAttributes({adventurer}) {
	const	health = health_by_class_and_level(adventurer.class, adventurer.level, adventurer.attributes.constitution);
	return (
		<div className={'flex flex-col items-center font-story w-full mt-auto'}>
			<div className={'grid grid-cols-2 gap-x-16 gap-y-2 w-full'}>
				<div className={'flex flex-row items-center justify-between'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeStrength width={16} height={16} />
						<p className={'text-xs normal-case ml-2'}>{'Strength'}</p>
					</div>
					<p className={'text-xl'}>{adventurer.attributes.strength}</p>
				</div>
				<div className={'flex flex-row items-center justify-between'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeDexterity width={16} height={16} />
						<p className={'text-xs normal-case ml-2'}>{'Dexterity'}</p>
					</div>
					<p className={'text-xl'}>{adventurer.attributes.dexterity}</p>
				</div>
				<div className={'flex flex-row items-center justify-between'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeConstitution width={16} height={16} />
						<p className={'text-xs normal-case ml-2'}>{'Constitution'}</p>
					</div>
					<p className={'text-xl'}>{adventurer.attributes.constitution}</p>
				</div>
				<div className={'flex flex-row items-center justify-between'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeWisdom width={16} height={16} />
						<p className={'text-xs normal-case ml-2'}>{'Wisdom'}</p>
					</div>
					<p className={'text-xl'}>{adventurer.attributes.wisdom}</p>
				</div>
				<div className={'flex flex-row items-center justify-between'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeCharisma width={16} height={16} />
						<p className={'text-xs normal-case ml-2'}>{'Charisma'}</p>
					</div>
					<p className={'text-xl'}>{adventurer.attributes.charisma}</p>
				</div>

				<div className={'flex flex-row items-center justify-between'}>
					<div className={'flex flex-row items-center text-50'}>
						<IconAttributeAttack width={16} height={16} />
						<p className={'text-xs normal-case ml-2'}>{'Attack'}</p>
					</div>
					<p className={'text-xl'}>
						{attack_bonus(adventurer.class, adventurer.attributes.strength, adventurer.level)}
					</p>
				</div>
				<div className={'flex flex-row items-center justify-between'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeDamage width={16} height={16} />
						<p className={'text-xs normal-case ml-2'}>{'Damage'}</p>
					</div>
					<p className={'text-xl'}>{damage(adventurer.attributes.strength)}</p>
				</div>
				<div className={'flex flex-row items-center justify-between'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeArmor width={16} height={16} />
						<p className={'text-xs normal-case ml-2'}>{'Armor'}</p>
					</div>
					<p className={'text-xl'}>{modifier_for_attribute(adventurer.attributes.dexterity)}</p>
				</div>
			</div>

			<div className={'w-full mt-10'}>
				<div className={'w-full flex flex-row justify-between items-center font-bold text-xs opacity-60 normal-case mb-1'}>
					<div>{'Health'}</div>
					<div>{`${health} / ${health}`}</div>
				</div>
				<div className={'w-full h-4'}>
					<div className={'bg-600 h-2 flex w-full relative overflow-hidden'}>
						<div className={'absolute left-0 inset-y-0 h-2 bg-tag-withdraw'} style={{width: '100%'}} />
					</div>
				</div>
			</div>

			<div className={'w-full mt-1'}>
				<div className={'w-full flex flex-row justify-between items-center font-bold text-xs opacity-60 normal-case mb-1'}>
					<div>{`Level ${adventurer.level}`}</div>
					<div>{`${Number(adventurer.xp)} / ${xpRequired(adventurer.level)}`}</div>
				</div>
				<div className={'w-full h-4'}>
					<div className={'bg-600 h-2 flex w-full relative overflow-hidden'}>
						<div
							className={'absolute left-0 inset-y-0 h-2 bg-tag-warning'}
							style={{width: `${Number(adventurer.xp) / xpRequired(adventurer.level) * 100}%`}} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default OverviewAttributes;