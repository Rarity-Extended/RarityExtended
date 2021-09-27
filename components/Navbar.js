/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Monday September 6th 2021
**	@Filename:				Navbar.js
******************************************************************************/

import	React, {useState, useEffect}	from	'react';
import	Link							from	'next/link';
import	useWeb3							from	'contexts/useWeb3';
import	ModalLogin						from	'components/ModalLogin';
import	FlyoutMenu						from	'components/FlyoutMenu';
import	AdventurerModalMenu				from	'components/AdventurerModalMenu';
import	BoxAlternate					from	'components/BoxAlternate';
import	useUI							from	'contexts/useUI';

function	Arrow() {
	return (
		<button>
			<div className={'relative w-10 h-10 flex justify-center items-center text-regular bg-stone-secondary'}>
				{/* CHEVRON */}
				<svg className={'ml-0.5'} width={'24'} height={'24'} viewBox={'0 0 24 24'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
					<path d={'M8 2H12V6H16V10H20V14H16V18H12V22H8V18H12V14H16V10H12V6H8V2Z'} fill={'currentcolor'}/>
				</svg>

				{/* PIXEL CUSTOM BORDER */}
				<div className={'bg-black absolute h-1 top-0 left-1 right-1'} />
				<div className={'bg-black absolute h-1 w-1 top-1 left-0'} />
				<div className={'bg-black absolute h-1 w-1 top-1 right-0'} />
				<div className={'bg-black absolute w-1 top-2 bottom-2 left-0'} />
				<div className={'bg-black absolute w-1 top-2 bottom-2 right-0'} />
				<div className={'bg-black absolute h-1 bottom-0 left-1 right-1'} />
				<div className={'bg-black absolute h-1 w-1 top-0 right-0'} />
				<div className={'bg-black absolute h-1 w-1 top-0 left-0'} />
				<div className={'bg-black absolute h-1 w-1 bottom-0 right-0'} />
				<div className={'bg-black absolute h-1 w-1 bottom-0 left-0'} />

				{/* PIXEL CUSTOM EXTRA BORDER */}
				<div className={'bg-black absolute h-1 w-1 top-1 left-2'} />
				<div className={'bg-black absolute h-1 w-1 top-1 right-2'} />
				<div className={'bg-black absolute h-1 w-1 top-2 left-1'} />
				<div className={'bg-black absolute h-1 w-1 top-2 right-1'} />
				<div className={'bg-black absolute h-1 w-1 bottom-1 left-2'} />
				<div className={'bg-black absolute h-1 w-1 bottom-1 right-2'} />
				<div className={'bg-black absolute h-1 w-1 bottom-2 left-1'} />
				<div className={'bg-black absolute h-1 w-1 bottom-2 right-1'} />

				{/* PIXEL CUSTOM BACKGROUND */}
				<div className={'bg-stone-primary absolute h-1 w-1 top-1 right-0'} />
				<div className={'bg-stone-primary absolute h-1 w-1 top-0 right-1'} />
				<div className={'bg-stone-primary absolute h-1 w-1 top-1 right-1'} />
				<div className={'bg-stone-primary absolute h-1 w-1 bottom-1 right-0'} />
				<div className={'bg-stone-primary absolute h-1 w-1 bottom-0 right-1'} />
				<div className={'bg-stone-primary absolute h-1 w-1 bottom-1 right-1'} />
				<div className={'bg-stone-primary absolute h-1 w-1 top-1 left-0'} />
				<div className={'bg-stone-primary absolute h-1 w-1 top-1 left-1'} />
				<div className={'bg-stone-primary absolute h-1 w-1 bottom-1 left-0'} />
				<div className={'bg-stone-primary absolute h-1 w-1 bottom-1 left-1'} />
				<div className={'bg-stone-secondary-highlight absolute h-1 w-4 top-1 left-3'} />
				<div className={'bg-stone-secondary-highlight absolute h-4 w-1 top-3 left-1'} />
				<div className={'bg-stone-secondary-shadow absolute h-1 w-4 bottom-1 right-3'} />
				<div className={'bg-stone-secondary-shadow absolute h-4 w-1 bottom-3 right-1'} />

			</div>
		</button>
	);
}

function	Box({children}) {
	return (
		<div className={'relative bg-stone-secondary flex justify-center pl-4 w-full h-10 items-center text-regular text-black dark:text-white'}>
			{children}
			<div className={'bg-black absolute h-1 top-0 left-1 right-1'} />
			<div className={'bg-black absolute h-1 w-1 top-1 left-0'} />
			<div className={'bg-black absolute h-1 w-1 top-1 right-0'} />
			<div className={'bg-black absolute w-1 top-2 bottom-2 left-0'} />
			<div className={'bg-black absolute w-1 top-2 bottom-2 right-0'} />
			<div className={'bg-black absolute h-1 bottom-0 left-1 right-1'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-1 right-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-0 right-1'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-1 right-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-0 right-1'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-1 left-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-0 left-1'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-1 left-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-0 left-1'} />
			<div className={'bg-black absolute h-1 w-1 top-1 left-1'} />
			<div className={'bg-black absolute h-1 w-1 bottom-1 left-1'} />
			<div className={'bg-black absolute h-1 w-1 top-1 right-1'} />
			<div className={'bg-black absolute h-1 w-1 bottom-1 right-1'} />

			<div className={'bg-stone-primary absolute h-1 w-1 bottom-0 left-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 bottom-0 right-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-0 left-0'} />
			<div className={'bg-stone-primary absolute h-1 w-1 top-0 right-0'} />

			<div className={'bg-stone-secondary-highlight absolute h-1 top-1 left-2 right-2'} />
			<div className={'bg-stone-secondary-highlight absolute w-1 top-2 bottom-2 left-1'} />
			<div className={'bg-stone-secondary-shadow absolute h-1 bottom-1 left-2 right-2'} />
			<div className={'bg-stone-secondary-shadow absolute w-1 top-2 bottom-2 right-1'} />
		</div>
	);
}

function	Navbar({router}) {
	const	{customTheme} = useUI();
	const	{active, address} = useWeb3();
	const	[initialPopup, set_initialPopup] = useState(false);
	const	[modalLoginOpen, set_modalLoginOpen] = useState(false);

	useEffect(() => {
		if (initialPopup)
			return;

		if (!address) {
			set_modalLoginOpen(true);
		}
		set_initialPopup(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address]);

	function	leftBlock() {
		return (
			<div className={'w-82 min-w-82 relative bg-stone-primary border-r-4 border-black'}>
				{/* CORNER_DECORATIONS */}
				<div className={'w-1 h-1 absolute top-1 left-1 bg-black'} />
				<div className={'w-1 h-1 absolute top-2 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-1 right-1 bg-black'} />
				<div className={'w-1 h-1 absolute top-2 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-1 left-1 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-2 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-1 right-1 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-2 right-2 bg-black'} />
				{/* TOP_LEFT_TO_TOP_RIGHT */}
				<div className={'h-1 absolute top-1 left-5 right-5 bg-black'} />
				{/* TOP_BOTTOM_TO_BOTTOM_RIGHT */}
				<div className={'h-1 absolute bottom-1 left-5 right-5 bg-black'} />
				{/* TOP_LEFT */}
				<div className={'w-1 h-1 absolute top-2 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-3 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 left-3 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-5 left-1 bg-black'} />
				{/* TOP_TO_BOTTOM_LEFT */}
				<div className={'w-1 h-10 absolute top-6 left-1 bg-black'} />
				{/* BOTTOM_LEFT */}
				<div className={'w-1 h-1 absolute bottom-2 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-3 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 left-3 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-5 left-1 bg-black'} />
				{/* TOP_LEFT */}
				<div className={'w-1 h-1 absolute top-2 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-3 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 right-3 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-5 right-1 bg-black'} />
				{/* TOP_TO_BOTTOM_RIGHT */}
				<div className={'w-1 h-10 absolute top-6 right-1 bg-black'} />
				{/* BOTTOM_RIGHT */}
				<div className={'w-1 h-1 absolute bottom-2 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-3 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 right-3 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-5 right-1 bg-black'} />

				{/* TOP HIGHLIGHT */}
				<div className={'h-1 absolute top-2 left-5 right-5 bg-stone-primary-highlight'} />
				<div className={'h-2 w-1 absolute top-3 left-5 bg-stone-primary-highlight'} />
				<div className={'h-2 w-1 absolute top-4 left-4 bg-stone-primary-highlight'} />
				<div className={'h-1 w-2 absolute top-5 left-2 bg-stone-primary-highlight'} />
				<div className={'h-10 w-1 absolute top-5 left-2 bg-stone-primary-highlight'} />

				{/* BOTTOM SHADOW */}
				<div className={'h-1 absolute bottom-2 left-5 right-5 bg-stone-primary-shadow'} />
				<div className={'h-2 w-1 absolute bottom-3 right-5 bg-stone-primary-shadow'} />
				<div className={'h-2 w-1 absolute bottom-4 right-4 bg-stone-primary-shadow'} />
				<div className={'h-1 w-2 absolute bottom-5 right-2 bg-stone-primary-shadow'} />
				<div className={'h-10 w-1 absolute bottom-5 right-2 bg-stone-primary-shadow'} />

				<div className={'px-5 h-full flex items-center'}>
					<BoxAlternate
						className={'bg-stone-primary flex justify-between pl-4'}
						backgroundColor={'bg-stone-primary'}
						borderStyle={'bg-black'}>
						{'TOWN'}
						<Arrow />
					</BoxAlternate>
				</div>
			</div>
		);
	}
	function	centerBlock() {
		return (
			<div className={'w-full relative bg-stone-primary border-r-4 border-black'}>
				{/* CORNER_DECORATIONS */}
				<div className={'w-1 h-1 absolute top-1 left-1 bg-black'} />
				<div className={'w-1 h-1 absolute top-2 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-1 right-1 bg-black'} />
				<div className={'w-1 h-1 absolute top-2 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-1 left-1 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-2 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-1 right-1 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-2 right-2 bg-black'} />
				{/* TOP_LEFT_TO_TOP_RIGHT */}
				<div className={'h-1 absolute top-1 left-5 right-5 bg-black'} />
				{/* TOP_BOTTOM_TO_BOTTOM_RIGHT */}
				<div className={'h-1 absolute bottom-1 left-5 right-5 bg-black'} />
				{/* TOP_LEFT */}
				<div className={'w-1 h-1 absolute top-2 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-3 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 left-3 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-5 left-1 bg-black'} />
				{/* TOP_TO_BOTTOM_LEFT */}
				<div className={'w-1 h-10 absolute top-6 left-1 bg-black'} />
				{/* BOTTOM_LEFT */}
				<div className={'w-1 h-1 absolute bottom-2 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-3 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 left-3 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-5 left-1 bg-black'} />
				{/* TOP_LEFT */}
				<div className={'w-1 h-1 absolute top-2 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-3 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 right-3 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-5 right-1 bg-black'} />
				{/* TOP_TO_BOTTOM_RIGHT */}
				<div className={'w-1 h-10 absolute top-6 right-1 bg-black'} />
				{/* BOTTOM_RIGHT */}
				<div className={'w-1 h-1 absolute bottom-2 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-3 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 right-3 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-5 right-1 bg-black'} />

				{/* TOP HIGHLIGHT */}
				<div className={'h-1 absolute top-2 left-5 right-5 bg-stone-primary-highlight'} />
				<div className={'h-2 w-1 absolute top-3 left-5 bg-stone-primary-highlight'} />
				<div className={'h-2 w-1 absolute top-4 left-4 bg-stone-primary-highlight'} />
				<div className={'h-1 w-2 absolute top-5 left-2 bg-stone-primary-highlight'} />
				<div className={'h-10 w-1 absolute top-5 left-2 bg-stone-primary-highlight'} />

				{/* BOTTOM SHADOW */}
				<div className={'h-1 absolute bottom-2 left-5 right-5 bg-stone-primary-shadow'} />
				<div className={'h-2 w-1 absolute bottom-3 right-5 bg-stone-primary-shadow'} />
				<div className={'h-2 w-1 absolute bottom-4 right-4 bg-stone-primary-shadow'} />
				<div className={'h-1 w-2 absolute bottom-5 right-2 bg-stone-primary-shadow'} />
				<div className={'h-10 w-1 absolute bottom-5 right-2 bg-stone-primary-shadow'} />

				<div className={'px-8 h-full flex items-center'}>
					{'RARITY EXTENDED'}
				</div>
			</div>
		);
	}
	function	rightBlock() {
		return (
			<div className={'w-81 min-w-81 flex relative bg-stone-primary border-r-4 border-black'}>
				{/* CORNER_DECORATIONS */}
				<div className={'w-1 h-1 absolute top-1 left-1 bg-black'} />
				<div className={'w-1 h-1 absolute top-2 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-1 right-1 bg-black'} />
				<div className={'w-1 h-1 absolute top-2 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-1 left-1 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-2 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-1 right-1 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-2 right-2 bg-black'} />
				{/* TOP_LEFT_TO_TOP_RIGHT */}
				<div className={'h-1 absolute top-1 left-5 right-5 bg-black'} />
				{/* TOP_BOTTOM_TO_BOTTOM_RIGHT */}
				<div className={'h-1 absolute bottom-1 left-5 right-5 bg-black'} />
				{/* TOP_LEFT */}
				<div className={'w-1 h-1 absolute top-2 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-3 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 left-3 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-5 left-1 bg-black'} />
				{/* TOP_TO_BOTTOM_LEFT */}
				<div className={'w-1 h-10 absolute top-6 left-1 bg-black'} />
				{/* BOTTOM_LEFT */}
				<div className={'w-1 h-1 absolute bottom-2 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-3 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 left-3 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-5 left-1 bg-black'} />
				{/* TOP_LEFT */}
				<div className={'w-1 h-1 absolute top-2 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-3 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 right-3 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-5 right-1 bg-black'} />
				{/* TOP_TO_BOTTOM_RIGHT */}
				<div className={'w-1 h-10 absolute top-6 right-1 bg-black'} />
				{/* BOTTOM_RIGHT */}
				<div className={'w-1 h-1 absolute bottom-2 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-3 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 right-3 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-5 right-1 bg-black'} />

				{/* TOP HIGHLIGHT */}
				<div className={'h-1 absolute top-2 left-5 right-5 bg-stone-primary-highlight'} />
				<div className={'h-2 w-1 absolute top-3 left-5 bg-stone-primary-highlight'} />
				<div className={'h-2 w-1 absolute top-4 left-4 bg-stone-primary-highlight'} />
				<div className={'h-1 w-2 absolute top-5 left-2 bg-stone-primary-highlight'} />
				<div className={'h-10 w-1 absolute top-5 left-2 bg-stone-primary-highlight'} />

				{/* BOTTOM SHADOW */}
				<div className={'h-1 absolute bottom-2 left-5 right-5 bg-stone-primary-shadow'} />
				<div className={'h-2 w-1 absolute bottom-3 right-5 bg-stone-primary-shadow'} />
				<div className={'h-2 w-1 absolute bottom-4 right-4 bg-stone-primary-shadow'} />
				<div className={'h-1 w-2 absolute bottom-5 right-2 bg-stone-primary-shadow'} />
				<div className={'h-10 w-1 absolute bottom-5 right-2 bg-stone-primary-shadow'} />

				<div className={'px-5 h-full flex items-center w-full'}>
					<BoxAlternate
						className={'bg-stone-primary flex justify-between pl-4'}
						backgroundColor={'bg-stone-primary'}
						borderStyle={'bg-black'}>
						{'BARBARIAN LVL 2'}
						<Arrow />
					</BoxAlternate>
				</div>
			</div>
		);
	}
	function	rightestBlock() {
		return (
			<div className={'w-69 min-w-69 flex relative bg-stone-primary'}>
				{/* CORNER_DECORATIONS */}
				<div className={'w-1 h-1 absolute top-1 left-1 bg-black'} />
				<div className={'w-1 h-1 absolute top-2 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-1 right-1 bg-black'} />
				<div className={'w-1 h-1 absolute top-2 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-1 left-1 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-2 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-1 right-1 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-2 right-2 bg-black'} />
				{/* TOP_LEFT_TO_TOP_RIGHT */}
				<div className={'h-1 absolute top-1 left-5 right-5 bg-black'} />
				{/* TOP_BOTTOM_TO_BOTTOM_RIGHT */}
				<div className={'h-1 absolute bottom-1 left-5 right-5 bg-black'} />
				{/* TOP_LEFT */}
				<div className={'w-1 h-1 absolute top-2 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-3 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 left-3 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-5 left-1 bg-black'} />
				{/* TOP_TO_BOTTOM_LEFT */}
				<div className={'w-1 h-10 absolute top-6 left-1 bg-black'} />
				{/* BOTTOM_LEFT */}
				<div className={'w-1 h-1 absolute bottom-2 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-3 left-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 left-3 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 left-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-5 left-1 bg-black'} />
				{/* TOP_LEFT */}
				<div className={'w-1 h-1 absolute top-2 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-3 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 right-3 bg-black'} />
				<div className={'w-1 h-1 absolute top-4 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute top-5 right-1 bg-black'} />
				{/* TOP_TO_BOTTOM_RIGHT */}
				<div className={'w-1 h-10 absolute top-6 right-1 bg-black'} />
				{/* BOTTOM_RIGHT */}
				<div className={'w-1 h-1 absolute bottom-2 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-3 right-4 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 right-3 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-4 right-2 bg-black'} />
				<div className={'w-1 h-1 absolute bottom-5 right-1 bg-black'} />

				{/* TOP HIGHLIGHT */}
				<div className={'h-1 absolute top-2 left-5 right-5 bg-stone-primary-highlight'} />
				<div className={'h-2 w-1 absolute top-3 left-5 bg-stone-primary-highlight'} />
				<div className={'h-2 w-1 absolute top-4 left-4 bg-stone-primary-highlight'} />
				<div className={'h-1 w-2 absolute top-5 left-2 bg-stone-primary-highlight'} />
				<div className={'h-10 w-1 absolute top-5 left-2 bg-stone-primary-highlight'} />

				{/* BOTTOM SHADOW */}
				<div className={'h-1 absolute bottom-2 left-5 right-5 bg-stone-primary-shadow'} />
				<div className={'h-2 w-1 absolute bottom-3 right-5 bg-stone-primary-shadow'} />
				<div className={'h-2 w-1 absolute bottom-4 right-4 bg-stone-primary-shadow'} />
				<div className={'h-1 w-2 absolute bottom-5 right-2 bg-stone-primary-shadow'} />
				<div className={'h-10 w-1 absolute bottom-5 right-2 bg-stone-primary-shadow'} />

				<div className={'px-5 h-full flex items-center w-full'}>
					<Box
						className={'bg-stone-primary flex justify-between pl-4'}
						backgroundColor={'bg-stone-primary'}
						borderStyle={'bg-black'}>
						{'0x00...0000'}
					</Box>
				</div>
			</div>
		);
	}


	function	renderWalletButton() {
		if (!active) {
			return (
				<button
					onClick={() => set_modalLoginOpen(true)}
					className={'inline-flex px-3 py-2 items-center leading-4 text-xs cursor-pointer whitespace-nowrap font-semibold '}>
					<span className={'hidden md:flex'}>{'Connect wallet'}</span>
					<span className={'flex md:hidden'}>{'Connect'}</span>
				</button>
			);
		}
		return (
			<AdventurerModalMenu />
		);
	}
	if (customTheme === 'stone') {
		return (
			<nav className={'relative w-full flex flex-row border-4 border-black h-22'}>
				{leftBlock()}
				{centerBlock()}
				{rightBlock()}
				{rightestBlock()}
				<ModalLogin open={modalLoginOpen} set_open={set_modalLoginOpen} />
			</nav>
		);
	}

	return (
		<nav className={'relative w-full flex flex-col md:flex-row justify-start md:h-20 border-b-4 border-black dark:border-dark-100 mb-4 md:mb-4 pb-0 md:pb-4'}>
			<div className={'items-center justify-start flex flex-row whitespace-normal md:whitespace-nowrap text-lg'}>
				<div className={'w-full'}>
					<Link href={'/'}>
						<p className={'block md:hidden'}>{'RE'}</p>
					</Link>
					<Link href={'/'}>
						<p className={'hidden md:block'}>{'Rarity Extended'}</p>
					</Link>
				</div>
				<div className={'items-center justify-end flex-row flex md:hidden w-full'}>
					{renderWalletButton()}
				</div>
			</div>
			<div className={'items-center justify-start md:justify-end flex flex-row w-full mt-3 md:mt-0'}>
				<div className={'group items-center justify-end flex-row flex mr-6 cursor-pointer'} onClick={() => router.push('/')}>
					<span>
						<span className={`cursor-pointer inline mb-1 mr-2 group-hover:opacity-100 text-xs md:text-sm ${router.pathname === '/' ? 'opacity-100' : 'opacity-5'}`}>{'>'}</span>
						<span className={'text-sm cursor-pointer'}>
							<span className={'text-xs hidden md:inline cursor-pointer'}>{'Adventurers'}</span>
							<span className={'text-xs inline md:hidden cursor-pointer'}>{'Adv'}</span>
						</span>
					</span>
				</div>
				<div className={'group items-center justify-end flex-row flex mr-6 cursor-pointer'} onClick={() => router.push('/inventory')}>
					<span>
						<span className={`cursor-pointer inline mb-1 mr-2 group-hover:opacity-100 text-xs md:text-sm ${router.pathname === '/inventory' ? 'opacity-100' : 'opacity-5'}`}>{'>'}</span>
						<span className={'text-sm cursor-pointer'}>
							<span className={'text-xs hidden md:inline cursor-pointer'}>{'Inventory'}</span>
							<span className={'text-xs inline md:hidden cursor-pointer'}>{'Inv'}</span>
						</span>
					</span>
				</div>
				<FlyoutMenu />
				<div className={'items-center justify-end flex-row border-black dark:border-dark-100 border-l-4 pl-6 ml-6 hidden md:flex'}>
					{renderWalletButton()}
				</div>
			</div>
			<ModalLogin open={modalLoginOpen} set_open={set_modalLoginOpen} />
		</nav>
	);
}

export default Navbar;
