/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				guild-house.js
******************************************************************************/

import	dayjs							from	'dayjs';
import	relativeTime					from	'dayjs/plugin/relativeTime';
import	React, {useState}				from	'react';
import	Image							from	'next/image';
import	useUI							from	'contexts/useUI';
import	useWeb3							from	'contexts/useWeb3';
import	Typer							from	'components/Typer';
import	DialogBox						from	'components/DialogBox';
import	{goAdventure, claimGold}	from	'utils/actions';

dayjs.extend(relativeTime);

function	FacuHeadline() {
	const	[facuTextIndex, set_facuTextIndex] = useState(0);

	const	renderFacuText = () => {
		return (
			<>
				<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 0}>
					{'WELCOME TO THE'}
				</Typer>&nbsp;
				<span className={'text-tag-info'}><Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 1}>
					{'GUILD HOUSE'}
				</Typer></span>
				<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 2}>
					{'! SOMETHING TO DOING?'}
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

function	handleGoAdventure(rarities, provider, updateRarity) {
	rarities.forEach(rarity => {
		goAdventure({
			provider,
			contractAddress: process.env.RARITY_ADDR,
			tokenID: rarity.tokenID,
		}, ({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(data);
		});
	});
}

function	handleClaimGold(rarities, provider, updateRarity) {
	rarities.forEach(rarity => {
		claimGold({
			provider,
			contractAddress: process.env.RARITY_GOLD_ADDR,
			tokenID: rarity.tokenID,
		}, ({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(data);
		});
	});
}

function	Index({rarities, updateRarity}) {
	const	{theme} = useUI();
	const	{provider, chainTime} = useWeb3();

	const	adventurers = Object.values(rarities);
	const	canAdventureRarities = adventurers.filter(rarity => !dayjs(new Date(rarity.log * 1000)).isAfter(dayjs(new Date(chainTime * 1000))));
	const	nextAdventureTime = adventurers.length && dayjs(new Date(Math.min(...adventurers.map(rarity => rarity.log)) * 1000)).from(dayjs(new Date(chainTime * 1000)));
	const	canGoldRarities = adventurers.filter(rarity => Number(rarity?.gold?.claimable || 0) > 0);

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
					<FacuHeadline />
				</div>
				<DialogBox
					options={[
						canAdventureRarities.length ? {label: `Send everyone (${canAdventureRarities.length}) to adventures`, onClick: () => handleGoAdventure(canAdventureRarities, provider, updateRarity)} : {label: nextAdventureTime ? `Next adventure ready ${nextAdventureTime}` : 'No adventurer available', onClick: () => {}},
						canGoldRarities.length ? {label: `Claim gold for ${canGoldRarities.length} adventurers`, onClick: () => handleClaimGold(canGoldRarities, provider, updateRarity)} : {label: 'No gold to claim!', onClick: () => {}},
					]} />
			</div>
		</section>
	);
}

export default Index;
