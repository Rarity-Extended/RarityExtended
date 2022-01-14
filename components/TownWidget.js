/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Friday October 15th 2021
**	@Filename:				TownWidget.js
******************************************************************************/

import  React       		from    'react';
import  Link        		from    'next/link';
import	{useRouter}			from	'next/router';
import	{TOWN, ADVENTURES}		from	'utils';

function Townwidget() {
	const	router = useRouter();
	if (router.pathname === '/') {
		return null;
	}
	if (router.pathname.startsWith('/adventures/')) {
		if (Object.values(ADVENTURES).find(quest => quest.href === router.pathname)) {
			return (
				<div className={'flex flex-center w-full mt-6 md:mt-0'}>
					<div>
						<div className={'mb-2 cursor-pointer text-center'}>
							<Link href={'/'}>
								<p className={'text-xxs opacity-60'}>
									{'< back to town hall'}
								</p>
							</Link>
						</div>
						<div className={'text-xs md:text-base text-center leading-loose'}>
							{'YOU ARE DOING THE '}
							<span className={'text-tag-info'}>
								{`“${Object.values(ADVENTURES).find(quest => quest.href === router.pathname)?.label}”`}
							</span>
							{' QUEST'}
						</div>
					</div>
				</div>
			);
		}
	}
	if (Object.values(TOWN).find(town => town.href === router.pathname)) {
		return (
			<div className={'flex flex-center w-full mt-6 md:mt-0'}>
				<div>
					<div className={'mb-2 cursor-pointer text-center'}>
						<Link href={'/'}>
							<p className={'text-xxs opacity-60'}>
								{'< back to town hall'}
							</p>
						</Link>
					</div>
					<div className={'text-xs md:text-base text-center leading-loose'}>
						{'YOU ARE VISITING THE '}
						<span className={'text-tag-info'}>
							{Object.values(TOWN).find(town => town.href === router.pathname)?.label}
						</span>
					</div>
				</div>
			</div>
		);
	}
	return null;
}

export default Townwidget;
