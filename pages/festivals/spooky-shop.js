/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday September 7th 2021
**	@Filename:				tavern.js
******************************************************************************/

import	React, {useState, useEffect}	from	'react';
import	Image							from	'next/image';
import	useRarity						from	'contexts/useRarity';
import	Box								from	'components/Box';


function	CandyIcon() {
	return (
		<svg xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'} width={16} height={16}>
			<g><path d={'M391.22 9.22c-21.755 67.887-29.008 99.75-52.25 146.218 2.776 2.15 5.5 4.42 8.124 6.843 23.768-21.825 42.788-47.49 51.937-85.5l18.158 4.376c-10.093 41.93-31.86 71.302-57.375 94.813 1.442 1.81 2.832 3.657 4.156 5.53 27.306-3.97 52.29-12.325 74.56-32.47l12.533 13.876c-23.42 21.182-49.982 31.05-76.938 35.875.75 1.56 1.477 3.138 2.156 4.72 53.284 5.685 96.878-3.05 122.408-44.094C431.28 144.456 480.78 24.198 391.217 9.22zM247.06 153.937c-9.422-.058-18.308 1.46-25.78 4.625l-.095-.188c-10.542 4.937-20.434 11.78-29.156 20.5-35.073 35.074-39.537 88.93-13.436 128.813-4.858-12.255-7.025-25.792-5.28-39.97 2.61-21.226 13.892-43.415 35.842-64.687l13 13.407c-19.616 19.01-28.3 37.187-30.312 53.563-2.014 16.376 2.574 31.435 11.375 44.53 15.493 23.06 44.764 38.645 69.093 39.595 23.7-1.754 46.925-11.707 65.093-29.875 40.22-40.22 40.22-105.156 0-145.375-2.658-2.66-5.42-5.13-8.28-7.438 9.885 11.527 16.984 25.703 19.28 42.063 2.973 21.18-2.147 45.52-17.844 71.75l-16.062-9.594c14.027-23.44 17.7-43.222 15.406-59.562-2.293-16.34-10.578-29.69-22.47-40.063-16.347-14.26-39.644-21.967-60.373-22.093zM133.47 317.78c-50.013.115-67.71 4.92-116.345 55.283 66.358-2.98 34.08 106.974 107.47 126.156 3.573-48.6 22.248-86.363 58.468-155.626-23.81 15.56-44.668 34.515-60 63.687l-16.563-8.686c14.987-28.514 35.14-48.585 57.125-64.375-25.9 2.17-51.153 8.562-76.688 24.686l-9.968-15.78c22.406-14.15 44.986-21.59 67.28-25.282-3.718-.023-7.382-.07-10.78-.063z'} fill={'currentcolor'} fillOpacity={'1'}></path></g>
		</svg>
	);
}

