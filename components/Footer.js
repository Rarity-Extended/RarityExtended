/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				Footer.js
******************************************************************************/

import	React, {Fragment, useState}	from	'react';
import	{Dialog, Transition} 		from	'@headlessui/react';
import	useUI						from	'contexts/useUI';

function	Footer() {
	const	{theme, switchTheme, raritySkins, switchSkin} = useUI();
	const	[options, set_options] = useState(false);

	function renderOptions() {
		return (
			<>	
				<Transition appear show={options} as={Fragment}>
					<Dialog
						as={'div'}
						className={'overflow-y-auto fixed inset-0 z-10'}
						onClose={set_options}>
						<div className={'px-4 min-h-screen text-center'}>
							<Transition.Child
								as={Fragment}
								enter={'ease-out duration-300'}
								enterFrom={'opacity-0'}
								enterTo={'opacity-100'}
								leave={'ease-in duration-200'}
								leaveFrom={'opacity-100'}
								leaveTo={'opacity-0'}
							>
								<Dialog.Overlay className={'fixed inset-0 bg-black dark:bg-white bg-opacity-30 dark:bg-opacity-20'} />
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
								<div className={'inline-block overflow-hidden p-6 my-8 w-full max-w-md font-title text-left uppercase align-middle bg-white dark:bg-dark-600 shadow-xl transition-all text-plain'}>
									<Dialog.Title className={'relative text-lg font-medium leading-6 text-gray-900'}>
										{'Options'}
										<div className={'absolute top-0 right-0 cursor-pointer'} onClick={() => set_options(false)}>
											<svg width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M5 3H3v18h18V3H5zm14 2v14H5V5h14zm-8 4H9V7H7v2h2v2h2v2H9v2H7v2h2v-2h2v-2h2v2h2v2h2v-2h-2v-2h-2v-2h2V9h2V7h-2v2h-2v2h-2V9z'} fill={'currentColor'}/> </svg>
										</div>
									</Dialog.Title>
	
									<div className={'mt-4'}>
										<div
											onClick={switchTheme}
											className={'flex flex-row items-center p-4 text-regular hover:bg-gray-200 dark:hover:bg-dark-400 cursor-pointer'}>
											<div className={'mr-6'}>
												{theme === 'light' || theme === 'light-initial' ? <svg width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M3 3h18v18H3V3zm16 16V5H5v14h14z'} fill={'currentColor'}/> </svg> : <svg width={24} height={24} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M5 3H3v18h18V3H5zm0 2h14v14H5V5zm4 7H7v2h2v2h2v-2h2v-2h2v-2h2V8h-2v2h-2v2h-2v2H9v-2z'} fill={'currentColor'}/> </svg>}
											</div>
											<div>
												{'Use dark mode'}
											</div>
										</div>

										<div
											onClick={switchSkin}
											className={'flex flex-row items-center p-4 text-regular hover:bg-gray-200 dark:hover:bg-dark-400 cursor-pointer'}>
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
			<div className={'flex absolute inset-x-0 bottom-3 flex-col text-xxs text-center flex-center'}>
				<div onClick={() => set_options(true)} className={'py-2 hover:underline cursor-pointer'}>
					{'Options'}
				</div>
				<div>
					<a href={'https://github.com/Rarity-Extended/RarityExtended'} target={'_blank'} rel={'noreferrer'} className={'hover:underline'}>
						{'Made with 💙 by the 🕹 community'}
					</a>
				</div>
			</div>
			{renderOptions()}
		</>
	);
}
export default Footer;
