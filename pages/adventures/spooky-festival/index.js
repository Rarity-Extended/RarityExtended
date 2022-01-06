/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday September 7th 2021
**	@Filename:				tavern.js
******************************************************************************/

import	React, {useState, useEffect}	from	'react';
import	Image							from	'next/image';
import	toast							from	'react-hot-toast';
import	dayjs							from	'dayjs';
import	relativeTime					from	'dayjs/plugin/relativeTime';
import	useWeb3							from	'contexts/useWeb3';
import	useRarity						from	'contexts/useRarity';
import	DialogNoBox						from	'components/DialogNoBox';
import	Tooltip							from	'components/Tooltip';
import	Rock							from	'components/icons/Rock';
import	Rob								from	'components/icons/Rob';
import	Eat								from	'components/icons/Eat';
import	Story							from	'components/icons/Story';
import	Sparkle							from	'components/icons/Sparkle';
import	Balloon							from	'components/icons/Balloon';
import	Spectre							from	'components/icons/Spectre';
import	Boar							from	'components/icons/Boar';
import	Egg								from	'components/icons/Egg';
import	Box								from	'components/Box';
import	{claimCandies, trickOrTreat, spookyActivity}	from	'utils/actions/spookyFestival';

dayjs.extend(relativeTime);

function	CandyIcon() {
	return (
		<svg xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'} width={16} height={16}>
			<g><path d={'M391.22 9.22c-21.755 67.887-29.008 99.75-52.25 146.218 2.776 2.15 5.5 4.42 8.124 6.843 23.768-21.825 42.788-47.49 51.937-85.5l18.158 4.376c-10.093 41.93-31.86 71.302-57.375 94.813 1.442 1.81 2.832 3.657 4.156 5.53 27.306-3.97 52.29-12.325 74.56-32.47l12.533 13.876c-23.42 21.182-49.982 31.05-76.938 35.875.75 1.56 1.477 3.138 2.156 4.72 53.284 5.685 96.878-3.05 122.408-44.094C431.28 144.456 480.78 24.198 391.217 9.22zM247.06 153.937c-9.422-.058-18.308 1.46-25.78 4.625l-.095-.188c-10.542 4.937-20.434 11.78-29.156 20.5-35.073 35.074-39.537 88.93-13.436 128.813-4.858-12.255-7.025-25.792-5.28-39.97 2.61-21.226 13.892-43.415 35.842-64.687l13 13.407c-19.616 19.01-28.3 37.187-30.312 53.563-2.014 16.376 2.574 31.435 11.375 44.53 15.493 23.06 44.764 38.645 69.093 39.595 23.7-1.754 46.925-11.707 65.093-29.875 40.22-40.22 40.22-105.156 0-145.375-2.658-2.66-5.42-5.13-8.28-7.438 9.885 11.527 16.984 25.703 19.28 42.063 2.973 21.18-2.147 45.52-17.844 71.75l-16.062-9.594c14.027-23.44 17.7-43.222 15.406-59.562-2.293-16.34-10.578-29.69-22.47-40.063-16.347-14.26-39.644-21.967-60.373-22.093zM133.47 317.78c-50.013.115-67.71 4.92-116.345 55.283 66.358-2.98 34.08 106.974 107.47 126.156 3.573-48.6 22.248-86.363 58.468-155.626-23.81 15.56-44.668 34.515-60 63.687l-16.563-8.686c14.987-28.514 35.14-48.585 57.125-64.375-25.9 2.17-51.153 8.562-76.688 24.686l-9.968-15.78c22.406-14.15 44.986-21.59 67.28-25.282-3.718-.023-7.382-.07-10.78-.063z'} fill={'#fff'} fillOpacity={'1'}></path></g>
		</svg>
	);
}

