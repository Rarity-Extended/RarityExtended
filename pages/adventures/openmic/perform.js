/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday October 19th 2021
**	@Filename:				the-stage.js
******************************************************************************/

import	React, {useState, createContext, useContext, useEffect}	from	'react';
import	Image									from	'next/image';
import	Link						from	'next/link';
import	{ethers, utils}				from	'ethers';
import	useWeb3						from	'contexts/useWeb3';
import	useRarity					from	'contexts/useRarity';
import	useInventory				from	'contexts/useInventory';
import	useUI						from	'contexts/useUI';
import	useDungeons					from	'contexts/useDungeons';
import	{perform}					from	'utils/actions/perform';
import	SKILLS						from	'utils/codex/core/skills';
import	OPENMIC_LOOT				from	'utils/codex/items/items_dungeon_openmic.json';
import	CLASSES						from	'utils/codex/core/classes';

const PerformanceContext = createContext(null);
const getIntersection = (a, ...arr) => [...new Set(a)].filter((v) => arr.every((b) => b.includes(v)));

function AdventureResult() {
	const {performanceResult} = useContext(PerformanceContext);

	const title = performanceResult.success
		? performanceResult.crit 
			? 'Legendary Performance !!' 
			: 'Good Show !'
		: 'Oof, you bombed hard...';

	const message = performanceResult.success
		? performanceResult.crit 
			? 'The whole tavern is on its feet, a standing ovation. Even the hooligans are cheering you on. Facu is so impressed he hands you a mission pass !' 
			: 'Well, you\'re no Orpheus or Keoghtom, but you got the job done. The hooligans have settled down and Facu has a humble prize for you !'
		: 'Your performance was so bad it actually made the hooligans worse. Facu only has one word for you. Cringe !';

	return <div className={'mx-auto mt-12 w-full max-w-screen-sm'}>
		<p className={'text-yellow-300'}>{title}</p>
		<p className={'text-sm opacity-80'}>{message}</p>
		<div className={'flex justify-center items-start mt-8 w-full'}>
			{performanceResult.prizes.map(prize => {
				return (
					<div key={prize.tokenId} className={'justify-center w-56 flow'}>
						<div className={'mb-4 text-center'}>
							<Image
								src={OPENMIC_LOOT[prize.name].img}
								loading={'eager'}
								quality={100}
								width={100}
								height={100}
							/>
						</div>
						<div className={'text-xs text-center'}>{OPENMIC_LOOT[prize.name].name}</div>
					</div>
				);
			})}
		</div>
		<Link href={'/adventures/openmic#action'}>
			<div className={'py-2 px-4 mx-4 mt-16 max-w-screen-sm text-base text-center hover:text-white dark:hover:text-dark-600 hover:bg-dark-600 dark:hover:bg-white border-y-4 transition-colors animate-pulse hover:animate-none cursor-pointer md:mx-0'} style={{cursor: 'pointer'}}>
				{'Start a new adventure'}
			</div>
		</Link>
	</div>;
}

