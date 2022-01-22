import	React							from	'react';
import	Link							from	'next/link';
import	{useRouter}						from	'next/router';
import	{Dialog, Transition} 			from	'@headlessui/react';
import	{Media, MediaContextProvider}	from	'contexts/useUI';
import	RarityCareSystem				from	'components/RarityCareSystem';
import	AdventurerDetails				from	'sections/adventurer/Wrapper';

const MobileMenu = React.memo(function MobileMenu() {
	const	router = useRouter();
	const	[open, set_open] = React.useState(true);

	React.useEffect(() => {
		set_open(false);
	}, [router.pathname]);

	console.log(router);

	return (
		<>
			<div
				id={'footbar'}
				className={'block md:hidden fixed bottom-0 left-0 bg-white dark:bg-dark-600 border-t-2 border-black dark:border-dark-100 transition-all duration-500 w-full'} style={{zIndex: 10000}}>
				<div className={'flex flex-row items-center justify-between text-lightGray text-base font-bold p-4 px-12'}>
					<Link href={'/'}>
						<p className={'cursor-pointer hover:text-tangerine-dark transition-colors'}>
							<svg width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M10 2h4v4h-4V2zM7 7h10v2h-2v13h-2v-6h-2v6H9V9H7V7zm-2 4h2V9H5v2zm0 0v2H3v-2h2zm14 0h-2V9h2v2zm0 0h2v2h-2v-2z'} fill={'currentcolor'}/> </svg>
						</p>
					</Link>
					<div onClick={() => set_open(!open)} className={'text-plain'}>
						<svg width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M4 6h16v2H4V6zm0 5h16v2H4v-2zm16 5H4v2h16v-2z'} fill={'currentColor'}/> </svg>
					</div>

					<Link href={'/town/guild-house'}>
						<p className={'cursor-pointer hover:text-tangerine-dark transition-colors'}>
							<svg width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M9 2H5v2H3v2H1v6h2v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2v-2h2V6h-2V4h-2V2h-4v2h-2v2h-2V4H9V2zm0 2v2h2v2h2V6h2V4h4v2h2v6h-2v2h-2v2h-2v2h-2v2h-2v-2H9v-2H7v-2H5v-2H3V6h2V4h4z'} fill={'currentcolor'}/> </svg>
						</p>
					</Link>
				</div>
			</div>
			<Transition.Root show={open} as={React.Fragment}>
				<Dialog as={'div'} className={'fixed inset-0 overflow-hidden'} style={{zIndex: 1000}} onClose={set_open}>
					<div className={'absolute inset-0 overflow-hidden'}>
						<Dialog.Overlay className={'absolute inset-0'} />

						<div className={'fixed inset-x-0 bottom-14 max-w-full flex'}>
							<Transition.Child
								as={React.Fragment}
								enter={'ease-out duration-300'}
								enterFrom={'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}
								enterTo={'opacity-100 translate-y-0 sm:scale-100'}
								leave={'ease-in duration-200'}
								leaveFrom={'opacity-100 translate-y-0 sm:scale-100'}
								leaveTo={'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}>
								<div className={'w-screen h-screen pt-14 font-story'}>
									<div className={'h-full flex flex-col pt-2 bg-600 overflow-y-scroll relative'}>
										<div>
											<div className={'flex items-start justify-between p-4'}>
												<Dialog.Title className={'text-lg font-medium text-plain'}>
													{'Rarity Extended'}
												</Dialog.Title>
												<div className={'flex items-center'}>
													<button
														type={'button'}
														className={'rounded-md focus:outline-none text-plain'}
														onClick={() => set_open(false)}>
														<span className={'sr-only'}>{'Close panel'}</span>
														<svg aria-hidden={'true'} focusable={'false'} data-prefix={'fas'} data-icon={'xmark'} className={'w-6 h-6 text-plain'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 320 512'}><path fill={'currentColor'} d={'M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z'}></path></svg>
													</button>
												</div>
											</div>
										</div>
										<div className={'relative flex-1 px-4 sm:px-6'}>
											<AdventurerDetails media={'sm'} />
											<section className={'grid grid-cols-2 gap-2 font-story my-4'}>
												<Link href={'/'}>
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
				<section className={'mt-24 md:mt-12 max-w-screen md:max-w-screen-xl mx-auto'}>
					<AdventurerDetails />

					<section className={'mt-6 max-w-screen md:max-w-screen-xl mx-auto'}>
						<div className={'flex flex-row items-center font-story mb-4 normal-case border-b-2 dark:border-b-dark-300'}>
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
							<Link href={'/bank'}>
								<p
									className={`p-4 pr-6 pl-0 text-plain text-sm transition-opacity hover:opacity-100 ${router.pathname === '/bank' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
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
