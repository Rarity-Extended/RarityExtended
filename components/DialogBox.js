/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@MajorTom_eth
**	@Date:					Thursday September 9th 2021
**	@Filename:				DialogBox.js
******************************************************************************/

import	React, {useEffect, useState}	from	'react';
import	Chevron							from	'components/Chevron';
import	useKeyPress						from	'hook/useKeyPress';

function	Index({options}) {
	const	[option, set_option] = useState(0);
	const	keyUp = useKeyPress('ArrowUp');
	const	keyDown = useKeyPress('ArrowDown');
	const	keyEnter = useKeyPress('Enter');

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
		<div className={'flex flex-col w-full'}>
			<div>
				<div className={'nes-container mt-0 text-sm mb-8'}>
					{options.map((opt, index) => (
						<div
							key={index}
							className={`py-4 px-2 group hover:bg-gray-50 cursor-pointer ${option === index ? 'bg-gray-50' : 'bg-white'}`}
							style={{cursor: 'pointer'}}
							onClick={() => {
								set_option(index);
								opt.onClick();
							}}>
							<label className={'cursor-pointer'} style={{cursor: 'pointer'}}>
								<Chevron width={12} height={12} className={`inline mb-1 mr-2 group-hover:opacity-100 ${option === index ? 'opacity-100' : 'opacity-5'}`}/>
								<span className={'cursor-pointer'} style={{cursor: 'pointer'}}>{opt.label}</span>
							</label>
						</div>	
					))}
				</div>
			</div>
		</div>
	);
}

export default Index;
