/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday September 7th 2021
**	@Filename:				tavern.js
******************************************************************************/

import	React, {useState, useEffect}					from	'react';
import	Image											from	'next/image';
import	dayjs											from	'dayjs';
import	duration										from	'dayjs/plugin/duration';
import	relativeTime									from	'dayjs/plugin/relativeTime';
import	useWeb3											from	'contexts/useWeb3';
import	useUI											from	'contexts/useUI';
import	useRarity										from	'contexts/useRarity';
import	DialogBox										from	'components/DialogBox';
import	ModalLogin										from	'components/ModalLogin';
import	Typer											from	'components/Typer';
import	Box												from	'components/Box';
import	SectionRecruit									from	'sections/SectionRecruit';
import	TAVERN_NEWS										from	'utils/codex/tavernNews.json';
import	CLASSES											from	'utils/codex/classes';
import	{getOpenMicDialogOption, OpenMicSignUpList}		from	'components/dungeons/openmic';

dayjs.extend(duration);
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

function	NPCHeadline({router, active, adventurersCount}) {
	const	[nonce, set_nonce] = useState(0);
	const	[npcTextIndex, set_npcTextIndex] = useState(0);
	
	const	[hadInitialMessage, set_hadInitialMessage] = useState(false);
	const	[hadRecruitMessage, set_hadRecruitMessage] = useState(false);
	const	[hadOpenMicMessage, set_hadOpenMicMessage] = useState(false);

	useEffect(() => {
		set_npcTextIndex(0);
		set_nonce(n => n+1);
	}, [router?.query?.tab]);

	const	renderNPCText = () => {
		if (!active) {
			return (
				<>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
						{'WELCOME, ADVENTURER! I AM'}
					</Typer>&nbsp;
					<span className={'text-tag-info dark:text-tag-warning'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
						{'FACU THE TAVERN KEEPER'}
					</Typer></span>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
						{'!'}
					</Typer>&nbsp;
					<div />
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
						{'PERHAPS YOU SHOULD CONSIDER CONNECTING YOUR WALLET?'}
					</Typer>
				</>
			);
		}
		if (!router?.query?.tab) {
			if (hadInitialMessage) {
				return (
					<>
						{'WELCOME, ADVENTURER! I AM '}
						<span className={'text-tag-info dark:text-tag-warning'}>{'FACU THE TAVERN KEEPER'}</span>
						{'!'}
						<div />
						{'WHAT CAN I DO FOR YA? LOOKING FOR THE LASTED NEWS, CHECK BELOW!'}
					</>		
				);
			}
			return (
				<>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
						{'WELCOME, ADVENTURER! I AM'}
					</Typer>&nbsp;
					<span className={'text-tag-info dark:text-tag-warning'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
						{'FACU THE TAVERN KEEPER'}
					</Typer></span>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
						{'!'}
					</Typer>&nbsp;
					<div />
					<Typer
						onDone={() => {
							set_npcTextIndex(i => i + 1);
							set_hadInitialMessage(true);
						}}
						shouldStart={npcTextIndex === 3}>
						{'WHAT CAN I DO FOR YA? LOOKING FOR THE LASTED NEWS, CHECK BELOW!'}
					</Typer>
				</>
			);
		}
		if (router?.query?.tab === 'recruit') {
			if (adventurersCount === 0) {
				if (hadRecruitMessage) {
					return (
						<>
							{'WELCOME, ADVENTURER! I AM '}
							<span className={'text-tag-info dark:text-tag-warning'}>{'FACU THE TAVERN KEEPER'}</span>
							{'!'}
							<div />
							{'YOU ARE ABOUT TO START A JOURNEY BEYOND IMAGINATION. YOU WILL MEET NEW FRIENDS AND FIGHT GREAT DANGERS!'}
							<div className={'my-2'}/>
							{'WHAT KIND OF ADVENTURER ARE YOU?'}
						</>		
					);
				}
				return (
					<>
						<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
							{'WELCOME, ADVENTURER! I AM'}
						</Typer>&nbsp;
						<span className={'text-tag-info dark:text-tag-warning'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
							{'FACU THE TAVERN KEEPER'}
						</Typer></span>
						<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
							{'!'}
						</Typer>&nbsp;
						<div />
						<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
							{'YOU ARE ABOUT TO START A JOURNEY BEYOND IMAGINATION. YOU WILL MEET NEW FRIENDS AND FIGHT GREAT DANGERS!'}
						</Typer>&nbsp;
						<div className={'my-2'}/>
						<Typer
							onDone={() => {
								set_npcTextIndex(i => i + 1);
								set_hadRecruitMessage(true);
							}}
							shouldStart={npcTextIndex === 4}>
							{'WHAT KIND OF ADVENTURER ARE YOU ?'}
						</Typer>
					</>
				);
			}
			if (hadRecruitMessage) {
				return (
					<>
						{'OH, THERE IS A '}
						<span className={'text-tag-info'}>{'HERO'}</span>
						{' OVER THERE LOOKING FOR SOME ADVENTURE ! MAYBE YOU SHOULD TALK TO HIM ? OR HER.'}
					</>		
				);
			}
			return (
				<>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
						{'OH, THERE IS A '}
					</Typer>
					<span className={'text-tag-info dark:text-tag-warning'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
						{'HERO'}
					</Typer></span>
					<Typer
						onDone={() => {
							set_npcTextIndex(i => i + 1);
							set_hadRecruitMessage(true);
						}}
						shouldStart={npcTextIndex === 2}>
						{'  OVER THERE LOOKING FOR SOME ADVENTURE ! MAYBE YOU SHOULD TALK TO HIM ? OR HER.'}
					</Typer>
				</>
			);
		}
		if (router?.query?.tab === 'the-stage') {
			if (hadOpenMicMessage) {
				return (
					<>
						{'I\'VE HAD ENOUGH OF THESE HOOLIGANS. GET UP THERE AND GIVE THEM A SHOW. KEEP IT CLEAN THIS TIME ! OH AND MAKE SURE YOU\'RE AT LEAST AT LEVEL 2 WITH PERFORM SKILL > 1'}
					</>		
				);
			}
			return (
				<Typer onDone={() => set_hadOpenMicMessage(true)}>
					{'I\'ve had enough of these hooligans. Get up there and give them a show. Keep it clean this time !'}
				</Typer>
			);
		}
		return null;
	};
	return (
		<h1 key={nonce} className={'text-xs md:text-xs leading-normal md:leading-8'}>
			{renderNPCText()}
		</h1>
	);
}

function	DialogChoices({router, onWalletConnect, active}) {
	const	{rarities, currentAdventurer, openCurrentAventurerModal} = useRarity();
	const	[selectedOption, set_selectedOption] = useState(0);
	const	[dialogNonce, set_dialogNonce] = useState(0);

	useEffect(() => {
		set_selectedOption(0);
		set_dialogNonce(n => n + 1);
	}, [currentAdventurer?.tokenID, router?.asPath]);

	if (!active) {
		return (
			<DialogBox
				options={[
					{label: 'Connect wallet', onClick: () => onWalletConnect()},
				]} />
		);
	}

	if (router?.query?.tab === 'the-stage') {
		const options = [];
		const bards = rarities ? Object.values(rarities)?.filter(a => CLASSES[a.class].id === 2) : [];
		if(bards.length > 0) {
			options.push(getOpenMicDialogOption(currentAdventurer, router, openCurrentAventurerModal));
		} else {
			options.push({label: 'RECRUIT A BARD FIRST !', onClick: () => router.push('/town/tavern?tab=recruit')});
		}
		options.push({label: 'GO BACK', onClick: () => router.push('/town/tavern')});
		return (<>
			<DialogBox options={options}
				selectedOption={selectedOption}
				nonce={dialogNonce} />
			<OpenMicSignUpList bards={bards} router={router}></OpenMicSignUpList>
		</>);
	}

	return (
		<DialogBox
			selectedOption={selectedOption}
			nonce={dialogNonce}
			options={[
				{label: 'What\'s new ?', onClick: () => router.push('/town/tavern')},
				{label: 'Recruit a new adventurer', onClick: () => router.push('/town/tavern?tab=recruit')},
				{label: 'Tavern hooligans ...', onClick: () => router.push('/town/tavern?tab=the-stage')}
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
				<div className={'flex flex-col md:flex-row items-center mb-8 md:mb-8'}>
					<div className={'w-auto md:w-64 mr-0 md:mr-8'} style={{minWidth: 256}}>
						<Image
							src={theme === 'light' ? '/avatar/facu.gif' : '/avatar/facu.png'}
							loading={'eager'}
							quality={100}
							width={256}
							height={256} />
					</div>
					<Box className={'p-4'}>
						<NPCHeadline
							adventurersCount={adventurers.length}
							address={address}
							active={active && address}
							router={router} />
					</Box>
				</div>
				
				<DialogChoices
					active={active && address}
					router={router}
					onWalletConnect={() => set_modalLoginOpen(true)} />
				{active ? <section>
					<NewsTab shouldDisplay={!router?.query?.tab} router={router} provider={provider} fetchRarity={fetchRarity} />
					<SectionRecruit shouldDisplay={router?.query?.tab === 'recruit'} router={router} provider={provider} fetchRarity={fetchRarity} />
				</section> : null}
			</div>
			<ModalLogin open={modalLoginOpen} set_open={set_modalLoginOpen} />
		</section>
	);
}

export default Index;
