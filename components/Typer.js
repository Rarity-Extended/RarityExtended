/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@MajorTom_eth
**	@Date:					Wednesday September 8th 2021
**	@Filename:				Typer.js
******************************************************************************/

import	React, {useState, useEffect, Fragment}	from	'react';

const	DEFAULT_SPEED = 15;
function	Typer({children, onDone, shouldStart = true}) {
	const	[idx, set_idx] = useState(0);

	useEffect(() => {
		if (!shouldStart)
			return;
		if (children.length <= idx) {
			return;
		}
		let	timer = window.setInterval(() => set_idx(v => v + 1), DEFAULT_SPEED);
		return () => window.clearInterval(timer);
	}, [shouldStart]);

	useEffect(() => {
		if (children.length <= idx && onDone) {
			onDone();
		}
	}, [idx]);

	useEffect(() => {
		set_idx(0);
	}, [children]);

	return <Fragment>{children.substr(0, idx)}</Fragment>;
}

export default Typer;
