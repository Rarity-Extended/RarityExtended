import	React					from	'react';
import	Image					from	'next/image';
import	Link					from	'next/link';
import	{useRouter}				from	'next/router';
import	toast					from	'react-hot-toast';
import	dayjs					from	'dayjs';
import	relativeTime			from	'dayjs/plugin/relativeTime';
import	useUI					from	'contexts/useUI';
import	useInventory			from	'contexts/useInventory';
import	useRarity				from	'contexts/useRarity';
import	IconHelmet				from	'components/icons/IconHelmet';
import	IconGloves				from	'components/icons/IconGloves';
import	IconArmor				from	'components/icons/IconArmor';
import	IconBoots				from	'components/icons/IconBoots';
import	IconWeapon				from	'components/icons/IconWeapon';
import	IconNecklace			from	'components/icons/IconNecklace';
import	IconRing				from	'components/icons/IconRing';
import	Tooltip					from	'components/Tooltip';
import	ItemAttributes			from	'components/ItemAttributes';
import	* as actions			from	'utils/actions';
import	{setName}				from	'utils/actions/rarity_extended_name';
import	{unequip}				from	'utils/actions/rarity_extended_equipements';
import	{xpRequired}			from	'utils/libs/rarity';
import	CLASSES					from	'utils/codex/core/classes';

dayjs.extend(relativeTime);

function	ItemWithTooltip({provider, currentAdventurer, updateInventory, item, slot, children}) {
	return (
		<div className={'group relative w-18 cursor-help tooltip'}>
			<div className={'aspect-1 flex w-18 transition-colors cursor-pointer box-darker flex-center image-wrapper text-400'}>
				{
					item !== undefined ?
						<>
							<Image src={item.img} width={64} height={64} />
							<Tooltip className={'top-0 left-full pl-2 w-80 cursor-auto'}> 
								{item.name}
								<ItemAttributes category={item.category} item={item} />
								<button
									onClick={() => {
										unequip({
											provider,
											tokenID: currentAdventurer.tokenID,
											itemName: item.name,
											slot
										}, ({error}) => {
											if (error) return;
											updateInventory(currentAdventurer.tokenID);
										});
									}}
									className={'flex mt-4 w-full flex-center button-outline'}>
									<p className={'select-none'}>{'Unequip'}</p>
								</button>
							</Tooltip>
						</>
						: children
				}
			</div>
		</div>
	);
}

