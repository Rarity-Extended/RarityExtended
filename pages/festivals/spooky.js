/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday September 7th 2021
**	@Filename:				tavern.js
******************************************************************************/

import	React, {useState, useEffect}	from	'react';
import	Image							from	'next/image';
import	dayjs							from	'dayjs';
import	duration					from	'dayjs/plugin/duration';
import	relativeTime					from	'dayjs/plugin/relativeTime';
import	useWeb3							from	'contexts/useWeb3';
import	useUI							from	'contexts/useUI';
import	useRarity						from	'contexts/useRarity';
import	DialogBox						from	'components/DialogBox';
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


function	NPCHeadline({candiesCount = 100}) {
	const	renderNPCText = () => {
		return (
			<>
				{'WELCOME, TO '}
				<span className={'text-tag-info dark:text-tag-warning'}>{'THE SPOOKY FESTIVAL'}</span>
				{'! I AM '}
				<span className={'text-tag-info dark:text-tag-warning'}>{'BAT THE BAT'}</span>
				{'! WE HAVE PLENTY OF ACTIVITIES, PLENTY OF CANDIES AND SOME EXCLUSIVE PRIZES!'}
				<div />
				{'YOU HAVE '}
				<span className={'text-tag-info dark:text-tag-warning'}>{`${candiesCount} candies`}</span>
				{'.'}
			</>
		);
	};
	return (
		<h1 className={'text-xs md:text-xs leading-normal md:leading-8'}>
			{renderNPCText()}
		</h1>
	);
}

function	CandyIcon() {
	return (
		<svg xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'} width={16} height={16}>
			<g><path d={'M391.22 9.22c-21.755 67.887-29.008 99.75-52.25 146.218 2.776 2.15 5.5 4.42 8.124 6.843 23.768-21.825 42.788-47.49 51.937-85.5l18.158 4.376c-10.093 41.93-31.86 71.302-57.375 94.813 1.442 1.81 2.832 3.657 4.156 5.53 27.306-3.97 52.29-12.325 74.56-32.47l12.533 13.876c-23.42 21.182-49.982 31.05-76.938 35.875.75 1.56 1.477 3.138 2.156 4.72 53.284 5.685 96.878-3.05 122.408-44.094C431.28 144.456 480.78 24.198 391.217 9.22zM247.06 153.937c-9.422-.058-18.308 1.46-25.78 4.625l-.095-.188c-10.542 4.937-20.434 11.78-29.156 20.5-35.073 35.074-39.537 88.93-13.436 128.813-4.858-12.255-7.025-25.792-5.28-39.97 2.61-21.226 13.892-43.415 35.842-64.687l13 13.407c-19.616 19.01-28.3 37.187-30.312 53.563-2.014 16.376 2.574 31.435 11.375 44.53 15.493 23.06 44.764 38.645 69.093 39.595 23.7-1.754 46.925-11.707 65.093-29.875 40.22-40.22 40.22-105.156 0-145.375-2.658-2.66-5.42-5.13-8.28-7.438 9.885 11.527 16.984 25.703 19.28 42.063 2.973 21.18-2.147 45.52-17.844 71.75l-16.062-9.594c14.027-23.44 17.7-43.222 15.406-59.562-2.293-16.34-10.578-29.69-22.47-40.063-16.347-14.26-39.644-21.967-60.373-22.093zM133.47 317.78c-50.013.115-67.71 4.92-116.345 55.283 66.358-2.98 34.08 106.974 107.47 126.156 3.573-48.6 22.248-86.363 58.468-155.626-23.81 15.56-44.668 34.515-60 63.687l-16.563-8.686c14.987-28.514 35.14-48.585 57.125-64.375-25.9 2.17-51.153 8.562-76.688 24.686l-9.968-15.78c22.406-14.15 44.986-21.59 67.28-25.282-3.718-.023-7.382-.07-10.78-.063z'} fill={'#fff'} fillOpacity={'1'}></path></g>
		</svg>
	);
}

function	DialogChoices({router, onWalletConnect, active}) {
	const	{rarities, currentAdventurer, openCurrentAventurerModal} = useRarity();
	const	[selectedOption, set_selectedOption] = useState(0);
	const	[dialogNonce, set_dialogNonce] = useState(0);

	useEffect(() => {
		set_selectedOption(0);
		set_dialogNonce(n => n + 1);
	}, [currentAdventurer?.tokenID, router?.asPath]);

	return (
		<DialogBox
			selectedOption={selectedOption}
			nonce={dialogNonce}
			options={[
				{label: 'What\'s new ?', onClick: () => router.push('/town/tavern')},
				{label: 'Recruit a new adventurer', onClick: () => router.push('/town/tavern?tab=recruit')},
				{label: 'About the rats ...', onClick: () => router.push('/town/tavern?tab=the-cellar')},
				{label: 'Tavern hooligans ...', onClick: () => router.push('/town/tavern?tab=the-stage')}
			]} />
	);
}

