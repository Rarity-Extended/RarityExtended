/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday September 21st 2021
**	@Filename:				items.js
******************************************************************************/

import	React						from	'react';
import	Image						from	'next/image';
import	useRarity					from	'contexts/useRarity';
import	Box							from	'components/Box';

function	SectionItem({item}) {
	function	renderWeaponChildren() {
		return (
			<>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'NAME'}</p>
					<p className={'text-sx text-black dark:text-white'}>{item?.name}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'DAMAGE'}</p>
					<p className={'text-sx text-black dark:text-white'}>{item?.damage || 0}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'DMG TYPE'}</p>
					<p className={'text-sx text-black dark:text-white'}>{item?.damageType}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'ENCUMBRANCE'}</p>
					<p className={'text-sx text-black dark:text-white'}>{item?.encumbrance}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'PROFICIENCY'}</p>
					<p className={'text-sx text-black dark:text-white'}>{item?.proficiency}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'CRITICAL'}</p>
					<p className={'text-sx text-black dark:text-white'}>{item?.critical_modifier ? `${`${(20+item?.critical_modifier)}-20`}/x${item?.critical || 0}` : `x${item?.critical || 0}`}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'RANGE'}</p>
					<p className={'text-sx text-black dark:text-white'}>{item?.range_increment || 0}</p>
				</div>

				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'WEIGHT'}</p>
					<p className={'text-sx text-black dark:text-white'}>{item?.weight || 0}</p>
				</div>
			</>
		);
	}
	function	renderArmorChildren() {
		return (
			<>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'NAME'}</p>
					<p className={'text-sx text-black dark:text-white'}>{item?.name}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'ARMOR'}</p>
					<p className={'text-sx text-black dark:text-white'}>{item?.armor_bonus}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'ARMOR TYPE'}</p>
					<p className={'text-sx text-black dark:text-white'}>{item?.proficiency}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'MAX DEX BONUS'}</p>
					<p className={'text-sx text-black dark:text-white'}>{item?.max_dex_bonus}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'PENALTY'}</p>
					<p className={'text-sx text-black dark:text-white'}>{item?.penalty}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'SPELL FAILURE'}</p>
					<p className={'text-sx text-black dark:text-white'}>{item?.spell_failure}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'WEIGHT'}</p>
					<p className={'text-sx text-black dark:text-white'}>{item?.weight || 0}</p>
				</div>
			</>
		);
	}
	function	renderGoodChildren() {
		return (
			<>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'NAME'}</p>
					<p className={'text-sx text-black dark:text-white'}>{item?.name}</p>
				</div>
				<div>
					<p className={'text-megaxs text-black dark:text-dark-100 text-opacity-50 pb-2'}>{'WEIGHT'}</p>
					<p className={'text-sx text-black dark:text-white'}>{item?.weight || 0}</p>
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
					<div className={'grid grid-cols-3 gap-x-4 gap-y-6'}>
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
	const	{inventory} = useRarity();

	function	renderInventory() {
		return Object.values(inventory).map((item, i) => (
			<SectionItem key={`${item.name}_${i}`} item={item} />
		));
	}

	return (
		<section className={'mt-24 md:mt-12'}>
			<div className={'flex flex-col max-w-screen-lg w-full mx-auto'}>
				<h1 className={'text-black dark:text-white text-base mb-12'}>{'Inventory'}</h1>
				<div className={'w-full grid grid-cols-1 gap-6'}>
					{renderInventory()}
				</div>
			</div>
		</section>
	);
}

export default Index;
