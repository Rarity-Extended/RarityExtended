import	React						from	'react';
import	Image						from	'next/image';
import	{ethers}					from	'ethers';
import	{Contract}					from	'ethcall';
import	useWeb3						from	'contexts/useWeb3';
import	useRarity					from	'contexts/useRarity';
import	useInventory				from	'contexts/useInventory';
import	Template					from	'components/templates/Adventurer';
import	RowFarms					from	'components/layout/RowFarms';
import	ModalHelpProfessions		from	'components/modals/HelpProfessions';
import	Section						from	'components/layout/Section';
import	{harvest}					from	'utils/actions/rarity_extended_farming';
import	performBatchedUpdates		from	'utils/performBatchedUpdates';
import	{newEthCallProvider}		from	'utils';

const	RARITY_EXTENDED_WOOD_FARM = [
	process.env.RARITY_EXTENDED_WOOD_FARM_0,
	process.env.RARITY_EXTENDED_WOOD_FARM_1,
	process.env.RARITY_EXTENDED_WOOD_FARM_2,
	process.env.RARITY_EXTENDED_WOOD_FARM_3,
	process.env.RARITY_EXTENDED_WOOD_FARM_4,
	process.env.RARITY_EXTENDED_WOOD_FARM_5,
];
const	RARITY_EXTENDED_ORE_FARM = [
	process.env.RARITY_EXTENDED_ORE_FARM_0,
	process.env.RARITY_EXTENDED_ORE_FARM_1,
	process.env.RARITY_EXTENDED_ORE_FARM_2,
	process.env.RARITY_EXTENDED_ORE_FARM_3,
	process.env.RARITY_EXTENDED_ORE_FARM_4,
	process.env.RARITY_EXTENDED_ORE_FARM_5,
];

const	WOOD_TIERS = [
	{name: 'Wood', tier: 0, src: '/items/farming/tree_1.png', width: 152, height: 248, cost: [], unlocked: true},
	{name: 'Soft Wood', tier: 1, src: '/items/farming/tree_5.png', width: 152, height: 248, cost: [
		{name: 'Wood', src: '0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1', amount: 12}
	]},
	{name: 'Fine Wood', tier: 2, src: '/items/farming/tree_8.png', width: 152, height: 248, cost: [
		{name: 'Wood', src: '0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1', amount: 6},
		{name: 'Soft Wood', src: '0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1', amount: 36}
	]},
	{name: 'Seasoned Wood', tier: 3, src: '/items/farming/tree_4.png', width: 152, height: 248, cost: [
		{name: 'Wood', src: '0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1', amount: 6},
		{name: 'Soft Wood', src: '0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1', amount: 18},
		{name: 'Fine Wood', src: '0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1', amount: 72},
	]},
	{name: 'Hard Wood', tier: 4, src: '/items/farming/tree_7.png', width: 152, height: 248, cost: [
		{name: 'Wood', src: '0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1', amount: 6},
		{name: 'Soft Wood', src: '0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1', amount: 18},
		{name: 'Fine Wood', src: '0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1', amount: 36},
		{name: 'Seasoned Wood', src: '0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1', amount: 120},
	]},
	{name: 'Elder Wood', tier: 5, src: '/items/farming/tree_11.png', width: 294, height: 271, cost: [
		{name: 'Wood', src: '0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1', amount: 6},
		{name: 'Soft Wood', src: '0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1', amount: 18},
		{name: 'Fine Wood', src: '0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1', amount: 36},
		{name: 'Seasoned Wood', src: '0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1', amount: 60},
		{name: 'Hard Wood', src: '0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1', amount: 180},
	]},
];

