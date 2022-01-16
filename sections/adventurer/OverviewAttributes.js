import	React, {useState}			from	'react';
import	* as attributes				from	'utils/actions/attributes';
import	{xpRequired}				from	'utils/libs/rarity';
import	useWeb3						from	'contexts/useWeb3';
import	useRarity					from	'contexts/useRarity';
import	IconAttributeArmor			from	'components/icons/IconAttributeArmor';
import	IconAttributeAttack			from	'components/icons/IconAttributeAttack';
import	IconAttributeCharisma		from	'components/icons/IconAttributeCharisma';
import	IconAttributeConstitution	from	'components/icons/IconAttributeConstitution';
import	IconAttributeIntelligence	from	'components/icons/IconAttributeIntelligence';
import	IconAttributeDamage			from	'components/icons/IconAttributeDamage';
import	IconAttributeDexterity		from	'components/icons/IconAttributeDexterity';
import	IconAttributeStrength		from	'components/icons/IconAttributeStrength';
import	IconAttributeWisdom			from	'components/icons/IconAttributeWisdom';

function modifier_for_attribute(_attribute) {
	if (_attribute == 9) {
		return -1;
	}
	return Math.floor((_attribute - 10) / 2);
}
function health_by_class(_class) {
	const	health = [0, 12, 6, 8, 8, 10, 8, 10, 8, 6, 4, 4];
	return	health[_class];
}
function health_by_class_and_level(_class, _level, _const) {
	let _mod = modifier_for_attribute(_const);
	let _base_health = health_by_class(_class) + _mod;
	if (_base_health <= 0) {
		_base_health = 1;
	}
	return (_base_health * _level);
}
function base_attack_bonus_by_class(_class) {
	const	attackBonus = [0, 4, 3, 3, 3, 4, 3, 4, 4, 3, 2, 2];
	return	attackBonus[_class];
}
function base_attack_bonus_by_class_and_level(_class, _level) {
	return _level * base_attack_bonus_by_class(_class) / 4;
}
function attack_bonus(_class, _str, _level) {
	const	attack = base_attack_bonus_by_class_and_level(_class, _level) + modifier_for_attribute(_str);
	if (attack < 1) {
		return 1;
	}
	return attack;
}
function damage(_str) {
	const	_mod = modifier_for_attribute(_str);
	if (_mod <= 1) {
		return 1;
	}
	return (_mod);
}

