/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@MajorTom_eth
**	@Date:					Sunday September 5th 2021
**	@Filename:				index.js
******************************************************************************/

import	React, {useState}				from	'react';
import	Image							from	'next/image';
import	dayjs							from	'dayjs';
import	relativeTime					from	'dayjs/plugin/relativeTime';
import	{goAdventure, levelUp, setAttributes, claimGold}	from	'utils/actions';
import	useWeb3							from	'contexts/useWeb3';
import	useRarity						from	'contexts/useRarity';
import	SectionNoAdventurer				from	'sections/SectionNoAdventurer';

dayjs.extend(relativeTime);

const	classMapping = [
	'',
	'Barbarian',
	'Bard',
	'Cleric',
	'Druid',
	'Fighter',
	'Monk',
	'Paladin',
	'Ranger',
	'Rogue',
	'Sorcerer',
	'Wizard',
];

const	classMappingImg = [
	'',
	'/front/barbarian.svg',
	'/bard.png',
	'/cleric.png',
	'/druid.png',
	'/fighter.png',
	'/monk.png',
	'/paladin.png',
	'/ranger.png',
	'/rogue.png',
	'/sorcerer.png',
	'/wizard.png',
];

function	DailyBalloon({rarity, chainTime, provider, updateRarity}) {
	const	[ask, set_ask] = useState(0);
	const	canAdventure = !dayjs(new Date(rarity.log * 1000)).isAfter(dayjs(new Date(chainTime * 1000)));
	const	canGold = Number(rarity?.gold?.claimable || 0) > 0;

	function	onGoToAdventure() {
		goAdventure({
			provider,
			contractAddress: process.env.RARITY_ADDR,
			tokenID: rarity.tokenID,
		}, ({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(data);
		});
	}

	function	onClaimGold() {
		claimGold({
			provider,
			contractAddress: process.env.RARITY_GOLD_ADDR,
			tokenID: rarity.tokenID,
		}, ({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(data);
		});
	}

	if (ask <= 0 && canAdventure) {
		return (
			<div className={'nes-balloon rounded-lg border-black dark:border-dark-100 border-4 relative from-left text-xs md:text-base'}>
				<div className={'mb-2'}>
					{'Would you like to go in an adventure ?'}
					<div className={'mt-6'}>
						<span className={'cursor-pointer'} onClick={onGoToAdventure}>
							<span className={'inline mb-1 mr-2 group-hover:opacity-100'} style={{cursor: 'pointer'}}>{'>'}</span>
							<span>{'Yes'}</span>
						</span>
						<span className={'ml-6 cursor-pointer'} onClick={() => canGold ? set_ask(1) : null}>
							<span className={'inline mb-1 mr-2 opacity-5'} style={{cursor: 'pointer'}}>{'>'}</span>
							<span className={'opacity-40'}>{'no'}</span>
						</span>
					</div>
				</div>
				{canGold ? <div className={'absolute right-0 bottom-0 text-xl animate-bounce-r cursor-pointer p-2'} onClick={() => set_ask(1)}>
					{'▸'}
				</div> : null}
			</div>
		);
	}
	if (ask <= 1 && canGold) {
		return (
			<div className={'nes-balloon rounded-lg border-black dark:border-dark-100 border-4 relative from-left text-xs md:text-base '}>
				<div className={'mb-2'}>
					{`Would you like to claim your ${Number(rarity?.gold?.claimable)} golds ?`}
					<div className={'mt-6'}>
						<span className={'cursor-pointer'} onClick={onClaimGold}>
							<span className={'inline mb-1 mr-2 group-hover:opacity-100'} style={{cursor: 'pointer'}}>{'>'}</span>
							<span>{'Claim'}</span>
						</span>
						<span className={'ml-6 cursor-pointer'} onClick={() => canGold ? set_ask(1) : null}>
							<span className={'inline mb-1 mr-2 opacity-5'} style={{cursor: 'pointer'}}>{'>'}</span>
							<span className={'opacity-40'}>{'no'}</span>
						</span>
					</div>
				</div>
				{canAdventure ? <div className={'absolute right-0 bottom-0 text-xl animate-bounce-r cursor-pointer p-2'} onClick={() => set_ask(0)}>
					{'◂'}
				</div> : null}
			</div>
		);
	}

	return (
		<div className={'nes-balloon rounded-lg border-black dark:border-dark-100 border-4 relative from-left text-xs md:text-base'}>
			<p>{`Next adventure ready ${dayjs(new Date(rarity.log * 1000)).from(dayjs(new Date(chainTime * 1000)))}`}</p>
		</div>
	);
}

function	Attribute({isInit, name, value, updateAttribute, set_updateAttribute, toUpdate}) {
	function pointCost(val) {
		if (val <= 14) {
			return val - 8;
		} else {
			return Math.floor(((val - 8)**2)/6);
		}
	}

	const	getPreviousRemainingPoints = () => {
		let	_remainingPoints = updateAttribute.remainingPoints;
		let _pointsToRemove = pointCost(updateAttribute[name] - 1) - pointCost(updateAttribute[name]);
		_remainingPoints = _remainingPoints - _pointsToRemove;
		return (_remainingPoints);
	};
	const	getNextRemainingPoints = () => {
		let	_remainingPoints = updateAttribute.remainingPoints;
		let _pointsToRemove = pointCost(updateAttribute[name]) - pointCost(updateAttribute[name] + 1);
		_remainingPoints = _remainingPoints + _pointsToRemove;
		return (_remainingPoints);
	};

	return (
		<div className={'flex flex-row items-center w-full py-2'}>
			<div className={'opacity-80 text-xs md:text-sm'}>{`${name}: `}</div>
			<div className={'w-full text-right'}>
				<div className={'flex flex-row items-center justify-end'}>
					<div 
						onClick={() => {
							if (isInit || updateAttribute[name] === value || !toUpdate)
								return;
							const	previousRemainingPoints = getPreviousRemainingPoints();
							if (updateAttribute.remainingPoints !== updateAttribute.maxPoints) {
								set_updateAttribute(u => ({
									...u,
									[name]: u[name] - 1,
									remainingPoints: previousRemainingPoints
								}));
							}
						}}
						className={`text-sm w-4 text-left ${isInit || updateAttribute[name] === value || !toUpdate ? 'opacity-0' : 'cursor-pointer'}`}>
						{'-'}
					</div>
					<div className={'w-9 text-center'}>{updateAttribute[name]}</div>
					<div 
						onClick={() => {
							if (isInit || !toUpdate)
								return;
							const	nextRemainingPoints = getNextRemainingPoints();
							if (getNextRemainingPoints() >= 0) {
								set_updateAttribute(u => ({
									...u,
									[name]: u[name] + 1,
									remainingPoints: nextRemainingPoints
								}));
							}
						}}
						className={`text-sm w-4 text-right ${isInit || getNextRemainingPoints() < 0 || !toUpdate ? 'opacity-0' : 'cursor-pointer'}`}>
						{'+'}
					</div>
				</div>
			</div>
		</div>
	);
}
function	Attributes({rarity, updateRarity, provider}) {
	const	[updateAttribute, set_updateAttribute] = useState({
		strength: rarity?.attributes?.strength,
		dexterity: rarity?.attributes?.dexterity,
		constitution: rarity?.attributes?.constitution,
		intelligence: rarity?.attributes?.intelligence,
		wisdom: rarity?.attributes?.wisdom,
		charisma: rarity?.attributes?.charisma,
		maxPoints: rarity?.attributes?.maxPoints,
		remainingPoints: rarity?.attributes?.remainingPoints
	});

	async function buyPoints() {
		if (updateAttribute.remainingPoints === 0) {
			setAttributes({
				provider,
				contractAddress: process.env.RARITY_ATTR_ADDR,
				_summoner: rarity.tokenID,
				_str: updateAttribute.strength,
				_dex: updateAttribute.dexterity,
				_const: updateAttribute.constitution,
				_int: updateAttribute.intelligence,
				_wis: updateAttribute.wisdom,
				_cha: updateAttribute.charisma
			}, ({error, data}) => {
				if (error) {
					return console.error(error);
				}
				set_updateAttribute(u => ({
					...u,
					remainingPoints: -1
				}));
				updateRarity(data._summoner);
			});
		}
	}

	return (
		<div className={'nes-container py-6 px-8 border-4 border-solid border-black dark:border-dark-100 with-title w-full md:w-1/3 -mt-1 md:mt-0'}>
			<div className={'title bg-white dark:bg-dark-600 mb-1'}>{'Attributes'}</div>
			{updateAttribute.remainingPoints >= 0 ? (
				<p onClick={buyPoints} className={`text-xss border-t-2 border-b-2 border-black dark:border-dark-100 flex justify-center items-center py-1 my-2 ${updateAttribute.remainingPoints === 0 ? 'animate-pulse text-center cursor-pointer hover:bg-black hover:animate-none hover:text-white' : ''}`}>
					{updateAttribute.remainingPoints === 0 ?
						'▶ Save you stats ! ◀'
						:
						`▶ You have ${updateAttribute.remainingPoints} points to spend ! ◀`
					}
				</p>
			) : null}
			<Attribute
				isInit={rarity?.attributes?.isInit}
				value={rarity.attributes.strength}
				updateAttribute={updateAttribute}
				set_updateAttribute={set_updateAttribute}
				toUpdate={updateAttribute.remainingPoints >= 0}
				name={'strength'} />
			<Attribute
				isInit={rarity?.attributes?.isInit}
				value={rarity.attributes.dexterity}
				updateAttribute={updateAttribute}
				set_updateAttribute={set_updateAttribute}
				toUpdate={updateAttribute.remainingPoints >= 0}
				name={'dexterity'} />
			<Attribute
				isInit={rarity?.attributes?.isInit}
				value={rarity.attributes.constitution}
				updateAttribute={updateAttribute}
				set_updateAttribute={set_updateAttribute}
				toUpdate={updateAttribute.remainingPoints >= 0}
				name={'constitution'} />
			<Attribute
				isInit={rarity?.attributes?.isInit}
				value={rarity.attributes.intelligence}
				updateAttribute={updateAttribute}
				set_updateAttribute={set_updateAttribute}
				toUpdate={updateAttribute.remainingPoints >= 0}
				name={'intelligence'} />
			<Attribute
				isInit={rarity?.attributes?.isInit}
				value={rarity.attributes.wisdom}
				updateAttribute={updateAttribute}
				set_updateAttribute={set_updateAttribute}
				toUpdate={updateAttribute.remainingPoints >= 0}
				name={'wisdom'} />
			<Attribute
				isInit={rarity?.attributes?.isInit}
				value={rarity.attributes.charisma}
				updateAttribute={updateAttribute}
				set_updateAttribute={set_updateAttribute}
				toUpdate={updateAttribute.remainingPoints >= 0}
				name={'charisma'} />
		</div>
	);
}
function	Aventurers({rarity, provider, updateRarity, router, chainTime}) {
	return (
		<div className={'w-full'}>
			<div className={'flex flex-row w-full mb-6'}>
				<div className={'w-full flex flex-col-reverse md:flex-row justify-start'}>
					<div className={'w-64'} style={{minWidth: 256}}>
						<Image
							src={classMappingImg[rarity.class]}
							loading={'eager'}
							quality={100}
							width={256}
							height={256} />
					</div>
					<div>
						<section className={'message -left'}>
							<DailyBalloon
								rarity={rarity}
								chainTime={chainTime}
								updateRarity={updateRarity}
								provider={provider}
								router={router} />
						</section>
					</div>
				</div>
			</div>
			<div className={'flex flex-col md:flex-row w-full space-x-0 md:space-x-2'}>
				<div className={'nes-container py-6 px-8 border-4 border-solid border-black dark:border-dark-100 with-title w-full md:w-2/3'}>
					<p className={'title bg-white dark:bg-dark-600 mb-1'}>{rarity.tokenID}</p>
					<div className={'flex flex-row items-center w-full py-2'}>
						<div className={'opacity-80 text-xs md:text-sm w-48'}>{'ID:'}</div>
						<div className={'w-full text-right md:text-left pr-4 md:pr-0'}>
							<p>{rarity.tokenID}</p>
						</div>
					</div>
					<div className={'flex flex-row items-center w-full py-2'}>
						<div className={'opacity-80 text-xs md:text-sm w-48'}>{'CLASS:'}</div>
						<div className={'w-full text-right md:text-left pr-4 md:pr-0'}>
							<p>{classMapping[rarity.class]}</p>
						</div>
					</div>
					<div className={'flex flex-row items-center w-full py-2'}>
						<div className={'opacity-80 text-xs md:text-sm w-48'}>{'LEVEL:'}</div>
						<div className={'w-full text-right md:text-left pr-4 md:pr-0'}>
							<p>{rarity.level}</p>
						</div>
					</div>
					<div className={'flex flex-row items-center w-full py-2'}>
						<div className={'opacity-80 text-xs md:text-sm w-48'}>{'GOLD:'}</div>
						<div className={'w-full text-right md:text-left pr-4 md:pr-0'}>
							<p>{`${Number(rarity?.gold?.balance || 0) === 0 ? '0' : rarity.gold.balance}`}</p>
						</div>
					</div>
					<div className={'flex flex-row items-center w-full py-2'}>
						<div className={'opacity-80 text-sm w-48'}>{'Rat Skin:'}</div>
						<div className={'w-full'}>
							<p className={'inline'}>{`${Number(rarity?.dungeons?.cellar?.lootBalance || 0) === 0 ? '0' : rarity?.dungeons?.cellar?.lootBalance}`}</p>
						</div>
					</div>
					<div className={'flex flex-row items-center w-full py-2'}>
						<div className={'opacity-80 text-sm w-48'}>{'XP:'}</div>
						<div className={'w-full'}>
							<div
								onClick={() => {
									if (rarity.xp >= (rarity.level * 1000)) {
										levelUp({
											provider,
											contractAddress: process.env.RARITY_ADDR,
											tokenID: rarity.tokenID,
										}, ({error, data}) => {
											if (error) {
												return console.error(error);
											}
											updateRarity(data);
										});
									}
								}}
								className={`nes-progress border-solid border-2 border-black dark:border-dark-400 w-full relative ${rarity.xp >= (rarity.level * 1000) ? 'cursor-pointer' : ''}`}>
								<progress
									className={`progressbar h-full ${rarity.xp >= (rarity.level * 1000) ? 'is-warning animate-pulse' : 'is-primary'} w-full absolute p-1.5 inset-0`}
									value={rarity.xp}
									max={rarity.level * 1000} />
								<p className={`text-sm absolute inset-0 h-full w-full text-center flex justify-center items-center ${rarity.xp >= (rarity.level * 1000) ? '' : 'hidden'}`}>{'LEVEL-UP!'}</p>
							</div>
						</div>
					</div>
				</div>
				<Attributes rarity={rarity} updateRarity={updateRarity} provider={provider} />
			</div>
		</div>
	);
}


function	Index({router}) {
	const	{provider, chainTime} = useWeb3();
	const	{rarities, updateRarity} = useRarity();
	const	adventurers = Object.values(rarities);

	if (adventurers?.length === 0) {
		return (
			<SectionNoAdventurer />
		);
	}

	return (
		<section className={'mt-24 md:mt-12'}>
			<div className={'flex flex-col space-y-32 max-w-screen-lg w-full mx-auto'}>
				{
					adventurers?.map((rarity) => (
						<Aventurers
							key={rarity.tokenID}
							rarity={rarity}
							provider={provider}
							updateRarity={updateRarity}
							chainTime={chainTime}
							router={router} />
					))
				}
			</div>


		</section>
	);
}

export default Index;
