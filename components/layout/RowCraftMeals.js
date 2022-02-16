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


const RowCraftMeals = React.memo(function RowCraftMeals({recipe, currentAdventurer, inventory, onCraft, isApproved, onApprove}) {
	const	canCraft = ensureCanCraft(currentAdventurer, inventory, recipe.cost);

	return (
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
						{'Type: meal'}
					</p>
				</div>
			</div>

			<div className={'flex col-span-7 pl-0 md:col-span-3 md:pl-8'}>
				<div className={'grid flex-row grid-cols-5 gap-2 space-x-0 md:flex md:space-x-2'}>
					{recipe.cost.map(([addr, cost]) => (
						<div key={addr} className={''}>
							<div className={'relative p-2 w-14 h-14 bg-500 image-wrapper'}>
								<Image src={`/items/${addr}.png`} width={48} height={48} />
								<div className={'absolute right-1 bottom-1 text-sm'}>
									{`x${cost}`}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className={'flex col-span-7 justify-center items-start md:col-span-2 md:justify-end'}>
				<div className={'flex flex-row w-full md:w-1/2'}>
					<button
						disabled={!canCraft}
						onClick={() => !isApproved ? onApprove() : canCraft ? onCraft() : null}
						className={'flex w-full flex-center button-highlight'}>
						<p>{canCraft && !isApproved ? 'Approve' : 'Craft'}</p>
					</button>
				</div>
			</div>
		</div>
	);
});

export default RowCraftMeals;