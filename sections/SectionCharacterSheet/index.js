/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 19th 2021
**	@Filename:				index.js
******************************************************************************/

import	React, {useState}	from	'react';
import	Image				from	'next/image';
import	CLASSES				from	'utils/codex/classes';
import	{levelUp}			from	'utils/actions';
import	{xpRequired}		from	'utils/libs/rarity';
import	Box					from	'components/Box';
import	Attributes			from	'sections/SectionCharacterSheet/Attributes';	
import	Balloon				from	'sections/SectionCharacterSheet/Balloon';	
import	Skills				from	'sections/SectionCharacterSheet/Skills';	
import	Inventory			from	'sections/SectionCharacterSheet/Inventory';	


import	FragmentTop					from	'components/Chains/FragmentTop';
import	FragmentBottom				from	'components/Chains/FragmentBottom';
import	FragmentLink				from	'components/Chains/FragmentLink';
import	FragmentFull				from	'components/Chains/FragmentFull';
import	FrameType0					from	'components/Frame/Stone/Type0';
import	FrameType3					from	'components/Frame/Stone/Type3';
import	FrameArrow					from	'components/Frame/Stone/Arrow';
import	FrameButton					from	'components/Frame/Stone/Button';
import	Runes						from	'components/Letters/Runes';
import	BoxAlternate				from	'components/BoxAlternate';
import	Gold						from	'components/Icons/Gold';
import	{formatAmount}				from	'utils';
import	{setAttributes}				from	'utils/actions';


