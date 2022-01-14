import	React					from	'react';
import	SectionRarityCrafting	from	'sections/crafting/SectionRarityCrafting';
import	SectionCrafting			from	'sections/crafting/SectionCrafting';

function	IconCook() {
	return (
		<svg xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'} className={'w-10 h-10 text-plain'}>
			<g><path d={'M151.7 16.73s-20.6 14.12-22 25.18c-1.4 11.33 17.6 19.24 15.6 30.48-1.3 7.43-16.6 15.38-16.6 15.38s38.7-3.36 42.3-18.3c2.9-11.82-19.8-16.61-23-28.35-2.1-7.94 3.7-24.39 3.7-24.39zm214.4 4.89s-24.8 13.58-24.9 25.45c-.1 7.24 14.4 8.67 14.8 15.9.5 8.56-15.3 20.68-15.3 20.68s33.6-3.81 38.1-16.97c2.7-7.77-9.4-13.81-11.6-21.73-2.1-7.5-1.1-23.33-1.1-23.33zm-106.9.26s-26.9 13.75-24.9 25.45c1.4 7.93 20.6 2.62 21.7 10.6 1.7 13.01-29.6 25.98-29.6 25.98s56.5-1.44 58.8-22.27c1.1-9.88-20-7.79-24.9-16.43-3.9-6.77-1.1-23.33-1.1-23.33zM48 105.6v18h416v-18zm16 37c-14.48 86.9 16.9 138.1 58.6 168.2-3.6-24.8-14.1-49.1-35.06-72.2 39.96 10.5 71.36 48.8 85.36 87.2 2.3-18.8 2.3-27.5 19.5-44.2-3.1 24.8 11.2 26.5 21.2 23.4 25.3-7.9 35.6-39.5 10.6-78.9 47.6 22.7 48.3 48.4 56.3 83.7-2.4-33.2 24.3-46.5 43.7-34-45.1 22.7-8.2 42.2 6.9 47 40 12.8 70-46.3 87.2-91 4.7 19.8.8 39.7-6.5 59.5C441.4 260 459.7 213 448 142.6zm184.3 175.2L75 417.5c2.7 18.4 9 34.4 18.8 48.5l92-44.1-78.7 59.9c3.4 3.4 7.1 6.6 11 9.7l74.7-42.9c0-.7-.1-1.5-.1-2.2 0-37.2 30.5-67.6 67.8-67.6 10.6 0 20.6 2.4 29.5 6.7-2.4-13.4-7.3-27.1-14.8-39.2l-94.9 40.1 82.5-56.5c-4.4-4.5-9.2-8.6-14.5-12.1zm58.9 57.6c1.6 7.2 2.6 14.4 3 21.4l.2 3.9c11.1 12 17.9 28.1 17.9 45.7 0 7.8-1.3 15.3-3.8 22.2l91.4 24.4c4.6-6.3 8.6-12.8 11.8-19.4l-63.1-24.7 70.1 6.9c.9-3 1.6-5.9 2.2-8.9l-97.1-34.3 99.2 15.5c.2-5.8-.1-11.7-.8-17.7zm-46.7 22.1c-27.2 0-49.1 21.8-49.1 48.9 0 27.1 21.9 48.9 49.1 48.9 27.3 0 49.2-21.8 49.2-48.9 0-27.1-21.9-48.9-49.2-48.9zm-4.9 11.8c43.8 0 58.4 71.6 0 71.6 26.6-23.1 29.8-46.9 0-71.6zm.2 9.8c-21.6 17.9-19.3 35.2 0 52-42.4 0-31.8-52 0-52z'} fill={'currentcolor'} fillOpacity={'1'}></path></g>
		</svg>
	);
}
function	IconGoods() {
	return (
		<svg xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'} className={'w-10 h-10 text-plain'}>
			<g><path d={'M170.375 18.594c-1.155 0-2.32.014-3.47.03-25.176.37-49.134 5.08-68.78 13.94 84.13 7.937 156.965 61.77 119.28 122.53-2.017 3.254-4.033 6.445-6.03 9.625l.47.186c-.933 2.4-.566 5.203 2.343 9.53 2.908 4.33 8.322 9.22 14.75 12.97 6.427 3.752 13.838 6.392 20.28 7.22 5.992.768 10.808-.054 14-1.94 1.7-2.696 3.416-5.415 5.157-8.155 21.695-8.632 57.903 11.51 65.22 29.22 1.34-14.225 6.522-29.91 15.342-45.188 6.697-11.598 14.627-21.517 23.157-29.25-20.304 7.277-30.037-6.764-38.563-34.187-8.197-26.38-36.394-47.365-58.155-59.844-31.287-17.92-69.206-26.65-105-26.686zm239.03 121.937c-4.01-.034-9.278 1.558-15.592 5.564-9.622 6.103-20.325 17.327-28.688 31.812-8.363 14.486-12.713 29.366-13.188 40.75-.474 11.385 2.692 17.85 6.688 20.156 3.996 2.307 11.222 1.823 20.844-4.28 9.62-6.104 20.323-17.297 28.686-31.782s12.713-29.365 13.188-40.75c.474-11.385-2.693-17.88-6.688-20.188-.998-.576-2.206-.973-3.594-1.156-.52-.068-1.083-.12-1.656-.125zm-210.81 44.282C80.93 367.197 4.35 418.813 21.937 462.875c8.065 20.204 31.467 36.36 55.218 28.78 49.34-15.74 59.974-94.006 173.094-278.124-1.138-.075-2.278-.198-3.406-.343-9.516-1.22-18.924-4.76-27.313-9.656-8.387-4.895-15.804-11.11-20.874-18.655-.016-.024-.046-.04-.062-.063zM492 256.97l-110.438 22.436 51.313 15.53 31.47 148.94 18.31-3.845-31.467-148.81L492 256.97zm-200.125 15.874l-80 79.375 51.438-15.19 68.093 67.564L308.28 489.5l18.064 4.906 20.312-74.656 24.72 24.5L384.53 431l-32.217-31.97 14-51.5 52.125-12.56-108.97-28.75 38.75 36.56-11.187 41.095-60.467-60 15.312-51.03z'} fill={'currentcolor'} fillOpacity={'1'}></path></g>
		</svg>
	);
}

function	Index() {
	const	[tab, set_tab] = React.useState(0);

	return (
		<section className={'mt-24 md:mt-12 max-w-screen md:max-w-screen-xl mx-auto'}>
			<div className={'flex flex-row items-center space-x-8 mb-10'}>
				<div
					onClick={() => set_tab(0)}
					className={`w-16 h-16 rounded-full border-2 border-black dark:border-white flex flex-center cursor-pointer transition-opacity ${tab === 0 ? '' : 'opacity-10 hover:opacity-80'}`}>
					<IconCook />
				</div>
				<div
					onClick={() => set_tab(1)}
					className={`w-16 h-16 rounded-full border-2 border-black dark:border-white flex flex-center cursor-pointer transition-opacity ${tab === 1 ? '' : 'opacity-10 hover:opacity-80'}`}>
					<IconGoods />
				</div>
			</div>

			{tab === 0 ? <SectionCrafting /> : null}
			{tab === 1 ? <SectionRarityCrafting /> : null}
		</section>
	);
}

export default Index;
