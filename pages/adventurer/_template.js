import	React						from	'react';
import	Link						from	'next/link';
import	{useRouter}					from	'next/router';
import	useWeb3						from	'contexts/useWeb3';
import	useRarity					from	'contexts/useRarity';
import	IconBag						from	'components/icons/IconBag';
import	AdventurerDetails			from	'sections/adventurer/Wrapper';

function	IconFeats() {
	return (
		<svg xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'} className={'w-10 h-10 text-plain'}>
			<g><path d={'M282.063 20.938c-18.876 0-33.875 15.56-33.875 34.437 0 18.877 15 33.875 33.875 33.875s33.875-14.998 33.875-33.875c0-18.875-15-34.438-33.875-34.438zM129.905 82.094c-18.875 0-33.875 15.59-33.875 34.47 0 18.876 15 33.874 33.876 33.874 18.875 0 33.875-14.998 33.875-33.875 0-18.876-15-34.47-33.874-34.47zm284.281 22.656c-18.875 0-33.875 15.59-33.875 34.47 0 18.876 15 33.874 33.875 33.874 18.876 0 33.875-14.998 33.875-33.875 0-18.877-15-34.47-33.875-34.47zm-162.25 57.563c-3.24-.003-6.51.42-9.718 1.28-25.657 6.875-39.12 39.755-30.095 73.438 3.502 13.072 9.883 24.315 17.875 32.814-19.225 4.532-34.137 13.467-40.5 24.5l-.406-.094-41.594 64.438-50.688-21.938c-29.376-16.12-61.575 24-30.624 41.688l94.468 44.062 38.03-50.063c21.493 38.735 15.748 77.484-25.124 116.25H342.75c-39.82-38.2-42.438-76.424-23.28-114.625l36.81 48.438 94.47-44.063c11.635-6.65 14.334-16.47 11.625-25.28-8.184 5.26-17.915 8.343-28.344 8.343-14.224 0-27.118-5.72-36.592-14.938l-28 12.125-41.594-64.437h-.03c-5.48-9.417-17.226-17.278-32.533-22.188 11.58-14.222 15.924-36.9 9.75-59.937-7.896-29.473-30.4-49.798-53.092-49.813zm-164.125 61.03c-18.875 0-33.874 15.56-33.874 34.438 0 18.88 15 33.876 33.874 33.876 18.876 0 33.876-14.997 33.876-33.875 0-18.874-15-34.436-33.876-34.436zm346.22 51.126c-18.876 0-33.876 15.59-33.876 34.467 0 18.878 15 33.875 33.875 33.875 18.876 0 33.876-14.997 33.876-33.875 0-18.875-15-34.468-33.875-34.468z'} fill={'currentcolor'} fillOpacity={'1'}></path></g>
		</svg>
	);
}
function	IconSkills() {
	return (
		<svg xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'} className={'w-10 h-10 text-plain'}>
			<g><path d={'M319.61 20.654c13.145 33.114 13.144 33.115-5.46 63.5 33.114-13.145 33.116-13.146 63.5 5.457-13.145-33.114-13.146-33.113 5.457-63.498-33.114 13.146-33.113 13.145-63.498-5.459zM113.024 38.021c-11.808 21.04-11.808 21.04-35.724 24.217 21.04 11.809 21.04 11.808 24.217 35.725 11.808-21.04 11.808-21.04 35.724-24.217-21.04-11.808-21.04-11.808-24.217-35.725zm76.55 56.184c-.952 50.588-.95 50.588-41.991 80.18 50.587.95 50.588.95 80.18 41.99.95-50.588.95-50.588 41.99-80.18-50.588-.95-50.588-.95-80.18-41.99zm191.177 55.885c-.046 24.127-.048 24.125-19.377 38.564 24.127.047 24.127.046 38.566 19.375.047-24.126.046-24.125 19.375-38.564-24.126-.047-24.125-.046-38.564-19.375zm-184.086 83.88c-1.191.024-2.36.07-3.492.134-18.591 1.064-41.868 8.416-77.445 22.556L76.012 433.582c78.487-20.734 132.97-21.909 170.99-4.615V247.71c-18.076-8.813-31.79-13.399-46.707-13.737a91.166 91.166 0 0 0-3.629-.002zm122.686 11.42c-2.916-.026-5.81.011-8.514.098-12.81.417-27.638 2.215-45.84 4.522V427.145c43.565-7.825 106.85-4.2 171.244 7.566l-39.78-177.197c-35.904-8.37-56.589-11.91-77.11-12.123zm2.289 16.95c18.889.204 36.852 2.768 53.707 5.02l4.437 16.523c-23.78-3.75-65.966-4.906-92.467-.98l-.636-17.805c11.959-2.154 23.625-2.88 34.959-2.758zm-250.483 4.658l-10.617 46.004h24.094l10.326-46.004H71.158zm345.881 0l39.742 177.031 2.239 9.973 22.591-.152-40.855-186.852h-23.717zm-78.857 57.82c16.993.026 33.67.791 49.146 2.223l3.524 17.174c-32.645-3.08-72.58-2.889-102.995 0l-.709-17.174c16.733-1.533 34.04-2.248 51.034-2.223zm-281.793 6.18l-6.924 30.004h24.394l6.735-30.004H56.389zm274.418 27.244c4.656.021 9.487.085 14.716.203l2.555 17.498c-19.97-.471-47.115.56-59.728 1.05l-.7-17.985c16.803-.493 29.189-.828 43.157-.766zm41.476.447c8.268.042 16.697.334 24.121.069l2.58 17.74c-8.653-.312-24.87-.83-32.064-.502l-2.807-17.234a257.25 257.25 0 0 1 8.17-.073zm-326.97 20.309l-17.985 77.928 25.035-.17 17.455-77.758H45.313zm303.164 11.848c19.608-.01 38.66.774 56.449 2.572l2.996 20.787c-34.305-4.244-85.755-7.697-119.1-3.244l-.14-17.922c20.02-1.379 40.186-2.183 59.795-2.193zm-166.606 44.05c-30.112.09-67.916 6.25-115.408 19.76l-7.22 2.053 187.759-1.27v-6.347c-16.236-9.206-37.42-14.278-65.13-14.196zm134.41 6.174c-19.63.067-37.112 1.439-51.283 4.182v10.064l177.594-1.203c-44.322-8.634-89.137-13.17-126.31-13.043zM26 475v18h460v-18H26z'} fill={'currentcolor'} fillOpacity={'1'}></path></g>
		</svg>
	);
}
function	IconQuest() {
	return (
		<svg xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'} className={'w-10 h-10 text-plain'}>
			<g><path d={'M227.4 34.7c-10.1 0-20.2.2-30.2.5l6.1 65.6-61.1-62.5c-31.3 2.5-62.5 6.6-93.8 12.5l34.2 28.4-48-.6c35.1 100.2 6.9 182.6-.3 292.1L130 476.5c10-1.3 19.9-2.4 29.6-3.3l21.5-42.2 18.6 28.8 41.5-33.5.8 43c82.9-.2 157.7 9.1 235.7 7.9-28.2-73-31.2-143.6-31.9-209.2l-33.3-19.1 32.7-33.9c-.4-21.3-1.3-42-3.6-61.9l-57.4.7 50.2-41.7c-3.8-15.5-9-30.4-16.1-44.7l-29.5-23.9C335 38 281.2 34.6 227.4 34.7zm58.7 37c10.6 24.75 21.1 49.5 31.7 74.3 7.5-10.5 14.9-21 22.4-31.5 16 27.2 32 54.3 48 81.5l-16.2 9.5-33.3-56.7-42.5 59.4-15.2-10.9 24-33.5-21.9-51.5-24.6 40.1 12 22.6-16.5 8.8-18.3-34.5-24.8 58.2-17.2-7.4 32.5-76.2 7.7-18c4.8 9.2 9.6 18.3 14.5 27.4 12.5-20.6 25.1-41.11 37.7-61.6zM91.2 128c6.72 1.6 13.4 3.4 19.2 5.3-2.1 5.9-4.1 11.8-6.2 17.6-5.79-1.6-11.72-3.4-16.9-4.7 1.39-6 2.62-12.1 3.9-18.2zm37.9 13.4c6.3 3.8 12 7.2 17 12.8L132.6 167c-4-3.7-8.6-7-12.8-9.4zm28.7 32.3c2.1 7.4 2.1 15.7 1.6 22.5l-18.5-2.4c.1-5.1.3-10-1-14.5zm-21.2 35.7l17.2 7.1c-3.3 6.6-5.1 12.7-8.6 17.8l-16.3-9c2.6-5.4 5.6-10.8 7.7-15.9zm-16.5 34.1l17.7 6.1c-1.5 5.4-3 11.2-3.6 16.2l-18.6-2c1.3-7.5 2.1-14 4.5-20.3zm207.8 17.4c8.5 1 14.6 3 21.7 7.1l-9.8 16c-4.1-2.8-9.4-3.8-13.5-4.5zm-21.2 1.5c1.1 6.1 2.5 12.2 3.9 18.3-5.9 1.3-11.7 3.3-16.5 5.1l-6.8-17.4c6.7-2.4 13.5-4.7 19.4-6zm-37.9 15.9l11 15.1c-5.6 4-11.8 7.8-16.8 10.6l-8.9-16.4c5.1-2.9 10.6-6.3 14.7-9.3zM135.3 281c1.5 4.7 4.2 9.2 6.9 12.1l-13.8 12.6c-5.5-5.7-9.5-13.5-11.2-20.1zm230.3 3.3c3.5 6.4 6.8 12.7 8.7 19.1l-17.8 5.6c-2-5.4-4.3-10.8-6.8-14.8zm-127.4 10.9l6.9 17.3c-6.4 2.7-12.9 4.8-18.6 6.5l-5-18c5.9-1.6 11.3-3.8 16.7-5.8zm-83.8 6.2c5.3 1.7 10.8 3.4 15.7 4.2-1.2 6.1-2 12.3-2.8 18.5-7-1-14.5-3.3-20.5-5.7zm50 3.5l2.8 18.5c-7.2 1.3-13.4 1.6-19.8 1.9l-.4-18.7c5.9-.2 11.6-.8 17.4-1.7zm174.5 18c1 6.4 1.6 12.9 2.2 19.3l-18.7 1.5c-.4-6-.9-11.9-2-17.8zm-67.6 30.8c18.9 3.5 44.9 16.2 68.9 33.9 7.4-9.9 14.4-20.4 21.3-31.1l30.1 12.9c-4.7 12.3-15 25.6-28.6 37.2 17 16.2 30.9 34.5 37 53-13.8-18.1-31.1-31.8-50.3-42.8-23.4 15.8-52.7 25.9-79.6 20.4 22.9-4.4 40.6-16.6 55.8-32.6-16.5-7.5-33.8-13.9-51.3-20.1z'} fill={'currentcolor'} fillOpacity={'1'}></path></g>
		</svg>
	);
}

