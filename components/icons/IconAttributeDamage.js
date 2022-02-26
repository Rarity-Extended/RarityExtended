import	React	from	'react';

function	Icon({width = 16, height = 16, className, onClick}) {
	return (
		<svg onClick={onClick} width={width} height={height} className={className} viewBox={'0 0 512 512'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
			<g><path d={'M270.877 444.542C576.857 496.618 318.44 29.007 23.097 25.68 447.57-7.506 696.864 640.745 270.878 444.54z'} fill={'currentcolor'} fillOpacity={'1'}></path></g>
		</svg>
	);
}

export default Icon;
