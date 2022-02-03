import	React, {useState}					from	'react';
import	dayjs								from	'dayjs';
import	relativeTime						from	'dayjs/plugin/relativeTime';
import	useRarity							from	'contexts/useRarity';
import	Template							from	'components/templates/Adventurer';
import	AdventureTemplate					from	'components/templates/Adventures';
import	DescriptionFormater					from	'components/jsonParser/adventures/DescriptionFormater';
import	OptionsFormater						from	'components/jsonParser/adventures/OptionsFormater';
import	ADVENTURE							from	'utils/codex/adventures/openmic';

dayjs.extend(relativeTime);
function	Index({router}) {
	const	{currentAdventurer} = useRarity();
	const	[step, set_step] = useState('intro');
	const	[variables] = useState({});

	function	onSing() {
		router.push(`/adventures/openmic/perform?adventurer=${currentAdventurer.tokenID}`);
	}
	function	onBack() {
		router.push('/adventures');
	}
	function	getCurrentStep() {
		if (currentAdventurer.class !== 2)
			return 'noBard';
		if (currentAdventurer.level < 2)
			return 'noLevel';
		if (currentAdventurer?.adventures?.openMic?.canAdventure)
			return step;
		return 'rest';
	}

	return (
		<AdventureTemplate
			cover={'/adventures/openmic/header.jpeg'}
			overlayColor={'#FDAC53'}
			rightText={'Toss a coin to your Adventurer O Valley of Plenty'}>
			<div>
				<h1 className={'py-4 text-xl font-bold uppercase'}>{'The Tavern Hooligans'}</h1>
			</div>
			<div className={'text-base leading-relaxed normal-case text-plain'}>
				<DescriptionFormater
					addr={process.env.DUNGEON_OPEN_MIC_V2_ADDR}
					rawDescription={ADVENTURE[getCurrentStep()].description}
					variables={{
						...variables,
						'${adventurer_name}': currentAdventurer.displayName,
						'${next_adventure}': currentAdventurer?.adventures?.openMic?.nextAdventure
					}} />
			</div>
			<div className={'grid grid-cols-1 gap-4 pt-4 mt-4 border-t-2 border-black dark:border-dark-300'}>
				<OptionsFormater
					options={ADVENTURE[getCurrentStep()].options}
					onChoice={(choice) => {
						if (choice === 'sing') {
							onSing();
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