const	MINE_TIERS = [
	{name: 'Copper Ore', tier: 0, src: '/items/farming/ore-copper.png', width: 256, height: 256, cost: [], unlocked: true},
	{name: 'Iron Ore', tier: 1, src: '/items/farming/ore-iron.png', width: 256, height: 256, cost: [
		{name: 'Copper Ore', src: 'farming/ore-copper', amount: 12}
	]},
	{name: 'Gold Ore', tier: 2, src: '/items/farming/ore-gold.png', width: 256, height: 256, cost: [
		{name: 'Copper Ore', src: 'farming/ore-copper', amount: 6},
		{name: 'Iron Ore', src: 'farming/ore-iron', amount: 36}
	]},
	{name: 'Platinum Ore', tier: 3, src: '/items/farming/ore-platinium.png', width: 256, height: 256, cost: [
		{name: 'Copper Ore', src: 'farming/ore-copper', amount: 6},
		{name: 'Iron Ore', src: 'farming/ore-iron', amount: 18},
		{name: 'Gold Ore', src: 'farming/ore-gold', amount: 72},
	]},
	{name: 'Mithril Ore', tier: 4, src: '/items/farming/ore-mirthril.png', width: 256, height: 256, cost: [
		{name: 'Copper Ore', src: 'farming/ore-copper', amount: 6},
		{name: 'Iron Ore', src: 'farming/ore-iron', amount: 18},
		{name: 'Gold Ore', src: 'farming/ore-gold', amount: 36},
		{name: 'Platinum Ore', src: 'farming/ore-platinium', amount: 120},
	]},
	{name: 'Orichalcum Ore', tier: 5, src: '/items/farming/ore-orichalcum.png', width: 256, height: 256, cost: [
		{name: 'Copper Ore', src: 'farming/ore-copper', amount: 6},
		{name: 'Iron Ore', src: 'farming/ore-iron', amount: 18},
		{name: 'Gold Ore', src: 'farming/ore-gold', amount: 36},
		{name: 'Platinum Ore', src: 'farming/ore-platinium', amount: 60},
		{name: 'Mithril Ore', src: 'farming/ore-mirthril', amount: 180},
	]},
];


function	ElementFarm({name, tier, src, width, height}) {
	const	{provider} = useWeb3();
	const	{currentAdventurer} = useRarity();
	const	{updateInventory} = useInventory();
	const	[estimateHarvest, set_estimateHarvest] = React.useState(0);

	React.useLayoutEffect(() => {
		if (provider && currentAdventurer) {
			const	contract = new ethers.Contract(
				RARITY_EXTENDED_WOOD_FARM[tier], [
					'function estimateHarvest(uint _adventurer) public view returns (uint)',
					'function adventurerHasAccess(uint _adventurer) public view returns (bool)'
				],
				provider
			);
			contract.estimateHarvest(currentAdventurer.tokenID).then((e) => set_estimateHarvest(Number(e)));
		}
	}, [provider, currentAdventurer, tier]);

	function onFarm() {
		harvest({
			provider,
			tokenID: currentAdventurer.tokenID,
			farm: RARITY_EXTENDED_WOOD_FARM[tier],
		}, ({error}) => {
			if (error) {
				return;
			}
			updateInventory(currentAdventurer.tokenID);
		});
	}

	return (
		<div className={'flex flex-col p-4 rounded-sm bg-500'}>
			<p className={'mb-1 text-base font-bold text-plain'}>
				{name}
			</p>
			<p className={'mb-2 text-sm text-plain-60'}>
				{`Tier ${tier}`}
			</p>
			<div className={'flex flex-row justify-center pb-2 mb-4 w-full'}>
				<div className={'flex h-48'}>
					<Image src={src} width={width} height={height} objectFit={'contain'} />
				</div>
			</div>
			<div className={'flex flex-row mt-auto space-x-2'}>
				<button
					onClick={onFarm}
					className={'flex mt-4 w-full flex-center button-highlight'}>
					<p>{`Harvest (~${estimateHarvest} ${name})`}</p>
				</button>
			</div>
		</div>
	);
}

function	TabFarmWood({level, xp}) {
	return (
		<>
			<div className={'grid grid-cols-1 gap-4 px-4 pb-4 md:grid-cols-4 box'}>
				{WOOD_TIERS.filter(e => e.unlocked || e.tier <= level).map((farm) => (
					<ElementFarm key={farm.name} {...farm} />	
				))}
			</div>

			<div className={'pb-4 mt-8 box'}>
				<div className={'p-4'}>
					<p className={'mb-2 text-lg font-bold text-plain'}>{'Farming Slots'}</p>
					<p className={'w-3/4 text-sm font-normal text-plain-60'}>
						{'Once you reach the required level and have enough resources, you can unlock a slot for your farm. You can have as much slots as you want and you can harvest each slot once a day.'}
					</p>
				</div>
				<div className={'grid grid-cols-1 divide-y divide-dark-600'}>
					{WOOD_TIERS.filter((e) => (!e.unlocked && e.tier > level)).map((farm) => <RowFarms key={farm.name} farm={farm} level={level} xp={xp} />)}
				</div>
			</div>
		</>
	);
}


