import	React, {Fragment}		from	'react';
import	{Dialog, Transition}	from	'@headlessui/react';
import	Image					from	'next/image';
import	useRarity				from	'contexts/useRarity';
import	useUI					from	'contexts/useUI';
import	useLocalStorage			from	'hook/useLocalStorage';
import	CLASSES					from	'utils/codex/core/classes';

function ModalSelectAdventurer({isOpen, onClose, onSelect}) {
	const	{rarities, skins} = useRarity();
	const	{raritySkins} = useUI();
	const	[favoritesAdventurers] = useLocalStorage('favorites', []);

	function clickAdventurer(adventurer) {
		onClose();
		setTimeout(() => {
			onSelect(adventurer);
		}, 250);
	}

	return (
		<Transition.Root show={isOpen} as={Fragment}>
			<Dialog as={'div'} className={'fixed inset-0 overflow-hidden z-50'} onClose={onClose}>
				<div className={'absolute inset-0 overflow-hidden'}>
					<Dialog.Overlay className={'absolute inset-0 z-40 bg-dark-900 opacity-40'} />
	
					<div className={'fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16 z-50'}>
						<Transition.Child
							as={Fragment}
							enter={'transform transition ease-in-out duration-500 sm:duration-700'}
							enterFrom={'translate-x-full'}
							enterTo={'translate-x-0'}
							leave={'transform transition ease-in-out duration-500 sm:duration-700'}
							leaveFrom={'translate-x-0'}
							leaveTo={'translate-x-full'}>
							<div className={'w-screen max-w-sm'}>
								<div className={'h-full flex flex-col bg-600 shadow-xl overflow-y-scroll border-l-2 border-light-400 dark:border-dark-400'}>
									<div className={'px-6 py-8'}>
										<div className={'flex items-start justify-between'}>
											<Dialog.Title className={'text-lg font-medium text-plain font-story'}>{'Adventurers'}</Dialog.Title>
											<div className={'ml-3 h-7 flex items-center'}>
												<svg onClick={onClose} className={'w-5 h-5 text-plain cursor-pointer'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 24 24'}> <path d={'M5 5h2v2H5V5zm4 4H7V7h2v2zm2 2H9V9h2v2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2zm2-2v2h-2V9h2zm2-2v2h-2V7h2zm0 0V5h2v2h-2z'} fill={'currentColor'}/> </svg>
											</div>
										</div>
									</div>
									<div className={'border-b-4 border-black dark:border-dark-100'} />
									<ul role={'list'} className={'flex-1 overflow-y-auto'}>
										{[...Object.values(rarities)].map((adventurer) => (
											<li key={adventurer.tokenID}>
												<div className={'relative group py-3 px-4 flex items-center hover:bg-dark-900 cursor-pointer'}>
													<div onClick={() => clickAdventurer(adventurer)} className={'-m-1 flex-1 block p-1'}>
														<div className={'flex-1 flex items-center min-w-0 relative'}>
															<span className={'h-20 w-20 inline-block relative'}>
																<Image
																	src={raritySkins ? skins[adventurer?.tokenID] || adventurer?.skin : adventurer?.skin}
																	loading={'eager'}
																	width={80}
																	height={80} />
																{favoritesAdventurers.includes(adventurer.tokenID) ? <span className={'absolute top-0 left-0 block text-highlight'} aria-hidden={'true'}>
																	<svg width={12} height={12} aria-hidden={'true'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 576 512'}><path fill={'currentColor'} d={'M316.7 17.8l65.43 132.4l146.4 21.29c26.27 3.796 36.79 36.09 17.75 54.59l-105.9 102.1l25.05 145.5c4.508 26.31-23.23 45.9-46.49 33.7L288 439.6l-130.9 68.7C133.8 520.5 106.1 500.9 110.6 474.6l25.05-145.5L29.72 226.1c-19.03-18.5-8.516-50.79 17.75-54.59l146.4-21.29l65.43-132.4C271.1-6.083 305-5.786 316.7 17.8z'}></path></svg>
																</span> : null}
															</span>
															<div className={'ml-4 truncate font-story'}>
																<p className={'text-base font-bold text-plain truncate'}>{adventurer.name || adventurer.tokenID}</p>
																<p className={'text-base text-plain truncate'}>{`${CLASSES[adventurer.class].name} level ${adventurer.level}`}</p>
															</div>
														</div>
													</div>
												</div>
											</li>
										))}
									</ul>
								</div>
							</div>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export default ModalSelectAdventurer;