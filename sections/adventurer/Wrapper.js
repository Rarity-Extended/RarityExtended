import	React				from	'react';
import	IconBag				from	'components/icons/IconBag';
import	OverviewAttributes	from	'sections/adventurer/OverviewAttributes';
import	OverviewSkills		from	'sections/adventurer/OverviewSkills';
import	OverviewFeats		from	'sections/adventurer/OverviewFeats';
import	OverviewEquipement	from	'sections/adventurer/OverviewEquipement';

function	Wrapper({adventurer, provider, chainTime, updateRarity}) {
	const	[tab, set_tab] = React.useState(0);
	return (
		<div className={'box p-4 flex flex-row space-x-16'}>
			<OverviewEquipement adventurer={adventurer} provider={provider} chainTime={chainTime} updateRarity={updateRarity} />
			<div className={'w-full'}>
				<div className={'flex flex-row items-center font-story mb-4 normal-case border-b-2 dark:border-b-dark-300 -mt-4'}>
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
						className={`ml-auto p-2 pr-0 text-plain text-sm transition-opacity hover:opacity-100 ${tab === 3 ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
						<IconBag className={'w-5 h-5'}/>
					</p>
				</div>
				{tab === 0 ? <OverviewAttributes adventurer={adventurer} /> : null}
				{tab === 1 ? <OverviewSkills adventurer={adventurer} /> : null}
				{tab === 2 ? <OverviewFeats adventurer={adventurer} /> : null}
			</div>
			
		</div>
	);
}


export default Wrapper;