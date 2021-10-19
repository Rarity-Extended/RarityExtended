/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 19th 2021
**	@Filename:				index.js
******************************************************************************/

import	React, {useState}	from	'react';
import	AutowidthInput		from	'react-autowidth-input';
import	toast				from	'react-hot-toast';
import	Box					from	'components/Box';
import	Image				from	'next/image';
import	Attributes			from	'sections/SectionCharacterSheet/Attributes';
import	Balloon				from	'sections/SectionCharacterSheet/Balloon';
import	Inventory			from	'sections/SectionCharacterSheet/Inventory';
import	Feats				from	'sections/SectionCharacterSheet/Feats';	
import	Skills				from	'sections/SectionCharacterSheet/Skills';
import	{levelUp, setName}	from	'utils/actions';
import	CLASSES				from	'utils/codex/classes';
import	{xpRequired}		from	'utils/libs/rarity';

const	classMappingImg = [
	'',
	'/classes/front/barbarian.svg',
	'/classes/front/bard.png',
	'/classes/front/cleric.png',
	'/classes/front/druid.png',
	'/classes/front/fighter.png',
	'/classes/front/monk.svg',
	'/classes/front/paladin.png',
	'/classes/front/ranger.png',
	'/classes/front/rogue.png',
	'/classes/front/sorcerer.png',
	'/classes/front/wizard.png',
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
					className={`w-full cursor-pointer text-center border-solid border-l-0 md:border-l-4 ${selectedTab === 1 ? 'bg-gray-principal md:bg-white dark:bg-dark-400 md:dark:bg-dark-600 border-b-0' : 'border-b-0 md:border-b-4'} border-black dark:border-dark-100 text-center py-4`}>
					<p>{'Feats'}</p>
				</div>
				<div
					onClick={() => set_selectedTab(2)}
					className={`w-full cursor-pointer text-center border-solid border-l-0 md:border-l-4 ${selectedTab === 2 ? 'bg-gray-principal md:bg-white dark:bg-dark-400 md:dark:bg-dark-600 border-b-4 md:border-b-0' : 'border-b-4 md:border-b-4'} border-black dark:border-dark-100 text-center py-4`}>
					<p>{'Inventory'}</p>
				</div>
			</div>
			<div className={'w-full border-black dark:border-dark-100 py-4 md:-mt-1'}>
				{selectedTab === 0 ? <Skills adventurer={adventurer} updateRarity={updateRarity} provider={provider} /> : null}
				{selectedTab === 1 ? <Feats adventurer={adventurer} updateRarity={updateRarity} provider={provider} /> : null}
				{selectedTab === 2 ? <Inventory adventurer={adventurer} /> : null}
			</div>
		</Box>
	);
}

function	Info({adventurer, updateRarity, provider}) {
	const	[name, set_name] = useState(adventurer.name || adventurer.tokenID);
	const	canLevelUp = adventurer.xp >= (xpRequired(adventurer.level));
	return (
		<Box className={'nes-container pt-6 px-4 with-title w-full md:w-2/3'}>
			<p className={'title bg-white dark:bg-dark-600 z-50 relative cursor-pointer group'} style={{paddingTop: 2}}>
				<div className={'flex flex-row items-center'}>
					<AutowidthInput
						value={name}
						onChange={(e) => set_name(e.target.value)}
						extraWidth={0}
						placeholder={adventurer.name || adventurer.tokenID}
						className={'bg-opacity-0 bg-white focus:outline-none pl-1 relative uppercase'} />
					<div
						onClick={() => {
							if (name && (name !== (adventurer.name || adventurer.tokenID))) {
								setName({
									provider,
									name,
									tokenID: adventurer.tokenID
								}, ({error}) => {
									console.error(error);
								}, (_toast) => {
									updateRarity(adventurer.tokenID);
									toast.dismiss(_toast);
									toast.success(`You can now call ${adventurer.tokenID}: ${name}!`);
								});
							}
						}}
						className={`ml-1 p-1 -m-1 transition-all opacity-0 ${name && (name !== (adventurer.name || adventurer.tokenID)) ? 'w-7 opacity-100 cursor-pointer' : 'w-0 group-hover:opacity-100 group-hover:w-7 cursor-default'}`}>
						{name && (name !== (adventurer.name || adventurer.tokenID)) ?
							<svg width={'20'} height={'20'} viewBox={'0 0 24 24'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
								<rect x={'6'} y={'16'} width={'4'} height={'4'} fill={'currentcolor'}/>
								<rect x={'2'} y={'12'} width={'4'} height={'4'} fill={'currentcolor'}/>
								<rect x={'14'} y={'8'} width={'4'} height={'4'} fill={'currentcolor'}/>
								<rect x={'18'} y={'4'} width={'4'} height={'4'} fill={'currentcolor'}/>
								<rect x={'10'} y={'12'} width={'4'} height={'4'} fill={'currentcolor'}/>
							</svg>
							:
							<svg width={'20'} height={'20'} viewBox={'0 0 24 24'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
								<path d={'M6.82861 14.6066L9.65704 17.435L5.4144 18.8492L6.82861 14.6066Z'} fill={'currentcolor'}/>
								<rect x={'13.1929'} y={'8.24255'} width={'4'} height={'7'} transform={'rotate(45 13.1929 8.24255)'} fill={'currentcolor'}/>
								<rect x={'17.4351'} y={'4'} width={'4'} height={'4'} transform={'rotate(45 17.4351 4)'} fill={'currentcolor'}/>
							</svg>
						}
					</div>
				</div>
			</p>
			<div className={'flex flex-row items-center w-full py-2 pl-3.5'}>
				<div className={'opacity-80 text-xs md:text-sm w-48'}>{'ID:'}</div>
				<div className={'w-full text-right md:text-left pr-4 md:pr-0'}>
					<p>{adventurer.tokenID}</p>
				</div>
			</div>
			
			<div className={'flex flex-row items-center w-full py-2 pl-3.5'}>
				<div className={'opacity-80 text-xs md:text-sm w-48'}>{'CLASS:'}</div>
				<div className={'w-full text-right md:text-left pr-4 md:pr-0'}>
					<p>{CLASSES[adventurer.class].name}</p>
				</div>
			</div>
			<div className={'flex flex-row items-center w-full py-2 pl-3.5'}>
				<div className={'opacity-80 text-xs md:text-sm w-48'}>{'LEVEL:'}</div>
				<div className={'w-full text-right md:text-left pr-4 md:pr-0'}>
					<p>{adventurer.level}</p>
				</div>
			</div>
			<div className={'flex flex-row items-center w-full py-2 pl-3.5'}>
				<div className={'opacity-80 text-xs md:text-sm w-48'}>{'GOLD:'}</div>
				<div className={'w-full text-right md:text-left pr-4 md:pr-0'}>
					<p>{`${Number(adventurer?.gold?.balance || 0) === 0 ? '0' : adventurer.gold.balance}`}</p>
				</div>
			</div>
			<div className={'flex flex-row items-center w-full py-2 pl-3.5 relative'}>
				<div className={'opacity-80 text-sm w-48'}>{'XP:'}</div>
				<div className={'w-full'}>
					<div
						onClick={() => {
							if (canLevelUp) {
								levelUp({
									provider,
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