import	React, {useState}						from	'react';
import	{useRouter}								from	'next/router';
import	Image									from	'next/image';
import	useWeb3									from	'contexts/useWeb3';
import	useRarity								from	'contexts/useRarity';
import	useInventory							from	'contexts/useInventory';
import	Template								from	'components/templates/Adventurer';
import	IconAttributeDamage						from	'components/icons/IconAttributeDamage';
import	IconAttributeDamageType					from	'components/icons/IconAttributeDamageType';
import	IconAttributeCritical					from	'components/icons/IconAttributeCritical';
import	IconAttributeCriticalModifier			from	'components/icons/IconAttributeCriticalModifier';
import	IconAttributeProficiency				from	'components/icons/IconAttributeProficiency';
import	IconAttributeProficiencyArmor			from	'components/icons/IconAttributeProficiencyArmor';
import	IconAttributePenaltyArmor				from	'components/icons/IconAttributePenaltyArmor';
import	IconAttributeSpellFailure				from	'components/icons/IconAttributeSpellFailure';
import	IconAttributeRange						from	'components/icons/IconAttributeRange';
import	IconAttributeDexterity					from	'components/icons/IconAttributeDexterity';
import	IconAttributeArmor						from	'components/icons/IconAttributeArmor';
import	{equip}									from	'utils/actions/rarity_extended_equipements';

