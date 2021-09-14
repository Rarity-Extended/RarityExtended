/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@MajorTom_eth
**	@Date:					Thursday September 9th 2021
**	@Filename:				Icon.js
******************************************************************************/

import	React	from	'react';

function	Icon({width = 16, height = 16, className}) {
	return (
		<svg width={width} height={height} className={className} viewBox={'0 0 24 24'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
			<path d={'M13.4286 21L18 21L18 19.2L16.1429 19.2L16.1429 17.4L14.2857 17.4L14.2857 15.6L12.4286 15.6L12.4286 13.8L10.5714 13.8L10.5714 10.2L12.4286 10.2L12.4286 8.4L14.2857 8.4L14.2857 6.6L16.1429 6.6L16.1429 4.8L18 4.8L18 3L13.4286 3L13.4286 4.8L11.5714 4.8L11.5714 6.6L9.71429 6.6L9.71429 8.4L7.85714 8.4L7.85714 10.2L6 10.2L6 13.8L7.85714 13.8L7.85714 15.6L9.71429 15.6L9.71429 17.4L11.5714 17.4L11.5714 19.2L13.4286 19.2L13.4286 21Z'} fill={'#333333'}/>

		</svg>
	);
}

export default Icon;
