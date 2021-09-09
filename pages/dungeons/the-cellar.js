/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@MajorTom_eth
**	@Date:					Tuesday September 7th 2021
**	@Filename:				tavern.js
******************************************************************************/

import	React, {useState, useEffect}			from	'react';
import	Image									from	'next/image';
import	Link									from	'next/link';
import	useDungeon, {DungeonContextApp}			from	'contexts/useDungeonsTheCellar';
import	useWeb3									from	'contexts/useWeb3';
import	{lootDungeonTheCellar}					from	'utils/actions';

const	classMappingBackImg = [
	'',
	'/back/barbarian.png',
	'/back/bard.png',
	'/back/cleric.png',
	'/back/druid.png',
	'/back/fighter.png',
	'/back/monk.png',
	'/back/paladin.png',
	'/back/ranger.png',
	'/back/rogue.png',
	'/back/sorcerer.png',
	'/back/wizard.png',
];

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function	FightMenu({step, stepAuto, set_option, option, router}) {
	return (
		<>
			<div>
				<label>
					<input type={'radio'} className={'nes-radio'} name={'what-to-do'} readOnly onClick={() => step()} checked={option === 0} />
					<span>{'Fight'}</span>
				</label>
			</div>
			<div>
				<label>
					<input type={'radio'} className={'nes-radio'} name={'what-to-do'} readOnly onClick={() => stepAuto()} checked={option === 1} />
					<span>{'FIGHT (auto)'}</span>
				</label>
			</div>
			<div>
				<label>
					<input type={'radio'} className={'nes-radio'} name={'what-to-do'} readOnly onClick={() => {set_option(2), router.push('/tavern/the-cellar');}} checked={option === 2} />
					<span>{'Escape'}</span>
				</label>
			</div>
		</>
	);
}

function	LootMenu({loot, expectedLoot}) {
	return (
		<>
			<div>
				<label>
					<input type={'radio'} className={'nes-radio'} name={'what-to-do-loot'} readOnly onClick={() => loot()} checked />
					<span className={'animate-pulse hover:animate-none'}>{`Loot the Big Ugly Rat for ${expectedLoot} rat skin${expectedLoot > 0 ? 's' : ''}`}</span>
				</label>
			</div>
		</>
	);
}

