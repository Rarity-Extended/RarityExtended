/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 19th 2021
**	@Filename:				Inventory.js
******************************************************************************/

import	React, {useState}			from	'react';
import	Image						from	'next/image';
import	Link						from	'next/link';
import	{ethers}					from	'ethers';
import	ITEMS						from	'utils/codex/items';
import	THE_FOREST_LOOT				from	'utils/codex/theForestLoot.json';

function	Inventory({adventurer}) {
	const	OFFSET_SIZE = 9;
	const	[offset, set_offset] = useState(0);
	const	allItems = [...ITEMS];

	function	renderInventory() {
		let		hasItem = false;
		const	toRender = allItems
			.filter((e, i) => i >= offset && i < (offset + OFFSET_SIZE))
			.map((item, i) => {
				if (ethers.BigNumber.isBigNumber(adventurer?.inventory?.[item.id])) {
					if ((Number(adventurer?.inventory?.[item.id]) > 0 || item.shouldAlwaysDisplay) && !item.shouldNeverDisplay) {
						hasItem = true;
						return (
							<div className={'flex flex-row space-x-4 w-full tooltip cursor-help group'} key={`${item.id}_${i}`}>
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
									<p className={'text-megaxs mt-auto'}>{`QTY: ${Number(adventurer?.inventory?.[item.id])}`}</p>
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
					return null;
				}
				if(Array.isArray(adventurer?.inventory?.[item.id]) && item?.dungeon === 'The Forest') {
					return adventurer?.inventory?.[item.id].map((subItem, subi) => {
						hasItem = true;
						return (
							<div className={'flex flex-row space-x-4 w-full tooltip cursor-help group'} key={`${item.id}_${i}_${subi}`}>
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
					});
				}
				return (null);
			});

		if (!hasItem) {
			return (
				<div className={'w-full'}>
					<div className={'p-4 flex text-black dark:text-white text-sx normal-case w-full md:w-1/2 pr-0 md:pr-32'}>
						{'You have no items yet, traveler, find them in Dungeons!'}
					</div>
					<div className={'flex flex-col md:flex-row'}>
						<div className={'flex w-full md:w-1/2 px-4 pb-4 md:pb-0'}>
							<Link href={'/town/quest'}>
								<div
									className={'border-4 border-black dark:border-dark-100 px-10 py-2 text-black dark:text-white hover:bg-gray-secondary dark:hover:bg-dark-400 cursor-pointer transition-colors flex items-center text-center justify-center text-xs w-full'}>
									<p>{'GO TO THE QUEST OFFICE'}</p>
								</div>
							</Link>
						</div>
					</div>
				</div>
			);
		}
		return (
			<div className={'w-full'}>
				<div className={'w-full px-4 grid grid-cols-1 md:grid-cols-4 gap-6'}>
					{toRender}
				</div>
				<div className={'-mt-8 h-8 px-4'}>
					<div className={'w-full h-full flex justify-end items-center space-x-4'}>
						<p className={`text-xs ${offset > OFFSET_SIZE ? 'opacity-40 hover:opacity-100 cursor-pointer' : 'opacity-0'}`} onClick={() => set_offset(o => o > OFFSET_SIZE ? o - OFFSET_SIZE : 0)}>{'<'}</p>
						<p className={`text-xs ${offset + OFFSET_SIZE <= allItems.length ? 'opacity-40 hover:opacity-100 cursor-pointer' : 'opacity-0'}`} onClick={() => set_offset(o => o + OFFSET_SIZE <= allItems.length ? o + OFFSET_SIZE : o)}>{'>'}</p>
					</div>
				</div>
			</div>
		);
	}
	return (renderInventory());
}

export default Inventory;