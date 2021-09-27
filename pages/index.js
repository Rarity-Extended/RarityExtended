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
import	FrameType0					from	'components/Frame/Stone/Type0';
import	useWeb3						from	'contexts/useWeb3';
import	useRarity					from	'contexts/useRarity';

function	Progress({value, max}) {
	const	progressValue = (value / (max || 1)) >= 0.1 ? (value / (max || 1)) : 0;
	return (
		<>
			<div className={'bg-black absolute h-1 top-0 left-1 right-1'} />
			<div className={'bg-black absolute h-1 w-1 top-1 left-0'} />
			<div className={'bg-black absolute h-1 w-1 top-1 right-0'} />
			<div className={'bg-black absolute w-1 top-2 bottom-2 left-0'} />
			<div className={'bg-black absolute w-1 top-2 bottom-2 right-0'} />
			<div className={'bg-black absolute h-1 bottom-0 left-1 right-1'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-1 right-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-0 right-1'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-1 right-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-0 right-1'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-1 left-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-0 left-1'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-1 left-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-0 left-1'} />
			<div className={'bg-black absolute h-1 w-1 top-1 left-1'} />
			<div className={'bg-black absolute h-1 w-1 bottom-1 left-1'} />
			<div className={'bg-black absolute h-1 w-1 top-1 right-1'} />
			<div className={'bg-black absolute h-1 w-1 bottom-1 right-1'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-0 left-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-0 right-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-0 left-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-0 right-0'} />

			<div className={'bg-stone-secondary-highlight absolute left-2 right-2 top-2 bottom-2'} style={{width: `calc(${progressValue * 100}% - 16px)`}} />
			{progressValue > 0 && <div className={'bg-stone-primary absolute h-1 w-1 ml-1 top-2'} style={{left: `calc(${progressValue * 100}% - 16px)`}} />}
			{progressValue > 0 && <div className={'bg-stone-primary absolute h-1 w-1 ml-1 bottom-2'} style={{left: `calc(${progressValue * 100}% - 16px)`}} />}

			<div className={'bg-stone-primary absolute w-1 left-1 top-2 bottom-2'} />
			<div className={'bg-stone-primary absolute w-1 right-1 top-2 bottom-2'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-2 left-2'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-2 left-2'} />


		</>
	);
}

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
				<div className={'relative w-1/3 flex flex-row border-4 border-black h-25'}>
					<PanelSimple />
					<div className={'flex items-center text-white flex-col justify-center w-full h-full z-10 relative'}>
						<p className={'text-heading-bigger text-center w-full'}>{'BARBARIAN'}</p>
						<p className={'text-regular text-center w-full'}>{'1301875'}</p>
					</div>
				</div>
			</div>
			<div className={'flex flex-row max-w-screen-lg w-full mx-auto'}>
				<div className={'relative w-full flex flex-row border-4 border-black -mt-1 bg-stone-primary'}>
					<div className={'w-1/3'}>
						<div className={'w-full'}>
							<div className={'w-full h-83 flex justify-center items-center bg-black relative'}>
								<Image
									src={'/front/barbarian.svg'}
									loading={'eager'}
									quality={100}
									width={256}
									height={256} />
								<FrameType0 />
							</div>
							<div className={'w-full flex flex-row'}>
								<div className={'relative h-22 min-w-22 w-22'}>
									<PanelSimple />
									<div className={'flex items-center text-white flex-col justify-center w-full h-full z-10 relative'}>
										<p className={'text-regular text-center w-full mb-1'}>{'LVL'}</p>
										<p className={'text-heading text-center w-full'}>{'12'}</p>
									</div>
								</div>
								<div className={'relative h-22 w-full border-l-4 border-r-4 border-black'}>
									<PanelSimple />
									<div className={'p-5 flex items-center h-full'}>
										<div className={'flex items-center text-white flex-col justify-center w-full z-10 relative h-12 px-2 py-2'}>
											<Progress
												value={750}
												max={1000} />
											<p className={'text-regular-bigger text-center w-full h-full flex justify-center items-center relative'}>
												{'750/1000'}
											</p>
										</div>
									</div>
								</div>
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
