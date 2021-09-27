/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Wednesday September 8th 2021
**	@Filename:				Typer.js
******************************************************************************/
/* eslint-disable react-hooks/exhaustive-deps */

import	React, {useState, useEffect, Fragment}	from	'react';

const	DEFAULT_SPEED = 15;
function	Typer({children, onDone, shouldStart = true, speed = DEFAULT_SPEED}) {
	const	[idx, set_idx] = useState(0);

	useEffect(() => {
		if (!shouldStart)
			return;
		if (children.length <= idx) {
			return;
		}
		let	timer = window.setInterval(() => set_idx(v => v + 1), speed);
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
