/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 19th 2021
**	@Filename:				Feats.js
******************************************************************************/

import	React, {Fragment, useState}						from	'react';
import	ModalFeats										from 	'components/ModalFeats';
import	{featsPerClass, initialFeatsPerClass}			from	'utils/libs/rarityFeats';
import	FEATS											from	'utils/codex/feats.json';

function	Feats({adventurer, updateRarity, provider}) {
	const	_maxFeatsForAventurer = featsPerClass(adventurer.class, adventurer?.level);
	const	_initialFeatsPerClass = initialFeatsPerClass(adventurer.class);
	const	_adventurerFeats = adventurer.feats || [];
	const	_unlockedFeats = [...new Set([..._initialFeatsPerClass, ..._adventurerFeats])];
	const	_pointLefts = _maxFeatsForAventurer - _unlockedFeats.length;
	const	[isOpen, set_isOpen] = useState(false);

	function closeModal() {
		set_isOpen(false);
	}
  
	function openModal() {
		set_isOpen(true);
	}

	function	renderFeats() {
		const	feats = Object.values(FEATS).filter((feat) => {
			return _unlockedFeats.includes(feat.id);
		});

		const	featList = (feats).map((feat) => {
			return (
				<div className={'flex flex-row space-x-4 w-full mb-6'} key={`${adventurer.tokenID}-${feat.name}`}>
					<div className={'flex flex-col justify-between'}>
						<p className={'text-xs pb-1'}>{feat?.name}</p>
						<p className={'text-megaxs mt-auto'}>{feat?.benefit}</p>
					</div>
				</div>
			);
		});

		return (
			<div className={'flex flex-col md:flex-row w-full space-x-0 md:space-x-2'}>
				<div className={'w-full px-4 -mb-6'}>
					<div className={'flex w-full md:w-1/2 pr-4'}>
						<div
							onClick={openModal}
							className={'border-4 border-black dark:border-dark-100 px-10 py-2 text-plain hover:bg-gray-secondary dark:hover:bg-dark-400 cursor-pointer transition-colors flex flex-center text-center text-xs w-full'}>
							<p className={'whitespace-nowrap'}>{'FEAT LIST'}</p>
							{_pointLefts > 0 ? <p className={'inline text-megaxs ml-2'}>
								{`(POINTS LEFT: ${_pointLefts})`}
							</p> : null}
						</div>
					</div>
					<div className={'w-full grid grid-cols-1 pt-6'}>
						{featList}
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			{renderFeats()}
			<ModalFeats
				adventurer={adventurer}
				updateRarity={updateRarity}
				provider={provider}
				isOpen={isOpen}
				closeModal={closeModal} />
		</>
	);
}

export default Feats;