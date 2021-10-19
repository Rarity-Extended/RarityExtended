/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday September 21st 2021
**	@Filename:				items.js
******************************************************************************/

import	React, {useState}			from	'react';
import	Image						from	'next/image';
import	useRarity					from	'contexts/useRarity';
import	Box							from	'components/Box';
import	ITEMS						from	'utils/codex/items';
import	THE_FOREST_LOOT				from	'utils/codex/items_dungeon_theForest.json';
import	CLASSES						from	'utils/codex/classes';
import	{ethers}					from	'ethers';

function	ItemsTheCellar({item, amount}) {
	return (
		<div className={'flex flex-row space-x-4 w-full tooltip cursor-help group'}>
			<div className={'w-16 h-16 bg-gray-principal dark:bg-dark-400 flex justify-center items-center item relative'}>
				<div className={`absolute ${item.levelClassName} left-0 top-0 w-2 h-1`} />
				<div className={`absolute ${item.levelClassName} left-0 top-0 w-1 h-2`} />
				<div className={`absolute ${item.levelClassName} right-0 top-0 w-2 h-1`} />
				<div className={`absolute ${item.levelClassName} right-0 top-0 w-1 h-2`} />
				<Image src={item.img} width={48} height={48} />
				<div className={`absolute ${item.levelClassName} left-0 bottom-0 w-2 h-1`} />
				<div className={`absolute ${item.levelClassName} left-0 bottom-0 w-1 h-2`} />
				<div className={`absolute ${item.levelClassName} right-0 bottom-0 w-2 h-1`} />
				<div className={`absolute ${item.levelClassName} right-0 bottom-0 w-1 h-2`} />
			</div>
			<div className={'text-left flex flex-col py-0.5'}>
				<p className={'text-xs'}>{item.name}</p>
				<p className={'text-megaxs mt-auto'}>{`QTY: ${amount}`}</p>
			</div>
			<div className={'tooltiptext invisible group-hover:visible bg-white dark:bg-dark-600 border-4 border-black dark:border-dark-100'}>
				<div className={'p-4'}>
					<p className={'text-sx mb-2'}>{item.level}</p>
					<p className={'text-megaxs mt-4 text-gray-darker dark:text-white dark:text-opacity-60'}>{item.description}</p>
				</div>
			</div>
		</div>
	);
}

function	ItemsTheForest({subItem}) {
	return (
		<div className={'flex flex-row space-x-4 w-full tooltip cursor-help group'}>
			<div className={'w-16 h-16 bg-gray-principal dark:bg-dark-400 flex justify-center items-center item relative'}>
				<div className={`absolute ${THE_FOREST_LOOT[subItem.itemName].levelClassName} left-0 top-0 w-2 h-1`} />
				<div className={`absolute ${THE_FOREST_LOOT[subItem.itemName].levelClassName} left-0 top-0 w-1 h-2`} />
				<div className={`absolute ${THE_FOREST_LOOT[subItem.itemName].levelClassName} right-0 top-0 w-2 h-1`} />
				<div className={`absolute ${THE_FOREST_LOOT[subItem.itemName].levelClassName} right-0 top-0 w-1 h-2`} />
				<Image src={THE_FOREST_LOOT[subItem.itemName].img} width={64} height={64} />
				<div className={`absolute ${THE_FOREST_LOOT[subItem.itemName].levelClassName} left-0 bottom-0 w-2 h-1`} />
				<div className={`absolute ${THE_FOREST_LOOT[subItem.itemName].levelClassName} left-0 bottom-0 w-1 h-2`} />
				<div className={`absolute ${THE_FOREST_LOOT[subItem.itemName].levelClassName} right-0 bottom-0 w-2 h-1`} />
				<div className={`absolute ${THE_FOREST_LOOT[subItem.itemName].levelClassName} right-0 bottom-0 w-1 h-2`} />
			</div>
			<div className={'text-left flex flex-col py-0.5'}>
				<p className={'text-xs'}>{THE_FOREST_LOOT[subItem.itemName].name}</p>
				<p className={'text-megaxs mt-auto'}>{`LVL: ${Number(subItem.level)} - MAGIC: ${Number(subItem.magic)}`}</p>
			</div>
			<div className={'tooltiptext invisible group-hover:visible bg-white dark:bg-dark-600 border-4 border-black dark:border-dark-100'}>
				<div className={'p-4'}>
					<p className={'text-sx mb-2'}>{THE_FOREST_LOOT[subItem.itemName].level}</p>
					{THE_FOREST_LOOT[subItem.itemName].modifier.map((e, i) => (
						<p key={i} className={'text-megaxs'}>
							{`${e.name}: ${e.change > 0 ? `+${e.change}` : e.change}`}
						</p>
					))}
					<p className={'text-megaxs mt-4 text-gray-darker dark:text-white dark:text-opacity-60'}>{THE_FOREST_LOOT[subItem.itemName].description}</p>
				</div>
			</div>
		</div>
	);
}

