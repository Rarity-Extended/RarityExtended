/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 25th 2021
**	@Filename:				ButtonCounter.js
******************************************************************************/

import	React		from	'react';
import ButtonCounterBase	 from	 'components/ButtonCounterBase';

function	ButtonCounter({
	className,
	threshold,
	value,
	inc,
	dec,
	max,
	setMin,
	isMax,
	backgroundColor
}) {
	function	onDecrease() {
		if (value - threshold >= 0) {
			dec();
		} else {
			setMin();
		}
	}
	function	onIncrease() {
		if (isMax) {
			return;
		}
		if (value + threshold <= max) {
			inc();
		}
	}
	return <ButtonCounterBase 
		className={className}
		threshold={threshold}
		value={value}
		onIncrement={onIncrease}
		onDecrement={onDecrease}
		backgroundColor={backgroundColor}
	/>;
}

export default ButtonCounter;