function	Progress({value, max}) {
	const	progressValue = (value / (max || 1)) >= 0.1 ? (value / (max || 1)) : 0;
	return (
		<>
			<div className={'bg-black absolute h-1 top-0 left-1 right-1'} />
			<div className={'bg-black absolute h-1 w-1 top-1 left-0'} />
			<div className={'bg-black absolute h-1 w-1 top-1 right-0'} />
			<div className={'bg-black absolute w-1 top-2 bottom-2 left-0'} />
			<div className={'bg-black absolute w-1 top-2 bottom-2 right-0'} />
			<div className={'bg-black absolute h-1 bottom-0 left-1 right-1'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-1 right-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-0 right-1'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-1 right-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-0 right-1'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-1 left-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-0 left-1'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-1 left-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-0 left-1'} />
			<div className={'bg-black absolute h-1 w-1 top-1 left-1'} />
			<div className={'bg-black absolute h-1 w-1 bottom-1 left-1'} />
			<div className={'bg-black absolute h-1 w-1 top-1 right-1'} />
			<div className={'bg-black absolute h-1 w-1 bottom-1 right-1'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-0 left-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-0 right-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-0 left-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-0 right-0'} />

			<div className={'bg-stone-secondary-highlight absolute left-2 right-2 top-2 bottom-2'} style={{width: `calc(${progressValue * 100}% - 16px)`}} />
			{progressValue > 0 && <div className={'bg-stone-primary absolute h-1 w-1 ml-1 top-2'} style={{left: `calc(${progressValue * 100}% - 16px)`}} />}
			{progressValue > 0 && <div className={'bg-stone-primary absolute h-1 w-1 ml-1 bottom-2'} style={{left: `calc(${progressValue * 100}% - 16px)`}} />}

			<div className={'bg-stone-primary absolute w-1 left-1 top-2 bottom-2'} />
			<div className={'bg-stone-primary absolute w-1 right-1 top-2 bottom-2'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-2 left-2'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-2 left-2'} />


		</>
	);
}

function	ChainDoubleSimple() {
	return (
		<div className={'relative w-5 flex flex-col items-center'}>
			<FragmentBottom />
			<FragmentLink />
			<FragmentTop />
		</div>
	);
}

function	ChainLong() {
	return (
		<div className={'relative w-5 flex flex-col items-center'}>
			<FragmentBottom />
			<FragmentLink />
			<FragmentFull />
			<FragmentLink />
			<FragmentFull />
			<FragmentLink />
		</div>
	);
}

const	classMappingImg = [
	'',
	'/front/barbarian.svg',
	'/bard.png',
	'/cleric.png',
	'/druid.png',
	'/fighter.png',
	'/front/monk.svg',
	'/paladin.png',
	'/ranger.png',
	'/rogue.png',
	'/sorcerer.png',
	'/wizard.png',
];

function	AdventurerTab({adventurer, updateRarity, provider}) {
	const	[selectedTab, set_selectedTab] = useState(0);

	return (
		<Box className={'flex flex-col w-full mt-2'}>
			<div className={'flex flex-col md:flex-row w-full space-x-0 md:-space-x-1'}>
				<div
					onClick={() => set_selectedTab(0)}
					className={`w-full cursor-pointer text-center border-solid ${selectedTab === 0 ? 'border-b-0 bg-gray-principal md:bg-white dark:bg-dark-400 md:dark:bg-dark-600' : 'border-b-0 md:border-b-4'} border-black dark:border-dark-100 text-center py-4`}>
					<p>{'Skills'}</p>
				</div>
				<div
					onClick={() => set_selectedTab(1)}
					className={`w-full cursor-pointer text-center border-solid border-l-0 md:border-l-4 ${selectedTab === 1 ? 'bg-gray-principal md:bg-white dark:bg-dark-400 md:dark:bg-dark-600 border-b-4 md:border-b-0' : 'border-b-4 md:border-b-4'} border-black dark:border-dark-100 text-center py-4`}>
					<p>{'Inventory'}</p>
				</div>
			</div>
			<div className={'w-full border-black dark:border-dark-100 py-4 md:-mt-1'}>
				{selectedTab === 0 ? <Skills adventurer={adventurer} updateRarity={updateRarity} provider={provider} /> : <Inventory adventurer={adventurer} />}
			</div>
		</Box>
	);
}

function	Info({adventurer, updateRarity, provider}) {
	const	canLevelUp = adventurer.xp >= (xpRequired(adventurer.level));
	return (
		<Box className={'nes-container pt-6 px-4 with-title w-full md:w-2/3'}>
			<p className={'title bg-white dark:bg-dark-600 z-50 relative'} style={{paddingTop: 2}}>{adventurer.tokenID}</p>
			<div className={'flex flex-row items-center w-full py-2'}>
				<div className={'opacity-80 text-xs md:text-sm w-48'}>{'ID:'}</div>
				<div className={'w-full text-right md:text-left pr-4 md:pr-0'}>
					<p>{adventurer.tokenID}</p>
				</div>
			</div>
			<div className={'flex flex-row items-center w-full py-2'}>
				<div className={'opacity-80 text-xs md:text-sm w-48'}>{'CLASS:'}</div>
				<div className={'w-full text-right md:text-left pr-4 md:pr-0'}>
					<p>{CLASSES[adventurer.class].name}</p>
				</div>
			</div>
			<div className={'flex flex-row items-center w-full py-2'}>
				<div className={'opacity-80 text-xs md:text-sm w-48'}>{'LEVEL:'}</div>
				<div className={'w-full text-right md:text-left pr-4 md:pr-0'}>
					<p>{adventurer.level}</p>
				</div>
			</div>
			<div className={'flex flex-row items-center w-full py-2'}>
				<div className={'opacity-80 text-xs md:text-sm w-48'}>{'GOLD:'}</div>
				<div className={'w-full text-right md:text-left pr-4 md:pr-0'}>
					<p>{`${Number(adventurer?.gold?.balance || 0) === 0 ? '0' : adventurer.gold.balance}`}</p>
				</div>
			</div>
			<div className={'flex flex-row items-center w-full py-2 relative'}>
				<div className={'opacity-80 text-sm w-48'}>{'XP:'}</div>
				<div className={'w-full'}>
					<div
						onClick={() => {
							if (canLevelUp) {
								levelUp({
									provider,
									contractAddress: process.env.RARITY_ADDR,
									tokenID: adventurer.tokenID,
								}, ({error, data}) => {
									if (error) {
										return console.error(error);
									}
									updateRarity(data);
								});
							}
						}}
						className={`nes-progress border-solid border-2 border-black dark:border-dark-400 w-full relative ${canLevelUp ? 'cursor-pointer' : ''}`}>
						<progress
							className={`progressbar h-full ${canLevelUp ? 'is-warning animate-pulse' : 'is-primary'} w-full absolute p-1 inset-0`}
							value={adventurer.xp}
							max={xpRequired(adventurer.level)} />
						<p className={`text-sx absolute inset-0 h-full w-full text-center flex justify-center items-center ${canLevelUp ? 'text-black' : 'text-white text-shadow'}`}>
							{canLevelUp ? 'LEVEL-UP!' : `${Number(adventurer.xp)} / ${xpRequired(adventurer.level)}`}
						</p>
					</div>
				</div>
			</div>
		</Box>
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

	function	onDec() {
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
	}
	function	onInc() {
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
	}

	return (
		<BoxAlternate
			className={'bg-stone-primary flex justify-between pl-4 text-white text-regular-bigger'}
			backgroundColor={'bg-stone-primary'}
			borderStyle={'bg-black'}>
			{name}
			<div className={'flex flex-row justify-center items-center'}>
				<FrameArrow
					onClick={onDec}
					disabled={isInit || updateAttribute[name] === value || !toUpdate}
					iconClassName={'transform rotate-180'} />
				<div className={'w-14 text-center'}>{updateAttribute[name]}</div>
				<FrameArrow
					onClick={onInc}
					disabled={isInit || getNextRemainingPoints() < 0 || !toUpdate} />
			</div>
		</BoxAlternate>
	);
}

function	LeftPanel({adventurerClass, adventurerLevel, adventurerGold, adventurerXp}) {
	return (
		<div className={'w-full'}>
			<div className={'w-full'}>
				<div className={'w-full h-83 flex justify-center items-center bg-black relative'}>
					<Image
						src={classMappingImg[adventurerClass]}
						loading={'eager'}
						quality={100}
						width={256}
						height={256} />
					<FrameType0 />
				</div>
				<div className={'w-full flex flex-row border-b-4 border-black'}>
					<div className={'relative h-22 min-w-22 w-22'}>
						<FrameType3 />
						<div className={'flex items-center text-white flex-col justify-center w-full h-full z-10 relative'}>
							<p className={'text-regular text-center w-full mb-1'}>{'LVL'}</p>
							<p className={'text-heading text-center w-full'}>{adventurerLevel}</p>
						</div>
					</div>
					<div className={'relative h-22 w-full border-l-4 border-r-4 border-black'}>
						<FrameType3 />
						<div className={'p-5 flex items-center h-full'}>
							<div className={'flex items-center text-white flex-col justify-center w-full z-10 relative h-12 px-2 py-2'}>
								<Progress
									value={adventurerXp}
									max={xpRequired(adventurerLevel)} />
								<p className={'text-regular-bigger text-center w-full h-full flex justify-center items-center relative'}>
									{`${Number(adventurerXp)}/${xpRequired(adventurerLevel)}`}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className={'w-full flex flex-row border-r-4 border-black'}>
					<div className={'relative h-22 w-full border-r-4 border-black'}>
						<FrameType3 />
						<div className={'p-5 flex items-center h-full'}>
							<div className={'flex items-center text-white flex-col justify-center w-full z-10 relative h-12 px-2 py-2'}>
								<p className={'text-heading w-full h-full flex items-center relative'}>
									{`${formatAmount(Number(adventurerGold || 0) === 0 ? '0' : adventurerGold)} Gold`}
								</p>
							</div>
						</div>
					</div>
					<div className={'relative h-22 min-w-22 w-22'}>
						<FrameType3 />
						<div className={'flex items-center text-white flex-col justify-center w-full h-full z-10 relative'}>
							<Gold />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function	CenterPanel({adventurer, updateRarity, provider}) {
	const	[updateAttribute, set_updateAttribute] = useState({
		strength: adventurer?.attributes?.strength,
		dexterity: adventurer?.attributes?.dexterity,
		constitution: adventurer?.attributes?.constitution,
		intelligence: adventurer?.attributes?.intelligence,
		wisdom: adventurer?.attributes?.wisdom,
		charisma: adventurer?.attributes?.charisma,
		maxPoints: adventurer?.attributes?.maxPoints,
		remainingPoints: adventurer?.attributes?.remainingPoints
	});

	async function buyPoints() {
		if (updateAttribute.remainingPoints === 0) {
			setAttributes({
				provider,
				contractAddress: process.env.RARITY_ATTR_ADDR,
				_summoner: adventurer.tokenID,
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
		<div className={'w-full'}>
			<div className={'flex flex-col w-full h-full'}>
				<div className={'w-full flex flex-row border-b-4 border-r-4 border-black'}>
					<div className={'relative h-17 w-full'}>
						<FrameType3 />
						<div className={'flex items-center text-white flex-col justify-center w-full h-full z-10 relative'}>
							<p className={'text-heading text-center w-full'}>{'ATTRIBUTES'}</p>
						</div>
					</div>
				</div>
				<div className={'w-full h-full flex flex-row border-r-4 border-black'}>
					<div className={'relative flex flex-col h-full w-full py-5'}>
						<FrameType3 />
						<div className={'h-full relative px-5'}>
							<p className={'text-regular text-center mt-3 mb-6'}>
								{updateAttribute.remainingPoints >= 0 ? (
									updateAttribute.remainingPoints === 0 ?
										'Save you stats !'
										:
										`YOU HAVE ${updateAttribute.remainingPoints}  POINTS TO SPEND!`
										
								) : null}
							</p>
							<div className={'space-y-2'}>

								<Attribute
									isInit={adventurer?.attributes?.isInit}
									value={adventurer.attributes.strength}
									updateAttribute={updateAttribute}
									set_updateAttribute={set_updateAttribute}
									toUpdate={updateAttribute.remainingPoints >= 0}
									name={'strength'} />
								<Attribute
									isInit={adventurer?.attributes?.isInit}
									value={adventurer.attributes.dexterity}
									updateAttribute={updateAttribute}
									set_updateAttribute={set_updateAttribute}
									toUpdate={updateAttribute.remainingPoints >= 0}
									name={'dexterity'} />
								<Attribute
									isInit={adventurer?.attributes?.isInit}
									value={adventurer.attributes.constitution}
									updateAttribute={updateAttribute}
									set_updateAttribute={set_updateAttribute}
									toUpdate={updateAttribute.remainingPoints >= 0}
									name={'constitution'} />
								<Attribute
									isInit={adventurer?.attributes?.isInit}
									value={adventurer.attributes.intelligence}
									updateAttribute={updateAttribute}
									set_updateAttribute={set_updateAttribute}
									toUpdate={updateAttribute.remainingPoints >= 0}
									name={'intelligence'} />
								<Attribute
									isInit={adventurer?.attributes?.isInit}
									value={adventurer.attributes.wisdom}
									updateAttribute={updateAttribute}
									set_updateAttribute={set_updateAttribute}
									toUpdate={updateAttribute.remainingPoints >= 0}
									name={'wisdom'} />
								<Attribute
									isInit={adventurer?.attributes?.isInit}
									value={adventurer.attributes.charisma}
									updateAttribute={updateAttribute}
									set_updateAttribute={set_updateAttribute}
									toUpdate={updateAttribute.remainingPoints >= 0}
									name={'charisma'} />
							</div>

						</div>
						<div className={'px-5 flex items-center w-full'}>
							<FrameButton>
								{'SAVE STATS'}
							</FrameButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function	RightPanel() {
	return (
		<div className={'w-76 min-w-76'}>
			<div className={'flex flex-col w-full h-full'}>
				<div className={'w-full flex flex-row border-b-4 border-black'}>
					<div className={'relative h-17 w-full'}>
						<FrameType3 />
						<div className={'flex items-center text-white flex-col justify-center w-full h-full z-10 relative'}>
							<p className={'text-heading text-center w-full'}>{'ACTIONS'}</p>
						</div>
					</div>
				</div>
				<div className={'w-full flex flex-row border-b-4 border-black'}>
					<div className={'relative w-full py-5'}>
						<FrameType3 />
						<div className={'px-5 flex items-center w-full pb-2'}>
							<FrameButton>
								{'GO TO ADVENTURE'}
							</FrameButton>
						</div>
						<div className={'px-5 flex items-center w-full'}>
							<FrameButton>
								{'SELECT ADVENTURER'}
							</FrameButton>
						</div>
					</div>
				</div>

				<div className={'w-full h-full flex flex-row border-black'}>
					<div className={'relative w-full py-5'}>
						<FrameType3 />
						<div className={'flex items-center text-white flex-col justify-center w-full h-full z-10 relative px-5'}>
							<Runes />
						</div>
					</div>
				</div>

				<div className={'w-full flex flex-row border-t-4 border-black'}>
					<div className={'relative w-full py-5'}>
						<FrameType3 />
						<div className={'px-5 flex items-center w-full pb-2'}>
							<FrameButton>
								{'SKILLS'}
							</FrameButton>
						</div>
						<div className={'px-5 flex items-center w-full'}>
							<FrameButton>
								{'INVENTORY'}
							</FrameButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function	Aventurer({rarity, provider, updateRarity, router, chainTime}) {
	return (
		<>
			<div className={'flex flex-row max-w-screen-lg w-full mx-auto'}>
				<div className={'relative w-1/3 flex flex-row justify-between px-7'}>
					<ChainDoubleSimple /> {/* 28px left */}
					<ChainDoubleSimple /> {/* 28px right */}
				</div>
				<div className={'relative w-2/3 flex flex-row justify-end pr-7 -mb-96'}>
					<ChainLong /> {/* 28px left */}
				</div>
			</div>
			<div className={'flex flex-row max-w-screen-lg w-full mx-auto'}>
				<div className={'relative w-1/3 flex flex-row border-4 border-black h-25'}>
					<FrameType3 />
					<div className={'flex items-center text-white flex-col justify-center w-full h-full z-10 relative'}>
						<p className={'text-heading-bigger text-center w-full'}>{CLASSES[rarity.class].name}</p>
						<p className={'text-regular text-center w-full'}>{rarity.tokenID}</p>
					</div>
				</div>
			</div>
			<div className={'flex flex-row max-w-screen-lg w-full mx-auto'}>
				<div className={'relative w-full flex flex-row border-4 border-black -mt-1 bg-stone-primary'}>
					<LeftPanel
						adventurerClass={rarity.class}
						adventurerLevel={rarity.level}
						adventurerGold={rarity?.gold?.balance}
						adventurerXp={rarity.xp} />
					<CenterPanel
						adventurer={rarity}
						updateRarity={updateRarity}
						provider={provider}
					/>
					<RightPanel />
				</div>
			</div>
		</>
	);


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
							<Balloon
								adventurer={rarity}
								chainTime={chainTime}
								updateRarity={updateRarity}
								provider={provider}
								router={router} />
						</section>
					</div>
				</div>
			</div>
			<div className={'flex flex-col md:flex-row w-full space-x-0 md:space-x-4 space-y-6 md:space-y-0'}>
				<Info adventurer={rarity} updateRarity={updateRarity} provider={provider} />
				<Attributes adventurer={rarity} updateRarity={updateRarity} provider={provider} />
			</div>
			<AdventurerTab adventurer={rarity} updateRarity={updateRarity} provider={provider} />
		</div>
	);
}

export default Aventurer;