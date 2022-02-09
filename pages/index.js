import	React					from	'react';
import	Image					from	'next/image';
import	Link					from	'next/link';
import	Template				from	'components/templates/Adventurer';
import	RarityCareSystem		from	'components/RarityCareSystem';
import	MobileIndex				from	'components/MobileIndex';
import	AdventurerDetails		from	'sections/adventurer/WrapperMinimal';
import	useLocalStorage			from	'hook/useLocalStorage';
import	useRarity				from	'contexts/useRarity';

function	NewAdventurer() {
	return (
		<div className={'flex relative flex-col justify-between items-center p-4 w-full box'}>
			<div className={'text-center'}>
				<p className={'text-xl font-bold text-center text-plain dark:text-opacity-70'}>
					{'Recruit'}
				</p>
				<p className={'mb-4 text-sm text-black dark:text-dark-100'}>
					{'Unknown'}
				</p>
			</div>
			<div className={'flex justify-center items-end w-40 h-40 brightness-0'}>
				<Image src={'/classes/front/placeholder.svg'} width={140} height={140} />
			</div>
			<div className={'px-4'}>
				<Link href={'/recruit#content'}>
					<button className={'mt-4 button-highlight-outline'}>
						<p>{'Hire Adventurer'}</p>
					</button>
				</Link>
			</div>
		</div>
	);
}

function	Index() {
	const	{rarities, set_currentAdventurer, skins} = useRarity();
	const	[favoritesAdventurers, set_favoritesAdventurers] = useLocalStorage('favorites', []);

	return (
		<>
			<div className={'block md:hidden'}>
				<MobileIndex />
			</div>
			<div className={'hidden md:block'}>
				<RarityCareSystem />
				<div className={'col-span-12 mt-4 md:mt-8'}>
					<div className={'grid grid-cols-1 gap-2 md:grid-cols-4 md:gap-4'}>
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
			</div>
		</>
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
