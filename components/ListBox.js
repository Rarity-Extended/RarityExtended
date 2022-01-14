/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Wednesday September 22nd 2021
**	@Filename:				ListBox.js
******************************************************************************/

import	React, {Fragment, useRef, useState}		from	'react';
import	{Listbox, Transition}					from	'@headlessui/react';
import	Chevron									from	'components/Chevron';
import	Box										from	'components/Box';
import	useOnClickOutside						from	'hook/useOnClickOutside';

function	Crafting({options, selected, set_selected, className}) {
	const	[isOpen, set_isOpen] = useState(false);
	const	ref = useRef();

	useOnClickOutside(ref, () => {
		set_isOpen(false);
	});

	return (
		<Listbox value={selected} onChange={set_selected} onClick={() => set_isOpen(!isOpen)}>
			<div className={'relative'} ref={ref}>
				<Listbox.Button
					className={`flex flex-row items-center p-2 cursor-pointer text-plain mr-4 dark:hover:bg-dark-400 hover:bg-gray-secondary text-megaxs border-none uppercase relative ${isOpen ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white focus:bg-gray-secondary dark:bg-dark-600 dark:focus:bg-dark-400'} ${className}`}>
					<span className={'block truncate'}>{selected.name}</span>
					<div className={'ml-auto pl-2'}>
						<Chevron width={6} height={6} className={'select-none transform rotate-90 text-plain'} />
						<Chevron width={6} height={6} className={'select-none transform -rotate-90 text-plain'} />
					</div>
				</Listbox.Button>
				<Transition
					show={isOpen}
					as={Fragment}
					leave={'transition ease-in duration-100'}
					leaveFrom={'opacity-100'}
					leaveTo={'opacity-0'}>
					<Listbox.Options
						static
						className={'absolute text-sx bg-white dark:bg-dark-600 max-h-48 focus:outline-none z-20 min-w-full left-0 right-0 top-full shadow-xl'}>
						<Box className={'mt-1 py-0'}>
							{options.map((person, personIdx) => (
								<Listbox.Option
									key={personIdx}
									className={({active}) => `${active ? 'bg-gray-secondary dark:bg-dark-400' : 'bg-white hover:bg-gray-secondary dark:bg-dark-600 dark:hover:bg-dark-400'} cursor-pointer select-none relative p-2`}
									value={person}>
									<span className={'block truncate'}>
										{person.name}
									</span>
								</Listbox.Option>
							))}
						</Box>
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	);
}

export default Crafting;