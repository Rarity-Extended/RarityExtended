import	React	from	'react';

function	Icon({width = 16, height = 16, className, onClick}) {
	return (
		<svg onClick={onClick} width={width} height={height} className={className} viewBox={'0 0 512 512'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
			<g><path d={'M128.842 62.334c-23.151 0-43.737 5.138-59.522 17.666-104.521 82.955 16 400 16 400h400S62.472 282.86 142.142 144c36.264-63.205 188.819 28.358 236.457 59.102-13.827 12.298-36.347 21.55-62.675 35.735 42.774 7.379 107.957-6.075 133.072-19.825-16.707-54.737-41.265-98.913-83.787-123.87 12.637 27.463 22.197 50.35 23.248 70.883-27.068-17.556-164.658-103.69-259.615-103.691z'} fill={'currentcolor'} fillOpacity={'1'}></path></g>
		</svg>
	);
}

export default Icon;
