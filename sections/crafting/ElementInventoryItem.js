import	React					from	'react';
import	Image					from	'next/image';
import	useWeb3					from	'contexts/useWeb3';
import	useRarity				from	'contexts/useRarity';
import	{isAdventurerApproved, isERC20ApprovedUint}	from	'utils/actions/utils';

function	IconWarningApprove() {
	return (
		<svg className={'w-6 h-6 text-black dark:text-white opacity-60'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M3 3h16v2H5v14h14v2H3V3zm18 0h-2v18h2V3zM11 15h2v2h-2v-2zm2-8h-2v6h2V7z'} fill={'currentColor'}/> </svg>
	);
}

function	ElementInventoryItem({item, amount, craftingContractAddress, craftingContractID, onApprove}) {
	const	{currentAdventurer} = useRarity();
	const	{provider} = useWeb3();
	const	[isApproved, set_isApproved] = React.useState(false);

	const	checkCraftingStatus = React.useCallback(async () => {
		let	_isApproved = false;
		if(item.address === process.env.RARITY_EXTENDED_XP) {
			_isApproved = await isAdventurerApproved({
				provider,
				spender: craftingContractAddress,
				adventurerID: currentAdventurer?.tokenID
			});
		} else {
			_isApproved = await isERC20ApprovedUint({
				provider,
				contractAddress: item.address,
				spender: craftingContractID,
				adventurerID: currentAdventurer?.tokenID
			});
		}
		set_isApproved(_isApproved);
	}, [currentAdventurer]);
	React.useEffect(() => checkCraftingStatus(), [checkCraftingStatus]);

	return (
		<div
			key={item.name}
			className={`rounded-md bg-gray-lighter dark:bg-dark-400 flex justify-center items-center flex-col p-4 relative group ${amount === 0 ? 'opacity-40' : ''}`}>
			{isApproved ? null : <div className={'absolute top-4 right-4'}>
				<IconWarningApprove />
			</div>}
			{isApproved ? null : <div
				onClick={onApprove}
				className={'absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center z-10 cursor-pointer rounded-md invisible group-hover:visible'}>
				<p className={'text-white'}>{'Approve'}</p>
			</div>}
			<Image src={item.img} width={64} height={64} />
			<div className={'mx-6 bg-gray-principal dark:bg-dark-600 flex justify-center text-center items-center px-4 py-2 mt-2'}>
				<p className={'text-black dark:text-white font-story text-sm normal-case'}>{`${item.name} (x${amount})`}</p>
			</div>
		</div>
	);
}

export default ElementInventoryItem;