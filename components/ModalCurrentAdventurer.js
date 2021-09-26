/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Thursday September 23rd 2021
**	@Filename:				ModalCurrentAdventurer.js
******************************************************************************/

import	React, {Fragment, useState}		from	'react';
import	{Dialog, Transition}			from	'@headlessui/react';
import	Adventurer						from	'components/Adventurer';
import	ListBox							from	'components/ListBox';
import	useRarity						from	'contexts/useRarity';
import	useWeb3							from	'contexts/useWeb3';
import	CLASSES							from	'utils/codex/classes';

const	levelOptions = [
	{name: 'All Levels', value: 0},
	{name: 'Level 1', value: 1},
	{name: 'Level 2', value: 2},
	{name: 'Level 3', value: 3},
	{name: 'Level 4', value: 4},
];
const	classOptions = [
	{name: 'All Classes', value: 0},
	{name: 'Barbarian', value: 1},
	{name: 'Bard', value: 2},
	{name: 'Cleric', value: 3},
	{name: 'Druid', value: 4},
	{name: 'Fighter', value: 5},
	{name: 'Monk', value: 6},
	{name: 'Paladin', value: 7},
	{name: 'Ranger', value: 8},
	{name: 'Rogue', value: 9},
	{name: 'Sorcerer', value: 10},
	{name: 'Wizard', value: 11},
];

function ModalCurrentAdventurer({isOpen, closeModal}) {
	const	{rarities, set_currentAdventurer} = useRarity();
	const	{address, deactivate, onDesactivate} = useWeb3();
	const	[search, set_search] = useState('');
	const	[classTab, set_classTab] = useState(0);
	const	[level, set_level] = useState(levelOptions[0]);
	const	[classSelected, set_classSelected] = useState(classOptions[0]);

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as={'div'}
				className={'fixed inset-0 z-10 overflow-none'}
				style={{zIndex: 1000}}
				onClose={closeModal}>
				<div className={'min-h-screen px-4 text-center'}>
					<Transition.Child
						as={Fragment}
						enter={'ease-out duration-300'}
						enterFrom={'opacity-0'}
						enterTo={'opacity-100'}
						leave={'ease-in duration-200'}
						leaveFrom={'opacity-100'}
						leaveTo={'opacity-0'}>
						<Dialog.Overlay className={'fixed inset-0 bg-black bg-opacity-80'} />
					</Transition.Child>

					<Transition.Child
						as={Fragment}
						enter={'ease-out duration-300'}
						enterFrom={'opacity-0 scale-95'}
						enterTo={'opacity-100 scale-100'}
						leave={'ease-in duration-200'}
						leaveFrom={'opacity-100 scale-100'}
						leaveTo={'opacity-0 scale-95'}>
						<div className={'inline-block px-4 md:px-10 pt-9 pb-0 md:pb-9 mt-16 md:mt-23 text-left transition-all transform bg-white dark:bg-dark-600 shadow-xl max-w-screen-lg w-full uppercase font-title relative border-4 border-black'}>
							<Dialog.Title as={'h3'} className={'relative text-lg font-medium leading-6 text-black dark:text-white flex flex-col md:flex-row justify-between'}>
								{'ADVENTURER'}
								<svg onClick={closeModal} className={'absolute md:relative top-0 right-0 cursor-pointer'} width={'24'} height={'24'} viewBox={'0 0 24 24'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
									<path d={'M6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289Z'} fill={'currentcolor'}/>
								</svg>
							</Dialog.Title>
							<div className={'mt-6 flex flex-col md:flex-row mb-4 items-center'}>
								<input
									onChange={e => set_search(e?.target?.value || '')}
									className={'border-4 border-black dark:border-dark-100 bg-white dark:bg-dark-600 border-solid h-10 w-full md:w-75 mr-0 md:mr-4 text-xs px-2 focus:outline-none text-black dark:text-white'}
									placeholder={'SEARCH'} />
								<button
									onClick={() => {deactivate(); onDesactivate();}}
									className={'ml-auto border-4 border-black dark:border-dark-100 border-solid my-4 md:my-0 w-full md:w-auto h-10 px-12 text-xs text-black dark:text-white hover:bg-gray-secondary dark:hover:bg-dark-900 cursor-pointer relative'}>
									{`${address.slice(0, 4)}...${address.slice(-4)}`}
									<div className={'absolute right-2 cursor-pointer h-10 -top-1 flex justify-center items-center'}>
										<svg width={'12'} height={'12'} viewBox={'0 0 24 24'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
											<path d={'M6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289Z'} fill={'currentcolor'}/>
										</svg>
									</div>
								</button>
							</div>
							<div className={'w-full flex flex-col md:flex-row text-megaxs mb-4'}>
								<div className={'w-full flex flex-row'}>
									<div
										onClick={() => set_classTab(0)}
										className={`p-2 cursor-pointer text-black dark:text-white mr-4 ${classTab === 0 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
										{'ALL'}
									</div>
									<div
										onClick={() => set_classTab(1)}
										className={`p-2 cursor-pointer text-black dark:text-white ${classTab === 1 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
										{'FAVORITES'}
									</div>
								</div>

								<div className={'ml-0 md:ml-auto mt-2 md:mt-0 flex flex-row'}>
									<ListBox
										options={levelOptions}
										className={'mr-4 w-28'}
										set_selected={set_level}
										selected={level} />
									<ListBox
										options={classOptions}
										className={'mr-4 w-32'}
										set_selected={set_classSelected}
										selected={classSelected} />
								</div>
							</div>
								
							<div className={'grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 gap-y-0 md:gap-y-4 min-h-0 md:min-h-133 max-h-64 md:max-h-133 overflow-y-scroll px-1'}>
								{[...Object.values(rarities)]
									.filter((adventurer) => {
										if (level.value === 0)
											return true;
										return adventurer.level === level.value; 
									})
									.filter((adventurer) => {
										if (classSelected.value === 0)
											return true;
										return adventurer.class === classSelected.value; 
									})
									.filter((adventurer) => {
										if (search === '')
											return true;
										return adventurer?.tokenID.toLowerCase().includes(search.toLowerCase());
									})
									.map((adventurer, i) => {
										return (
											<div key={`${adventurer.tokenID}_${i}`} className={'w-full'}>
												<Adventurer
													onClick={() => {
														set_currentAdventurer(adventurer);
														closeModal();
													}}
													adventurer={adventurer}
													rarityClass={CLASSES[adventurer.class]} />
											</div>
										);
									})}
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
}

export default ModalCurrentAdventurer;