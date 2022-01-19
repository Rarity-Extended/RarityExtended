import	React, {useState}					from	'react';
import	dayjs								from	'dayjs';
import	relativeTime						from	'dayjs/plugin/relativeTime';
import	useRarity							from	'contexts/useRarity';
import	useWeb3								from	'contexts/useWeb3';
import	Template							from	'components/templates/Adventurer';
import	AdventureTemplate					from	'components/templates/Adventures';
import	DescriptionFormater					from	'components/jsonParser/adventures/DescriptionFormater';
import	OptionsFormater						from	'components/jsonParser/adventures/OptionsFormater';
import	ADVENTURE							from	'utils/codex/adventures/the-forest';
import	{exploreTheForest, discoverTreasureTheForest}	from	'utils/actions/dungeon_theForest';

dayjs.extend(relativeTime);
function	Index({router}) {
	const	{provider, chainTime} = useWeb3();
	const	{currentAdventurer, updateRarity} = useRarity();
	const	[step, set_step] = useState('intro');

	function	getCurrentStep() {
		if (!currentAdventurer?.adventures?.forest?.canAdventure && dayjs(new Date(currentAdventurer?.adventures?.forest?.endBlockTs * 1000)).isBefore(dayjs(new Date(chainTime * 1000))))
			return 'dig';
		if (currentAdventurer?.adventures?.forest?.canAdventure)
			return step;
		return 'rest';
	}
	function	onExplore(time) {
		exploreTheForest({
			provider,
			tokenID: currentAdventurer.tokenID,
			timeInDays: time
		}, ({error}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(currentAdventurer.tokenID);
		});
	}
	function	onDig() {
		discoverTreasureTheForest({
			provider,
			tokenID: currentAdventurer.tokenID
		}, ({error}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(currentAdventurer.tokenID);
		});
	}
	function	onBack() {
		router.push('/adventures');
	}

	return (
		<AdventureTemplate
			cover={'/adventures/the-forest/header.jpeg'}
			overlayColor={'#124712'}
			rightText={'THIS IS A BIG AND DARK FOREST WITH SOME MUSHROOM'}>
			<div>
				<h1 className={'pt-4 pb-4 font-bold text-xl font-story'}>{'THE FOREST'}</h1>
			</div>
			<div className={'normal-case font-story text-base leading-relaxed text-plain'}>
				<DescriptionFormater
					addr={process.env.DUNGEON_THE_FOREST_ADDR}
					rawDescription={ADVENTURE[getCurrentStep()].description}
					variables={{

						'${dig_time}': dayjs(new Date(currentAdventurer?.adventures?.forest?.endBlockTs * 1000)).from(dayjs(new Date(chainTime * 1000))),
						'${adventurer_name}': currentAdventurer.displayName,
						'${next_adventure}': currentAdventurer?.adventures?.forest?.nextAdventure
					}} />
			</div>
			<div className={'grid grid-cols-1 gap-4 mt-4 border-t-2 border-black dark:border-dark-300 pt-4'}>
				<OptionsFormater
					options={ADVENTURE[getCurrentStep()].options}
					onChoice={(choice) => {
						if (choice === 'explore4') {
							onExplore(4);
						} else if (choice === 'explore5') {
							onExplore(5);
						} else if (choice === 'explore6') {
							onExplore(6);
						} else if (choice === 'explore7') {
							onExplore(7);
						} else if (choice === 'dig_treasure') {
							onDig();
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
