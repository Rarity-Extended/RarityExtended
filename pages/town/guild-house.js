/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				guild-house.js
******************************************************************************/

import	dayjs							from	'dayjs';
import	relativeTime					from	'dayjs/plugin/relativeTime';
import	React, {useEffect, useState}				from	'react';
import	Image							from	'next/image';
import	useWeb3							from	'contexts/useWeb3';
import	Typer							from	'components/Typer';
import	DialogBox						from	'components/DialogBox';
import	Box								from	'components/Box';
import	CLASSES							from	'utils/codex/classes';
import	Adventurer						from	'components/Adventurer';
import	{xpRequired}		from	'utils/libs/rarity';

import	{careOfAll, adventureAll, adventureCellarAll, adventureLevelupAll, adventureClaimGold}		from	'utils/actions';
import useRarity from 'contexts/useRarity';

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

	function	onCareOf() {
		careOfAll({
			provider,
			tokensID: selectedAdventurers,
		}, ({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateBatchRarity(data);
		});
	}
	function	onAdventure() {
		adventureAll({
			provider,
			tokensID: selectedAdventurers,
		}, ({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateBatchRarity(data);
		});
	}
	function	onAdventureCellar() {
		adventureCellarAll({
			provider,
			tokensID: selectedAdventurers,
		}, ({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateBatchRarity(data);
		});
	}
	function	onLevelUp() {
		adventureLevelupAll({
			provider,
			tokensID: selectedAdventurers,
		}, ({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateBatchRarity(data);
		});
	}
	function	onClaimGold() {
		adventureClaimGold({
			provider,
			tokensID: selectedAdventurers,
		}, ({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateBatchRarity(data);
		});
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
					options={[
						{
							label: 'Take care of everyone (Adventure, The Cellar, LevelUp & Claim Gold)',
							onClick: () => onCareOf()
						},
						{
							label: (
								<>
									{'Only Send everyone in an Adventure '}
									<span className={'text-tag-info'}>{`(${selectedAdventurersActions.canAdventure} adventurers)`}</span>
								</>
							),
							onClick: () => onAdventure()
						},
						{
							label: (
								<>
									{'Only Send everyone in The Cellar '}
									<span className={'text-tag-info'}>{`(${selectedAdventurersActions.canAdventureCellar} adventurers)`}</span>
								</>
							),
							onClick: () => onAdventureCellar()
						},
						{
							label: (
								<>
									{'Only Level up everyone '}
									<span className={'text-tag-info'}>{`(${selectedAdventurersActions.canLevelUp} adventurers)`}</span>
								</>
							),
							onClick: () => onLevelUp()
						},
						{
							label: (
								<>
									{'Only Claim gold for everyone '}
									<span className={'text-tag-info'}>{`(${selectedAdventurersActions.canClaimGold} adventurers)`}</span>
								</>
							),
							onClick: () => onClaimGold()
						}
					]} />
			</div>
		</section>
	);
}

export default Index;
