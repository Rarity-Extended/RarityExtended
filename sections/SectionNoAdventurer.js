/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@MajorTom_eth
**	@Date:					Saturday September 11th 2021
**	@Filename:				SectionNoAdventurer.js
******************************************************************************/

import	React, {useState}				from	'react';
import	Image							from	'next/image';
import	useWeb3							from	'contexts/useWeb3';
import	useUI							from	'contexts/useUI';
import	useRarity						from	'contexts/useRarity';
import	Typer							from	'components/Typer';
import	SectionRecruit					from	'sections/SectionRecruit';

function	FacuHeadline() {
	const	[facuTextIndex, set_facuTextIndex] = useState(0);
	
	const	renderFacuText = () => {
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
	};
	return (
		<h1 className={'text-sm md:text-lg leading-normal md:leading-10'}>
			{renderFacuText()}
		</h1>
	);
}

function	SectionNoAdventurer({router}) {
	const	{theme} = useUI();
	const	{provider} = useWeb3();
	const	{fetchRarity} = useRarity();

	return (
		<section className={'mt-12 max-w-full'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
				<div className={'flex flex-col md:flex-row items-center md:items-center mb-8 md:mb-16'}>
					<div className={'w-auto md:w-64 mr-0 md:mr-16'} style={{minWidth: 256}}>
						<Image
							src={theme === 'light' ? '/avatar/facu.gif' : '/avatar/facu.png'}
							loading={'eager'}
							quality={100}
							width={256}
							height={256} />
					</div>
					<FacuHeadline />
				</div>
				<SectionRecruit shouldDisplay={true} router={router} provider={provider} fetchRarity={fetchRarity} />
			</div>
		</section>
	);		
}

export default SectionNoAdventurer;
