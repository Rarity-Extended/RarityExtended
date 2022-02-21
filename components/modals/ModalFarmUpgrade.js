import	React, {Fragment}			from	'react';
import	Image						from	'next/image';
import	{ethers}					from	'ethers';
import	{Dialog, Transition}		from	'@headlessui/react';

function	ModalFarmUpgrade({isOpen, set_isOpen, farmUpgrade, adventurerLevel, onUpgrade, img, messageOverride}) {
	function closeModal() {
		set_isOpen(false);
	}
	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as={'div'}
					className={'overflow-y-auto fixed inset-0 z-10'}
					onClose={closeModal}>
					<div className={'px-4 min-h-screen text-center'}>
						<Transition.Child
							as={Fragment}
							enter={'ease-out duration-300'} enterFrom={'opacity-0'} enterTo={'opacity-100'}
							leave={'ease-in duration-200'} leaveFrom={'opacity-100'} leaveTo={'opacity-0'}>
							<Dialog.Overlay className={'fixed inset-0 bg-black/50 transition-opacity'} />
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
							<div className={'inline-block overflow-hidden relative p-6 my-8 mb-0 w-full max-w-screen font-story text-left align-middle transition-all md:mb-96 md:max-w-screen-sm box'}>
								<Dialog.Title as={'h3'} className={'text-lg font-bold text-plain'}>
									{'Upgrade your farm!'}
								</Dialog.Title>
								<div className={'flex flex-col items-start mt-4 text-sm text-plain-60'}>
									<div>
										<p>
											{messageOverride || 'Help the development of Rarity Extended and the extraordinary volunteer contributors behind it!'}
										</p>
									</div>
									<div className={'flex flex-row justify-center my-4 w-full'}>
										<div className={'flex h-48'}>
											<Image src={img} width={152} height={248} objectFit={'contain'} />
										</div>
									</div>
									<div className={'text-center'}>
										<p className={'mb-6 text-base text-plain'}>
											{`Upgrade your farm to Level ${Number(farmUpgrade?.level || 0) + 2} to earn up to ${(3 * (Number(farmUpgrade?.level || 0) + 2)) + (adventurerLevel || 0)} ressources per harvest!`}
										</p>
								
										<div className={'flex flex-row mt-4 flex-center'}>
											<button className={'uppercase outline-none button-highlight-outline'} onClick={onUpgrade}>
												{`Upgrade for ${Number(ethers.utils.formatEther(farmUpgrade?.price || 0))} FTM`}
											</button>
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

export default ModalFarmUpgrade;