/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				SectionRecruit.js
******************************************************************************/

import	React, {useState}		from	'react';
import	Image					from	'next/image';
import	{useRouter}				from	'next/router';
import	{recruitAdventurer}		from	'utils/actions';
import	CLASSES					from	'utils/codex/classes';
import	Box						from	'components/Box';

function	Class({provider, rarityClass, fetchRarity}) {
	const	router = useRouter();
	const	[isLoading, set_isLoading] = useState(false);
	return (
		<Box
			className={'w-full p-4 flex justify-center items-center flex-col group hover:bg-gray-principal dark:hover:bg-dark-100 transition-colors cursor-pointer relative'}
			onClick={() => {
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
			}}>
			<Image
				src={rarityClass.img}
				quality={100}
				width={240}
				height={240} />
			<p className={'text-sm justify-center group-hover:underline'}>{rarityClass.name}</p>
			<p className={'text-xss justify-center text-center mt-1 leading-normal'}>{rarityClass.description}</p>
			{isLoading ? <div className={'absolute inset-0 backdrop-blur-3xl bg-white bg-opacity-40 cursor-not-allowed'}>
				<div className={'loader'} />
			</div> : null}
		</Box>
	);
}

function	SectionRecruit({shouldDisplay, router, provider, fetchRarity}) {
	if (!shouldDisplay) {
		return null;
	}

	return (
		<section className={'flex flex-row w-full flex-wrap items-center justify-center'}>
			<div className={'grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 gap-y-0 md:gap-y-4'}>
				<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={CLASSES['Barbarian']} />
				<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={CLASSES['Bard']} />
				<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={CLASSES['Cleric']} />
				<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={CLASSES['Druid']} />
				<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={CLASSES['Fighter']} />
				<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={CLASSES['Monk']} />
				<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={CLASSES['Paladin']} />
				<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={CLASSES['Ranger']} />
				<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={CLASSES['Rogue']} />
				<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={CLASSES['Sorcerer']} />
				<Class router={router} provider={provider} fetchRarity={fetchRarity} rarityClass={CLASSES['Wizard']} />
			</div>
		</section>
	);
}

export default SectionRecruit;