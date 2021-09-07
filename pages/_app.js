/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@MajorTom_eth
**	@Date:					Tuesday August 31st 2021
**	@Filename:				_app.js
******************************************************************************/
/* eslint-disable react-hooks/exhaustive-deps */

import	React							from	'react';
import	Head							from	'next/head';
import	{DefaultSeo}					from	'next-seo';
import	useSWR, {useSWRConfig} 			from	'swr';
import	{Web3ReactProvider}				from	'@web3-react-fork/core';
import	{ethers}						from	'ethers';
import	{Provider, Contract}			from	'ethcall';
import	useWeb3, {Web3ContextApp}		from	'contexts/useWeb3';
import	Navbar							from	'components/Navbar';
import	ABI								from	'utils/rarity.abi';

import	'tailwindcss/tailwind.css';
import	'style/Default.css';

const chunk = (arr, size) => arr.reduce((acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []);
const fetcher = (...args) => fetch(...args).then(res => res.json());
async function newEthCallProvider(provider) {
	const	ethcallProvider = new Provider();
	await ethcallProvider.init(provider);
	return ethcallProvider;
}
const	RARITY_ADDR = '0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb';
const	FMT_KEY = process.env.FMT_KEY;
const	WEBSITE_URI = process.env.WEBSITE_URI;

function	AppWrapper(props) {
	const	{Component, pageProps, router} = props;
	const	{mutate} = useSWRConfig();
	const	{active, address, switchChain, getProvider, chainID} = useWeb3();
	const	[rNonce, set_rNonce] = React.useState(0);
	const	[rarities, set_rarities] = React.useState({});
	const	getRaritiesRequestURI = `https://api.ftmscan.com/api?module=account&action=tokennfttx&contractaddress=${RARITY_ADDR}&address=${address}&apikey=${FMT_KEY}`;
	const	{data} = useSWR(active && address ? getRaritiesRequestURI : null, fetcher, {revalidateOnMount: true, revalidateOnReconnect: true, refreshInterval: 30000, shouldRetryOnError: true, dedupingInterval: 1000, focusThrottleInterval: 5000});

	React.useEffect(() => {
		set_rarities({});
		set_rNonce(n => n + 1);
	}, [active, address, chainID]);

	function		prepareAdventurer(tokenID) {
		const	rarity = new Contract(RARITY_ADDR, ABI);
		return [
			rarity.ownerOf(tokenID),
			rarity.summoner(tokenID),
		];
	}
	async function	fetchAdventurer(calls) {
		const	ethcallProvider = await newEthCallProvider(getProvider());
		// const	ethcallProvider = await newEthCallProvider(new ethers.providers.JsonRpcProvider('http://localhost:8545'));
		// ethcallProvider.multicallAddress = '0xc04d660976c923ddba750341fe5923e47900cf24';
		const	callResult = await ethcallProvider.all(calls);
		return (callResult);
	}

	async function	fetchRarities(elements) {
		const	preparedCalls = [];
		const	tokensIDs = [];
		elements?.forEach((token) => {
			preparedCalls.push(...prepareAdventurer(token.tokenID));
			tokensIDs.push(token.tokenID);
		});

		const	callResults = await fetchAdventurer(preparedCalls);
		const	chunkedCallResult = chunk(callResults, 2);
		tokensIDs.forEach((tokenID, i) => {
			set_rarities((prev) => ({...prev, [tokenID]: {
				tokenID: tokenID,
				owner: chunkedCallResult[i][0],
				xp: ethers.utils.formatEther(chunkedCallResult[i][1]['_xp']),
				class: Number(chunkedCallResult[i][1]['_class']),
				level: Number(chunkedCallResult[i][1]['_level']),
				log: Number(chunkedCallResult[i][1]['_log']),
				attributes: {
					strength: 8,
					dexterity: 8,
					constitution: 8,
					intelligence: 8,
					wisdom: 8,
					charisma: 8,
				}
			}}));
			set_rNonce(prev => prev + 1);
		});
	}

	React.useEffect(() => {
		if (data?.result) {
			fetchRarities(data?.result);
		}
	}, [data]);

	async function	updateRarity(tokenID) {
		console.log(tokenID);
		const	callResults = await fetchAdventurer(prepareAdventurer(tokenID));
		const	chunkedCallResult = chunk(callResults, 2);
		console.log(chunkedCallResult);
		set_rarities((prev) => ({...prev, [tokenID]: {
			tokenID: tokenID,
			owner: chunkedCallResult[0][0],
			xp: ethers.utils.formatEther(chunkedCallResult[0][1]['_xp']),
			class: Number(chunkedCallResult[0][1]['_class']),
			level: Number(chunkedCallResult[0][1]['_level']),
			log: Number(chunkedCallResult[0][1]['_log']),
			attributes: {
				strength: 8,
				dexterity: 8,
				constitution: 8,
				intelligence: 8,
				wisdom: 8,
				charisma: 8,
			}
		}}));
		set_rNonce(prev => prev + 1);
	}

	async function	fetchRarity() {
		const {result} = await mutate(getRaritiesRequestURI);
		await fetchRarities(result);
	}

	React.useEffect(() => {
		if (Number(chainID) > 0 && (Number(chainID) !== 250 || Number(chainID) !== 1337)) {
			switchChain();
		}
	}, [chainID]);

	return (
		<>
			<Head>
				<title>{'Rarity Extended'}</title>
				<link rel={'icon'} href={'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏹</text></svg>'} />
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'viewport'} content={'width=device-width, initial-scale=1'} />
				<meta name={'description'} content={'Rarity Extended'} />
				<meta name={'msapplication-TileColor'} content={'#9fcc2e'} />
				<meta name={'theme-color'} content={'#ffffff'} />
				<meta charSet={'utf-8'} />
				<link rel={'preconnect'} href={'https://fonts.googleapis.com'} />
				<link rel={'preconnect'} href={'https://fonts.gstatic.com'} crossOrigin={'true'} />
				<link href={'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'} rel={'stylesheet'} />

				<meta name={'robots'} content={'index,nofollow'} />
				<meta name={'googlebot'} content={'index,nofollow'} />
				<meta charSet={'utf-8'} />
			</Head>
			<DefaultSeo
				title={'Rarity Extended'}
				defaultTitle={'Rarity Extended'}
				description={'Write your next adventure with your brave adventurers'}
				openGraph={{
					type: 'website',
					locale: 'en_US',
					url: WEBSITE_URI,
					site_name: 'Rarity Extended',
					title: 'Rarity Extended',
					description: 'Write your next adventure with your brave adventurers',
					images: [
						{
							url: `${WEBSITE_URI}og.png`,
							width: 1200,
							height: 675,
							alt: 'Rarity',
						}
					]
				}}
				twitter={{
					handle: '@MajorTom_Eth',
					site: '@MajorTom_Eth',
					cardType: 'summary_large_image',
				}} />
			<main id={'app'} className={'p-4 relative'} style={{minHeight: '100vh'}}>
				<Navbar router={router} />
				<div className={'mb-16 relative'}>
					{chainID >= 0 && chainID !== 250 ? (
						<div aria-label={'switchchain'} className={'flex w-full font-title text-lg text-center justify-center'}>
							{'PLEASE SWITCH TO FANTOM NETWORK'}
						</div>
					) : null}
					<Component
						key={router.route}
						element={props.element}
						router={props.router}
						rarities={rarities}
						updateRarity={updateRarity}
						fetchRarity={fetchRarity}
						rNonce={rNonce}
						{...pageProps} />
				</div>
				<div className={'absolute bottom-3 font-title uppercase text-xxs left-0 right-0 flex flex-col justify-center items-center'}>
					<div>
						<a href={'https://ftmscan.com/token/0xce761d788df608bd21bdd59d6f4b54b2e27f25bb#readContract'} target={'_blank'} rel={'noreferrer'} className={'hover:underline'}>
							{'Rarity Manifested'}
						</a>
						{' - '}
						<a href={'https://andrecronje.medium.com/loot-rarity-d341faa4485c'} target={'_blank'} rel={'noreferrer'} className={'hover:underline'}>
							{'Loot & Rarity'}
						</a>
					</div>
					<div>
						{'Made with 💙 by the 🕹 community'}
					</div>
				</div>
			</main>
		</>
	);
}

const getLibrary = (provider) => {
	return new ethers.providers.Web3Provider(provider);
};

function	MyApp(props) {
	const	{Component, pageProps} = props;
	
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<Web3ContextApp>
				<AppWrapper
					Component={Component}
					pageProps={pageProps}
					element={props.element}
					router={props.router} />
			</Web3ContextApp>
		</Web3ReactProvider>
	);
}


export default MyApp;
