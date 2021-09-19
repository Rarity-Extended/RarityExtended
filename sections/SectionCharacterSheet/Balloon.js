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

function	Balloon({adventurer, chainTime, provider, updateRarity}) {
	const	[ask, set_ask] = useState(0);
	const	canAdventure = !dayjs(new Date(adventurer.log * 1000)).isAfter(dayjs(new Date(chainTime * 1000)));
	const	canGold = Number(adventurer?.gold?.claimable || 0) > 0;

	function	onGoToAdventure() {
		goAdventure({
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
			<div className={'nes-balloon rounded-lg border-black dark:border-dark-100 border-4 relative from-left text-xs md:text-base'}>
				<div className={'mb-2'}>
					{'Would you like to go on an adventure ?'}
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
			</div>
		);
	}
	if (ask <= 1 && canGold) {
		return (
			<div className={'nes-balloon rounded-lg border-black dark:border-dark-100 border-4 relative from-left text-xs md:text-base '}>
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
			</div>
		);
	}

	return (
		<div className={'nes-balloon rounded-lg border-black dark:border-dark-100 border-4 relative from-left text-xs md:text-base'}>
			<p>{`Next adventure ready ${dayjs(new Date(adventurer.log * 1000)).from(dayjs(new Date(chainTime * 1000)))}`}</p>
		</div>
	);
}

export default Balloon;