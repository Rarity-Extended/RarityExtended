import	React							from	'react';
import	IconAttributeDamage				from	'components/icons/IconAttributeDamage';
import	IconAttributeDamageType			from	'components/icons/IconAttributeDamageType';
import	IconAttributeCritical			from	'components/icons/IconAttributeCritical';
import	IconAttributeProficiency		from	'components/icons/IconAttributeProficiency';
import	IconAttributeProficiencyArmor	from	'components/icons/IconAttributeProficiencyArmor';
import	IconAttributePenaltyArmor		from	'components/icons/IconAttributePenaltyArmor';
import	IconAttributeSpellFailure		from	'components/icons/IconAttributeSpellFailure';
import	IconAttributeRange				from	'components/icons/IconAttributeRange';
import	IconAttributeDexterity			from	'components/icons/IconAttributeDexterity';
import	IconAttributeArmor				from	'components/icons/IconAttributeArmor';

function	ItemAttributes({category, item}) {
	if (category && category.includes('weapon')) {
		return (
			<div className={'mt-2'}>
				<div className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeDamageType width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Damage Type'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.damageType}</p>
					</div>
				</div>
				<div className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeProficiency width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Proficiency'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.proficiency}</p>
					</div>
				</div>
				<div className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeDamage width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Damage'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.damage}</p>
					</div>
				</div>
				<div className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeCritical width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Critical'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.critical_modifier !== 0 ? `${20 + item.critical_modifier}-20/x${item.critical}` : `x${item.critical}`}</p>
					</div>
				</div>
				<div className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeRange width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Range'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.range_increment}</p>
					</div>
				</div>
			</div>
		);
	}
	if (category && (category.includes('armor') || category.includes('shield'))) {
		console.log(item);
		return (
			<div className={'mt-2'}>
				<div className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeProficiencyArmor width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Proficiency'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.proficiency}</p>
					</div>
				</div>
				<div className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeArmor width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Armor Bonus'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.armor_bonus}</p>
					</div>
				</div>
				<div className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeDexterity width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Max Dexterity Bonus'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.max_dex_bonus}</p>
					</div>
				</div>
				<div className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributePenaltyArmor width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Penalty'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.penalty}</p>
					</div>
				</div>
				<div className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeSpellFailure width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Spell Failure'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{`${item.spell_failure}%`}</p>
					</div>
				</div>
			</div>
		);
	}
	return null;
}

export default ItemAttributes;