import	React	from	'react';

function	Tooltip({children, className = 'mt-6 w-80'}) {
	return (
		<div className={`absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity shadow-2xl ${className}`} style={{zIndex: 10000}}>
			<div className={'mx-auto font-normal box-darker-with-border text-plain'}>
				<div className={'p-2'}>
					{children}
				</div>
			</div>
		</div>
	);
}

export default Tooltip;