function	ItemAttributes({category, item}) {
	if (category && category.includes('weapon')) {
		return (
			<div className={'mt-2'}>
				<div className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeDamageType width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Damage Type'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.damageType}</p>
					</div>
				</div>
				<div className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeProficiency width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Proficiency'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.proficiency}</p>
					</div>
				</div>
				<div className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeDamage width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Damage'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.damage}</p>
					</div>
				</div>
				<div className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeCritical width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Critical'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.critical}</p>
					</div>
				</div>
				<div className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeCriticalModifier width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Critical Modifier'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.critical_modifier}</p>
					</div>
				</div>
				<div className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeRange width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Range'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.range_increment}</p>
					</div>
				</div>
			</div>
		);
	}
	if (category && (category.includes('armor') || category.includes('shield'))) {
		return (
			<div className={'mt-2'}>
				<div className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeProficiencyArmor width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Proficiency'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.proficiency}</p>
					</div>
				</div>
				<div className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeArmor width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Armor Bonus'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.armor_bonus}</p>
					</div>
				</div>
				<div className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeDexterity width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Dexterity Bonus'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.max_dex_bonus}</p>
					</div>
				</div>
				<div className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributePenaltyArmor width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Penalty'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{item.penalty}</p>
					</div>
				</div>
				<div className={'flex flex-row justify-between items-center my-1'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeSpellFailure width={16} height={16} />
						<p className={'ml-2 text-xs'}>{'Spell Failure'}</p>
					</div>
					<div className={'flex flex-row items-center'}>
						<p className={'text-sm'}>{`${item.spell_failure}%`}</p>
					</div>
				</div>
			</div>
		);
	}
	return null;
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
				if ((item.category === tab || (tab === 'all' && item.category && item.category !== 'good'))) {
					toRender.push(item);
				} else if (tab === 'weapon-secondary' && item.category === 'weapon' && (item.encumbrance !== 'Ranged Weapons' && item.encumbrance !== 'Two-Handed Melee Weapons')) {
					toRender.push(item);
				} else if (tab === 'weapon-secondary' && item.category === 'shield') {
					toRender.push(item);
				}
			}
		}

		const	_sharedInventory = Object.values(sharedInventory || {});
		for (let index = 0; index < (_sharedInventory || []).length; index++) {
			const item = _sharedInventory[index];
			if ((item.category === tab || (tab === 'all' && item.category && item.category !== 'good'))) {
				toRender.push(item);
			} else if (tab === 'weapon-secondary' && item.category === 'weapon' && (item.encumbrance !== 'Ranged Weapons' && item.encumbrance !== 'Two-Handed Melee Weapons')) {
				toRender.push(item);
			} else if (tab === 'weapon-secondary' && item.category === 'shield') {
				toRender.push(item);
			}
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
		if (item.category.includes('armor')) {
			return 2;
		}

	}
	function	onEquip(item) {
		equip({
			provider,
			tokenID: currentAdventurer.tokenID,
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


	return (
		<div className={'grid grid-cols-1 gap-4 md:grid-cols-4'}>
			{itemList.map((item, index) => (
				<div key={index} className={'flex flex-col col-span-1 p-4 h-full rounded-sm box'}>
					<p className={'w-4/5 text-sm text-plain'}>{item.name}</p>
					<div className={'flex h-full flex-center'}>
						<Image src={item.img} width={105} height={105} />
					</div>
					<ItemAttributes
						category={item.category}
						item={item} />
					<button
						onClick={() => onEquip(item)}
						className={'flex mt-4 w-full flex-center button-highlight'}>
						<p className={'select-none'}>{'Equip'}</p>
					</button>
				</div>
			))}
		</div>
	);
}

function	Index() {
	const	router = useRouter();
	const	[tab, set_tab] = useState('all');

	React.useEffect(() => {
		if (router?.query?.slot) {
			if (Number(router?.query?.slot) === 0) set_tab('all');
			if (Number(router?.query?.slot) === 1) set_tab('head-armor');
			if (Number(router?.query?.slot) === 2) set_tab('body-armor');
			if (Number(router?.query?.slot) === 3) set_tab('hand-armor');
			if (Number(router?.query?.slot) === 4) set_tab('foot-armor');
			if (Number(router?.query?.slot) === 5) set_tab('weapon');
			if (Number(router?.query?.slot) === 6) set_tab('weapon-secondary');
			if (Number(router?.query?.slot) === 7) set_tab('jewelry');
			if (Number(router?.query?.slot) === 8) set_tab('jewelry-secondary');
		}
	}, [router]);

	function	renderFilters() {
		return (
			<div className={'flex flex-row justify-between mb-4 w-full text-sm text-plain'}>
				<div className={'flex flex-row space-x-4'}>
					<p
						onClick={() => router.push('/equipements?slot=0')}
						className={`transition-opacity hover:opacity-100 ${tab === 'all' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'All'}
					</p>
					<p
						onClick={() => router.push('/equipements?slot=1')}
						className={`transition-opacity hover:opacity-100 ${tab === 'head-armor' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Head Armors'}
					</p>
					<p
						onClick={() => router.push('/equipements?slot=2')}
						className={`transition-opacity hover:opacity-100 ${tab === 'body-armor' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Body Armors'}
					</p>
					<p
						onClick={() => router.push('/equipements?slot=3')}
						className={`transition-opacity hover:opacity-100 ${tab === 'hand-armor' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Hand Armors'}
					</p>
					<p
						onClick={() => router.push('/equipements?slot=4')}
						className={`transition-opacity hover:opacity-100 ${tab === 'foot-armor' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Foot Armors'}
					</p>
					<p
						onClick={() => router.push('/equipements?slot=5')}
						className={`transition-opacity hover:opacity-100 ${tab === 'weapon' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Primary Weapons'}
					</p>
					<p
						onClick={() => router.push('/equipements?slot=6')}
						className={`transition-opacity hover:opacity-100 ${tab === 'weapon-secondary' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Secondary Weapons'}
					</p>
					<p
						onClick={() => router.push('/equipements?slot=7')}
						className={`transition-opacity hover:opacity-100 ${tab === 'jewelry' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'First Jewelleries'}
					</p>
					<p
						onClick={() => router.push('/equipements?slot=8')}
						className={`transition-opacity hover:opacity-100 ${tab === 'jewelry-secondary' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Second Jewelleries'}
					</p>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className={'flex flex-col justify-between items-center mt-6 mb-4 md:flex-row'}>
				<div>
					<input
						className={'px-2 mr-0 w-full h-10 text-xs bg-white dark:bg-dark-600 border-2 border-black dark:border-dark-100 border-solid focus:outline-none md:mr-4 md:w-75 text-plain'}
						placeholder={'SEARCH'} />
				</div>
				<div className={'flex flex-row space-x-4 flex-center'}>
				</div>
			</div>
			{renderFilters()}
			<ItemList tab={tab} />
		</div>
	);
}
	
Index.getLayout = function getLayout(page) {
	return (
		<Template>
			{page}
		</Template>
	);
};

export default Index;
