/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				SectionRecruit.js
******************************************************************************/

import	React, {useState}		from	'react';
import	Image					from	'next/image';
import	{recruitAdventurer}		from	'utils/actions';
import	CLASSES					from	'utils/codex/classes';

function	Class({provider, rarityClass, fetchRarity, router}) {
	const	[isLoading, set_isLoading] = useState(false);
	return (
		<div
			className={'w-full md:w-60 border-black dark:border-dark-100 border-4 p-4 flex justify-center items-center flex-col group hover:bg-gray-principal dark:hover:bg-dark-100 transition-colors cursor-pointer relative mb-4 md:mb-0'}
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

function	SectionRecruit({shouldDisplay, router, provider, fetchRarity}) {
	if (!shouldDisplay) {
		return null;
	}

	return (
		<section className={'flex flex-row w-full flex-wrap items-center justify-center'}>
			<div className={'grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8'}>
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