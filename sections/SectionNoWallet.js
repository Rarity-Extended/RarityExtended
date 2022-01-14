/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				SectionNoAdventurer.js
******************************************************************************/

import	React, {useState}				from	'react';
import	Image							from	'next/image';
import	useUI							from	'contexts/useUI';
import	Typer							from	'components/Typer';
import	DialogBox						from	'components/DialogBox';
import	ModalLogin						from	'components/ModalLogin';

function	FacuHeadline() {
	const	[facuTextIndex, set_facuTextIndex] = useState(0);
	
	const	renderFacuText = () => {
		return (
			<>
				<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 0}>
					{'WELCOME, ADVENTURER! I AM'}
				</Typer>&nbsp;
				<span className={'text-highlight'}><Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 1}>
					{'FACU'}
				</Typer></span>
				<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 2}>
					{', THE TAVERN KEEPER.'}
				</Typer>&nbsp;
				<div />
				<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 3}>
					{'PERHAPS YOU SHOULD CONSIDER CONNECTING YOUR WALLET ?'}
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

function	SectionNoWallet() {
	const	{theme} = useUI();
	const	[modalLoginOpen, set_modalLoginOpen] = useState(false);

	return (
		<section className={'max-w-full'}>
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
					<FacuHeadline />
				</div>
				<DialogBox
					options={[
						{label: 'Connect wallet', onClick: () => set_modalLoginOpen(true)},
					]} />
			</div>
			<ModalLogin open={modalLoginOpen} set_open={set_modalLoginOpen} />
		</section>
	);		
}

export default SectionNoWallet;
