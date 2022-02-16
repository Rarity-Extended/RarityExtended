import	React				from	'react';
import	useWeb3				from	'contexts/useWeb3';
import	useRarity			from	'contexts/useRarity';
import	OverviewAttributes	from	'components/layout/AdventurerAttributes';
import	OverviewSkills		from	'components/layout/AdventurerSkills';
import	OverviewFeats		from	'components/layout/AdventurerFeats';
import	OverviewInventory	from	'components/layout/AdventurerInventory';
import	OverviewProfession	from	'components/layout/AdventurerProfession';
import	OverviewEquipement	from	'components/layout/AdventurerEquipement';
import	OverviewMinimal		from	'components/layout/AdventurerMinimal';

function	Wrapper({media}) {
	const	{provider} = useWeb3();
	const	{currentAdventurer, skins} = useRarity();
	const	[tab, set_tab] = React.useState(0);

	if (media === 'sm') {
		return (
			<div className={'flex relative flex-row p-4 box'}>
				<OverviewMinimal
					adventurer={currentAdventurer}
					provider={provider}
					raritySkin={skins[currentAdventurer?.tokenID] || currentAdventurer?.skin} />
			</div>
		);	
	}
	return (
		<div className={'flex relative flex-row p-4 space-x-16 box'}>
			<OverviewEquipement
				provider={provider}
				raritySkin={skins[currentAdventurer?.tokenID] || currentAdventurer?.skin} />
			<div className={'relative w-full'}>
				<div className={'flex flex-row items-center -mt-4 mb-4 border-b-2 dark:border-b-dark-300'}>
					<p
						onClick={() => set_tab(0)}
						className={`p-4 pl-0 text-plain text-sm transition-opacity hover:opacity-100 ${tab === 0 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Attributes'}
					</p>
					<p
						onClick={() => set_tab(1)}
						className={`p-4 text-plain text-sm transition-opacity hover:opacity-100 ${tab === 1 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Skills'}
					</p>
					<p
						onClick={() => set_tab(2)} 
						className={`p-4 text-plain text-sm transition-opacity hover:opacity-100 ${tab === 2 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Feat'}
					</p>
					<p
						onClick={() => set_tab(3)}
						className={`p-4 text-sm transition-opacity hover:opacity-100 relative ${tab === 3 ? 'text-plain' : 'text-plain-20 cursor-pointer'}`}>
						{'Profession'}
						{currentAdventurer?.professions?.canLevelUp ?
							<span className={'absolute top-3 right-1 '}>
								<span className={'flex w-2 h-2'}>
									<span className={'inline-flex absolute w-full h-full rounded-full opacity-75 animate-ping bg-highlight'}></span>
									<span className={'inline-flex relative w-2 h-2 rounded-full bg-highlight'}></span>
								</span>
							</span> : null}
					</p>
					<p
						onClick={() => set_tab(4)} 
						className={`p-4 text-plain text-sm transition-opacity hover:opacity-100 ${tab === 4 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						{'Inventory'}
					</p>
				</div>
				{tab === 0 ? <OverviewAttributes adventurer={currentAdventurer} /> : null}
				{tab === 1 ? <OverviewSkills adventurer={currentAdventurer} /> : null}
				{tab === 2 ? <OverviewFeats adventurer={currentAdventurer} /> : null}
				{tab === 3 ? <OverviewProfession adventurer={currentAdventurer} /> : null}
				{tab === 4 ? <OverviewInventory adventurer={currentAdventurer} /> : null}
			</div>
			
		</div>
	);
}


export default Wrapper;