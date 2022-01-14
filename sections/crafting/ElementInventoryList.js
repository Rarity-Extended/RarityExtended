import	React					from	'react';
import	{ethers}				from	'ethers';
import	ElementInventoryItem	from	'sections/crafting/ElementInventoryItem';
import	ITEMS					from	'utils/codex/items';

const	PER_PAGE = 4;

function	IconChevron({className}) {
	return (
		<svg className={`w-6 h-6 text-plain ${className}`} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M16 5v2h-2V5h2zm-4 4V7h2v2h-2zm-2 2V9h2v2h-2zm0 2H8v-2h2v2zm2 2v-2h-2v2h2zm0 0h2v2h-2v-2zm4 4v-2h-2v2h2z'} fill={'currentColor'}/> </svg>
	);
}

const ElementInventoryList = React.memo(function ElementInventoryList({currentAdventurer, craftingContractAddress, craftingContractID, ingredients, withXP, onApprove}) {
	const	allIngredients = [process.env.RARITY_GOLD_ADDR, ...ingredients];
	const	allItems = [...ITEMS].filter(i => allIngredients.includes(i.address));
	const	[toRender, set_toRender] = React.useState(prepareToRender());
	const	[page, set_page] = React.useState(0);

	function	prepareToRender() {
		const	toRenderKO = [];
		const	toRenderOK = [];
		if (withXP) {
			toRenderOK.push(
				<ElementInventoryItem
					key={'xp'}
					craftingContractID={craftingContractID}
					craftingContractAddress={craftingContractAddress}
					onApprove={() => onApprove(process.env.RARITY_EXTENDED_XP)}
					item={{name: 'XP', img: `/items/${process.env.RARITY_EXTENDED_XP}.png`, address: process.env.RARITY_EXTENDED_XP}}
					amount={Number(currentAdventurer?.xp)} />
			);
		}
		toRenderOK.push(
			<ElementInventoryItem
				key={'gold'}
				craftingContractID={craftingContractID}
				craftingContractAddress={craftingContractAddress}
				onApprove={() => onApprove(process.env.RARITY_GOLD_ADDR, 'Gold')}
				item={{name: 'Gold', img: `/items/${process.env.RARITY_GOLD_ADDR}.png`, address: process.env.RARITY_GOLD_ADDR}}
				amount={Number(currentAdventurer?.gold?.balance)} />
		);
		for (let index = 0; index < allItems.length; index++) {
			const item = allItems[index];
			if (ethers.BigNumber.isBigNumber(currentAdventurer?.inventory?.[item.address])) {
				if ((Number(currentAdventurer?.inventory?.[item.address]) > 0 || item.shouldAlwaysDisplay) && !item.shouldNeverDisplay) {
					toRenderOK.push(
						<ElementInventoryItem
							key={`${item.address}_${index}`}
							craftingContractID={craftingContractID}
							craftingContractAddress={craftingContractAddress}
							onApprove={() => onApprove(item.address, item.name)}
							item={item}
							amount={Number(currentAdventurer.inventory[item.address])} />
					);
				} else {
					toRenderKO.push(
						<ElementInventoryItem
							key={`${item.address}_${index}`}
							craftingContractID={craftingContractID}
							craftingContractAddress={craftingContractAddress}
							onApprove={() => onApprove(item.address, item.name)}
							item={item}
							amount={0} />
					);
				}
			}
		}
		return [...toRenderOK, ...toRenderKO];
	}
	React.useEffect(() => set_toRender(prepareToRender), [currentAdventurer]);

	return (
		<>
			{toRender.filter((_, index) => index >= page * PER_PAGE && index < (page + 1) * PER_PAGE)}
			<div className={'flex flex-row justify-between items-center'}>
				<div onClick={() => set_page(page > 0 ? page - 1 : 0)}>
					<IconChevron className={`${page > 0 ? 'opacity-20 hover:opacity-100 cursor-pointer' : 'opacity-0'}`} />
				</div>
				<p className={'text-plain font-story text-sm select-none'}>
					{''}
				</p>
				<div
					onClick={() => set_page(page < Math.ceil(toRender.length / PER_PAGE) - 1 ? page + 1 : page)}>
					<IconChevron
						className={`${page < Math.ceil(toRender.length / PER_PAGE) - 1 ? 'opacity-20 hover:opacity-100 cursor-pointer' : 'opacity-0'} transform rotate-180`} />
				</div>
			</div>
		</>
	);
});

export default ElementInventoryList;