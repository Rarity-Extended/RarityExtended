/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Friday October 15th 2021
**	@Filename:				TownWidget.js
******************************************************************************/

import  React       from    'react';
import  Link        from    'next/link';
import	{useRouter}	from	'next/router';
import {TOWN} from 'utils';

function Townwidget() {
	const	router = useRouter();
	if (router.pathname === '/') {
		return null;
	}
	return (
		<div className={'flex items-center w-full justify-center'}>
			<div>
				<div className={'mb-2 cursor-pointer text-center'}>
					<Link href={'/'}>
						<p className={'text-xxs opacity-60'}>
							{'< back to town hall'}
						</p>
					</Link>
				</div>
				<div>
					{'YOU ARE VISITING THE '}
					<span className={'text-tag-info'}>
						{Object.values(TOWN).find(town => town.href === router.pathname)?.label}
					</span>
				</div>
			</div>
		</div>
	);
}

export default Townwidget;
