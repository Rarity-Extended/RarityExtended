import	React, {useState}			from	'react';
import	dayjs						from	'dayjs';
import	relativeTime				from	'dayjs/plugin/relativeTime';
import	useWeb3						from	'contexts/useWeb3';
import	useRarity					from	'contexts/useRarity';
import	useInventory				from	'contexts/useInventory';
import	useDungeons					from	'contexts/useDungeons';
import	Template					from	'components/templates/Head';
import	AdventureTemplate			from	'components/adventures/Template';
import	DescriptionFormater			from	'components/adventures/DescriptionFormater';
import	OptionsFormater				from	'components/adventures/OptionsFormater';
import	ADVENTURE					from	'utils/codex/adventures/the-forest';
import	* as actions				from	'utils/actions/rarity_theForest';

dayjs.extend(relativeTime);
function	Index({router}) {
	const	{provider, chainTime} = useWeb3();
	const	{currentAdventurer} = useRarity();
	const	{dungeons, updateDungeonForOne} = useDungeons();
	const	{updateInventory} = useInventory();
	const	[step, set_step] = useState('intro');

	function	getCurrentStep() {
		if (!dungeons[currentAdventurer.tokenID]?.forest?.canAdventure && dayjs(new Date(dungeons[currentAdventurer.tokenID]?.forest?.endBlockTs * 1000)).isBefore(dayjs(new Date(chainTime * 1000))))
			return 'dig';
		if (dungeons[currentAdventurer.tokenID]?.forest?.canAdventure)
			return step;
		return 'rest';
	}
	function	onExplore(time) {
		actions.exploreTheForest({
			provider,
			tokenID: currentAdventurer.tokenID,
			timeInDays: time
		}, ({error}) => {
			if (error) {
				return console.error(error);
			}
			updateDungeonForOne(currentAdventurer.tokenID);
		});
	}
	function	onDig() {
		actions.discoverTreasureTheForest({
			provider,
			tokenID: currentAdventurer.tokenID
		}, ({error}) => {
			if (error) {
				return console.error(error);
			}
			updateDungeonForOne(currentAdventurer.tokenID);
			updateInventory(currentAdventurer.tokenID);
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
				<h1 className={'py-4 text-xl font-bold'}>{'THE FOREST'}</h1>
			</div>
			<div className={'text-base leading-relaxed normal-case text-plain'}>
				<DescriptionFormater
					addr={process.env.DUNGEON_THE_FOREST_ADDR}
					rawDescription={ADVENTURE[getCurrentStep()].description}
					variables={{

						'${dig_time}': dayjs(new Date(dungeons[currentAdventurer.tokenID]?.forest?.endBlockTs * 1000)).from(dayjs(new Date(chainTime * 1000))),
						'${adventurer_name}': currentAdventurer.displayName,
						'${next_adventure}': dungeons[currentAdventurer.tokenID]?.forest?.nextAdventure
					}} />
			</div>
			<div className={'grid grid-cols-1 gap-4 pt-4 mt-4 border-t-2 border-black dark:border-dark-300'}>
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
