/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				Footer.js
******************************************************************************/

import	React, {Fragment, useEffect, useState}	from	'react';
import	{Dialog, Transition} 					from	'@headlessui/react';
import	Link									from	'next/link';
import	{useRouter}								from	'next/router';
import	useUI									from	'contexts/useUI';
import	TownNav									from	'components/TownNav';

function	Footer() {
	const	{theme, switchTheme, layout, switchLayout, raritySkins, switchSkin} = useUI();
	const	[open, set_open] = useState(false);
	const	[options, set_options] = useState(false);
	const	router = useRouter();

	useEffect(() => {
		if (typeof(window) !== 'undefined') {
			let		prevScrollpos = window.pageYOffset;
			window.onscroll = function() {
				const	currentScrollPos = window.pageYOffset;
				const	footbar = document.getElementById('footbar');
				if (!footbar) {
					//
				} else if (prevScrollpos > currentScrollPos) {
					footbar.style.bottom = '0';
				} else {
					footbar.style.bottom = '-60px';
				}
				prevScrollpos = currentScrollPos;
			};
		}
	}, [typeof(window) !== 'undefined']);

	useEffect(() => {
		set_open(false);
	}, [router.pathname]);

	function renderMobileMenu() {
		return (
			<Transition.Root show={open} as={Fragment}>
				<Dialog as={'div'} className={'fixed inset-0 overflow-hidden'} style={{zIndex: 1000}} onClose={set_open}>
					<div className={'absolute inset-0 overflow-hidden'}>
						<Dialog.Overlay className={'absolute inset-0'} />

						<div className={'fixed inset-x-0 bottom-14 max-w-full flex'}>
							<Transition.Child
								as={Fragment}
								enter={'transform transition ease-in-out duration-500 sm:duration-700'}
								enterFrom={'translate-y-full'}
								enterTo={'translate-y-0'}
								leave={'transform transition ease-in-out duration-500 sm:duration-700'}
								leaveFrom={'translate-y-0'}
								leaveTo={'translate-y-full'}>
								<div className={'w-screen h-96'}>
									<div className={'h-full flex flex-col py-6 bg-white dark:bg-dark-600 border-t-4 border-black dark:border-dark-100 shadow-xl overflow-y-scroll'}>
										<div>
											<div className={'flex items-start justify-between'}>
												<Dialog.Title className={'text-lg font-medium text-black dark:text-white'}>
													{''}
												</Dialog.Title>
												<div className={'flex items-center'}>
													<button
														type={'button'}
														className={'rounded-md focus:outline-none text-black dark:text-white'}
														onClick={() => set_open(false)}>
														<span className={'sr-only'}>{'Close panel'}</span>
													</button>
												</div>
											</div>
										</div>
										<div className={'relative flex-1 px-4 sm:px-6'}>
											<TownNav start={0} step={100}/>
										</div>
									</div>
								</div>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		);
	}

	function renderOptions() {
		return (
			<>	
				<Transition appear show={options} as={Fragment}>
					<Dialog
						as={'div'}
						className={'fixed inset-0 z-10 overflow-y-auto'}
						onClose={set_options}>
						<div className={'min-h-screen px-4 text-center'}>
							<Transition.Child
								as={Fragment}
								enter={'ease-out duration-300'}
								enterFrom={'opacity-0'}
								enterTo={'opacity-100'}
								leave={'ease-in duration-200'}
								leaveFrom={'opacity-100'}
								leaveTo={'opacity-0'}
							>
								<Dialog.Overlay className={'fixed bg-black dark:bg-white bg-opacity-30 dark:bg-opacity-20 inset-0'} />
							</Transition.Child>
	
							<span className={'inline-block h-screen align-middle'} aria-hidden={'true'}>&#8203;</span>
							<Transition.Child
								as={Fragment}
								enter={'ease-out duration-300'}
								enterFrom={'opacity-0 scale-95'}
								enterTo={'opacity-100 scale-100'}
								leave={'ease-in duration-200'}
								leaveFrom={'opacity-100 scale-100'}
								leaveTo={'opacity-0 scale-95'}>
								<div className={'inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform font-title uppercase text-black dark:text-white bg-white dark:bg-dark-600 shadow-xl'}>
									<Dialog.Title className={'text-lg font-medium leading-6 text-gray-900 relative'}>
										{'Options'}
										<div className={'absolute right-0 top-0 cursor-pointer'} onClick={() => set_options(false)}>
											<svg width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M5 3H3v18h18V3H5zm14 2v14H5V5h14zm-8 4H9V7H7v2h2v2h2v2H9v2H7v2h2v-2h2v-2h2v2h2v2h2v-2h-2v-2h-2v-2h2V9h2V7h-2v2h-2v2h-2V9z'} fill={'currentColor'}/> </svg>
										</div>
									</Dialog.Title>
	
									<div className={'mt-4'}>
										<div
											onClick={switchTheme}
											className={'flex flex-row items-center p-4 text-regular hover:bg-gray-principal dark:hover:bg-dark-400 cursor-pointer'}>
											<div className={'mr-6'}>
												{theme === 'light' || theme === 'light-initial' ? <svg width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M3 3h18v18H3V3zm16 16V5H5v14h14z'} fill={'currentColor'}/> </svg> : <svg width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M5 3H3v18h18V3H5zm0 2h14v14H5V5zm4 7H7v2h2v2h2v-2h2v-2h2v-2h2V8h-2v2h-2v2h-2v2H9v-2z'} fill={'currentColor'}/> </svg>}
											</div>
											<div>
												{'Use dark mode'}
											</div>
										</div>

										<div
											onClick={switchLayout}
											className={'flex flex-row items-center p-4 text-regular hover:bg-gray-principal dark:hover:bg-dark-400 cursor-pointer'}>
											<div className={'mr-6'}>
												{layout !== 'legacy' ? <svg width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M3 3h18v18H3V3zm16 16V5H5v14h14z'} fill={'currentColor'}/> </svg> : <svg width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M5 3H3v18h18V3H5zm0 2h14v14H5V5zm4 7H7v2h2v2h2v-2h2v-2h2v-2h2V8h-2v2h-2v2h-2v2H9v-2z'} fill={'currentColor'}/> </svg>}
											</div>
											<div>
												{'Use legacy layout'}
											</div>
										</div>

										<div
											onClick={switchSkin}
											className={'flex flex-row items-center p-4 text-regular hover:bg-gray-principal dark:hover:bg-dark-400 cursor-pointer'}>
											<div className={'mr-6'}>
												{!raritySkins ? <svg width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M3 3h18v18H3V3zm16 16V5H5v14h14z'} fill={'currentColor'}/> </svg> : <svg width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M5 3H3v18h18V3H5zm0 2h14v14H5V5zm4 7H7v2h2v2h2v-2h2v-2h2v-2h2V8h-2v2h-2v2h-2v2H9v-2z'} fill={'currentColor'}/> </svg>}
											</div>
											<div>
												{'Use Rarity Skin'}
											</div>
										</div>
									</div>
								</div>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
			</>
		);
	}
	

	return (
		<>
			<div className={'absolute bottom-3 text-center text-xxs left-0 right-0 flex flex-col justify-center items-center'}>
				<div onClick={() => set_options(true)} className={'py-2 hover:underline cursor-pointer'}>
					{'Options'}
				</div>
				<div>
					<a href={'https://github.com/Rarity-Extended/RarityExtended'} target={'_blank'} rel={'noreferrer'} className={'hover:underline'}>
						{'Made with 💙 by the 🕹 community'}
					</a>
				</div>
			</div>
			<div
				id={'footbar'}
				className={'block md:hidden fixed bottom-0 left-0 bg-white dark:bg-dark-600 border-t-4 border-black dark:border-dark-100 transition-all duration-500 w-full'} style={{zIndex: 10000}}>
				<div className={'flex flex-row items-center justify-between text-lightGray text-base font-bold p-4 px-12'}>
					<Link href={'/'}>
						<p className={'cursor-pointer hover:text-tangerine-dark transition-colors'}>
							<svg width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M10 2h4v4h-4V2zM7 7h10v2h-2v13h-2v-6h-2v6H9V9H7V7zm-2 4h2V9H5v2zm0 0v2H3v-2h2zm14 0h-2V9h2v2zm0 0h2v2h-2v-2z'} fill={'currentcolor'}/> </svg>
						</p>
					</Link>
					<div onClick={() => set_open(!open)}>
						<p className={'cursor-pointer hover:text-tangerine-dark transition-colors'}>
							<svg width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M14 2h-4v2H8v2H6v2H4v2H2v2h2v10h7v-6h2v6h7V12h2v-2h-2V8h-2V6h-2V4h-2V2zm0 2v2h2v2h2v2h2v2h-2v8h-3v-6H9v6H6v-8H4v-2h2V8h2V6h2V4h4z'} fill={'currentcolor'}/> </svg>
						</p>
					</div>

					<Link href={'/town/guild-house'}>
						<p className={'cursor-pointer hover:text-tangerine-dark transition-colors'}>
							<svg width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M9 2H5v2H3v2H1v6h2v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2v-2h2V6h-2V4h-2V2h-4v2h-2v2h-2V4H9V2zm0 2v2h2v2h2V6h2V4h4v2h2v6h-2v2h-2v2h-2v2h-2v2h-2v-2H9v-2H7v-2H5v-2H3V6h2V4h4z'} fill={'currentcolor'}/> </svg>
						</p>
					</Link>
				</div>
			</div>
			{renderMobileMenu()}
			{renderOptions()}
		</>
	);
}
export default Footer;
