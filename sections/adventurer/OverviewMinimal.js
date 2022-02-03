import	React					from	'react';
import	Image					from	'next/image';
import	toast					from	'react-hot-toast';
import	dayjs					from	'dayjs';
import	relativeTime			from	'dayjs/plugin/relativeTime';
import	useUI					from	'contexts/useUI';
import	useRarity				from	'contexts/useRarity';
import	* as actions			from	'utils/actions';
import	{xpRequired}			from	'utils/libs/rarity';
import	CLASSES					from	'utils/codex/core/classes';

dayjs.extend(relativeTime);

function	OverviewMinimal({adventurer, provider, raritySkin}) {
	const	{updateRarity} = useRarity();
	const	{raritySkins} = useUI();
	const	[name, set_name] = React.useState(adventurer.name || adventurer.tokenID);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	React.useEffect(() => set_name(adventurer.name || adventurer.tokenID), [adventurer.tokenID]);

	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	Claim the daily XP for a specific adventurer. This can be called once a day for each
	**	adventurer.
	**********************************************************************************************/
	function	onClaimXP() {
		actions.goAdventure({
			loader: 'Claiming XP...',
			provider,
			contractAddress: process.env.RARITY_ADDR,
			tokenID: adventurer.tokenID,
		}, ({error, data}) => {
			if (error)
				return console.error(error);
			updateRarity(data);
		});
	}

	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	Try to level up an adventurer. This can be called once the adventurer has reached the
	**	required XP.
	**********************************************************************************************/
	function	onLevelUp() {
		actions.levelUp({provider, tokenID: adventurer.tokenID}, ({error, data}) => {
			if (error)
				return console.error(error);
			updateRarity(data);
		});
	}

	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	Try to claim the gold for an adventurer. In order to claim some gold, the adventurer must
	**	have reached some claimable gold.
	**********************************************************************************************/
	function	onClaimGold() {
		actions.claimGold({provider, tokenID: adventurer.tokenID}, ({error, data}) => {
			if (error)
				return console.error(error);
			updateRarity(data);
		});
	}

	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	Render the action under the character skin. The actions are, in order:
	**	- Level up
	**	- Claim XP
	**	- Claim Gold
	**********************************************************************************************/
	function	renderAction() {
		if (adventurer.xp >= (xpRequired(adventurer.level))) {
			return (
				<button
					onClick={onLevelUp}
					className={'flex mt-4 w-full flex-center button-highlight'}>
					<p className={' text-sm select-none'}>{'Level-Up'}</p>
				</button>
			);
		}
		if (adventurer.canAdventure) {
			return (
				<button
					onClick={onClaimXP}
					className={'flex mt-4 w-full flex-center button-highlight'}>
					<p className={' text-sm select-none'}>{'Claim XP'}</p>
				</button>
			);
		}
		if (adventurer?.gold?.claimable > 0) {
			return (
				<button
					onClick={onClaimGold}
					className={'flex mt-4 w-full flex-center button-highlight'}>
					<p className={' text-sm select-none'}>{'Claim XP'}</p>
				</button>
			);
		}
		return (
			<button disabled className={'flex mt-4 w-full flex-center button-highlight'}>
				<p className={'text-sm select-none'}>
					{`Ready ${adventurer.nextAdventure}`}
				</p>
			</button>
		);
	}

	function	renderName() {
		const isSameName = (name && (name !== (adventurer.name || adventurer.tokenID)));
		return (
			<div className={'flex relative flex-row items-center px-4 w-full text-center'}>
				<input
					value={name}
					onChange={(e) => set_name(e.target.value)}
					placeholder={adventurer.name || adventurer.tokenID}
					className={'relative pl-1 w-full text-center uppercase bg-white bg-opacity-0 focus:outline-none text-plain'} />
				<div
					onClick={() => {
						if (isSameName) {
							actions.setName(
								{provider, name, tokenID: adventurer.tokenID},
								({error}) => console.error(error),
								(_toast) => {
									updateRarity(adventurer.tokenID);
									toast.dismiss(_toast);
									toast.success(`You can now call ${adventurer.tokenID}: ${name}!`);
								}
							);
						}
					}}
					className={`p-1 -m-1 transition-all absolute right-3 opacity-0 w-0 ${isSameName ? 'opacity-100 cursor-pointer' : 'group-hover:opacity-100 cursor-default'}`}>
					<svg width={'14'} height={'14'} viewBox={'0 0 24 24'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
						<rect x={'6'} y={'16'} width={'4'} height={'4'} fill={'currentcolor'}/>
						<rect x={'2'} y={'12'} width={'4'} height={'4'} fill={'currentcolor'}/>
						<rect x={'14'} y={'8'} width={'4'} height={'4'} fill={'currentcolor'}/>
						<rect x={'18'} y={'4'} width={'4'} height={'4'} fill={'currentcolor'}/>
						<rect x={'10'} y={'12'} width={'4'} height={'4'} fill={'currentcolor'}/>
					</svg>
				</div>
			</div>
		);
	}

	return (
		<div className={'flex flex-row justify-between items-center mx-auto w-full'}>
			<div className={'w-36'}>
				<Image src={raritySkins ? raritySkin : adventurer?.skin} width={144} height={144} />
			</div>
			<div>
				<div className={'flex flex-col items-center px-4 w-full text-center'}>
					{renderName()}
					<p className={'mb-4 text-sm text-black dark:text-dark-100'}>
						{`${CLASSES[adventurer.class].name} level ${adventurer.level}`}
					</p>
				</div>
				<div className={'px-4'}>
					{renderAction()}
				</div>
			</div>
		</div>
	);
}


export default OverviewMinimal;