function	PetShop() {
	const	pets = [
		{img: '/pets/shadow2.gif', name: '??????', price: '-', supply: 100, story: '????? ??????? ???????? ????? ???? ????? ??? ????????? ??????? ???? ??????? ??????????? ?????? ??? ??????? ?????????? ???? ???? ?????? ??? ????????? ?????????? ????????? ??? ?????? ????? ?? ???? ??? ??? ??? ?????'},
		{img: '/pets/shadow4.gif', name: '??????', price: '-', supply: 200, story: '????? ??????? ???????? ????? ???? ????? ??? ????????? ??????? ???? ??????? ??????????? ?????? ??? ??????? ?????????? ???? ???? ?????? ??? ????????? ?????????? ????????? ??? ?????? ????? ?? ???? ??? ??? ??? ?????'},
		{img: '/pets/shadow0.gif', name: '??????', price: '-', supply: 400, story: '????? ??????? ???????? ????? ???? ????? ??? ????????? ??????? ???? ??????? ??????????? ?????? ??? ??????? ?????????? ???? ???? ?????? ??? ????????? ?????????? ????????? ??? ?????? ????? ?? ???? ??? ??? ??? ?????'},
		{img: '/pets/shadow1.gif', name: '??????', price: '-', supply: 600, story: '????? ??????? ???????? ????? ???? ????? ??? ????????? ??????? ???? ??????? ??????????? ?????? ??? ??????? ?????????? ???? ???? ?????? ??? ????????? ?????????? ????????? ??? ?????? ????? ?? ???? ??? ??? ??? ?????'},
		{img: '/pets/shadow3.gif', name: '??????', price: '-', supply: 800, story: '????? ??????? ???????? ????? ???? ????? ??? ????????? ??????? ???? ??????? ??????????? ?????? ??? ??????? ?????????? ???? ???? ?????? ??? ????????? ?????????? ????????? ??? ?????? ????? ?? ???? ??? ??? ??? ?????'},
		{img: '/pets/shadow5.gif', name: '??????', price: '-', supply: 1000, story: '????? ??????? ???????? ????? ???? ????? ??? ????????? ??????? ???? ??????? ??????????? ?????? ??? ??????? ?????????? ???? ???? ?????? ??? ????????? ?????????? ????????? ??? ?????? ????? ?? ???? ??? ??? ??? ?????'},
		// {img: '/pets/ghost.gif', name: 'Casper', price: '-', supply: 100, story: 'The Ghost is white. It has big eyes and a big mouth. It has a glowing heart on its chest. It flies high above the crowd. It looks like it has a lot of fun. It is extremely cute.'},
		// {img: '/pets/fox.gif', name: 'Little Fox', price: '-', supply: 200, story: 'The Fox is orange with white spots. It has green eyes. It has big brown ears. It wags its tail happily. It barks at you and reaches out its paw.'},
		// {img: '/pets/cat.gif', name: 'White Cat', price: '-', supply: 400, story: 'The Cat is small and tabby. It has a fluffy tail and green eyes. It meows at you. It is very impatient and wants to be petted.'},
		// {img: '/pets/raven.gif', name: 'Raven', price: '-', supply: 600, story: 'This Raven is dark black. It has black wings and a light face with dark beady eyes. The wings are huge and the beak is thick.'},
		// {img: '/pets/frog.gif', name: 'Froggy', price: '-', supply: 800, story: 'The Frog is green with black spots. It has big eyes. It bleeps happily. It looks friendly, but you think it is just trying to trick you.'},
		// {img: '/pets/spider.gif', name: 'Tiny Spider', price: '-', supply: 1_000, story: 'The Spider is small and black. It looks harmless. You can tell that it loves to dance, because it moves with the beat of the music.'},
	];

	return (
		<>
			<div className={'space-y-0 w-full'}>
				{pets.map((item, i) => {
					return (
						<div key={i} className={'w-full flex flex-row dark:bg-dark-600 dark:hover:bg-dark-400 cursor-pointer transition-colors p-4 group'} onClick={() => alert('Coming soon!')}>
							<div className={'p-8 mr-16'}>
								<div style={{height: 100, width: 100}}>
									<Image
										src={item.img}
										width={100}
										height={100} />
								</div>
							</div>
							<div className={'py-4 flex flex-row w-full justify-between pr-8'}>
								<div className={'w-full'}>
									<p className={'text-base text-black dark:text-white group-hover:underline'}>
										{item.name}
									</p>
									<p className={'text-base text-black dark:text-white mt-1 font-story normal-case break-words'}>
										{item.story}
									</p>
									<div className={'text-base text-black dark:text-white font-story normal-case mt-4 flex flex-row justify-between items-center'}>
										<p>
											{`Supply: ${item.supply} - Price: ${item.price} candies`}
										</p>
										<div className={'font-bold text-base flex flex-row items-center dark:group-hover:text-tag-warning group-hover:text-tag-info'}>
											<p className={'mr-2'}>{`Buy for ${item.price}`}</p>
											<CandyIcon />
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

function	GoodsShop() {
	const	items = [
		// {img: '/items/festivalSpooky/cake.png', name: 'Yummy Cake', price: '-', supply: 2_000, story: 'A cake with a random taste, from chocolate, lemon, orange, and banana cream, to blueberry and raspberry swirls.'},
		// {img: '/items/festivalSpooky/muffin.png', name: 'Chocolate Muffin', price: '-', supply: 2_000, story: 'The muffin feels light, fluffy and soft. It doesn\'t feel the same as a normal muffin. It feels more like a pat of butter, but it is soft and warm.'},
		// {img: '/items/festivalSpooky/potion.png', name: 'Eye Potion', price: '-', supply: 2_000, story: 'The potion is thick and sticky and feels like it has been lying around for a while. There are some ... eyes in it'},
		// {img: '/items/festivalSpooky/pumpkin.png', name: 'Pumpkin', price: '-', supply: 2_000, story: 'It\'s a regular pumpkin. Maybe it is hollow ? The pumpkin’s surface is smooth , and smells like an orange spice cake.'},
		// {img: '/items/festivalSpooky/bubble.png', name: 'Golden Bubble', price: '-', supply: 2_000, story: 'This is a pearl the size of a large kiwi, solid and gleaming like gold. The surface of the pearl is marred by a skull the size of a little egg. It\'s very shiny.'},

		{img: '/items/festivalSpooky/cake.png', name: '??????', price: '-', supply: 2_000, story: '????? ??????? ???????? ????? ???? ????? ??? ????????? ??????? ???? ??????? ??????????? ?????? ??? ??????? ?????????? ???? ???? ?????? ??? ????????? ?????????? ????????? ??? ?????? ????? ?? ???? ??? ??? ??? ?????'},
		{img: '/items/festivalSpooky/muffin.png', name: '??????', price: '-', supply: 2_000, story: '????? ??????? ???????? ????? ???? ????? ??? ????????? ??????? ???? ??????? ??????????? ?????? ??? ??????? ?????????? ???? ???? ?????? ??? ????????? ?????????? ????????? ??? ?????? ????? ?? ???? ??? ??? ??? ?????'},
		{img: '/items/festivalSpooky/potion.png', name: '??????', price: '-', supply: 2_000, story: '????? ??????? ???????? ????? ???? ????? ??? ????????? ??????? ???? ??????? ??????????? ?????? ??? ??????? ?????????? ???? ???? ?????? ??? ????????? ?????????? ????????? ??? ?????? ????? ?? ???? ??? ??? ??? ?????'},
		{img: '/items/festivalSpooky/pumpkin.png', name: '??????', price: '-', supply: 2_000, story: '????? ??????? ???????? ????? ???? ????? ??? ????????? ??????? ???? ??????? ??????????? ?????? ??? ??????? ?????????? ???? ???? ?????? ??? ????????? ?????????? ????????? ??? ?????? ????? ?? ???? ??? ??? ??? ?????'},
		{img: '/items/festivalSpooky/bubble.png', name: '??????', price: '-', supply: 2_000, story: '????? ??????? ???????? ????? ???? ????? ??? ????????? ??????? ???? ??????? ??????????? ?????? ??? ??????? ?????????? ???? ???? ?????? ??? ????????? ?????????? ????????? ??? ?????? ????? ?? ???? ??? ??? ??? ?????'},


	];

	return (
		<>
			<div className={'space-y-0 w-full'}>
				{items.map((item, i) => {
					return (
						<div key={i} className={'w-full flex flex-row dark:bg-dark-600 dark:hover:bg-dark-400 cursor-pointer transition-colors p-4 group'} onClick={() => alert('Coming soon!')}>
							<div className={'p-8 mr-16'}>
								<div style={{height: 100, width: 100, filter: 'brightness(0)'}}>
									<Image
										src={item.img}
										width={100}
										height={100} />
								</div>
							</div>
							<div className={'py-4 flex flex-row w-full justify-between pr-8'}>
								<div className={'w-full'}>
									<p className={'text-base text-black dark:text-white group-hover:underline'}>
										{item.name}
									</p>
									<p className={'text-base text-black dark:text-white mt-1 font-story normal-case'}>
										{item.story}
									</p>
									<div className={'text-base text-black dark:text-white font-story normal-case mt-4 flex flex-row justify-between items-center'}>
										<p>
											{`Supply: ${item.supply} - Price: ${item.price} candies`}
										</p>
										<div className={'font-bold text-base flex flex-row items-center dark:group-hover:text-tag-warning group-hover:text-tag-info'}>
											<p className={'mr-2'}>{`Buy for ${item.price}`}</p>
											<CandyIcon />
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

function	EggShop() {
	const	items = [
		// {img: '/eggs/regular.png', name: 'Mysterious Egg', price: '-', supply: 2_000, story: 'A simple mysterious egg. You will probably have to wait before finding what\'s in it.'},
		// {img: '/eggs/hairy.png', name: 'Mysterious Hairy Egg', price: '-', supply: 2_000, story: 'A very hairy mysterious egg. You will probably have to wait before finding what\'s in it.'},
		// {img: '/eggs/scales.png', name: 'Mysterious Scales Egg', price: '-', supply: 2_000, story: 'A mysterious egg with scales Strange. You will probably have to wait before finding what\'s in it.'},
		// {img: '/eggs/swirls.png', name: 'Mysterious Swirls Egg', price: '-', supply: 2_000, story: 'A mysterious egg that looks like the deep water and the tempest. You will probably have to wait before finding what\'s in it.'},
		// {img: '/eggs/fossil.png', name: 'Mysterious Fossil Egg', price: '-', supply: 2_000, story: 'A very ancien mysterious egg. You will probably have to wait before finding what\'s in it.'},

		{img: '/eggs/regular.png', name: '??????', price: '-', supply: 2_000, story: '????? ??????? ???????? ????? ???? ????? ??? ????????? ??????? ???? ??????? ??????????? ?????? ??? ??????? ?????????? ???? ???? ?????? ??? ????????? ?????????? ????????? ??? ?????? ????? ?? ???? ??? ??? ??? ?????'},
		{img: '/eggs/hairy.png', name: '??????', price: '-', supply: 2_000, story: '????? ??????? ???????? ????? ???? ????? ??? ????????? ??????? ???? ??????? ??????????? ?????? ??? ??????? ?????????? ???? ???? ?????? ??? ????????? ?????????? ????????? ??? ?????? ????? ?? ???? ??? ??? ??? ?????'},
		{img: '/eggs/scales.png', name: '??????', price: '-', supply: 2_000, story: '????? ??????? ???????? ????? ???? ????? ??? ????????? ??????? ???? ??????? ??????????? ?????? ??? ??????? ?????????? ???? ???? ?????? ??? ????????? ?????????? ????????? ??? ?????? ????? ?? ???? ??? ??? ??? ?????'},
		{img: '/eggs/swirls.png', name: '??????', price: '-', supply: 2_000, story: '????? ??????? ???????? ????? ???? ????? ??? ????????? ??????? ???? ??????? ??????????? ?????? ??? ??????? ?????????? ???? ???? ?????? ??? ????????? ?????????? ????????? ??? ?????? ????? ?? ???? ??? ??? ??? ?????'},
		{img: '/eggs/fossil.png', name: '??????', price: '-', supply: 2_000, story: '????? ??????? ???????? ????? ???? ????? ??? ????????? ??????? ???? ??????? ??????????? ?????? ??? ??????? ?????????? ???? ???? ?????? ??? ????????? ?????????? ????????? ??? ?????? ????? ?? ???? ??? ??? ??? ?????'},
	];

	return (
		<>
			<div className={'space-y-0 w-full'}>
				{items.map((item, i) => {
					return (
						<div key={i} className={'w-full flex flex-row dark:bg-dark-600 dark:hover:bg-dark-400 cursor-pointer transition-colors p-4 group'} onClick={() => alert('Coming soon!')}>
							<div className={'p-8 mr-16'}>
								<div style={{height: 100, width: 100, filter: 'brightness(0)'}}>
									<Image
										src={item.img}
										width={100}
										height={100} />
								</div>
							</div>
							<div className={'py-4 flex flex-row w-full justify-between pr-8'}>
								<div className={'w-full'}>
									<p className={'text-base text-black dark:text-white group-hover:underline'}>
										{item.name}
									</p>
									<p className={'text-base text-black dark:text-white mt-1 font-story normal-case'}>
										{item.story}
									</p>
									<div className={'text-base text-black dark:text-white font-story normal-case mt-4 flex flex-row justify-between items-center'}>
										<p>
											{`Supply: ${item.supply} - Price: ${item.price} candies`}
										</p>
										<div className={'font-bold text-base flex flex-row items-center dark:group-hover:text-tag-warning group-hover:text-tag-info'}>
											<p className={'mr-2'}>{`Buy for ${item.price}`}</p>
											<CandyIcon />
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}


function	Index({router}) {
	const	{currentAdventurer, rNonce} = useRarity();
	const	[numberOfCandies, set_numberOfCandies] = useState(Number(currentAdventurer?.inventory[9]) || 0);
	const	[tab, set_tab] = useState(0);

	useEffect(() => {
		set_numberOfCandies(Number(currentAdventurer?.inventory[9]) || 0);
	}, [rNonce, currentAdventurer]);

	return (
		<section className={'max-w-full'}>
			<div className={'mt-8 max-w-prose w-full flex-col flex justify-center items-center mx-auto px-3 relative'}>
				<div>
					<p
						onClick={() => router.push('/')}
						className={'text-black dark:text-white text-megaxs absolute left-4 top-2 hover:underline cursor-pointer'}>
						{'< Back'}
					</p>
					<h1 className={'text-black dark:text-white text-base'}>
						{'THE SPOOKY SHOP'}
					</h1>
					<div
						className={'text-black dark:text-white text-xxs absolute right-4 top-2 flex flex-row items-center'}>
						<p className={'mr-2'}>{`BALANCE: ${numberOfCandies}`}</p>
						<CandyIcon />
					</div>
				</div>

				<div>
					<h1 className={'text-black dark:text-white text-base text-center py-16 animate-pulse'}>
						{'SOME DELAY TO PROVIDE YOU THE BEST EXPERIENCE IN YOUR ALL ADVENTURE!'}
					</h1>
				</div>
				<div className={'w-full h-0 mt-4 '}/>

				<div className={'w-full col-span-4 md:col-span-3 mt-4 md:mt-0 hidden md:block'}>
					<Box className={'w-full flex flex-col relative'}>

						<div className={'flex flex-row w-full relative'}>
							<div
								onClick={() => set_tab(0)}
								className={`flex flex-row items-center text-regular p-4 px-6 border-r-2 border-black dark:border-dark-100 text-black dark:text-white ${tab !== 0 ? 'border-b-4 dark:text-dark-200 dark:hover:text-dark-100 cursor-pointer' : ''}`}>
								<svg width={16} height={16} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M13 2h-2v2H9v4H7v4H5v6h2v2h2v2h6v-2h2v-2h2v-6h-2V8h-2V4h-2V2zm0 2v4h2v4h2v6h-2v2H9v-2H7v-6h2V8h2V4h2z'} fill={'currentColor'}/> </svg>
								<p className={'mt-1 ml-2'}>{'EGGS'}</p>
								
							</div>
							<div
								onClick={() => set_tab(1)}
								className={`flex flex-row items-center text-regular p-4 px-6 border-l-2 border-r-2 border-black dark:border-dark-100 text-black dark:text-white ${tab !== 1 ? 'border-b-4 dark:text-dark-200 dark:hover:text-dark-100 cursor-pointer' : ''}`}>
								<svg width={16} height={16} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M6 4h14v2h2v6h-8v2h6v2h-4v2h-2v2H2V8h2V6h2V4zm2 6h2V8H8v2z'} fill={'currentColor'} /> </svg>
								<p className={'mt-1 ml-2'}>{'PETS'}</p>
							</div>
							<div
								onClick={() => set_tab(2)}
								className={`flex flex-row items-center text-regular p-4 px-6 w-full border-l-2 border-black dark:border-dark-100 text-black dark:text-white ${tab !== 2 ? 'border-b-4 dark:text-dark-200 dark:hover:text-dark-100 cursor-pointer' : ''}`}>
								<svg width={16} height={16} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M19 12v8h-7m7-8h2V8h-3m1 4H5m13-4V4h-6m6 4H6m0 0V4h6M6 8H3v4h2m0 0v8h7m0 0V4'} stroke={'currentcolor'} strokeWidth={'2'}/> </svg>
								<p className={'mt-1 ml-2'}>{'Goods'}</p>
							</div>

							<div
								onClick={() => alert('Coming soon!')}
								className={'absolute right-0 top-1 flex flex-row items-center text-regular p-4 px-6 text-black cursor-pointer dark:text-dark-200 dark:hover:text-tag-warning'}>
								<svg width={16} height={16} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M6 2h12v2H6V2zM4 6V4h2v2H4zm0 12V6H2v12h2zm2 2v-2H4v2h2zm12 0v2H6v-2h12zm2-2v2h-2v-2h2zm0-12h2v12h-2V6zm0 0V4h-2v2h2zm-9-1h2v2h3v2h-6v2h6v6h-3v2h-2v-2H8v-2h6v-2H8V7h3V5z'} fill={'currentColor'}/> </svg>
								
							</div>
						</div>

						{tab === 0 ? <EggShop /> : null}
						{tab === 1 ? <PetShop /> : null}
						{tab === 2 ? <GoodsShop /> : null}
					</Box>
				</div>
			</div>
		</section>
	);
}

export default Index;
