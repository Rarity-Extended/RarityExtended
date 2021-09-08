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
import	{Web3ReactProvider}				from	'@web3-react-fork/core';
import	{ethers}						from	'ethers';
import	useWeb3, {Web3ContextApp}		from	'contexts/useWeb3';
import	useRarity, {RarityContextApp}	from 'contexts/useRarity';
import	Navbar							from	'components/Navbar';

import	'tailwindcss/tailwind.css';
import	'style/Default.css';

function	AppWrapper(props) {
	const	{Component, pageProps, router} = props;
	const	{rarities, updateRarity, fetchRarity, rNonce} = useRarity();
	const	{switchChain, chainID} = useWeb3();

	React.useEffect(() => {
		if (Number(chainID) > 0 && (Number(chainID) !== 250 && Number(chainID) !== 1337)) {
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
					url: process.env.WEBSITE_URI,
					site_name: 'Rarity Extended',
					title: 'Rarity Extended',
					description: 'Write your next adventure with your brave adventurers',
					images: [
						{
							url: `${process.env.WEBSITE_URI}og.png`,
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
					{chainID >= 0 && (chainID !== 250 && chainID !== 1337) ? (
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
						<a href={'https://github.com/TBouder/RarityExtended'} target={'_blank'} rel={'noreferrer'} className={'hover:underline'}>
							{'Source code'}
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
				<RarityContextApp>
					<AppWrapper
						Component={Component}
						pageProps={pageProps}
						element={props.element}
						router={props.router} />
				</RarityContextApp>
			</Web3ContextApp>
		</Web3ReactProvider>
	);
}


export default MyApp;
