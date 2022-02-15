import	React								from	'react';
import	{Contract}							from	'ethcall';
import	useWeb3								from	'contexts/useWeb3';
import	useRarity							from	'contexts/useRarity';
import	performBatchedUpdates				from	'utils/performBatchedUpdates';
import	{newEthCallProvider}				from	'utils';
import	{xpRequired}						from	'utils/libs/rarity';
import	{RARITY_EXTENDEDN_FARM_CORE_ABI} 	from	'utils/abi/mixed.min.abi';

function	ProfessionLevelProgress({name, level, xp}) {
	const	progress = Number(xp) / xpRequired(level + 1);

	if (progress < 1) {
		return (
			<div className={'mb-1 w-full'}>
				<div className={'flex flex-row justify-between items-center mb-1 w-full text-xs font-bold opacity-60'}>
					<div>{`${name} level ${level}`}</div>
					<div>{`${Number(xp)} / ${xpRequired(level + 1)}`}</div>
				</div>
				<div className={'w-full h-4'}>
					<div className={'flex overflow-hidden relative w-full h-2 bg-600'}>
						<div
							className={'absolute inset-y-0 left-0 h-2 bg-highlight'}
							style={{width: `${progress * 100}%`}} />
					</div>
				</div>
			</div>
		);
	} else {
		<div className={'mb-1 w-full'}>
			<div className={'flex flex-row justify-between items-center mb-1 w-full text-xs font-bold'}>
				<div className={'opacity-60'}>{`${name} level ${level}`}</div>
				<div className={'font-bold animate-pulse cursor-pointer text-highlight'}>{'LEVEL-UP'}</div>
			</div>
			<div className={'w-full h-4'}>
				<div className={'flex overflow-hidden relative w-full h-2 bg-600'}>
					<div
						className={'absolute inset-y-0 left-0 h-2 bg-highlight'}
						style={{width: '100%'}} />
				</div>
			</div>
		</div>;
	}
}

function	OverviewProfession({adventurer}) {
	return (
		<div className={'flex flex-col items-center mt-auto w-full'}>
			<ProfessionLevelProgress name={'Woodcutter'} level={adventurer?.professions?.wood?.level || 0} xp={adventurer?.professions?.wood?.xp || 0} />
			<ProfessionLevelProgress name={'Miner'} level={adventurer?.professions?.ore?.level || 0} xp={adventurer?.professions?.ore?.xp || 0} />
		</div>
	);
}

export default OverviewProfession;