import	React					from	'react';
import	Image					from	'next/image';
import	useRarity				from	'contexts/useRarity';
import	ITEMS					from	'utils/codex/items/items';

function	ElementInventoryItem({item, amount}) {
	return (
		<div
			key={item.name}
			className={`box flex flex-center flex-col p-4 relative group ${amount === 0 ? 'opacity-40' : ''}`}>
			<Image src={item.img} width={64} height={64} />
			<div className={'mx-6 bg-600 flex flex-center text-center px-4 py-2 mt-2'}>
				<p className={'text-plain font-story text-sm normal-case'}>{`${item.name} (x${amount})`}</p>
			</div>
		</div>
	);
}

function	ElementInventoryItemNonFungible({item}) {
	return (
		<div
			key={item.name}
			className={'box flex flex-center flex-col p-4 relative group'}>
			<Image src={item.img} width={64} height={64} />
			<div className={'mx-6 bg-600 flex flex-center text-center px-4 py-2 mt-2'}>
				<p className={'text-plain font-story text-sm normal-case'}>{`${item.name}`}</p>
			</div>
		</div>
	);
}

function ElementInventoryList({currentAdventurer}) {
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
					console.log(item, itemGroup, adventurerItems[jindex].treasureId);
					toRender.push(
						<ElementInventoryItemNonFungible
							key={`${itemGroup.address}_${item.tokenID}`}
							item={item} />
					);
					
				}
			}
		}
		set_toRender(toRender);
	}, [currentAdventurer]);
	React.useEffect(() => {
		if (isPreparing)
			return;
		isPreparing = true;
		prepareToRender().then(() => isPreparing = false);
	}, [prepareToRender]);

	return (toRender);
}

function	Inventory() {
	const	{currentAdventurer} = useRarity();

	return (
		<div>
			<div className={'grid grid-cols-2 md:grid-cols-5 gap-4 sticky top-4 max-h-screen'}>
				<ElementInventoryList currentAdventurer={currentAdventurer} />
			</div>
		</div>
	);
}
	
export default Inventory;