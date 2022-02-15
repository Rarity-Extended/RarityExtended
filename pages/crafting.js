import	React, {useState}				from	'react';
import	{useRouter}						from	'next/router';
import	useWeb3							from	'contexts/useWeb3';
import	useRarity						from	'contexts/useRarity';
import	useInventory					from	'contexts/useInventory';
import	Template						from	'components/templates/Adventurer';
import	TabMeals						from	'components/layout/RowCraftMeals';
import	TabShields						from	'components/layout/RowCraftShields';
import	TabArmors						from	'components/layout/RowCraftArmors';
import	TabGoods						from	'components/layout/RowCraftGoods';
import	TabWeapons						from	'components/layout/RowCraftWeapons';
import	Section							from	'components/layout/Section';
import	{approveForAll, craft, cook}	from	'utils/actions/rarity_extended_crafting_helper';
import	MANIFEST_ARMORS					from	'utils/codex/items/items_manifest_armors.json';
import	MANIFEST_GOODS					from	'utils/codex/items/items_manifest_goods.json';
import	MANIFEST_WEAPONS 				from	'utils/codex/items/items_manifest_weapons.json';
import	MANIFEST_SHIELDS				from	'utils/codex/items/items_manifest_shields.json';
import	* as ITEMS						from	'utils/codex/items/items';

function	Index({tab, onApproveAll}) {
	const	{provider} = useWeb3();
	const	{currentAdventurer, updateRarity, specialApprovals} = useRarity();
	const	{inventory, updateInventory} = useInventory();

	function	onLegacyCraft(item, materialsToUse) {
		craft({
			provider,
			tokenID: currentAdventurer.tokenID,
			itemName: item.name,
			baseType: item.type,
			itemType: item.id,
			craftingMaterials: materialsToUse
		}, ({error}) => {
			if (error) {
				return;
			}
			updateRarity(currentAdventurer.tokenID);
			updateInventory(currentAdventurer.tokenID);
		});
	}

	function	onCraft(recipe) {
		cook({
			provider,
			mealAddress: recipe.address,
			tokenID: currentAdventurer.tokenID,
			itemName: recipe.name,
		}, ({error}) => {
			if (error) {
				return;
			}
			updateInventory(currentAdventurer.tokenID);
		});
	}

	function	renderShop() {
		if (tab === 0) {
			return (
				(ITEMS.ITEMS_MEALS).map((recipe, index) => (
					<TabMeals
						key={recipe.name}
						index={index}
						isApproved={specialApprovals?.[process.env.RARITY_COOKING_HELPER_ADDR]}
						currentAdventurer={currentAdventurer}
						inventory={inventory?.[currentAdventurer?.tokenID || ''] || {}}
						onCraft={() => onCraft(recipe)}
						onApprove={onApproveAll}
						recipe={{
							...recipe,
							effect: recipe.description,
						}} />
				))
			);
		}
		if (tab === 1) {
			return Object.values(MANIFEST_GOODS).map((recipe, index) => (
				<TabGoods
					key={recipe.name}
					index={index}
					currentAdventurer={currentAdventurer}
					inventory={inventory?.[currentAdventurer?.tokenID || ''] || {}}
					onCraft={materials => onLegacyCraft(recipe, materials)}
					recipe={{
						...recipe,
						cost: [
							[process.env.RARITY_GOLD_ADDR, recipe.cost],
							[process.env.RARITY_EXTENDED_XP_ADDR, 250],
							[process.env.DUNGEON_THE_CELLAR_ADDR, -1],
						]
					}} />
			));
		}
		if (tab === 2) {
			return (
				Object.values(MANIFEST_WEAPONS).filter(e => e.encumbrance !== 'Ranged Weapons' && e.proficiency === 'Simple').map((recipe, index) => (
					<TabWeapons
						key={recipe.name}
						index={index}
						currentAdventurer={currentAdventurer}
						inventory={inventory?.[currentAdventurer?.tokenID || ''] || {}}
						onCraft={materials => onLegacyCraft(recipe, materials)}
						category={'weapon'}
						recipe={{
							...recipe,
							effect: recipe.description,
							cost: [
								[process.env.RARITY_GOLD_ADDR, recipe.cost],
								[process.env.RARITY_EXTENDED_XP_ADDR, 250],
								[process.env.DUNGEON_THE_CELLAR_ADDR, -1],
							]
						}} />
				))
			);
		}
		if (tab === 3) {
			return (
				Object.values(MANIFEST_WEAPONS).filter(e => e.encumbrance !== 'Ranged Weapons' && e.proficiency === 'Martial').map((recipe, index) => (
					<TabWeapons
						key={recipe.name}
						index={index}
						currentAdventurer={currentAdventurer}
						inventory={inventory?.[currentAdventurer?.tokenID || ''] || {}}
						onCraft={materials => onLegacyCraft(recipe, materials)}
						category={'weapon'}
						recipe={{
							...recipe,
							effect: recipe.description,
							cost: [
								[process.env.RARITY_GOLD_ADDR, recipe.cost],
								[process.env.RARITY_EXTENDED_XP_ADDR, 250],
								[process.env.DUNGEON_THE_CELLAR_ADDR, -1],
							]
						}} />
				))
			);
		}
		if (tab === 4) {
			return (
				Object.values(MANIFEST_WEAPONS).filter(e => e.encumbrance !== 'Ranged Weapons' && e.proficiency === 'Exotic').map((recipe, index) => (
					<TabWeapons
						key={recipe.name}
						index={index}
						currentAdventurer={currentAdventurer}
						inventory={inventory?.[currentAdventurer?.tokenID || ''] || {}}
						onCraft={materials => onLegacyCraft(recipe, materials)}
						category={'weapon'}
						recipe={{
							...recipe,
							effect: recipe.description,
							cost: [
								[process.env.RARITY_GOLD_ADDR, recipe.cost],
								[process.env.RARITY_EXTENDED_XP_ADDR, 250],
								[process.env.DUNGEON_THE_CELLAR_ADDR, -1],
							]
						}} />
				))
			);
		}
		if (tab === 5) {
			return (
				Object.values(MANIFEST_WEAPONS).filter(e => e.encumbrance === 'Ranged Weapons').map((recipe, index) => (
					<TabWeapons
						key={recipe.name}
						index={index}
						currentAdventurer={currentAdventurer}
						inventory={inventory?.[currentAdventurer?.tokenID || ''] || {}}
						onCraft={materials => onLegacyCraft(recipe, materials)}
						category={'weapon'}
						recipe={{
							...recipe,
							effect: recipe.description,
							cost: [
								[process.env.RARITY_GOLD_ADDR, recipe.cost],
								[process.env.RARITY_EXTENDED_XP_ADDR, 250],
								[process.env.DUNGEON_THE_CELLAR_ADDR, -1],
							]
						}} />
				))
			);
		}
		if (tab === 6) {
			return (
				Object.values(MANIFEST_SHIELDS).map((recipe, index) => (
					<TabShields
						key={recipe.name}
						index={index}
						currentAdventurer={currentAdventurer}
						inventory={inventory?.[currentAdventurer?.tokenID || ''] || {}}
						onCraft={materials => onLegacyCraft(recipe, materials)}
						category={'armor'}
						recipe={{
							...recipe,
							effect: recipe.description,
							cost: [
								[process.env.RARITY_GOLD_ADDR, recipe.cost],
								[process.env.RARITY_EXTENDED_XP_ADDR, 250],
								[process.env.DUNGEON_THE_CELLAR_ADDR, -1],
							]
						}} />
				))
			);
		}
		if (tab === 7) {
			return (
				Object.values(MANIFEST_ARMORS).map((recipe, index) => (
					<TabArmors
						key={recipe.name}
						index={index}
						currentAdventurer={currentAdventurer}
						inventory={inventory?.[currentAdventurer?.tokenID || ''] || {}}
						onCraft={materials => onLegacyCraft(recipe, materials)}
						category={'armor'}
						recipe={{
							...recipe,
							effect: recipe.description,
							cost: [
								[process.env.RARITY_GOLD_ADDR, recipe.cost],
								[process.env.RARITY_EXTENDED_XP_ADDR, 250],
								[process.env.DUNGEON_THE_CELLAR_ADDR, -1],
							]
						}} />
				))
			);
		}
		return (null);
	}


	return (
		<div className={'grid grid-cols-1 divide-y divide-dark-600'}>
			{renderShop()}
		</div>
	);
}


