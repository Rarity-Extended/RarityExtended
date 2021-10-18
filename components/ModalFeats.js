/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 26th 2021
**	@Filename:				ModalSkills.js
******************************************************************************/

import	React, {Fragment, useState}						from	'react';
import	{Dialog, Transition}							from	'@headlessui/react';
import	useWeb3											from	'contexts/useWeb3';
import	useRarity										from	'contexts/useRarity';
import	{learnFeat}										from	'utils/actions';
import	{featsPerClass, initialFeatsPerClass}			from	'utils/libs/rarityFeats';
import	FEATS											from	'utils/codex/feats.json';

function	Feats({adventurer, isOpen, closeModal}) {
	const	{provider} = useWeb3();
	const	{updateRarity} = useRarity();
	const	_maxFeatsForAventurer = featsPerClass(adventurer.class, adventurer?.level);
	const	_initialFeatsPerClass = initialFeatsPerClass(adventurer.class);
	const	_adventurerFeats = adventurer.feats || [];
	const	_unlockedFeats = [...new Set([..._initialFeatsPerClass, ..._adventurerFeats])];
	const	_pointLefts = _maxFeatsForAventurer - _unlockedFeats.length;
	const	[learnTab, set_learnTab] = useState(0);
	const	[typeTab, set_typeTab] = useState(0);
	const	[search, set_search] = useState('');

	function	onLearnFeat(featID) {
		learnFeat({
			provider,
			tokenID: adventurer.tokenID,
			feat: featID,
		}, ({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(data);
			closeModal();
		});
	}

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as={'div'} className={'fixed inset-0 z-10 overflow-none'} onClose={closeModal}>
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

					<span
						className={'inline-block h-screen align-middle'}
						aria-hidden={'true'}>&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter={'ease-out duration-300'}
						enterFrom={'opacity-0 scale-95'}
						enterTo={'opacity-100 scale-100'}
						leave={'ease-in duration-200'}
						leaveFrom={'opacity-100 scale-100'}
						leaveTo={'opacity-0 scale-95'}>
						<div className={'inline-block px-4 md:px-10 pt-9 pb-0 md:pb-9 mt-16 md:mt-23 text-left transition-all transform bg-white dark:bg-dark-600 shadow-xl max-w-screen-lg w-full uppercase font-title relative'}>
							<Dialog.Title as={'h3'} className={'relative text-lg font-medium leading-6 text-black dark:text-white flex flex-col md:flex-row justify-between'}>
								{'FEAT LIST'}
								<svg onClick={closeModal} className={'absolute md:relative top-0 right-0'} width={'24'} height={'24'} viewBox={'0 0 24 24'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
									<path d={'M6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289Z'} fill={'currentcolor'}/>
								</svg>
							</Dialog.Title>
							<div className={'mt-6 flex flex-col md:flex-row mb-4 items-center'}>
								<input
									onChange={e => set_search(e?.target?.value || '')}
									className={'border-4 border-black dark:border-dark-100 bg-white dark:bg-dark-600 border-solid h-10 w-full md:w-75 mr-0 md:mr-4 text-xs px-2 focus:outline-none text-black dark:text-white'}
									placeholder={'SEARCH'} />
								<div className={'ml-auto text-xs mr-6 text-black dark:text-white hidden md:block'}>
									{`POINTS LEFT: ${_pointLefts}`}
								</div>
								<div className={'text-xs mt-4 text-black dark:text-white block md:hidden text-center'}>
									{`POINTS LEFT: ${_pointLefts}`}
								</div>
							</div>
							<div className={'w-full flex flex-row text-megaxs mb-4'}>
								<div
									onClick={() => set_learnTab(0)}
									className={`p-2 cursor-pointer text-black dark:text-white mr-4 ${learnTab === 0 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
									{'LEARNABLE'}
								</div>
								<div
									onClick={() => set_learnTab(1)}
									className={`p-2 cursor-pointer text-black dark:text-white mr-4 ${learnTab === 1 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
									{'LEARNED'}
								</div>
								<div
									onClick={() => set_learnTab(2)}
									className={`p-2 cursor-pointer text-black dark:text-white ${learnTab === 2 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
									{'ALL'}
								</div>


								<div
									onClick={() => set_typeTab(0)}
									className={`hidden md:block p-2 cursor-pointer text-black dark:text-white mr-4 ${typeTab === 0 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary ml-auto`}>
									{'ALL'}
								</div>
								<div
									onClick={() => set_typeTab(1)}
									className={`hidden md:block p-2 cursor-pointer text-black dark:text-white mr-4 ${typeTab === 1 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
									{'GENERAL'}
								</div>
								<div
									onClick={() => set_typeTab(2)}
									className={`hidden md:block p-2 cursor-pointer text-black dark:text-white mr-4 ${typeTab === 2 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
									{'ITEM CREATION'}
								</div>
								<div
									onClick={() => set_typeTab(3)}
									className={`hidden md:block p-2 cursor-pointer text-black dark:text-white mr-4 ${typeTab === 3 ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white dark:bg-dark-600'} dark:hover:bg-dark-400 hover:bg-gray-secondary`}>
									{'METAMAGIC'}
								</div>

							</div>
						
							<div className={'min-h-0 md:min-h-120 max-h-96 md:max-h-120 overflow-y-scroll'}>
								{
									Object.values(FEATS)
										.filter((feat) => {
											if (learnTab === 0) {
												if (feat.prerequisites) {
													const	hasPrerequisitesFeat = feat.prerequisites_feat === 0 || _unlockedFeats.includes(feat.prerequisites_feat);
													const	hasPrerequisitesLevel = (feat.prerequisites_level <= adventurer.level);
													const	hasPrerequisitesClass = (feat.prerequisites_class.includes(adventurer.class));
													const	isLearned = _unlockedFeats.includes(feat.id);
													return hasPrerequisitesLevel && hasPrerequisitesClass && hasPrerequisitesFeat && !isLearned;
												} else {
													const	isLearned = _unlockedFeats.includes(feat.id);
													return !isLearned;
												}
											} else if (learnTab === 1) {
												return _unlockedFeats.includes(feat.id);
											}
											return true;
										})
										.filter((feat) => {
											if (typeTab === 0) {
												return true;
											} else if (typeTab === 1) {
												return feat.type === 'General';
											} else if (typeTab === 2) {
												console.log(feat.type);
												return feat.type === 'Item Creation';
											} else if (typeTab === 3) {
												return feat.type === 'Metamagic';
											}
											return true;
										})
										.filter((feat) => {
											if (search === '')
												return true;
											return feat?.name.toLowerCase().includes(search.toLowerCase());
										})
										.map((feat) => {
											const	isLearned = _unlockedFeats.includes(feat.id);
											let		canLearn = !isLearned;
											if (feat.prerequisites) {
												const	hasPrerequisitesFeat = feat.prerequisites_feat === 0 || _unlockedFeats.includes(feat.prerequisites_feat);
												const	hasPrerequisitesLevel = (feat.prerequisites_level <= adventurer.level);
												const	hasPrerequisitesClass = (feat.prerequisites_class.includes(adventurer.class));
												canLearn = hasPrerequisitesLevel && hasPrerequisitesClass && hasPrerequisitesFeat && !isLearned;
											}

											return (
												<details key={feat?.id} className={'flex flex-row w-full mb-2 transition-colors'}>
													<summary className={'transition-colors'}>
														<div className={'flex flex-row space-x-4 w-full h-auto md:h-16 cursor-pointer'}>
															<div className={'flex flex-col md:flex-row w-full relative text-black dark:text-white px-4'}>
																<div className={'mt-3.5 pr-6 w-75'}>
																	<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'FEAT:'}</p>
																	<p className={'text-sx'}>{feat?.name}</p>
																</div>
																<div className={'mt-3.5 pr-6'}>
																	<p className={'text-megaxs mb-1 text-gray-darker dark:text-dark-100'}>{'PREREQUISTES FEAT:'}</p>
																	<p className={'text-sx'}>
																		{feat?.prerequisites ? Object.values(FEATS).find(s => s.id === feat?.prerequisites_feat)?.name || '-' : '-'}
																	</p>
																</div>
																<div className={'mt-3.5 ml-0 md:ml-auto'} onClick={(e) => e.preventDefault()}>
																	{learnTab === 0 || (learnTab === 2 && !_unlockedFeats.includes(feat.id)) ? <button
																		onClick={() => {
																			if (_pointLefts > 0 && canLearn)
																				onLearnFeat(feat.id);
																		}}
																		disabled={!(_pointLefts > 0)}
																		className={`border-4 border-black dark:border-dark-100 border-solid my-4 md:my-0 w-full md:w-auto py-2 px-12 text-xs text-black dark:text-white ${_pointLefts > 0 && canLearn ? 'hover:bg-gray-secondary dark:hover:bg-dark-900 cursor-pointer' : 'cursor-not-allowed'}`}>
																		{'LEARN'}
																	</button> : null}
																</div>
															</div>
														</div>
													</summary>

													<div className={'flex flex-row space-x-4 w-full py-4 px-4'}>
														<div className={'flex flex-col space-between w-full'}>
															<p className={'text-megaxs mb-2 text-black dark:text-white'}>{'BENEFIT'}</p>
															<p className={'text-megaxs leading-4 mb-4 text-black dark:text-white text-left md:text-justify'}>{feat?.benefit}</p>
														</div>
													</div>

												</details>
											);
										})
								}
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
}


export default Feats;