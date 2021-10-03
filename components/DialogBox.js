/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Thursday September 9th 2021
**	@Filename:				DialogBox.js
******************************************************************************/

import	React, {useEffect, useState}	from	'react';
import	useKeyPress						from	'hook/useKeyPress';
import	Box								from	'components/Box';

function	Index({options, nonce, selectedOption = -1}) {
	const	[option, set_option] = useState(selectedOption > 0 ? selectedOption : 0);
	const	keyUp = useKeyPress('ArrowUp');
	const	keyDown = useKeyPress('ArrowDown');
	const	keyEnter = useKeyPress('Enter');

	useEffect(() => {
		if (selectedOption !== -1)
			set_option(selectedOption);
	}, [selectedOption, nonce]);

	useEffect(() => {
		if (keyDown)
			set_option(_option => _option < options.length - 1 ? _option + 1 : options.length - 1);
		if (keyUp)
			set_option(_option => _option > 0 ? _option - 1 : 0);
		if (keyEnter)
			options[option].onClick();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keyDown, keyUp, keyEnter]);

	return (
		<div className={'flex flex-col w-full mb-6'}>
			<div>
				<Box className={'p-2 md:p-4'}>
					{options.map((opt, index) => (
						<div
							key={index}
							className={`py-3 px-2 group hover:bg-gray-principal dark:hover:bg-dark-400 cursor-pointer ${option === index ? 'bg-gray-principal dark:bg-dark-400' : 'bg-white dark:bg-dark-600'}`}
							style={{cursor: 'pointer'}}
							onClick={() => {
								set_option(index);
								opt.onClick();
							}}>
							<span className={'cursor-pointer'} style={{cursor: 'pointer'}}>
								<span className={`inline mb-1 mr-2 group-hover:opacity-100 ${option === index ? 'opacity-100' : 'opacity-5'}`} style={{cursor: 'pointer'}}>{'>'}</span>
								<span className={'cursor-pointer text-xs'} style={{cursor: 'pointer'}}>{opt.label}</span>
							</span>
						</div>	
					))}
				</Box>
			</div>
		</div>
	);
}

export default Index;