function	AttributeSetter({adventurer, value, attributesAreInit, updateAttribute, set_updateAttribute, name}) {
	const	{provider} = useWeb3();
	const	{updateRarity} = useRarity();

	function pointCost(val) {
		if (val <= 14) {
			return val - 8;
		} else {
			return Math.floor(((val - 8)**2)/6);
		}
	}

	function	increaseStrength() {
		attributes.increaseStrength(
			{provider, adventurer: adventurer.tokenID},
			({error}) => {
				if (error)
					return console.error(error);
				updateRarity(adventurer.tokenID);
			}
		);
	}
	function	increaseDexterity() {
		attributes.increaseDexterity(
			{provider, adventurer: adventurer.tokenID},
			({error}) => {
				if (error)
					return console.error(error);
				updateRarity(adventurer.tokenID);
			}
		);
	}
	function	increaseConstitution() {
		attributes.increaseConstitution(
			{provider, adventurer: adventurer.tokenID},
			({error}) => {
				if (error)
					return console.error(error);
				updateRarity(adventurer.tokenID);
			}
		);
	}
	function	increaseIntelligence() {
		attributes.increaseIntelligence(
			{provider, adventurer: adventurer.tokenID},
			({error}) => {
				if (error)
					return console.error(error);
				updateRarity(adventurer.tokenID);
			}
		);
	}
	function	increaseWisdom() {
		attributes.increaseWisdom(
			{provider, adventurer: adventurer.tokenID},
			({error}) => {
				if (error)
					return console.error(error);
				updateRarity(adventurer.tokenID);
			}
		);
	}
	function	increaseCharisma() {
		attributes.increaseCharisma(
			{provider, adventurer: adventurer.tokenID},
			({error}) => {
				if (error)
					return console.error(error);
				updateRarity(adventurer.tokenID);
			}
		);
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

	if (!attributesAreInit) {
		return (
			<div className={'flex flex-row items-center'}>
				<div 
					onClick={() => {
						if (updateAttribute[name] === value || !(updateAttribute.remainingPoints >= 0))
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
					className={`text-xl -m-2 p-2 text-center font-story ${updateAttribute[name] === value || !(updateAttribute.remainingPoints >= 0) ? 'opacity-0' : 'cursor-pointer opacity-20 hover:opacity-100 transition-opacity select-none'}`}>
					{'-'}
				</div>
				<p className={'text-xl px-3'}>{updateAttribute[name]}</p>
				<div 
					onClick={() => {
						if (!(updateAttribute.remainingPoints >= 0))
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
					className={`text-xl -m-2 p-2 text-center font-story ${getNextRemainingPoints() < 0 || !(updateAttribute.remainingPoints >= 0) ? 'opacity-0' : 'cursor-pointer opacity-20 hover:opacity-100 transition-opacity select-none'}`}>
					{'+'}
				</div>
			</div>
		);
	}
	if (updateAttribute.extraPoints > updateAttribute.extraPointsSpents) {
		return (
			<div className={'flex flex-row items-center'}>
				<p className={'text-xl px-3'}>{value}</p>
				<div
					onClick={() => {
						if (name === 'strength') {
							increaseStrength();
						} else if (name === 'dexterity') {
							increaseDexterity();
						} else if (name === 'constitution') {
							increaseConstitution();
						} else if (name === 'intelligence') {
							increaseIntelligence();
						} else if (name === 'wisdom') {
							increaseWisdom();
						} else if (name === 'charisma') {
							increaseCharisma();
						}
					}}
					className={'text-xl -m-2 p-2 text-center opacity-20 hover:opacity-100 cursor-pointer font-story'}>
					{'+'}
				</div>
			</div>
		);
	}
	return (
		<div className={'flex flex-row items-center'}>
			<p className={'text-xl px-3'}>{value}</p>
			<div 
				className={'text-xl -m-2 p-2 text-center opacity-0 font-story'}>
				{'+'}
			</div>
		</div>
	);
}
function	FakeAttributeSetter({value}) {
	return (
		<div className={'flex flex-row items-center'}>
			<div 
				className={'text-xl -m-2 p-2 text-center opacity-0 font-story'}>
				{'-'}
			</div>
			<p className={'text-xl px-3'}>{value}</p>
			<div 
				className={'text-xl -m-2 p-2 text-center opacity-0 font-story'}>
				{'+'}
			</div>
		</div>
	);
}
function	OverviewAttributes({adventurer}) {
	const	{provider} = useWeb3();
	const	{rNonce, updateRarity} = useRarity();
	const	attributesAreInit = adventurer?.attributes?.isInit;
	const	[updateAttribute, set_updateAttribute] = useState({
		strength: adventurer?.attributes?.strength,
		dexterity: adventurer?.attributes?.dexterity,
		constitution: adventurer?.attributes?.constitution,
		intelligence: adventurer?.attributes?.intelligence,
		wisdom: adventurer?.attributes?.wisdom,
		charisma: adventurer?.attributes?.charisma,
		extraPoints: adventurer?.attributes?.extraPoints,
		extraPointsSpents: adventurer?.attributes?.extraPointsSpents,
		remainingPoints: adventurer?.attributes?.remainingPoints
	});

	React.useEffect(() => {
		set_updateAttribute({
			strength: adventurer?.attributes?.strength,
			dexterity: adventurer?.attributes?.dexterity,
			constitution: adventurer?.attributes?.constitution,
			intelligence: adventurer?.attributes?.intelligence,
			wisdom: adventurer?.attributes?.wisdom,
			charisma: adventurer?.attributes?.charisma,
			extraPoints: adventurer?.attributes?.extraPoints,
			extraPointsSpents: adventurer?.attributes?.extraPointsSpents,
			remainingPoints: adventurer?.attributes?.remainingPoints
		});
	}, [adventurer.tokenID, rNonce]);

	async function buyPoints() {
		if (updateAttribute.remainingPoints === 0) {
			attributes.setAttributes({
				provider,
				adventurer: adventurer.tokenID,
				_str: updateAttribute.strength,
				_dex: updateAttribute.dexterity,
				_const: updateAttribute.constitution,
				_int: updateAttribute.intelligence,
				_wis: updateAttribute.wisdom,
				_cha: updateAttribute.charisma
			}, ({error}) => {
				if (error)
					return console.error(error);
				set_updateAttribute(u => ({...u, remainingPoints: -1}));
				updateRarity(adventurer.tokenID);
			});
		}
	}

	function	renderSaveButtons() {
		if (!attributesAreInit) {
			return (
				<div
					onClick={() => updateAttribute.remainingPoints === 0 ? buyPoints() : null}
					className={`w-full text-sm normal-case font-bold text-highlight ${updateAttribute.remainingPoints === 0 ? 'cursor-pointer animate-pulse' : ''}`}>
					{
						updateAttribute.remainingPoints === 0 ?
							'Save attributes' :
							updateAttribute.remainingPoints === -1 ?
								'' :
								`${updateAttribute.remainingPoints} point${updateAttribute.remainingPoints > 1 ? 's' : ''} left`
					}
				</div>
			);
		}
		if (updateAttribute.extraPoints > updateAttribute.extraPointsSpents) {
			const	extraRemainingPoints = updateAttribute.extraPoints - updateAttribute.extraPointsSpents;
			return (
				<div className={`w-full text-sm normal-case font-bold text-highlight ${extraRemainingPoints === 0 ? 'cursor-pointer animate-pulse' : ''}`}>
					{extraRemainingPoints === 0 ? 
						'Save attributes' :
						`${extraRemainingPoints} point${extraRemainingPoints > 1 ? 's' : ''} left`
					}
				</div>
			);	
		}
		return (
			<div className={'w-full text-sm normal-case text-highlight font-bold opacity-0'}>
				{'Save attributes'}
			</div>
		);
	}

	const	health = health_by_class_and_level(adventurer.class, adventurer.level, adventurer.attributes.constitution);
	return (
		<div className={'flex flex-col items-center font-story w-full mt-auto'}>
			<div className={'grid grid-cols-2 gap-x-16 gap-y-2 w-full'}>
				<div className={'flex flex-row items-center justify-between'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeStrength width={16} height={16} />
						<p className={'text-xs normal-case ml-2'}>{'Strength'}</p>
					</div>
					<AttributeSetter
						adventurer={adventurer}
						attributesAreInit={attributesAreInit}
						updateAttribute={updateAttribute}
						set_updateAttribute={set_updateAttribute}
						name={'strength'}
						value={adventurer.attributes.strength} />
				</div>
				<div className={'flex flex-row items-center justify-between'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeDexterity width={16} height={16} />
						<p className={'text-xs normal-case ml-2'}>{'Dexterity'}</p>
					</div>
					<AttributeSetter
						adventurer={adventurer}
						attributesAreInit={attributesAreInit}
						updateAttribute={updateAttribute}
						set_updateAttribute={set_updateAttribute}
						name={'dexterity'}
						value={adventurer.attributes.dexterity} />
				</div>
				<div className={'flex flex-row items-center justify-between'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeConstitution width={16} height={16} />
						<p className={'text-xs normal-case ml-2'}>{'Constitution'}</p>
					</div>
					<AttributeSetter
						adventurer={adventurer}
						attributesAreInit={attributesAreInit}
						updateAttribute={updateAttribute}
						set_updateAttribute={set_updateAttribute}
						name={'constitution'}
						value={adventurer.attributes.constitution} />
				</div>
				<div className={'flex flex-row items-center justify-between'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeWisdom width={16} height={16} />
						<p className={'text-xs normal-case ml-2'}>{'Wisdom'}</p>
					</div>
					<AttributeSetter
						adventurer={adventurer}
						attributesAreInit={attributesAreInit}
						updateAttribute={updateAttribute}
						set_updateAttribute={set_updateAttribute}
						name={'wisdom'}
						value={adventurer.attributes.wisdom} />
				</div>
				<div className={'flex flex-row items-center justify-between'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeCharisma width={16} height={16} />
						<p className={'text-xs normal-case ml-2'}>{'Charisma'}</p>
					</div>
					<AttributeSetter
						adventurer={adventurer}
						attributesAreInit={attributesAreInit}
						updateAttribute={updateAttribute}
						set_updateAttribute={set_updateAttribute}
						name={'charisma'}
						value={adventurer.attributes.charisma} />
				</div>
				<div className={'flex flex-row items-center justify-between'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeIntelligence width={16} height={16} />
						<p className={'text-xs normal-case ml-2'}>{'Intelligence'}</p>
					</div>
					<AttributeSetter
						adventurer={adventurer}
						attributesAreInit={attributesAreInit}
						updateAttribute={updateAttribute}
						set_updateAttribute={set_updateAttribute}
						name={'intelligence'}
						value={adventurer.attributes.intelligence} />
				</div>

				<div className={'flex flex-row items-center justify-between'}>
					<div className={'flex flex-row items-center text-50'}>
						<IconAttributeAttack width={16} height={16} />
						<p className={'text-xs normal-case ml-2'}>{'Attack'}</p>
					</div>
					<FakeAttributeSetter value={attack_bonus(adventurer.class, adventurer.attributes.strength, adventurer.level)} />
				</div>
				<div className={'flex flex-row items-center justify-between'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeDamage width={16} height={16} />
						<p className={'text-xs normal-case ml-2'}>{'Damage'}</p>
					</div>
					<FakeAttributeSetter value={damage(adventurer.attributes.strength)} />
				</div>
				<div className={'flex flex-row items-center justify-between'}>
					<div className={'flex flex-row items-center opacity-60'}>
						<IconAttributeArmor width={16} height={16} />
						<p className={'text-xs normal-case ml-2'}>{'Armor'}</p>
					</div>
					<FakeAttributeSetter value={modifier_for_attribute(adventurer.attributes.dexterity)} />
				</div>
			</div>
			<div className={'absolute top-4 right-4'}>
				{renderSaveButtons()}
			</div>


			<div className={'w-full mt-9'}>
				<div className={'w-full flex flex-row justify-between items-center font-bold text-xs opacity-60 normal-case mb-1'}>
					<div>{'Health'}</div>
					<div>{`${health} / ${health}`}</div>
				</div>
				<div className={'w-full h-4'}>
					<div className={'bg-600 h-2 flex w-full relative overflow-hidden'}>
						<div className={'absolute left-0 inset-y-0 h-2 bg-tag-withdraw'} style={{width: '100%'}} />
					</div>
				</div>
			</div>

			<div className={'w-full mt-1'}>
				<div className={'w-full flex flex-row justify-between items-center font-bold text-xs opacity-60 normal-case mb-1'}>
					<div>{`Level ${adventurer.level}`}</div>
					<div>{`${Number(adventurer.xp)} / ${xpRequired(adventurer.level)}`}</div>
				</div>
				<div className={'w-full h-4'}>
					<div className={'bg-600 h-2 flex w-full relative overflow-hidden'}>
						<div
							className={'absolute left-0 inset-y-0 h-2 bg-tag-warning'}
							style={{width: `${Number(adventurer.xp) / xpRequired(adventurer.level) * 100}%`}} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default OverviewAttributes;