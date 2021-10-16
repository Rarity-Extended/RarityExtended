/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				quest.js
******************************************************************************/

import	React, {useState, useEffect}	from	'react';
import	Image							from	'next/image';
import	useUI							from	'contexts/useUI';
import	useWeb3							from	'contexts/useWeb3';
import	useRarity						from	'contexts/useRarity';
import	Typer							from	'components/Typer';
import	DialogBox						from	'components/DialogBox';
import	SectionDungeonTheCellar			from	'sections/SectionDungeonTheCellar';
import	SectionDungeonTheForest			from	'sections/SectionDungeonTheForest';
import	Box								from	'components/Box';
import	CLASSES							from	'utils/codex/classes';

function	DialogChoices({router, adventurersCount}) {
	const	[selectedOption, set_selectedOption] = useState(0);
	const	[dialogNonce, set_dialogNonce] = useState(0);
	const	{currentAdventurer, openCurrentAventurerModal} = useRarity();

	useEffect(() => {
		set_selectedOption(0);
		set_dialogNonce(n => n + 1);
	}, [currentAdventurer?.tokenID, router?.asPath]);

	if (adventurersCount === 0) {
		return (
			<DialogBox
				options={[
					{label: 'GO TO THE TAVERN', onClick: () => router.push('/town/tavern?tab=recruit')},
				]} />
		);
	}
	if (router?.query?.tab === 'the-cellar') {
		return (
			<>
				<DialogBox
					selectedOption={selectedOption}
					nonce={dialogNonce}
					options={[
						{
							label: (
								<>
									{'FIGHT THE RAT WITH '}
									<span className={'text-tag-info'}>{`${currentAdventurer.tokenID}, ${currentAdventurer?.name ? currentAdventurer?.name : CLASSES[currentAdventurer?.class].name} LVL ${currentAdventurer.level}`}</span>
								</>
							),
							onClick: () => router.push(`/dungeons/the-cellar?adventurer=${currentAdventurer.tokenID}`)
						},
						{label: 'SELECT ANOTHER ADVENTURER', onClick: () => openCurrentAventurerModal()},
						{label: 'CANCEL', onClick: () => router.push('/town/quest')},
					]} />
			</>
		);
	}
	if (router?.query?.tab === 'the-forest') {
		return (
			<>
				<DialogBox
					selectedOption={selectedOption}
					nonce={dialogNonce}
					options={[
						{
							label: (
								currentAdventurer.level < 2 ?
									<>
										{'YOU CANNOT EXPLORE THE FOREST WITH '}
										<span className={'text-tag-info'}>{`${currentAdventurer.tokenID}, ${currentAdventurer?.name ? currentAdventurer?.name : CLASSES[currentAdventurer?.class].name} LVL ${currentAdventurer.level}`}</span>
									</>
									:
									currentAdventurer.level >= 2 && currentAdventurer?.dungeons?.forest?.canAdventure ?
										<>
											{'EXPLORE THE FOREST WITH '}
											<span className={'text-tag-info'}>{`${currentAdventurer.tokenID}, ${currentAdventurer?.name ? currentAdventurer?.name : CLASSES[currentAdventurer?.class].name} LVL ${currentAdventurer.level}`}</span>
										</>
										:
										<>
											{'YOU ARE ALREADY IN THE FOREST WITH '}
											<span className={'text-tag-info'}>{`${currentAdventurer.tokenID}, ${currentAdventurer?.name ? currentAdventurer?.name : CLASSES[currentAdventurer?.class].name} LVL ${currentAdventurer.level}`}</span>
										</>
							),
							onClick: () => {
								if (currentAdventurer.level >= 2 && currentAdventurer?.dungeons?.forest?.canAdventure)
									router.push(`/dungeons/the-forest?adventurer=${currentAdventurer.tokenID}`);
								else
									openCurrentAventurerModal();
							}
						},
						{label: 'SELECT ANOTHER ADVENTURER', onClick: () => openCurrentAventurerModal()},
						{label: 'CANCEL', onClick: () => router.push('/town/quest')},
					]} />
			</>
		);
	}


	return (
		<DialogBox
			selectedOption={selectedOption}
			nonce={dialogNonce}
			options={[
				{
					label: (
						<>
							{'THE RAT IN '}
							<span className={'text-tag-info'}>{'THE CELLAR'}</span>
						</>
					),
					onClick: () => router.push('/town/quest?tab=the-cellar')
				},
				{
					label: (
						<>
							{'THE TREASURE IN '}
							<span className={'text-tag-info'}>{'THE FOREST'}</span>
						</>
					),
					onClick: () => router.push('/town/quest?tab=the-forest')
				},
			]} />
	);
}