function	SectionItem({item}) {
	function	renderWeaponChildren() {
		return (
			<>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'NAME'}</p>
					<p className={'text-sx text-black dark:text-white break-words'}>{item?.name}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'DAMAGE'}</p>
					<p className={'text-sx text-black dark:text-white break-words'}>{item?.damage || 0}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'DMG TYPE'}</p>
					<p className={'text-sx text-black dark:text-white break-words'}>{item?.damageType}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'ENCUMBRANCE'}</p>
					<p className={'text-sx text-black dark:text-white break-words'}>{item?.encumbrance}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'PROFICIENCY'}</p>
					<p className={'text-sx text-black dark:text-white break-words'}>{item?.proficiency}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'CRITICAL'}</p>
					<p className={'text-sx text-black dark:text-white break-words'}>{item?.critical_modifier ? `${`${(20+item?.critical_modifier)}-20`}/x${item?.critical || 0}` : `x${item?.critical || 0}`}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'RANGE'}</p>
					<p className={'text-sx text-black dark:text-white break-words'}>{item?.range_increment || 0}</p>
				</div>

				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'WEIGHT'}</p>
					<p className={'text-sx text-black dark:text-white break-words'}>{item?.weight || 0}</p>
				</div>
			</>
		);
	}
	function	renderArmorChildren() {
		return (
			<>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'NAME'}</p>
					<p className={'text-sx text-black dark:text-white break-words'}>{item?.name}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'ARMOR'}</p>
					<p className={'text-sx text-black dark:text-white break-words'}>{item?.armor_bonus}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'ARMOR TYPE'}</p>
					<p className={'text-sx text-black dark:text-white break-words'}>{item?.proficiency}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'MAX DEX BONUS'}</p>
					<p className={'text-sx text-black dark:text-white break-words'}>{item?.max_dex_bonus}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'PENALTY'}</p>
					<p className={'text-sx text-black dark:text-white break-words'}>{item?.penalty}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'SPELL FAILURE'}</p>
					<p className={'text-sx text-black dark:text-white break-words'}>{item?.spell_failure}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'WEIGHT'}</p>
					<p className={'text-sx text-black dark:text-white break-words'}>{item?.weight || 0}</p>
				</div>
			</>
		);
	}
	function	renderGoodChildren() {
		return (
			<>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'NAME'}</p>
					<p className={'text-sx text-black dark:text-white break-words'}>{item?.name}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'WEIGHT'}</p>
					<p className={'text-sx text-black dark:text-white break-words'}>{item?.weight || 0}</p>
				</div>
			</>
		);
	}
	return (
		<Box className={'bg-gray-principal dark:bg-dark-400 w-full z-10'}>
			<div className={'w-full flex flex-row px-4'}>
				<div className={'w-16 h-16 bg-gray-principal dark:bg-dark-400 flex justify-center items-center item relative my-4'}>
					<div className={`absolute ${item.levelClassName} left-0 top-0 w-2 h-1`} />
					<div className={`absolute ${item.levelClassName} left-0 top-0 w-1 h-2`} />
					<div className={`absolute ${item.levelClassName} right-0 top-0 w-2 h-1`} />
					<div className={`absolute ${item.levelClassName} right-0 top-0 w-1 h-2`} />
					<Image src={item.img} width={60} height={60} />
					<div className={`absolute ${item.levelClassName} left-0 bottom-0 w-2 h-1`} />
					<div className={`absolute ${item.levelClassName} left-0 bottom-0 w-1 h-2`} />
					<div className={`absolute ${item.levelClassName} right-0 bottom-0 w-2 h-1`} />
					<div className={`absolute ${item.levelClassName} right-0 bottom-0 w-1 h-2`} />
				</div>
				<div className={'w-full flex flex-col px-4 pt-4 pb-6 space-y-6 cursor-default'}>
					<div className={'grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6'}>
						{item.type === 1 ? renderGoodChildren() : null}
						{item.type === 2 ? renderArmorChildren() : null}
						{item.type === 3 ? renderWeaponChildren() : null}
					</div>
					<div>
						<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'Description'}</p>
						<p className={'text-megaxs text-black dark:text-white'}>{item.description}</p>
					</div>
				</div>
			</div>
		</Box>
	);
}

