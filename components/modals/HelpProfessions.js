import	React, {Fragment}			from	'react';
import	{Dialog, Transition}		from	'@headlessui/react';

function	ModalHelpProfessions({isOpen, set_isOpen}) {
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
								{'Rarity 101 - Farming'}
							</Dialog.Title>
							<div className={'mt-2 space-y-2 text-sm text-plain-60'}>
								<p>
									{'One of the basic features of any role playing game is the ability to collect ressources to be able to build, craft and upgrade your equipment and weapons. There are different ways to do that: by hunting some peaceful animals, by fighting agains frightening monsters, or simply by harvesting some natural resources.'}
								</p>
								<p>
									{'With the Rarity Farming contracts, you can gather ressources from the land, either Wood, Minerals or Herbs. The contract will be automatically renewed every day. Each harvest will give you between 1 and 3 materials, with a bonus depending on your profession level.'}
								</p>
								<p>
									{'Every harvest will also give you a fixed amount of experience, with a base of 250xp per harvest for your current Farm Tier. If you harvest lower tier, you will earn less xp (-20% per difference between your level and the tier).'}
								</p>
								<p>
									{'Once you have enough XP, you can spend it to level up your profession. This will allow you to unlock more farms, unlock new type of ressources and earn more loot per harvest.'}
								</p>
								<p>
									{'There is currently 3 professions: Herbalist, Woodcutter and Miner. None of them are exclusive to one another, but each one has a different set of ressources to gather.'}
								</p>
							</div>
							<div className={'mt-4 text-base font-bold text-plain'}>
								<h4>{'Woodcutter'}</h4>
							</div>
							<div className={'mt-2 space-y-2 text-sm text-plain-60'}>
								<p>
									{'The hard work of a Woodcutter is as varied as it is rewarding. Every society is in need of food, shelter, and warmth. The Woodcutter helps provide all three of these by; clearing the area of its trees for the use of crops and using the resources for building houses, weapons, tools and for the much needed fire to fend of the frost.'}
								</p>
							</div>
							<div className={'mt-4 text-base font-bold text-plain'}>
								<h4>{'Miner'}</h4>
							</div>
							<div className={'mt-2 space-y-2 text-sm text-plain-60'}>
								<p>
									{'The hard work of a Woodcutter is as varied as it is rewarding. Every society is in need of food, shelter, and warmth. The Woodcutter helps provide all three of these by; clearing the area of its trees for the use of crops and using the resources for building houses, weapons, tools and for the much needed fire to fend of the frost.'}
								</p>
							</div>
							<div className={'mt-4 text-base font-bold text-plain'}>
								<h4>{'Herbalist'}</h4>
							</div>
							<div className={'mt-2 space-y-2 text-sm text-plain-60'}>
								<p>
									{'The hard work of a Woodcutter is as varied as it is rewarding. Every society is in need of food, shelter, and warmth. The Woodcutter helps provide all three of these by; clearing the area of its trees for the use of crops and using the resources for building houses, weapons, tools and for the much needed fire to fend of the frost.'}
								</p>
							</div>

							<div className={'mt-6'}>
								<button className={'button-highlight'} onClick={closeModal}>
									{'Got it, thanks!'}
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
}

export default ModalHelpProfessions;