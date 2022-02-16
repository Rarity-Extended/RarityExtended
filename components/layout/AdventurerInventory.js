import	React							from	'react';
import	useInventory					from	'contexts/useInventory';
import	ItemInventory					from	'components/layout/ItemInventory';

const InventoryGrid = React.memo(function InventoryGrid({currentAdventurer}) {
	const	{inventory, sharedInventory, nonce} = useInventory();
	const	[toRender, set_toRender] = React.useState(null);

	const prepareToRender = React.useCallback(async (_currentAdventurer) => {
		const	adventurerInventory = inventory?.[_currentAdventurer.tokenID] || {};
		const	toRender = [];
		toRender.push(
			<ItemInventory
				key={'xp'}
				item={{
					name: 'XP',
					img: `/items/${process.env.RARITY_EXTENDED_XP_ADDR}.png`,
					address: process.env.RARITY_EXTENDED_XP_ADDR,
					balance: Number(_currentAdventurer?.xp)
				}} />
		);

		const	_inventory = Object.values(adventurerInventory || {});
		for (let index = 0; index < (_inventory || []).length; index++) {
			const item = _inventory[index];
			if (item.type === 'enumerable') {
				if (Number(item.balance) > 0) {
					toRender.push(
						<ItemInventory
							key={`${item.address}_${index}`}
							item={item} />
					);
				}
			} else if (item.type === 'unique') {
				toRender.push(
					<ItemInventory
						key={`${item.address}_${index}`}
						item={item} />
				);
			}
		}

		const	_sharedInventory = Object.values(sharedInventory || {});
		for (let index = 0; index < (_sharedInventory || []).length; index++) {
			const item = _sharedInventory[index];
			if (item.crafter !== _currentAdventurer?.tokenID) {
				// continue;
			}
			toRender.push(
				<ItemInventory
					key={`${item.address}_${index}`}
					item={item} />
			);
		}
		set_toRender(toRender);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inventory, sharedInventory, nonce]);
	React.useEffect(() => prepareToRender(currentAdventurer), [prepareToRender, currentAdventurer]);

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