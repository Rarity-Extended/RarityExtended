/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday September 7th 2021
**	@Filename:				tavern.js
******************************************************************************/

import	React, {useState, useEffect}			from	'react';
import	Image									from	'next/image';
import	Link									from	'next/link';
import	useDungeon, {DungeonContextApp}			from	'contexts/useDungeonsTheBoars';
import	useWeb3									from	'contexts/useWeb3';
import	useRarity								from	'contexts/useRarity';
import	useInventory							from	'contexts/useInventory';
import	useUI									from	'contexts/useUI';
import	{sleep}									from	'utils';
import	{killBoar}								from	'utils/actions/boar';
import	CLASSES									from	'utils/codex/core/classes';

function	Index({dungeon, adventurer, router}) {
	const	STEP_LIMIT = 100;
	const	{provider} = useWeb3();
	const	{updateRarity, skins} = useRarity();
	const	{updateInventory} = useInventory();
	const	{raritySkins} = useUI();
	const	[boarEscaped, set_boarEscaped] = useState(false);
	const	[adventurerWon, set_adventurerWon] = useState(false);
	const	[adventurerHealth, set_adventurerHealth] = useState(dungeon.adventurerHealth);
	const	[dungeonHealth, set_dungeonHealth] = useState(dungeon.dungeonHealth);

	const	defaultSkin = CLASSES[adventurer?.class]?.images.back;
	const	skin = raritySkins ? skins[adventurer?.tokenID] || defaultSkin : defaultSkin;

	useEffect(() => {
		set_adventurerHealth(dungeon.adventurerHealth);
		set_dungeonHealth(dungeon.dungeonHealth);
	}, [dungeon]);

	async function	fight() {
		let	_adventurerHealth = adventurerHealth;
		let	_dungeonHealth = dungeonHealth;
		for (let index = STEP_LIMIT; index >= 0; index--) {
			set_dungeonHealth(h => h -= dungeon.adventurerDamage);
			_dungeonHealth -= dungeon.adventurerDamage;
			if (_dungeonHealth <= 0) {
				set_adventurerWon(true);
				return true;
			}
			await sleep(200);
			if (dungeon.adventurerArmor < dungeon.dungeonToHit) {
				set_adventurerHealth(h => h -= dungeon.dungeonDamage);
				_adventurerHealth -= dungeon.dungeonDamage;
				if (_adventurerHealth <= 0) {
					return false;
				}
			}
			await sleep(200);
		}
		set_boarEscaped(true);
	}

	function	onLoot() {
		killBoar({
			provider,
			tokenID: dungeon.tokenID,
		}, ({error}) => {
			if (error) {
				return console.error(error);
			}
			updateInventory(dungeon.tokenID);
			updateRarity(dungeon.tokenID);
			if (router.pathname === '/adventures/the-boars/fight')	
				router.push('/adventures/the-boars');
		});
	}

	function	renderOptions() {
		if (boarEscaped) {
			return (
				<div className={'grid grid-cols-1 gap-4 mt-4 border-t-2 border-black dark:border-dark-300 pt-4'}>
					<div onClick={() => router.push('/adventures/the-boars')} className={'flex flex-center button-regular'}>
						<p>{'The Wild Boar has escaped'}</p>
					</div>
				</div>
			);
		}
		if (adventurerWon && (dungeon.scout) === 0) {
			return (
				<div className={'grid grid-cols-1 gap-4 mt-4 border-t-2 border-black dark:border-dark-300 pt-4'}>
					<div onClick={() => router.push('/adventures/the-boars')} className={'flex flex-center button-regular'}>
						<p>{'You have defeated the Wild Boar, but there is nothing to recover'}</p>
					</div>
				</div>
			);
		}
		if (adventurerWon) {
			return (
				<div className={'grid grid-cols-1 gap-4 mt-4 border-t-2 border-black dark:border-dark-300 pt-4'}>
					<div onClick={onLoot} className={'flex flex-center button-regular'}>
						<p>{'You have defeated the Wild Boar! Collect loot!'}</p>
					</div>
				</div>
			);
		}
		return (
			<div className={'grid grid-cols-1 gap-4 mt-4 border-t-2 border-black dark:border-dark-300 pt-4'}>
				<div onClick={fight} className={'flex flex-center button-regular'}>
					<p>{'Fight'}</p>
				</div>
				<div onClick={() => router.push('/adventures/the-boars')} className={'flex flex-center button-regular'}>
					<p>{'Escape'}</p>
				</div>
			</div>
		);
	}

	return (
		<section id={'action'} className={'flex flex-col w-full max-w-screen md:max-w-screen-xl mx-auto relative'}>
			<div className={`absolute bg-black inset-0 z-10 -top-32 -left-4 -right-4 flex flex-col items-center min-h-screen transition-opacity duration-1000 ${adventurerHealth <= 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
				<p className={'text-2xl text-white pt-20 mx-4 md:mx-0 md:pt-64 max-w-screen-sm text-center'}>{'you passed out'}</p>
				<p className={'text-base text-white pt-8 mx-4 md:mx-0 max-w-screen-sm text-center'}>{'After some time, the Farmer find you and bring you back in town...'}</p>
				<Link href={'/adventures/the-boars#action'}>
					<div className={'text-base text-white mt-16 mx-4 md:mx-0 py-2 px-4 max-w-screen-sm text-center animate-pulse border-t-4 border-b-4 border-white hover:bg-white hover:text-black transition-colors cursor-pointer hover:animate-none'} style={{cursor: 'pointer'}}>
						{'Rest weak adventurer, Rest...'}
					</div>
				</Link>
			</div>


			<div className={'box p-4 text-xs w-full relative'}>
				<div className={'w-full md:w-3/4 mx-auto mt-2 md:mt-12'}>
					<div className={'flex flex-col items-center'}>
						<div className={'w-full flex flex-row ml-0 md:ml-32'}>
							<div className={'w-full mr-14'}>
								<p className={'whitespace-nowrap'}>{'Angry Boar'}</p>
								<div className={'flex flex-row items-center w-full py-2'}>
									<div className={'text-opacity-80 text-plain text-sm w-32'}>{'HP:'}</div>
									<progress
										className={'border-solid border-2 border-black dark:border-dark-400 p-1.5 nes-progress is-error w-full transition-all'}
										value={dungeonHealth}
										max={dungeon.dungeonHealth} />
								</div>
							</div>
							<div className={'w-60 hidden md:block transform'} style={{minWidth: 240, opacity: boarEscaped ? 0 : 100}}>
								<Image
									src={dungeonHealth <= 0 ? '/adventures/the-boars/creature_dead.png' : '/adventures/the-boars/creature.gif'}
									loading={'eager'}
									quality={100}
									width={240}
									height={141} />
							</div>
							<div className={'w-30 block md:hidden transform'} style={{minWidth: 120, opacity: boarEscaped ? 0 : 100}}>
								<Image
									src={dungeonHealth <= 0 ? '/adventures/the-boars/creature_dead.png' : '/adventures/the-boars/creature.gif'}
									loading={'eager'}
									quality={100}
									width={120}
									height={70.5} />
							</div>
						</div>

						<div className={'w-full flex flex-row mt-2 md:-mt-10 mr-0 md:mr-32'}>
							<div className={'w-60 hidden md:block'} style={{minWidth: 240}}>
								<Image
									src={skin}
									loading={'eager'}
									quality={100}
									width={240}
									height={240} />
							</div>
							<div className={'w-32 block md:hidden'} style={{minWidth: 120}}>
								<Image
									src={skin}
									loading={'eager'}
									quality={100}
									width={120}
									height={120} />
							</div>

							<div className={'w-full mt-auto mb-2'}>
								<p>{dungeon.tokenID}</p>
								<div className={'flex flex-row items-center w-full py-2'}>
									<div className={'text-opacity-80 text-plain text-sm w-32'}>{'HP:'}</div>
									<progress
										className={'nes-progress border-solid border-2 border-black dark:border-dark-400 p-1.5 is-success w-full transition-all'}
										value={adventurerHealth}
										max={dungeon.adventurerHealth} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={'w-full md:w-3/4 mx-auto'}>
					{renderOptions()}
				</div>
			</div>
		</section>
	);
}

function	Wrapper({router, adventurer}) {
	const	{dungeon} = useDungeon();

	if (!dungeon.adventurerHealth || !dungeon.dungeonHealth) {
		return null;
	}

	return (
		<Index router={router} dungeon={dungeon} adventurer={adventurer} />
	);
}

function	WithContext({rarities, router}) {
	if (!rarities || rarities === {}) {
		return null;
	}
	if (!rarities[router?.query?.adventurer]) {
		if (typeof(window) !== 'undefined')
			router.push('/');
		return null;
	}
	return (
		<DungeonContextApp adventurer={rarities[router?.query?.adventurer]}>
			<Wrapper router={router} adventurer={rarities[router?.query?.adventurer]} />
		</DungeonContextApp>
	);
}

export default WithContext;
