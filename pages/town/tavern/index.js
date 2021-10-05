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
import	useRarity						from	'contexts/useRarity';
import	DialogBox						from	'components/DialogBox';
import	ModalLogin						from	'components/ModalLogin';
import	Typer							from	'components/Typer';
import	Box								from	'components/Box';
import	SectionRecruit					from	'sections/SectionRecruit';
import	SectionDungeonTheCellar			from	'sections/SectionDungeonTheCellar';
import	TAVERN_NEWS						from	'utils/codex/tavernNews.json';
import	CLASSES							from	'utils/codex/classes';

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
	const	[hadTheCellarMessage, set_hadTheCellarMessage] = useState(false);

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
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
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
						<span className={'text-tag-info'}>{'FACU THE TAVERN KEEPER'}</span>
						{'!'}
						<div />
						{'WHAT DO YOU WANT TO DO ? I CAN FIND THE LAST NEWS JUST BELLOW!'}
					</>		
				);
			}
			return (
				<>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
						{'WELCOME, ADVENTURER! I AM'}
					</Typer>&nbsp;
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
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
						{'WHAT DO YOU WANT TO DO ? I CAN FIND THE LAST NEWS JUST BELLOW!'}
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
							<span className={'text-tag-info'}>{'FACU THE TAVERN KEEPER'}</span>
							{'!'}
							<div />
							{'YOU ARE ABOUT TO START A JOURNEY BEYOND IMAGINATION. YOU WILL MEET NEW FRIENDS AND FIGHT GREAT DANGERS!'}
							<div className={'my-2'}/>
							{'WHAT KIND OF ADVENTURER ARE YOU ?'}
						</>		
					);
				}
				return (
					<>
						<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
							{'WELCOME, ADVENTURER! I AM'}
						</Typer>&nbsp;
						<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
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
						{' OVER THERE LOOKING FOR SOME ADVENTURE ! MAYBE YOU SHOULD TALK TO HIM ? OR HER, I CAN\'T SEE FROM HERE.'}
					</>		
				);
			}
			return (
				<>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
						{'OH, THERE IS A '}
					</Typer>
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
						{'HERO'}
					</Typer></span>
					<Typer
						onDone={() => {
							set_npcTextIndex(i => i + 1);
							set_hadRecruitMessage(true);
						}}
						shouldStart={npcTextIndex === 2}>
						{'  OVER THERE LOOKING FOR SOME ADVENTURE ! MAYBE YOU SHOULD TALK TO HIM ? OR HER, I CAN\'T SEE FROM HERE.'}
					</Typer>
				</>
			);
		}
		if (router?.query?.tab === 'the-cellar') {
			if (hadTheCellarMessage) {
				return (
					<>
						{'THOSE RATS BE HUNGRY. THOSE RATS BE MANY. BEST IF YE CONSTITUTION BE PLENTY !'}
					</>		
				);
			}
			return (
				<Typer onDone={() => set_hadTheCellarMessage(true)}>
					{'Those rats be hungry. Those rats be many. Best if ye Constitution be plenty !'}
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
	const	{chainTime} = useWeb3();
	const	{currentAdventurer, openCurrentAventurerModal} = useRarity();
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
	if (router?.query?.tab === 'the-cellar') {
		const	canAdventure = !dayjs(new Date(currentAdventurer?.dungeons?.cellar * 1000)).isAfter(dayjs(new Date(chainTime * 1000)));

		return (
			<>
				<DialogBox
					selectedOption={selectedOption}
					nonce={dialogNonce}
					options={[
						{label: (
							canAdventure ?
								<>
									{'FIGHT THE RAT WITH '}
									<span className={'text-tag-info'}>{`${currentAdventurer.tokenID}, ${currentAdventurer?.name ? currentAdventurer?.name : CLASSES[currentAdventurer?.class].name} LVL ${currentAdventurer.level}`}</span>
								</>
								:
								<>
									<span className={'text-tag-info'}>{`${currentAdventurer.tokenID}, ${currentAdventurer?.name ? currentAdventurer?.name : CLASSES[currentAdventurer?.class].name} LVL ${currentAdventurer.level}`}</span>
									{' NEED SOME REST BEFORE FIGHTING THE RAT AGAIN'}
								</>
						),
						onClick: () => {
							if (canAdventure)
								router.push(`/dungeons/the-cellar?adventurer=${currentAdventurer.tokenID}`);
							else
								openCurrentAventurerModal();
						}},
						{label: 'SELECT ANOTHER ADVENTURER', onClick: () => openCurrentAventurerModal()},
						{label: 'CANCEL', onClick: () => router.push('/town/tavern')},
					]} />
			</>
		);
	}

	return (
		<DialogBox
			selectedOption={selectedOption}
			nonce={dialogNonce}
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
