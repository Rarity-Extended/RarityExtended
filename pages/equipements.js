import	React, {useState}					from	'react';
import	{useRouter}							from	'next/router';
import	Image								from	'next/image';
import	useWeb3								from	'contexts/useWeb3';
import	useRarity							from	'contexts/useRarity';
import	useInventory						from	'contexts/useInventory';
import	Template							from	'components/templates/Head';
import	IconChevron							from	'components/icons/IconChevron';
import	ItemAttributes						from	'components/itemAttributes';
import	Section								from	'components/layout/Section';
import	RowBasicSets						from	'components/layout/RowBasicSets';
import	{equip, rEquip, approveForAll}		from	'utils/actions/rarity_extended_equipements';
import	{BASIC_SETS}						from	'utils/codex/extentions/rarity_extended_basic_sets';

function	Details() {
	const	[isExpanded, set_isExpanded] = React.useState(false);
	const	[isExpandedAnimation, set_isExpandedAnimation] = React.useState(false);

	function	onExpand() {
		if (isExpanded) {
			set_isExpandedAnimation(false);
			setTimeout(() => set_isExpanded(false), 500);
		} else {
			set_isExpanded(true);
			setTimeout(() => set_isExpandedAnimation(true), 200);
		}
	}

	return (
		<div className={'m-4 mt-0 rounded-sm bg-500'}>
			<summary className={'group flex flex-row items-center p-4 text-sm cursor-pointer'} onClick={onExpand}>
				<IconChevron className={`${isExpanded ? 'rotate-90' : 'rotate-0'} transform transition-all mr-4`} />
				{'Check other classes sets'}
			</summary>
			<div className={`w-full transition-max-height duration-500 ${isExpandedAnimation ? 'max-h-full' : 'max-h-0 overflow-hidden'}`}>
				<div className={'grid grid-cols-1 pt-0 divide-y divide-light-primary-lighter dark:divide-dark-600'}>
					{isExpanded ? (
						BASIC_SETS.map((set, index) => (
							<RowBasicSets key={`${set.name}_${index}`} darker set={set} />
						))
					) : <div />}
				</div>
			</div>
		</div>
	);
}

function	ItemList({tab}) {
	const	{provider} = useWeb3();
	const	{currentAdventurer} = useRarity();
	const	{inventory, sharedInventory, updateInventory, nonce} = useInventory();
	const	[itemList, set_itemList] = useState([]);

	const prepareItemlist = React.useCallback(async () => {
		const	adventurerInventory = inventory?.[currentAdventurer.tokenID] || {};
		const	toRender = [];

		const	_inventory = Object.values(adventurerInventory || {});
		for (let index = 0; index < (_inventory || []).length; index++) {
			const item = _inventory[index];
			if (item.type === 'unique') {
				if ((tab === 0 && item.category && item.category !== 'good')) toRender.push(item);
				else if (tab === 1 && item?.category === 'head-armor') toRender.push(item);
				else if (tab === 2 && item?.category === 'body-armor') toRender.push(item);
				else if (tab === 3 && item?.category === 'hand-armor') toRender.push(item);
				else if (tab === 4 && item?.category === 'foot-armor') toRender.push(item);
				else if (tab === 5 && item?.category === 'weapon') toRender.push(item);
				else if (tab === 6 && item?.category === 'shield') toRender.push(item);
				else if (
					(tab === 6 && item?.category === 'weapon' &&
					(item.encumbrance !== 'Ranged Weapons' && item.encumbrance !== 'Two-Handed Melee Weapons')))
					toRender.push(item);
			}
		}

		const	_sharedInventory = Object.values(sharedInventory || {});
		for (let index = 0; index < (_sharedInventory || []).length; index++) {
			const item = _sharedInventory[index];
			if ((tab === 0 && item.category && item.category !== 'good')) toRender.push(item);
			else if (tab === 1 && item?.category === 'head-armor') toRender.push(item);
			else if (tab === 2 && item?.category === 'body-armor') toRender.push(item);
			else if (tab === 3 && item?.category === 'hand-armor') toRender.push(item);
			else if (tab === 4 && item?.category === 'foot-armor') toRender.push(item);
			else if (tab === 5 && item?.category === 'weapon') toRender.push(item);
			else if (tab === 6 && item?.category === 'shield') toRender.push(item);
			else if (
				(tab === 6 && item?.category === 'weapon' &&
				(item.encumbrance !== 'Ranged Weapons' && item.encumbrance !== 'Two-Handed Melee Weapons')))
				toRender.push(item);
		}
		set_itemList(toRender);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentAdventurer, inventory, sharedInventory, nonce, tab]);
	React.useEffect(() => prepareItemlist(), [prepareItemlist]);

	function	getSlotForItem(item) {
		if (item.category === 'shield') {
			return 101;
		}
		if (item.category === 'weapon') {
			if (item.encumbrance !== 'Ranged Weapons' && item.encumbrance !== 'Two-Handed Melee Weapons') {
				return 5;
			}
			return 6;
		}
		if (item.category === 'head-armor') return 1;
		if (item.category === 'body-armor') return 2;
		if (item.category === 'hand-armor') return 3;
		if (item.category === 'foot-armor') return 4;

	}
	function	_onAddressEquip(item) {
		equip({
			provider,
			tokenID: currentAdventurer.tokenID,
			minter: item.minter,
			itemID: item.tokenID,
			itemName: item.name,
			slot: getSlotForItem(item)
		}, ({error}) => {
			if (error) {
				return;
			}
			updateInventory(currentAdventurer.tokenID);
		});
	}

	function	_onRarityEquip(item) {
		rEquip({
			provider,
			tokenID: currentAdventurer.tokenID,
			minter: item.minter,
			itemID: item.tokenID,
			itemName: item.name,
			slot: getSlotForItem(item)
		}, ({error}) => {
			if (error) {
				return;
			}
			updateInventory(currentAdventurer.tokenID);
		});
	}
	function	onEquipItem(item) {
		if (item.ownerType === 'uint') {
			_onRarityEquip(item);
		} else {
			_onAddressEquip(item);
		}
	}


	return (
		<div className={'grid grid-cols-1 gap-4 px-4 pb-4 md:grid-cols-4'} style={{minHeight: '20rem'}}>
			{itemList.length === 0 ?
				<div className={'flex col-span-4 mx-auto w-full opacity-20 flex-center'}>
					<p>{'No equipement available'}</p>
				</div>
				: null}
			{itemList.map((item, index) => (
				<div key={index} className={'flex flex-col col-span-1 p-4 h-full rounded-sm bg-500'}>
					<p className={'w-4/5 text-sm text-plain'}>{item.name}</p>
					<div className={'flex h-full flex-center'}>
						<Image src={item.img} width={105} height={105} />
					</div>
					<ItemAttributes
						category={item.category}
						item={item} />
					<button
						onClick={() => onEquipItem(item)}
						className={'flex mt-4 w-full flex-center button-highlight'}>
						<p className={'select-none'}>{'Equip'}</p>
					</button>
				</div>
			))}
		</div>
	);
}

