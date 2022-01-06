import	React		from	'react';
import	Image		from	'next/image';

function	ensureCanCraft(adventurer, ingredients) {
	for (let index = 0; index < ingredients.length; index++) {
		const [addr, cost] = ingredients[index];
		if (addr === process.env.RARITY_GOLD_ADDR) {
			if (Number(adventurer?.gold?.balance) < cost) {
				return false;
			}
		} else if (Number(adventurer?.inventory?.[addr] || 0) < cost) {
			return false;
		}
	}
	return true;
}

function	ElementRecipe({recipe, currentAdventurer, onCraft}) {
	const	canCraft = ensureCanCraft(currentAdventurer, recipe.cost);

	return (
		<div className={'rounded-md bg-gray-lighter dark:bg-dark-400 p-4 flex flex-col'}>
			<div className={'grid grid-cols-2 h-full'}>
				<div className={'flex flex-col border-r border-dark-600 px-4 h-full'}>
					<p className={'text-black dark:text-white font-story text-sm w-4/5'}>{recipe.name}</p>
					<div className={'flex justify-center items-center h-full'}>
						<Image src={recipe.img} width={96} height={96} />
					</div>
				</div>

				<div className={'flex flex-col px-4'}>
					<p className={'font-story text-black dark:text-dark-200 text-opacity-60 text-sm mb-2'}>
						{'Effects'}
					</p>
					<div className={'font-story text-black dark:text-white opacity-60 text-sm normal-case'}>
						{recipe.effect}
					</div>

					<p className={'font-story text-black dark:text-dark-200 text-opacity-60 text-sm mt-6 mb-2'}>
						{'Cost'}
					</p>
					<div className={'grid grid-cols-2 gap-x-4 gap-y-4'}>
						{recipe.cost.map(([addr, cost]) => (
							<div key={addr} className={'flex flex-row items-center'}>
								<div className={'w-14 h-14 -m-4 -mr-1 flex justify-center items-center'}>
									<Image src={`/items/${addr}.png`} width={56} height={56} />
								</div>
								<p className={'text-black dark:text-white font-story text-base ml-1'}>
									{cost}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className={'mt-auto flex flex-row space-x-2'}>
				<div
					onClick={() => canCraft ? onCraft() : null}
					className={`bg-gray-principal dark:bg-dark-600 flex justify-center text-center items-center px-4 py-2 mt-4 w-full ${canCraft ? 'cursor-pointer dark:hover:bg-dark-900 hover:bg-gray-secondary' : 'cursor-not-allowed opacity-60'}`}>
					<p className={'text-black dark:text-white font-story text-sm'}>{'Craft'}</p>
				</div>
			</div>
		</div>
	);
}

export default ElementRecipe;