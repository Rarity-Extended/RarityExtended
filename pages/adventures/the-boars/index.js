/* eslint-disable react-hooks/exhaustive-deps */
import	React, {useEffect, useState}		from	'react';
import	{Contract}							from	'ethcall';
import	{ethers}							from	'ethers';
import	dayjs								from	'dayjs';
import	relativeTime						from	'dayjs/plugin/relativeTime';
import	useRarity							from	'contexts/useRarity';
import	useWeb3								from	'contexts/useWeb3';
import	useInventory						from	'contexts/useInventory';
import	Template							from	'components/templates/Adventurer';
import	AdventureTemplate					from	'components/adventures/Template';
import	DescriptionFormater					from	'components/adventures/DescriptionFormater';
import	OptionsFormater						from	'components/adventures/OptionsFormater';
import	{newEthCallProvider}				from	'utils';
import	ADVENTURE							from	'utils/codex/adventures/the-boars';
import	{protectBoars}						from	'utils/actions/boar';

dayjs.extend(relativeTime);
function	Index({router}) {
	const	{provider, chainID, chainTime} = useWeb3();
	const	{currentAdventurer, updateRarity} = useRarity();
	const	{updateInventory} = useInventory();
	const	[step, set_step] = useState('intro');
	const	[variables, set_variables] = useState({
		'${boar_count}': '0 boar',
		'${loot_fight}': '0 loot',
		'${loot_protect}': '0 loot',
		'${extinction_time}': 'some time since the last boar',
		'${extinction_extact_time}': '-',
		'${extinction_by}': '',
	});

	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	Fetch the relevant data to bring some context to the story, like the number of boars,
	**	the number of loot you can expect, etc.
	**********************************************************************************************/
	const fetchBoarsData = React.useCallback(async () => {
		const	contract = new Contract(process.env.DUNGEON_BOARS_ADDR, process.env.DUNGEON_BOARS_ABI);
		const	calls = [
			contract.boar_population(),
			contract.extinction(),
			contract.extinctionBy(),
			currentAdventurer?.tokenID ? contract.simulate_reproduce(currentAdventurer?.tokenID) : null,
			currentAdventurer?.tokenID ? contract.simulate_kill(currentAdventurer?.tokenID) : null,
		];
		const	ethcallProvider = await newEthCallProvider(provider, Number(chainID) === 1337);
		const	multicallResult = await ethcallProvider.all(calls);
		const	[boar_population, extinction, extinctionBy, simulate_reproduce, simulate_kill] = multicallResult;
		let		extinctionByName = '';

		if (extinctionBy > 0) {
			const	nameContract = new ethers.Contract(
				process.env.RARITY_EXTENDED_NAME,
				process.env.RARITY_EXTENDED_NAME_ABI,
				provider
			);
			extinctionByName = await nameContract.get_name(extinctionBy);
			set_step('end');
		}
		set_variables({
			'${boar_count}': `${Number(boar_population) == -1 ? 'some' : Number(boar_population)} boar${Number(boar_population) === 1 ? '' : 's'}`,
			'${loot_protect}': `${Number(simulate_reproduce || 0)} loot${Number(simulate_reproduce || 0) <= 1 ? '' : 's'}`,
			'${loot_fight}': `${Number(simulate_kill || 0)} loot${Number(simulate_kill || 0) <= 1 ? '' : 's'}`,
			'${extinction_time}': `${dayjs(new Date(extinction * 1000)).from(dayjs(new Date(chainTime * 1000)), false)} since the last boar`,
			'${extinction_exact_time}': `${dayjs(new Date(extinction * 1000)).format('DD/MM/YYYY [at] HH:mm:ss')}`,
			'${extinction_by}': extinctionByName || extinctionBy,
		});
	}, [chainTime, provider, currentAdventurer.tokenID]);
	useEffect(() => fetchBoarsData(), [fetchBoarsData]);

	function	onFightBoars() {
		router.push(`/adventures/the-boars/fight?adventurer=${currentAdventurer.tokenID}`);
	}
	function	onProtectBoars() {
		protectBoars({
			provider,
			tokenID: currentAdventurer?.tokenID,
		}, ({error, wait}) => {
			if (wait) {
				return;	
			}
			if (error) {
				return console.error(error);
			}
			updateRarity(currentAdventurer.tokenID);
			updateInventory(currentAdventurer.tokenID);
		});
	}
	function	onBack() {
		router.push('/adventures');
	}

	return (
		<AdventureTemplate
			cover={'/adventures/the-boars/header.jpeg'}
			overlayColor={'#554a40'}
			rightText={'THE BOARS WILL HUNT YOU DOWN UNLESS YOU DO'}>
			<div>
				<h1 className={'py-4 text-xl font-bold'}>{'THE BOARS'}</h1>
			</div>
			<div className={'text-base leading-relaxed normal-case text-plain'}>
				<DescriptionFormater
					addr={process.env.DUNGEON_BOARS_ADDR}
					rawDescription={ADVENTURE[currentAdventurer?.adventures?.boars?.canAdventure ? step : 'rest'].description}
					variables={{
						...variables,
						'${adventurer_name}': currentAdventurer.displayName,
						'${next_adventure}': currentAdventurer?.adventures?.boars?.nextAdventure
					}} />
			</div>
			<div className={'grid grid-cols-1 gap-4 pt-4 mt-4 border-t-2 border-black dark:border-dark-300'}>
				<OptionsFormater
					options={ADVENTURE[currentAdventurer?.adventures?.boars?.canAdventure ? step : 'rest'].options}
					onChoice={(choice) => {
						if (choice === 'fight') {
							onFightBoars();
						} else if (choice === 'gather') {
							onProtectBoars();
						} else if (choice === 'adventures') {
							onBack();
						} else {
							const	element_to_scroll_to = document.getElementById('action');
							element_to_scroll_to.scrollIntoView();
							set_step(choice);
						}
					}}
				/>
			</div>
		</AdventureTemplate>
						
	);
}

Index.getLayout = function getLayout(page) {
	return (
		<Template>
			{page}
		</Template>
	);
};

export default Index;
