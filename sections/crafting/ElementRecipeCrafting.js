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


function	ElementRecipe({recipe, currentAdventurer, inventory, onCraft, isApproved, onApprove}) {
	const	canCraft = ensureCanCraft(currentAdventurer, inventory, recipe.cost);
	const	[truncateDescription, set_truncateDescription] = React.useState(true);

	return (
		<div className={'col-span-1'}>
			<div className={'flex flex-col p-4 h-full box'}>
				<p className={'w-4/5 text-sm text-plain'}>{recipe.name}</p>
				<div className={'flex justify-center py-2 w-full'} style={{minHeight: 105}}>
					<Image src={recipe.img} width={105} height={105} />
				</div>

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

				<p className={'mt-6 mb-2 text-sm text-black dark:text-dark-200 opacity-60'}>
					{'Cost'}
				</p>
				<div className={'grid grid-cols-3 gap-4'}>
					{recipe.cost.map(([addr, cost]) => (
						<div key={addr} className={'flex flex-row items-center'}>
							<div className={'flex -m-4 -mr-1 w-14 h-14 flex-center'}>
								<Image src={`/items/${addr}.png`} width={56} height={56} />
							</div>
							<p className={'ml-1 text-base text-plain'}>
								{cost}
							</p>
						</div>
					))}
				</div>
				<div className={'flex flex-row pt-4 mt-auto space-x-2'}>
					<button
						disabled={!canCraft}
						onClick={() => !isApproved ? onApprove() : canCraft ? onCraft() : null}
						className={'flex mt-4 w-full flex-center button-highlight'}>
						<p>{canCraft && !isApproved ? 'Approve' : 'Craft'}</p>
					</button>
				</div>
			</div>
		</div>
	);
}

export default ElementRecipe;