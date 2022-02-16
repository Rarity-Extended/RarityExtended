import	React									from	'react';
import	Image									from	'next/image';
import	IconChevron								from	'components/icons/IconChevron';
import	Tooltip									from	'components/Tooltip';
import	{craftSkillCheck, requiredMaterials}	from	'utils/libs/rarityCrafting';
import 	{getWeaponDifficulty}					from	'utils/libs/rarityCrafting';
import	performBatchedUpdates					from	'utils/performBatchedUpdates';

function	ensureCanCraft(adventurer, inventory, ingredients) {
	if (Number(adventurer?.skills?.[5] || 0) <= 0) {
		return false;
	}
	for (let index = 0; index < ingredients.length; index++) {
		const [addr, cost] = ingredients[index];
		if (addr === process.env.RARITY_EXTENDED_XP_ADDR) {
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

const RowCraftWeapons = React.memo(function RowCraftWeapons({recipe, currentAdventurer, inventory, onCraft}) {
	const	canCraft = ensureCanCraft(currentAdventurer, inventory, recipe.cost);
	const	[difficulty, set_difficulty] = React.useState(0);
	const	[ratSkinAvailable, set_ratSkinAvailable] = React.useState(0);
	const	[materialsToUse, set_materialsToUse] = React.useState(0);

	React.useLayoutEffect(() => {
		performBatchedUpdates(() => {
			const	_ratSkinAvailable = Number((inventory?.[process.env.DUNGEON_THE_CELLAR_ADDR])?.balance || 0);

			set_ratSkinAvailable(_ratSkinAvailable);
			set_materialsToUse(
				requiredMaterials(
					currentAdventurer?.skills[5],
					currentAdventurer?.attributes?.intelligence,
					getWeaponDifficulty(recipe.proficiency),
					_ratSkinAvailable
				)
			);
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentAdventurer?.tokenID]);

	React.useLayoutEffect(() => {
		set_difficulty(
			craftSkillCheck(
				currentAdventurer?.skills[5],
				currentAdventurer?.attributes?.intelligence,
				(getWeaponDifficulty(recipe.proficiency) - materialsToUse / 10)
			)
		);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [materialsToUse]);

	return (
		<div className={'p-0 md:p-4'}>
			<div className={'grid grid-cols-7 gap-x-0 gap-y-4 p-4 md:gap-x-8 md:gap-y-0'}>
				<div className={'flex flex-row col-span-7 md:col-span-2'}>
					<div className={'flex w-20 min-w-20 h-20 bg-500 flex-center'}>
						<Image src={recipe.img} width={64} height={64} objectFit={'contain'} />
					</div>
					<div className={'flex flex-col ml-4 w-full'}>
						<p className={'-mt-0.5 mb-1 text-base font-bold text-plain'}>
							{recipe.name}
						</p>
						<p className={'text-sm text-plain-60'}>
							{`${recipe.damageType} Damage: ${recipe.damage}`}
						</p>
						<p className={'text-sm text-plain-60'}>
							{`Critical: ${recipe.critical_modifier !== 0 ? `${20 + recipe.critical_modifier}-20/` : ''}x${recipe.critical}`}
						</p>
					</div>
				</div>

				<div className={'flex col-span-7 pl-0 md:col-span-3 md:pl-8'}>
					<div className={'grid flex-row grid-cols-5 gap-2 space-x-0 md:flex md:space-x-2'}>
						{recipe.cost.map(([addr, cost, name, desc]) => (
							<div key={`${addr}`} className={''}>
								<div className={'group relative w-14 h-14 rounded-sm cursor-help bg-500 image-wrapper tooltip'}>
									<Image src={`/items/${addr}.png`} width={56} height={56} />
									<div className={'absolute right-1 bottom-1 text-sm'}>
										{`x${cost === -1 ? materialsToUse : cost}`}
									</div>
									<Tooltip className={'pt-2 w-80 text-sm'}> 
										<div className={'flex flex-col justify-center items-center'}>
											<Image src={`/items/${addr}.png`} width={80} height={80} />
											<div>
												<b className={'mb-1'}>{name}</b>
												<p className={'mb-1'}>{desc}</p>
												<p className={'italic opacity-60'}>{`${cost === -1 ? 'Rat skins are optional for this craft but increase the chances of success.' : `${cost} ${name} are required to craft this meal.`}`}</p>
											</div>
										</div>
									</Tooltip>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className={'flex col-span-7 justify-center items-start md:col-span-2 md:justify-end'}>
					<div className={'flex flex-row space-x-4 w-full'}>
						<div className={'flex justify-between items-center w-1/2 button-fake'}>
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
							className={'flex w-1/2 flex-center button-highlight'}>
							<p className={'select-none'}>{'Craft'}</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
});

export default RowCraftWeapons;