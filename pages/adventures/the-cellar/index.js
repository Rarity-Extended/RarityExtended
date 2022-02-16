import	React, {useState}					from	'react';
import	useRarity							from	'contexts/useRarity';
import	useDungeons							from	'contexts/useDungeons';
import	Template							from	'components/templates/Head';
import	AdventureTemplate					from	'components/adventures/Template';
import	DescriptionFormater					from	'components/adventures/DescriptionFormater';
import	OptionsFormater						from	'components/adventures/OptionsFormater';
import	ADVENTURE							from	'utils/codex/adventures/the-cellar';

function	Index({router}) {
	const	{currentAdventurer} = useRarity();
	const	{dungeons} = useDungeons();
	const	[step, set_step] = useState('intro');
	const	[variables] = useState({});

	function	onFight() {
		router.push(`/adventures/the-cellar/fight?adventurer=${currentAdventurer.tokenID}`);
	}
	function	onBack() {
		router.push('/adventures');
	}

	return (
		<AdventureTemplate
			cover={'/adventures/the-cellar/header.jpeg'}
			overlayColor={'#000000'}
			rightText={'YOU SHOULD KILL THE BIG UGLY RAT'}>
			<div>
				<h1 className={'py-4 text-xl font-bold'}>{'THE CELLAR'}</h1>
			</div>
			<div className={'text-base leading-relaxed normal-case text-plain'}>
				<DescriptionFormater
					addr={process.env.DUNGEON_THE_CELLAR_ADDR}
					rawDescription={ADVENTURE[dungeons[currentAdventurer.tokenID]?.cellar?.canAdventure ? step : 'rest'].description}
					variables={{
						...variables,
						'${adventurer_name}': currentAdventurer.displayName,
						'${next_adventure}': dungeons[currentAdventurer.tokenID]?.cellar?.nextAdventure
					}} />
			</div>
			<div className={'grid grid-cols-1 gap-4 pt-4 mt-4 border-t-2 border-black dark:border-dark-300'}>
				<OptionsFormater
					options={ADVENTURE[dungeons[currentAdventurer.tokenID]?.cellar?.canAdventure ? step : 'rest'].options}
					onChoice={(choice) => {
						if (choice === 'fight') {
							onFight();
						} else if (choice === 'adventures') {
							onBack();
						} else {
							set_step(choice);
						}
					}}
				/>
			</div>
		</AdventureTemplate>
						
	);
}

Index.getLayout = function getLayout(page) {
	return (
		<Template>
			{page}
		</Template>
	);
};

export default Index;
