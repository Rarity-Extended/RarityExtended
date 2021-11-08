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
import	MANIFEST_GOODS					from	'utils/codex/items_manifest_goods.json';
import	MANIFEST_ARMORS					from	'utils/codex/items_manifest_armors.json';
import	MANIFEST_WEAPONS				from	'utils/codex/items_manifest_weapons.json';

function	MealsShop() {
// meal_gourmetfruitandmushroom.png
// meal_mushroomandmeatskewer.png
	const	items = [
		{img: '/shop/meal_mushroomsoup.png', name: 'Mushroom soup', price: '4 gold, 2 mushrooms', supply: '∞', description: 'This is a basic soup. Water and mushrooms. Maybe not the best, but will give you a little boost!'},

		{img: '/shop/meal_extramushroom.png', name: 'Mushroom with mushrooms', price: '4 gold, 2 mushrooms, 1 wood', supply: '∞', description: 'Not a soup, but a meal of mushrooms with more mushroom.'},

		{img: '/shop/meal_fruitandmushroommix.png', name: 'Mushroom and fruid mix', price: '4 gold, 2 mushrooms, 2 berries', supply: '∞', description: 'Some mushrooms with berries from the forest. It\'s surprisingly good!'},

		{img: '/shop/meal_mushroomandmeatskewer.png', name: 'Mushroom meat skewer', price: '4 gold, 2 mushrooms, 1 meat', supply: '∞', description: 'You take a few mushrooms and a few piece of meat.'},

		{img: '/shop/meal_gourmetfruitandmushroom.png', name: 'Gourmet meal with Mushroom', price: '4 gold, 2 mushrooms, 2 berries, 1 meat', supply: '∞', description: 'The perfect meal for another adventure ! Some mushroom, some berries and a piece of meat.'},
	];

	return (
		<>
			<div className={'space-y-0 w-full'}>
				{items.map((item, i) => {
					return (
						<div key={i} className={'w-full flex flex-row dark:bg-dark-600 dark:hover:bg-dark-400 cursor-pointer transition-colors p-4 group'} onClick={() => alert('Coming soon!')}>
							<div className={'p-2 mr-16'}>
								<div style={{height: 100, width: 100}}>
									<Image
										src={item.img}
										width={100}
										height={100} />
								</div>
							</div>
							<div className={'py-2 flex flex-row w-full justify-between pr-8'}>
								<div className={'w-full'}>
									<p className={'text-xs text-black dark:text-white group-hover:underline'}>
										{item.name}
									</p>
									<p className={'text-sm text-black dark:text-white mt-1 font-story normal-case'}>
										{item.description}
									</p>
									<div className={'text-xs text-black dark:text-white font-story normal-case mt-8 flex flex-row justify-between items-center'}>
										<div className={'flex flex-row w-8/12 space-x-6'}>
											<p>{`Cost: ${item.price}`}</p>
										</div>
										<div className={'flex flex-row w-4/12 justify-end'}>
											<div className={'font-bold text-base flex flex-row items-center dark:group-hover:text-tag-warning group-hover:text-tag-info'}>
												<p className={'mr-2'}>{'Buy'}</p>
											</div>
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

function	ArmorsShop() {
	return (
		<>
			<div className={'space-y-0 w-full'}>
				{Object.values(MANIFEST_ARMORS).filter(e => e.proficiency !== 'Shields').map((item, i) => {
					return (
						<div key={i} className={'w-full flex flex-row dark:bg-dark-600 dark:hover:bg-dark-400 cursor-pointer transition-colors p-4 group'} onClick={() => alert('Coming soon!')}>
							<div className={'p-2 mr-16'}>
								<div style={{height: 100, width: 100}}>
									<Image
										src={item.img}
										width={100}
										height={100} />
								</div>
							</div>
							<div className={'py-2 flex flex-row w-full justify-between pr-8'}>
								<div className={'w-full'}>
									<p className={'text-xs text-black dark:text-white group-hover:underline'}>
										{item.name}
									</p>
									<p className={'text-sm text-black dark:text-white mt-1 font-story normal-case'}>
										{item.description}
									</p>
									<div className={'text-xs text-black dark:text-white font-story normal-case mt-8 flex flex-row justify-between items-center'}>
										<div className={'flex flex-row w-8/12 space-x-6'}>
											<p>{`Cost: ${item.price}`}</p>
										</div>
										<div className={'flex flex-row w-4/12 justify-end'}>
											<div className={'font-bold text-base flex flex-row items-center dark:group-hover:text-tag-warning group-hover:text-tag-info'}>
												<p className={'mr-2'}>{'Buy'}</p>
											</div>
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
function	ShieldShop() {
	return (
		<>
			<div className={'space-y-0 w-full'}>
				{Object.values(MANIFEST_ARMORS).filter(e => e.proficiency === 'Shields').map((item, i) => {
					return (
						<div key={i} className={'w-full flex flex-row dark:bg-dark-600 dark:hover:bg-dark-400 cursor-pointer transition-colors p-4 group'} onClick={() => alert('Coming soon!')}>
							<div className={'p-2 mr-16'}>
								<div style={{height: 100, width: 100}}>
									<Image
										src={item.img}
										width={100}
										height={100} />
								</div>
							</div>
							<div className={'py-2 flex flex-row w-full justify-between pr-8'}>
								<div className={'w-full'}>
									<p className={'text-xs text-black dark:text-white group-hover:underline'}>
										{item.name}
									</p>
									<p className={'text-sm text-black dark:text-white mt-1 font-story normal-case'}>
										{item.description}
									</p>
									<div className={'text-xs text-black dark:text-white font-story normal-case mt-8 flex flex-row justify-between items-center'}>
										<div className={'flex flex-row w-8/12 space-x-6'}>
											<p>{`Cost: ${item.price}`}</p>
										</div>
										<div className={'flex flex-row w-4/12 justify-end'}>
											<div className={'font-bold text-base flex flex-row items-center dark:group-hover:text-tag-warning group-hover:text-tag-info'}>
												<p className={'mr-2'}>{'Buy'}</p>
											</div>
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
function	WeaponsShop() {
	return (
		<>
			<div className={'space-y-0 w-full'}>
				{Object.values(MANIFEST_WEAPONS).map((item, i) => {
					return (
						<div key={i} className={'w-full flex flex-row dark:bg-dark-600 dark:hover:bg-dark-400 cursor-pointer transition-colors p-4 group'} onClick={() => alert('Coming soon!')}>
							<div className={'p-2 mr-16'}>
								<div style={{height: 100, width: 100}}>
									<Image
										src={item.img}
										width={100}
										height={100} />
								</div>
							</div>
							<div className={'py-2 flex flex-row w-full justify-between pr-8'}>
								<div className={'w-full'}>
									<p className={'text-xs text-black dark:text-white group-hover:underline'}>
										{item.name}
									</p>
									<p className={'text-sm text-black dark:text-white mt-1 font-story normal-case'}>
										{item.description}
									</p>
									<div className={'text-xs text-black dark:text-white font-story normal-case mt-8 flex flex-row justify-between items-center'}>
										<div className={'flex flex-row w-8/12 space-x-6'}>
											<p>{`Cost: ${item.price}`}</p>
										</div>
										<div className={'flex flex-row w-4/12 justify-end'}>
											<div className={'font-bold text-base flex flex-row items-center dark:group-hover:text-tag-warning group-hover:text-tag-info'}>
												<p className={'mr-2'}>{'Buy'}</p>
											</div>
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
	// meal_gourmetfruitandmushroom.png
	// meal_mushroomandmeatskewer.png
	const	items = [
		{img: '/shop/meal_mushroomsoup.png', name: 'Mushroom soup', price: '4 gold, 2 mushrooms', supply: '∞', description: 'This is a basic soup. Water and mushrooms. Maybe not the best, but will give you a little boost!'},
	
		{img: '/shop/meal_extramushroom.png', name: 'Mushroom with mushrooms', price: '4 gold, 2 mushrooms, 1 wood', supply: '∞', description: 'Not a soup, but a meal of mushrooms with more mushroom.'},
	
		{img: '/shop/meal_fruitandmushroommix.png', name: 'Mushroom and fruid mix', price: '4 gold, 2 mushrooms, 2 berries', supply: '∞', description: 'Some mushrooms with berries from the forest. It\'s surprisingly good!'},
	
		{img: '/shop/meal_mushroomandmeatskewer.png', name: 'Mushroom meat skewer', price: '4 gold, 2 mushrooms, 1 meat', supply: '∞', description: 'You take a few mushrooms and a few piece of meat.'},
	
		{img: '/shop/meal_gourmetfruitandmushroom.png', name: 'Gourmet meal with Mushroom', price: '4 gold, 2 mushrooms, 2 berries, 1 meat', supply: '∞', description: 'The perfect meal for another adventure ! Some mushroom, some berries and a piece of meat.'},
	];
	
	return (
		<>
			<div className={'space-y-0 w-full'}>
				{Object.values(MANIFEST_GOODS).map((item, i) => {
					return (
						<div key={i} className={'w-full flex flex-row dark:bg-dark-600 dark:hover:bg-dark-400 cursor-pointer transition-colors p-4 group'} onClick={() => alert('Coming soon!')}>
							<div className={'p-2 mr-16'}>
								<div style={{height: 100, width: 100}}>
									<Image
										src={item.img}
										width={100}
										height={100} />
								</div>
							</div>
							<div className={'py-2 flex flex-row w-full justify-between pr-8'}>
								<div className={'w-full'}>
									<p className={'text-xs text-black dark:text-white group-hover:underline'}>
										{item.name}
									</p>
									<p className={'text-sm text-black dark:text-white mt-1 font-story normal-case'}>
										{item.description}
									</p>
									<div className={'text-xs text-black dark:text-white font-story normal-case mt-8 flex flex-row justify-between items-center'}>
										<div className={'flex flex-row w-8/12 space-x-6'}>
											<p>{`Cost: ${item.price}`}</p>
										</div>
										<div className={'flex flex-row w-4/12 justify-end'}>
											<div className={'font-bold text-base flex flex-row items-center dark:group-hover:text-tag-warning group-hover:text-tag-info'}>
												<p className={'mr-2'}>{'Buy'}</p>
											</div>
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
	
function	IconArmor() {
	return (
		<svg width={16} height={16} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}>
			<path d={'M156.7 25.83L89 39.38c-.1 58.57-1.74 119.32-43.49 167.22C104.4 246.5 189 260.7 247 248.8v-99L108.3 88.22l7.4-16.44L256 134.2l140.3-62.42 7.4 16.44L265 149.8v99c58 11.9 142.6-2.3 201.5-42.2-41.8-47.9-43.4-108.65-43.5-167.22l-67.7-13.55c-12.9 13.88-20.6 28.15-32.9 40.53C308.9 79.78 289.5 89 256 89c-33.5 0-52.9-9.22-66.4-22.64-12.3-12.38-20-26.65-32.9-40.53zM53.88 232.9C75.96 281 96.07 336.6 102.7 392.8l65 22.8c4.2-52.7 28.2-104 63.7-146.1-55.1 6.3-122.7-5.8-177.52-36.6zm404.22 0c-54.8 30.8-122.4 42.9-177.5 36.6 35.5 42.1 59.5 93.4 63.7 146.1l65.2-22.9c6.6-56.8 26.6-111.8 48.6-159.8zM256 269c-40.5 43.1-67.7 97.9-70.7 152.7l61.7 21.6V336h18v107.3l61.7-21.6c-3.1-54.8-30.2-109.6-70.7-152.7zm151.7 143.4L297 451.1v18.8l110.2-44.1c.1-4.5.3-8.9.5-13.4zm-303.3.1c.3 4.5.4 8.9.5 13.4l110.1 44v-18.7l-110.6-38.7zM279 457.4l-23 8.1-23-8v19.6l23 9.2 23-9.2v-19.7z'} fill={'currentColor'} />
		</svg>
	);
}
function	IconWeapon() {
	return (
		<svg width={16} height={16} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}>
			<path d={'M284.736 29.215c-2.334-.015-4.68.001-7.035.049-32.975.664-67.786 7.496-98.318 21.232-34.895 15.698-64.057 40.163-79.979 74.672-15 32.512-18.36 74.591-2.508 128.285a201.433 201.433 0 0 1 13.502-5.59c-9.866-43.961-5.617-80.245 8.301-109.01 15.464-31.958 42.464-54.15 72.95-68.302 30.484-14.153 64.583-20.494 95.738-20.95 1.947-.028 3.882-.035 5.804-.019 22.847.186 43.814 3.494 60.614 9.836 7.12-3.36 13.61-6.894 18.914-10.852-20.447-11.111-49.38-18.154-81.016-19.212a257.951 257.951 0 0 0-6.967-.14zm8.293 38.373c-1.78-.019-3.574-.015-5.379.012-28.88.421-60.75 6.43-88.421 19.277-27.671 12.847-51.013 32.303-64.327 59.818-11.852 24.495-16.052 55.773-7.242 95.895 12.372-2.904 23.747-3.494 33.565-1.195 9.93 2.325 18.916 9.147 21.732 19.312.306 1.106.52 2.235.701 3.373l102.203-102.203c-11.857-18.99-15.828-34.784-12.218-48.416 4.005-15.125 16.44-24.638 30.048-31.797 7.436-3.912 15.487-7.412 23.547-10.8-10.343-1.974-21.956-3.15-34.209-3.276zm83.057 68.326l-48.508 9.701-34.242 34.242h38.807v38.805l34.242-34.242zm87.348 3.367c-3.956 5.301-7.489 11.788-10.848 18.905 6.876 18.213 10.179 41.335 9.812 66.427-.455 31.155-6.796 65.254-20.949 95.739-14.153 30.485-36.344 57.485-68.303 72.949-28.764 13.918-65.048 18.167-109.01 8.3a201.436 201.436 0 0 1-5.59 13.503c53.695 15.852 95.774 12.492 128.286-2.508 34.51-15.922 58.974-45.084 74.672-79.979 15.698-34.894 22.379-75.376 21.142-112.32-1.058-31.637-8.1-60.569-19.212-81.016zm-22.297 45.48c-3.39 8.06-6.89 16.112-10.801 23.548-7.159 13.608-16.672 26.043-31.797 30.048-13.632 3.61-29.425-.361-48.416-12.218L247.92 328.342c1.138.181 2.267.395 3.373.701 10.165 2.816 16.987 11.802 19.312 21.732 2.3 9.818 1.709 21.193-1.195 33.565 40.122 8.81 71.4 4.61 95.895-7.242 27.515-13.314 46.971-36.656 59.818-64.327 12.847-27.67 18.856-59.542 19.277-88.421.208-14.228-1.004-27.742-3.263-39.588zm-160.528 13.096v33.534h33.534v-33.534zm-18 12.727l-34.244 34.244-9.699 48.506 48.506-9.7 34.244-34.243h-38.807zm-57.19 57.19l-37.034 37.035 38.806 38.806 37.036-37.035-48.508 9.701zm-49.76 49.761l-25.925 25.922 38.809 38.809 25.922-25.924zm-38.651 38.65L16 457.194V496h38.807l101.007-101.008z'} fill={'currentColor'} />
		</svg>
	);
}
function	IconGoods() {
	return (
		<svg width={16} height={16} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}>
			<path d={'M363.783 23.545c-9.782.057-16.583 3.047-20.744 10.22-17.51 30.18-38.432 61.645-48.552 97.245 2.836.83 5.635 1.787 8.373 2.853 7.353 2.863 14.38 6.482 20.542 10.858 27.534-25.542 58.165-45.21 87.45-65.462 11.356-7.854 12.273-13.584 10.183-20.83-2.09-7.246-9.868-16.365-20.525-23.176-10.658-6.81-23.87-11.33-34.73-11.68-.68-.022-1.345-.03-1.997-.027zm-68.998.746c-10.02-.182-17.792 6.393-23.924 20.24-8.94 20.194-10.212 53.436-1.446 83.185.156-.008.31-.023.467-.03 1.99-.087 3.99-.072 6 .03 9.436-34.822 27.966-64.72 44.013-91.528-10.31-8.496-18.874-11.782-25.108-11.896zM197.5 82.5L187 97.97c14.82 10.04 29.056 19.725 39.813 31.374 3.916 4.24 7.37 8.722 10.31 13.607 3.77-4.73 8.51-8.378 13.69-10.792.407-.188.82-.355 1.228-.53-3.423-5.44-7.304-10.418-11.51-14.972C227.765 102.83 212.29 92.52 197.5 82.5zm223.77 12.27c-29.255 20.228-58.575 39.152-84.348 62.78.438.576.848 1.168 1.258 1.76 20.68-6.75 49.486-15.333 73.916-19.41 11.484-1.916 15.66-6.552 17.574-13.228 1.914-6.676.447-16.71-5.316-26.983-.924-1.647-1.96-3.29-3.083-4.92zm-223.938 47.87c-14.95.2-29.732 4.3-43.957 12.766l9.563 16.03c21.657-12.89 42.626-14.133 65.232-4.563.52-5.592 1.765-10.66 3.728-15.21.35-.806.73-1.586 1.123-2.354-11.87-4.52-23.83-6.827-35.688-6.67zm75.8 3.934c-5.578-.083-10.597.742-14.427 2.526-4.377 2.038-7.466 4.914-9.648 9.97-.884 2.047-1.572 4.54-1.985 7.494.456-.007.91-.03 1.365-.033 16.053-.084 32.587 2.77 49.313 9.19 7.714 2.96 15.062 7.453 22.047 13.184 3.217-2.445 4.99-4.72 5.773-6.535 1.21-2.798 1.095-5.184-.634-8.82-3.46-7.275-15.207-16.955-28.856-22.27-6.824-2.658-13.98-4.224-20.523-4.614-.818-.05-1.627-.08-2.424-.092zm-24.757 38.457c-22.982.075-44.722 7.386-65 19.782-32.445 19.835-60.565 53.124-80.344 90.032-19.777 36.908-31.133 77.41-31.186 110.53-.053 33.06 10.26 57.27 32.812 67.782.043.02.082.043.125.063h.032c24.872 11.51 65.616 19.337 108.407 20.092 42.79.756 87.79-5.457 121.874-20.187 21.96-9.49 34.545-28.452 40.5-54.156 5.954-25.705 4.518-57.657-2.375-89.314-6.894-31.657-19.2-63.06-34.095-87.875-14.894-24.814-32.614-42.664-48.063-48.593-14.664-5.627-28.898-8.2-42.687-8.156z'} fill={'currentColor'} />
		</svg>
	);
}
function	IconMeals() {
	return (
		<svg width={16} height={16} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}>
			<path d={'M267.895 20.495s-12.96 6.614-25.907 16.354c-6.473 4.87-13.025 10.52-18.205 17.027-5.18 6.506-9.402 14.232-8.76 23.266.714 10.04 7.52 17.517 14.78 22 7.259 4.482 15.502 7.194 23.265 9.869 7.764 2.675 15.05 5.313 19.672 8.168 4.623 2.854 6.052 4.703 6.283 7.963.027.37-.418 2.346-2.613 5.103-2.195 2.757-5.726 5.93-9.42 8.71-7.388 5.557-15.095 9.54-15.095 9.54l8.21 16.016s8.826-4.494 17.706-11.174c4.44-3.34 8.976-7.227 12.681-11.88 3.705-4.655 6.993-10.44 6.485-17.593-.714-10.04-7.52-17.517-14.78-22-7.259-4.483-15.502-7.194-23.265-9.869-7.764-2.675-15.05-5.313-19.672-8.168-4.623-2.855-6.052-4.703-6.283-7.963-.16-2.252 1.217-6.168 4.886-10.777 3.67-4.61 9.218-9.549 14.946-13.858 11.454-8.617 23.296-14.718 23.296-14.718zm-128 48s-12.96 6.614-25.907 16.354c-6.473 4.87-13.025 10.52-18.205 17.027-5.18 6.506-9.402 14.232-8.76 23.266.714 10.04 7.52 17.517 14.78 22 7.259 4.482 15.502 7.194 23.265 9.869 7.764 2.675 15.05 5.313 19.672 8.168 4.623 2.854 6.052 4.703 6.283 7.963.027.37-.418 2.346-2.613 5.103-2.195 2.757-5.726 5.93-9.42 8.71-7.388 5.557-15.095 9.54-15.095 9.54l8.21 16.016s8.826-4.494 17.706-11.174c4.44-3.34 8.976-7.227 12.681-11.881 3.705-4.654 6.993-10.44 6.485-17.592-.714-10.04-7.52-17.517-14.78-22-7.259-4.483-15.502-7.194-23.265-9.869-7.764-2.675-15.05-5.313-19.672-8.168-4.623-2.855-6.052-4.703-6.283-7.963-.16-2.252 1.217-6.168 4.886-10.777 3.67-4.61 9.218-9.549 14.946-13.858 11.454-8.617 23.296-14.718 23.296-14.718zm256 0s-12.96 6.614-25.907 16.354c-6.473 4.87-13.025 10.52-18.205 17.027-5.18 6.506-9.402 14.232-8.76 23.266.714 10.04 7.52 17.517 14.78 22 7.259 4.482 15.502 7.194 23.265 9.869 7.764 2.675 15.05 5.313 19.672 8.168 4.623 2.854 6.052 4.703 6.283 7.963.027.37-.418 2.346-2.613 5.103-2.195 2.757-5.726 5.93-9.42 8.71-7.388 5.557-15.095 9.54-15.095 9.54l8.21 16.016s8.826-4.494 17.706-11.174c4.44-3.34 8.976-7.227 12.681-11.881 3.705-4.654 6.993-10.44 6.485-17.592-.714-10.04-7.52-17.517-14.78-22-7.259-4.483-15.502-7.194-23.265-9.869-7.764-2.675-15.05-5.313-19.672-8.168-4.623-2.855-6.052-4.703-6.283-7.963-.16-2.252 1.217-6.168 4.886-10.777 3.67-4.61 9.218-9.549 14.946-13.858 11.454-8.617 23.296-14.718 23.296-14.718zM256 187.501c-13 0-21.792 5.914-28.512 15.994-2.782 4.173-5.027 9.1-6.715 14.465 11.32-1.607 23.07-2.455 35.227-2.455 12.157 0 23.906.848 35.227 2.455-1.688-5.365-3.933-10.292-6.715-14.465-6.72-10.08-15.512-15.994-28.512-15.994zm0 46c-119.427 0-193.752 86.039-198.54 174.004h397.08C449.751 319.54 375.426 233.5 256 233.5zM22.363 412.14L9.637 424.866C27.757 442.987 48 443.501 64 443.501h384c16 0 36.242-.514 54.363-18.635l-12.726-12.726C475.757 426.019 464 425.505 448 425.505H64c-16 0-27.758.514-41.637-13.365zm90.451 49.361l20.002 30.004h246.368l20.002-30.004z'} fill={'currentColor'} />
		</svg>
	);
}
function	IconShield() {
	return (
		<svg width={16} height={16} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}>
			<path d={'M129.656 21.188L37.936 79.78c3.54 26.805 8.915 53.547 16.127 80.126L240.72 39.594l-19.282-12.5c-31.28-.885-62.204-2.842-91.782-5.907zm253.47.625c-40.51 3.975-83.496 5.938-126.47 5.843l204.625 132.72c7.108-25.89 12.487-51.92 16.095-78.032l-94.25-60.53zM257.937 50.75L59.468 178.656c8.025 26.32 17.865 52.456 29.532 78.313l243.25-158-74.313-48.22zm91.468 59.344l-74.562 48.437 151.28 98.782c11.714-25.803 21.592-51.91 29.688-78.187l-106.406-69.03zm-91.687 59.562L97 274.062c12.202 25.17 26.14 50.064 41.844 74.563l196.094-128.53-77.22-50.44zM352 231.22l-77.53 50.843 101.405 67.187c15.822-24.6 29.895-49.584 42.22-74.875L352 231.22zm-94.53 61.968l-108.345 71.03c13.564 20.062 28.326 39.847 44.28 59.313l132.032-85.28-67.968-45.063zm84.967 56.312L274.5 393.406l47.03 30.375c15.845-19.342 30.513-38.993 44.033-58.936L342.438 349.5zm-84.968 54.875L205.5 437.97c16.233 18.933 33.614 37.54 52.156 55.78 18.385-18.152 35.637-36.678 51.78-55.53l-52.092-33.626.125-.22z'} fill={'currentColor'} />
		</svg>
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
						onClick={() => router.push('/festivals/spooky')}
						className={'text-black dark:text-white text-megaxs absolute left-4 top-2 hover:underline cursor-pointer'}>
						{'< Back'}
					</p>
					<h1 className={'text-black dark:text-white text-base'}>
						{'THE SPOOKY SHOP'}
					</h1>
					<div
						className={'text-black dark:text-white text-xxs absolute right-4 top-2 flex flex-row items-center'}>
						<p className={'mr-2'}>{`BALANCE: ${numberOfCandies}`}</p>
					</div>
				</div>
				<div className={'w-full h-0 mt-4 '}/>

				<div className={'w-full col-span-4 md:col-span-3 mt-4 md:mt-0 hidden md:block'}>
					<Box className={'w-full flex flex-col relative'}>

						<div className={'flex flex-row w-full relative'}>
							<div
								onClick={() => set_tab(0)}
								className={`flex flex-row items-center text-regular p-4 px-6 border-r-2 border-black dark:border-dark-100 text-black dark:text-white ${tab !== 0 ? 'border-b-4 dark:text-dark-200 dark:hover:text-dark-100 cursor-pointer' : ''}`}>
								<IconArmor />
								<p className={'ml-2'}>{'Armors'}</p>
							</div>
							<div
								onClick={() => set_tab(1)}
								className={`flex flex-row items-center text-regular p-4 px-6 border-l-2 border-r-2 border-black dark:border-dark-100 text-black dark:text-white ${tab !== 1 ? 'border-b-4 dark:text-dark-200 dark:hover:text-dark-100 cursor-pointer' : ''}`}>
								<IconShield />
								<p className={'pt-1 ml-2'}>{'Shields'}</p>
							</div>
							<div
								onClick={() => set_tab(2)}
								className={`flex flex-row items-center text-regular p-4 px-6 border-l-2 border-r-2 border-black dark:border-dark-100 text-black dark:text-white ${tab !== 2 ? 'border-b-4 dark:text-dark-200 dark:hover:text-dark-100 cursor-pointer' : ''}`}>
								<IconWeapon />
								<p className={'pt-1 ml-2'}>{'Weapons'}</p>
							</div>
							<div
								onClick={() => set_tab(3)}
								className={`flex flex-row items-center text-regular p-4 px-6 border-l-2 border-r-2 border-black dark:border-dark-100 text-black dark:text-white ${tab !== 3 ? 'border-b-4 dark:text-dark-200 dark:hover:text-dark-100 cursor-pointer' : ''}`}>
								<IconGoods />
								<p className={'pt-1 ml-2'}>{'Goods'}</p>
							</div>
							<div
								onClick={() => set_tab(4)}
								className={`flex flex-row items-center text-regular p-4 px-6 w-full border-l-2 border-black dark:border-dark-100 text-black dark:text-white ${tab !== 4 ? 'border-b-4 dark:text-dark-200 dark:hover:text-dark-100 cursor-pointer' : ''}`}>
								<IconMeals />
								<p className={'pt-1 ml-2'}>{'Meals'}</p>
							</div>

							<div
								onClick={() => alert('Coming soon!')}
								className={'absolute right-0 top-1 flex flex-row items-center text-regular p-4 px-6 text-black cursor-pointer dark:text-dark-200 dark:hover:text-tag-warning'}>
								<svg width={16} height={16} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M6 2h12v2H6V2zM4 6V4h2v2H4zm0 12V6H2v12h2zm2 2v-2H4v2h2zm12 0v2H6v-2h12zm2-2v2h-2v-2h2zm0-12h2v12h-2V6zm0 0V4h-2v2h2zm-9-1h2v2h3v2h-6v2h6v6h-3v2h-2v-2H8v-2h6v-2H8V7h3V5z'} fill={'currentColor'}/> </svg>
								
							</div>
						</div>

						{tab === 0 ? <ArmorsShop /> : null}
						{tab === 1 ? <ShieldShop /> : null}
						{tab === 2 ? <WeaponsShop /> : null}
						{tab === 3 ? <GoodsShop /> : null}
						{tab === 4 ? <MealsShop /> : null}
					</Box>
				</div>
			</div>
		</section>
	);
}

export default Index;
