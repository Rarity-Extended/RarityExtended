/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 19th 2021
**	@Filename:				Attributes.js
******************************************************************************/

import	React, {useState}			from	'react';
import	{setAttributes}				from	'utils/actions';
import	Box							from	'components/Box';

function	Attribute({isInit, name, value, updateAttribute, set_updateAttribute, toUpdate}) {
	function pointCost(val) {
		if (val <= 14) {
			return val - 8;
		} else {
			return Math.floor(((val - 8)**2)/6);
		}
	}

	const	getPreviousRemainingPoints = () => {
		let	_remainingPoints = updateAttribute.remainingPoints;
		let _pointsToRemove = pointCost(updateAttribute[name] - 1) - pointCost(updateAttribute[name]);
		_remainingPoints = _remainingPoints - _pointsToRemove;
		return (_remainingPoints);
	};
	const	getNextRemainingPoints = () => {
		let	_remainingPoints = updateAttribute.remainingPoints;
		let _pointsToRemove = pointCost(updateAttribute[name]) - pointCost(updateAttribute[name] + 1);
		_remainingPoints = _remainingPoints + _pointsToRemove;
		return (_remainingPoints);
	};

	return (
		<div className={'flex flex-row items-center w-full py-2'}>
			<div className={'opacity-80 text-xs md:text-sm'}>{`${name}: `}</div>
			<div className={'w-full text-right'}>
				<div className={'flex flex-row items-center justify-end'}>
					<div 
						onClick={() => {
							if (isInit || updateAttribute[name] === value || !toUpdate)
								return;
							const	previousRemainingPoints = getPreviousRemainingPoints();
							if (updateAttribute.remainingPoints !== updateAttribute.maxPoints) {
								set_updateAttribute(u => ({
									...u,
									[name]: u[name] - 1,
									remainingPoints: previousRemainingPoints
								}));
							}
						}}
						className={`text-sm w-4 text-left ${isInit || updateAttribute[name] === value || !toUpdate ? 'opacity-0' : 'cursor-pointer'}`}>
						{'-'}
					</div>
					<div className={'w-9 text-center'}>{updateAttribute[name]}</div>
					<div 
						onClick={() => {
							if (isInit || !toUpdate)
								return;
							const	nextRemainingPoints = getNextRemainingPoints();
							if (getNextRemainingPoints() >= 0) {
								set_updateAttribute(u => ({
									...u,
									[name]: u[name] + 1,
									remainingPoints: nextRemainingPoints
								}));
							}
						}}
						className={`text-sm w-4 text-right ${isInit || getNextRemainingPoints() < 0 || !toUpdate ? 'opacity-0' : 'cursor-pointer'}`}>
						{'+'}
					</div>
				</div>
			</div>
		</div>
	);
}
function	Attributes({adventurer, updateRarity, provider}) {
	const	[updateAttribute, set_updateAttribute] = useState({
		strength: adventurer?.attributes?.strength,
		dexterity: adventurer?.attributes?.dexterity,
		constitution: adventurer?.attributes?.constitution,
		intelligence: adventurer?.attributes?.intelligence,
		wisdom: adventurer?.attributes?.wisdom,
		charisma: adventurer?.attributes?.charisma,
		maxPoints: adventurer?.attributes?.maxPoints,
		remainingPoints: adventurer?.attributes?.remainingPoints
	});

	async function buyPoints() {
		if (updateAttribute.remainingPoints === 0) {
			setAttributes({
				provider,
				_summoner: adventurer.tokenID,
				_str: updateAttribute.strength,
				_dex: updateAttribute.dexterity,
				_const: updateAttribute.constitution,
				_int: updateAttribute.intelligence,
				_wis: updateAttribute.wisdom,
				_cha: updateAttribute.charisma
			}, ({error, data}) => {
				if (error) {
					return console.error(error);
				}
				set_updateAttribute(u => ({
					...u,
					remainingPoints: -1
				}));
				updateRarity(data._summoner);
			});
		}
	}

	return (
		<Box className={'nes-container pt-6 pb-0 px-4 with-title w-full md:w-1/3 -mt-1 md:mt-0'}>
			<div className={'title bg-white dark:bg-dark-600 z-50 relative'} style={{paddingTop: 2}}>{'Attributes'}</div>
			{updateAttribute.remainingPoints >= 0 ? (
				<p onClick={buyPoints} className={`text-xss border-t-2 border-b-2 border-black dark:border-dark-100 flex flex-center py-1 my-2 ${updateAttribute.remainingPoints === 0 ? 'animate-pulse text-center cursor-pointer hover:bg-black hover:animate-none hover:text-white' : ''}`}>
					{updateAttribute.remainingPoints === 0 ?
						'▶ Save you stats ! ◀'
						:
						`▶ You have ${updateAttribute.remainingPoints} points to spend ! ◀`
					}
				</p>
			) : null}
			<Attribute
				isInit={adventurer?.attributes?.isInit}
				value={adventurer.attributes.strength}
				updateAttribute={updateAttribute}
				set_updateAttribute={set_updateAttribute}
				toUpdate={updateAttribute.remainingPoints >= 0}
				name={'strength'} />
			<Attribute
				isInit={adventurer?.attributes?.isInit}
				value={adventurer.attributes.dexterity}
				updateAttribute={updateAttribute}
				set_updateAttribute={set_updateAttribute}
				toUpdate={updateAttribute.remainingPoints >= 0}
				name={'dexterity'} />
			<Attribute
				isInit={adventurer?.attributes?.isInit}
				value={adventurer.attributes.constitution}
				updateAttribute={updateAttribute}
				set_updateAttribute={set_updateAttribute}
				toUpdate={updateAttribute.remainingPoints >= 0}
				name={'constitution'} />
			<Attribute
				isInit={adventurer?.attributes?.isInit}
				value={adventurer.attributes.intelligence}
				updateAttribute={updateAttribute}
				set_updateAttribute={set_updateAttribute}
				toUpdate={updateAttribute.remainingPoints >= 0}
				name={'intelligence'} />
			<Attribute
				isInit={adventurer?.attributes?.isInit}
				value={adventurer.attributes.wisdom}
				updateAttribute={updateAttribute}
				set_updateAttribute={set_updateAttribute}
				toUpdate={updateAttribute.remainingPoints >= 0}
				name={'wisdom'} />
			<Attribute
				isInit={adventurer?.attributes?.isInit}
				value={adventurer.attributes.charisma}
				updateAttribute={updateAttribute}
				set_updateAttribute={set_updateAttribute}
				toUpdate={updateAttribute.remainingPoints >= 0}
				name={'charisma'} />
		</Box>
	);
}

export default Attributes;