function	Index({fetchRarity, rarities, router}) {
	const	{provider, address, active} = useWeb3();
	const	adventurers = Object.values(rarities);

	return (
		<section className={'max-w-full'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
				<div className={'flex flex-col md:flex-row items-center mb-8 md:mb-8'}>
					<div className={'w-auto md:w-64 mr-0 md:mr-8 h-64'} style={{minWidth: 256}}>
						<div className={'bat'} />
					</div>
					<Box className={'p-4'}>
						<NPCHeadline
							adventurersCount={adventurers.length}
							address={address}
							active={active && address}
							router={router} />
					</Box>
				</div>

				<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case text-justify'}>
					{'The Halloween fair is packed with happy people. There is music and laughter and candy corn and cotton candy. The streets are filled with candy, flashy sweets in every color imaginable. There are towering piles of brightly colored boxes, each set for different tricks. There are countless bright orange pumpkins with black eyeshadow. The smell of orange spice is so thick you can taste it.'}
					<div className={'my-4'} />
						
					{'Under a large tree, an old woman is drawing cards. She presents you with 3 cards and suggests a very simple game: choose a card, then a child from the village will do the same.'}
					<div className={'my-4'} />

					{'If you choose the same card '}
					<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
						{'you win twice your stake'}
					</span>
					{'. If not, you have to '}
					<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
						{'give your candies'}
					</span>
					{' to the child.'}
				</h1>

				<h2 className={'text-sm md:text-xl leading-normal md:leading-6 font-story normal-case mt-8'}>
					{'Would you like to draw a card ?'}
				</h2>

				<div className={'grid grid-cols-3 gap-6 gap-x-8 mt-8'}>
					<div className={'p-4 bgpattern3 border-4 border-dark-100 w-full h-96 flex flex-col justify-center items-center'}>
						<Spectre width={100} height={100} />
						<p className={'text-center font-bold pt-12'}>{'The Spectre'}</p>
						<div className={'w-full flex flex-row justify-between space-x-4 mt-12 -mb-12'}>
							<div className={'w-1/3 flex flex-row justify-center items-center border-2 border-dark-100 p-2 cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal'}>
								<CandyIcon />
								<p className={'text-center text-megaxs pl-2'}>{'25'}</p>
							</div>
							<div className={'w-1/3 flex flex-row justify-center items-center border-2 border-dark-100 p-2 cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal'}>
								<CandyIcon />
								<p className={'text-center text-megaxs pl-2'}>{'50'}</p>
							</div>
							<div className={'w-1/3 flex flex-row justify-center items-center border-2 border-dark-100 p-2 cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal'}>
								<CandyIcon />
								<p className={'text-center text-megaxs pl-2'}>{'100'}</p>
							</div>
						</div>
					</div>

					<div className={'p-4 bgpattern3 border-4 border-dark-100 w-full h-96 flex flex-col justify-center items-center'}>
						<Boar width={100} height={100} />
						<p className={'text-center font-bold pt-12'}>{'The Boar'}</p>
						<div className={'w-full flex flex-row justify-between space-x-4 mt-12 -mb-12'}>
							<div className={'w-1/3 flex flex-row justify-center items-center border-2 border-dark-100 p-2 cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal'}>
								<CandyIcon />
								<p className={'text-center text-megaxs pl-2'}>{'25'}</p>
							</div>
							<div className={'w-1/3 flex flex-row justify-center items-center border-2 border-dark-100 p-2 cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal'}>
								<CandyIcon />
								<p className={'text-center text-megaxs pl-2'}>{'50'}</p>
							</div>
							<div className={'w-1/3 flex flex-row justify-center items-center border-2 border-dark-100 p-2 cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal'}>
								<CandyIcon />
								<p className={'text-center text-megaxs pl-2'}>{'100'}</p>
							</div>
						</div>
					</div>

					<div className={'p-4 bgpattern3 border-4 border-dark-100 w-full h-96 flex flex-col justify-center items-center'}>
						<Egg width={100} height={100} />
						<p className={'text-center font-bold pt-12'}>{'The Egg'}</p>
						<div className={'w-full flex flex-row justify-between space-x-4 mt-12 -mb-12'}>
							<div className={'w-1/3 flex flex-row justify-center items-center border-2 border-dark-100 p-2 cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal'}>
								<CandyIcon />
								<p className={'text-center text-megaxs pl-2'}>{'25'}</p>
							</div>
							<div className={'w-1/3 flex flex-row justify-center items-center border-2 border-dark-100 p-2 cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal'}>
								<CandyIcon />
								<p className={'text-center text-megaxs pl-2'}>{'50'}</p>
							</div>
							<div className={'w-1/3 flex flex-row justify-center items-center border-2 border-dark-100 p-2 cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal'}>
								<CandyIcon />
								<p className={'text-center text-megaxs pl-2'}>{'100'}</p>
							</div>
						</div>
					</div>
				</div>


				<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case text-justify mt-32'}>
					{'The rest of the festival is filled with crazy fun. In front of the village hall, a gigantic bonfire is burning. The flames are small at first but keep growing, until they are enormous. Young people leap through the flames.  There are games, food stands, and contests.'}
					<div className={'my-4'} />
						
					{'You can do '}
					<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
						{'2 more activities'}
					</span>
					{' today, and get some candies. What would you like to do ?'}
				</h1>

				<div className={'grid grid-cols-3 gap-6 gap-x-8 mt-8'}>
					<Box className={'p-4 bgpattern3 w-full h-full flex flex-col justify-center items-center cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal'}>
						<p className={'text-center font-bold pb-12'}>{'Rock Throwing'}</p>
						<Rock width={100} height={100} />
						<div className={'text-center text-regular pt-12 inline'}>
							<p className={'inline'}>{'The '}</p>
							<p className={'inline text-tag-info dark:text-tag-warning'}>{'Stronger'}</p>
							<p className={'inline'}>{' you are, the more candy you get!'}</p>
						</div>
					</Box>
					<Box className={'p-4 bgpattern3 w-full h-full flex flex-col justify-center items-center cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal'}>
						<p className={'text-center font-bold pb-12'}>{'Cake Eating'}</p>
						<Eat width={100} height={100} />
						<div className={'text-center text-regular pt-12'}>
							<p className={'inline'}>{'With a great '}</p>
							<p className={'inline text-tag-info dark:text-tag-warning'}>{'constitution'}</p>
							<p className={'inline'}>{' comes a resilient stomach!'}</p>
						</div>
					</Box>
					<Box className={'p-4 bgpattern3 w-full h-full flex flex-col justify-center items-center cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal'}>
						<p className={'text-center font-bold pb-12'}>{'Pumpkin Stealer'}</p>
						<Rob width={100} height={100} />
						<div className={'text-center text-regular pt-12'}>
							<p className={'inline'}>{'Do you have enough '}</p>
							<p className={'inline text-tag-info dark:text-tag-warning'}>{'Dexterity'}</p>
							<p className={'inline'}>{' for this?'}</p>
						</div>
					</Box>
					<Box className={'p-4 bgpattern3 w-full h-full flex flex-col justify-center items-center cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal'}>
						<p className={'text-center font-bold pb-12'}>{'Spooky Story'}</p>
						<Story width={100} height={100} />
						<div className={'text-center text-regular pt-12'}>
							<p className={'inline'}>{'Are you a '}</p>
							<p className={'inline text-tag-info dark:text-tag-warning'}>{'Charismatic'}</p>
							<p className={'inline'}>{' adventurer?'}</p>
						</div>
					</Box>
					<Box className={'p-4 bgpattern3 w-full h-full flex flex-col justify-center items-center cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal'}>
						<p className={'text-center font-bold pb-12'}>{'Magic Trick'}</p>
						<Sparkle width={100} height={100} />
						<div className={'text-center text-regular pt-12'}>
							<p className={'inline'}>{'The '}</p>
							<p className={'inline text-tag-info dark:text-tag-warning'}>{'Intelligence'}</p>
							<p className={'inline'}>{' is the magic here!'}</p>
						</div>
					</Box>
					<Box className={'p-4 bgpattern3 w-full h-full flex flex-col justify-center items-center cursor-pointer dark:bg-dark-600 dark:hover:bg-dark-400 bg-white hover:bg-gray-principal'}>
						<p className={'text-center font-bold pb-12'}>{'Wise babysitter'}</p>
						<Balloon width={100} height={100} />
						<div className={'text-center text-regular pt-12'}>
							<p className={'inline'}>{'Will you stay '}</p>
							<p className={'inline text-tag-info dark:text-tag-warning'}>{'wise'}</p>
							<p className={'inline'}>{' and keep the children safe?'}</p>
						</div>
					</Box>
				</div>
			</div>
		</section>
	);
}

export default Index;