function	Index() {
	const	{rarities, inventory} = useRarity();
	const	[expand, set_expand] = useState(false);
	const	allItems = [...ITEMS];

	function	renderInventory() {
		return Object.values(inventory).map((item, i) => (
			<SectionItem key={`${item.name}_${i}`} item={item} />
		));
	}

	function	renderIndividualInventory() {
		return (
			Object.values(rarities).map((adventurer) => {
				let		hasItem = false;
				const	toRender = allItems
					.map((item, i) => {
						if (ethers.BigNumber.isBigNumber(adventurer?.inventory?.[item.id])) {
							if ((Number(adventurer?.inventory?.[item.id]) > 0 || item.shouldAlwaysDisplay) && !item.shouldNeverDisplay) {
								hasItem = true;
								return (<ItemsTheCellar key={`${item.id}_${i}`} item={item} amount={Number(adventurer?.inventory?.[item.id])} />);
							}
							return null;
						}
						if(Array.isArray(adventurer?.inventory?.[item.id]) && item?.dungeon === 'The Forest') {
							return adventurer?.inventory?.[item.id].map((subItem, subi) => {
								hasItem = true;
								return (<ItemsTheForest key={`${item.id}_${i}_${subi}`} item={item} subItem={subItem} />);
							});
						}
						return (null);
					});
				
				if (!hasItem) {
					return null;
				}

				return (
					<div key={adventurer.tokenID} className={'w-full'}>
						<p className={'pb-4 text-sm'}>
							{`${adventurer?.name ? adventurer?.name : adventurer?.tokenID}, ${CLASSES[adventurer?.class]?.name} LVL ${adventurer?.level}`}
						</p>
						<div className={'w-full grid grid-cols-1 md:grid-cols-4 gap-6 mb-12'}>
							{toRender}
						</div>
					</div>
				);
			})
		);
	}

	function	renderMergedInventory() {
		const	toRender = allItems.map((item, i) => {
			if (item.isSpecific) {
				return null;
			}
			const reducer = (reducer, adventurer) => {
				if (ethers.BigNumber.isBigNumber(adventurer?.inventory?.[item.id])) {
					if ((Number(adventurer?.inventory?.[item.id]) > 0 || item.shouldAlwaysDisplay) && !item.shouldNeverDisplay) {
						return Number(Number(reducer) + (Number(adventurer?.inventory?.[item.id] || 0)));
					}
				}
				return (Number(reducer) + 0);
			};
			const	amount = Object.values(rarities).reduce(reducer, 0);

			if (amount === 0) {
				return null;
			}
			return (<ItemsTheCellar key={`${item.id}_${i}`} item={item} amount={amount} />);
		});

		const	toRenderSpecifics = allItems.map((item, i) => {
			if (item.isSpecific) {
				return (
					Object.values(rarities).map((adventurer) => {
						if(Array.isArray(adventurer?.inventory?.[item.id]) && item?.dungeon === 'The Forest') {
							return adventurer?.inventory?.[item.id].map((subItem, subi) => {
								return (<ItemsTheForest key={`${item.id}_${i}_${subi}`} item={item} subItem={subItem} />);
							});
						}
					})
				);
			}
			return null;
		});
		return (
			<div className={'w-full grid grid-cols-1 gap-6'}>
				<h1 className={'text-black dark:text-white text-base mb-4'}>{'Loots'}</h1>
				<div className={'w-full grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-12 mb-12'}>
					{toRender}
				</div>
				<h1 className={'text-black dark:text-white text-base mb-4'}>{'Treasures'}</h1>
				<div className={'w-full grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-12 mb-12'}>
					{toRenderSpecifics}
				</div>
			</div>
		);
	}

	return (
		<section className={'mt-24 md:mt-12'}>
			<div className={'flex flex-col max-w-screen-lg w-full mx-auto'}>
				<div className={'flex flex-row justify-between items-center mb-2'}>
					<h1 className={'text-black dark:text-white text-base'}>{'Storage'}</h1>
					<div className={'cursor-pointer p-2'} onClick={() => set_expand(!expand)}>
						{expand ? <svg width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M17 3h-2v2h-2v2h-2V5H9V3H7v2h2v2h2v2h2V7h2V5h2V3zM4 13h16v-2H4v2zm9 4h-2v-2h2v2zm2 2h-2v-2h2v2zm0 0h2v2h-2v-2zm-6 0h2v-2H9v2zm0 0H7v2h2v-2z'} fill={'currentColor'}/> </svg> : <svg width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M11 5h2v2h2v2h2V7h-2V5h-2V3h-2v2zM9 7V5h2v2H9zm0 0v2H7V7h2zm-5 6h16v-2H4v2zm9 6h-2v-2H9v-2H7v2h2v2h2v2h2v-2zm2-2h-2v2h2v-2zm0 0h2v-2h-2v2z'} fill={'currentColor'}/> </svg>}
					</div>
				</div>
			</div>
			<Box className={'flex flex-col max-w-screen-lg w-full mx-auto p-4'}>
				{expand ? renderIndividualInventory() : renderMergedInventory()}
			</Box>


			<div className={'flex flex-col max-w-screen-lg w-full mx-auto mt-12'}>
				<h1 className={'text-black dark:text-white text-base mb-12'}>{'Craft'}</h1>
				<div className={'w-full grid grid-cols-1 gap-6'}>
					{renderInventory()}
				</div>
			</div>
		</section>
	);
}

export default Index;
