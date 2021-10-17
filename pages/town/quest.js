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
import	Box								from	'components/Box';

function	DialogChoices({adventurersCount, router}) {
	const	[selectedOption, set_selectedOption] = useState(0);
	const	[dialogNonce, set_dialogNonce] = useState(0);
	const	{currentAdventurer} = useRarity();

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

	return (
		<DialogBox
			selectedOption={selectedOption}
			nonce={dialogNonce}
			options={[
				{
					label: (
						<>
							{'THE RAT IN '}
							<span className={'text-tag-info dark:text-tag-warning'}>{'THE CELLAR'}</span>
						</>
					),
					onClick: () => router.push('/countryside/cellar')
				},
				{
					label: (
						<>
							{'THE TREASURE IN '}
							<span className={'text-tag-info dark:text-tag-warning'}>{'THE FOREST'}</span>
						</>
					),
					onClick: () => router.push('/countryside/forest')
				},
				{
					label: (
						<>
							{'GET SOME INFO ABOUT'}
							<span className={'text-tag-info dark:text-tag-warning'}>{' THE BOARS'}</span>
						</>
					),
					onClick: () => router.push('/countryside/boars')
				},
			]} />
	);
}

function	NPCHeadline({router, active, address, adventurersCount}) {
	const	[nonce, set_nonce] = useState(0);
	const	[npcTextIndex, set_npcTextIndex] = useState(0);
	
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
					<span className={'text-tag-info dark:text-tag-warning'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
						{'LARA'}
					</Typer></span>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
						{' FROM THE '}
					</Typer>
					<span className={'text-tag-info dark:text-tag-warning'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
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
					<span className={'text-tag-info dark:text-tag-warning'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
						{'LARA'}
					</Typer></span>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
						{' FROM THE '}
					</Typer>
					<span className={'text-tag-info dark:text-tag-warning'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
						{'QUEST OFFICE'}
					</Typer></span>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 4}>
						{'. YOU NEED AN ADVENTURER TO START HERE. GO TO THE TAVERN TO RECRUIT ONE.'}
					</Typer>
				</>
			);
		}
	
		return (
			<>
				<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
					{'HELLO, I AM '}
				</Typer>
				<span className={'text-tag-info dark:text-tag-warning'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
					{'LARA'}
				</Typer></span>
				<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
					{' FROM THE '}
				</Typer>
				<span className={'text-tag-info dark:text-tag-warning'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
					{'QUEST OFFICE'}
				</Typer></span>
				<Typer
					shouldStart={npcTextIndex === 4}
					onDone={() => set_npcTextIndex(i => i + 1)}>
					{'. I\'M THE KEEPER OF QUESTS. I KNOW WHAT NEEDS DOING. YOU LOOKING FOR SOME ADVENTURE? CHOSE A QUEST BELOW!'}
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
					router={router} />
			</div>
		</section>
	);		
}

export default Index;
