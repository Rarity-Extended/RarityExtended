import	React									from	'react';
import	Image									from	'next/image';
import	{craftSkillCheck, requiredMaterials}	from	'utils/libs/rarityCrafting';
import	IconAttributeDamage						from	'components/icons/IconAttributeDamage';
import	IconAttributeDamageType					from	'components/icons/IconAttributeDamageType';
import	IconAttributeCritical					from	'components/icons/IconAttributeCritical';
import	IconAttributeCriticalModifier			from	'components/icons/IconAttributeCriticalModifier';
import	IconAttributeProficiency				from	'components/icons/IconAttributeProficiency';
import	IconAttributeProficiencyArmor			from	'components/icons/IconAttributeProficiencyArmor';
import	IconAttributePenaltyArmor				from	'components/icons/IconAttributePenaltyArmor';
import	IconAttributeSpellFailure				from	'components/icons/IconAttributeSpellFailure';
import	IconAttributeRange						from	'components/icons/IconAttributeRange';
import	IconAttributeDexterity					from	'components/icons/IconAttributeDexterity';
import	IconAttributeArmor						from	'components/icons/IconAttributeArmor';

function	IconChevron({className}) {
	return (
		<svg aria-hidden={'true'} focusable={'false'} data-prefix={'fas'} data-icon={'chevron-right'} className={`w-3 h-3 ${className}`} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 320 512'}><path fill={'currentColor'} d={'M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z'}></path></svg>
	);
}

function	ensureCanCraft(adventurer, inventory, ingredients) {
	if (Number(adventurer?.skills?.[5] || 0) <= 0) {
		return false;
	}
	for (let index = 0; index < ingredients.length; index++) {
		const [addr, cost] = ingredients[index];
		if (addr === process.env.RARITY_EXTENDED_XP) {
			if (Number(adventurer?.xp) < cost) {
				return false;
			}
		} else if (addr === process.env.RARITY_GOLD_ADDR) {
			if (Number(adventurer?.gold?.balance) < cost) {
				return false;
			}
		} else if (Number(inventory?.[addr]?.balance || 0) < cost) {
			return false;
		}
	}
	return true;
}

function	ItemAttributes({category, item}) {
	if (category === 'weapon') {
		return (
			<dl className={'mt-2'}>
				<dt className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeDamageType width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Damage Type'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.damageType}</p>
					</div>
				</dt>
				<dt className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeProficiency width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Proficiency'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.proficiency}</p>
					</div>
				</dt>
				<dt className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeDamage width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Damage'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.damage}</p>
					</div>
				</dt>
				<dt className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeCritical width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Critical'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.critical}</p>
					</div>
				</dt>
				<dt className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeCriticalModifier width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Critical Modifier'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.critical_modifier}</p>
					</div>
				</dt>
				<dt className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeRange width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Range'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.range_increment}</p>
					</div>
				</dt>
			</dl>
		);
	}
	if (category === 'armor') {
		return (
			<dl className={'mt-2'}>
				<dt className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeProficiencyArmor width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Proficiency'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.proficiency}</p>
					</div>
				</dt>
				<dt className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeArmor width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Armor Bonus'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.armor_bonus}</p>
					</div>
				</dt>
				<dt className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeDexterity width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Dexterity Bonus'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.max_dex_bonus}</p>
					</div>
				</dt>
				<dt className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributePenaltyArmor width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Penalty'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.penalty}</p>
					</div>
				</dt>
				<dt className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeSpellFailure width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Spell Failure'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{`${item.spell_failure}%`}</p>
					</div>
				</dt>
			</dl>
		);
	}
	return null;
}

const ElementRecipe = React.memo(function ElementRecipe({recipe, currentAdventurer, inventory, category, difficultyCheckFunc, onCraft}) {
	const	canCraft = ensureCanCraft(currentAdventurer, inventory, recipe.cost);
	const	ratSkinAvailable = Number((inventory?.[process.env.DUNGEON_THE_CELLAR_ADDR])?.balance || 0);
	const	[truncateDescription, set_truncateDescription] = React.useState(true);
	const	[difficulty, set_difficulty] = React.useState(0);
	const	[materialsToUse, set_materialsToUse] = React.useState(
		requiredMaterials(currentAdventurer?.skills[5], currentAdventurer?.attributes?.intelligence, difficultyCheckFunc(), ratSkinAvailable)
	);

	React.useEffect(() => {
		set_materialsToUse(requiredMaterials(currentAdventurer?.skills[5], currentAdventurer?.attributes?.intelligence, difficultyCheckFunc(), ratSkinAvailable));
	}, [currentAdventurer]);

	React.useEffect(() => {
		set_difficulty(
			craftSkillCheck(
				currentAdventurer?.skills[5],
				currentAdventurer?.attributes?.intelligence,
				(difficultyCheckFunc() - materialsToUse / 10)
			)
		);
	}, [currentAdventurer, materialsToUse]);

	return (
		<div className={'col-span-1'}>
			<div className={'flex flex-col p-4 h-full box'}>
				<p className={'w-4/5 text-sm text-plain'}>{recipe.name}</p>
				<div className={'flex justify-center py-2 w-full'} style={{minHeight: 105}}>
					<Image src={recipe.img} width={105} height={105} />
				</div>

				<ItemAttributes category={category} item={recipe} />

				<div className={'pt-4'}>
					<p className={'mb-2 text-sm text-black dark:text-dark-200 opacity-60'}>
						{'Description'}
					</p>
					<div
						onClick={() => set_truncateDescription(!truncateDescription)}
						className={`text-plain opacity-60 text-sm transition-all mb-2 cursor-help ${truncateDescription ? 'truncate' : ''}`}>
						{recipe.effect}
					</div>
				</div>
				<div className={'pt-4'}>
					<p className={'mt-auto mb-2 text-sm text-black dark:text-dark-200 opacity-60'}>
						{'Cost'}
					</p>
					<div className={'grid grid-cols-3 gap-4'}>
						{recipe.cost.map(([addr, cost]) => (
							<div key={addr} className={'flex flex-row items-center'}>
								<div className={'flex -m-4 -mr-1 w-14 h-14 flex-center'}>
									<Image src={`/items/${addr}.png`} width={56} height={56} />
								</div>
								<p className={'ml-1 text-base text-plain'}>
									{cost === -1 ? materialsToUse : cost}
								</p>
							</div>
						))}
					</div>
				</div>

				<div className={'flex flex-row pt-4 mt-auto space-x-2'}>
					<div className={'flex justify-between items-center mt-4 w-1/2 button-fake'}>
						<div onClick={() => set_materialsToUse(materialsToUse >= 10 ? materialsToUse - 10 : 0)}>
							<IconChevron className={`${materialsToUse === 0 ? 'opacity-0' : 'text-gray-100 cursor-pointer'} transform rotate-180`} />
						</div>
						<p>{`${difficulty}%`}</p>
						<div onClick={() => set_materialsToUse(materialsToUse + 10 <= ratSkinAvailable ? materialsToUse + 10 : ratSkinAvailable)}>
							<IconChevron className={`${materialsToUse + 10 > ratSkinAvailable ? 'opacity-0' : 'text-gray-100 cursor-pointer'}`} />
						</div>
					</div>

					<button
						disabled={!canCraft}
						onClick={() => canCraft ? onCraft(materialsToUse) : null}
						className={'flex mt-4 w-1/2 flex-center button-highlight'}>
						<p className={'select-none'}>{'Craft'}</p>
					</button>
				</div>
			</div>
		</div>
	);
});

export default ElementRecipe;