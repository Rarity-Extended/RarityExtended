/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				market.js
******************************************************************************/

import	React, {useState}				from	'react';
import	Image							from	'next/image';
import	useUI							from	'contexts/useUI';
import	Typer							from	'components/Typer';
import	DialogBox						from	'components/DialogBox';

function	FacuHeadline() {
	const	[facuTextIndex, set_facuTextIndex] = useState(0);
	
	const	renderFacuText = () => {
		return (
			<>
				<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 0}>
					{'THE'}
				</Typer>&nbsp;
				<span className={'text-tag-info'}><Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 1}>
					{'MARKET'}
				</Typer></span>
				<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 2}>
					{' IS NOT YET OPEN, BUT YOU CAN COME AND HAVE A DRINK IN MY TAVERN IN THE MEAN TIME!'}
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

function	Index({router}) {
	const	{theme} = useUI();

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
						{label: 'Go back to the tavern', onClick: () => router.push('/town/tavern')},
					]} />
			</div>
		</section>
	);		
}

export default Index;
