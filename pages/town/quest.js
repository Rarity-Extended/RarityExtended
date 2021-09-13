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
import	Typer							from	'components/Typer';
import	DialogBox						from	'components/DialogBox';
import	SectionDungeonTheCellar			from	'sections/SectionDungeonTheCellar';
import	SectionDungeonTheForest			from	'sections/SectionDungeonTheForest';

function	DialogChoices({router, adventurersCount}) {
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
			options={[
				{label: 'WELCOME', onClick: () => router.push('/town/quest')},
				{label: 'THE RAT IN THE CELLAR', onClick: () => router.push('/town/quest?tab=the-cellar')},
				{label: 'THE TRESURE IN THE FOREST', onClick: () => router.push('/town/quest?tab=the-forest')},
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
			return (
				<>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
						{'YES. THE BIG UGLY RAT. '}
					</Typer>
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
						{'FACU'}
					</Typer></span>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
						{' THE TAVERN KEEPER NEED SOME HELP WITH THIS. DEBUTANT STUFF. IF YOU CAN '}
					</Typer>
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
						{'DODGE AND HIT HARD'}
					</Typer></span>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 4}>
						{', YOU SHOULD GO.'}
					</Typer>
				</>
			);
		}
		if (router?.query?.tab === 'the-forest') {
			return (
				<>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
						{'OH YOU HEARD ABOUT '}
					</Typer>
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
						{'THE FOREST'}
					</Typer></span>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
						{' ? THIS MAN OVER THERE HAS SOME INFO ABOUT A '}
					</Typer>
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
						{'TREASURE'}
					</Typer></span>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 4}>
						{' OR SOMETHING LIKE THAT. YOU SHOULD TALK TO HIM.'}
					</Typer>
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
				<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 4}>
					{'. WE HAVE A LOT OF WORK TO DO. SELECT YOUR TASK AND GO !'}
				</Typer>
			</>
		);
	};
	return (
		<h1 key={nonce} className={'text-sm md:text-lg leading-normal md:leading-10'}>
			{renderNPCText()}
		</h1>
	);
}

function	Index({rarities, router}) {
	const	{active, address} = useWeb3();
	const	{theme} = useUI();
	const	adventurers = Object.values(rarities);

	return (
		<section className={'mt-12 max-w-full'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
				<div className={'flex flex-col md:flex-row items-center md:items-center mb-8 md:mb-8'}>
					<div className={'w-auto md:w-64 mr-0 md:mr-16'} style={{minWidth: 256}}>
						<Image
							src={theme === 'light' ? '/avatar/lara.gif' : '/avatar/lara.png'}
							loading={'eager'}
							quality={100}
							width={256}
							height={256} />
					</div>
					<NPCHeadline
						adventurersCount={adventurers.length}
						address={address}
						active={active}
						router={router}
					/>
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
