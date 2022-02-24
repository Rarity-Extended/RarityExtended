import	React							from	'react';
import	Link							from	'next/link';
import	{useRouter}						from	'next/router';
import	RarityCareSystem				from	'components/RarityCareSystem';
import	MobileDetails					from	'components/MobileDetails';
import	AdventurerDetails				from	'components/sections/Adventurer';

const MobileIndex = React.memo(function MobileIndex() {
	const	router = useRouter();

	return (
		<div className={'relative flex-1 mt-0'}>
			<AdventurerDetails media={'sm'} />
			<section className={'grid grid-cols-2 gap-2 my-4'}>
				<Link href={'/party'}>
					<button
						className={`box p-4 text-plain text-sm text-center transition-opacity ${router.pathname === '/' || router.pathname === '/recruit' ? '' : 'cursor-pointer'}`}>
						{'Your Party'}
					</button>
				</Link>
				<Link href={'/adventures'}>
					<button
						className={`box p-4 text-plain text-sm text-center transition-opacity ${router.pathname === '/adventures' || router.pathname.startsWith('/adventures') ? '' : 'cursor-pointer'}`}>
						{'Adventures'}
					</button>
				</Link>
				<Link href={'/equipment'}>
					<button
						className={`box p-4 text-plain text-sm text-center transition-opacity ${router.pathname === '/equipment' ? '' : 'cursor-pointer'}`}>
						{'Equipment'}
					</button>
				</Link>
				<Link href={'/crafting'}>
					<button
						className={`box p-4 text-plain text-sm text-center transition-opacity ${router.pathname === '/crafting' ? '' : 'cursor-pointer'}`}>
						{'Crafting'}
					</button>
				</Link>
				<Link href={'/skills'}>
					<button
						className={`box p-4 text-plain text-sm text-center transition-opacity ${router.pathname === '/skills' ? '' : 'cursor-pointer'}`}>
						{'Skills'}
					</button>
				</Link>
				<Link href={'/feats'}>
					<button
						className={`box p-4 text-plain text-sm text-center transition-opacity ${router.pathname === '/feats' ? '' : 'cursor-pointer'}`}>
						{'Feats'}
					</button>
				</Link>
				<Link href={'/farming'}>
					<button
						className={`box p-4 text-plain text-sm text-center transition-opacity ${router.pathname === '/farming' ? '' : 'cursor-pointer'}`}>
						{'Farming'}
					</button>
				</Link>
				<Link href={'/bank'}>
					<button
						className={`box p-4 text-plain text-sm text-center transition-opacity ${router.pathname === '/bank' ? '' : 'cursor-pointer'}`}>
						{'Bank'}
					</button>
				</Link>
			</section>
			<RarityCareSystem minimal/>
			<MobileDetails />
		</div>
	);
});

export default MobileIndex;
