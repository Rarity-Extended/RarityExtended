import	React		from	'react';
import	Image		from	'next/image';

function	ensureCanCraft(adventurer, inventory, ingredients) {
	for (let index = 0; index < ingredients.length; index++) {
		const [addr, cost] = ingredients[index];
		if (addr === process.env.RARITY_GOLD_ADDR) {
			if (Number(adventurer?.gold?.balance) < cost) {
				return false;
			}
		} else if (Number(inventory?.[addr]?.balance || 0) < cost) {
			return false;
		}
	}
	return true;
}


function	ElementRecipe({recipe, currentAdventurer, inventory, onCraft}) {
	const	canCraft = ensureCanCraft(currentAdventurer, inventory, recipe.cost);

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
									{cost}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className={'mt-auto flex flex-row space-x-2'}>
				<button
					disabled={!canCraft}
					onClick={() => canCraft ? onCraft() : null}
					className={'flex flex-center mt-4 w-full button-highlight'}>
					<p>{'Craft'}</p>
				</button>
			</div>
		</div>
	);
}

export default ElementRecipe;