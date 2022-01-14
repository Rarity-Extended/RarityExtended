import	React				from	'react';
import	AdventurerDetails	from	'sections/adventurer/Wrapper';
import	useWeb3				from	'contexts/useWeb3';
import	useRarity			from	'contexts/useRarity';

function	Index() {
	const	{provider, chainTime} = useWeb3();
	const	{rarities, updateRarity} = useRarity();

	return (
		<section className={'mt-24 md:mt-12 max-w-screen md:max-w-screen-xl mx-auto'}>
			<div className={'mb-10'}>
				<h1 className={'text-plain font-story text-4xl mb-4'}>
					{'Your Party'}
				</h1>
				<div className={'flex flex-col'}>
					<p className={'text-plain font-story text-base max-w-full md:max-w-4xl'}>
						{'A feat represents a talent or an area of expertise that gives a character special capabilities. It embodies training, experience, and abilities beyond what a class provides. Some are inherent to the class, while others can be learned.'}
					</p>
					<p className={'text-plain font-story text-base max-w-full md:max-w-4xl mt-2'}>
						{'You have '}
						<span className={'text-tag-warning font-bold'}>{'2 left'}</span>
						{'.'}
					</p>
				</div>
			</div>
				
			<div className={'grid grid-cols-12 gap-x-16 max-w-full'}>
				<div className={'col-span-12'}>
					<div className={'grid grid-cols-1 md:grid-cols-1 gap-4'}>
						{([...Object.values(rarities || {})] || [])	
							.map((adventurer, i) => {
								return (
									<AdventurerDetails
										key={i}
										provider={provider}
										chainTime={chainTime}
										adventurer={adventurer}
										updateRarity={updateRarity}
									/>
								);
							})}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Index;
