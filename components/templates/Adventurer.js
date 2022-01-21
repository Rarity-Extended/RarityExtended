import	React						from	'react';
import	Link						from	'next/link';
import	{useRouter}					from	'next/router';
import	AdventurerDetails			from	'sections/adventurer/Wrapper';

function	Template({children}) {
	const	router = useRouter();

	return (
		<section className={'mt-24 md:mt-12 max-w-screen md:max-w-screen-xl mx-auto'}>
			<AdventurerDetails />

			<section className={'mt-6 max-w-screen md:max-w-screen-xl mx-auto'}>
				<div className={'flex flex-row items-center font-story mb-4 normal-case border-b-2 dark:border-b-dark-300'}>
					<Link href={'/'}>
						<p
							className={`p-4 pr-6 pl-0 text-plain text-sm transition-opacity hover:opacity-100 ${router.pathname === '/' || router.pathname === '/recruit' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
							{'Your Party'}
						</p>
					</Link>
					<Link href={'/adventures'}>
						<p
							className={`p-4 pr-6 pl-0 text-plain text-sm transition-opacity hover:opacity-100 ${router.pathname === '/adventures' || router.pathname.startsWith('/adventures') ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
							{'Adventures'}
						</p>
					</Link>
					<Link href={'/crafting'}>
						<p
							className={`p-4 pr-6 pl-0 text-plain text-sm transition-opacity hover:opacity-100 ${router.pathname === '/crafting' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
							{'Crafting'}
						</p>
					</Link>
					<Link href={'/skills'}>
						<p
							className={`p-4 pr-6 pl-0 text-plain text-sm transition-opacity hover:opacity-100 ${router.pathname === '/skills' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
							{'Skills'}
						</p>
					</Link>
					<Link href={'/feats'}>
						<p
							className={`p-4 pr-6 pl-0 text-plain text-sm transition-opacity hover:opacity-100 ${router.pathname === '/feats' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
							{'Feats'}
						</p>
					</Link>
					<Link href={'/bank'}>
						<p
							className={`p-4 pr-6 pl-0 text-plain text-sm transition-opacity hover:opacity-100 ${router.pathname === '/bank' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
							{'Bank'}
						</p>
					</Link>
				</div>
				{children}
			</section>
		</section>
	);
}

export default Template;