function	Index({router}) {
	const	{currentAdventurer, updateRarity, rNonce} = useRarity();
	const	{provider, chainTime} = useWeb3();
	const	[activity, set_activity] = useState(0);
	const	[candiesClaimed, set_candiesClaimed] = useState(currentAdventurer?.festivals?.spooky?.claimed);
	const	[numberOfCandies, set_numberOfCandies] = useState(Number(currentAdventurer?.inventory[process.env.LOOT_CANDIES_ADDR]) || 0);
	const	[trickLog, set_trickLog] = useState(currentAdventurer?.festivals?.spooky?.trickLog || 0);
	const	[trickCount, set_trickCount] = useState(currentAdventurer?.festivals?.spooky?.trickCount || 0);
	const	[activitiesLog, set_activitiesLog] = useState(currentAdventurer?.festivals?.spooky?.activitiesLog || 0);
	const	[activitiesCount, set_activitiesCount] = useState(currentAdventurer?.festivals?.spooky?.activitiesCount || 0);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.scrollTo(0, 0);
		}
	} , [activity]);

	useEffect(() => {
		set_numberOfCandies(Number(currentAdventurer?.inventory[process.env.LOOT_CANDIES_ADDR]) || 0);
		set_candiesClaimed(currentAdventurer?.festivals?.spooky?.claimed);
		set_trickCount(Number(currentAdventurer?.festivals?.spooky?.trickCount));
		set_trickLog(Number(currentAdventurer?.festivals?.spooky?.trickLog));
		set_activitiesLog(Number(currentAdventurer?.festivals?.spooky?.activitiesLog || 0));
		set_activitiesCount(Number(currentAdventurer?.festivals?.spooky?.activitiesCount || 0));
	}, [rNonce, currentAdventurer]);

	function	playTrickOrTreat(amount, choice) {
		if (numberOfCandies < amount)
			return;
		trickOrTreat({
			provider,
			tokenID: currentAdventurer?.tokenID,
			amount,
			choice
		},
		({error}) => {
			return console.error(error);
		},
		(_toast, win) => {
			updateRarity(currentAdventurer.tokenID).then(() => {
				toast.dismiss(_toast);
				if (win) {
					toast.success(`You earned ${amount * 3} candies!`);
				} else {
					toast.error('Sorry, you didn\'t win this game');
				}
			});
		});
	}

	function	performActivity(typeOfActivity) {
		spookyActivity({
			provider,
			tokenID: currentAdventurer?.tokenID,
			typeOfActivity
		},
		({error}) => {
			return console.error(error);
		},
		(_toast) => {
			updateRarity(currentAdventurer.tokenID).then(() => {
				toast.dismiss(_toast);
				toast.success('You earned some candies!');
			});
		});
	}


	function	renderTrickOrTreat() {
		if (!currentAdventurer?.festivals?.spooky?.canTrick) {
			return (
				<>
					<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
						{'The Halloween fair is full of happy people. There is music and laughter, candy corn and cotton candy. The streets are filled with candy, flashy sweets in every imaginable color. There are towering piles of brightly colored boxes, each set for different tricks. There are countless bright orange pumpkins with black eyeshadows. The smell of orange spice is so thick that you can almost taste it.'}
						<div className={'my-4'} />
						
						{'The old woman is no longer under the large tree. She will probably be back '}
						<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
							{dayjs(new Date(trickLog * 1000)).from(dayjs(new Date(chainTime * 1000)))}
							<Tooltip>
								<p className={'text-sm leading-normal inline'}>
									{'You can only play 3 games per adventurer per day!'}</p>
							</Tooltip>
						</span>
						{' for some more card games.'}
					</h1>

					<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case text-justify mt-8'}>
						{'You still have '}
						<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
							{`${numberOfCandies} candies`}
							<Tooltip>
								<p className={'text-sm leading-normal inline'}>{'You can earn more candies by playing the Trick or Treat game or by doing some of the daily activites!'}</p>
							</Tooltip>
						</span>
						{' in your pocket.'}
					</h1>

					<div className={'pt-2 mt-4 border-t-2 border-black dark:border-dark-100 font-story font-bold text-sm md:text-base uppercase'}>
						<DialogNoBox
							options={[
								{label: 'CHECK THE OTHER ACTIVITIES', onClick: () => set_activity(1)},
								{label: 'JUST HEAD BACK TO YOUR HOME', onClick: () => router.push('/')},
							]} />
					</div>
				</>
			);
		}
		return (
			<>
				<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
					{'The Halloween fair is full of happy people. There is music and laughter, candy corn and cotton candy. The streets are filled with candy, flashy sweets in every imaginable color. There are towering piles of brightly colored boxes, each set for different tricks. There are countless bright orange pumpkins with black eyeshadows. The smell of orange spice is so thick that you can almost taste it.'}
					<div className={'my-4'} />
						
					{'Under a large tree, an old woman is drawing cards. She presents you with 3 cards and suggests a very simple game: choose a card, then a child from the village will do the same.'}
					<div className={'my-4'} />

					{'If you choose the same card '}
					<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
						{'you win 3 times your stake'}
						<Tooltip>
							<p className={'text-sm leading-normal inline'}>{'If you play for 100 candies and you win, you will have 300 candies!'}</p>
						</Tooltip>
					</span>
					{'. If not, you have to '}
					<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
						{'give your candies'}
						<Tooltip>
							<p className={'text-sm leading-normal inline'}>{'If you play for 100 candies and you lose, you will loose 100 candies!'}</p>
						</Tooltip>
					</span>
					{' to the child.'}
				</h1>

				<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case text-justify mt-8'}>
					{'You have '}
					<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
						{`${numberOfCandies} candies`}
						<Tooltip>
							<p className={'text-sm leading-normal inline'}>{'You can earn more candies by playing the Trick or Treat game of by doing some of the daily activites!'}</p>
						</Tooltip>
					</span>
					{' in your pocket, and you can play '}
					<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
						{`${3 - trickCount} more times`}
						<Tooltip>
							<p className={'text-sm leading-normal inline'}>{'You can earn more candies by playing the Trick or Treat game of by doing some of the daily activites!'}</p>
						</Tooltip>
					</span>
					{' today. Would you like to draw a card ?'}
				</h1>

				<div className={'grid grid-cols-1 md:grid-cols-3 gap-6 gap-x-8 mt-8'}>
					<div className={'p-4 bgpattern3 border-4 border-dark-100 w-full h-96 flex flex-col justify-center items-center'}>
						<Spectre width={100} height={100} />
						<p className={'text-center font-bold pt-12'}>{'The Spectre'}</p>
						<div className={'w-full flex flex-row justify-between space-x-4 mt-12 -mb-12'}>
							<div
								onClick={() => playTrickOrTreat(25, 1)}
								className={`w-1/3 flex flex-row justify-center items-center border-2 border-dark-100 p-2 ${numberOfCandies >= 25 ? 'cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal' : 'cursor-not-allowed dark:bg-dark-600 bg-white'}`}>
								<CandyIcon />
								<p className={'text-center text-megaxs pl-2'}>{'25'}</p>
							</div>
							<div
								onClick={() => playTrickOrTreat(50, 1)}
								className={`w-1/3 flex flex-row justify-center items-center border-2 border-dark-100 p-2 ${numberOfCandies >= 50 ? 'cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal' : 'cursor-not-allowed dark:bg-dark-600 bg-white'}`}>
								<CandyIcon />
								<p className={'text-center text-megaxs pl-2'}>{'50'}</p>
							</div>
							<div
								onClick={() => playTrickOrTreat(100, 1)}
								className={`w-1/3 flex flex-row justify-center items-center border-2 border-dark-100 p-2 ${numberOfCandies >= 100 ? 'cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal' : 'cursor-not-allowed dark:bg-dark-600 bg-white'}`}>
								<CandyIcon />
								<p className={'text-center text-megaxs pl-2'}>{'100'}</p>
							</div>
						</div>
					</div>

					<div className={'p-4 bgpattern3 border-4 border-dark-100 w-full h-96 flex flex-col justify-center items-center'}>
						<Boar width={100} height={100} />
						<p className={'text-center font-bold pt-12'}>{'The Boar'}</p>
						<div className={'w-full flex flex-row justify-between space-x-4 mt-12 -mb-12'}>
							<div
								onClick={() => playTrickOrTreat(25, 2)}
								className={`w-1/3 flex flex-row justify-center items-center border-2 border-dark-100 p-2 ${numberOfCandies >= 25 ? 'cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal' : 'cursor-not-allowed dark:bg-dark-600 bg-white'}`}>
								<CandyIcon />
								<p className={'text-center text-megaxs pl-2'}>{'25'}</p>
							</div>
							<div
								onClick={() => playTrickOrTreat(50, 2)}
								className={`w-1/3 flex flex-row justify-center items-center border-2 border-dark-100 p-2 ${numberOfCandies >= 50 ? 'cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal' : 'cursor-not-allowed dark:bg-dark-600 bg-white'}`}>
								<CandyIcon />
								<p className={'text-center text-megaxs pl-2'}>{'50'}</p>
							</div>
							<div
								onClick={() => playTrickOrTreat(100, 2)}
								className={`w-1/3 flex flex-row justify-center items-center border-2 border-dark-100 p-2 ${numberOfCandies >= 100 ? 'cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal' : 'cursor-not-allowed dark:bg-dark-600 bg-white'}`}>
								<CandyIcon />
								<p className={'text-center text-megaxs pl-2'}>{'100'}</p>
							</div>
						</div>
					</div>

					<div className={'p-4 bgpattern3 border-4 border-dark-100 w-full h-96 flex flex-col justify-center items-center'}>
						<Egg width={100} height={100} />
						<p className={'text-center font-bold pt-12'}>{'The Egg'}</p>
						<div className={'w-full flex flex-row justify-between space-x-4 mt-12 -mb-12'}>
							<div
								onClick={() => playTrickOrTreat(25, 3)}
								className={`w-1/3 flex flex-row justify-center items-center border-2 border-dark-100 p-2 ${numberOfCandies >= 25 ? 'cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal' : 'cursor-not-allowed dark:bg-dark-600 bg-white'}`}>
								<CandyIcon />
								<p className={'text-center text-megaxs pl-2'}>{'25'}</p>
							</div>
							<div
								onClick={() => playTrickOrTreat(50, 3)}
								className={`w-1/3 flex flex-row justify-center items-center border-2 border-dark-100 p-2 ${numberOfCandies >= 50 ? 'cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal' : 'cursor-not-allowed dark:bg-dark-600 bg-white'}`}>
								<CandyIcon />
								<p className={'text-center text-megaxs pl-2'}>{'50'}</p>
							</div>
							<div
								onClick={() => playTrickOrTreat(100, 3)}
								className={`w-1/3 flex flex-row justify-center items-center border-2 border-dark-100 p-2 ${numberOfCandies >= 100 ? 'cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal' : 'cursor-not-allowed dark:bg-dark-600 bg-white'}`}>
								<CandyIcon />
								<p className={'text-center text-megaxs pl-2'}>{'100'}</p>
							</div>
						</div>
					</div>
				</div>

				<div className={'pt-2 mt-4 border-t-2 border-black dark:border-dark-100 font-story font-bold text-sm md:text-base uppercase'}>
					<DialogNoBox
						options={[
							{label: 'CHECK THE OTHER ACTIVITIES', onClick: () => set_activity(1)},
							{label: 'JUST HEAD BACK TO YOUR HOME', onClick: () => router.push('/')},
						]} />
				</div>
			</>
		);
	}

	function	renderActivities() {
		if (!currentAdventurer?.festivals?.spooky?.canActivity) {
			return (
				<>
					<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
						{'The rest of the festival is filled with nonstop excitement. In front of the village hall, a gigantic bonfire swayed and crackled. The flames were small at first, but grew tremendously. Young people leaped through the burning logs. Everywhere they were surrounded by music and dancing and laughter. There were games and food stands and contests everywhere. There was no time to get bored of one thing before you found another to pull you away.'}
						<div className={'my-4'} />
						
						{'You have many options available to you here. But not now. Everyone is taking a break, they will be back '}
						<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
							{dayjs(new Date(activitiesLog * 1000)).from(dayjs(new Date(chainTime * 1000)))}
							<Tooltip>
								<p className={'text-sm leading-normal inline'}>
									{'You can only do 2 activities per adventurer per day!'}</p>
							</Tooltip>
						</span>
						{' for some more activities!'}
					</h1>

					<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case text-justify mt-8'}>
						{'You still have '}
						<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
							{`${numberOfCandies} candies`}
							<Tooltip>
								<p className={'text-sm leading-normal inline'}>{'You can earn more candies by playing the Trick or Treat game or by doing some of the daily activites!'}</p>
							</Tooltip>
						</span>
						{' in your pocket.'}
					</h1>

					<div className={'pt-2 mt-4 border-t-2 border-black dark:border-dark-100 font-story font-bold text-sm md:text-base uppercase'}>
						<DialogNoBox
							options={[
								{label: 'GO BACK TO THE CARD GAME', onClick: () => set_activity(0)},
								{label: 'JUST HEAD BACK TO YOUR HOME', onClick: () => router.push('/')},
							]} />
					</div>
				</>
			);
		}
		return (
			<>
				<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
					{'The rest of the festival is filled with nonstop excitement. In front of the village hall, a gigantic bonfire swayed and crackled. The flames were small at first, but grew tremendously. Young people leaped through the burning logs. Everywhere they were surrounded by music and dancing and laughter. There were games and food stands and contests everywhere. There was no time to get bored of one thing before you found another to pull you away.'}
					<div className={'my-4'} />
						
					{'You have many options available to you here. Maybe you\'ll decide to impress everyone at this cake eating contest or even steal a pumpkin. Maybe you are great to tell spooky stories, or just wise enough to watch for the kids around. Maybe you\'ll go with the grown man and throw rocks in the lake, or just try not to burn everything with some magic tricks.'}
					<div className={'my-4'} />
					{'Tonight '}
					<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
						{'the only prize is a bunch of candies'}
						<Tooltip>
							<p className={'text-sm leading-normal inline'}>{'You can earn as much candies as the main Attribute used for a game!'}</p>
						</Tooltip>
					</span>
					{'. You can do '}
					<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
						{`${2 -  activitiesCount} more activities today`}
						<Tooltip>
							<p className={'text-sm leading-normal inline'}>{'You are limited to 2 activities per day per adventurer! Enjoy!'}</p>
						</Tooltip>
					</span>
					{' and you have '}
					<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
						{`${numberOfCandies} candies`}
						<Tooltip>
							<p className={'text-sm leading-normal inline'}>{'You can earn more candies by playing the Trick or Treat game or by doing some of the daily activites!'}</p>
						</Tooltip>
					</span>
					{' in your pocket.'}
				</h1>

				<div className={'grid grid-cols-1 md:grid-cols-3 gap-6 gap-x-8 mt-8'}>
					<Box
						onClick={() => performActivity(0)}
						className={'p-4 bgpattern3 w-full h-full flex flex-col justify-center items-center cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal'}>
						<p className={'text-center font-bold pb-12'}>{'Rock Throwing'}</p>
						<Rock width={100} height={100} />
						<div className={'text-center text-regular pt-12 inline'}>
							<p className={'inline'}>{'The '}</p>
							<p className={'inline text-tag-info dark:text-tag-warning'}>{'Stronger'}</p>
							<p className={'inline'}>{' you are, the more candy you get!'}</p>
						</div>
					</Box>
					<Box
						onClick={() => performActivity(1)}
						className={'p-4 bgpattern3 w-full h-full flex flex-col justify-center items-center cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal'}>
						<p className={'text-center font-bold pb-12'}>{'Cake Eating'}</p>
						<Eat width={100} height={100} />
						<div className={'text-center text-regular pt-12'}>
							<p className={'inline'}>{'With a great '}</p>
							<p className={'inline text-tag-info dark:text-tag-warning'}>{'constitution'}</p>
							<p className={'inline'}>{' comes a resilient stomach!'}</p>
						</div>
					</Box>
					<Box
						onClick={() => performActivity(2)}
						className={'p-4 bgpattern3 w-full h-full flex flex-col justify-center items-center cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal'}>
						<p className={'text-center font-bold pb-12'}>{'Pumpkin Stealer'}</p>
						<Rob width={100} height={100} />
						<div className={'text-center text-regular pt-12'}>
							<p className={'inline'}>{'Do you have enough '}</p>
							<p className={'inline text-tag-info dark:text-tag-warning'}>{'Dexterity'}</p>
							<p className={'inline'}>{' for this?'}</p>
						</div>
					</Box>
					<Box
						onClick={() => performActivity(3)}
						className={'p-4 bgpattern3 w-full h-full flex flex-col justify-center items-center cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal'}>
						<p className={'text-center font-bold pb-12'}>{'Spooky Story'}</p>
						<Story width={100} height={100} />
						<div className={'text-center text-regular pt-12'}>
							<p className={'inline'}>{'Are you a '}</p>
							<p className={'inline text-tag-info dark:text-tag-warning'}>{'Charismatic'}</p>
							<p className={'inline'}>{' adventurer?'}</p>
						</div>
					</Box>
					<Box
						onClick={() => performActivity(4)}
						className={'p-4 bgpattern3 w-full h-full flex flex-col justify-center items-center cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal'}>
						<p className={'text-center font-bold pb-12'}>{'Magic Trick'}</p>
						<Sparkle width={100} height={100} />
						<div className={'text-center text-regular pt-12'}>
							<p className={'inline'}>{'The '}</p>
							<p className={'inline text-tag-info dark:text-tag-warning'}>{'Intelligence'}</p>
							<p className={'inline'}>{' is the magic here!'}</p>
						</div>
					</Box>
					<Box
						onClick={() => performActivity(5)}
						className={'p-4 bgpattern3 w-full h-full flex flex-col justify-center items-center cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal'}>
						<p className={'text-center font-bold pb-12'}>{'Wise babysitter'}</p>
						<Balloon width={100} height={100} />
						<div className={'text-center text-regular pt-12'}>
							<p className={'inline'}>{'Will you stay '}</p>
							<p className={'inline text-tag-info dark:text-tag-warning'}>{'wise'}</p>
							<p className={'inline'}>{' and keep the children safe?'}</p>
						</div>
					</Box>
				</div>

				<div className={'pt-2 mt-4 border-t-2 border-black dark:border-dark-100 font-story font-bold text-sm md:text-base uppercase'}>
					<DialogNoBox
						options={[
							{label: 'GO BACK TO THE CARD GAME', onClick: () => set_activity(0)},
							{label: 'JUST HEAD BACK TO YOUR HOME', onClick: () => router.push('/')},
						]} />
				</div>
			</>
		);
	}

	function	renderClaim() {
		return (
			<>
				<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
					{'The Halloween fair is full of happy people. There is music and laughter, candy corn and cotton candy. The streets are filled with candy, flashy sweets in every imaginable color. There are towering piles of brightly colored boxes, each set for different tricks. There are countless bright orange pumpkins with black eyeshadows. The smell of orange spice is so thick that you can almost taste it.'}
					<div className={'my-4'} />

					{'You see Facu surrounded by other citizens. He calls you. He is giving out candies to the crowd. You can tell that he plays a huge role in the community just from the way the group gathers around him. There is a look of affection and admiration on their faces.'}
					<div className={'my-4'} />

					{'He has a big bag full of '}
					<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
						{'sweet treats'}
						<Tooltip>
							<p className={'text-sm leading-normal inline'}>{'Candies are the currency for the Spooky Festival! You can use them to buy some specific limited supply items and some mysterious eggs ...'}</p>
						</Tooltip>
					</span>
					
					{'. The children reach out their hands and grab whatever they can from his bag.'}
					<div className={'my-4'} />

					{'“First time at the Spooky Festival? There are a lot of games to play and a lot more candy! '}
					<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
						{'Take theses'}
						<Tooltip>
							<p className={'text-sm leading-normal inline'}>{'You can claim your first '}</p>
							<p className={'text-sm leading-normal inline text-tag-info dark:text-tag-warning font-bold'}>
								{'100 candies'}
							</p>
							<p className={'text-sm leading-normal inline'}>{' for free! Enjoy the Spooky Festival!'}</p>
						</Tooltip>
					</span>
					{' and enjoy the party...”'}
				</h1>
				<div className={'pt-2 mt-4 border-t-2 border-black dark:border-dark-100 font-story font-bold text-sm md:text-base uppercase'}>
					<DialogNoBox
						options={[
							{
								label: 'COLLECT 100 FREE CANDIES',
								onClick: () => {
									claimCandies(
										{provider, tokenID: currentAdventurer?.tokenID},
										({error}) => {
											return console.error(error);
										},
										(_toast) => {
											updateRarity(currentAdventurer.tokenID).then(() => {
												toast.dismiss(_toast);
												toast.success('You earned 100 candies!');
											});
										});
								}
							},
							{label: 'JUST HEAD BACK TO YOUR HOME', onClick: () => router.push('/')},
						]} />
				</div>
			</>
		);
	}

	return (
		<section className={'max-w-full'}>
			<div className={'mt-8 max-w-prose w-full flex-col flex justify-center items-center mx-auto px-3'}>
				<Box className={'p-4 text-xs md:text-xs leading-normal md:leading-8 w-full relative'}>
					<div className={'relative'}>
						<div className={'filter grayscale -m-4 pb-8 opacity-70'}>
							<Image
								src={'/adventures/spooky-festival/header.jpeg'}
								loading={'eager'}
								objectFit={'cover'}
								objectPosition={'center'}
								quality={85}
								width={1550}
								height={400} />
						</div>
					</div>
					{candiesClaimed ?
						activity === 0 ? renderTrickOrTreat() : renderActivities()
						:
						renderClaim()
					}
				</Box>
			</div>
		</section>
	);
}

export default Index;
