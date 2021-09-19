/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 19th 2021
**	@Filename:				Inventory.js
******************************************************************************/

import	React, {useState}			from	'react';
import	Image						from	'next/image';
import	Link						from	'next/link';
import	ITEMS						from	'utils/codex/items';

function	Inventory({adventurer}) {
	const	OFFSET_SIZE = 9;
	const	[offset, set_offset] = useState(0);
	const	allItems = [...ITEMS];

	function	renderInventory() {
		let		hasItem = false;
		const	toRender = allItems
			.filter((e, i) => i >= offset && i < (offset + OFFSET_SIZE))
			.map((item, i) => {
				if ((Number(adventurer?.inventory?.[item.id]) > 0 || item.shouldAlwaysDisplay) && !item.shouldNeverDisplay) {
					hasItem = true;
					return (
						<div className={'flex flex-row space-x-4 w-full'} key={`${item.id}_${i}`}>
							<div className={'w-16 h-16 bg-gray-50 dark:bg-dark-400 flex justify-center items-center relative item'}>
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
							<div className={'text-left'}>
								<p>{item.name}</p>
								<p className={'text-xs'}>{`QTY: ${Number(adventurer?.inventory?.[item.id])}`}</p>
							</div>
						</div>
					);
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
						<div className={'flex w-full md:w-1/2 px-4'}>
							<Link href={'/town/tavern'}>
								<div
									className={'border-4 border-black dark:border-dark-100 px-10 py-2 text-black dark:text-white hover:bg-gray-secondary dark:hover:bg-dark-400 cursor-pointer transition-colors flex items-center text-center justify-center text-xs w-full'}>
									<p>{'GO TO THE TAVERN'}</p>
								</div>
							</Link>
						</div>
					</div>
				</div>
			);
		}
		return (
			<div className={'w-full'}>
				<div className={'w-full p-4 grid grid-cols-3 gap-4'}>
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