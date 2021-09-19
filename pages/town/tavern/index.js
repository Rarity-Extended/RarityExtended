/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday September 7th 2021
**	@Filename:				tavern.js
******************************************************************************/

import	React, {useState, useEffect}	from	'react';
import	Image							from	'next/image';
import	{ethers}						from	'ethers';
import	useSWR							from	'swr';
import	dayjs							from	'dayjs';
import	relativeTime					from	'dayjs/plugin/relativeTime';
import	{apeInVault}					from	'utils/actions';
import	{formatAmount, fetcher}			from	'utils';
import	useWeb3							from	'contexts/useWeb3';
import	useUI							from	'contexts/useUI';
import	DialogBox						from	'components/DialogBox';
import	ModalLogin						from	'components/ModalLogin';
import	Typer							from	'components/Typer';
import	SectionRecruit					from	'sections/SectionRecruit';
import	SectionDungeonTheCellar			from	'sections/SectionDungeonTheCellar';
import	TAVERN_NEWS						from	'utils/codex/tavernNews.json';

dayjs.extend(relativeTime);

function	NewsTab({shouldDisplay}) {
	if (!shouldDisplay) {
		return null;
	}
	return (
		<div className={'flex flex-col w-full'}>
			<div className={'pb-10'}>
				<i className={'text-black dark:text-white text-opacity-60 text-sx md:text-xs leading-4 md:leading-4'}>
					{'OYE OYE ! FIND THE LATEST NEWS IN OUR AMAZING WORLD IN THE DAILY EXTENDED ! GET READY FOR A BIG ADVENTURE, FROM OUR HUMBLE TOWN TO THE DARK FOREST OF SMUGLEWIND ! NEWS, ANNOUNCES, AND PUBLIC WORKS, EVERYTHING IS IN THE DAILY EXTENDED !'}
				</i>
				<div className={'divide-y-2 divide-black dark:divide-white dark:divide-opacity-60'}>
					{TAVERN_NEWS.map((news, i) => (
						<div className={'mt-10 pt-10'} key={i}>
							<p className={'text-xs md:text-base mb-2 md:mb-0 leading-4 md:leading-6'}>{`> ${news.headline}`}</p>
							<p className={'text-megaxs md:text-xs leading-4 md:leading-6 text-gray-darker dark:text-white dark:text-opacity-60'}>{news.text}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function	FacuHeadline({router, vaultAPY, ftmBalance, hasDeposited, hasDepositError, isTxPending, active, adventurersCount}) {
	const	[nonce, set_nonce] = useState(0);
	const	[facuTextIndex, set_facuTextIndex] = useState(0);
	
	useEffect(() => {
		set_facuTextIndex(0);
		set_nonce(n => n+1);
	}, [router?.query?.tab, isTxPending, hasDeposited, hasDepositError]);

	const	renderFacuText = () => {
		if (!active) {
			return (
				<Typer>{'Hello traveler! Welcome to Facu\'s Tavern!\nPerhaps you should consider connecting your wallet ?'}</Typer>
			);
		}
		if (!router?.query?.tab) {
			return (
				<Typer>{'Hello traveler! Welcome to Facu\'s Tavern!\nWhat do you want to do ?'}</Typer>
			);
		}
		if (router?.query?.tab === 'recruit') {
			if (adventurersCount === 0) {
				return (
					<>
						<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 0}>
							{'WELCOME, ADVENTURER! I AM'}
						</Typer>&nbsp;
						<span className={'text-tag-info'}><Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 1}>
							{'FACU'}
						</Typer></span>
						<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 2}>
							{', THE TAVERN KEEPER.'}
						</Typer>&nbsp;
						<div />
						<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 3}>
							{'YOU ARE ABOUT TO START A JOURNEY BEYOND IMAGINATION. YOU WILL MEET NEW FRIENDS AND FIGHT GREAT DANGERS!'}
						</Typer>&nbsp;
						<div className={'my-2'}/>
						<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 4}>
							{'WHAT KIND OF ADVENTURER ARE YOU ?'}
						</Typer>
					</>
				);
			}
			return (
				<Typer>{'OH, THERE IS AN HERO OVER THERE LOOKING FOR SOME ADVENTURE'}</Typer>
			);
		}
		if (router?.query?.tab === 'ftm-vault') {
			if (Number(ftmBalance) === 0) {
				return (
					<>
						<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 0}>{'Oh yes. You have what ?'}</Typer>&nbsp;
						<span className={'text-tag-info'}>
							<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 1}>{`${formatAmount(ftmBalance, 2)} FTM`}</Typer>
						</span>&nbsp;
						<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 2}>
							{'? No can\'t do ... But if you find some, I have a really good plan where you can earn up to'}
						</Typer>&nbsp;
						<span className={'text-tag-info'}>
							<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 3}>
								{`${vaultAPY?.data?.week}`}
							</Typer>
						</span>
						<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 4}>
							{'. Just come back later!'}
						</Typer>
					</>
				);
			}
			if (isTxPending) {
				return (
					<Typer>{'GREAT CHOICE! LET\'S PROCESS YOUR TRANSACTION'}</Typer>
				);
			}
			if (hasDeposited) {
				return (
					<>
						<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 0}>{'THIS IS A GREAT INVESTMENT! TRUST ME! YOU CAN CLICK'}</Typer>&nbsp;
						<a className={'text-tag-info hover:underline'} href={'https://ape.tax/the-fantom'} target={'_blank'} rel={'noreferrer'}>
							<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 1}>{'HERE'}</Typer>
						</a>&nbsp;
						<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 2}>
							{'TO CHECK YOUR INVESTMENT UNTIL THE BANK IS BUILT IN THIS HUMBLE TOWN!'}
						</Typer>&nbsp;
					</>
				);
			}
			if (hasDepositError) {
				return (
					<Typer>{'OH YOU CHANGED YOUR MIND!'}</Typer>
				);
			}
			return (
				<>
					<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 0}>{'OH YES. YOU HAVE WHAT ?'}</Typer>&nbsp;
					<span className={'text-tag-info'}>
						<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 1}>{`${formatAmount(ftmBalance, 2)} FTM`}</Typer>
					</span>&nbsp;
					<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 2}>
						{'? I HAVE A FRIEND, THE WIFE OF THE UNCLE OF ONE OF MY COUSINS (ON MY MOTHER\'S SIDE), THAT HAS A REALLY GOOD PLAN. THE CURRENT APY IS'}
					</Typer>&nbsp;
					<span className={'text-tag-info'}>
						<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 3}>
							{`${vaultAPY?.data?.week}`}
						</Typer>
					</span>
					<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 4}>
						{'. DO YOU WANT TO APE-IN ?'}
					</Typer>
				</>
			);
		}
		if (router?.query?.tab === 'the-cellar') {
			return (
				<Typer>{'Those rats be hungry. Those rats be many. Best if ye Constitution be plenty !'}</Typer>
			);
		}
		return null;
	};
	return (
		<h1 key={nonce} className={'text-sm md:text-lg leading-normal md:leading-10 whitespace-pre-line mt-10'}>
			{renderFacuText()}
		</h1>
	);
}

