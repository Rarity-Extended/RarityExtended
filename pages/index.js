/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 5th 2021
**	@Filename:				index.js
******************************************************************************/

import	React						from	'react';
import	Image						from	'next/image';
import	SectionNoAdventurer			from	'sections/SectionNoAdventurer';
import	SectionCharacterSheet		from	'sections/SectionCharacterSheet';
import	FragmentTop					from	'components/Chains/FragmentTop';
import	FragmentBottom				from	'components/Chains/FragmentBottom';
import	FragmentLink				from	'components/Chains/FragmentLink';
import	FragmentFull				from	'components/Chains/FragmentFull';
import	PanelSimple					from	'components/Panel/PanelSimple';
import	useWeb3						from	'contexts/useWeb3';
import	useRarity					from	'contexts/useRarity';

function	ChainDoubleSimple() {
	return (
		<div className={'relative w-5 flex flex-col items-center'}>
			<FragmentBottom />
			<FragmentLink />
			<FragmentTop />
		</div>
	);
}

function	ChainLong() {
	return (
		<div className={'relative w-5 flex flex-col items-center'}>
			<FragmentBottom />
			<FragmentLink />
			<FragmentFull />
			<FragmentLink />
			<FragmentFull />
			<FragmentLink />
		</div>
	);
}


function	Index({router}) {
	const	{provider, chainTime} = useWeb3();
	const	{rarities, updateRarity} = useRarity();
	const	adventurers = Object.values(rarities);

	if (adventurers?.length === 0) {
		return (
			<SectionNoAdventurer />
		);
	}

	return (
		<section className={''}>
			<div className={'flex flex-row max-w-screen-lg w-full mx-auto'}>
				<div className={'relative w-1/3 flex flex-row justify-between px-7'}>
					<ChainDoubleSimple /> {/* 28px left */}
					<ChainDoubleSimple /> {/* 28px right */}
				</div>
				<div className={'relative w-2/3 flex flex-row justify-end pr-7 -mb-96'}>
					<ChainLong /> {/* 28px left */}
				</div>
			</div>
			<div className={'flex flex-row max-w-screen-lg w-full mx-auto'}>
				<div className={'relative w-1/3 flex flex-row border-4 border-r-0 border-black h-25'}>
					<PanelSimple containerClassName={'flex-col justify-center'}>
						<p className={'text-heading-bigger text-center w-full'}>{'BARBARIAN'}</p>
						<p className={'text-regular text-center w-full'}>{'1301875'}</p>
					</PanelSimple>
				</div>
			</div>
			<div className={'flex flex-row max-w-screen-lg w-full mx-auto'}>
				<div className={'relative w-full flex flex-row border-4 border-black -mt-1 bg-stone-primary'}>
					<div className={'w-1/3'}>
						<div className={'w-full h-96'}>
							<div className={'w-full h-83 flex justify-center items-center bg-black relative'}>
								<Image
									src={'/front/barbarian.svg'}
									loading={'eager'}
									quality={100}
									width={256}
									height={256} />

								{/* TOP_LEFT_CROSS */}
								<div className={'absolute bg-stone-primary w-1 h-1 left-2 top-1'} />
								<div className={'absolute bg-stone-primary w-1 h-1 left-2 top-3'} />
								<div className={'absolute bg-stone-primary w-1 h-1 left-1 top-2'} />
								<div className={'absolute bg-stone-primary w-1 h-1 left-3 top-2'} />

								{/* TOP_RIGHT_CROSS */}
								<div className={'absolute bg-stone-primary w-1 h-1 right-2 top-1'} />
								<div className={'absolute bg-stone-primary w-1 h-1 right-2 top-3'} />
								<div className={'absolute bg-stone-primary w-1 h-1 right-1 top-2'} />
								<div className={'absolute bg-stone-primary w-1 h-1 right-3 top-2'} />

								{/* BOTTOM_LEFT_CROSS */}
								<div className={'absolute bg-stone-primary w-1 h-1 left-2 bottom-1'} />
								<div className={'absolute bg-stone-primary w-1 h-1 left-2 bottom-3'} />
								<div className={'absolute bg-stone-primary w-1 h-1 left-1 bottom-2'} />
								<div className={'absolute bg-stone-primary w-1 h-1 left-3 bottom-2'} />

								{/* BOTTOM_RIGHT_CROSS */}
								<div className={'absolute bg-stone-primary w-1 h-1 right-2 bottom-1'} />
								<div className={'absolute bg-stone-primary w-1 h-1 right-2 bottom-3'} />
								<div className={'absolute bg-stone-primary w-1 h-1 right-1 bottom-2'} />
								<div className={'absolute bg-stone-primary w-1 h-1 right-3 bottom-2'} />

								{/* BORDERS_PLAIN */}
								<div className={'absolute bg-stone-primary h-1 right-5 left-5 top-2'} />
								<div className={'absolute bg-stone-primary h-1 right-5 left-5 bottom-2'} />
								<div className={'absolute bg-stone-primary w-1 top-5 left-2 bottom-5'} />
								<div className={'absolute bg-stone-primary w-1 top-5 right-2 bottom-5'} />
								
								{/* BORDER_EXCEPTIONS */}
								<div className={'absolute bg-black h-1 w-1 top-2'} style={{left: 'calc(50% - 6px)'}} />
								<div className={'absolute bg-black h-1 w-1 top-2'} style={{right: 'calc(50% - 6px)'}} />
								<div className={'absolute bg-black h-1 w-1 bottom-2'} style={{left: 'calc(50% - 6px)'}} />
								<div className={'absolute bg-black h-1 w-1 bottom-2'} style={{right: 'calc(50% - 6px)'}} />
								<div className={'absolute bg-black h-1 w-1 left-2'} style={{top: 'calc(50% - 6px)'}} />
								<div className={'absolute bg-black h-1 w-1 left-2'} style={{bottom: 'calc(50% - 6px)'}} />
								<div className={'absolute bg-black h-1 w-1 right-2'} style={{top: 'calc(50% - 6px)'}} />
								<div className={'absolute bg-black h-1 w-1 right-2'} style={{bottom: 'calc(50% - 6px)'}} />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={'flex flex-col mt-64 space-y-36 max-w-screen-lg w-full mx-auto'}>
				{
					adventurers?.map((rarity) => (
						<SectionCharacterSheet
							key={rarity.tokenID}
							rarity={rarity}
							provider={provider}
							updateRarity={updateRarity}
							chainTime={chainTime}
							router={router} />
					))
				}
			</div>


		</section>
	);
}

export default Index;
