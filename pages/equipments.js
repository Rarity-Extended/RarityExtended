import	React, {useState}					from	'react';
import	{useRouter}							from	'next/router';
import	Image								from	'next/image';
import	{Listbox, Transition}				from	'@headlessui/react';
import	useWeb3								from	'contexts/useWeb3';
import	useRarity							from	'contexts/useRarity';
import	useInventory						from	'contexts/useInventory';
import	Template							from	'components/templates/Head';
import	IconChevron							from	'components/icons/IconChevron';
import	ItemAttributes						from	'components/ItemAttributes';
import	Section								from	'components/layout/Section';
import	RowBasicSets						from	'components/layout/RowBasicSets';
import	{equip, rEquip, approveForAll}		from	'utils/actions/rarity_extended_equipments';
import	{BASIC_SETS}						from	'utils/codex/extentions/rarity_extended_basic_sets';
import useClientEffect from 'hooks/useClientEffect';

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

function	EquipButton({item, onEquipItem}) {
	const	{currentAdventurer} = useRarity();
	const	{equipment} = useInventory();
	const	slotForItem = getSlotForItem(item);

	const	[options, set_options] = useState([
		{title: 'Equip as primary', disabled: false, onClick: () => onEquipItem(item, 5)},
		{title: 'Equip as secondary', disabled: false, onClick: () => onEquipItem(item, 6)}
	]);
	
	useClientEffect(() => {
		if (item.category === 'weapon') {
			if (item.encumbrance === 'Ranged Weapons' || item.encumbrance === 'Two-Handed Melee Weapons') {
				if (equipment?.[currentAdventurer?.tokenID]?.[5] === undefined) {
					if (equipment?.[currentAdventurer?.tokenID]?.[6] !== undefined || equipment?.[currentAdventurer?.tokenID]?.[101] !== undefined) {
						set_options([{title: 'Equip as primary', disabled: true, onClick: () => null}]);
					} else {
						set_options([{title: 'Equip as primary', disabled: false, onClick: () => onEquipItem(item, 5)}]);
					}
				} else {
					if (equipment?.[currentAdventurer?.tokenID]?.[6] !== undefined || equipment?.[currentAdventurer?.tokenID]?.[101] !== undefined) {
						set_options([{title: 'Equip as primary', disabled: true, onClick: () => null}]);
					} else if (equipment?.[currentAdventurer?.tokenID]?.[5] !== undefined) {
						set_options([{title: 'Equip as primary', disabled: true, onClick: () => null}]);
					} else {
						set_options([{title: 'Equip as primary', disabled: false, onClick: () => onEquipItem(item, 5)}]);
					}
				}
			} else {
				if (equipment?.[currentAdventurer?.tokenID]?.[5] !== undefined) {
					if (equipment?.[currentAdventurer?.tokenID]?.[5].encumbrance === 'Two-Handed Melee Weapons' ||
						equipment?.[currentAdventurer?.tokenID]?.[5].encumbrance === 'Ranged Weapons') {
						set_options([{title: 'Equip as secondary', disabled: true, onClick: () => null}]);
					} else if (equipment?.[currentAdventurer?.tokenID]?.[6] !== undefined || equipment?.[currentAdventurer?.tokenID]?.[101] !== undefined) {
						set_options([{title: 'Equip as primary', disabled: true, onClick: () => null}]);
					} else {
						set_options([{title: 'Equip as secondary', disabled: false, onClick: () => onEquipItem(item, 6)}]);
					}
				} else {
					if (equipment?.[currentAdventurer?.tokenID]?.[6] !== undefined) {
						set_options([
							{title: 'Equip as primary', disabled: false, onClick: () => onEquipItem(item, 5)},
						]);
					} else {
						set_options([
							{title: 'Equip as primary', disabled: false, onClick: () => onEquipItem(item, 5)},
							{title: 'Equip as secondary', disabled: false, onClick: () => onEquipItem(item, 6)}
						]);
					}
				}
			}
		} else if (item.category === 'shield') {
			if (equipment?.[currentAdventurer?.tokenID]?.[5] !== undefined) {
				if (equipment?.[currentAdventurer?.tokenID]?.[5].encumbrance === 'Two-Handed Melee Weapons' ||
					equipment?.[currentAdventurer?.tokenID]?.[5].encumbrance === 'Ranged Weapons') {
					set_options([{title: 'Equip as secondary', disabled: true, onClick: () => null}]);
				} else if (equipment?.[currentAdventurer?.tokenID]?.[6] !== undefined) {
					set_options([{title: 'Equip as secondary', disabled: true, onClick: () => null}]);
				} else {
					set_options([{title: 'Equip as secondary', disabled: false, onClick: () => onEquipItem(item, 101)}]);
				}
			} else {
				if (equipment?.[currentAdventurer?.tokenID]?.[6] !== undefined || equipment?.[currentAdventurer?.tokenID]?.[101] !== undefined) {
					set_options([{title: 'Equip as secondary', disabled: true, onClick: () => null}]);
				} else {
					set_options([{title: 'Equip as secondary', disabled: false, onClick: () => onEquipItem(item, 101)}]);
				}
			}
		}
	}, [equipment]);

	function	getSlotForItem(item) {
		if (item.category === 'shield') {
			return 101;
		}
		if (item.category === 'weapon') {
			if (item.encumbrance === 'Ranged Weapons' || item.encumbrance === 'Two-Handed Melee Weapons') {
				return 5;
			}
			return 6;
		}
		if (item.category === 'head-armor') return 1;
		if (item.category === 'body-armor') return 2;
		if (item.category === 'hand-armor') return 3;
		if (item.category === 'foot-armor') return 4;
	}

	if ((item?.category || '').includes('weapon') && options.length > 1) {
		return (
			<Listbox onChange={(e) => e.onClick()}>
				{({open}) => (
					<>
						<Listbox.Label className={'sr-only'}>{'Care options'}</Listbox.Label>
						<div className={'relative w-full'}>
							<div className={'inline-flex w-full'}>
								<div className={'inline-flex relative z-0 mt-4 w-full'}>
									<button
										disabled={options[0].disabled}
										className={'inline-flex relative items-center w-full button-highlight-with-arrow flex-center'} onClick={() => options[0].onClick()}>
										<p className={'font-bold'}>{options[0].title}</p>
									</button>
									<Listbox.Button
										className={`inline-flex relative items-center ${options[0].disabled ? 'button-outline-arrow-disabled' : 'button-outline-arrow'}`}>
										<svg aria-hidden={'true'} focusable={'false'} data-prefix={'fas'} data-icon={'chevron-down'} className={'w-3 h-3'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 448 512'}><path fill={'currentColor'} d={'M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z'}></path></svg>
									</Listbox.Button>
								</div>
							</div>
		
							<Transition
								show={open}
								as={React.Fragment}
								leave={'transition ease-in duration-100'}
								leaveFrom={'opacity-100'}
								leaveTo={'opacity-0'}>
								<Listbox.Options className={'overflow-hidden absolute right-0 z-10 mt-2 w-full shadow-lg origin-top-right box-darker-with-border'}>
									{options.map((option) => (
										<Listbox.Option
											key={option.title}
											className={'relative py-2 px-4 hover:bg-light-primary-lighter dark:hover:bg-dark-primary-lighter select-none'}
											value={option}>
											<div className={'flex flex-col cursor-pointer'}>
												<div className={'flex justify-between'}>
													<p className={'text-sm font-bold normal-case text-plain'}>{option.title}</p>
												</div>
												<p className={'mt-2 text-sm text-plain-60'}>
													{option.description}
												</p>
											</div>
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</>
				)}
			</Listbox>
		);
	}

	if ((item?.category || '').includes('weapon') && options?.[0]?.title === 'Equip as primary') {
		return (
			<button
				disabled={options[0].disabled}
				onClick={() => options[0].onClick()}
				className={'flex mt-4 w-full flex-center button-highlight'}>
				<p className={'select-none'}>{'Equip as primary'}</p>
			</button>
		);	
	}

	if (options?.[0]?.title === 'Equip as secondary') {
		return (
			<button
				disabled={options[0].disabled}
				onClick={() => options[0].onClick()}
				className={'flex mt-4 w-full flex-center button-highlight'}>
				<p className={'select-none'}>{'Equip as secondary'}</p>
			</button>
		);	
	}

	return (
		<button
			disabled={equipment?.[currentAdventurer?.tokenID]?.[slotForItem] !== undefined}
			onClick={() => onEquipItem(item, getSlotForItem(item))}
			className={'flex mt-4 w-full flex-center button-highlight'}>
			<p className={'select-none'}>{'Equip'}</p>
		</button>
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

	function	_onAddressEquip(item, slot) {
		equip({
			provider,
			tokenID: currentAdventurer.tokenID,
			minter: item.minter,
			itemID: item.tokenID,
			itemName: item.name,
			slot: slot
		}, ({error}) => {
			if (error) {
				return;
			}
			updateInventory(currentAdventurer.tokenID);
		});
	}

	function	_onRarityEquip(item, slot) {
		rEquip({
			provider,
			tokenID: currentAdventurer.tokenID,
			minter: item.minter,
			itemID: item.tokenID,
			itemName: item.name,
			slot: slot
		}, ({error}) => {
			if (error) {
				return;
			}
			updateInventory(currentAdventurer.tokenID);
		});
	}
	function	onEquipItem(item, slot) {
		if (item.ownerType === 'uint') {
			_onRarityEquip(item, slot);
		} else {
			_onAddressEquip(item, slot);
		}
	}


	return (
		<div className={'grid grid-cols-1 gap-4 px-4 pb-4 md:grid-cols-4'} style={{minHeight: '20rem'}}>
			{itemList.length === 0 ?
				<div className={'flex col-span-4 mx-auto w-full opacity-20 flex-center'}>
					<p>{'No equipment available'}</p>
				</div>
				: null}
			{itemList.map((item, index) => (
				<div key={index} className={'flex relative flex-col col-span-1 p-4 h-full rounded-sm bg-500'}>
					<p className={'w-4/5 text-sm text-plain'}>{item.name}</p>
					<div className={'flex h-full flex-center'}>
						<Image src={item.img} width={105} height={105} />
					</div>
					<ItemAttributes
						category={item.category}
						item={item} />
					<EquipButton item={item} onEquipItem={(_item, _slot) => onEquipItem(_item, _slot)} />
					{/* <button
						onClick={() => onEquipItem(item)}
						className={'flex mt-4 w-full flex-center button-highlight'}>
						<p className={'select-none'}>{'Equip'}</p>
					</button> */}
					{/* <div className={'flex flex-col space-y-4'}>
						<button
							onClick={() => onEquipItem(item)}
							className={'flex mt-4 w-full flex-center button-highlight'}>
							<p className={'select-none'}>{'Equip as Primary'}</p>
						</button>
						<button
							onClick={() => onEquipItem(item)}
							className={'flex mt-4 w-full flex-center button-highlight'}>
							<p className={'select-none'}>{'Equip as secondary'}</p>
						</button>
					</div> */}
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
				set_specialApprovals(s => ({...s, [process.env.RARITY_EQUIPMENT_WRAPPER_ADDR]: true}));
			}
		);
	}

	return (
		<>
			<Section
				title={'Equipments'}
				tabs={['All', 'Head Armors', 'Body Armors', 'Hand Armors', 'Foot Armors', 'Primary Weapons', 'Secondary Weapons', 'Jewelleries']}
				button={{
					onClick: onApproveAll,
					disabled: specialApprovals[process.env.RARITY_EQUIPMENT_WRAPPER_ADDR] === true,
					label: specialApprovals[process.env.RARITY_EQUIPMENT_WRAPPER_ADDR] ? 'Approved!' : 'Approve equipment'
				}}>
				<Index />
			</Section>
			<div className={'pb-4 mt-8 box'}>
				<div className={'p-4'}>
					<p className={'mb-2 text-lg font-bold text-plain'}>{'Basic set'}</p>
					<p className={'w-full text-sm italic font-normal md:w-3/4 text-plain-60'}>
						{'Hello adventurer! Are you ready to start your great journey? As an old man told us years ago, it\'s dangerous to go alone. I have here some of my old equipment. Do you want to buy some?'}
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
