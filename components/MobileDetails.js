import	React				from	'react';
import	useRarity			from	'contexts/useRarity';
import	OverviewAttributes	from	'components/layout/AdventurerAttributes';
import	OverviewSkills		from	'components/layout/AdventurerSkills';
import	OverviewFeats		from	'components/layout/AdventurerFeats';
import	OverviewInventory	from	'components/layout/AdventurerInventory';
import	OverviewProfession	from	'components/layout/AdventurerProfession';
import	Section				from	'components/layout/Section';

function	Index({tab}) {
	const	{currentAdventurer} = useRarity();

	return (
		<div className={'text-plain'}>
			{tab === 0 ? <OverviewAttributes adventurer={currentAdventurer} /> : null}
			{tab === 1 ? <OverviewSkills adventurer={currentAdventurer} /> : null}
			{tab === 2 ? <OverviewFeats adventurer={currentAdventurer} /> : null}
			{tab === 3 ? <OverviewProfession adventurer={currentAdventurer} /> : null}
			{tab === 4 ? <OverviewInventory adventurer={currentAdventurer} /> : null}
		</div>
	);
}


function	Wrapper() {
	return (
		<div className={'mt-4'}>
			<Section
				title={'Your adventurer'}
				tabs={['Attributes', 'Skills', 'Feat', 'Jobs', 'Inventory']}>
				<Index />
			</Section>
		</div>
	);
}

export default Wrapper;
