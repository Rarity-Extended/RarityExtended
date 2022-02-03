import	React	from	'react';

function	Tooltip({children}) {
	return (
		<div className={'absolute invisible group-hover:visible mt-6 w-80 shadow-2xl'} style={{zIndex: 10000}}>
			<div className={'mx-auto font-normal bg-white dark:bg-dark-600 border-2 border-black dark:border-dark-100 text-plain'}>
				<div className={'p-2'}>
					{children}
				</div>
			</div>
		</div>
	);
}

export default Tooltip;