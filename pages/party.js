import	React					from	'react';
import	Image					from	'next/image';
import	Link					from	'next/link';
import	Template				from	'components/templates/Adventurer';
import	RarityCareSystem		from	'components/RarityCareSystem';
import	AdventurerDetails		from	'sections/adventurer/WrapperMinimal';
import	useLocalStorage			from	'hook/useLocalStorage';
import	useRarity				from	'contexts/useRarity';

function	NewAdventurer() {
	return (
		<div className={'box flex justify-between items-center w-full flex-col p-4 relative'}>
			<div className={'text-center'}>
				<p className={'text-plain dark:text-opacity-70 font-bold text-xl font-story text-center'}>
					{'Recruit'}
				</p>
				<p className={'text-black dark:text-dark-100 text-sm font-story mb-4'}>
					{'Unknown'}
				</p>
			</div>
			<div className={'w-40 h-40 filter brightness-0 flex justify-center items-end'}>
				<Image src={'/classes/front/placeholder.svg'} width={140} height={140} />
			</div>
			<div className={'px-4'}>
				<Link href={'/recruit#content'}>
					<div className={'bg-600 hover-bg-900 flex flex-center text-center px-4 py-2 mt-4 w-full text-plain cursor-pointer opacity-60'}>
						<p className={'font-story text-sm select-none normal-case'}>{'Hire Adventurer'}</p>
					</div>
				</Link>
			</div>
		</div>
	);
}

function	Index() {
	const	{rarities, set_currentAdventurer, skins} = useRarity();
	const	[favoritesAdventurers, set_favoritesAdventurers] = useLocalStorage('favorites', []);

	return (
		<Template>
			<RarityCareSystem />
			<div className={'col-span-12 mt-4 md:mt-8'}>
				<div className={'grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4'}>
					{([...Object.values(rarities || {})] || [])
						.sort((a, b) => {
							if (favoritesAdventurers.includes(a.tokenID))
								return -1;
							if (favoritesAdventurers.includes(b.tokenID))
								return 1;
							return 0;
						})
						.map((adventurer, i) => {
							return (
								<AdventurerDetails
									key={i}
									adventurer={adventurer}
									set_currentAdventurer={set_currentAdventurer}
									favoritesAdventurers={favoritesAdventurers}
									set_favoritesAdventurers={set_favoritesAdventurers}
									raritySkin={skins[adventurer?.tokenID] || adventurer?.skin}
								/>
							);
						})}
					<NewAdventurer />
				</div>
			</div>
		</Template>
	);
}

export default Index;
