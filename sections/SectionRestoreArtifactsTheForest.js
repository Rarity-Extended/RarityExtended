/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 12th 2021
**	@Filename:				SectionArtifactsTheForest.js
******************************************************************************/

import	React, {useEffect, useState, useCallback}	from	'react';
import	Image										from	'next/image';
import	useSWR										from	'swr';
import	{Contract}									from	'ethcall';
import	useWeb3										from	'contexts/useWeb3';
import	useRarity									from	'contexts/useRarity';
import	{toAddress, fetcher, newEthCallProvider}	from	'utils';
import	{restoreTreasureTheForest}					from	'utils/actions/dungeon_theForest';
import	CLASSES										from	'utils/codex/classes';
import	THE_FOREST_LOOT								from	'utils/codex/items_dungeon_theForest.json';


function	Artifact({img, name, level, magic, onClick}) {
	return (
		<div
			className={'w-full md:w-60 border-black dark:border-dark-100 border-4 p-4 flex justify-center items-center flex-col group hover:bg-gray-principal dark:hover:bg-dark-100 transition-colors cursor-pointer relative mb-4 md:mb-0'}
			onClick={onClick}>
			<Image
				src={img}
				quality={100}
				width={240}
				height={240} />
			<p className={'text-xs justify-center text-center group-hover:underline'}>{name}</p>
			<p className={'text-xss justify-center text-center mt-1'}>{`LVL ${level} - MAGIC ${magic}`}</p>
		</div>
	);
}

