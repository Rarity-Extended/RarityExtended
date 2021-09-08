/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@MajorTom_eth
**	@Date:					Wednesday September 8th 2021
**	@Filename:				Typer.js
******************************************************************************/

import	React, {useState, useEffect}	from	'react';

function	Typer({children}) {
	const	[idx, set_idx] = useState(0);

	useEffect(() => {
		if (children.length < idx) {
			return;
		}
		const timer = window.setInterval(() => set_idx(v => v + 1), 50);
		return () => window.clearInterval(timer);
	});

	return <>{children.substr(0, idx)}</>;
}

export default Typer;
