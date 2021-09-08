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
		description: 'No friend of the books, unlike any librarian.\nStrength, weapons, and anger serve the Barbarian',
		id: 1,
	},
	'Bard': {
		name: 'Bard',
		img: '/bard.png',
		description: 'Words, songs, and music are certainly not hard.\n The magic of the voice is the weapon of the Bard',
		id: 2,
	},
	'Cleric': {
		name: 'Cleric',
		img: '/cleric.png',
		description: 'In the world of adventure, pains and wounds are quite generic.\nIf you live a life or danger, you best know a Cleric',
		id: 3,
	},
	'Druid': {
		name: 'Druid',
		img: '/druid.png',
		description: 'All life is connected in something that is rather fluid.\nThe trees, insects, and animals are all friends of the Druid',
		id: 4,
	},
	'Fighter': {
		name: 'Fighter',
		img: '/fighter.png',
		description: 'Scorn should not be directed at one with a dream to be a writer.\nBut tactics and sword play are what drive the Fighter',
		id: 5,
	},
	'Monk': {
		name: 'Monk',
		img: '/monk.png',
		description: 'Some pursue vanity, and others just want to get drunk.\nInner peace, and control of the body are the goals of a monk',
		id: 6,
	},
	'Paladin': {
		name: 'Paladin',
		img: '/paladin.png',
		description: 'Some hearts when inspected are found with malice therein.\nBut righteous and honor are the tenets of the Paladin',
		id: 7,
	},
	'Ranger': {
		name: 'Ranger',
		img: '/ranger.png',
		description: 'Most, avoid, flee, and fear only a little bit of danger.\nWith a bow in the wilderness, you might find a Ranger',
		id: 8,
	},
	'Rogue': {
		name: 'Rogue',
		img: '/rogue.png',
		description: 'The rich are rich and the poor are poor is in vogue.\nBut with sticky fingers and sharp daggers you find the Rogue',
		id: 9,
	},
	'Sorcerer': {
		name: 'Sorcerer',
		img: '/sorcerer.png',
		description: 'A scholarly teacher of magic seems like a torturer.\nBut this is not of concern to the innate magic of a Sorcerer',
		id: 10,
	},
	'Wizard': {
		name: 'Wizard',
		img: '/wizard.png',
		description: 'Many waste their time on a log, idle like a lizard.\nHowever, through study, immense power is granted to the Wizard',
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
			<p className={'text-sm  justify-center group-hover:underline'}>{rarityClass.name}</p>
			<p className={'text-xss  justify-center text-center mt-1'}>{rarityClass.description}</p>
			{isLoading ? <div className={'absolute inset-0 backdrop-blur-3xl bg-white bg-opacity-40 cursor-not-allowed'}>
				<div className={'loader'} />
			</div> : null}
		</div>
	);
}

function	Index({fetchRarity, router}) {
	const	{provider} = useWeb3();
	const	[option, set_option] = useState(0);

	return (
		<section className={'mt-12'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
				<div className={'flex flex-row items-center'}>
					<div className={'w-60 mr-16'}>
						<Image
							src={'/avatar/banker.png'}
							loader={'eager'}
							quality={100}
							width={240}
							height={240} />
					</div>
					<h1 className={'text-lg whitespace-pre-line justify-center mb-4'}>{'Hello traveler! Welcome to Facu\'s Tavern.\nWhat do you want to do ?'}</h1>
				</div>
				<div>
					<div className={'nes-container mt-6 text-sm space-y-8 mb-8'}>
						<div>
							<label>
								<input type={'radio'} className={'nes-radio'} name={'what-to-do'} readOnly onClick={() => set_option(1)} checked={option === 1} />
								<span>{'Recruit a new adventurer'}</span>
							</label>
						</div>
						<div>
							<label>
								<input type={'radio'} className={'nes-radio'} name={'what-to-do'} readOnly onClick={() => set_option(-1)} checked={option === -1}/>
								<span>{'Nothing'}</span>
							</label>
						</div>
					</div>
				</div>

				<div className={`flex flex-row w-full flex-wrap items-center justify-center ${option !== 1 ? 'opacity-0 h-0': ''}`}>
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
					<div className={'flex flex-col md:flex-row w-full justify-center mb-2 md:mb-0 md:space-x-6'}>
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
