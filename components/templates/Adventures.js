import	React			from	'react';
import	Image			from	'next/image';

function	AdventureTemplate({children, cover, rightText, overlayColor}) {
	return (
		<section id={'action'} className={'flex flex-col w-full max-w-full'}>
			<div className={'box p-4 text-xs w-full relative'}>
				<div className={'relative'}>
					<div className={'-m-4 pb-8 relative overflow-hidden rounded-t-md'}>
						<Image
							src={cover}
							loading={'eager'}
							objectFit={'cover'}
							objectPosition={'top'}
							quality={85}
							width={1550}
							height={300} />
						<div className={'absolute inset-0 bottom-8 opacity-30'} style={{backgroundColor: overlayColor}} />
					</div>
				</div>
				<div className={'font-rune'}>
				</div>
				<div className={'grid grid-cols-12'}>
					<div className={'col-span-1 w-full h-full relative overflow-hidden -ml-2'}>
						<div className={'absolute inset-0 overflow-hidden w-full flex justify-center items-center select-none'}>
							<div className={'w-full h-10 absolute inset-x-0 top-0 from-dark-400 to-transparent bg-gradient-to-b z-10'} />
							<p className={'font-rune text-6xl font-bold transform -rotate-180 text-dark-600 opacity-40 whitespace-nowrap uppercase'} style={{writingMode: 'vertical-rl'}}>
								{'A RARITY EXTENDED AWESOME ADVENTURE'}
							</p>
							<div className={'w-full h-10 absolute inset-x-0 -bottom-1 from-dark-400 to-transparent bg-gradient-to-t z-10'} />
						</div>
					</div>
					<div className={'col-span-10 w-full'}>
						{children}
					</div>
					<div className={'col-span-1 w-full h-full relative overflow-hidden -mr-2'}>
						<div className={'absolute inset-0 overflow-hidden w-full flex justify-center items-center select-none'}>
							<div className={'w-full h-10 absolute inset-x-0 top-0 from-dark-400 to-transparent bg-gradient-to-b z-10'} />
							<p className={'font-rune text-6xl font-bold text-dark-600 opacity-40 whitespace-nowrap uppercase'} style={{writingMode: 'vertical-rl'}}>
								{rightText}
							</p>
							<div className={'w-full h-10 absolute inset-x-0 -bottom-1 from-dark-400 to-transparent bg-gradient-to-t z-10'} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}


export default AdventureTemplate;