function	OverviewEquipement({provider, raritySkin}) {
	const	router = useRouter();
	const	{updateRarity, currentAdventurer} = useRarity();
	const	{equipements, updateInventory} = useInventory();
	const	{raritySkins} = useUI();
	const	[name, set_name] = React.useState(currentAdventurer.name || currentAdventurer.tokenID);
	const	[pageSlot, set_pageSlot] = React.useState(-1);

	React.useLayoutEffect(() => {
		if (router?.query?.slot) {
			set_pageSlot(Number(router?.query?.slot));
		} else {
			set_pageSlot(-1);
		}
	}, [router]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	React.useLayoutEffect(() => set_name(currentAdventurer.name || currentAdventurer.tokenID), [currentAdventurer.tokenID]);

	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	Claim the daily XP for a specific adventurer. This can be called once a day for each
	**	adventurer.
	**********************************************************************************************/
	function	onClaimXP() {
		actions.goAdventure({
			loader: 'Claiming XP...',
			provider,
			contractAddress: process.env.RARITY_ADDR,
			tokenID: currentAdventurer.tokenID,
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
		actions.levelUp({provider, tokenID: currentAdventurer.tokenID}, ({error, data}) => {
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
		actions.claimGold({provider, tokenID: currentAdventurer.tokenID}, ({error, data}) => {
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
		if (currentAdventurer.xp >= (xpRequired(currentAdventurer.level))) {
			return (
				<button
					onClick={onLevelUp}
					className={'flex mt-4 w-full flex-center button-highlight'}>
					<p className={' text-sm select-none'}>{'Level-Up'}</p>
				</button>
			);
		}
		if (currentAdventurer.canAdventure) {
			return (
				<button
					onClick={onClaimXP}
					className={'flex mt-4 w-full flex-center button-highlight'}>
					<p className={' text-sm select-none'}>{'Claim XP'}</p>
				</button>
			);
		}
		if (currentAdventurer?.gold?.claimable > 0) {
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
				<p className={' text-sm select-none'}>
					{`Ready ${currentAdventurer.nextAdventure}`}
				</p>
			</button>
		);
	}

	function	renderName() {
		const isSameName = (name && (name !== (currentAdventurer.name || currentAdventurer.tokenID)));
		return (
			<div className={'flex relative flex-row items-center px-4 w-full text-center'}>
				<input
					value={name}
					onChange={(e) => set_name(e.target.value)}
					placeholder={currentAdventurer.name || currentAdventurer.tokenID}
					className={'relative pl-1 w-full text-center uppercase bg-white bg-opacity-0 focus:outline-none'} />
				<div
					onClick={() => {
						if (isSameName) {
							setName(
								{provider, name, tokenID: currentAdventurer.tokenID},
								({error}) => console.error(error),
								(_toast) => {
									updateRarity(currentAdventurer.tokenID);
									toast.dismiss(_toast);
									toast.success(`You can now call ${currentAdventurer.tokenID}: ${name}!`);
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
				<div className={'grid grid-cols-1 gap-y-4 ml-auto w-18'}>
					<Link href={'/equipements'}>
						<div>
							<ItemWithTooltip
								provider={provider}
								currentAdventurer={currentAdventurer}
								updateInventory={updateInventory}
								item={equipements[currentAdventurer.tokenID]?.[1]}
								slot={1}>
								<IconHelmet className={'w-12 h-12'} />
							</ItemWithTooltip>
						</div>
					</Link>
					<Link href={'/equipements'}>
						<div>
							<ItemWithTooltip
								provider={provider}
								currentAdventurer={currentAdventurer}
								updateInventory={updateInventory}
								item={equipements[currentAdventurer.tokenID]?.[2]}
								slot={2}>
								<IconArmor className={'w-12 h-12'} />
							</ItemWithTooltip>
						</div>
					</Link>
					<Link href={'/equipements'}>
						<div>
							<ItemWithTooltip
								provider={provider}
								currentAdventurer={currentAdventurer}
								updateInventory={updateInventory}
								item={equipements[currentAdventurer.tokenID]?.[3]}
								slot={3}>
								<IconGloves className={'w-12 h-12'} />
							</ItemWithTooltip>
						</div>
					</Link>
					<Link href={'/equipements'}>
						<div>
							<ItemWithTooltip
								provider={provider}
								currentAdventurer={currentAdventurer}
								updateInventory={updateInventory}
								item={equipements[currentAdventurer.tokenID]?.[4]}
								slot={4}>
								<IconBoots className={'w-12 h-12'} />
							</ItemWithTooltip>
						</div>
					</Link>
				</div>
				<div className={'flex flex-col justify-between items-center pt-4 pb-8 w-60'}>
					<div className={'flex flex-col items-center px-4 w-full text-center'}>
						{renderName()}
						<p className={'mb-4 text-sm text-black dark:text-dark-100'}>
							{`${CLASSES[currentAdventurer.class].name} level ${currentAdventurer.level}`}
						</p>
					</div>
					<Image src={raritySkins ? raritySkin : currentAdventurer?.skin} width={180} height={180} />
					<div className={'px-4'}>
						{renderAction()}
					</div>
				</div>
				<div className={'grid grid-cols-1 gap-y-4 w-18'}>
					<Link href={'/equipements'}>
						<div>
							<ItemWithTooltip
								provider={provider}
								currentAdventurer={currentAdventurer}
								updateInventory={updateInventory}
								item={equipements[currentAdventurer.tokenID]?.[5]}
								slot={5}>
								<IconWeapon className={'w-12 h-12'} />
							</ItemWithTooltip>
						</div>
					</Link>
					
					<Link href={'/equipements'}>
						{
							equipements[currentAdventurer.tokenID]?.[6] ? (
								<div>
									<ItemWithTooltip
										provider={provider}
										currentAdventurer={currentAdventurer}
										updateInventory={updateInventory}
										item={equipements[currentAdventurer.tokenID]?.[6]}
										slot={6}>
										<IconWeapon className={'w-12 h-12'} />
									</ItemWithTooltip>		
								</div>
							) : equipements[currentAdventurer.tokenID]?.[101] ? (
								<div>
									<ItemWithTooltip
										provider={provider}
										currentAdventurer={currentAdventurer}
										updateInventory={updateInventory}
										item={equipements[currentAdventurer.tokenID]?.[101]}
										slot={101}>
										<IconWeapon className={'w-12 h-12'} />
									</ItemWithTooltip>
								</div>
							) : (
								<div>
									<ItemWithTooltip
										provider={provider}
										currentAdventurer={currentAdventurer}
										updateInventory={updateInventory}
										item={undefined}
										slot={0}>
										<IconWeapon className={'w-12 h-12'} />
									</ItemWithTooltip>
								</div>
							)
						}
					</Link>
					<Link href={'/equipements'}>
						<div className={`aspect-1 flex w-18 transition-colors cursor-pointer box-darker flex-center ${pageSlot === 7 ? 'text-plain-60' : 'text-400 hover-text-plain-60'}`}>
							<IconNecklace className={'w-12 h-12'} />
						</div>
					</Link>
					<Link href={'/equipements'}>
						<div className={`aspect-1 flex w-18 transition-colors cursor-pointer box-darker flex-center ${pageSlot === 8 ? 'text-plain-60' : 'text-400 hover-text-plain-60'}`}>
							<IconRing className={'w-12 h-12'} />
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}


export default OverviewEquipement;