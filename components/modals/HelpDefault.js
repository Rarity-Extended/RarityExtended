import	React, {Fragment}			from	'react';
import	{Dialog, Transition}		from	'@headlessui/react';

function	ModalHelpDefault({isOpen, set_isOpen}) {
	function closeModal() {
		set_isOpen(false);
	}
	return (
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
						<div className={'inline-block overflow-hidden relative p-6 my-8 w-full max-w-screen font-story text-left align-middle transition-all md:max-w-screen-lg box'}>
							<Dialog.Title as={'h3'} className={'text-lg font-bold text-plain'}>
								{'Help - We need you!'}
							</Dialog.Title>
							<div className={'mt-2 space-y-2 text-sm text-plain-60'}>
								<p>
									{'This section is still a Work In Progress!'}
								</p>
								<p>
									{'If you have experiences with Dungeon and Dragons and if you want to contribute to the Rarity Extended Project, please join us on Github!'}
								</p>
							</div>

							<div className={'mt-6'}>
								<a
									href={'https://github.com/Rarity-Extended/RarityExtended'}
									target={'_blank'}
									className={'button-highlight'} rel={'noreferrer'}>
									{'Github'}
								</a>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
}

export default ModalHelpDefault;