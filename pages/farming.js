import	React						from	'react';
import	Image						from	'next/image';
import	{Contract}					from	'ethcall';
import	dayjs						from	'dayjs';
import	relativeTime				from	'dayjs/plugin/relativeTime';
import	duration					from	'dayjs/plugin/duration';
import	useWeb3						from	'contexts/useWeb3';
import	useRarity					from	'contexts/useRarity';
import	useInventory				from	'contexts/useInventory';
import	useClientEffect				from	'hooks/useClientEffect';
import	Template					from	'components/templates/Head';
import	RowFarms					from	'components/layout/RowFarms';
import	ModalHelpProfessions		from	'components/modals/HelpProfessions';
import	ModalFarmUpgrade			from	'components/modals/ModalFarmUpgrade';
import	Section						from	'components/layout/Section';
import	{harvest, upgrade}			from	'utils/actions/rarity_extended_farming';
import	performBatchedUpdates		from	'utils/performBatchedUpdates';
import	* as ABI					from	'utils/abi/mixed.min.abi';
import	{WOOD_TIERS, ORE_TIERS}		from	'utils/codex/extentions/rarity_extended_farming';
import	{newEthCallProvider}		from	'utils';

dayjs.extend(relativeTime);
dayjs.extend(duration);


function	ElementFarm({name, address, tier, src, width, height, level}) {
	const	{provider, chainID, chainTime} = useWeb3();
	const	{currentAdventurer, updateRarity} = useRarity();
	const	{updateInventory} = useInventory();
	const	[farmUpgrade, set_farmUpgrade] = React.useState(0);
	const	[estimateHarvest, set_estimateHarvest] = React.useState(0);
	const	[nextHarvest, set_nextHarvest] = React.useState({humanized: 'soon', isPossible: false});
	const	[modalOpen, set_modalOpen] = React.useState(false);

	const prepareFarm = React.useCallback(async function prepareFarm(_currentAdventurer) {
		if (provider && _currentAdventurer) {
			const	contract = new Contract(address, ABI.RARITY_EXTENDED_FARM_BASE_ABI);
			const	ethcallProvider = await newEthCallProvider(provider, Number(chainID) === 1337);
			const	callResults = await ethcallProvider.tryAll([
				contract.estimateHarvest(_currentAdventurer.tokenID),
				contract.nextHarvest(_currentAdventurer.tokenID),
				contract.upgradeLevel(_currentAdventurer.tokenID),
			]);
			const	[estimate, next, upgradeLevel] = callResults;
			const	[upgradePrice] = await ethcallProvider.tryAll([contract.upgradePrice(Number(upgradeLevel) + 1)]);
			
			performBatchedUpdates(() => {
				set_farmUpgrade({level: Number(upgradeLevel), price: upgradePrice});
				set_estimateHarvest(Number(estimate));
				set_nextHarvest({
					humanized: Number(next) === 0 ? 'Now' : dayjs(new Date(Number(next) * 1000)).from(dayjs(new Date(chainTime * 1000))),
					isPossible: dayjs(new Date(Number(next) * 1000)).isBefore(dayjs(new Date(chainTime * 1000)))
				});
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [provider, address, chainID]);
	React.useEffect(() => prepareFarm(currentAdventurer), [prepareFarm, currentAdventurer]);

	function onFarm() {
		harvest({
			provider,
			tokenID: currentAdventurer.tokenID,
			farm: address,
		}, ({error}) => {
			if (error) {
				return;
			}
			updateRarity(currentAdventurer.tokenID);
			updateInventory(currentAdventurer.tokenID);
		});
	}

	function onUpgrade() {
		upgrade({
			provider,
			tokenID: currentAdventurer.tokenID,
			farm: address,
			value: farmUpgrade.price
		}, ({error}) => {
			if (error) {
				return;
			}
			prepareFarm();
			updateRarity(currentAdventurer.tokenID);
			updateInventory(currentAdventurer.tokenID);
			set_modalOpen(false);
		});
	}

	return (
		<div className={'flex flex-col p-4 rounded-sm bg-500'}>
			<div className={'flex flex-row justify-between items-center mb-1'}>
				<p className={'text-base font-bold text-plain'}>
					{name}
				</p>
				<div className={'group flex flex-row space-x-0.5'} onClick={() => set_modalOpen(true)}>
					{[...Array((farmUpgrade?.level || 0) + 1)].map((_, index) => (
						<svg key={index} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'} className={'w-4 h-4 opacity-20 group-hover:opacity-100 transition-all cursor-pointer text-plain group-hover-text-highlight'}><g><path d={'M256 38.013c-22.458 0-66.472 110.3-84.64 123.502-18.17 13.2-136.674 20.975-143.614 42.334-6.94 21.358 84.362 97.303 91.302 118.662 6.94 21.36-22.286 136.465-4.116 149.665 18.17 13.2 118.61-50.164 141.068-50.164 22.458 0 122.9 63.365 141.068 50.164 18.17-13.2-11.056-128.306-4.116-149.665 6.94-21.36 98.242-97.304 91.302-118.663-6.94-21.36-125.444-29.134-143.613-42.335-18.168-13.2-62.182-123.502-84.64-123.502z'} fill={'currentcolor'} fillOpacity={'1'}></path></g></svg>
					))}
				</div>
			</div>

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
					disabled={!nextHarvest.isPossible}
					className={'flex mt-4 w-full flex-center button-highlight'}>
					<p>{nextHarvest.isPossible ? `Harvest (~${estimateHarvest} ${name})` : `Available ${nextHarvest.humanized}`}</p>
				</button>
			</div>
			<ModalFarmUpgrade
				onUpgrade={onUpgrade}
				adventurerLevel={level}
				farmUpgrade={farmUpgrade}
				isOpen={modalOpen}
				set_isOpen={set_modalOpen} />
		</div>
	);
}

function	TabFarmWood({access, level}) {
	return (
		<>
			<div className={'grid grid-cols-1 gap-4 px-4 pb-4 md:grid-cols-4 box'}>
				{WOOD_TIERS.filter((e, index) => e.unlocked || access[index]).map((farm) => (
					<ElementFarm key={farm.name} {...farm} level={level} />	
				))}
			</div>

			<div className={'pb-4 mt-8 box'}>
				<div className={'p-4'}>
					<p className={'mb-2 text-lg font-bold text-plain'}>{'Farming Slots'}</p>
					<p className={'w-full text-sm font-normal md:w-3/4 text-plain-60'}>
						{'Once you reach the required level and have enough resources, you can unlock a slot for your farm. You can have as much slots as you want and you can harvest each slot once a day.'}
					</p>
				</div>
				<div className={'grid grid-cols-1 divide-y divide-light-primary-lighter dark:divide-dark-600'}>
					{WOOD_TIERS.filter((e, index) => (!e.unlocked && !access[index])).map((farm) => <RowFarms key={farm.name} farm={farm} level={level} />)}
				</div>
			</div>
		</>
	);
}


function	TabFarmMine({access, level}) {
	return (
		<>
			<div className={'grid grid-cols-1 gap-4 px-4 pb-4 md:grid-cols-4 box'}>
				{ORE_TIERS.filter((e, index) => e.unlocked || access[index]).map((farm) => (
					<ElementFarm key={farm.name} {...farm} />	
				))}
			</div>

			<div className={'pb-4 mt-8 box'}>
				<div className={'p-4'}>
					<p className={'mb-2 text-lg font-bold text-plain'}>{'Farming Slots'}</p>
					<p className={'w-full text-sm font-normal md:w-3/4 text-plain-60'}>
						{'Once you reach the required level and have enough resources, you can unlock a slot for your farm. You can have as much slots as you want and you can harvest each slot once a day.'}
					</p>
				</div>
				<div className={'grid grid-cols-1 divide-y divide-light-primary-lighter dark:divide-dark-600'}>
					{ORE_TIERS.filter((e, index) => (!e.unlocked && !access[index])).map((farm) => <RowFarms key={farm.name} farm={farm} level={level} />)}
				</div>
			</div>
		</>
	);
}

function	Index({tab}) {
	const	{provider, chainID} = useWeb3();
	const	{currentAdventurer} = useRarity();
	const	[access, set_access] = React.useState({woodcutter: [], miner: []});
	
	useClientEffect(() => {
		if (provider && currentAdventurer) {
			performBatchedUpdates(async () => {
				const	farmingWood1 = new Contract(process.env.RARITY_EXTENDED_WOOD_FARM_1, ABI.RARITY_EXTENDED_FARM_BASE_ABI);
				const	farmingWood2 = new Contract(process.env.RARITY_EXTENDED_WOOD_FARM_2, ABI.RARITY_EXTENDED_FARM_BASE_ABI);
				const	farmingWood3 = new Contract(process.env.RARITY_EXTENDED_WOOD_FARM_3, ABI.RARITY_EXTENDED_FARM_BASE_ABI);
				const	farmingWood4 = new Contract(process.env.RARITY_EXTENDED_WOOD_FARM_4, ABI.RARITY_EXTENDED_FARM_BASE_ABI);
				const	farmingWood5 = new Contract(process.env.RARITY_EXTENDED_WOOD_FARM_5, ABI.RARITY_EXTENDED_FARM_BASE_ABI);
				const	farmingOre1 = new Contract(process.env.RARITY_EXTENDED_ORE_FARM_1, ABI.RARITY_EXTENDED_FARM_BASE_ABI);
				const	farmingOre2 = new Contract(process.env.RARITY_EXTENDED_ORE_FARM_2, ABI.RARITY_EXTENDED_FARM_BASE_ABI);
				const	farmingOre3 = new Contract(process.env.RARITY_EXTENDED_ORE_FARM_3, ABI.RARITY_EXTENDED_FARM_BASE_ABI);
				const	farmingOre4 = new Contract(process.env.RARITY_EXTENDED_ORE_FARM_4, ABI.RARITY_EXTENDED_FARM_BASE_ABI);
				const	farmingOre5 = new Contract(process.env.RARITY_EXTENDED_ORE_FARM_5, ABI.RARITY_EXTENDED_FARM_BASE_ABI);

				const	ethcallProvider = await newEthCallProvider(provider, Number(chainID) === 1337);
				const	callResults = await ethcallProvider.tryAll([
					farmingWood1.adventurerHasAccess(currentAdventurer.tokenID),
					farmingWood2.adventurerHasAccess(currentAdventurer.tokenID),
					farmingWood3.adventurerHasAccess(currentAdventurer.tokenID),
					farmingWood4.adventurerHasAccess(currentAdventurer.tokenID),
					farmingWood5.adventurerHasAccess(currentAdventurer.tokenID),
					farmingOre1.adventurerHasAccess(currentAdventurer.tokenID),
					farmingOre2.adventurerHasAccess(currentAdventurer.tokenID),
					farmingOre3.adventurerHasAccess(currentAdventurer.tokenID),
					farmingOre4.adventurerHasAccess(currentAdventurer.tokenID),
					farmingOre5.adventurerHasAccess(currentAdventurer.tokenID),
				]);
				set_access({
					woodcutter: {
						0: true,
						1: callResults[0],
						2: callResults[1],
						3: callResults[2],
						4: callResults[3],
						5: callResults[4],
					},
					miner: {
						0: true,
						1: callResults[5],
						2: callResults[6],
						3: callResults[7],
						4: callResults[8],
						5: callResults[9],
					},
				});
			});
		}
	}, [provider, currentAdventurer]);

	if (tab === 0) {
		return (<TabFarmWood access={access.woodcutter} level={currentAdventurer?.professions?.wood?.level}/>);
	}
	if (tab === 1) {
		return (<TabFarmMine access={access.miner} level={currentAdventurer?.professions?.ore?.level} />);
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