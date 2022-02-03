import	React							from	'react';
import	useInventory					from	'contexts/useInventory';
import	ElementInventoryItem			from	'sections/adventurer/ElementInventoryItem';
import	ElementInventoryItemNonFungible	from	'sections/adventurer/ElementInventoryItemNonFungible';

const InventoryGrid = React.memo(function InventoryGrid({currentAdventurer}) {
	const	{inventory, sharedInventory, nonce} = useInventory();
	const	[toRender, set_toRender] = React.useState(null);

	const prepareToRender = React.useCallback(async () => {
		const	adventurerInventory = inventory?.[currentAdventurer.tokenID] || {};
		const	toRender = [];
		toRender.push(
			<ElementInventoryItem
				key={'xp'}
				item={{
					name: 'XP',
					img: `/items/${process.env.RARITY_EXTENDED_XP}.png`,
					address: process.env.RARITY_EXTENDED_XP,
					balance: Number(currentAdventurer?.xp)
				}} />
		);

		const	_inventory = Object.values(adventurerInventory || {});
		for (let index = 0; index < (_inventory || []).length; index++) {
			const item = _inventory[index];
			if (item.type === 'enumerable') {
				if (Number(item.balance) > 0) {
					toRender.push(
						<ElementInventoryItem
							key={`${item.address}_${index}`}
							item={item} />
					);
				}
			} else if (item.type === 'unique') {
				toRender.push(
					<ElementInventoryItemNonFungible
						key={`${item.address}_${index}`}
						item={item} />
				);
			}
		}

		const	_sharedInventory = Object.values(sharedInventory || {});
		for (let index = 0; index < (_sharedInventory || []).length; index++) {
			const item = _sharedInventory[index];
			if (item.crafter !== currentAdventurer?.tokenID) {
				// continue;
			}
			toRender.push(
				<ElementInventoryItemNonFungible
					key={`${item.address}_${index}`}
					item={item} />
			);
		}
		set_toRender(toRender);
	}, [currentAdventurer, inventory, sharedInventory, nonce]);
	React.useEffect(() => prepareToRender(), [prepareToRender]);

	return (toRender);
});

function	OverviewInventory({adventurer}) {
	return (
		<div className={'flex flex-col items-center mt-auto w-full'} style={{height: 282}}>
			<div className={'grid overflow-auto grid-cols-4 gap-x-4 gap-y-2 w-full'}>
				<InventoryGrid currentAdventurer={adventurer} />
			</div>
		</div>
	);
}
export default OverviewInventory;