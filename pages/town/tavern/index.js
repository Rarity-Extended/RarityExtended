/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday September 7th 2021
**	@Filename:				tavern.js
******************************************************************************/

import	React, {useState, useEffect}	from	'react';
import	Image							from	'next/image';
import	dayjs							from	'dayjs';
import	relativeTime					from	'dayjs/plugin/relativeTime';
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
					{[...TAVERN_NEWS].reverse().map((news, i) => (
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

function	FacuHeadline({router, active, adventurersCount}) {
	const	[nonce, set_nonce] = useState(0);
	const	[facuTextIndex, set_facuTextIndex] = useState(0);
	
	useEffect(() => {
		set_facuTextIndex(0);
		set_nonce(n => n+1);
	}, [router?.query?.tab]);

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

function	DialogChoices({router, onWalletConnect, active}) {
	if (!active) {
		return (
			<DialogBox
				options={[
					{label: 'Connect wallet', onClick: () => onWalletConnect()},
				]} />
		);
	}
	return (
		<DialogBox
			options={[
				{label: 'What\'s new ?', onClick: () => router.push('/town/tavern')},
				{label: 'Recruit a new adventurer', onClick: () => router.push('/town/tavern?tab=recruit')},
				{label: 'About the rat ...', onClick: () => router.push('/town/tavern?tab=the-cellar')}
			]} />
	);
}

function	Index({fetchRarity, rarities, router}) {
	const	{provider, address, active} = useWeb3();
	const	{theme} = useUI();
	const	[modalLoginOpen, set_modalLoginOpen] = useState(false);
	const	adventurers = Object.values(rarities);

	return (
		<section className={'max-w-full'}>
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
						router={router} />
				</div>
				<DialogChoices
					active={active && address}
					router={router}
					onWalletConnect={() => set_modalLoginOpen(true)} />
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