function	Index({dungeon, adventurer, router}) {
	const	{provider} = useWeb3();
	const	[fightStep, set_fightStep] = useState(0);
	const	[option, set_option] = useState(0);
	const	[ratEscaped, set_ratEscaped] = useState(false);
	const	[adventurerWon, set_adventurerWon] = useState(false);
	const	[adventurerHealth, set_adventurerHealth] = useState(dungeon.adventurerHealth);
	const	[dungeonHealth, set_dungeonHealth] = useState(dungeon.dungeonHealth);
	const	[logs, set_logs] = useState([]);

	useEffect(() => {
		set_adventurerHealth(dungeon.adventurerHealth);
		set_dungeonHealth(dungeon.dungeonHealth);
	}, [dungeon]);

	async function	stepAuto() {
		set_option(1);
		let	_adventurerHealth = adventurerHealth;
		let	_dungeonHealth = dungeonHealth;
		for (let index = 10; index >= fightStep; index--) {
			set_dungeonHealth(h => h -= dungeon.adventurerDamage);
			_dungeonHealth -= dungeon.adventurerDamage;
			if (_dungeonHealth <= 0) {
				set_logs(l => [...l, 'Facu will be happy, you killed this Ugly rat!']);
				set_adventurerWon(true);
				return true;
			}
			set_logs(l => [...l, `Your adventurer attacks the Big Ugly Rat and deals ${dungeon.adventurerDamage} dmg.`]);
			await sleep(150);
			if (dungeon.adventurerArmor < dungeon.dungeonToHit) {
				set_adventurerHealth(h => h -= dungeon.dungeonDamage);
				_adventurerHealth -= dungeon.dungeonDamage;
				if (_adventurerHealth <= 0) {
					set_logs(l => [...l, 'Your adventurer fades out']);
					return false;
				}
			}
			set_logs(l => [...l, `The Big Ugly Rat attacks your adventurer and deals ${dungeon.dungeonDamage} dmg.`]);
			await sleep(150);
		}
		set_logs(l => [...l, 'The big ugly rat escaped']);
		set_ratEscaped(true);
	}
	async function	step() {
		if (option === 1) {
			return;
		}
		set_option(0);
		let	_adventurerHealth = adventurerHealth;
		let	_dungeonHealth = dungeonHealth;
		if (fightStep === 10) {
			set_logs(l => [...l, 'The big ugly rat escaped']);
			set_ratEscaped(true);
			return;
		}
		set_dungeonHealth(h => h -= dungeon.adventurerDamage);
		_dungeonHealth -= dungeon.adventurerDamage;
		if (_dungeonHealth <= 0) {
			set_logs(l => [...l, 'Facu will be happy, you killed this Ugly rat!']);
			set_adventurerWon(true);
			return true;
		}
		set_logs(l => [...l, `Your adventurer attacks the Big Ugly Rat and deals ${dungeon.adventurerDamage} dmg.`]);
		await sleep(450);
		if (dungeon.adventurerArmor < dungeon.dungeonToHit) {
			set_adventurerHealth(h => h -= dungeon.dungeonDamage);
			_adventurerHealth -= dungeon.dungeonDamage;
			if (_adventurerHealth <= 0) {
				set_logs(l => [...l, 'Your adventurer fades out']);
				return false;
			}
		}
		set_logs(l => [...l, `The Big Ugly Rat attacks your adventurer and deals ${dungeon.dungeonDamage} dmg.`]);
		await sleep(450);
		set_fightStep(f => f + 1);
	}

	return (
		<section className={'mt-12 relative'}>
			<div className={`absolute bg-black inset-0 z-10 -top-24 -left-4 -right-4 flex flex-col items-center min-h-screen transition-opacity duration-1000 ${adventurerHealth <= 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
				<p className={'text-2xl text-white pt-64 max-w-screen-sm text-center'}>{'you passed out'}</p>
				<p className={'text-base text-white pt-8 max-w-screen-sm text-center'}>{'After some time, the rat returns to his hole and Facu the tavernkeeper, worried, finds you lying on the floor'}</p>
				<Link href={'/'}>
					<div className={'text-base text-white mt-16 py-2 px-4 max-w-screen-sm text-center animate-pulse border-t-4 border-b-4 border-white hover:bg-white hover:text-black transition-colors cursor-pointer hover:animate-none'}>
						{'Rest weak adventurer, Rest...'}
					</div>
				</Link>
			</div>
			<div className={'max-w-screen-sm w-full mx-auto'}>
				<div className={'flex flex-col items-center'}>
					<div className={'w-full flex flex-row ml-32'}>
						<div className={'w-full mr-14'}>
							<p>{'Big Ugly Rat'}</p>
							<div className={'flex flex-row items-center w-full py-2'}>
								<div className={'text-gray-800 text-sm w-32'}>{'HP:'}</div>
								<progress
									className={'nes-progress is-error w-full transition-all'}
									value={dungeonHealth}
									max={dungeon.dungeonHealth} />
							</div>
						</div>
						<div className={'w-60 transform'} style={{transform: dungeonHealth <= 0 ? 'rotate3d(0, 1, 0, 0deg)' : 'rotate3d(0, 1, 0, 180deg)', minWidth: 240, opacity: ratEscaped ? 0 : 100}}>
							<Image
								src={dungeonHealth <= 0 ? '/dungeons/rat_dead.png' : '/dungeons/rat.gif'}
								loading={'eager'}
								quality={100}
								width={240}
								height={141} />
						</div>
					</div>

					<div className={'w-full flex flex-row -mt-10 mr-32'}>
						<div className={'w-60'} style={{minWidth: 240}}>
							<Image
								src={classMappingBackImg[adventurer.class]}
								loading={'eager'}
								quality={100}
								width={240}
								height={240} />
						</div>
						<div className={'w-full mt-auto mb-2'}>
							<p>{dungeon.tokenID}</p>
							<div className={'flex flex-row items-center w-full py-2'}>
								<div className={'text-gray-800 text-sm w-32'}>{'HP:'}</div>
								<progress
									className={'nes-progress is-success w-full transition-all'}
									value={adventurerHealth}
									max={dungeon.adventurerHealth} />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={'max-w-screen-md w-full mx-auto'}>
				<div className={'nes-container mt-6 text-sm space-y-8 mb-8'}>
					{!adventurerWon ?
						<FightMenu
							step={step}
							stepAuto={stepAuto}
							set_option={set_option}
							option={option}
							router={router} />
						:
						<LootMenu
							loot={() => {
								lootDungeonTheCellar({
									provider,
									contractAddress: process.env.DUNGEON_THE_CELLAR_ADDR,
									tokenID: dungeon.tokenID,
								}, ({error}) => {
									if (error) {
										return console.error(error);
									}
									router.push('/');
								});
							}}
							expectedLoot={dungeon.scout} />
					}
				</div>
			</div>
			<div className={'max-w-screen-md w-full mx-auto'}>
				<div className={'space-y-4 text-center'}>
					{logs.map((log, i) => <p key={i} className={'text-sx'}>{log}</p>)}
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