function	Index({tab, set_tab}) {
	const	router = useRouter();

	React.useLayoutEffect(() => {
		if (router?.query?.slot) {
			set_tab(Number(router?.query?.slot));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);

	return (
		<div>
			<ItemList tab={tab} />
		</div>
	);
}

function	Wrapper() {
	const	{provider} = useWeb3();
	const	{currentAdventurer, specialApprovals, set_specialApprovals} = useRarity();
	const	[txApproveStatus, set_txApproveStatus] = useState({none: true, isPending: false, isSuccess: false, isError: false});

	function	onApproveAll() {
		if (!txApproveStatus.none) {
			return;
		}
		set_txApproveStatus({none: false, isPending: true, isSuccess: false, isError: false});
		
		approveForAll(
			{provider},
			() => {
				set_txApproveStatus({none: false, isPending: false, isSuccess: false, isError: true});
				setTimeout(() => set_txApproveStatus({none: true, isPending: false, isSuccess: false, isError: false}), 5000);
			},
			() => {
				set_specialApprovals(s => ({...s, [process.env.RARITY_EQUIPEMENT_WRAPPER_ADDR]: true}));
			}
		);
	}

	return (
		<>
			<Section
				title={'Equipements'}
				tabs={['All', 'Head Armors', 'Body Armors', 'Hand Armors', 'Foot Armors', 'Primary Weapons', 'Secondary Weapons', 'Jewelleries']}
				button={{
					onClick: onApproveAll,
					disabled: specialApprovals[process.env.RARITY_EQUIPEMENT_WRAPPER_ADDR] === true,
					label: specialApprovals[process.env.RARITY_EQUIPEMENT_WRAPPER_ADDR] ? 'Approved!' : 'Approve equipements'
				}}>
				<Index />
			</Section>
			<div className={'pb-4 mt-8 box'}>
				<div className={'p-4'}>
					<p className={'mb-2 text-lg font-bold text-plain'}>{'Basic set'}</p>
					<p className={'w-full text-sm italic font-normal md:w-3/4 text-plain-60'}>
						{'Hello adventurer! Are you ready to start your great journey? As an old man told us years ago, it\'s dangerous to go alone. I have here some of my old equipement. Do you want to buy some?'}
					</p>
				</div>
				<RowBasicSets set={BASIC_SETS[currentAdventurer.class - 1]} />
				<Details />
			</div>
		</>
	);
}
Wrapper.getLayout = function getLayout(page) {
	return (
		<Template>
			{page}
		</Template>
	);
};

export default Wrapper;