function	Wrapper() {
	const	{provider} = useWeb3();
	const	router = useRouter();
	const	{currentAdventurer, specialApprovals, set_specialApprovals} = useRarity();
	const	[txApproveStatus, set_txApproveStatus] = useState({none: true, isPending: false, isSuccess: false, isError: false});

	function	onApproveAll(tab) {
		if (!txApproveStatus.none) {
			return;
		}
		set_txApproveStatus({none: false, isPending: true, isSuccess: false, isError: false});
		
		const	contractToApprove = tab === 0 ? process.env.RARITY_COOKING_HELPER_ADDR : process.env.RARITY_CRAFTING_HELPER_ADDR;
		approveForAll(
			{provider, contract: contractToApprove},
			() => {
				set_txApproveStatus({none: false, isPending: false, isSuccess: false, isError: true});
				setTimeout(() => set_txApproveStatus({none: true, isPending: false, isSuccess: false, isError: false}), 5000);
			},
			() => {
				set_specialApprovals(s => ({...s, [contractToApprove]: true}));
			}
		);
	}

	function	getButton() {
		return ({
			onClick: (tab) => (tab > 0 && Number(currentAdventurer?.skills?.[5] || 0) <= 0)
				? router.push('/skills?tab=0&search=crafting')
				: onApproveAll(tab),
			disabled: (tab) => {
				if (tab === 0) {
					return specialApprovals[process.env.RARITY_COOKING_HELPER_ADDR];
				} else if (Number(currentAdventurer?.skills?.[5] || 0) <= 0) {
					return false;
				}
				return specialApprovals[process.env.RARITY_CRAFTING_HELPER_ADDR];
			},
			label: (tab) => (tab > 0 && Number(currentAdventurer?.skills?.[5] || 0) <= 0)
				? 'Learn Crafting'
				: 'Approve Crafting',
		});
	}

	return (
		<Section
			title={'Crafting'}
			tabs={['Kitchen', 'Goods', 'Simple Weapons', 'Martial Weapons', 'Exotic Weapons', 'Ranged Weapons', 'Shields', 'Armors']}
			button={{...getButton()}}>
			<Index onApproveAll={onApproveAll} />
		</Section>
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