function	DialogChoices({router, provider, ftmBalance, onFTMDeposit, onWalletConnect, active, isTxPending, set_isTxPending, set_hasDeposited}) {
	if (!active) {
		return (
			<DialogBox
				options={[
					{label: 'Connect wallet', onClick: () => onWalletConnect()},
				]} />
		);
	}
	if (router?.query?.tab === 'ftm-vault' && Number(ftmBalance) > 0) {
		return (
			<DialogBox
				options={[
					{label: 'Deposit 25%', onClick: () => {
						if (isTxPending)
							return;
						set_isTxPending(true);
						set_hasDeposited(false);
						apeInVault({provider, contractAddress: process.env.ZAP_VAULT_ADDR, amount: ethers.utils.parseEther(ftmBalance).mul(25).div(100)}, (e) => {
							set_isTxPending(false);
							onFTMDeposit(e);
						});
					}},
					{label: 'Deposit 50%', onClick: () => {
						if (isTxPending)
							return;
						set_isTxPending(true);
						set_hasDeposited(false);
						apeInVault({provider, contractAddress: process.env.ZAP_VAULT_ADDR, amount: ethers.utils.parseEther(ftmBalance).mul(50).div(100)}, (e) => {
							set_isTxPending(false);
							onFTMDeposit(e);
						});
					}},
					{label: 'Deposit 75%', onClick: () => {
						if (isTxPending)
							return;
						set_isTxPending(true);
						set_hasDeposited(false);
						apeInVault({provider, contractAddress: process.env.ZAP_VAULT_ADDR, amount: ethers.utils.parseEther(ftmBalance).mul(75).div(100)}, (e) => {
							set_isTxPending(false);
							onFTMDeposit(e);
						});
					}},
					{label: 'Nevermind', onClick: () => router.push('/town/tavern')},
				]} />
		);
	}
	return (
		<DialogBox
			options={[
				{label: 'What\'s new ?', onClick: () => router.push('/town/tavern')},
				{label: 'Recruit a new adventurer', onClick: () => router.push('/town/tavern?tab=recruit')},
				{label: 'About the rat ...', onClick: () => router.push('/town/tavern?tab=the-cellar')},
				{label: 'You said I could earn FTM ?', onClick: () => router.push('/town/tavern?tab=ftm-vault')}
			]} />
	);
}

