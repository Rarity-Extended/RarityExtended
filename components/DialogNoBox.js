/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Thursday September 9th 2021
**	@Filename:				DialogBox.js
******************************************************************************/

import	React			from	'react';

function	Index({options}) {
	return (
		<div className={'flex flex-col w-full mt-2'}>
			{options.map((opt, index) => (
				<div
					key={index}
					className={'py-2 px-2 group hover:bg-gray-principal dark:hover:bg-dark-300 cursor-pointer bg-white dark:bg-dark-600'}
					style={{cursor: 'pointer'}}
					onClick={() => {
						opt.onClick();
					}}>
					<span className={'cursor-pointer'} style={{cursor: 'pointer'}}>
						<span className={'inline mb-1 mr-2 opacity-20 group-hover:opacity-100'} style={{cursor: 'pointer'}}>{'>'}</span>
						<span className={'cursor-pointer'} style={{cursor: 'pointer'}}>{opt.label}</span>
					</span>
				</div>	
			))}
		</div>
	);
}

export default Index;
