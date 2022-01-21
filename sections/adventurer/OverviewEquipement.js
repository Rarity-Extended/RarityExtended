import	React					from	'react';
import	Image					from	'next/image';
import	toast					from	'react-hot-toast';
import	dayjs					from	'dayjs';
import	relativeTime			from	'dayjs/plugin/relativeTime';
import	useUI					from	'contexts/useUI';
import	useRarity				from	'contexts/useRarity';
import	IconHelmet				from	'components/icons/IconHelmet';
import	IconGloves				from	'components/icons/IconGloves';
import	IconArmor				from	'components/icons/IconArmor';
import	IconBoots				from	'components/icons/IconBoots';
import	IconWeapon				from	'components/icons/IconWeapon';
import	IconNecklace			from	'components/icons/IconNecklace';
import	IconRing				from	'components/icons/IconRing';
import	* as actions			from	'utils/actions';
import	{xpRequired}			from	'utils/libs/rarity';
import	CLASSES					from	'utils/codex/core/classes';

dayjs.extend(relativeTime);

function	OverviewEquipement({adventurer, provider, chainTime, raritySkin}) {
	const	{updateRarity} = useRarity();
	const	{raritySkins} = useUI();
	const	[name, set_name] = React.useState(adventurer.name || adventurer.tokenID);
	const	canAdventure = !dayjs(new Date(adventurer.log * 1000)).isAfter(dayjs(new Date(chainTime * 1000)));

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
				<div
					onClick={onLevelUp}
					className={'bg-gray-principal flex flex-center text-center px-4 py-2 mt-4 w-full cursor-pointer dark:bg-tag-warning hover:dark:bg-tag-warningDarker hover:bg-gray-secondary text-black font-bold'}>
					<p className={'font-story text-sm select-none normal-case'}>{'Level-Up'}</p>
				</div>
			);
		}
		if (canAdventure) {
			return (
				<div
					onClick={onClaimXP}
					className={'bg-gray-principal flex flex-center text-center px-4 py-2 mt-4 w-full cursor-pointer dark:bg-tag-warning hover:dark:bg-tag-warningDarker hover:bg-gray-secondary text-black font-bold'}>
					<p className={'font-story text-sm select-none normal-case'}>{'Claim XP'}</p>
				</div>
			);
		}
		if (adventurer?.gold?.claimable > 0) {
			return (
				<div
					onClick={onClaimGold}
					className={'bg-gray-principal flex flex-center text-center px-4 py-2 mt-4 w-full cursor-pointer dark:bg-tag-warning hover:dark:bg-tag-warningDarker hover:bg-gray-secondary text-black font-bold'}>
					<p className={'font-story text-sm select-none normal-case'}>{'Claim XP'}</p>
				</div>
			);
		}
		return (
			<div className={'bg-gray-principal flex flex-center text-center px-4 py-2 mt-4 w-full dark:bg-dark-600 text-plain cursor-not-allowed opacity-40'}>
				<p className={'font-story text-sm select-none normal-case'}>
					{`Ready ${dayjs(new Date(adventurer.log * 1000)).from(dayjs(new Date(chainTime * 1000)))}`}
				</p>
			</div>
		);
	}

	function	renderName() {
		const isSameName = (name && (name !== (adventurer.name || adventurer.tokenID)));
		return (
			<div className={'flex flex-row items-center text-center w-full relative px-4'}>
				<input
					value={name}
					onChange={(e) => set_name(e.target.value)}
					placeholder={adventurer.name || adventurer.tokenID}
					className={'bg-opacity-0 bg-white focus:outline-none pl-1 relative uppercase w-full text-center'} />
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
		<div>
			<div className={'flex flex-row'} style={{width: 384}}>
				<div className={'grid grid-cols-1 ml-auto gap-y-4 w-18'}>
					<div className={'w-18 box-darker flex flex-center aspect-1'}>
						<IconHelmet className={'text-400 h-12 w-12'} />
					</div>
					<div className={'w-18 box-darker flex flex-center aspect-1'}>
						<IconGloves className={'text-400 h-12 w-12'} />
					</div>
					<div className={'w-18 box-darker flex flex-center aspect-1'}>
						<IconArmor className={'text-400 h-12 w-12'} />
					</div>
					<div className={'w-18 box-darker flex flex-center aspect-1'}>
						<IconBoots className={'text-400 h-12 w-12'} />
					</div>
				</div>
				<div className={'flex justify-between items-center w-60 flex-col pt-4 pb-8'}>
					<div className={'text-center w-full flex flex-col px-4 items-center'}>
						{renderName()}
						{/* <p className={'text-plain dark:text-opacity-70 font-bold text-xl font-story text-center'}>
							{adventurer.name || adventurer.tokenID}
						</p> */}
						<p className={'text-black dark:text-dark-100 text-sm font-story mb-4'}>
							{`${CLASSES[adventurer.class].name} level ${adventurer.level}`}
						</p>
					</div>
					<Image src={raritySkins ? raritySkin : adventurer?.skin} width={180} height={180} />
					<div className={'px-4'}>
						{renderAction()}
					</div>
				</div>
				<div className={'grid grid-cols-1 gap-y-4 w-18'}>
					<div className={'w-18 box-darker flex flex-center aspect-1'}>
						<IconWeapon className={'text-400 h-12 w-12'} />
					</div>
					<div className={'w-18 box-darker flex flex-center aspect-1'}>
						<IconWeapon className={'text-400 h-12 w-12'} />
					</div>
					<div className={'w-18 box-darker flex flex-center aspect-1'}>
						<IconNecklace className={'text-400 h-12 w-12'} />
					</div>
					<div className={'w-18 box-darker flex flex-center aspect-1'}>
						<IconRing className={'text-400 h-12 w-12'} />
					</div>
				</div>
			</div>
		</div>
	);
}


export default OverviewEquipement;