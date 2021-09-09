/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@MajorTom_eth
**	@Date:					Tuesday September 7th 2021
**	@Filename:				tavern.js
******************************************************************************/

import	React, {useState, useEffect}	from	'react';
import	Image							from	'next/image';
import	{ethers}						from	'ethers';
import	useSWR							from	'swr';
import	Typer							from	'components/Typer';
import	{recruitAdventurer, apeInVault}	from	'utils/actions';
import	{formatAmount, fetcher}			from	'utils';
import	useWeb3							from	'contexts/useWeb3';
import	DialogBox						from	'components/DialogBox';
import	dayjs							from	'dayjs';
import	relativeTime					from	'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const		ZAP_VAULT = '0xee2463E7e2Ef526Afa43825318Bf8526E6096F99';
const		FTM_VAULT = '0x0DEC85e74A92c52b7F708c4B10207D9560CEFaf0';

const	classNameMapping = [
	'',
	'Barbarian',
	'Bard',
	'Cleric',
	'Druid',
	'Fighter',
	'Monk',
	'Paladin',
	'Ranger',
	'Rogue',
	'Sorcerer',
	'Wizard',
];
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

function	Adventurer({rarityClass, adventurer, router}) {
	return (
		<div
			className={'w-full md:w-60 border-black border-4 p-4 flex justify-center items-center flex-col group hover:bg-gray-50 transition-colors cursor-pointer relative mb-4 md:mb-0'}
			onClick={() => {
				router.push(`/dungeons/the-cellar?adventurer=${adventurer.tokenID}`);
			}}>
			<Image
				src={rarityClass.img}
				quality={100}
				width={240}
				height={240} />
			<p className={'text-sm justify-center group-hover:underline'}>{adventurer.tokenID}</p>
			<p className={'text-xss justify-center text-center mt-1'}>{`${rarityClass.name} level ${adventurer.level}`}</p>
		</div>
	);
}

