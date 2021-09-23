/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				Footer.js
******************************************************************************/

import	React			from	'react';
import	useUI			from	'contexts/useUI';

function	Footer() {
	const	{theme, switchTheme} = useUI();
	return (
		<div className={'absolute bottom-3 text-center text-xxs left-0 right-0 flex flex-col justify-center items-center'}>
			<div>
				<a href={'https://ftmscan.com/token/0xce761d788df608bd21bdd59d6f4b54b2e27f25bb#readContract'} target={'_blank'} rel={'noreferrer'} className={'hover:underline'}>
					{'Rarity Manifested'}
				</a>
				{' - '}
				<a href={'https://github.com/Rarity-Extended/RarityExtended'} target={'_blank'} rel={'noreferrer'} className={'hover:underline'}>
					{'Source code'}
				</a>
				{' - '}
				<a href={'https://andrecronje.medium.com/loot-rarity-d341faa4485c'} target={'_blank'} rel={'noreferrer'} className={'hover:underline'}>
					{'Loot & Rarity'}
				</a>
			</div>
			<div onClick={switchTheme} className={'py-2 hover:underline cursor-pointer'}>
				{`Switch to ${theme === 'light' || theme === 'light-initial' ? 'dark' : 'light'} mode`}
			</div>
			<div>
				{'Made with 💙 by the 🕹 community'}
			</div>
		</div>
	);
}
export default Footer;
