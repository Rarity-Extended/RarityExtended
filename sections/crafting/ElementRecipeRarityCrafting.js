import	React									from	'react';
import	Image									from	'next/image';
import	{craftSkillCheck, requiredMaterials}	from	'utils/libs/rarityCrafting';

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

const ElementRecipe = React.memo(function ElementRecipe({recipe, currentAdventurer, inventory, difficultyCheckFunc, onCraft}) {
	const	canCraft = ensureCanCraft(currentAdventurer, inventory, recipe.cost);
	const	ratSkinAvailable = Number((inventory?.[process.env.DUNGEON_THE_CELLAR_ADDR])?.balance || 0);
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
		<div className={'box p-4 flex flex-col'}>
			<div className={'grid grid-cols-2 h-full'}>
				<div className={'flex flex-col border-r border-dark-600 px-4 h-full'}>
					<p className={'text-plain text-sm w-4/5'}>{recipe.name}</p>
					<div className={'flex flex-center h-full'}>
						<Image src={recipe.img} width={96} height={96} />
					</div>
				</div>

				<div className={'flex flex-col px-4'}>
					<p className={' text-black dark:text-dark-200 text-opacity-60 text-sm mb-2'}>
						{'Effects'}
					</p>
					<div className={' text-plain opacity-60 text-sm'}>
						{recipe.effect}
					</div>

					<p className={' text-black dark:text-dark-200 text-opacity-60 text-sm mt-6 mb-2'}>
						{'Cost'}
					</p>
					<div className={'grid grid-cols-2 gap-x-4 gap-y-4'}>
						{recipe.cost.map(([addr, cost]) => (
							<div key={addr} className={'flex flex-row items-center'}>
								<div className={'w-14 h-14 -m-4 -mr-1 flex flex-center'}>
									<Image src={`/items/${addr}.png`} width={56} height={56} />
								</div>
								<p className={'text-plain text-base ml-1'}>
									{cost === -1 ? materialsToUse : cost}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className={'mt-auto flex flex-row space-x-2'}>
				<div className={'flex justify-between items-center w-2/3 mt-4 button-fake'}>
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
					className={'flex flex-center mt-4 w-1/3 button-highlight'}>
					<p className={'select-none'}>{'Craft'}</p>
				</button>
			</div>
		</div>
	);
});

export default ElementRecipe;