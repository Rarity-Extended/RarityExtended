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
	
					<div className={'fixed inset-y-0 right-0 pl-0 md:pl-10 max-w-full flex sm:pl-16 z-50'}>
						<Transition.Child
							as={Fragment}
							enter={'transform transition ease-in-out duration-500 sm:duration-700'}
							enterFrom={'translate-x-full'}
							enterTo={'translate-x-0'}
							leave={'transform transition ease-in-out duration-500 sm:duration-700'}
							leaveFrom={'translate-x-0'}
							leaveTo={'translate-x-full'}>
							<div className={'w-screen max-w-screen md:max-w-sm'}>
								<div className={'h-full flex flex-col bg-600 shadow-xl overflow-y-scroll border-l-2 border-light-400 dark:border-dark-400'}>
									<div className={'px-4 md:px-6 pt-6 py-4 md:py-8 md:pt-8'}>
										<div className={'flex items-start justify-between'}>
											<Dialog.Title className={'text-lg font-medium text-plain'}>
												{'Adventurers'}
											</Dialog.Title>
											<div className={'ml-3 h-7 flex items-center'}>
												<svg onClick={onClose} aria-hidden={'true'} focusable={'false'} data-prefix={'fas'} data-icon={'xmark'} className={'w-5 h-5 text-plain'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 320 512'}><path fill={'currentColor'} d={'M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z'}></path></svg>
											</div>
										</div>
									</div>
									<div className={'border-b-2 md:border-b-4 border-black dark:border-dark-100'} />
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
															<div className={'ml-4 truncate'}>
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