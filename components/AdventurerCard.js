import	React				from	'react';
import	Image				from	'next/image';
import	useUI, {Media}		from	'contexts/useUI';
import	CLASSES				from	'utils/codex/core/classes';

function	WrapperMinimal({adventurer, set_currentAdventurer, favoritesAdventurers, set_favoritesAdventurers, raritySkin}) {
	const	{raritySkins} = useUI();

	return (
		<div>
			<Media greaterThan={'md'}>
				<div className={'flex relative flex-col justify-between items-center p-4 w-full box'}>
					<div className={'text-center'}>
						<p className={'text-xl font-bold text-center text-plain dark:text-opacity-70'}>
							{adventurer.name || adventurer.tokenID}
						</p>
						<p className={'mb-4 text-sm text-black dark:text-dark-100'}>
							{adventurer.class ? `${CLASSES[adventurer.class].name} level ${adventurer.level}` : 'Unknown'}
						</p>
					</div>
					<Image src={raritySkins ? raritySkin : adventurer?.skin} width={180} height={180} />

					<div
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							set_favoritesAdventurers(favoritesAdventurers.includes(adventurer.tokenID) ? favoritesAdventurers.filter(id => id !== adventurer.tokenID) : [...favoritesAdventurers, adventurer.tokenID]);
						}}
						className={`absolute transition-colors left-4 top-4 cursor-pointer ${favoritesAdventurers.includes(adventurer.tokenID) ? 'text-highlight' : 'text-gray-200 hover:text-light-primary dark:text-dark-600 dark:hover:text-dark-primary'}`}>
						<svg width={20} height={20} aria-hidden={'true'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 576 512'}><path fill={'currentColor'} d={'M316.7 17.8l65.43 132.4l146.4 21.29c26.27 3.796 36.79 36.09 17.75 54.59l-105.9 102.1l25.05 145.5c4.508 26.31-23.23 45.9-46.49 33.7L288 439.6l-130.9 68.7C133.8 520.5 106.1 500.9 110.6 474.6l25.05-145.5L29.72 226.1c-19.03-18.5-8.516-50.79 17.75-54.59l146.4-21.29l65.43-132.4C271.1-6.083 305-5.786 316.7 17.8z'}></path></svg>
					</div>

					<div className={'px-4'}>
						<button
							onClick={() => set_currentAdventurer(adventurer)}
							className={'mt-4 button-highlight-outline'}>
							<p>{'Select Adventurer'}</p>
						</button>
					</div>
				</div>
			</Media>
			<Media lessThan={'md'}>
				<div className={'flex relative flex-row justify-between items-center p-2 w-full box'}>
					<div className={'w-36'}>
						<Image src={raritySkins ? raritySkin : adventurer?.skin} width={144} height={144} />
					</div>
					<div>
						<div className={'text-center'}>
							<p className={'text-xl font-bold text-center text-plain dark:text-opacity-70'}>
								{adventurer.name || adventurer.tokenID}
							</p>
							<p className={'mb-4 text-sm text-black dark:text-dark-100'}>
								{adventurer.class ? `${CLASSES[adventurer.class].name} level ${adventurer.level}` : 'Unknown'}
							</p>
						</div>

						<div
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								set_favoritesAdventurers(favoritesAdventurers.includes(adventurer.tokenID) ? favoritesAdventurers.filter(id => id !== adventurer.tokenID) : [...favoritesAdventurers, adventurer.tokenID]);
							}}
							className={`absolute transition-colors left-2 top-2 cursor-pointer ${favoritesAdventurers.includes(adventurer.tokenID) ? 'text-highlight' : 'text-gray-200 hover:text-light-primary dark:text-dark-600 dark:hover:text-dark-primary'}`}>
							<svg width={14} height={14} aria-hidden={'true'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 576 512'}><path fill={'currentColor'} d={'M316.7 17.8l65.43 132.4l146.4 21.29c26.27 3.796 36.79 36.09 17.75 54.59l-105.9 102.1l25.05 145.5c4.508 26.31-23.23 45.9-46.49 33.7L288 439.6l-130.9 68.7C133.8 520.5 106.1 500.9 110.6 474.6l25.05-145.5L29.72 226.1c-19.03-18.5-8.516-50.79 17.75-54.59l146.4-21.29l65.43-132.4C271.1-6.083 305-5.786 316.7 17.8z'}></path></svg>
						</div>

						<div className={'px-4'}>
							<button
								onClick={() => set_currentAdventurer(adventurer)}
								className={'flex py-2 px-4 mt-4 w-full text-center opacity-60 cursor-pointer bg-600 hover-bg-900 flex-center text-plain'}>
								<p className={' text-sm select-none'}>{'Select Adventurer'}</p>
							</button>
						</div>
					</div>
				</div>
			</Media>
		</div>
	);
}


export default WrapperMinimal;