function	Index({fetchRarity, rarities, router}) {
	const	{provider, address, active} = useWeb3();
	const	{theme} = useUI();
	const	[ftmBalance, set_ftmBalance] = useState(0);
	const	[isTxPending, set_isTxPending] = useState(false);
	const	[hasDeposited, set_hasDeposited] = useState(false);
	const	[hasDepositError, set_hasDepositError] = useState(false);
	const	[modalLoginOpen, set_modalLoginOpen] = useState(false);
	const	{data: vaultAPY} = useSWR(`https://ape.tax/api/specificApy?address=${process.env.FTM_VAULT_ADDR}&network=250`, fetcher);
	const	adventurers = Object.values(rarities);

	useEffect(() => {
		if (provider && address) {
			provider.getBalance(address).then(b => set_ftmBalance(ethers.utils.formatEther(b)));
		}
	}, [address, provider]);

	return (
		<section className={'mt-12 max-w-full'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
				<div className={'flex flex-col md:flex-row items-center md:items-center mb-8 md:mb-0'}>
					<div className={'w-auto md:w-64 mr-0 md:mr-16'} style={{minWidth: 256}}>
						<Image
							src={theme === 'light' ? '/avatar/facu.gif' : '/avatar/facu.png'}
							loading={'eager'}
							quality={100}
							width={256}
							height={256} />
					</div>
					<FacuHeadline
						active={active && address}
						adventurersCount={adventurers.length}
						router={router}
						vaultAPY={vaultAPY}
						ftmBalance={ftmBalance}
						isTxPending={isTxPending}
						hasDepositError={hasDepositError}
						hasDeposited={hasDeposited} />
				</div>
				<DialogChoices
					active={active && address}
					provider={provider}
					router={router}
					ftmBalance={ftmBalance}
					hasDeposited={hasDeposited}
					onWalletConnect={() => set_modalLoginOpen(true)}
					isTxPending={isTxPending}
					set_isTxPending={set_isTxPending}
					set_hasDeposited={set_hasDeposited}
					onFTMDeposit={({error}) => {
						if (error) {
							set_hasDepositError(true);
							return console.error(error);
						}
						provider.getBalance(address).then(b => set_ftmBalance(ethers.utils.formatEther(b)));
						set_hasDepositError(false);
						set_hasDeposited(true);
						set_isTxPending(false);
					}} />
				{active ? <section>
					<NewsTab shouldDisplay={!router?.query?.tab} router={router} provider={provider} fetchRarity={fetchRarity} />
					<SectionRecruit shouldDisplay={router?.query?.tab === 'recruit'} router={router} provider={provider} fetchRarity={fetchRarity} />
					<SectionDungeonTheCellar
						shouldDisplay={router?.query?.tab === 'the-cellar'}
						router={router}
						adventurers={rarities}
						adventurersCount={adventurers.length} />
				</section> : null}
			</div>
			<ModalLogin open={modalLoginOpen} set_open={set_modalLoginOpen} />
		</section>
	);
}

export default Index;
