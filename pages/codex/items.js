/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday September 21st 2021
**	@Filename:				items.js
******************************************************************************/

import	React						from	'react';
import	Image						from	'next/image';
import	ITEMS						from	'utils/codex/items';
import	THE_FOREST_LOOT				from	'utils/codex/theForestLoot.json';

function	Index() {
	function	sortByRarity(a, b) {
		let	item1Level = 0;
		let	item2Level = 0;
		if (a.level === 'Uncommon')
			item1Level = 1;
		if (a.level === 'Rare')
			item1Level = 2;
		if (a.level === 'Epic')
			item1Level = 3;
		if (a.level === 'Legendary')
			item1Level = 4;
		if (a.level === 'Relic')
			item1Level = 5;
		if (b.level === 'Uncommon')
			item2Level = 1;
		if (b.level === 'Rare')
			item2Level = 2;
		if (b.level === 'Epic')
			item2Level = 3;
		if (b.level === 'Legendary')
			item2Level = 4;
		if (b.level === 'Relic')
			item2Level = 5;
		return item1Level - item2Level;
	}
	function	renderTheForestLoot() {
		return Object.values(THE_FOREST_LOOT).sort(sortByRarity).map((item) => (
			<div className={'flex flex-row space-x-4 w-full tooltip cursor-help group'} key={`theForest_${item.name}`}>
				<div className={'w-16 h-16 bg-gray-principal dark:bg-dark-400 flex justify-center items-center item relative'}>
					<div className={`absolute ${item.levelClassName} left-0 top-0 w-2 h-1`} />
					<div className={`absolute ${item.levelClassName} left-0 top-0 w-1 h-2`} />
					<div className={`absolute ${item.levelClassName} right-0 top-0 w-2 h-1`} />
					<div className={`absolute ${item.levelClassName} right-0 top-0 w-1 h-2`} />
					<Image src={item.img} width={64} height={64} />
					<div className={`absolute ${item.levelClassName} left-0 bottom-0 w-2 h-1`} />
					<div className={`absolute ${item.levelClassName} left-0 bottom-0 w-1 h-2`} />
					<div className={`absolute ${item.levelClassName} right-0 bottom-0 w-2 h-1`} />
					<div className={`absolute ${item.levelClassName} right-0 bottom-0 w-1 h-2`} />
				</div>
				<div className={'text-left flex flex-col py-0.5'}>
					<p className={'text-xs'}>{item.name}</p>
				</div>
				<div className={'tooltiptext invisible group-hover:visible bg-white dark:bg-dark-600 border-4 border-black dark:border-dark-100'}>
					<div className={'p-4'}>
						<p className={'text-sx mb-2'}>{item.level}</p>
						{item.modifier.map((e, i) => (
							<p key={i} className={'text-megaxs'}>
								{`${e.name}: ${e.change > 0 ? `+${e.change}` : e.change}`}
							</p>
						))}
						<p className={'text-megaxs mt-4 text-gray-darker dark:text-white dark:text-opacity-60'}>{item.description}</p>
					</div>
				</div>
			</div>
		));
	}
	function	renderTheCellarLoot() {
		return (
			<div className={'flex flex-row space-x-4 w-full tooltip cursor-help group'}>
				<div className={'w-16 h-16 bg-gray-principal dark:bg-dark-400 flex justify-center items-center item relative'}>
					<div className={`absolute ${ITEMS[0].levelClassName} left-0 top-0 w-2 h-1`} />
					<div className={`absolute ${ITEMS[0].levelClassName} left-0 top-0 w-1 h-2`} />
					<div className={`absolute ${ITEMS[0].levelClassName} right-0 top-0 w-2 h-1`} />
					<div className={`absolute ${ITEMS[0].levelClassName} right-0 top-0 w-1 h-2`} />
					<Image src={ITEMS[0].img} width={64} height={64} />
					<div className={`absolute ${ITEMS[0].levelClassName} left-0 bottom-0 w-2 h-1`} />
					<div className={`absolute ${ITEMS[0].levelClassName} left-0 bottom-0 w-1 h-2`} />
					<div className={`absolute ${ITEMS[0].levelClassName} right-0 bottom-0 w-2 h-1`} />
					<div className={`absolute ${ITEMS[0].levelClassName} right-0 bottom-0 w-1 h-2`} />
				</div>
				<div className={'text-left flex flex-col py-0.5'}>
					<p className={'text-xs'}>{ITEMS[0].name}</p>
				</div>
				<div className={'tooltiptext invisible group-hover:visible bg-white dark:bg-dark-600 border-4 border-black dark:border-dark-100'}>
					<div className={'p-4'}>
						<p className={'text-sx mb-2'}>{ITEMS[0].level}</p>
						<p className={'text-megaxs mt-4 text-gray-darker dark:text-white dark:text-opacity-60'}>{ITEMS[0].description}</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<section className={'mt-24 md:mt-12'}>
			<div className={'flex flex-col max-w-screen-lg w-full mx-auto'}>
				<h1 className={'text-black dark:text-white text-base'}>{'CODEX - ITEMS'}</h1>
				<div className={'w-full h-1 bg-black dark:bg-dark-100 mt-4 mb-10'}/>

				<h2 className={'text-black dark:text-white text-xs mb-6'}>{'The Cellar'}</h2>
				<div className={'w-full grid grid-cols-1 md:grid-cols-4 gap-6'}>
					{renderTheCellarLoot()}
				</div>

				<h2 className={'text-black dark:text-white text-xs mt-24 mb-6'}>{'The Forest'}</h2>
				<div className={'w-full grid grid-cols-1 md:grid-cols-4 gap-6'}>
					{renderTheForestLoot()}
				</div>

				<div className={'absolute bg-items-uncommon left-0 top-0 w-0 h-0 bg-opacity-0'} />
				<div className={'absolute bg-items-rare left-0 top-0 w-0 h-0 bg-opacity-0'} />
				<div className={'absolute bg-items-epic left-0 top-0 w-0 h-0 bg-opacity-0'} />
				<div className={'absolute bg-items-legendary left-0 top-0 w-0 h-0 bg-opacity-0'} />
				<div className={'absolute bg-items-relic left-0 top-0 w-0 h-0 bg-opacity-0'} />

			</div>
		</section>
	);
}

export default Index;
