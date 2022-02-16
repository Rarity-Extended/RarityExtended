import	React								from	'react';
import	useWeb3								from	'contexts/useWeb3';
import	useRarity							from	'contexts/useRarity';
import	{xpRequired}						from	'utils/libs/rarity';
import	{levelup}							from	'utils/actions/rarity_extended_farming';

function	ProfessionLevelProgress({adventurerID, farmType, name, level, xp}) {
	const	{provider} = useWeb3();
	const	{updateRarity} = useRarity();
	const	progress = Number(xp) / xpRequired(level + 1);

	function onLevelUp() {
		levelup({
			provider,
			tokenID: adventurerID,
			farmID: farmType,
			jobName: name
		}, ({error}) => {
			if (error) {return;}
			updateRarity(adventurerID);
		});
	}

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
		return (
			<div className={'mb-1 w-full'}>
				<div className={'flex flex-row justify-between items-center mb-1 w-full text-xs font-bold'}>
					<div className={'opacity-60'}>{`${name} level ${level}`}</div>
					<div
						onClick={onLevelUp}
						className={'font-bold animate-pulse cursor-pointer text-highlight'}>
						{'LEVEL-UP'}
					</div>
				</div>
				<div className={'w-full h-4'}>
					<div className={'flex overflow-hidden relative w-full h-2 bg-600'}>
						<div
							className={'absolute inset-y-0 left-0 h-2 bg-highlight'}
							style={{width: '100%'}} />
					</div>
				</div>
			</div>
		);
	}
}

function	OverviewProfession({adventurer}) {
	return (
		<div className={'flex flex-col items-center mt-auto w-full'}>
			<ProfessionLevelProgress
				adventurerID={adventurer.tokenID}
				farmType={process.env.RARITY_EXTENDED_FARM_TYPE_WOOD}
				name={'Woodcutter'}
				level={adventurer?.professions?.wood?.level || 0}
				xp={adventurer?.professions?.wood?.xp || 0} />
			<ProfessionLevelProgress
				adventurerID={adventurer.tokenID}
				farmType={process.env.RARITY_EXTENDED_FARM_TYPE_ORE}
				name={'Miner'}
				level={adventurer?.professions?.ore?.level || 0}
				xp={adventurer?.professions?.ore?.xp || 0} />
		</div>
	);
}

export default OverviewProfession;