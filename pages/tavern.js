/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@MajorTom_eth
**	@Date:					Tuesday September 7th 2021
**	@Filename:				tavern.js
******************************************************************************/

import	React, {useState}			from	'react';
import	Image						from	'next/image';
import	{recruitAdventurer}			from	'utils/actions';
import	useWeb3						from	'contexts/useWeb3';

const	classes = {
	'Barbarian': {
		name: 'Barbarian',
		img: '/barbarian.png',
		id: 1,
	},
	'Bard': {
		name: 'Bard',
		img: '/bard.png',
		id: 2,
	},
	'Cleric': {
		name: 'Cleric',
		img: '/cleric.png',
		id: 3,
	},
	'Druid': {
		name: 'Druid',
		img: '/druid.png',
		id: 4,
	},
	'Fighter': {
		name: 'Fighter',
		img: '/fighter.png',
		id: 5,
	},
	'Monk': {
		name: 'Monk',
		img: '/monk.png',
		id: 6,
	},
	'Paladin': {
		name: 'Paladin',
		img: '/paladin.png',
		id: 7,
	},
	'Ranger': {
		name: 'Ranger',
		img: '/ranger.png',
		id: 8,
	},
	'Rogue': {
		name: 'Rogue',
		img: '/rogue.png',
		id: 9,
	},
	'Sorcerer': {
		name: 'Sorcerer',
		img: '/sorcerer.png',
		id: 10,
	},
	'Wizard': {
		name: 'Wizard',
		img: '/wizard.png',
		id: 11,
	},
};

const		RARITY_ADDR = '0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb';
function	Class({provider, rarityClass, fetchRarity, router}) {
	const	[isLoading, set_isLoading] = useState(false);
	return (
		<div
			className={'w-full md:w-60 border-black border-4 p-4 flex justify-center items-center flex-col group hover:bg-gray-100 transition-colors cursor-pointer relative mb-4 md:mb-0'}
			onClick={() => {
				if (isLoading) {
					return;
				}
				set_isLoading(true);
				recruitAdventurer({
					provider,
					contractAddress: RARITY_ADDR,
					classID: rarityClass.id,
				}, async ({error}) => {
					if (error) {
						set_isLoading(false);
						return console.error(error);
					}
					await fetchRarity();
					set_isLoading(false);
					router.push('/');
				});
			}}>
			<Image
				src={rarityClass.img}
				quality={100}
				width={240}
				height={240} />
			<p className={'font-title text-sm uppercase justify-center group-hover:underline'}>{rarityClass.name}</p>
			{isLoading ? <div className={'absolute inset-0 backdrop-blur-3xl bg-white bg-opacity-40 cursor-not-allowed'}>
				<div className={'loader'} />
			</div> : null}
		</div>
	);
}

function	Index({fetchRarity, router}) {
	const	{provider} = useWeb3();
	const	[option, set_option] = useState(-1);

	return (
		<section className={'mt-12'}>

			<div className={'max-w-screen-lg w-full mx-auto'}>
				<h1 className={'font-title text-lg uppercase justify-center mb-4'}>{'Hello traveler! Welcome the Facu\'s Inn.'}</h1>
				<p className={'font-title text-base uppercase'}>{'What do you want to do ?'}</p>
				<div className={'nes-container mt-6 font-title uppercase text-sm space-y-8 mb-8'}>
					<div>
						<label>
							<input type={'radio'} className={'nes-radio'} name={'what-to-do'} readOnly onClick={() => set_option(0)} checked={option === 0} />
							<span>{'Recruit a new adventurer'}</span>
						</label>
					</div>
					<div>
						<label>
							<input type={'radio'} className={'nes-radio'} name={'what-to-do'} readOnly onClick={() => set_option(1)} checked={option === 1}/>
							<span>{'Nothing'}</span>
						</label>
					</div>
				</div>

				<div className={`flex flex-row w-full flex-wrap items-center justify-center ${option !== 0 ? 'opacity-0 h-0': ''}`}>
					<div className={'flex flex-col md:flex-row w-full justify-center md:justify-between mb-2 md:mb-8'}>
						<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={classes['Barbarian']} />
						<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={classes['Bard']} />
						<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={classes['Cleric']} />
						<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={classes['Druid']} />
					</div>
					<div className={'flex flex-col md:flex-row w-full justify-center md:justify-between mb-2 md:mb-8'}>
						<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={classes['Fighter']} />
						<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={classes['Monk']} />
						<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={classes['Paladin']} />
						<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={classes['Ranger']} />
					</div>
					<div className={'flex flex-col md:flex-row w-full justify-center spamb-2 md:ce-x-6'}>
						<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={classes['Rogue']} />
						<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={classes['Sorcerer']} />
						<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={classes['Wizard']} />
					</div>
				</div>
			</div>


		</section>
	);
}

export default Index;
