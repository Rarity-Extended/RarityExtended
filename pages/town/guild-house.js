/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				guild-house.js
******************************************************************************/

import	dayjs							from	'dayjs';
import	relativeTime					from	'dayjs/plugin/relativeTime';
import	React, {useEffect, useState}	from	'react';
import	Image							from	'next/image';
import	toast							from	'react-hot-toast';
import	useWeb3							from	'contexts/useWeb3';
import	useRarity						from	'contexts/useRarity';
import	Typer							from	'components/Typer';
import	DialogBox						from	'components/DialogBox';
import	Box								from	'components/Box';
import	Adventurer						from	'components/Adventurer';
import	CLASSES							from	'utils/codex/classes';
import	{chunk}							from	'utils';
import	{xpRequired}					from	'utils/libs/rarity';

import	{careOfAll, careAdventure, careCellar, careLevelup, careGold}		from	'utils/actions/daycare';

dayjs.extend(relativeTime);

function	NCPHeadline() {
	const	[NPCTextIndex, set_NPCTextIndex] = useState(0);

	const	renderNPCText = () => {
		return (
			<>
				<Typer onDone={() => set_NPCTextIndex(i => i + 1)} shouldStart={NPCTextIndex === 0}>
					{'HELLO THERE. I AM '}
				</Typer>
				<span className={'text-tag-info'}><Typer onDone={() => set_NPCTextIndex(i => i + 1)} shouldStart={NPCTextIndex === 1}>
					{'JANET'}
				</Typer></span>
				<Typer onDone={() => set_NPCTextIndex(i => i + 1)} shouldStart={NPCTextIndex === 2}>
					{', I\'LL HELP YOU COORDINATE YOUR PARTY OF HEROES. FREE OF CHARGE! THE TOWN PAYS ME. PLEASE '}
				</Typer>
				<span className={'text-tag-info'}><Typer onDone={() => set_NPCTextIndex(i => i + 1)} shouldStart={NPCTextIndex === 3}>
					{'SELECT THE ADVENTURERS'}
				</Typer></span>
				<Typer onDone={() => set_NPCTextIndex(i => i + 1)} shouldStart={NPCTextIndex === 4}>
					{' YOU WANT TO TAKE CARE OF.'}
				</Typer>
			</>
		);
	};
	return (
		<h1 className={'text-xs md:text-xs leading-normal md:leading-8'}>
			{renderNPCText()}
		</h1>
	);
}

