import	React, {useState}			from	'react';
import	Image						from	'next/image';
import	{useRouter}					from	'next/router';
import	Template					from	'components/templates/Head';
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
				<p className={'mb-4 text-sm text-center text-plain-60'}>
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
		<Template>
			<div id={'content'} className={'col-span-12 mt-8'}>
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
		</Template>
	);
}

export default Index;
