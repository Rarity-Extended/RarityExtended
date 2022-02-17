import	React		from	'react';
import	Image		from	'next/image';
import	ItemBox		from	'components/layout/ItemBox';

function	ensureCanCraft(adventurer, inventory, ingredients) {
	for (let index = 0; index < ingredients.length; index++) {
		const {address, amount} = ingredients[index];
		if (address === process.env.RARITY_GOLD_ADDR) {
			if (Number(adventurer?.gold?.balance) < amount) {
				return false;
			}
		} else if (Number(inventory?.[address]?.balance || 0) < amount) {
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
					{recipe.cost.map((item) => (
						<div key={`${item.address}`}>
							<ItemBox item={item} />
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