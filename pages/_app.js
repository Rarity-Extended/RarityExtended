/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday August 31st 2021
**	@Filename:				_app.js
******************************************************************************/
/* eslint-disable react-hooks/exhaustive-deps */

import	React							from	'react';
import	Head							from	'next/head';
import	{DefaultSeo}					from	'next-seo';
import	{Toaster}						from	'react-hot-toast';
import	{Web3ReactProvider}				from	'@web3-react-fork/core';
import	{ethers}						from	'ethers';
import	useWeb3, {Web3ContextApp}		from	'contexts/useWeb3';
import	useRarity, {RarityContextApp}	from	'contexts/useRarity';
import	{UIContextApp}					from	'contexts/useUI';
import	Navbar							from	'components/Navbar';
import	Footer							from	'components/Footer';
import	SectionNoWallet					from	'sections/SectionNoWallet';
import	useWindowInFocus				from	'hook/useWindowInFocus';

import	'tailwindcss/tailwind.css';
import	'style/Default.css';

function	GameWrapper({Component, pageProps, element, router}) {
	const	{switchChain, active, chainID} = useWeb3();
	const	{isLoaded, rarities, fetchRarity, updateRarity, rNonce} = useRarity();

	if (!isLoaded) {
		return (
			<div className={'absolute inset-0 backdrop-blur-3xl bg-opacity-40 pointer-events-none'}>
				<div className={'loader'} />
				<div className={'absolute inset-0 mt-32 flex justify-center items-center'}>
					<p className={'center-text text-white z-40'}>{'Retrieving your adventurers...'}</p>
				</div>
			</div>
		);
	}

	if (!active) {
		return (
			<SectionNoWallet />
		);
	}

	return (
		<div className={'pb-24 mb-24 relative z-10'}>
			{chainID >= 0 && (chainID !== 250 && chainID !== 1337) ? (
				<div aria-label={'switchchain'} className={'flex w-full  text-lg text-center justify-center'} onClick={switchChain}>
					{'PLEASE SWITCH TO FANTOM NETWORK'}
				</div>
			) : null}
			<Component
				key={router.route}
				element={element}
				router={router}
				rarities={rarities}
				updateRarity={updateRarity}
				fetchRarity={fetchRarity}
				rNonce={rNonce}
				{...pageProps} />
		</div>
	);
}

function	AppWrapper(props) {
	const	{Component, pageProps, router} = props;
	const	{switchChain, chainID} = useWeb3();
	const	windowInFocus = useWindowInFocus();

	React.useEffect(() => {
		if (windowInFocus && Number(chainID) > 0 && (Number(chainID) !== 250 && Number(chainID) !== 1337)) {
			switchChain();
		}
	}, [chainID, windowInFocus, switchChain]);

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
				<script defer data-domain={'rarityextended.com'} src={'https://plausible.io/js/plausible.js'} />
			</Head>
			<DefaultSeo
				title={'Rarity Extended'}
				defaultTitle={'Rarity Extended'}
				description={'An On-Chain Adventure'}
				openGraph={{
					type: 'website',
					locale: 'en_US',
					url: process.env.WEBSITE_URI,
					site_name: 'Rarity Extended',
					title: 'Rarity Extended',
					description: 'An On-Chain Adventure',
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
					handle: '@RXtended',
					site: '@RXtended',
					cardType: 'summary_large_image',
				}} />
			<main id={'app'} className={'p-4 relative font-title uppercase text-black dark:text-white bg-white dark:bg-dark-600'} style={{minHeight: '100vh'}}>
				<Toaster position={'bottom-right'} toastOptions={{className: 'text-sx border-4 border-black dark:border-dark-100 text-black dark:text-white bg-white dark:bg-dark-600 noBr shadow-xl'}} />
				<Navbar router={router} />
				<GameWrapper Component={Component} pageProps={pageProps} element={props.element} router={router} />
				<Footer />
			</main>
		</>
	);
}

const getLibrary = (provider) => {
	return new ethers.providers.Web3Provider(provider, 'any');
};

function	MyApp(props) {
	const	{Component, pageProps} = props;

	return (
		<UIContextApp>
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
		</UIContextApp>
	);
}


export default MyApp;
