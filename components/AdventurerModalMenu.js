/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Sunday September 12th 2021
**	@Filename:				FlyoutMenu.js
******************************************************************************/

import	React							from	'react';
import	Image							from	'next/image';
import	useRarity						from	'contexts/useRarity';
import	useWeb3							from	'contexts/useWeb3';
import	CLASSES							from	'utils/codex/classes';

function AdventurerModalMenu() {
	const	{currentAdventurer, openCurrentAventurerModal} = useRarity();
	const	{address} = useWeb3();

	function openModal() {
		openCurrentAventurerModal();
	}

	return (
		<>
			<div className={'hidden md:flex flex-row h-8 justify-center items-center relative'}>
				<div onClick={openModal} className={'group items-center justify-end flex-row mr-6 cursor-pointer outline-none focus:outline-none hidden md:flex'}>
					{currentAdventurer ? <div className={'flex items-center justify-center'}>
						<Image
							src={CLASSES[currentAdventurer?.class]?.img}
							quality={100}
							width={60}
							height={60} />
						<div className={'text-sm cursor-pointer uppercase ml-2'}>
							<div className={'text-sx cursor-pointer mb-1 group-hover:underline'}>
								{currentAdventurer?.tokenID}
							</div>
							<div className={'text-megaxs cursor-pointer group-hover:underline'}>
								{currentAdventurer ? `${CLASSES[currentAdventurer?.class].name} LVL ${currentAdventurer.level}` : null}
							</div>
						</div>
					</div> : <div className={'flex items-center justify-center'}>
						<Image
							src={'/front/placeholder.svg'}
							quality={100}
							width={60}
							height={60} />
						<div className={'text-sm cursor-pointer uppercase ml-2'}>
							<div className={'text-sx cursor-pointer mb-1 group-hover:underline'}>
								{'Nobody'}
							</div>
							<div className={'text-megaxs cursor-pointer group-hover:underline'}>
								{`${address.slice(0, 4)}...${address.slice(-4)}`}
							</div>
						</div>
					</div>}
				</div>
			</div>
			<div className={'flex flex-row h-8 justify-center items-center relative md:hidden w-full'}>
				<div onClick={openModal} className={'group items-center justify-end flex-row -mr-6 cursor-pointer outline-none focus:outline-none flex'}>
					{currentAdventurer ? <div className={'flex items-center justify-center'}>
						<div className={'cursor-pointer uppercase mr-2 mt-2 text-right'}>
							<div className={'text-sm cursor-pointer group-hover:underline -mb-2'}>
								{currentAdventurer?.tokenID}
							</div>
							<div className={'text-megaxs cursor-pointer group-hover:underline'}>
								{currentAdventurer ? `${CLASSES[currentAdventurer?.class].name} LVL ${currentAdventurer.level}` : null}
							</div>
						</div>
						<Image
							src={CLASSES[currentAdventurer?.class]?.img}
							quality={100}
							width={60}
							height={60} />
					</div> : <div className={'flex items-center justify-center'}>
						<div className={'cursor-pointer uppercase mr-2 mt-2 text-right'}>
							<div className={'text-sm cursor-pointer group-hover:underline -mb-2'}>
								{'Nobody'}
							</div>
							<div className={'text-megaxs cursor-pointer group-hover:underline'}>
								{`${address.slice(0, 4)}...${address.slice(-4)}`}
							</div>
						</div>
						<Image
							src={'/front/placeholder.svg'}
							quality={100}
							width={60}
							height={60} />
					</div>}
				</div>
			</div>
		</>
	);
}

export default AdventurerModalMenu;