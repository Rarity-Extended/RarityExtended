import	React							from	'react';
import	Image							from	'next/image';
import	useRarity						from	'contexts/useRarity';
import	useWeb3							from	'contexts/useWeb3';
import	useUI							from	'contexts/useUI';
import	CLASSES							from	'utils/codex/core/classes';

function AdventurerModalMenu() {
	const	{currentAdventurer, openCurrentAventurerModal, skins} = useRarity();
	const	{address} = useWeb3();
	const	{raritySkins} = useUI();

	function openModal() {
		openCurrentAventurerModal();
	}

	const	skin = raritySkins ? skins[currentAdventurer?.tokenID] || currentAdventurer?.skin : currentAdventurer?.skin;
	return (
		<div className={'hidden md:flex flex-row h-8 flex-center relative font-title'}>
			<div onClick={openModal} className={'group items-center justify-end flex-row mr-6 cursor-pointer outline-none focus:outline-none hidden md:flex'}>
				{currentAdventurer ? <div className={'flex flex-center'}>
					<Image
						src={skin}
						quality={100}
						width={60}
						height={60} />
					<div className={'text-sm cursor-pointer uppercase ml-2'}>
						<div className={'text-sx cursor-pointer mb-1 group-hover:underline'}>
							{currentAdventurer?.name ? currentAdventurer?.name : currentAdventurer?.tokenID}
						</div>
						<div className={'text-megaxs cursor-pointer group-hover:underline'}>
							{currentAdventurer ? `${CLASSES[currentAdventurer?.class].name} LVL ${currentAdventurer.level}` : null}
						</div>
					</div>
				</div> : <div className={'flex flex-center'}>
					<Image
						src={'/classes/front/placeholder.svg'}
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
	);
}

export default AdventurerModalMenu;