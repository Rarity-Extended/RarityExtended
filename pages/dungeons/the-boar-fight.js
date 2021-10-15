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
import	{killBoar}								from	'utils/actions/boar';
import	DialogNoBox								from	'components/DialogNoBox';
import	Box										from	'components/Box';

const	classMappingBackImg = [
	'',
	'/back/barbarian.svg',
	'/back/bard.png',
	'/back/cleric.png',
	'/back/druid.png',
	'/back/fighter.png',
	'/back/monk.svg',
	'/back/paladin.png',
	'/back/ranger.png',
	'/back/rogue.png',
	'/back/sorcerer.png',
	'/back/wizard.png',
];

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function	DialogChoices({router, step, stepAuto, boarEscaped, adventurerWon, expectedLoot, loot}) {
	if (boarEscaped) {
		return (
			<DialogNoBox
				options={[
					{label: 'THE WILD BOAR HAS ESCAPED', onClick: () => router.push('/town/quest?tab=the-boars')},
				]} />
		);
	}
	if (adventurerWon) {
		if (expectedLoot === 0) {
			return (
				<DialogNoBox
					options={[
						{label: 'YOU HAVE DEFEATED THE WILD BOAR ! UNFORTUNATELY, THERE IS NOTHING TO RECOVER', onClick: () => router.push('/town/quest?tab=the-boars')},
					]} />
			);
		}
		return (
			<DialogNoBox
				options={[
					{label: 'YOU HAVE DEFEATED THE WILD BOAR ! COLLECT YOUR LOOT!', onClick: loot},
				]} />
		);
	}
	return (
		<DialogNoBox
			options={[
				{label: 'FIGHT', onClick: step},
				{label: 'FIGHT (AUTO)', onClick: stepAuto},
				{label: 'ESCAPE', onClick: () => router.push('/town/quest?tab=the-boars')},
			]} />
	);
}


