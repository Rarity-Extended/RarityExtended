/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday October 16th 2021
**	@Filename:				TownNav.js
******************************************************************************/

import  {TOWN}    	from    'utils';
import  React       from    'react';
import	Image       from    'next/image';
import	Link        from    'next/link';

function TownItem({location}) {
	return (
		<Link href={location.href}>
			<div className={'p-2 cursor-pointer hover:bg-gray-principal dark:hover:bg-dark-400'}>
				<span className={'flex items-center'}>
					<div className={'w-16 h-16 rounded-lg flex justify-center items-center mr-4'}>
						<Image
							src={location.icon}
							loading={'eager'}
							width={80}
							height={80} />
					</div>
					<div className={'flex flex-col items-start'}>
						<h4 className={'text-xs mb-1'}>
							{location.label}
						</h4>
						<p className={'text-xxs opacity-60'}>
							{location.text}
						</p>
					</div>
				</span>
			</div>
		</Link>
	);
}

function TownNav({start = 0, step = 6}) {
	return (
		<div className={'grid gap-0 md:gap-4 grid-cols-1 md:grid-cols-2 font-title uppercase text-black dark:text-white'}>
			{
				Object.keys(TOWN)
					.slice(start, start + step)
					.map(key => {
						return (
							<TownItem location={TOWN[key]} key={key} />
						);
					})
			}
		</div>
	);
}

export default TownNav;
