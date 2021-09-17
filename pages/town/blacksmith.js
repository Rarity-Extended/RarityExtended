/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				blacksmith.js
******************************************************************************/

import	React, {useState}				from	'react';
import	Image							from	'next/image';
import	useUI							from	'contexts/useUI';
import	Typer							from	'components/Typer';
import	DialogBox						from	'components/DialogBox';
import	SectionArtifactsTheForest			from	'sections/SectionArtifactsTheForest';

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
				{label: 'WELCOME', onClick: () => router.push('/town/blacksmith')},
				{label: 'Upgrade an Artifact', onClick: () => router.push('/town/blacksmith?tab=upgrade')},
				// {label: 'Restore an Artifact', onClick: () => router.push('/town/blacksmith?tab=restore')},
			]} />
	);
}

function	NCPHeadline() {
	const	[facuTextIndex, set_facuTextIndex] = useState(0);
	
	const	renderNCPText = () => {
		return (
			<>
				<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 0}>
					{'WELCOME! I AM '}
				</Typer>&nbsp;
				<span className={'text-tag-info'}><Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 1}>
					{'CEAZOR THE BLACKSMITH'}
				</Typer></span>
				<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 2}>
					{'. MY WORKSHOP IS UNDER CONSTRUCTION, BUT IF YOU FOUND SOME ITEMS IN THE FOREST, MAYBE I CAN UPGRADE THEM FOR XP. OR RESTORE THE ONES FROM THE FORMER FOREST.'}
				</Typer>
			</>
		);
	};
	return (
		<h1 className={'text-sm md:text-lg leading-normal md:leading-10'}>
			{renderNCPText()}
		</h1>
	);
}

function	Index({rarities, router}) {
	const	{theme} = useUI();
	const	adventurers = Object.values(rarities);

	return (
		<section className={'mt-12 max-w-full'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
				<div className={'flex flex-col md:flex-row items-center md:items-center mb-8 md:mb-8'}>
					<div className={'w-auto md:w-64 mr-0 md:mr-16'} style={{minWidth: 256}}>
						<Image
							src={theme === 'light' ? '/avatar/facu.gif' : '/avatar/facu.png'}
							loading={'eager'}
							quality={100}
							width={256}
							height={256} />
					</div>
					<NCPHeadline />
				</div>
				<DialogChoices
					router={router}
					adventurersCount={adventurers.length}
					adventurer={rarities} />
				<SectionArtifactsTheForest
					shouldDisplay={router?.query?.tab === 'upgrade'}
					router={router}
					adventurers={rarities}
					adventurersCount={adventurers.length} />
			</div>
		</section>
	);		
}

export default Index;
