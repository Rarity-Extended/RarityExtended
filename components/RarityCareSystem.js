import	React, {useState, useEffect}		from	'react';
import	dayjs								from	'dayjs';
import	relativeTime						from	'dayjs/plugin/relativeTime';
import	toast								from	'react-hot-toast';
import	{Listbox, Transition}				from	'@headlessui/react';
import	useLocalStorage						from	'hook/useLocalStorage';
import	useWeb3								from	'contexts/useWeb3';
import	useRarity							from	'contexts/useRarity';
import	useInventory						from	'contexts/useInventory';
import	{chunk}								from	'utils';
import	{xpRequired}						from	'utils/libs/rarity';
import	* as daycare						from	'utils/actions/daycare';

dayjs.extend(relativeTime);

function	Index({minimal}) {
	const	{provider, chainTime} = useWeb3();
	const	{rarities, updateBatchRarity} = useRarity();
	const	{updateInventories} = useInventory();
	const	[favoritesAdventurers] = useLocalStorage('favorites', []);
	const	[nonce, set_nonce] = useState(0);
	const	[selected] = useState('Take care of everything');

	const	[selectedAdventurersActions, set_selectedAdventurersActions] = useState({
		canAdventure: 0,
		canClaimGold: 0,
		canAdventureCellar: 0,
		canLevelUp: 0
	});

	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	Everty time the global nonce is updated, the local nonce is updated or the list of favorite
	**	adventurers is updated, we need to cound again the count of selectedAdventurersActions.
	**********************************************************************************************/
	useEffect(() => {
		let	canAdventure = 0;
		let	canAdventureCellar = 0;
		let	canLevelUp = 0;
		let	canClaimGold = 0;
		for (let index = 0; index < favoritesAdventurers.length; index++) {
			const adventurer = Object.values(rarities).find(e => e.tokenID === favoritesAdventurers[index]);
			if (dayjs(new Date(adventurer.log * 1000)).isBefore(dayjs(new Date(chainTime * 1000)))) {
				canAdventure++;
			}
			if (Number(adventurer?.gold?.claimable || 0) > 0) {
				canClaimGold++;
			}
			if (dayjs(new Date(adventurer?.adventures?.cellar?.log * 1000)).isBefore(dayjs(new Date(chainTime * 1000)))) {
				if (Number(adventurer?.adventures?.cellar?.scout || 0) >= 1) {
					canAdventureCellar++;
				}
			}
			if (adventurer.xp >= xpRequired(adventurer.level)) {
				canLevelUp++;
			}
		}
		set_selectedAdventurersActions({canAdventure, canClaimGold, canAdventureCellar, canLevelUp});
	}, [nonce, favoritesAdventurers.length]);

	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	Filter the Favorites Adventurer to remove the one that cannot do anything with the current
	**	action selected.
	**	0 = All, 1 = claimXP, 2 = Cellar, 3 = Levelup, 4 = Gold
	**********************************************************************************************/
	function filterAdventurerWithSomething(type = 0) {
		const	favoriteList = [];
		for (let index = 0; index < favoritesAdventurers.length; index++) {
			const adventurer = Object.values(rarities).find(e => e.tokenID === favoritesAdventurers[index]);
			if (type === 0 || type === 1) {
				if (dayjs(new Date(adventurer.log * 1000)).isBefore(dayjs(new Date(chainTime * 1000)))) {
					favoriteList.push(favoritesAdventurers[index]);
					continue;
				}
			}
			if (type === 0 || type === 2) {
				if (dayjs(new Date(adventurer?.adventures?.cellar?.log * 1000)).isBefore(dayjs(new Date(chainTime * 1000)))) {
					if (Number(adventurer?.adventures?.cellar?.scout || 0) >= 1) {
						favoriteList.push(favoritesAdventurers[index]);
						continue;
					}
				}
			}
			if (type === 0 || type === 3) {
				if (adventurer.xp >= xpRequired(adventurer.level)) {
					favoriteList.push(favoritesAdventurers[index]);
					continue;
				}
			}
			if (type === 0 || type === 4) {
				if (Number(adventurer?.gold?.claimable || 0) > 0) {
					favoriteList.push(favoritesAdventurers[index]);
					continue;
				}
			}
		}
		return favoriteList;
	}

	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	Handle the care system. The care system is split in 5 parts: 
	**	- Take care of everything
	**	- Take care of the daily adventure
	**	- Take care of the cellar adventure
	**	- Take care of the levelup
	**	- Take care of claiming gold
	**********************************************************************************************/
	function	onCareOf() {
		const	cleanList = filterAdventurerWithSomething(0);
		const	chuncked = chunk(cleanList, 10);
		for (let index = 0; index < chuncked.length; index++) {
			const tokensID = chuncked[index];
			daycare.careOfAll(
				{provider, tokensID},
				({error}) => console.error(error),
				(_toast) => {
					Promise.all([
						updateInventories(tokensID),
						updateBatchRarity(tokensID)	
					]).then(() => {
						set_nonce(n => n + 1);
						toast.dismiss(_toast);
						toast.success('Transaction successful');
					});
				});
		}
	}
	function	onAdventure() {
		if (selectedAdventurersActions.canAdventure === 0) {
			return;
		}
		const	cleanList = filterAdventurerWithSomething(1);
		const	chuncked = chunk(cleanList, 10);
		for (let index = 0; index < chuncked.length; index++) {
			const tokensID = chuncked[index];
			daycare.careAdventure(
				{provider, tokensID},
				({error}) => console.error(error),
				(_toast) => {
					updateBatchRarity(tokensID, () => {
						set_nonce(n => n + 1);
						toast.dismiss(_toast);
						toast.success('Transaction successful');
					});
				});
		}
	}
	function	onAdventureCellar() {
		if (selectedAdventurersActions.canAdventureCellar === 0) {
			return;
		}
		const	cleanList = filterAdventurerWithSomething(2);
		const	chuncked = chunk(cleanList, 10);
		for (let index = 0; index < chuncked.length; index++) {
			const tokensID = chuncked[index];
			daycare.careCellar(
				{provider, tokensID},
				({error}) => console.error(error),
				(_toast) => {
					Promise.all([
						updateInventories(tokensID),
						updateBatchRarity(tokensID)	
					]).then(() => {
						set_nonce(n => n + 1);
						toast.dismiss(_toast);
						toast.success('Transaction successful');
					});
				});
		}
	}
	function	onLevelUp() {
		if (selectedAdventurersActions.canLevelUp === 0) {
			return;
		}
		const	cleanList = filterAdventurerWithSomething(3);
		const	chuncked = chunk(cleanList, 10);
		for (let index = 0; index < chuncked.length; index++) {
			const tokensID = chuncked[index];
			daycare.careLevelup(
				{provider, tokensID},
				({error}) => console.error(error),
				(_toast) => {
					updateBatchRarity(tokensID, () => {
						set_nonce(n => n + 1);
						toast.dismiss(_toast);
						toast.success('Transaction successful');
					});
				});
		}
	}
	function	onClaimGold() {
		if (selectedAdventurersActions.canClaimGold === 0) {
			return;
		}
		const	cleanList = filterAdventurerWithSomething(4);
		const	chuncked = chunk(cleanList, 10);
		for (let index = 0; index < chuncked.length; index++) {
			const tokensID = chuncked[index];
			daycare.careGold(
				{provider, tokensID},
				({error}) => {
					if (error) {
						return console.error(error);
					}
				},
				(_toast) => {
					updateBatchRarity(tokensID);
					toast.dismiss(_toast);
					toast.success('Transaction successful');
				});
		}
	}

	/* 🏹🛡 - Rarity Extended ***********************************************************************
	**	Render the text for the list of stuff possible with the favorites adventurers, aka the one
	**	selected
	**********************************************************************************************/
	function	renderEverythingHelperText() {
		let	lastPart = null;
		if (selectedAdventurersActions.canClaimGold > 0) {
			lastPart = `and ${selectedAdventurersActions.canClaimGold} for gold claiming`;
		}
		if (selectedAdventurersActions.canLevelUp > 0) {
			if (!lastPart)
				lastPart = `and ${selectedAdventurersActions.canLevelUp} for level-up`;
			else 
				lastPart = `${selectedAdventurersActions.canLevelUp} for level-up${lastPart.startsWith('and') ? ` ${lastPart}` : `, ${lastPart}`}`;
		}
		if (selectedAdventurersActions.canAdventureCellar > 0) {
			if (!lastPart)
				lastPart = `and ${selectedAdventurersActions.canAdventureCellar} for The Cellar`;
			else 
				lastPart = `${selectedAdventurersActions.canAdventureCellar} for The Cellar${lastPart.startsWith('and') ? ` ${lastPart}` : `, ${lastPart}`}`;
		}
		if (selectedAdventurersActions.canAdventure > 0) {
			if (!lastPart)
				lastPart = `and ${selectedAdventurersActions.canAdventure} for xp claiming`;
			else 
				lastPart = `${selectedAdventurersActions.canAdventure} for xp claiming${lastPart.startsWith('and') ? ` ${lastPart}` : `, ${lastPart}`}`;
		}
		if (!lastPart) {
			return 'Nothing to do';
		}
		return `(${lastPart})`;
	}

	function	renderCareButton() {
		const publishingOptions = [
			{title: 'Take care of everything', description: renderEverythingHelperText(), onClick: onCareOf},
			{title: 'Take care of the XP only', description: `(${selectedAdventurersActions.canAdventure} adventurers)`, onClick: onAdventure},
			{title: 'Take care of The Cellar only', description: `(${selectedAdventurersActions.canAdventureCellar} adventurers)`, onClick: onAdventureCellar},
			{title: 'Take care of the Level-ups only', description: `(${selectedAdventurersActions.canLevelUp} adventurers)`, onClick: onLevelUp},
			{title: 'Take care of the Gold only', description: `(${selectedAdventurersActions.canClaimGold} adventurers)`, onClick: onClaimGold},
		];
		return (
			<Listbox onChange={(e) => e.onClick()}>
				{({open}) => (
					<>
						<Listbox.Label className={'sr-only'}>{'Care options'}</Listbox.Label>
						<div className={'relative w-full md:w-auto'}>
							<div className={'inline-flex w-full md:w-auto'}>
								<div className={'inline-flex relative z-0 w-full md:w-auto'}>
									<button
										className={'inline-flex relative items-center w-full md:w-auto button-highlight-with-arrow'} onClick={onCareOf}>
										<p>{selected}</p>
									</button>
									<Listbox.Button className={'inline-flex relative items-center button-outline-arrow'}>
										<svg aria-hidden={'true'} focusable={'false'} data-prefix={'fas'} data-icon={'chevron-down'} className={'w-3 h-3'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 448 512'}><path fill={'currentColor'} d={'M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z'}></path></svg>
									</Listbox.Button>
								</div>
							</div>
			
							<Transition
								show={open}
								as={React.Fragment}
								leave={'transition ease-in duration-100'}
								leaveFrom={'opacity-100'}
								leaveTo={'opacity-0'}>
								<Listbox.Options className={'overflow-hidden absolute right-0 z-10 mt-2 w-72 shadow-lg origin-top-right box-with-border'}>
									{publishingOptions.map((option) => (
										<Listbox.Option
											key={option.title}
											className={'relative py-2 px-4 hover:bg-light-primary-lighter dark:hover:bg-dark-primary-lighter select-none'}
											value={option}>
											<div className={'flex flex-col cursor-pointer'}>
												<div className={'flex justify-between'}>
													<p className={'text-sm font-bold text-plain normal-normal-case'}>{option.title}</p>
												</div>
												<p className={'mt-2 text-sm text-plain-60'}>
													{option.description}
												</p>
											</div>
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</>
				)}
			</Listbox>
		);
	}

	if (minimal) {
		return (
			<div>
				<div className={'relative w-full h-full box'}>
					<div className={'flex relative flex-row'}>
						<div className={'p-4 w-full h-full'}>
							<h1 className={'text-lg font-bold text-plain'}>{'Care system'}</h1>
							<p className={'pb-1 text-sm text-plain-60'}>
								{'You can send '}
								<b className={'text-highlight'}>{'all your favorite adventurers'}</b>
								{' to perform some regular task, all in one transaction!'}
							</p>
							<div className={'flex flex-col justify-between items-start mt-2 w-full md:flex-row md:items-center'}>
								{renderCareButton()}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className={'relative w-full h-full box'}>
				<div className={'hidden relative flex-row md:flex'}>
					<div className={'p-4 w-full h-full'}>
						<h1 className={'text-lg font-bold text-plain'}>{'Care system'}</h1>

						<div className={'flex flex-col justify-between items-start w-full md:flex-row md:items-center'}>
							<div className={'justify-between items-start mt-2 mb-4 w-full md:items-center md:mb-0 md:w-2/3'}>
								<div className={'flex flex-col text-plain-60'}>
									<p className={'pb-1 text-sm'}>
										{'With the Care System you can send '}
										<b className={'text-highlight'}>{'all your favorite adventurers'}</b>
										{' perform some regular task, all in one transaction! No fees, no secret, just easy peazy.'}
									</p>
									<p className={'text-sm'}>{'Included: claiming XP, the Cellar, level-up and claiming gold'}</p>
								</div>
							</div>

							<div>
								{renderCareButton()}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Index;
