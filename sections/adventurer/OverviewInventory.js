import	React											from	'react';
import	Image											from	'next/image';
import	ITEMS											from	'utils/codex/items';

function	ElementInventoryItem({item, amount}) {
	return (
		<div key={item.name} className={'rounded-md bg-light-600 dark:bg-dark-600 px-2 flex flex-row items-center dark:bg-opacity-40'}>
			<div className={'w-14 h-14 flex flex-center'} style={{minWidth: 56}}>
				<Image src={item.img} width={56} height={56} />
			</div>
			<div className={'ml-1'}>
				<p className={'text-plain font-story text-sm text-50 normal-case'}>
					{item.name}
				</p>
				<p className={'text-plain font-story text-sm text-50 normal-case'}>
					{`(x${amount})`}
				</p>
			</div>
		</div>
	);
}

function	ElementInventoryItemNonFungible({item}) {
	return (
		<div key={item.name} className={'rounded-md bg-light-600 dark:bg-dark-600 px-2 flex flex-row items-center dark:bg-opacity-40'}>
			<div className={'w-14 h-14 flex flex-center'} style={{minWidth: 56}}>
				<Image src={item?.img || '/items/rarity_crafting/shields/buckler.png'} width={56} height={56} />
			</div>
			<div className={'ml-1'}>
				<p className={'text-plain font-story text-sm text-50 normal-case'}>
					{item.name}
				</p>
			</div>
		</div>
	);
}

function	ElementInventoryList({currentAdventurer, sharedInventory}) {
	const	[toRender, set_toRender] = React.useState(null);
	let		isPreparing = false;

	const prepareToRender = React.useCallback(async () => {
		const	toRender = [];
		toRender.push(
			<ElementInventoryItem
				key={'xp'}
				item={{name: 'XP', img: `/items/${process.env.RARITY_EXTENDED_XP}.png`, address: process.env.RARITY_EXTENDED_XP}}
				amount={Number(currentAdventurer?.xp)} />
		);
		toRender.push(
			<ElementInventoryItem
				key={'gold'}
				item={{name: 'Gold', img: `/items/${process.env.RARITY_GOLD_ADDR}.png`, address: process.env.RARITY_GOLD_ADDR}}
				amount={Number(currentAdventurer?.gold?.balance)} />
		);
		for (let index = 0; index < ITEMS.length; index++) {
			const item = ITEMS[index];
			if (item.type === 'ERC20') {
				if (Number(currentAdventurer.inventory[item.address]) > 0) {
					toRender.push(
						<ElementInventoryItem
							key={`${item.address}_${index}`}
							item={item}
							amount={Number(currentAdventurer.inventory[item.address])} />
					);
				}
			} else if (item.type === 'ERC721') {
				const itemGroup = item;
				const adventurerItems = currentAdventurer.inventory[itemGroup.address];
				for (let jindex = 0; jindex < adventurerItems.length; jindex++) {
					const item = itemGroup.format(adventurerItems[jindex]);
					toRender.push(
						<ElementInventoryItemNonFungible
							key={`${itemGroup.address}_${item.tokenID}`}
							item={item} />
					);
					
				}
			}
		}

		const	adventureSharedInventory = Object.values(sharedInventory).filter(e => e.crafter === currentAdventurer.tokenID);
		for (let index = 0; index < adventureSharedInventory.length; index++) {
			const item = adventureSharedInventory[index];
			toRender.push(
				<ElementInventoryItemNonFungible
					key={`${item.address}_${index}`}
					item={item} />
			);
		}


		set_toRender(toRender);
	}, [currentAdventurer, sharedInventory]);
	
	React.useEffect(() => {
		if (isPreparing)
			return;
		isPreparing = true;
		prepareToRender().then(() => isPreparing = false);
	}, [prepareToRender]);

	return (toRender);
}

function	OverviewInventory({adventurer, sharedInventory}) {
	return (
		<div className={'flex flex-col items-center font-story w-full mt-auto'} style={{height: 282}}>
			<div className={'grid grid-cols-4 gap-x-4 gap-y-2 w-full overflow-auto'}>
				<ElementInventoryList currentAdventurer={adventurer} sharedInventory={sharedInventory} />
			</div>
		</div>
	);
}
export default OverviewInventory;