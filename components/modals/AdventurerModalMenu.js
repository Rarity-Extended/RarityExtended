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
		<div className={'hidden relative flex-row h-8 md:flex flex-center'}>
			<div onClick={openModal} className={'group hidden flex-row justify-end items-center mr-6 outline-none focus:outline-none cursor-pointer md:flex'}>
				{currentAdventurer ? <div className={'flex flex-center'}>
					<Image
						src={skin}
						quality={100}
						width={60}
						height={60} />
					<div className={'ml-2 text-sm cursor-pointer'}>
						<div className={'mb-1 text-lg group-hover:underline cursor-pointer'}>
							{currentAdventurer?.name ? currentAdventurer?.name : currentAdventurer?.tokenID}
						</div>
						<div className={'text-xs group-hover:underline opacity-80 cursor-pointer'}>
							{currentAdventurer ? `${CLASSES[currentAdventurer?.class].name} LVL ${currentAdventurer.level}` : null}
						</div>
					</div>
				</div> : <div className={'flex flex-center'}>
					<Image
						src={'/classes/front/placeholder.svg'}
						quality={100}
						width={60}
						height={60} />
					<div className={'ml-2 text-sm uppercase cursor-pointer'}>
						<div className={'mb-1 text-xs group-hover:underline cursor-pointer'}>
							{'Nobody'}
						</div>
						<div className={'text-megaxs group-hover:underline cursor-pointer'}>
							{`${address.slice(0, 4)}...${address.slice(-4)}`}
						</div>
					</div>
				</div>}
			</div>
		</div>
	);
}

export default AdventurerModalMenu;