import	React									from	'react';
import	Image									from	'next/image';
import	{craftSkillCheck, requiredMaterials}	from	'utils/libs/rarityCrafting';

function	IconChevron({className}) {
	return (
		<svg className={`w-6 h-6 text-plain ${className}`} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M16 5v2h-2V5h2zm-4 4V7h2v2h-2zm-2 2V9h2v2h-2zm0 2H8v-2h2v2zm2 2v-2h-2v2h2zm0 0h2v2h-2v-2zm4 4v-2h-2v2h2z'} fill={'currentColor'}/> </svg>
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
					<p className={'text-plain font-story text-sm w-4/5'}>{recipe.name}</p>
					<div className={'flex flex-center h-full'}>
						<Image src={recipe.img} width={96} height={96} />
					</div>
				</div>

				<div className={'flex flex-col px-4'}>
					<p className={'font-story text-black dark:text-dark-200 text-opacity-60 text-sm mb-2'}>
						{'Effects'}
					</p>
					<div className={'font-story text-plain opacity-60 text-sm normal-case'}>
						{recipe.effect}
					</div>

					<p className={'font-story text-black dark:text-dark-200 text-opacity-60 text-sm mt-6 mb-2'}>
						{'Cost'}
					</p>
					<div className={'grid grid-cols-2 gap-x-4 gap-y-4'}>
						{recipe.cost.map(([addr, cost]) => (
							<div key={addr} className={'flex flex-row items-center'}>
								<div className={'w-14 h-14 -m-4 -mr-1 flex flex-center'}>
									<Image src={`/items/${addr}.png`} width={56} height={56} />
								</div>
								<p className={'text-plain font-story text-base ml-1'}>
									{cost === -1 ? materialsToUse : cost}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className={'mt-auto flex flex-row space-x-2'}>
				<div
					onClick={() => canCraft ? onCraft(materialsToUse) : null}
					className={`bg-600 flex flex-center text-center px-4 py-2 mt-4 w-2/3 ${canCraft ? 'cursor-pointer hover-bg-900' : 'cursor-not-allowed opacity-60'}`}>
					<p className={'text-plain font-story text-sm'}>{'Craft'}</p>
				</div>
				<div className={`bg-600 flex justify-between text-center items-center px-1 py-2 w-1/3 mt-4 ${canCraft ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}>
					<div onClick={() => set_materialsToUse(materialsToUse >= 10 ? materialsToUse - 10 : 0)}>
						<IconChevron className={`${materialsToUse === 0 ? 'opacity-0' : canCraft ? 'opacity-10 hover:opacity-100 cursor-pointer' : 'opacity-10'}`} />
					</div>
					<p className={'text-plain font-story text-sm select-none'}>
						{`${difficulty}%`}
					</p>
					<div onClick={() => set_materialsToUse(materialsToUse + 10 <= ratSkinAvailable ? materialsToUse + 10 : ratSkinAvailable)}>
						<IconChevron className={`${materialsToUse + 10 > ratSkinAvailable ? 'opacity-0' : canCraft ? 'opacity-10 hover:opacity-100 cursor-pointer' : 'opacity-10'} transform rotate-180`} />
					</div>
				</div>
			</div>
		</div>
	);
});

export default ElementRecipe;