function	Class({provider, rarityClass, fetchRarity, router}) {
	const	[isLoading, set_isLoading] = useState(false);
	return (
		<div
			className={'w-full md:w-60 border-black border-4 p-4 flex justify-center items-center flex-col group hover:bg-gray-50 transition-colors cursor-pointer relative mb-4 md:mb-0'}
			onClick={() => {
				if (isLoading) {
					return;
				}
				set_isLoading(true);
				recruitAdventurer({
					provider,
					contractAddress: process.env.RARITY_ADDR,
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
			<p className={'text-sm justify-center group-hover:underline'}>{rarityClass.name}</p>
			<p className={'text-xss justify-center text-center mt-1'}>{rarityClass.description}</p>
			{isLoading ? <div className={'absolute inset-0 backdrop-blur-3xl bg-white bg-opacity-40 cursor-not-allowed'}>
				<div className={'loader'} />
			</div> : null}
		</div>
	);
}

function	RecruitTab({shouldDisplay, router, provider, fetchRarity}) {
	return (
		<div className={`flex flex-row w-full flex-wrap items-center justify-center ${shouldDisplay ? '' : 'opacity-0 h-0 max-h-0 min-h-0 pointer-events-none'}`}>
			<div className={`grid-cols-4 gap-8 ${shouldDisplay ? 'grid' : 'flex'}`}>
				<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={classes['Barbarian']} />
				<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={classes['Bard']} />
				<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={classes['Cleric']} />
				<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={classes['Druid']} />
				<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={classes['Fighter']} />
				<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={classes['Monk']} />
				<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={classes['Paladin']} />
				<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={classes['Ranger']} />
				<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={classes['Rogue']} />
				<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={classes['Sorcerer']} />
				<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={classes['Wizard']} />
			</div>
		</div>
	);
}

function	DungeonTab({shouldDisplay, rarities, router}) {
	const	{chainTime} = useWeb3();

	if (!shouldDisplay) {
		return null;
	}
	return (
		<div className={'flex flex-col w-full'}>
			<div className={'pb-10'}>
				<i className={'text-xs'}>
					{'Facu, the Tavern’s owner, has heard some scurrying about down in his cellar. He went down to check it and found swarms of hungry rats. In his earlier days, Facu the Committer would have squashed those pests, but these days he’s weak and frail. Do you want to help him out? Anything you find you get to keep.'}
				</i>
				<div className={'mt-6'}>
					<p className={'text-xs'}>
						{'> Which one of your brave adventurer should go ?'}
					</p>
				</div>
			</div>
			<div>
				<div className={'grid grid-cols-4 gap-8'}>
					{Object.values(rarities)?.filter((adventurer) => {
						const	canAdventure = !dayjs(new Date(adventurer?.dungeons?.cellar?.nextAvailability * 1000)).isAfter(dayjs(new Date(chainTime * 1000)));
						return canAdventure;
					}).map((adventurer) => {
						return (
							<div key={adventurer.tokenID} className={'w-1/4'}>
								<Adventurer
									router={router}
									adventurer={adventurer}
									rarityClass={classes[classNameMapping[adventurer.class]]} />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

function	NewsTab({shouldDisplay}) {
	if (!shouldDisplay) {
		return null;
	}
	return (
		<div className={'flex flex-col w-full'}>
			<div className={'pb-10 text-xs leading-6'}>
				<i>
					{'OYE OYE ! FIND THE LATEST NEWS IN OUR AMAZING WORLD IN THE DAILY EXTENDED ! GET READY FOR A BIG ADVENTURE, FROM OUR HUMBLE TOWN TO THE DARK FOREST OF SMUGLEWIND ! NEWS, ANNOUNCES, AND PUBLIC WORKS, EVERYTHING IS IN THE DAILY EXTENDED !'}
				</i>
				<div className={'mt-10'}>
					<p className={'text-base'}>{'> THE BIG UGLY RAT IN THE CELLAR'}</p>
					<p className={'text-xs leading-6'}>{'WHICH OF US WAS SURPRISED TO LEARN THAT THE TAVERN\'S CELLAR WAS HOME TO THE LARGEST AND UGLIEST RAT EVER RECORDED ? THE LEGENDS SAY THAT IT CAN DEFEAT AN ADVENTURER IN A FEW BITES! AND THE TREASURE IS NOT EVEN GREAT! AND YES, I COULDN\'T BEAT THIS RAT, SO WHAT?'}</p>
				</div>

				<div className={'mt-10'}>
					<p className={'text-base'}>{'> THE TAVERN KEEPER IS ACTUALLY MOVING !!!'}</p>
					<p className={'text-xs leading-6'}>{'MAYBE YOU NEVER NOTICED IT, BUT AFTER 4 DAYS SPENT HANGING OUT IN THIS GLOOMY INN, THIS IS THE FIRST TIME I SEE FACU, THE TAVERN KEEPER, MOVING! WHEN HE WINKED, I THOUGHT I WAS GOING CRAZY, BUT NO, HE IS MOVING ! DOES IT MEAN THAT WE WILL ALL MOVE ONE DAY TOO?'}</p>
				</div>
			</div>
		</div>
	);
}

function	FacuHeadline({router, vaultAPY, ftmBalance}) {
	const	[facuTextIndex, set_facuTextIndex] = useState(0);

	useEffect(() => {
		set_facuTextIndex(0);
	}, [router?.query?.tab]);

	const	renderFacuText = () => {
		if (!router?.query?.tab) {
			return (
				<Typer>{'Hello traveler! Welcome to Facu\'s Tavern!\nWhat do you want to do ?'}</Typer>
			);
		}
		if (router?.query?.tab === 'recruit') {
			return (
				<Typer>{'Oh you are looking for the new guy over there ?'}</Typer>
			);
		}
		if (router?.query?.tab === 'ftm-vault') {
			if (Number(ftmBalance) === 0) {
				return (
					<>
						<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 0}>{'Oh yes. You have what ?'}</Typer>&nbsp;
						<span className={'text-tag-info'}>
							<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 1}>{`${formatAmount(ftmBalance, 2)} FTM`}</Typer>
						</span>&nbsp;
						<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 2}>
							{'? No can\'t do ... But if you find some, I have a really good plan where you can earn up to'}
						</Typer>&nbsp;
						<span className={'text-tag-info'}>
							<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 3}>
								{`${(Number(vaultAPY?.data?.week || 0) / 7 * 365).toFixed(2)}%`}
							</Typer>
						</span>
						<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 4}>
							{'. Just come back later!'}
						</Typer>
					</>
				);
			}
			return (
				<>
					<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 0}>{'Oh yes. You have what ?'}</Typer>&nbsp;
					<span className={'text-tag-info'}>
						<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 1}>{`${formatAmount(ftmBalance, 2)} FTM`}</Typer>
					</span>&nbsp;
					<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 2}>
						{'? I have a friend, the wife of the uncle of one of my cousin (on my mother\'s side), that has really good plan. The current APY is'}
					</Typer>&nbsp;
					<span className={'text-tag-info'}>
						<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 3}>
							{`${(Number(vaultAPY?.data?.week || 0) / 7 * 365).toFixed(2)}%`}
						</Typer>
					</span>
					<Typer onDone={() => set_facuTextIndex(i => i + 1)} shouldStart={facuTextIndex === 4}>
						{'. Do you want to Ape-in ?'}
					</Typer>
				</>
			);
		}
		if (router?.query?.tab === 'the-cellar') {
			return (
				<Typer>{'Those rats be hungry. Those rats be many. Best if ye Constitution be plenty !'}</Typer>
			);
		}
		return null;
	};
	return (
		<h1 key={router?.query?.tab} className={'text-lg bg-white leading-10 whitespace-pre-line mt-10'}>
			{renderFacuText()}
		</h1>
	);
}
function	DialogChoices({router, provider, ftmBalance}) {
	if (router?.query?.tab === 'ftm-vault' && Number(ftmBalance) > 0) {
		return (
			<DialogBox
				options={[
					{label: 'Deposit 25%', onClick: () => apeInVault({provider, contractAddress: ZAP_VAULT}, (e) => console.log(e))},
					{label: 'Deposit 50%', onClick: () => console.log('Deposit 50%')},
					{label: 'Deposit 75%', onClick: () => console.log('Deposit 75%')},
					{label: 'Deposit 100%', onClick: () => console.log('Deposit 100%')},
					{label: 'Nevermind', onClick: () => router.push('/tavern')},
				]} />
		);
	}
	return (
		<DialogBox
			options={[
				{label: 'What\'s new ?', onClick: () => router.push('/tavern')},
				{label: 'Recruit a new adventurer', onClick: () => router.push('/tavern?tab=recruit')},
				{label: 'About the rat ...', onClick: () => router.push('/tavern?tab=the-cellar')},
				{label: 'You said I could earn FTM ?', onClick: () => router.push('/tavern?tab=ftm-vault')}
			]} />
	);
}

function	Index({fetchRarity, rarities, router}) {
	const	{provider, address} = useWeb3();
	const	[ftmBalance, set_ftmBalance] = useState(0);
	const	{data: vaultAPY} = useSWR(`https://major.tax/api/specificApy?address=${FTM_VAULT}&network=250`, fetcher);

	useEffect(() => {
		if (provider && address) {
			provider.getBalance(address).then(b => set_ftmBalance(ethers.utils.formatEther(b)));
		}
	}, [address, provider]);

	return (
		<section className={'mt-12'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
				<div className={'flex flex-row mb-8'}>
					<div className={'w-64 mr-16'} style={{minWidth: 256}}>
						<Image
							src={'/avatar/facu.gif'}
							loading={'eager'}
							quality={100}
							width={256}
							height={256} />
					</div>
					<FacuHeadline router={router} vaultAPY={vaultAPY} ftmBalance={ftmBalance} />
				</div>
				<DialogChoices provider={provider} router={router} ftmBalance={ftmBalance} />
				<section>
					<NewsTab shouldDisplay={!router?.query?.tab} router={router} provider={provider} fetchRarity={fetchRarity} />
					<RecruitTab shouldDisplay={router?.query?.tab === 'recruit'} router={router} provider={provider} fetchRarity={fetchRarity} />
					<DungeonTab shouldDisplay={router?.query?.tab === 'the-cellar'} router={router} rarities={rarities} provider={provider} fetchRarity={fetchRarity} />
				</section>
			</div>

		</section>
	);
}

export default Index;
