import	React					from	'react';
import	Image					from	'next/image';
import	useInventory			from	'contexts/useInventory';

function	ElementInventoryItem({item}) {
	return (
		<div key={item.name} className={'flex flex-row items-center button-fake'}>
			<div className={'w-14 h-14 flex flex-center'} style={{minWidth: 56}}>
				<Image src={item.img} width={56} height={56} />
			</div>
			<div className={'ml-1'}>
				<p className={'text-plain text-sm text-50'}>
					{item.name}
				</p>
				<p className={'text-plain text-sm text-50'}>
					{`(x${Number(item.balance)})`}
				</p>
			</div>
		</div>
	);
}

function	ElementInventoryItemNonFungible({item}) {
	return (
		<div key={item.name} className={'flex flex-row items-center button-fake'}>
			<div className={'w-14 h-14 flex flex-center'} style={{minWidth: 56}}>
				<Image src={item?.img || '/items/rarity_crafting/shields/buckler.png'} width={56} height={56} />
			</div>
			<div className={'ml-1'}>
				<p className={'text-plain text-sm text-50'}>
					{item.name}
				</p>
			</div>
		</div>
	);
}

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
		toRender.push(
			<ElementInventoryItem
				key={'gold'}
				item={{
					name: 'Gold',
					img: `/items/${process.env.RARITY_GOLD_ADDR}.png`,
					address: process.env.RARITY_GOLD_ADDR,
					balance: Number(currentAdventurer?.gold?.balance),
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
				continue;
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

function	OverviewInventory({adventurer, sharedInventory}) {
	return (
		<div className={'flex flex-col items-center w-full mt-auto'} style={{height: 282}}>
			<div className={'grid grid-cols-4 gap-x-4 gap-y-2 w-full overflow-auto'}>
				<InventoryGrid
					currentAdventurer={adventurer}
					sharedInventory={sharedInventory} />
			</div>
		</div>
	);
}
export default OverviewInventory;