function	Index({rarities}) {
	const	{provider, chainTime} = useWeb3();
	const	{rNonce, updateBatchRarity} = useRarity();

	const	adventurers = Object.values(rarities);
	const	[selectedAdventurers, set_selectedAdventurers] = useState([]);
	const	[selectedAdventurersActions, set_selectedAdventurersActions] = useState({canAdventure: 0, canClaimGold: 0, canAdventureCellar: 0, canLevelUp: 0});

	useEffect(() => {
		let	canAdventure = 0;
		let	canAdventureCellar = 0;
		let	canLevelUp = 0;
		let	canClaimGold = 0;
		for (let index = 0; index < selectedAdventurers.length; index++) {
			const adventurer = adventurers.find(e => e.tokenID === selectedAdventurers[index]);
			if (dayjs(new Date(adventurer.log * 1000)).isBefore(dayjs(new Date(chainTime * 1000)))) {
				canAdventure++;
			}
			if (Number(adventurer?.gold?.claimable || 0) > 0) {
				canClaimGold++;
			}
			if (dayjs(new Date(adventurer?.dungeons?.cellar?.log * 1000)).isBefore(dayjs(new Date(chainTime * 1000)))) {
				if (Number(adventurer?.dungeons?.cellar?.scout || 0) >= 1) {
					canAdventureCellar++;
				}
			}
			if (adventurer.xp >= xpRequired(adventurer.level)) {
				canLevelUp++;
			}
		}
		set_selectedAdventurersActions({canAdventure, canClaimGold, canAdventureCellar, canLevelUp});
	}, [selectedAdventurers.length, rNonce]);

	async function	onCareOf() {
		if (selectedAdventurersActions.canAdventure === 0 && selectedAdventurersActions.canAdventureCellar === 0 && selectedAdventurersActions.canLevelUp === 0 && selectedAdventurersActions.canClaimGold === 0) {
			return;
		}
		const	chuncked = chunk(selectedAdventurers, 10);
		for (let index = 0; index < chuncked.length; index++) {
			const tokensID = chuncked[index];
			careOfAll(
				{provider, tokensID},
				({error}) => {
					return console.error(error);
				},
				(_toast) => {
					updateBatchRarity(tokensID);
					toast.dismiss(_toast);
					toast.success('Transaction successful');
				});
		}
	}
	function	onAdventure() {
		if (selectedAdventurersActions.canAdventure === 0) {
			return;
		}
		const	chuncked = chunk(selectedAdventurers, 10);
		for (let index = 0; index < chuncked.length; index++) {
			const tokensID = chuncked[index];
			careAdventure(
				{provider, tokensID},
				({error}) => {
					return console.error(error);
				},
				(_toast) => {
					updateBatchRarity(tokensID);
					toast.dismiss(_toast);
					toast.success('Transaction successful');
				});
		}
	}
	function	onAdventureCellar() {
		if (selectedAdventurersActions.canAdventureCellar === 0) {
			return;
		}
		const	chuncked = chunk(selectedAdventurers, 10);
		for (let index = 0; index < chuncked.length; index++) {
			const tokensID = chuncked[index];
			careCellar(
				{provider, tokensID},
				({error}) => {
					return console.error(error);
				},
				(_toast) => {
					updateBatchRarity(tokensID);
					toast.dismiss(_toast);
					toast.success('Transaction successful');
				});
		}
	}
	function	onLevelUp() {
		if (selectedAdventurersActions.canLevelUp === 0) {
			return;
		}
		const	chuncked = chunk(selectedAdventurers, 10);
		for (let index = 0; index < chuncked.length; index++) {
			const tokensID = chuncked[index];
			careLevelup(
				{provider, tokensID},
				({error}) => {
					return console.error(error);
				},
				(_toast) => {
					updateBatchRarity(tokensID);
					toast.dismiss(_toast);
					toast.success('Transaction successful');
				});
		}
	}
	function	onClaimGold() {
		if (selectedAdventurersActions.canClaimGold === 0) {
			return;
		}
		const	chuncked = chunk(selectedAdventurers, 10);
		for (let index = 0; index < chuncked.length; index++) {
			const tokensID = chuncked[index];
			careGold(
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

	return (
		<section className={'max-w-full'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
				<div className={'flex flex-col md:flex-row items-center mb-8 md:mb-8'}>
					<div className={'w-auto md:w-64 mr-0 md:mr-8'} style={{minWidth: 256}}>
						<Image
							src={'/avatar/janet.gif'}
							loading={'eager'}
							quality={100}
							width={256}
							height={256} />
					</div>
					<Box className={'p-4'}>
						<NCPHeadline />
					</Box>
				</div>
				<div className={'mb-4'}>
					<p
						className={'mb-4 text-regular cursor-pointer'}
						onClick={() => {
							if (selectedAdventurers.length !== adventurers.length) {
								set_selectedAdventurers(adventurers.map(e => e.tokenID));
							} else {
								set_selectedAdventurers([]);
							}
						}}>
						{selectedAdventurers.length !== adventurers.length ? '> SELECT ALL' : '> UNSELECT ALL'}
					</p>
					<div className={'grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 gap-y-0 md:gap-y-4'}>
						{adventurers.map((adventurer) => {
							return (
								<div key={adventurer.tokenID} className={'w-full'}>
									<Adventurer
										onClick={() => set_selectedAdventurers(selectedAdventurers.includes(adventurer.tokenID) ? selectedAdventurers.filter(id => id !== adventurer.tokenID) : [...selectedAdventurers, adventurer.tokenID])}
										adventurer={adventurer}
										rarityClass={CLASSES[adventurer.class]}>
										<div className={'absolute right-4 top-4'}>
											<div className={'rounded-full border-black dark:border-dark-100 border-2'}>
												<div className={`rounded-full p-2 ${selectedAdventurers.includes(adventurer.tokenID) ? 'bg-tag-info dark:bg-dark-100' : 'bg-transparent'} border-white dark:border-dark-600 border-2`} />
											</div>
										</div>
									</Adventurer>
								</div>
							);
						})}
					</div>
				</div>
				<DialogBox
					options={
						selectedAdventurers.length === 0 ? [{
							label: 'NO ADVENTURERS SELECTED, PLEASE SELECT ONE OR MORE OF THEM',
							onClick: () => onCareOf()
						}] : [{
							label: (
								selectedAdventurersActions.canAdventure === 0 && selectedAdventurersActions.canAdventureCellar === 0 && selectedAdventurersActions.canLevelUp === 0 && selectedAdventurersActions.canClaimGold === 0
									?
									<>{'YOUR ADVENTURERS ARE ALL RESTING'}</>
									:
									<>
										{'TAKE CARE OF EVERYTHING (ADVENTURE, THE CELLAR, LEVELUP & CLAIM GOLD)'}
									</>
							),
							onClick: () => onCareOf()
						},
						{
							label: (
								selectedAdventurersActions.canAdventure === 0
									?
									<>{'NO ONE CAN ADVENTURE RIGHT NOW'}</>
									:
									<>
										{'ONLY THE DAILY ADVENTURE '}
										<span className={'text-tag-info'}>{`(${selectedAdventurersActions.canAdventure} ADVENTURERS)`}</span>
									</>
							),
							onClick: () => onAdventure()
						},
						{
							label: (
								selectedAdventurersActions.canAdventureCellar === 0
									?
									<>{'NO ONE CAN GO IN THE CELLAR RIGHT NOW'}</>
									:
									<>
										{'ONLY THE CELLAR '}
										<span className={'text-tag-info'}>{`(${selectedAdventurersActions.canAdventureCellar} ADVENTURERS)`}</span>
									</>
							),
							onClick: () => onAdventureCellar()
						},
						{
							label: (
								selectedAdventurersActions.canLevelUp === 0
									?
									<>{'NO ONE CAN LEVEL-UP RIGHT NOW'}</>
									:
									<>
										{'ONLY LEVEL-UP '}
										<span className={'text-tag-info'}>{`(${selectedAdventurersActions.canLevelUp} ADVENTURERS)`}</span>
									</>
							),
							onClick: () => onLevelUp()
						},
						{
							label: (
								selectedAdventurersActions.canClaimGold === 0
									?
									<>{'NO ONE CAN CLAIM GOLD RIGHT NOW'}</>
									:
									<>
										{'ONLY CLAIM GOLD '}
										<span className={'text-tag-info'}>{`(${selectedAdventurersActions.canClaimGold} ADVENTURERS)`}</span>
									</>
							),
							onClick: () => onClaimGold()
						}
						]} />
				<div className={'-mt-4'}>
					<i className={'text-megaxs text-opacity-40 text-black dark:text-dark-100'}>
						{'Transactions are processed by batch of 10 adventurer because of block limit'}
					</i>
				</div>
			</div>
		</section>
	);
}

export default Index;
