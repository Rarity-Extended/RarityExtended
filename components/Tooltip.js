import	React	from	'react';

function	Tooltip({children}) {
	return (
		<div className={'invisible group-hover:visible absolute mt-6 w-80 shadow-2xl'} style={{zIndex: 10000}}>
			<div className={'bg-white dark:bg-dark-600 border-2 border-black dark:border-dark-100 mx-auto text-black dark:text-white font-normal'}>
				<div className={'p-2'}>
					{children}
				</div>
			</div>
		</div>
	);
}

export default Tooltip;