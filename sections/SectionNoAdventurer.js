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
		<div className={'box flex justify-between items-center w-full flex-col p-4 relative'}>
			<div className={'text-center'}>
				<p className={'text-plain dark:text-opacity-70 font-bold text-xl font-story text-center'}>
					{rarityClass.name}
				</p>
			</div>
			<div className={'w-40 h-40 flex justify-center items-end'}>
				<Image src={rarityClass?.images?.front} width={160} height={160} />
			</div>
			<div className={'px-4 py-2'}>
				<p className={'text-50 text-sm font-story mb-4 text-center normal-case'}>
					{rarityClass.description}
				</p>
				<button
					onClick={recruit}
					className={'bg-600 hover-bg-900 flex flex-center px-4 py-2 mt-4 w-full text-plain cursor-pointer opacity-60 text-center'}>
					<p className={'font-story text-sm select-none normal-case'}>{'Hire Adventurer'}</p>
				</button>
			</div>
		</div>
	);
}

function	Index() {
	return (
		<section className={'mt-24 md:mt-12 max-w-screen md:max-w-screen-xl mx-auto mb-24'}>
			<section className={'mt-6 max-w-screen md:max-w-screen-xl mx-auto'}>
				<div className={'font-story normal-case text-xl'}>
					<p>{'Welcome!'}</p>
					<p className={'my-4'}>{'You are about to start a journey beyond imagination. you will meet new friends and fight great dangers! The world of Rarity is filled with wonders and perils! Do you have what it takes to survive. Is your curiosity strong enough to get you to the end?'}</p>

					<p className={'my-4'}>{'Rarity Extended is a one-of-a-kind game. It is not a pre-written story. Players are responsible for making their own choices. You must decide who to trust and who to attack. The story will branch depending on the actions of each player. You will shape the future of the land!'}</p>

					<b className={'text-highlight'}>{'Choose your adventurer!'}</b>
				</div>
				<div className={'col-span-12 mt-8'}>
					<div className={'grid grid-cols-1 md:grid-cols-4 gap-4'}>
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