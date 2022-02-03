/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				SectionNoAdventurer.js
******************************************************************************/

import	React, {useState}			from	'react';
import	Image						from	'next/image';
import	{useRouter}					from	'next/router';
import	useWeb3						from	'contexts/useWeb3';
import	useRarity					from	'contexts/useRarity';
import	{recruitAdventurer}			from	'utils/actions';
import	CLASSES						from	'utils/codex/core/classes';

function	NewAdventurer({rarityClass}) {
	const	{provider} = useWeb3();
	const	{fetchRarity} = useRarity();
	const	router = useRouter();
	const	[isLoading, set_isLoading] = useState(false);

	function	recruit() {
		if (isLoading) {
			return;
		}
		set_isLoading(true);
		recruitAdventurer({
			provider,
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
	}

	return (
		<div className={'flex relative flex-col justify-between items-center p-4 w-full box'}>
			<div className={'text-center'}>
				<p className={'text-xl font-bold text-center text-plain dark:text-opacity-70'}>
					{rarityClass.name}
				</p>
			</div>
			<div className={'flex justify-center items-end w-40 h-40'}>
				<Image src={rarityClass?.images?.front} width={160} height={160} />
			</div>
			<div className={'py-2 px-4'}>
				<p className={'mb-4 text-sm text-center text-50'}>
					{rarityClass.description}
				</p>
				<button
					onClick={recruit}
					className={'flex py-2 px-4 mt-4 w-full text-center opacity-60 cursor-pointer bg-600 hover-bg-900 flex-center text-plain'}>
					<p className={' text-sm select-none'}>{'Hire Adventurer'}</p>
				</button>
			</div>
		</div>
	);
}

function	Index() {
	return (
		<section className={'mx-auto mt-2 mb-24 md:mt-12 md:max-w-screen-xl max-w-screen'}>
			<section className={'mx-auto mt-0 md:max-w-screen-xl max-w-screen'}>
				<div className={'text-sm md:text-xl'}>
					<p>{'Welcome!'}</p>
					<p className={'my-4'}>{'You are about to start a journey beyond imagination. you will meet new friends and fight great dangers! The world of Rarity is filled with wonders and perils! Do you have what it takes to survive. Is your curiosity strong enough to get you to the end?'}</p>

					<p className={'my-4'}>{'Rarity Extended is a one-of-a-kind game. It is not a pre-written story. Players are responsible for making their own choices. You must decide who to trust and who to attack. The story will branch depending on the actions of each player. You will shape the future of the land!'}</p>

					<b className={'text-highlight'}>{'Choose your adventurer!'}</b>
				</div>
				<div className={'col-span-12 mt-8'}>
					<div className={'grid grid-cols-1 gap-4 md:grid-cols-4'}>
						<NewAdventurer rarityClass={CLASSES['Barbarian']} />
						<NewAdventurer rarityClass={CLASSES['Bard']} />
						<NewAdventurer rarityClass={CLASSES['Cleric']} />
						<NewAdventurer rarityClass={CLASSES['Druid']} />
						<NewAdventurer rarityClass={CLASSES['Fighter']} />
						<NewAdventurer rarityClass={CLASSES['Monk']} />
						<NewAdventurer rarityClass={CLASSES['Paladin']} />
						<NewAdventurer rarityClass={CLASSES['Ranger']} />
						<NewAdventurer rarityClass={CLASSES['Rogue']} />
						<NewAdventurer rarityClass={CLASSES['Sorcerer']} />
						<NewAdventurer rarityClass={CLASSES['Wizard']} />
					</div>
				</div>
			</section>
		</section>
	);
}
export default Index;