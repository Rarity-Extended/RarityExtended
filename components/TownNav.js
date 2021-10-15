/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Friday October 15th 2021
**	@Filename:				TownNav.js
******************************************************************************/

import  {TOWN}    from    'utils';
import  React       from    'react';
import  Box         from    './Box';
import	Image       from    'next/image';
import	Link        from    'next/link';

function TownItem({location}) {
	return (
		<Link href={location.href}>
			<Box className={'p-6 cursor-pointer dark:bg-dark-400 hover:bg-gray-principal dark:hover:bg-items-rare'}>
				<span className={'flex items-center'}>
					<div className={'w-16 h-16 rounded-lg flex justify-center items-center mr-4'}>
						<Image
							src={location.icon}
							loading={'eager'}
							width={80}
							height={80} />
					</div>
					<div className={'flex flex-col items-start'}>
						<h4>
							{location.label}
						</h4>
						<p className={'text-xxs opacity-60'}>
							{location.text}
						</p>
					</div>
				</span>
			</Box>
		</Link>
	);
}

function TownNav() {
	return (
		<div className={'max-w-screen-lg w-full mx-auto'}>
			<div>
				<h2 className={'text-xl'}>
					{'TOWN HALL'}
				</h2>
				<p className={'text-xs opacity-60 mt-2'}>
					{'You can navigate the town through this widget.'}
				</p>
			</div>
			<div className={'grid grid-cols-3 grid-rows-2 gap-8 mt-8 mb-24'}>
				{
					Object.keys(TOWN).map(key => {
						return (
							<TownItem location={TOWN[key]} key={key} />
						);
					})
				}
			</div>
		</div>
	);
}

export default TownNav;