function	TabFarmMine({level, xp}) {
	return (
		<>
			<div className={'grid grid-cols-1 gap-4 px-4 pb-4 md:grid-cols-4 box'}>
				{MINE_TIERS.filter(e => e.unlocked || e.tier <= level).map((farm) => (
					<ElementFarm key={farm.name} {...farm} />	
				))}
			</div>

			<div className={'pb-4 mt-8 box'}>
				<div className={'p-4'}>
					<p className={'mb-2 text-lg font-bold text-plain'}>{'Farming Slots'}</p>
					<p className={'w-3/4 text-sm font-normal text-plain-60'}>
						{'Once you reach the required level and have enough resources, you can unlock a slot for your farm. You can have as much slots as you want and you can harvest each slot once a day.'}
					</p>
				</div>
				<div className={'grid grid-cols-1 divide-y divide-dark-600'}>
					{MINE_TIERS.filter((e) => (!e.unlocked && e.tier > level)).map((farm) => <RowFarms key={farm.name} farm={farm} level={level} xp={xp} />)}
				</div>
			</div>
		</>
	);
}

function	Index({tab}) {
	const	{provider, chainID} = useWeb3();
	const	{currentAdventurer} = useRarity();
	const	[professionsLevel, set_professionsLevel] = React.useState({woodcutter: 0, miner: 0});
	const	[professionsXP, set_professionsXP] = React.useState({woodcutter: 0, miner: 0});

	React.useLayoutEffect(() => {
		const	ABI = [
			{'inputs': [{'internalType': 'uint256','name': '_adventurer','type': 'uint256'}, {'internalType': 'uint256','name': '_farmType','type': 'uint256'}],'name': 'level','outputs': [{'internalType': 'uint256','name': 'level','type': 'uint256'}],'stateMutability': 'view','type': 'function'},
			{'inputs': [{'internalType': 'uint256','name': '_adventurer','type': 'uint256'}, {'internalType': 'uint256','name': '_farmType','type': 'uint256'}],'name': 'xp','outputs': [{'internalType': 'uint256','name': 'level','type': 'uint256'}],'stateMutability': 'view','type': 'function'},
		];
		if (provider && currentAdventurer) {
			performBatchedUpdates(async () => {
				const	farmingCore = new Contract(process.env.RARITY_EXTENDED_FARM_CORE, ABI);
				const	ethcallProvider = await newEthCallProvider(provider, Number(chainID) === 1337);
				const	callResults = await ethcallProvider.tryAll([
					farmingCore.level(currentAdventurer.tokenID, 1),
					farmingCore.xp(currentAdventurer.tokenID, 1),
					farmingCore.level(currentAdventurer.tokenID, 2),
					farmingCore.xp(currentAdventurer.tokenID, 2),
				]);
				set_professionsLevel({woodcutter: callResults[0].toNumber(), miner: callResults[2].toNumber()});
				set_professionsXP({woodcutter: callResults[1].toNumber(), miner: callResults[3].toNumber()});
			});
		}
	}, [provider, currentAdventurer]);

	if (tab === 0) {
		return (<TabFarmWood xp={professionsXP.woodcutter} level={professionsLevel.woodcutter}/>);
	}
	if (tab === 1) {
		return (<TabFarmMine xp={professionsXP.miner} level={professionsLevel.miner}/>);
	}
}
function	Wrapper() {
	return (
		<Section
			title={'Professions'}
			tabs={['Woodcutter', 'Miner']}
			className={'cursor-auto'}
			help={<ModalHelpProfessions />}>
			<Index />
		</Section>
	);
}


Wrapper.getLayout = function getLayout(page) {
	return (
		<Template>
			{page}
		</Template>
	);
};

export default Wrapper;