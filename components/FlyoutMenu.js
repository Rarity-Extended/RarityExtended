/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@MajorTom_eth
**	@Date:					Sunday September 12th 2021
**	@Filename:				FlyoutMenu.js
******************************************************************************/

import	React, {Fragment, useRef, useState, useEffect}	from	'react';
import	Link											from	'next/link';
import	Image											from	'next/image';
import	{useRouter}										from	'next/router';
import	{Popover, Transition}							from	'@headlessui/react';

function FlyoutMenu() {
	const	router = useRouter();
	const	timeoutDuration = 100;
	const	buttonRef = useRef(null);
	const	[openState, setOpenState] = useState(false);
	let 	timeout;

	const toggleMenu = () => {
		setOpenState((openState) => !openState);
		buttonRef?.current?.click();
	};

	const onHover = (open, action) => {
		if ((!open && !openState && action === 'onMouseEnter') || (open && action === 'onMouseLeave')) {
			clearTimeout(timeout);
			timeout = setTimeout(() => toggleMenu(open), timeoutDuration);
		}
	};

	const handleClick = () => {
		setOpenState(o => !o);
		clearTimeout(timeout);
		buttonRef?.current?.click();
	};

	const handleClickOutside = (event) => {
		if (buttonRef.current && !buttonRef.current.contains(event.target)) {
			event.stopPropagation();
		}
	};
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});

	return (
		<div onMouseLeave={() => onHover(open, 'onMouseLeave')}>
			<Popover className={'flex flex-row h-20 justify-center items-center md:relative'}>
				{({open}) => (
					<div onMouseEnter={() => onHover(open, 'onMouseEnter')}>
						<div onClick={handleClick} className={'group items-center justify-end flex-row flex mr-6 cursor-pointer outline-none focus:outline-none md:hidden'}>
							<div className={'flex items-center justify-center'}>
								<div className={`transform transition-all duration-700 md:group-hover:rotate-90 mb-0 mr-2 ${open ? 'rotate-90' : 'rotate-0'}`}>
									<div className={`cursor-pointer group-hover:opacity-100 text-xs md:text-sm ${router.pathname.startsWith('/town') || open ? 'opacity-100' : 'opacity-5'}`}>
										{'>'}
									</div>
								</div>
								<span className={'text-sm cursor-pointer uppercase'}>
									<span className={'text-xs hidden md:inline cursor-pointer'}>{'TOWN'}</span>
									<span className={'text-xs inline md:hidden cursor-pointer'}>{'TOWN'}</span>
								</span>
							</div>
							<Popover.Button ref={buttonRef} />
						</div>
						<div className={'group items-center justify-end flex-row mr-6 cursor-pointer outline-none focus:outline-none hidden md:flex'}>
							<div className={'flex items-center justify-center'}>
								<div className={`transform transition-all duration-700 md:group-hover:rotate-90 mb-0 mr-2 ${open ? 'rotate-90' : 'rotate-0'}`}>
									<div className={`cursor-pointer group-hover:opacity-100 text-xs md:text-sm ${router.pathname.startsWith('/town') || open ? 'opacity-100' : 'opacity-5'}`}>
										{'>'}
									</div>
								</div>
								<span className={'text-sm cursor-pointer uppercase'}>
									<span className={'text-xs hidden md:inline cursor-pointer'}>{'TOWN'}</span>
									<span className={'text-xs inline md:hidden cursor-pointer'}>{'TOWN'}</span>
								</span>
							</div>
							<Popover.Button ref={buttonRef} />
						</div>
						<Transition
							show={open}
							as={Fragment}
							enter={'transition ease-out duration-200'}
							enterFrom={'opacity-0 translate-y-1'}
							enterTo={'opacity-100 translate-y-0'}
							leave={'transition ease-in duration-150'}
							leaveFrom={'opacity-100 translate-y-0'}
							leaveTo={'opacity-0 translate-y-1'}>
							<Popover.Panel className={'absolute z-10 w-screen md:w-screen max-w-sm px-4 pt-7.5 md:pt-9 -left-4 -right-4 transform translate-x-0 md:-translate-x-1/2 md:left-1/2'}>
								<div className={'overflow-hidden shadow-xl ring-1 ring-black ring-opacity-5 border-4 border-black dark:border-dark-100'}>
									<div className={'relative grid gap-4 bg-white dark:bg-dark-400 p-2 md:p-6'}>
										<Link href={'/town/tavern'}>
											<a className={'flex items-center p-2 -m-3 transition duration-150 ease-in-out hover:bg-gray-50 dark:hover:bg-dark-300 focus:outline-none'}>
												<div className={'w-20 h-20 rounded-lg flex justify-center items-center'} style={{minWidth: 80}}>
													<Image
														src={'/menu/tavern.png'}
														loading={'eager'}
														width={80}
														height={80} />
												</div>
												<div className={'ml-4'}>
													<span className={'text-xs cursor-pointer uppercase'}>
														<span className={'hidden md:inline cursor-pointer'}>{'Tavern'}</span>
														<span className={'inline md:hidden cursor-pointer'}>{'Tavern'}</span>
													</span>
													<div className={'text-xxs cursor-pointer uppercase opacity-60 ml-0.5'}>
														<p>
															{'Best place to get some news!'}
														</p>
													</div>
												</div>
											</a>
										</Link>
										<Link href={'/town/blacksmith'}>
											<a className={'flex items-center p-2 -m-3 transition duration-150 ease-in-out hover:bg-gray-50 dark:hover:bg-dark-300 focus:outline-none'}>
												<div className={'w-20 h-20 rounded-lg flex justify-center items-center'} style={{minWidth: 80}}>
													<Image
														src={'/menu/blacksmith.png'}
														loading={'eager'}
														width={80}
														height={80} />
												</div>
												<div className={'ml-4'}>
													<span className={'text-xs cursor-pointer uppercase'}>
														<span className={'hidden md:inline cursor-pointer'}>{'BLACKSMITH'}</span>
														<span className={'inline md:hidden cursor-pointer'}>{'BLACKSMITH'}</span>
													</span>
													<div className={'text-xxs cursor-pointer uppercase opacity-60 ml-0.5'}>
														<p>
															{'Come and craft mighty armors!'}
														</p>
													</div>
												</div>
											</a>
										</Link>
										<Link href={'/town/quest'}>
											<a className={'flex items-center p-2 -m-3 transition duration-150 ease-in-out hover:bg-gray-50 dark:hover:bg-dark-300 focus:outline-none'}>
												<div className={'w-20 h-20 rounded-lg flex justify-center items-center'} style={{minWidth: 80}}>
													<Image
														src={'/menu/quest.png'}
														loading={'eager'}
														width={80}
														height={80} />
												</div>
												<div className={'ml-4'}>
													<span className={'text-xs cursor-pointer uppercase'}>
														<span className={'hidden md:inline cursor-pointer'}>{'QUEST OFFICE'}</span>
														<span className={'inline md:hidden cursor-pointer'}>{'QUEST OFFICE'}</span>
													</span>
													<div className={'text-xxs cursor-pointer uppercase opacity-60 ml-0.5'}>
														<p>
															{'Loot is not guaranteed.'}
														</p>
													</div>
												</div>
											</a>
										</Link>
										<Link href={'/town/market'}>
											<a className={'flex items-center p-2 -m-3 transition duration-150 ease-in-out hover:bg-gray-50 dark:hover:bg-dark-300 focus:outline-none'}>
												<div className={'w-20 h-20 rounded-lg flex justify-center items-center'} style={{minWidth: 80}}>
													<Image
														src={'/menu/market.png'}
														loading={'eager'}
														width={80}
														height={80} />
												</div>
												<div className={'ml-4'}>
													<span className={'text-xs cursor-pointer uppercase'}>
														<span className={'hidden md:inline cursor-pointer'}>{'MARKET'}</span>
														<span className={'inline md:hidden cursor-pointer'}>{'MARKET'}</span>
													</span>
													<div className={'text-xxs cursor-pointer uppercase opacity-60 ml-0.5'}>
														<p>
															{'Spend all your gold!'}
														</p>
													</div>
												</div>
											</a>
										</Link>
										<Link href={'/town/bank'}>
											<a className={'flex items-center p-2 -m-3 transition duration-150 ease-in-out hover:bg-gray-50 dark:hover:bg-dark-300 focus:outline-none'}>
												<div className={'w-20 h-20 rounded-lg flex justify-center items-center'} style={{minWidth: 80}}>
													<Image
														src={'/menu/banker.png'}
														loading={'eager'}
														width={80}
														height={80} />
												</div>
												<div className={'ml-4'}>
													<span className={'text-xs cursor-pointer uppercase'}>
														<span className={'hidden md:inline cursor-pointer'}>{'BANK'}</span>
														<span className={'inline md:hidden cursor-pointer'}>{'BANK'}</span>
													</span>
													<div className={'text-xxs cursor-pointer uppercase opacity-60 ml-0.5'}>
														<p>
															{'Trust us with your gold!'}
														</p>
													</div>
												</div>
											</a>
										</Link>
										<Link href={'/town/guild'}>
											<a className={'flex items-center p-2 -m-3 transition duration-150 ease-in-out hover:bg-gray-50 dark:hover:bg-dark-300 focus:outline-none'}>
												<div className={'w-20 h-20 rounded-lg flex justify-center items-center'} style={{minWidth: 80}}>
													<Image
														src={'/menu/banker.png'}
														loading={'eager'}
														width={80}
														height={80} />
												</div>
												<div className={'ml-4'}>
													<span className={'text-xs cursor-pointer uppercase'}>
														<span className={'hidden md:inline cursor-pointer'}>{'GUILD'}</span>
														<span className={'inline md:hidden cursor-pointer'}>{'GUILD'}</span>
													</span>
													<div className={'text-xxs cursor-pointer uppercase opacity-60 ml-0.5'}>
														<p>
															{'Get things done together!'}
														</p>
													</div>
												</div>
											</a>
										</Link>
									</div>
								</div>
							</Popover.Panel>
						</Transition>
					</div>
				)}
			</Popover>
		</div>
	);
}

export default FlyoutMenu;