function	NPCHeadline({router, active, address, adventurersCount}) {
	const	[nonce, set_nonce] = useState(0);
	const	[npcTextIndex, set_npcTextIndex] = useState(0);

	const	[hadInitialMessage, set_hadInitialMessage] = useState(false);
	const	[hadTheCellarMessage, set_hadTheCellarMessage] = useState(false);
	const	[hadTheForestMessage, set_hadTheForestMessage] = useState(false);
	
	useEffect(() => {
		set_npcTextIndex(0);
		set_nonce(n => n+1);
	}, [router?.query?.tab, active, address]);
	
	const	renderNPCText = () => {
		if (!active) {
			return (
				<>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
						{'HELLO, I AM '}
					</Typer>
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
						{'LARA'}
					</Typer></span>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
						{' FROM THE '}
					</Typer>
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
						{'QUEST OFFICE'}
					</Typer></span>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 4}>
						{'. WE ONLY WORK WITH TRUE ADVENTURERS. CONNECT YOUR WALLET FIRST.'}
					</Typer>
				</>
			);
		}
		if (adventurersCount === 0) {
			return (
				<>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
						{'HELLO, I AM '}
					</Typer>
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
						{'LARA'}
					</Typer></span>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
						{' FROM THE '}
					</Typer>
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
						{'QUEST OFFICE'}
					</Typer></span>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 4}>
						{'. YOU NEED AN ADVENTURER TO START HERE. GO TO THE TAVERN TO RECRUIT ONE.'}
					</Typer>
				</>
			);
		}
		if (router?.query?.tab === 'the-cellar') {
			if (hadTheCellarMessage) {
				return (
					<>
						{'YES. THE BIG UGLY RAT. '}
						<span className={'text-tag-info'}>{'FACU'}</span>
						{' THE TAVERN KEEPER NEEDS SOME HELP WITH THIS. REPULSIVE STUFF. IF YOU CAN '}
						<span className={'text-tag-info'}>{'DODGE AND HIT HARD'}</span>
						{', YOU SHOULD GO.'}&nbsp;
					</>	
				);
			}
			return (
				<>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
						{'YES. THE BIG UGLY RAT. '}
					</Typer>
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
						{'FACU'}
					</Typer></span>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
						{' THE TAVERN KEEPER NEEDS SOME HELP WITH THIS. REPULSIVE STUFF. IF YOU CAN '}
					</Typer>
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
						{'DODGE AND HIT HARD'}
					</Typer></span>
					<Typer
						shouldStart={npcTextIndex === 4}
						onDone={() => {
							set_npcTextIndex(i => i + 1);
							set_hadTheCellarMessage(true);
						}}>
						{', YOU SHOULD GO.'}
					</Typer>&nbsp;
				</>
			);
		}
		if (router?.query?.tab === 'the-forest') {
			if (hadTheForestMessage) {
				return (
					<>
						{'OH HAVE YOU HEARD ABOUT '}
						<span className={'text-tag-info'}>{'THE FOREST'}</span>
						{' ? THE AUSTRIAN STAYING IN FACU\'S TAVERN HAS SOME INFO ABOUT A '}
						<span className={'text-tag-info'}>{'TREASURE'}</span>
						{' OR SOMETHING LIKE THAT. YOU SHOULD TALK TO HIM.'}&nbsp;
					</>	
				);
			}
			return (
				<>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
						{'OH HAVE YOU HEARD ABOUT '}
					</Typer>
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
						{'THE FOREST'}
					</Typer></span>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
						{' ? THE AUSTRIAN STAYING IN FACU\'S TAVERN HAS SOME INFO ABOUT A '}
					</Typer>
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
						{'TREASURE'}
					</Typer></span>
					<Typer
						shouldStart={npcTextIndex === 4}
						onDone={() => {
							set_npcTextIndex(i => i + 1);
							set_hadTheForestMessage(true);
						}}>
						{' OR SOMETHING LIKE THAT. YOU SHOULD TALK TO HIM.'}
					</Typer>&nbsp;
				</>
			);
		}
		if (hadInitialMessage) {
			return (
				<>
					{'HELLO, I AM '}
					<span className={'text-tag-info'}>{'LARA'}</span>
					{' FROM THE '}
					<span className={'text-tag-info'}>{'QUEST OFFICE'}</span>
					{'. I\'M THE KEEPER OF QUESTS. I KNOW WHAT NEEDS DOING. YOU LOOKING FOR SOME ADVERTURE? CHOSE A QUEST BELOW'}
					&nbsp;
				</>	
			);
		}
		return (
			<>
				<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
					{'HELLO, I AM '}
				</Typer>
				<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
					{'LARA'}
				</Typer></span>
				<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
					{' FROM THE '}
				</Typer>
				<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
					{'QUEST OFFICE'}
				</Typer></span>
				<Typer
					shouldStart={npcTextIndex === 4}
					onDone={() => {
						set_npcTextIndex(i => i + 1);
						set_hadInitialMessage(true);
					}}>
					{'. I\'M THE KEEPER OF QUESTS. I KNOW WHAT NEEDS DOING. YOU LOOKING FOR SOME ADVERTURE? CHOSE A QUEST BELOW!'}
				</Typer>&nbsp;
			</>
		);
	};
	return (
		<h1 key={nonce} className={'text-xs md:text-xs leading-normal md:leading-8'}>
			{renderNPCText()}
		</h1>
	);
}

function	Index({rarities, router}) {
	const	{active, address} = useWeb3();
	const	{theme} = useUI();
	const	adventurers = Object.values(rarities);

	return (
		<section className={'max-w-full'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
				<div className={'flex flex-col md:flex-row items-center mb-8 md:mb-8'}>
					<div className={'w-auto md:w-64 mr-0 md:mr-0'} style={{minWidth: 256}}>
						<Image
							src={theme === 'light' ? '/avatar/lara.gif' : '/avatar/lara.png'}
							loading={'eager'}
							quality={100}
							width={256}
							height={256} />
					</div>
					<Box className={'p-4'}>
						<NPCHeadline
							adventurersCount={adventurers.length}
							address={address}
							active={active}
							router={router} />
					</Box>
				</div>
			
				<DialogChoices
					adventurersCount={adventurers.length}
					router={router}
				/>
				{active && adventurers.length > 0 ? <section>
					<SectionDungeonTheCellar
						shouldDisplay={router?.query?.tab === 'the-cellar'}
						router={router}
						adventurers={rarities}
						adventurersCount={adventurers.length} />
					<SectionDungeonTheForest
						shouldDisplay={router?.query?.tab === 'the-forest'}
						router={router}
						adventurers={rarities}
						adventurersCount={adventurers.length} />
				</section> : null}
			</div>
		</section>
	);		
}

export default Index;