function	SectionArtifactsTheForest({shouldDisplay, adventurers, adventurersCount}) {
	const	[migratableArtifacts, set_migratableArtifacts]	= useState([]);
	const	[isLoaded, set_isLoaded] = useState(false);
	const	[forAdventurer, set_forAdventurer] = useState(adventurers[0].tokenID);
	const	[, set_nonce]	= useState(0);
	const	{address, provider, chainID} = useWeb3();
	const	{updateRarity} = useRarity();
	const	getV1Artifacts = `https://api.ftmscan.com/api
		?module=account
		&action=tokennfttx
		&contractaddress=${process.env.DUNGEON_THE_FOREST_V1_ADDR}
		&address=${address}
		&apikey=${process.env.FMT_KEY}`;
	const	{data} = useSWR(getV1Artifacts, fetcher, {revalidateOnFocus: false, revalidateOnReconnect: false});

	/**************************************************************************
	**	Prepare the multicall to get most of the data
	**************************************************************************/
	function		prepareMultiCall(tokenID) {
		const	rarityDungeonForest = new Contract(process.env.DUNGEON_THE_FOREST_V1_ADDR, process.env.DUNGEON_THE_FOREST_V1_ABI);
		return [
			rarityDungeonForest.treasure(tokenID),
		];
	}
	/**************************************************************************
	**	Fetch the data from the prepared multicall to get most of the data
	**************************************************************************/
	const fetchV1Artifacts = useCallback(async (calls) => { 
		const	ethcallProvider = await newEthCallProvider(provider, Number(chainID) === 1337);
		const	callResult = await ethcallProvider.all(calls);
		return (callResult);
	}, [chainID, provider]);

	const prepareArtifacts = useCallback(async (artifacts) => { 
		const	addr = address;
		const	addressArtifacts = {};
		artifacts.forEach((artifact) => {
			if (toAddress(artifact.to) === toAddress(addr)) {
				addressArtifacts[artifact.tokenID] = {...artifact, isOwner: true};
			} else {
				addressArtifacts[artifact.tokenID] = {...artifact, isOwner: false};
			}
		});

		const	preparedCalls = [];
		const	usableArtifacts = Object.values(addressArtifacts).filter(e => e.isOwner);
		usableArtifacts.forEach((artifact) => {
			preparedCalls.push(...prepareMultiCall(artifact.tokenID));
		});

		const	callResults = await fetchV1Artifacts(preparedCalls);
		for (let index = 0; index < usableArtifacts.length; index++) {
			const element = usableArtifacts[index];
			await setMigratableArtifacts(element.tokenID, callResults[index]);
			set_isLoaded(true);
		}
		set_isLoaded(true);
	}, [set_isLoaded, address, fetchV1Artifacts]);

	function	setMigratableArtifacts(tokenID, multicallResult) {
		const	artifact = multicallResult;
		const	{_itemName, _magic, _level} = artifact;

		if (_itemName) {
			set_migratableArtifacts((prev) => ({...prev, [tokenID]: {
				tokenID: tokenID,
				itemName: _itemName,
				magic: _magic,
				level: _level,
			}}));
			set_nonce(n => n + 1);
		}
	}

	/**************************************************************************
	**	Trigger a re-fetch of the artifacts
	**************************************************************************/
	const fetchArtifacts = useCallback(async () => { 
		const {result} = await fetcher(`https://api.ftmscan.com/api
			?module=account
			&action=tokennfttx
			&contractaddress=${process.env.DUNGEON_THE_FOREST_V1_ADDR}
			&address=${address}
			&apikey=${process.env.FMT_KEY}`);
		prepareArtifacts(result || []);
	}, [prepareArtifacts, address]);

	/**************************************************************************
	**	Once we got data from FTMScan, try detect old artifacts
	**************************************************************************/
	useEffect(() => {
		if (data?.result) {
			if (data?.status === 0) {
				return setTimeout(() => fetchArtifacts(), 100);
			}
			prepareArtifacts(data?.result || []);
		}
	}, [data, fetchArtifacts, prepareArtifacts]);

	if (!shouldDisplay) {
		return null;
	}
	if (adventurersCount === 0) {
		return (
			<div className={'flex flex-col w-full'}>
				<p className={'text-xs'}>
					{'> You first need to recruit an adventurer !'}
				</p>
			</div>
		);
	}
	if (!isLoaded) {
		return (
			<div className={'flex flex-col w-full relative h-36'}>
				<div className={'absolute mt-10 inset-0 backdrop-blur-3xl bg-opacity-40 cursor-not-allowed'}>
					<div className={'loader'} />
					<div className={'absolute inset-0 mt-32 flex justify-center items-center'}>
						<p className={'center-text text-white z-40'}>{'Retrieving your adventurers...'}</p>
					</div>
				</div>
			</div>
		);
	}
	if (Object.values(migratableArtifacts).length === 0) {
		return (
			<div className={'flex flex-col w-full'}>
				<p className={'text-xs'}>
					{'> THERE IS NOTHING TO RESTORE'}
				</p>
			</div>
		);
	}
	return (
		<div className={'flex flex-col w-full'}>
			<div className={'flex flex-row w-full items-center pt-8 mb-4 pl-1'}>
				<label className={'text-xs'}>{'Restore for: '}</label>
				<select
					onChange={e => set_forAdventurer(e.target.value)}
					className={'bg-opacity-0 bg-black ml-4 border-2 border-black dark:border-dark-100 focus:outline-none text-xs uppercase'}>
					{adventurers?.map(e => <option key={e.tokenID} value={e.tokenID}>{`${e.tokenID} - ${CLASSES[e.class].name} level ${e.level}`}</option>)}
				</select>
			</div>
		

			<div className={'relative'}>
				<div className={'grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8'}>
					{Object.values(migratableArtifacts).filter(e => !e.isMigrated).map((item, i) => {
						return (
							<Artifact
								key={`${item.id}_${i}`}
								onClick={() => {
									restoreTreasureTheForest({
										provider,
										tokenID: item.tokenID,
										adventurerID: forAdventurer,
										treasureName: item.itemName
									}, ({error}) => {
										if (error) {
											return console.error(error);
										}
										updateRarity(forAdventurer);
										set_migratableArtifacts((prev) => ({...prev, [item.tokenID]: {
											...prev[item.tokenID],
											isMigrated: true
										}}));
									});
								}}
								img={THE_FOREST_LOOT[item.itemName]?.img || ''}
								name={item.itemName}
								level={item.level}
								magic={item.magic} />
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default SectionArtifactsTheForest;