function	Template({children}) {
	const	router = useRouter();
	const	{provider, chainTime} = useWeb3();
	const	{currentAdventurer, updateRarity} = useRarity();

	return (
		<section className={'mt-24 md:mt-12 max-w-screen md:max-w-screen-xl mx-auto'}>
			<AdventurerDetails
				provider={provider}
				chainTime={chainTime}
				adventurer={currentAdventurer}
				updateRarity={updateRarity} />

			<section className={'mt-6 max-w-screen md:max-w-screen-xl mx-auto'}>
				{/* <div className={'flex flex-row items-center space-x-8 mb-10'}>
					<Link href={'/adventurer/adventures'}>
						<div className={`w-16 h-16 rounded-full border-2 border-black dark:border-white flex flex-center ${router.pathname === '/adventurer/adventures' ? '' : 'cursor-pointer transition-opacity opacity-10 hover:opacity-80'}`}>
							<IconQuest className={'w-10 h-10'} />
						</div>
					</Link>
					<Link href={'/adventurer/inventory'}>
						<div className={`w-16 h-16 rounded-full border-2 border-black dark:border-white flex flex-center ${router.pathname === '/adventurer/inventory' ? '' : 'cursor-pointer transition-opacity opacity-10 hover:opacity-80'}`}>
							<IconBag className={'w-10 h-10'} />
						</div>
					</Link>
					<Link href={'/adventurer/skills'}>
						<div className={`w-16 h-16 rounded-full border-2 border-black dark:border-white flex flex-center ${router.pathname === '/adventurer/skills' ? '' : 'cursor-pointer transition-opacity opacity-10 hover:opacity-80'}`}>
							<IconSkills />
						</div>
					</Link>
					<Link href={'/adventurer/feats'}>
						<div className={`w-16 h-16 rounded-full border-2 border-black dark:border-white flex flex-center ${router.pathname === '/adventurer/feats' ? '' : 'cursor-pointer transition-opacity opacity-10 hover:opacity-80'}`}>
							<IconFeats />
						</div>
					</Link>
				</div> */}
				<div className={'flex flex-row items-center font-story mb-4 normal-case border-b-2 dark:border-b-dark-300'}>
					<Link href={'/adventurer/adventures'}>
						<p
							className={`p-4 pl-0 text-plain text-sm transition-opacity hover:opacity-100 ${router.pathname === '/adventurer/adventures' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
							{'Adventures'}
						</p>
					</Link>
					<Link href={'/adventurer/inventory'}>
						<p
							className={`p-4 pl-0 text-plain text-sm transition-opacity hover:opacity-100 ${router.pathname === '/adventurer/inventory' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
							{'Inventory'}
						</p>
					</Link>
					<Link href={'/adventurer/skills'}>
						<p
							className={`p-4 pl-0 text-plain text-sm transition-opacity hover:opacity-100 ${router.pathname === '/adventurer/skills' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
							{'Skills'}
						</p>
					</Link>
					<Link href={'/adventurer/feats'}>
						<p
							className={`p-4 pl-0 text-plain text-sm transition-opacity hover:opacity-100 ${router.pathname === '/adventurer/feats' ? 'opacity-100' : 'opacity-20 cursor-pointer'}`}>
							{'Feats'}
						</p>
					</Link>
				</div>
				{children}
			</section>
		</section>
	);
}

export default Template;
