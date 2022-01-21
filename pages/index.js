import	React, {useState, useEffect}		from	'react';
import	Image								from	'next/image';
import	Link								from	'next/link';
import	dayjs								from	'dayjs';
import	relativeTime						from	'dayjs/plugin/relativeTime';
import	toast								from	'react-hot-toast';
import	Template							from	'components/templates/Adventurer';
import	AdventurerDetails					from	'sections/adventurer/WrapperMinimal';
import	useLocalStorage						from	'hook/useLocalStorage';
import	useWeb3								from	'contexts/useWeb3';
import	useRarity							from	'contexts/useRarity';
import	useInventory						from	'contexts/useInventory';
import	{chunk}								from	'utils';
import	{xpRequired}						from	'utils/libs/rarity';
import	* as daycare						from	'utils/actions/daycare';

dayjs.extend(relativeTime);

function	NewAdventurer() {
	return (
		<div className={'box flex justify-between items-center w-full flex-col p-4 relative'}>
			<div className={'text-center'}>
				<p className={'text-plain dark:text-opacity-70 font-bold text-xl font-story text-center'}>
					{'Recruit'}
				</p>
				<p className={'text-black dark:text-dark-100 text-sm font-story mb-4'}>
					{'Unknown'}
				</p>
			</div>
			<div className={'w-40 h-40 filter brightness-0 flex justify-center items-end'}>
				<Image src={'/classes/front/placeholder.svg'} width={140} height={140} />
			</div>
			<div className={'px-4'}>
				<Link href={'/recruit#content'}>
					<div className={'bg-600 hover-bg-900 flex flex-center text-center px-4 py-2 mt-4 w-full text-plain cursor-pointer opacity-60'}>
						<p className={'font-story text-sm select-none normal-case'}>{'Hire Adventurer'}</p>
					</div>
				</Link>
			</div>
		</div>
	);
}

function	Index() {
	const	{provider, chainTime} = useWeb3();
	const	{rarities, set_currentAdventurer, rNonce, skins, updateBatchRarity} = useRarity();
	const	{updateInventories} = useInventory();
	const	[favoritesAdventurers, set_favoritesAdventurers] = useLocalStorage('favorites', []);
	const	[nonce, set_nonce] = useState(0);
	const	[expanded, set_expanded] = useState(false);
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
	}, [rNonce, nonce, favoritesAdventurers.length]);

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

	function	renderCareSystem() {
		return (
			<div>
				<div className={'w-full relative box font-story h-full'}>
					<div className={'relative flex flex-row'}>
						<div className={'w-full h-full p-4'}>
							<h1 className={'text-lg font-bold'}>{'Care system'}</h1>
							<div className={'flex flex-row items-center justify-between mt-2 normal-case'}>
								<div className={'flex flex-col text-50'}>
									<p className={'text-xs pb-1'}>
										{'With the Care System you can send '}
										<b className={'text-highlight'}>{'all your favorite adventurers'}</b>
										{' perform some regular task, all in one transaction! No fees, no secret, just easy peazy.'}
									</p>
									<p className={'text-xs'}>{'Included: claiming XP, the Cellar, level-up and claiming gold'}</p>
								</div>
							</div>
							<div className={'flex flex-row space-x-8 pt-4'}>
								<div className={'flex flex-row items-start'}>
									<div
										onClick={() => set_expanded(!expanded)}
										className={`select-none transform transition-transform cursor-pointer -m-2 p-2 ${expanded ? 'rotate-90' : 'rotate-0'}`}>
										<svg fill={'none'} xmlns={'http://www.w3.org/2000/svg'} className={'w-4 h-4'} viewBox={'0 0 24 24'}> <path d={'M8 5v2h2V5H8zm4 4V7h-2v2h2zm2 2V9h-2v2h2zm0 2h2v-2h-2v2zm-2 2v-2h2v2h-2zm0 0h-2v2h2v-2zm-4 4v-2h2v2H8z'} fill={'currentColor'}/> </svg>
									</div>
									<div className={'flex flex-col space-y-2'}>
										<div
											onClick={onCareOf}
											className={'ml-2 text-sm font-bold cursor-pointer'}>
											{'Take care of '}
											<span className={'text-highlight'}>{'Everything '}</span>
											<span className={'text-sx text-50 normal-case'}>
												{renderEverythingHelperText()}
											</span>

										</div>
										{
											expanded ? (
												<>
													<div
														onClick={onAdventure}
														className={'ml-2 text-sm font-bold cursor-pointer transition-opacity opacity-30 hover:opacity-100'}>
														{'Take care of '}
														<span className={'text-highlight'}>{'the XP only '}</span>
														<span className={'text-sx text-50 normal-case'}>
															{`(${selectedAdventurersActions.canAdventure} adventurers)`}
														</span>
													</div>
													<div
														onClick={onAdventureCellar}
														className={'ml-2 text-sm font-bold cursor-pointer transition-opacity opacity-30 hover:opacity-100'}>
														{'Take care of '}
														<span className={'text-highlight'}>{'The Cellar only '}</span>
														<span className={'text-sx text-50 normal-case'}>
															{`(${selectedAdventurersActions.canAdventureCellar} adventurers)`}
														</span>
													</div>
													<div
														onClick={onLevelUp}
														className={'ml-2 text-sm font-bold cursor-pointer transition-opacity opacity-30 hover:opacity-100'}>
														{'Take care of '}
														<span className={'text-highlight'}>{'the Level-ups only '}</span>
														<span className={'text-sx text-50 normal-case'}>
															{`(${selectedAdventurersActions.canLevelUp} adventurers)`}
														</span>
													</div>
													<div
														onClick={onClaimGold}
														className={'ml-2 text-sm font-bold cursor-pointer transition-opacity opacity-30 hover:opacity-100'}>
														{'Take care of '}
														<span className={'text-highlight'}>{'the Gold only '}</span>
														<span className={'text-sx text-50 normal-case'}>
															{`(${selectedAdventurersActions.canClaimGold} adventurers)`}
														</span>
													</div>
												</>
											) : null
										}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<Template>
			{renderCareSystem()}
			<div className={'col-span-12 mt-8'}>
				<div className={'grid grid-cols-1 md:grid-cols-4 gap-4'}>
					{([...Object.values(rarities || {})] || [])
						.sort((a, b) => {
							if (favoritesAdventurers.includes(a.tokenID))
								return -1;
							if (favoritesAdventurers.includes(b.tokenID))
								return 1;
							return 0;
						})
						.map((adventurer, i) => {
							return (
								<AdventurerDetails
									key={i}
									adventurer={adventurer}
									set_currentAdventurer={set_currentAdventurer}
									favoritesAdventurers={favoritesAdventurers}
									set_favoritesAdventurers={set_favoritesAdventurers}
									raritySkin={skins[adventurer?.tokenID] || adventurer?.skin}
								/>
							);
						})}
					<NewAdventurer />
				</div>
			</div>
		</Template>
	);
}

export default Index;
