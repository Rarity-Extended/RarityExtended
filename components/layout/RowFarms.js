import	React				from	'react';
import	Image				from	'next/image';
import	useWeb3				from	'contexts/useWeb3';
import	useInventory		from	'contexts/useInventory';
import	useRarity			from	'contexts/useRarity';
import	useClientEffect		from	'hooks/useClientEffect';
import	{unlock}			from	'utils/actions/rarity_extended_farming';

const RowFarms = React.memo(function RowFarms({farm, level}) {
	const	{provider} = useWeb3();
	const	{currentAdventurer, updateRarity} = useRarity();
	const	{inventory, updateInventory} = useInventory();
	const	[meetRequirements, set_meetRequirements] = React.useState(false);

	useClientEffect(() => {
		const	adventurerInventory = inventory?.[currentAdventurer.tokenID] || {};
		let		_meetAllRequirements = true;

		for (let index = 0; index < farm?.cost?.length || 0; index++) {
			const	item = farm?.cost[index];
			if (adventurerInventory?.[item.address]?.balance < item.amount) {
				_meetAllRequirements = false;
				break;
			}
		}
		set_meetRequirements(_meetAllRequirements);
	}, [inventory, currentAdventurer, farm]);

	function onUnlock() {
		unlock({
			provider,
			tokenID: currentAdventurer.tokenID,
			farm: farm.address,
			farmName: farm.name,
			farmCost: farm.cost
		}, ({error}) => {
			if (error) {
				return;
			}
			updateRarity(currentAdventurer.tokenID);
			updateInventory(currentAdventurer.tokenID);
		});
	}

	return (
		<div className={'grid grid-cols-7 gap-x-0 gap-y-4 p-4 md:gap-x-8 md:gap-y-0'}>
			<div className={'flex flex-row col-span-7 md:col-span-2'}>
				<div className={'flex w-20 min-w-20 h-20 bg-500 flex-center'}>
					<Image src={farm.src} width={64} height={64} objectFit={'contain'} />
				</div>
				<div className={'flex flex-col ml-4 w-full'}>
					<p className={'-mt-0.5 mb-1 text-base font-bold text-plain'}>
						{farm.name}
					</p>
					<p className={'text-sm text-plain-60'}>
						{`Tier: ${farm.tier}`}
					</p>
					<p className={'text-sm text-plain-60'}>
						{`Required level: ${farm.tier}`}
					</p>
				</div>
			</div>

			<div className={'flex col-span-7 pl-0 md:col-span-3 md:pl-8'}>
				<div className={'grid flex-row grid-cols-5 gap-2 space-x-0 md:flex md:space-x-2'}>
					{farm.cost.map(({name, src, amount}) => (
						<div key={name} className={''}>
							<div className={'relative p-2 w-14 h-14 bg-500 image-wrapper'}>
								<Image src={src} width={48} height={48} />
								<div className={'absolute right-1 bottom-1 text-sm'}>
									{`x${amount}`}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className={'flex col-span-7 justify-center items-start md:col-span-2 md:justify-end'}>
				<div className={'flex flex-row w-full md:w-1/2'}>
					<button
						onClick={() => !(level < farm.tier || !meetRequirements) ? onUnlock() : null}
						disabled={level < farm.tier || !meetRequirements}
						className={'flex w-full flex-center button-highlight'}>
						<p>{'Unlock'}</p>
					</button>
				</div>
			</div>
		</div>
	);
});

export default RowFarms;