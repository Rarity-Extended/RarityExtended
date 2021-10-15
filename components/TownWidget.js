/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Friday October 15th 2021
**	@Filename:				TownWidget.js
******************************************************************************/

import  React       from    'react';
import  Box         from    './Box';
import  Link        from    'next/link';
import  Image       from    'next/image';

function Townwidget({location}) {
	return (
		<Box className={'flex items-center p-6 dark:bg-dark-400'}>
			<div className={'w-22 h-22 rounded-lg flex justify-center items-center mr-4'}>
				<Image
					src={location.icon}
					loading={'eager'}
					width={80}
					height={80} />
			</div>
			<div>
				<div className={'mb-2 cursor-pointer'}>
					<Link href={'/'}>
						<p className={'text-xxs opacity-60'}>
							{'< back to town hall'}
						</p>
					</Link>
				</div>
				<div>
					{'YOU ARE NOW IN THE '}
					<span className={'text-tag-info'}>
						{location.label}
					</span>
				</div>
			</div>
		</Box>
	);
}

export default Townwidget;
