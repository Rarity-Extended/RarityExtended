import	React				from	'react';
import	Image				from	'next/image';
import	useWeb3				from	'contexts/useWeb3';
import	useRarity			from	'contexts/useRarity';
import	useInventory		from	'contexts/useInventory';
import	{buyBasicSet}		from	'utils/actions/rarity_extended_equipment';
import	Tooltip				from	'components/Tooltip';
import	ItemAttributes		from	'components/ItemAttributes';

const RowBasicSets = React.memo(function RowBasicSets({set, darker}) {
	const	{provider} = useWeb3();
	const	{currentAdventurer} = useRarity();
	const	{updateInventory} = useInventory();
	const	[txStatus, set_txStatus] = React.useState({none: true, isPending: false, isSuccess: false, isError: false});

	function	onBuySet() {
		if (!txStatus.none) {
			return;
		}
		set_txStatus({none: false, isPending: true, isSuccess: false, isError: false});
		buyBasicSet({
			provider,
			tokenID: currentAdventurer.tokenID,
			setID: set.id,
			setName: set.name
		}, ({error}) => {
			if (error) {
				set_txStatus({none: false, isPending: false, isSuccess: false, isError: true});
				setTimeout(() => set_txStatus({none: true, isPending: false, isSuccess: false, isError: false}), 5000);
				return;
			}
			set_txStatus({none: false, isPending: false, isSuccess: true, isError: false});
			updateInventory(currentAdventurer.tokenID);
		});
	}

	return (
		<div className={'grid grid-cols-7 gap-x-0 gap-y-4 p-4 md:gap-x-8 md:gap-y-0'}>
			<div className={'flex flex-row col-span-7 md:col-span-2'}>
				<div className={`flex w-20 min-w-20 h-20 ${darker ? 'box-darker' : 'bg-500 rounded-sm'} flex-center`}>
					<Image src={set.img} width={76} height={76} objectFit={'contain'} />
				</div>
				<div className={'flex flex-col ml-4 w-full'}>
					<p className={'-mt-0.5 mb-1 text-base font-bold text-plain'}>
						{set.name}
					</p>
					<p className={'text-sm text-plain-60'}>
						{'Price: 5 FTM'}
					</p>
				</div>
			</div>

			<div className={'flex col-span-7 pl-0 md:col-span-3 md:pl-8'}>
				<div className={'grid flex-row grid-cols-5 gap-2 space-x-0 md:flex md:space-x-2'}>
					{set.rewards.map((item, index) => (
						<div key={`${item.address}${index}`} className={''}>
							<div className={`group relative w-14 h-14 ${item?.address ? 'cursor-help' : 'cursor-auto'} ${darker ? 'box-darker' : 'bg-500 rounded-sm'} image-wrapper tooltip`}>
								{item?.address ? (
									<Image src={item.img} width={56} height={56} />
								) : null}
								{item?.address ? <Tooltip className={'pt-2 w-80'}> 
									{item.name}
									<ItemAttributes category={item.category} item={item} />
								</Tooltip> : null}
							</div>
						</div>
					))}
				</div>
			</div>

			<div className={'flex col-span-7 justify-center items-start md:col-span-2 md:justify-end'}>
				<div className={'flex flex-row w-full md:w-1/2'}>
					<button
						onClick={() => onBuySet(set.id, set.name)}
						disabled={!txStatus.none}
						className={'flex w-full flex-center button-highlight'}>
						<p>{'Buy'}</p>
					</button>
				</div>
			</div>
		</div>
	);
});

export default RowBasicSets;