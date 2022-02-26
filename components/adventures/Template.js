import	React			from	'react';
import	Image			from	'next/image';

function	AdventureTemplate({children, cover, rightText, overlayColor}) {
	return (
		<section id={'action'} className={'flex flex-col w-full max-w-full'}>
			<div className={'relative p-2 w-full text-xs md:p-4 box'}>
				<div className={'relative'}>
					<div className={'overflow-hidden relative pb-2 -m-2 rounded-t-md md:pb-8 md:-m-4'}>
						<Image
							src={cover}
							loading={'eager'}
							objectFit={'cover'}
							objectPosition={'top'}
							quality={85}
							width={1550}
							height={300} />
						<div className={'absolute inset-0 bottom-2 opacity-30 md:bottom-9'} style={{backgroundColor: overlayColor}} />
					</div>
				</div>
				<div className={'grid grid-cols-12'}>
					<div className={'hidden overflow-hidden relative col-span-1 -ml-2 w-full h-full md:block'}>
						<div className={'flex overflow-hidden absolute inset-0 justify-center items-center w-full select-none'}>
							<div className={'absolute inset-x-0 top-0 z-10 w-full h-10 bg-gradient-to-b from-light-0 dark:from-dark-400 to-transparent'} />
							<p className={'font-rune text-6xl font-bold text-light-400 dark:text-dark-600 uppercase whitespace-nowrap opacity-40 -rotate-180'} style={{writingMode: 'vertical-rl'}}>
								{'A RARITY EXTENDED AWESOME ADVENTURE'}
							</p>
							<div className={'absolute inset-x-0 -bottom-1 z-10 w-full h-10 bg-gradient-to-t from-light-0 dark:from-dark-400 to-transparent'} />
						</div>
					</div>
					<div className={'col-span-12 w-full md:col-span-10'}>
						{children}
					</div>
					<div className={'hidden overflow-hidden relative col-span-1 -mr-2 w-full h-full md:block'}>
						<div className={'flex overflow-hidden absolute inset-0 justify-center items-center w-full select-none'}>
							<div className={'absolute inset-x-0 top-0 z-10 w-full h-10 bg-gradient-to-b from-light-0 dark:from-dark-400 to-transparent'} />
							<p className={'font-rune text-6xl font-bold text-light-400 dark:text-dark-600 uppercase whitespace-nowrap opacity-40'} style={{writingMode: 'vertical-rl'}}>
								{rightText}
							</p>
							<div className={'absolute inset-x-0 -bottom-1 z-10 w-full h-10 bg-gradient-to-t from-light-0 dark:from-dark-400 to-transparent'} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}


export default AdventureTemplate;