function Adventure({router, adventurer}) {
	const	{raritySkins} = useUI();
	const	{rarities, skins} = useRarity();
	const	{inventory, updateInventory} = useInventory();
	const	{updateDungeonForOne} = useDungeons();
	const	{provider} = useWeb3();
	const	[odds, setOdds] = useState('--- %');
	const	performer = rarities[router?.query?.adventurer];
	const	{set_performanceResult} = useContext(PerformanceContext);
	const	defaultSkin = CLASSES[adventurer?.class]?.images.back;
	const	skin = raritySkins ? skins[adventurer?.tokenID] || defaultSkin : defaultSkin;

	const	signer = provider.getSigner();
	const	openmic = new ethers.Contract(
		process.env.DUNGEON_OPEN_MIC_V2_ADDR,
		process.env.DUNGEON_OPEN_MIC_V2_ABI,
		signer
	);

	useEffect(() => {
		openmic.odds(adventurer.tokenID).then((odds) => {
			const result = parseFloat(utils.formatEther(odds));
			setOdds(`${(result * 100).toFixed(0)} %`);
		});
	}, []);

	function abilityModifier(ability) {
		if (ability < 10) return -1;
		return (ability - 10) / 2;
	}

	function abilityModifierFormated(ability) {
		const modifier = abilityModifier(ability);
		if(modifier === 0) return '0';
		if(modifier > 0) return `+${modifier}`;
		return `${modifier}`;
	}

	async function clickPerform() {
		await perform({provider, tokenID: performer.tokenID}, result => {
			if(result.error) {
				console.log(result.error);
			} else {
				set_performanceResult({
					success: result.data.success,
					crit: result.data.crit,
					prizes: result.data.prizes
				});
			}
			updateInventory(performer.tokenID);
			updateDungeonForOne(performer.tokenID);
		});
	}

	const charisma = performer.attributes.charisma;
	const performSkill = performer.skills[SKILLS['Perform'].id - 1];
	const forestTreasures = getIntersection(
		Object.keys(inventory[performer?.tokenID || ''] || {}),
		['0x0000000000000000000000000000000000000001', '0x0000000000000000000000000000000000000002', '0x0000000000000000000000000000000000000003', '0x0000000000000000000000000000000000000004', '0x0000000000000000000000000000000000000005', '0x0000000000000000000000000000000000000006', '0x0000000000000000000000000000000000000007', '0x0000000000000000000000000000000000000008', '0x0000000000000000000000000000000000000009', '0x0000000000000000000000000000000000000010', '0x0000000000000000000000000000000000000011', '0x0000000000000000000000000000000000000012', '0x0000000000000000000000000000000000000013', '0x0000000000000000000000000000000000000014', '0x0000000000000000000000000000000000000015', '0x0000000000000000000000000000000000000016', '0x0000000000000000000000000000000000000017', '0x0000000000000000000000000000000000000018', '0x0000000000000000000000000000000000000019', '0x0000000000000000000000000000000000000020', '0x0000000000000000000000000000000000000021', '0x0000000000000000000000000000000000000022', '0x0000000000000000000000000000000000000023', '0x0000000000000000000000000000000000000024', '0x0000000000000000000000000000000000000025', '0x0000000000000000000000000000000000000026', '0x0000000000000000000000000000000000000027', '0x0000000000000000000000000000000000000028', '0x0000000000000000000000000000000000000029', '0x0000000000000000000000000000000000000030', '0x0000000000000000000000000000000000000031', '0x0000000000000000000000000000000000000032', '0x0000000000000000000000000000000000000033', '0x0000000000000000000000000000000000000034', '0x0000000000000000000000000000000000000035', '0x0000000000000000000000000000000000000036', '0x0000000000000000000000000000000000000037', '0x0000000000000000000000000000000000000038', '0x0000000000000000000000000000000000000039', '0x0000000000000000000000000000000000000040', '0x0000000000000000000000000000000000000041', '0x0000000000000000000000000000000000000042', '0x0000000000000000000000000000000000000043', '0x0000000000000000000000000000000000000044', '0x0000000000000000000000000000000000000045', '0x0000000000000000000000000000000000000046', '0x0000000000000000000000000000000000000047', '0x0000000000000000000000000000000000000048', '0x0000000000000000000000000000000000000049', '0x0000000000000000000000000000000000000050', '0x0000000000000000000000000000000000000051', '0x0000000000000000000000000000000000000052', '0x0000000000000000000000000000000000000053', '0x0000000000000000000000000000000000000054', '0x0000000000000000000000000000000000000055', '0x0000000000000000000000000000000000000056']
	);

	function	renderOptions() {
		return (
			<div className={'grid grid-cols-1 gap-4 pt-4 mt-4 border-t-2 border-black dark:border-dark-300'}>
				<div onClick={clickPerform} className={'flex flex-center button-regular'}>
					<p>{'Sing your Heart out'}</p>
				</div>
				<div onClick={() => router.push('/adventures/openmic')} className={'flex flex-center button-regular'}>
					<p>{'Too much pressure, back off!'}</p>
				</div>
			</div>
		);
	}

	return (
		<section id={'action'} className={'flex relative flex-col mx-auto w-full max-w-screen md:max-w-screen-xl'}>

			<div className={'relative p-4 w-full text-xs box'}>
				<div className={'mx-auto mt-12 w-3/4'}>
					<div className={'flex flex-col items-center'}>

						{/* antagonist */}
						<div className={'flex flex-col items-end w-full'}>
							<p className={'whitespace-nowrap'}>{'Rowdy Tavern Hooligans !'}</p>
							<div className={'flex justify-end items-center w-full'}>
								<div className={'-mr-12'}>
									<Image
										src={'/avatar/ceazor.gif'}
										loading={'eager'}
										quality={90}
										width={100}
										height={100}
									/>
								</div>
								<div className={'-mr-12'}>
									<Image
										src={'/avatar/janet.gif'}
										loading={'eager'}
										quality={90}
										width={120}
										height={120} />
								</div>
								<Image
									src={'/avatar/facu.gif'}
									loading={'eager'}
									quality={90}
									width={150}
									height={150} />
								<div className={'-ml-6'}>
									<Image
										src={'/avatar/ivan.gif'}
										loading={'eager'}
										quality={90}
										width={90}
										height={90} />
								</div>
								<div className={'-ml-12'}>
									<Image
										src={'/avatar/lara.gif'}
										loading={'eager'}
										quality={90}
										width={100}
										height={100} />
								</div>
							</div>
						</div>

						{/* protagonist */}
						<div className={'flex mt-2 w-full md:mt-6'}>
							<div className={'hidden w-60 md:block'} style={{minWidth: 240}}>
								<Image
									src={skin}
									loading={'eager'}
									quality={100}
									width={240}
									height={240} />
							</div>
							<div className={'block w-32 md:hidden'} style={{minWidth: 120}}>
								<Image
									src={skin}
									loading={'eager'}
									quality={100}
									width={120}
									height={120} />
							</div>
							<div className={'mt-auto mb-6 w-full'}>
								<div className={'px-4 pt-6 pb-0 w-full with-title'}>
									<div className={'text-base text-plain'}>{'Performance Check'}</div>
									<div className={'flex justify-between'}>
										<div className={'text-base text-plain-60'}>{'Perform Skill'}</div>
										<div>{'+'}{performSkill}</div>
									</div>
									<div className={'flex justify-between'}>
										<div className={'text-base text-plain-60'}>{'Charisma'}</div>
										<div>{abilityModifierFormated(charisma)}</div>
									</div>
									<div className={'flex justify-between'}>
										<div className={'text-base text-plain-60'}>{'Forest Treasure'}</div>
										<div>{forestTreasures.length ? '+1' : '+0'}</div>
									</div>
									<div className={'flex justify-between'}>
										<div className={'text-base text-plain-60'}>{'Odds'}</div>
										<div>{odds}</div>
									</div>
									<br />
								</div>
							</div>
						</div>

					</div>
				</div>
				<div className={'mx-auto w-3/4'}>
					{renderOptions()}
				</div>
			</div>
		</section>
	);
}

const OpenMic = ({rarities, router}) => {
	const	[performanceResult, set_performanceResult] = useState(null);

	if (!rarities || rarities === {}) {
		return null;
	}

	if (!rarities[router?.query?.adventurer]) {
		if (typeof(window) !== 'undefined')
			router.push('/');
		return null;
	}

	const adventurer = rarities[router?.query?.adventurer];

	return (
		<PerformanceContext.Provider value={{performanceResult, set_performanceResult}}>
			<section className={'relative'}>
				{!performanceResult && <Adventure router={router} adventurer={adventurer}></Adventure>}
				{performanceResult && <AdventureResult></AdventureResult>}
			</section>
		</PerformanceContext.Provider>
	);
};

export default OpenMic;