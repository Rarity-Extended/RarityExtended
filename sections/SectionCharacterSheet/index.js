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
			<div className={'flex flex-row items-center w-full py-2'}>
				<div className={'opacity-80 text-sm w-48'}>{'XP:'}</div>
				<div className={'w-full'}>
					<div
						onClick={() => {
							if (adventurer.xp >= (xpRequired(adventurer.level))) {
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
						className={`nes-progress border-solid border-2 border-black dark:border-dark-400 w-full relative ${adventurer.xp >= (xpRequired(adventurer.level)) ? 'cursor-pointer' : ''}`}>
						<progress
							className={`progressbar h-full ${adventurer.xp >= (xpRequired(adventurer.level)) ? 'is-warning animate-pulse' : 'is-primary'} w-full absolute p-1.5 inset-0`}
							value={adventurer.xp}
							max={xpRequired(adventurer.level)} />
						<p className={`text-sm absolute inset-0 h-full w-full text-center flex justify-center items-center ${adventurer.xp >= (xpRequired(adventurer.level)) ? '' : 'hidden'}`}>{'LEVEL-UP!'}</p>
					</div>
				</div>
			</div>
		</Box>
	);
}

function	Aventurer({rarity, provider, updateRarity, router, chainTime}) {
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