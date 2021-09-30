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
import	useWeb3							from	'contexts/useWeb3';
import	Typer							from	'components/Typer';
import	DialogBox						from	'components/DialogBox';
import	Box								from	'components/Box';
import	{goAdventure, claimGold}		from	'utils/actions';

dayjs.extend(relativeTime);

function	NCPHeadline() {
	const	[NPCTextIndex, set_NPCTextIndex] = useState(0);

	const	renderNPCText = () => {
		return (
			<>
				<Typer onDone={() => set_NPCTextIndex(i => i + 1)} shouldStart={NPCTextIndex === 0}>
					{'HELLO THERE. I AM '}
				</Typer>
				<span className={'text-tag-info'}><Typer onDone={() => set_NPCTextIndex(i => i + 1)} shouldStart={NPCTextIndex === 1}>
					{'JANET'}
				</Typer></span>
				<Typer onDone={() => set_NPCTextIndex(i => i + 1)} shouldStart={NPCTextIndex === 2}>
					{', I\'LL HELP YOU COORDINATE YOUR PARTY OF HEROES. FREE OF CHARGE! THE TOWN PAYS ME. WHAT ARE YOUR COMMANDS.'}
				</Typer>
			</>
		);
	};
	return (
		<h1 className={'text-xs md:text-xs leading-normal md:leading-8'}>
			{renderNPCText()}
		</h1>
	);
}

function	handleGoAdventure(rarities, provider, updateRarity) {
	rarities.forEach(rarity => {
		const	isInTheForest = rarity.level >= 2 && !rarity?.dungeons?.forest?.canAdventure;
		goAdventure({
			loader: isInTheForest ? 'Claiming XP...' : 'Going on an adventure...',
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
	const	{provider, chainTime} = useWeb3();

	const	adventurers = Object.values(rarities);
	const	canAdventureRarities = adventurers.filter(rarity => !dayjs(new Date(rarity.log * 1000)).isAfter(dayjs(new Date(chainTime * 1000))));
	const	nextAdventureTime = adventurers.length && dayjs(new Date(Math.min(...adventurers.map(rarity => rarity.log)) * 1000)).from(dayjs(new Date(chainTime * 1000)));
	const	canGoldRarities = adventurers.filter(rarity => Number(rarity?.gold?.claimable || 0) > 0);

	return (
		<section className={'max-w-full'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
				<div className={'flex flex-col md:flex-row items-center mb-8 md:mb-8'}>
					<div className={'w-auto md:w-64 mr-0 md:mr-8'} style={{minWidth: 256}}>
						<Image
							src={'/avatar/janet.gif'}
							loading={'eager'}
							quality={100}
							width={256}
							height={256} />
					</div>
					<Box className={'p-4'}>
						<NCPHeadline />
					</Box>
				</div>
				<DialogBox
					options={[
						canAdventureRarities.length ? {label: `Send everyone (${canAdventureRarities.length}) to adventures`, onClick: () => handleGoAdventure(canAdventureRarities, provider, updateRarity)} : {label: nextAdventureTime ? `Next adventure ready ${nextAdventureTime}` : 'No adventurer available', onClick: () => {}},
						canGoldRarities.length ? {label: `Claim gold for ${canGoldRarities.length} heroes`, onClick: () => handleClaimGold(canGoldRarities, provider, updateRarity)} : {label: 'No gold to claim!', onClick: () => {}},
					]} />
			</div>
		</section>
	);
}

export default Index;
