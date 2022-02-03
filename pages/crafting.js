import	React, {useState}				from	'react';
import	Link							from	'next/link';
import	useWeb3							from	'contexts/useWeb3';
import	useRarity						from	'contexts/useRarity';
import	useInventory					from	'contexts/useInventory';
import	Template						from	'components/templates/Adventurer';
import	ElementRecipeCrafting			from	'sections/crafting/ElementRecipeCrafting';
import	ElementRecipeRarityCrafting		from	'sections/crafting/ElementRecipeRarityCrafting';
import	{approveForAll, craft, cook}	from	'utils/actions/rarity_extended_crafting_helper';
import 	* as difficulty					from	'utils/libs/rarityCrafting';
import	MANIFEST_ARMORS					from	'utils/codex/items/items_manifest_armors.json';
import	MANIFEST_GOODS					from	'utils/codex/items/items_manifest_goods.json';
import	MANIFEST_WEAPONS 				from	'utils/codex/items/items_manifest_weapons.json';
import	MANIFEST_SHIELDS				from	'utils/codex/items/items_manifest_shields.json';
import	* as ITEMS						from	'utils/codex/items/items';

function	Index() {
	const	{provider} = useWeb3();
	const	{currentAdventurer, updateRarity, specialApprovals, set_specialApprovals} = useRarity();
	const	{inventory, updateInventory} = useInventory();
	const	[search, set_search] = useState('');
	const	[shop, set_shop] = useState(4);
	const	[txApproveStatus, set_txApproveStatus] = useState({none: true, isPending: false, isSuccess: false, isError: false});

	function	onApproveAll() {
		if (!txApproveStatus.none) {
			return;
		}
		set_txApproveStatus({none: false, isPending: true, isSuccess: false, isError: false});
		
		const	contractToApprove = shop === 4 ? process.env.RARITY_COOKING_HELPER_ADDR : process.env.RARITY_CRAFTING_HELPER_ADDR;
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

	function	renderFilters() {
		return (
			<div className={'flex flex-row justify-between mb-4 w-full text-sm text-plain text-opacity-60 dark:text-opacity-60'}>
				<div className={'flex flex-row space-x-4'}>
					<p
						onClick={() => set_shop(4)}
						className={`transition-opacity hover:opacity-100 ${shop === 4 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Kitchen'}
					</p>
					<p
						onClick={() => set_shop(0)}
						className={`transition-opacity hover:opacity-100 ${shop === 0 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Goods'}
					</p>
					<p
						onClick={() => set_shop(1)}
						className={`transition-opacity hover:opacity-100 ${shop === 1 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Weapons'}
					</p>
					<p
						onClick={() => set_shop(2)}
						className={`transition-opacity hover:opacity-100 ${shop === 2 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Shields'}
					</p>
					<p
						onClick={() => set_shop(3)}
						className={`transition-opacity hover:opacity-100 ${shop === 3 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Armors'}
					</p>
				</div>
			</div>
		);
	}

	function	renderShop() {
		if (shop === 0) {
			return Object.values(MANIFEST_GOODS).filter(e => search === '' ? true : e?.name?.toLowerCase().includes(search.toLowerCase())).map((recipe) => (
				<ElementRecipeRarityCrafting
					key={recipe.name}
					currentAdventurer={currentAdventurer}
					inventory={inventory?.[currentAdventurer?.tokenID || ''] || {}}
					difficultyCheckFunc={() => difficulty.getGoodsDifficulty()}
					onCraft={materials => onLegacyCraft(recipe, materials)}
					recipe={{
						...recipe,
						cost: [
							[process.env.RARITY_GOLD_ADDR, recipe.cost],
							[process.env.RARITY_EXTENDED_XP, 250],
							[process.env.DUNGEON_THE_CELLAR_ADDR, -1],
						]
					}} />
			));
		}
		if (shop === 1) {
			return (
				Object.values(MANIFEST_WEAPONS).filter(e => search === '' ? true : e?.name?.toLowerCase().includes(search.toLowerCase())).map((recipe) => (
					<ElementRecipeRarityCrafting
						key={recipe.name}
						currentAdventurer={currentAdventurer}
						inventory={inventory?.[currentAdventurer?.tokenID || ''] || {}}
						difficultyCheckFunc={() => difficulty.getWeaponDifficulty(recipe.armor_bonus)}
						onCraft={materials => onLegacyCraft(recipe, materials)}
						category={'weapon'}
						recipe={{
							...recipe,
							effect: recipe.description,
							cost: [
								[process.env.RARITY_GOLD_ADDR, recipe.cost],
								[process.env.RARITY_EXTENDED_XP, 250],
								[process.env.DUNGEON_THE_CELLAR_ADDR, -1],
							]
						}} />
				))
			);
		}
		if (shop === 2) {
			return (
				Object.values(MANIFEST_SHIELDS).filter(e => search === '' ? true : e?.name?.toLowerCase().includes(search.toLowerCase())).map((recipe) => (
					<ElementRecipeRarityCrafting
						key={recipe.name}
						currentAdventurer={currentAdventurer}
						inventory={inventory?.[currentAdventurer?.tokenID || ''] || {}}
						difficultyCheckFunc={() => difficulty.getArmorDifficulty(recipe.armor_bonus)}
						onCraft={materials => onLegacyCraft(recipe, materials)}
						category={'armor'}
						recipe={{
							...recipe,
							effect: recipe.description,
							cost: [
								[process.env.RARITY_GOLD_ADDR, recipe.cost],
								[process.env.RARITY_EXTENDED_XP, 250],
								[process.env.DUNGEON_THE_CELLAR_ADDR, -1],
							]
						}} />
				))
			);
		}
		if (shop === 3) {
			return (
				Object.values(MANIFEST_ARMORS).filter(e => search === '' ? true : e?.name?.toLowerCase().includes(search.toLowerCase())).map((recipe) => (
					<ElementRecipeRarityCrafting
						key={recipe.name}
						currentAdventurer={currentAdventurer}
						inventory={inventory?.[currentAdventurer?.tokenID || ''] || {}}
						difficultyCheckFunc={() => difficulty.getArmorDifficulty(recipe.armor_bonus)}
						onCraft={materials => onLegacyCraft(recipe, materials)}
						category={'armor'}
						recipe={{
							...recipe,
							effect: recipe.description,
							cost: [
								[process.env.RARITY_GOLD_ADDR, recipe.cost],
								[process.env.RARITY_EXTENDED_XP, 250],
								[process.env.DUNGEON_THE_CELLAR_ADDR, -1],
							]
						}} />
				))
			);
		}
		if (shop === 4) {
			return (
				(ITEMS.ITEMS_MEALS).filter(e => search === '' ? true : e?.name?.toLowerCase().includes(search.toLowerCase())).map((recipe) => (
					<ElementRecipeCrafting
						key={recipe.name}
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
		return (null);
	}

	function	renderMainAction() {
		if (shop < 4) {
			if (Number(currentAdventurer?.skills?.[5] || 0) <= 0) {
				if (specialApprovals?.[process.env.RARITY_CRAFTING_HELPER_ADDR]) {
					return (
						<>
							<Link href={'/skills?tab=2&search=crafting'}>
								<div className={'flex py-2 px-4 uppercase rounded-sm cursor-pointer button-highlight flex-center'}>
									<p className={' text-sm font-bold'}>{'Learn Crafting'}</p>
								</div>
							</Link>
						</>
					);
				}
				return (
					<>
						<button
							onClick={onApproveAll}
							className={'flex py-2 px-4 uppercase rounded-sm cursor-pointer button-highlight flex-center'}>
							<p className={' text-sm font-bold'}>{'Approve Crafting'}</p>
						</button>
						<Link href={'/skills?tab=2&search=crafting'}>
							<div className={'flex py-2 px-4 uppercase rounded-sm cursor-pointer button-highlight flex-center'}>
								<p className={' text-sm font-bold'}>{'Learn Crafting'}</p>
							</div>
						</Link>
					</>
				);
			} else if (!specialApprovals?.[process.env.RARITY_CRAFTING_HELPER_ADDR]) {
				return (
					<>
						<button
							onClick={onApproveAll}
							className={'flex relative py-2 px-4 uppercase rounded-sm cursor-pointer button-highlight flex-center'}>
							<p className={' text-sm font-bold'}>{'Approve Crafting'}</p>
						</button>
					</>
				);
			}
		} else if (shop === 4) {
			if (!specialApprovals?.[process.env.RARITY_COOKING_HELPER_ADDR]) {
				return (
					<>
						<button
							onClick={onApproveAll}
							className={'flex relative py-2 px-4 uppercase rounded-sm cursor-pointer button-highlight flex-center'}>
							<p className={' text-sm font-bold'}>{'Approve Crafting'}</p>
						</button>
					</>
				);
			}
		}
		return null;
	}

	return (
		<div>
			<div className={'flex flex-col justify-between items-center mt-6 mb-4 md:flex-row'}>
				<div>
					<input
						onChange={e => set_search(e?.target?.value || '')}
						className={'px-2 mr-0 w-full h-10 text-xs bg-white dark:bg-dark-600 border-2 border-black dark:border-dark-100 border-solid focus:outline-none md:mr-4 md:w-75 text-plain'}
						placeholder={'SEARCH'} />
				</div>
				<div className={'flex flex-row space-x-4 flex-center'}>
					{renderMainAction()}
				</div>
			</div>
			{renderFilters()}
			<div className={'grid grid-cols-1 gap-6 md:grid-cols-3'}>
				{renderShop()}
			</div>
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
