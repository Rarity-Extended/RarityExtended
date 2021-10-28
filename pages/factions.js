/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 5th 2021
**	@Filename:				index.js
******************************************************************************/

import	React, {useState}								from	'react';
import	router											from	'next/router';
import	Image											from	'next/image';
import	Link											from	'next/link';

function	Index() {
	const	[selectedFaction, setSelectedFaction] = useState(-1);
	return (
		<section className={'mt-16 md:mt-8'}>
			<div className={'flex flex-col max-w-screen-lg w-full mx-auto'}>
				<div className={'grid grid-cols-3 gap-4 px-1 mb-24'}>
					<div
						onClick={() => setSelectedFaction(selectedFaction === 0 ? -1 : 0)}
						className={`w-full h-96 p-4 cursor-pointer transition-all duration-1000 ${selectedFaction === -1 ? '' : selectedFaction === 0 ? 'shadow-2xl' : 'filter grayscale'}`}
						style={{backgroundColor: '#023C45'}}>
						<div className={'border-4 border-white bgpattern2 h-full flex flex-col w-full items-center justify-center p-4'}>
							<div>
								<Image
									src={'/factions/pine-tree.svg'}
									loading={'eager'}
									width={160}
									height={160}
									quality={100} />
							</div>
							<div className={'my-6'}>
								<h1 className={'text-white text-center text-lg font-bold mb-1'}>{'The'}</h1>
								<h1 className={'text-white text-center text-lg font-bold'}>{'Wanderers'}</h1>
							</div>
						</div>
					</div>
					<div
						onClick={() => setSelectedFaction(selectedFaction === 1 ? -1 : 1)}
						className={`w-full h-96 p-4 cursor-pointer transition-all duration-1000 ${selectedFaction === -1 ? '' : selectedFaction === 1 ? 'shadow-2xl' : 'filter grayscale'}`}
						style={{backgroundColor: '#9D7502'}}>
						<div className={'border-4 border-white bgpattern h-full flex flex-col w-full items-center justify-center p-4'}>
							<div>
								<Image
									src={'/factions/divided-spiral.svg'}
									loading={'eager'}
									width={160}
									height={160}
									quality={100} />
							</div>
							<div className={'my-6'}>
								<h1 className={'text-white text-center text-lg font-bold mb-1'}>{'The'}</h1>
								<h1 className={'text-white text-center text-lg font-bold'}>{'Light Crushers'}</h1>
							</div>
						</div>
					</div>
					<div
						onClick={() => setSelectedFaction(selectedFaction === 2 ? -1 : 2)}
						className={`w-full h-96 p-4 cursor-pointer transition-all duration-1000 ${selectedFaction === -1 ? '' : selectedFaction === 2 ? 'shadow-2xl' : 'filter grayscale'}`}
						style={{backgroundColor: '#963E3C'}}>
						<div className={'border-4 border-white bgpattern3 h-full flex flex-col w-full items-center justify-center p-4'}>
							<div>
								<Image
									src={'/factions/batwing-emblem.svg'}
									loading={'eager'}
									width={160}
									height={160}
									quality={100}
								/>
							</div>
							<div className={'my-6'}>
								<h1 className={'text-white text-center text-lg font-bold mb-1'}>{'The'}</h1>
								<h1 className={'text-white text-center text-lg font-bold'}>{'Flying Ruby'}</h1>
							</div>
						</div>
					</div>
				</div>
				<div className={'flex flex-row space-x-16 items-center'}>
					<div className={'w-1/2 h-1 bg-white'} />
					<div>
						<Image
							src={'/factions/batwing-emblem.svg'}
							loading={'eager'}
							width={80}
							height={80}
							quality={100}
						/>
					</div>
					<div className={'w-1/2 h-1 bg-white'} />
				</div>
			</div>
		</section>
	);
}

export default Index;
