/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 19th 2021
**	@Filename:				Balloon.js
******************************************************************************/

import	React, {useState}			from	'react';
import	dayjs						from	'dayjs';
import	relativeTime				from	'dayjs/plugin/relativeTime';
import	{goAdventure, claimGold}	from	'utils/actions';

dayjs.extend(relativeTime);

function	Bubble({children}) {
	return (
		<div className={'nes-balloon from-left text-xs md:text-base relative'}>
			<div className={'absolute h-1 bg-black dark:bg-dark-100 top-0 left-1 right-1'} />
			<div className={'absolute h-1 w-1 bg-black dark:bg-dark-100 top-1 left-0'} />
			<div className={'absolute h-1 w-1 bg-black dark:bg-dark-100 top-1 right-0'} />
			<div className={'absolute w-1 bg-black dark:bg-dark-100 top-2 bottom-2 -left-1'} />
			<div className={'px-4 py-5'}>
				<p>{children}</p>
			</div>
			<div className={'absolute w-1 bg-black dark:bg-dark-100 top-2 bottom-2 -right-1'} />
			<div className={'absolute h-1 w-1 bg-black dark:bg-dark-100 bottom-1 left-0'} />
			<div className={'absolute h-1 w-1 bg-black dark:bg-dark-100 bottom-1 right-0'} />
			<div className={'absolute h-1 bg-black dark:bg-dark-100 bottom-0 left-1 right-1'} />
		</div>
	);
}

function	Balloon({adventurer, chainTime, provider, updateRarity}) {
	const	[ask, set_ask] = useState(0);
	const	canAdventure = !dayjs(new Date(adventurer.log * 1000)).isAfter(dayjs(new Date(chainTime * 1000)));
	const	canGold = Number(adventurer?.gold?.claimable || 0) > 0;
	const	isInTheForest = adventurer.level >= 2 && !adventurer?.dungeons?.forest?.canAdventure;

	function	onGoToAdventure() {
		goAdventure({
			loader: isInTheForest ? 'Claiming XP...' : 'Going on an adventure...',
			provider,
			contractAddress: process.env.RARITY_ADDR,
			tokenID: adventurer.tokenID,
		}, ({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(data);
		});
	}

	function	onClaimGold() {
		claimGold({
			provider,
			contractAddress: process.env.RARITY_GOLD_ADDR,
			tokenID: adventurer.tokenID,
		}, ({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(data);
		});
	}

	if (ask <= 0 && canAdventure) {
		return (
			<Bubble>
				<div className={'mb-2'}>
					{isInTheForest ? 'Do you want to claim adventure XP?' : 'Would you like to go on an adventure?'}
					<div className={'mt-6'}>
						<span className={'cursor-pointer'} onClick={onGoToAdventure}>
							<span className={'inline mb-1 mr-2 group-hover:opacity-100'} style={{cursor: 'pointer'}}>{'>'}</span>
							<span>{'Yes'}</span>
						</span>
						<span className={'ml-6 cursor-pointer'} onClick={() => canGold ? set_ask(1) : null}>
							<span className={'inline mb-1 mr-2 opacity-5'} style={{cursor: 'pointer'}}>{'>'}</span>
							<span className={'opacity-40'}>{'no'}</span>
						</span>
					</div>
				</div>
				{canGold ? <div className={'absolute right-0 bottom-0 text-xl animate-bounce-r cursor-pointer p-2'} onClick={() => set_ask(1)}>
					{'▸'}
				</div> : null}
			</Bubble>
		);
	}
	if (ask <= 1 && canGold) {
		return (
			<Bubble>
				<div className={'mb-2'}>
					{`WOULD YOU LIKE TO CLAIM YOUR GOLD (${Number(adventurer?.gold?.claimable)} coins) ?`}
					<div className={'mt-6'}>
						<span className={'cursor-pointer'} onClick={onClaimGold}>
							<span className={'inline mb-1 mr-2 group-hover:opacity-100'} style={{cursor: 'pointer'}}>{'>'}</span>
							<span>{'Claim'}</span>
						</span>
						<span className={'ml-6 cursor-pointer'} onClick={() => canGold ? set_ask(1) : null}>
							<span className={'inline mb-1 mr-2 opacity-5'} style={{cursor: 'pointer'}}>{'>'}</span>
							<span className={'opacity-40'}>{'no'}</span>
						</span>
					</div>
				</div>
				{canAdventure ? <div className={'absolute right-0 bottom-0 text-xl animate-bounce-r cursor-pointer p-2'} onClick={() => set_ask(0)}>
					{'◂'}
				</div> : null}
			</Bubble>
		);
	}

	return (
		<Bubble>{`Next adventure ready ${dayjs(new Date(adventurer.log * 1000)).from(dayjs(new Date(chainTime * 1000)))}`}</Bubble>
	);
}

export default Balloon;