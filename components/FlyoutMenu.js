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
		if ((!open && !openState && action === 'onMouseEnter') || (open && openState && action === 'onMouseLeave')) {
			clearTimeout(timeout);
			timeout = setTimeout(() => toggleMenu(open), timeoutDuration);
		}
	};

	const handleClick = (open) => {
		setOpenState(!open);
		clearTimeout(timeout);
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
		<div onMouseLeave={() => onHover(open, 'onMouseLeave')} className={'border-green-700'}>
			<Popover className={'relative flex flex-row h-20 justify-center items-center'}>
				{({open}) => (
					<div onMouseEnter={() => onHover(open, 'onMouseEnter')}>
						<Popover.Button ref={buttonRef} onClick={() => handleClick(open)} className={'flex flex-row items-center group cursor-pointer pr-10 border-r border-gray-200 outline-none focus:outline-none'}>
							<div className={'group items-center justify-end flex-row flex mr-6 cursor-pointer'} onClick={() => router.push('/tavern')}>
								<span>
									<span className={`cursor-pointer inline mb-1 mr-2 group-hover:opacity-100 text-xs md:text-sm ${router.pathname === '/tavern' ? 'opacity-100' : 'opacity-5'}`}>{'>'}</span>
									<span className={'text-sm cursor-pointer'}>
										<span className={'text-xs hidden md:inline cursor-pointer'}>{'Tavern'}</span>
										<span className={'text-xs inline md:hidden cursor-pointer'}>{'Tavern'}</span>
									</span>
								</span>
							</div>
						</Popover.Button>

						<Transition
							show={open}
							as={Fragment}
							enter={'transition ease-out duration-200'}
							enterFrom={'opacity-0 translate-y-1'}
							enterTo={'opacity-100 translate-y-0'}
							leave={'transition ease-in duration-150'}
							leaveFrom={'opacity-100 translate-y-0'}
							leaveTo={'opacity-0 translate-y-1'}>
							<Popover.Panel className={'absolute z-10 w-screen max-w-sm px-4 pt-8 transform -translate-x-1/2 left-1/2 sm:px-0 '}>
								<div className={'overflow-hidden rounded-md shadow-xl ring-1 ring-black ring-opacity-5 border border-gray-200'}>
									<div className={'relative grid gap-8 bg-white p-6 max-h-96 overflow-scroll'}>
										{/* {vaults.get().map((vault) => (
											<Link key={vault.address} href={`/vault/${vault.address}`}>
												<a className={'flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'}>
													<div className={'w-10 h-10 rounded-lg flex justify-center items-center'} style={{background: `linear-gradient(to top left, ${vault.colors[0]}, ${vault.colors[1]})`}}>
														<Image
															src={vault.glyph}
															objectFit={'contain'}
															loading={'eager'}
															width={24}
															height={24} />
													</div>
													<div className={'ml-4'}>
														<p className={'text-sm font-medium text-gray-900'}>
															{vault?.title || vault?.name}
														</p>
														<p className={'text-sm text-gray-500'}>
															{vault.address}
														</p>
													</div>
												</a>
											</Link>
										))} */}
									</div>
									<div className={'p-4 bg-gray-50'}>
										<a
											href={'##'}
											className={'flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'}
										>
											<span className={'flex items-center'}>
												<span className={'text-sm font-medium text-gray-900'}>
													{'Documentation'}
												</span>
											</span>
											<span className={'block text-sm text-gray-500'}>
												{'Get more insight on the vault and their features'}
											</span>
										</a>
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