function	Index({dungeon, adventurer, router}) {
	const	STEP_LIMIT = 100;
	const	{provider} = useWeb3();
	const	{updateRarity} = useRarity();
	const	[fightStep, set_fightStep] = useState(0);
	const	[option, set_option] = useState(0);
	const	[boarEscaped, set_boarEscaped] = useState(false);
	const	[adventurerWon, set_adventurerWon] = useState(false);
	const	[adventurerHealth, set_adventurerHealth] = useState(dungeon.adventurerHealth);
	const	[dungeonHealth, set_dungeonHealth] = useState(dungeon.dungeonHealth);

	useEffect(() => {
		set_adventurerHealth(dungeon.adventurerHealth);
		set_dungeonHealth(dungeon.dungeonHealth);
	}, [dungeon]);

	async function	stepAuto() {
		set_option(1);
		let	_adventurerHealth = adventurerHealth;
		let	_dungeonHealth = dungeonHealth;
		for (let index = STEP_LIMIT; index >= fightStep; index--) {
			set_dungeonHealth(h => h -= dungeon.adventurerDamage);
			_dungeonHealth -= dungeon.adventurerDamage;
			if (_dungeonHealth <= 0) {
				set_adventurerWon(true);
				return true;
			}
			await sleep(0);
			if (dungeon.adventurerArmor < dungeon.dungeonToHit) {
				set_adventurerHealth(h => h -= dungeon.dungeonDamage);
				_adventurerHealth -= dungeon.dungeonDamage;
				if (_adventurerHealth <= 0) {
					return false;
				}
			}
			await sleep(0);
		}
		set_boarEscaped(true);
	}
	async function	step() {
		if (option === 1) {
			return;
		}
		set_option(0);
		let	_adventurerHealth = adventurerHealth;
		let	_dungeonHealth = dungeonHealth;
		if (fightStep === STEP_LIMIT) {
			set_boarEscaped(true);
			return;
		}
		set_dungeonHealth(h => h -= dungeon.adventurerDamage);
		_dungeonHealth -= dungeon.adventurerDamage;
		if (_dungeonHealth <= 0) {
			set_adventurerWon(true);
			return true;
		}
		await sleep(450);
		if (dungeon.adventurerArmor < dungeon.dungeonToHit) {
			set_adventurerHealth(h => h -= dungeon.dungeonDamage);
			_adventurerHealth -= dungeon.dungeonDamage;
			if (_adventurerHealth <= 0) {
				return false;
			}
		}
		await sleep(450);
		set_fightStep(f => f + 1);
	}

	return (
		<section className={'relative'}>
			<div className={`absolute bg-black inset-0 z-10 -top-24 -left-4 -right-4 flex flex-col items-center min-h-screen transition-opacity duration-1000 ${adventurerHealth <= 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
				<p className={'text-2xl text-white pt-20 mx-4 md:mx-0 md:pt-64 max-w-screen-sm text-center'}>{'you passed out'}</p>
				<p className={'text-base text-white pt-8 mx-4 md:mx-0 max-w-screen-sm text-center'}>{'After some time, the rat returns to his hole and Facu the tavernkeeper, worried, finds you lying on the floor'}</p>
				<Link href={'/town/quest?tab=the-boars'}>
					<div className={'text-base text-white mt-16 mx-4 md:mx-0 py-2 px-4 max-w-screen-sm text-center animate-pulse border-t-4 border-b-4 border-white hover:bg-white hover:text-black transition-colors cursor-pointer hover:animate-none'} style={{cursor: 'pointer'}}>
						{'Rest weak adventurer, Rest...'}
					</div>
				</Link>
			</div>


			<div className={'mt-8 max-w-prose w-full flex-col flex justify-center items-center mx-auto'}>
				<Box className={'p-4 text-xs md:text-xs leading-normal md:leading-8 w-full relative'}>
					<div className={'max-w-screen-sm w-full mx-auto mt-12'}>
						<div className={'flex flex-col items-center'}>
							<div className={'w-full flex flex-row ml-0 md:ml-32'}>
								<div className={'w-full mr-14'}>
									<p className={'whitespace-nowrap'}>{'Angry Boar'}</p>
									<div className={'flex flex-row items-center w-full py-2'}>
										<div className={'text-opacity-80 text-black dark:text-white text-sm w-32'}>{'HP:'}</div>
										<progress
											className={'border-solid border-2 border-black dark:border-dark-400 p-1.5 nes-progress is-error w-full transition-all'}
											value={dungeonHealth}
											max={dungeon.dungeonHealth} />
									</div>
								</div>
								<div className={'w-60 hidden md:block transform'} style={{minWidth: 240, opacity: boarEscaped ? 0 : 100}}>
									<Image
										src={dungeonHealth <= 0 ? '/dungeons/boar_dead.png' : '/dungeons/boar.gif'}
										loading={'eager'}
										quality={100}
										width={240}
										height={141} />
								</div>
								<div className={'w-30 block md:hidden transform'} style={{minWidth: 120, opacity: boarEscaped ? 0 : 100}}>
									<Image
										src={dungeonHealth <= 0 ? '/dungeons/boar_dead.png' : '/dungeons/boar.gif'}
										loading={'eager'}
										quality={100}
										width={120}
										height={70.5} />
								</div>
							</div>

							<div className={'w-full flex flex-row mt-2 md:-mt-10 mr-0 md:mr-32'}>
								<div className={'w-60 hidden md:block'} style={{minWidth: 240}}>
									<Image
										src={classMappingBackImg[adventurer.class]}
										loading={'eager'}
										quality={100}
										width={240}
										height={240} />
								</div>
								<div className={'w-32 block md:hidden'} style={{minWidth: 120}}>
									<Image
										src={classMappingBackImg[adventurer.class]}
										loading={'eager'}
										quality={100}
										width={120}
										height={120} />
								</div>

								<div className={'w-full mt-auto mb-2'}>
									<p>{dungeon.tokenID}</p>
									<div className={'flex flex-row items-center w-full py-2'}>
										<div className={'text-opacity-80 text-black dark:text-white text-sm w-32'}>{'HP:'}</div>
										<progress
											className={'nes-progress border-solid border-2 border-black dark:border-dark-400 p-1.5 is-success w-full transition-all'}
											value={adventurerHealth}
											max={dungeon.adventurerHealth} />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={'w-full mx-auto'}>
						<DialogChoices
							router={router}
							step={step}
							stepAuto={stepAuto}
							boarEscaped={boarEscaped}
							adventurerWon={adventurerWon}
							expectedLoot={dungeon.scout}
							loot={() => {
								killBoar({
									provider,
									tokenID: dungeon.tokenID,
								}, ({error}) => {
									if (error) {
										return console.error(error);
									}
									updateRarity(dungeon.tokenID);
									if (router.pathname === '/dungeons/the-boars')	
										router.push('/town/quest?tab=the-boars');
								});
							}}
						/>
					</div>
				</Box>
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
