/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday September 7th 2021
**	@Filename:				tavern.js
******************************************************************************/

import	React, {useState}					from	'react';
import	Image								from	'next/image';
import	useDungeon, {DungeonContextApp}		from	'contexts/useDungeonsTheCellar';
import	useWeb3								from	'contexts/useWeb3';
import	useRarity							from	'contexts/useRarity';
import	DialogBox							from	'components/DialogBox';
import	Typer								from	'components/Typer';
import	{exploreTheForest}					from	'utils/actions';

const	classMappingImg = [
	'',
	'/front/barbarian.svg',
	'/bard.png',
	'/cleric.png',
	'/druid.png',
	'/fighter.png',
	'/front/monk.svg',
	'/paladin.png',
	'/ranger.png',
	'/rogue.png',
	'/sorcerer.png',
	'/wizard.png',
];

function	NPCHeadline() {
	const	[npcTextIndex, set_npcTextIndex] = useState(0);
	
	const	renderNPCText = () => {
		return (
			<>
				<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
					{'YOU ARE ABOUT TO LEAVE THE TOWN TO EXPLORE '}
				</Typer>
				<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
					{'THE FOREST'}
				</Typer></span>
				<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
					{'. FOR HOW LONG DO YOU WANT TO TAKE PROVISIONS FOR ?'}
				</Typer>
			</>
		);
	};
	return (
		<h1 className={'text-sm md:text-lg leading-normal md:leading-10'}>
			{renderNPCText()}
		</h1>
	);
}

function	Index({dungeon, adventurer, router}) {
	const	{provider} = useWeb3();
	const	{updateRarity} = useRarity();

	function	onExploreTheForest(time) {
		exploreTheForest({
			provider,
			contractAddress: process.env.DUNGEON_THE_FOREST_ADDR,
			tokenID: adventurer.tokenID,
			timeInDays: time
		}, ({error}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(dungeon.tokenID);
			if (router.pathname === '/dungeons/the-forest')
				router.push('/town/quest?tab=the-forest');
		});
	}

	return (
		<section className={'max-w-full'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
				<div className={'flex flex-col md:flex-row items-center md:items-center mb-8 md:mb-8'}>
					<div className={'w-auto md:w-64 mr-0 md:mr-16'} style={{minWidth: 256}}>
						<Image
							src={classMappingImg[adventurer.class]}
							loading={'eager'}
							quality={100}
							width={256}
							height={256} />
					</div>
					<NPCHeadline />
				</div>
				<DialogBox
					options={[
						{label: 'Go for 4 days', onClick: () => onExploreTheForest(4)},
						{label: 'Go for 5 days', onClick: () => onExploreTheForest(5)},
						{label: 'Go for 6 days', onClick: () => onExploreTheForest(6)},
						{label: 'Go for 7 days', onClick: () => onExploreTheForest(7)}
					]} />
			</div>
		</section>
	);		
}

function	Wrapper({router, adventurer}) {
	const	{dungeon} = useDungeon();

	return (
		<Index router={router} dungeon={dungeon} adventurer={adventurer} />
	);
}

function	WithContext({rarities, router}) {
	if (!rarities || rarities === {}) {
		return null;
	}
	if (!rarities[router?.query?.adventurer]) {
		if (typeof(window) !== 'undefined')
			router.push('/town/quest?tab=the-forest');
		return null;
	}
	return (
		<DungeonContextApp adventurer={rarities[router?.query?.adventurer]}>
			<Wrapper router={router} adventurer={rarities[router?.query?.adventurer]} />
		</DungeonContextApp>
	);
}

export default WithContext;
