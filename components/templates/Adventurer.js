import	React							from	'react';
import	Link							from	'next/link';
import	{useRouter}						from	'next/router';
import	{Dialog, Transition} 			from	'@headlessui/react';
import	{Media, MediaContextProvider}	from	'contexts/useUI';
import	RarityCareSystem				from	'components/RarityCareSystem';
import	AdventurerDetails				from	'sections/adventurer/Wrapper';

const MobileMenu = React.memo(function MobileMenu() {
	const	router = useRouter();
	const	[open, set_open] = React.useState(false);

	React.useEffect(() => {
		set_open(false);
	}, [router.pathname]);

	return (
		<>
			<div
				id={'footbar'}
				className={'block fixed bottom-0 left-0 w-full bg-white dark:bg-dark-600 transition-all duration-500 md:hidden'} style={{zIndex: 10000}}>
				<div className={'flex flex-row justify-between items-center p-4 px-12 text-base font-bold'}>
					<Link href={'/'}>
						<p className={'transition-colors cursor-pointer'}>
							<svg aria-hidden={'true'} focusable={'false'} data-prefix={'fas'} data-icon={'house'} className={'w-5 h-5'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 576 512'}><path fill={'currentColor'} d={'M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z'}></path></svg>
						</p>
					</Link>
					<div onClick={() => router.pathname === '/' ? null : set_open(!open)} className={'text-plain'}>
						<svg width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M4 6h16v2H4V6zm0 5h16v2H4v-2zm16 5H4v2h16v-2z'} fill={'currentColor'}/> </svg>
					</div>

					<Link href={'/adventures'}>
						<p className={'transition-colors cursor-pointer'}>
							<svg aria-hidden={'true'} focusable={'false'} data-prefix={'fas'} data-icon={'scroll-old'} className={'w-5 h-5'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 576 512'}><path fill={'currentColor'} d={'M560 352H416l-32 32l-31.1-32h-64l.0006 32c0 52.88-43 96-96 96h272C525.6 480 575.6 430.3 576 368.7C576.1 359.6 569.1 352 560 352zM48 32c-26.5 0-48 21.5-48 48l-.001 64c0 8.875 7.125 16 15.1 16H96V80C96 53.5 74.5 32 48 32zM256 380.6V320h223.1L480 287.1l-4.342-4.343c-.1445-.125-.2539-.1289-.4062-.2813L448 256l31.1-31.1v-32L448 160l31.1-32c0 0 .1263-2.75-.2487-7.25C476 71.13 434.5 32 384 32H111.6C121.8 45.38 128 61.88 128 80L128 192l4.345 4.344c.1445 .125 .2539 .1289 .4062 .2813L160 224l-32 32l.0003 128c0 38.88 34.63 69.63 74.75 63.13C234.3 442 256 412.5 256 380.6z'}></path></svg>
						</p>
					</Link>
				</div>
			</div>
			<Transition.Root show={open} as={React.Fragment}>
				<Dialog as={'div'} className={'overflow-hidden fixed inset-0'} style={{zIndex: 1000}} onClose={set_open}>
					<div className={'overflow-hidden absolute inset-0'}>
						<Dialog.Overlay className={'absolute inset-0'} />

						<div className={'flex fixed inset-x-0 bottom-14 max-w-full'}>
							<Transition.Child
								as={React.Fragment}
								enter={'ease-out duration-300'}
								enterFrom={'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}
								enterTo={'opacity-100 translate-y-0 sm:scale-100'}
								leave={'ease-in duration-200'}
								leaveFrom={'opacity-100 translate-y-0 sm:scale-100'}
								leaveTo={'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}>
								<div className={'pt-14 w-screen h-screen font-story'}>
									<div className={'flex overflow-y-scroll relative flex-col pt-2 h-full bg-600'}>
										<div>
											<div className={'flex justify-between items-start p-4'}>
												<Dialog.Title className={'text-lg font-medium text-plain'}>
													{'Rarity Extended'}
												</Dialog.Title>
												<div className={'flex items-center'}>
													<button
														type={'button'}
														className={'rounded-sm focus:outline-none text-plain'}
														onClick={() => set_open(false)}>
														<span className={'sr-only'}>{'Close panel'}</span>
														<svg aria-hidden={'true'} focusable={'false'} data-prefix={'fas'} data-icon={'xmark'} className={'w-6 h-6 text-plain'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 320 512'}><path fill={'currentColor'} d={'M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z'}></path></svg>
													</button>
												</div>
											</div>
										</div>
										<div className={'relative flex-1 px-4 sm:px-6'}>
											<AdventurerDetails media={'sm'} />
											<section className={'grid grid-cols-2 gap-2 my-4'}>
												<Link href={'/party'}>
													<button
														className={`box p-4 text-plain text-sm text-center transition-opacity ${router.pathname === '/' || router.pathname === '/recruit' ? '' : 'cursor-pointer'}`}>
														{'Your Party'}
													</button>
												</Link>
												<Link href={'/adventures'}>
													<button
														className={`box p-4 text-plain text-sm text-center transition-opacity ${router.pathname === '/adventures' || router.pathname.startsWith('/adventures') ? '' : 'cursor-pointer'}`}>
														{'Adventures'}
													</button>
												</Link>
												<Link href={'/crafting'}>
													<button
														className={`box p-4 text-plain text-sm text-center transition-opacity ${router.pathname === '/crafting' ? '' : 'cursor-pointer'}`}>
														{'Crafting'}
													</button>
												</Link>
												<Link href={'/skills'}>
													<button
														className={`box p-4 text-plain text-sm text-center transition-opacity ${router.pathname === '/skills' ? '' : 'cursor-pointer'}`}>
														{'Skills'}
													</button>
												</Link>
												<Link href={'/feats'}>
													<button
														className={`box p-4 text-plain text-sm text-center transition-opacity ${router.pathname === '/feats' ? '' : 'cursor-pointer'}`}>
														{'Feats'}
													</button>
												</Link>
												<Link href={'/equipements'}>
													<button
														className={`box p-4 text-plain text-sm text-center transition-opacity ${router.pathname === '/equipements' ? '' : 'cursor-pointer'}`}>
														{'Equipements'}
													</button>
												</Link>
												<Link href={'/bank'}>
													<button
														className={`box p-4 text-plain text-sm text-center transition-opacity ${router.pathname === '/bank' ? '' : 'cursor-pointer'}`}>
														{'Bank'}
													</button>
												</Link>
											</section>
											<RarityCareSystem minimal/>
										</div>
									</div>
								</div>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
});

function	Template({children}) {
	const	router = useRouter();
	
	return (
		<MediaContextProvider>
			<Media greaterThan={'md'}>
				<section className={'mx-auto mt-24 max-w-screen md:mt-12 md:max-w-screen-xl'}>
					<AdventurerDetails />

					<section className={'mx-auto mt-6 max-w-screen md:max-w-screen-xl'}>
						<div className={'flex flex-row items-center mb-4 border-b-2 dark:border-b-dark-300'}>
							<Link href={'/'}>
								<p
									className={`p-4 pr-6 pl-0 text-plain text-sm transition-opacity hover:opacity-100 ${router.pathname === '/' || router.pathname === '/recruit' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
									{'Your Party'}
								</p>
							</Link>
							<Link href={'/adventures'}>
								<p
									className={`p-4 pr-6 pl-0 text-plain text-sm transition-opacity hover:opacity-100 ${router.pathname === '/adventures' || router.pathname.startsWith('/adventures') ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
									{'Adventures'}
								</p>
							</Link>
							<Link href={'/farming'}>
								<p
									className={`p-4 pr-6 pl-0 text-plain text-sm transition-opacity hover:opacity-100 ${router.pathname === '/farming' || router.pathname.startsWith('/farming') ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
									{'Farming'}
								</p>
							</Link>
							<Link href={'/crafting'}>
								<p
									className={`p-4 pr-6 pl-0 text-plain text-sm transition-opacity hover:opacity-100 ${router.pathname === '/crafting' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
									{'Crafting'}
								</p>
							</Link>
							<Link href={'/skills'}>
								<p
									className={`p-4 pr-6 pl-0 text-plain text-sm transition-opacity hover:opacity-100 ${router.pathname === '/skills' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
									{'Skills'}
								</p>
							</Link>
							<Link href={'/feats'}>
								<p
									className={`p-4 pr-6 pl-0 text-plain text-sm transition-opacity hover:opacity-100 ${router.pathname === '/feats' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
									{'Feats'}
								</p>
							</Link>
							<Link href={'/equipements'}>
								<p
									className={`p-4 pr-6 pl-0 text-plain text-sm transition-opacity hover:opacity-100 ${router.pathname === '/equipements' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
									{'Equipements'}
								</p>
							</Link>
							<Link href={'/bank'}>
								<p
									className={`p-4 pr-6 pl-0 ml-auto text-plain text-sm transition-opacity hover:opacity-100 ${router.pathname === '/bank' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
									{'Bank'}
								</p>
							</Link>
						</div>
						{children}
					</section>
				</section>
			</Media>
			<Media lessThan={'md'}>
				<MobileMenu />
				{children}
			</Media>
		</MediaContextProvider>
	);
}

export default Template;
