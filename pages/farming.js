import	React, {Fragment, useState}	from	'react';
import	Image						from	'next/image';
import	{ethers}					from	'ethers';
import	{Dialog, Transition}		from	'@headlessui/react';
import	useWeb3						from	'contexts/useWeb3';
import	useRarity					from	'contexts/useRarity';
import	Template					from	'components/templates/Adventurer';
import	IconHelp					from	'components/icons/IconHelp';

const	RARITY_EXTENDED_WOOD_FARM = [
	'0x21Ad14F2f3412c1b248eaA7f312f48129752f614',
	'0xb9F06Fa13fA7A90B877045EAeA2A387291634335',
	'0x648500d8EDf00255D18F4B933469df60cD575aC6',
	'0xb3141a205f298936dbEBea8af4ab21A87D3C045A',
	'0xD0BE3D214Da1dA948237a23494C8F6efe570d83f',
	'0x2498149b722c6F443d2aDa4458d31E6BDa19460b',
	'0xa687731D5874908B63Db770F38f10c1C1111C623',
];

const	WOOD_TIERS = [
	{name: 'Wood', tier: 0, src: '/farming/tree_1.png', width: 152, height: 248, cost: [], unlocked: true},
	{name: 'Soft Wood', tier: 1, src: '/farming/tree_5.png', width: 152, height: 248, cost: [
		{name: 'Wood', src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png', amount: 12}
	]},
	{name: 'Fine Wood', tier: 2, src: '/farming/tree_8.png', width: 152, height: 248, cost: [
		{name: 'Wood', src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png', amount: 6},
		{name: 'Soft Wood', src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png', amount: 36}
	]},
	{name: 'Seasoned Wood', tier: 3, src: '/farming/tree_4.png', width: 152, height: 248, cost: [
		{name: 'Wood', src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png', amount: 6},
		{name: 'Soft Wood', src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png', amount: 18},
		{name: 'Fine Wood', src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png', amount: 72},
	]},
	{name: 'Hard Wood', tier: 4, src: '/farming/tree_7.png', width: 152, height: 248, cost: [
		{name: 'Wood', src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png', amount: 6},
		{name: 'Soft Wood', src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png', amount: 18},
		{name: 'Fine Wood', src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png', amount: 36},
		{name: 'Seasoned Wood', src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png', amount: 120},
	]},
	{name: 'Elder Wood', tier: 5, src: '/farming/tree_11.png', width: 294, height: 271, cost: [
		{name: 'Wood', src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png', amount: 6},
		{name: 'Soft Wood', src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png', amount: 18},
		{name: 'Fine Wood', src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png', amount: 36},
		{name: 'Seasoned Wood', src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png', amount: 60},
		{name: 'Hard Wood', src: '/items/0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1.png', amount: 180},
	]},
];

const	MINE_TIERS = [
	{name: 'Copper Ore', tier: 0, src: '/farming/ore-copper.png', width: 256, height: 256, cost: [], unlocked: true},
	{name: 'Iron Ore', tier: 1, src: '/farming/ore-iron.png', width: 256, height: 256, cost: [
		{name: 'Copper Ore', src: '/farming/ore-copper.png', amount: 12}
	]},
	{name: 'Gold Ore', tier: 2, src: '/farming/ore-gold.png', width: 256, height: 256, cost: [
		{name: 'Copper Ore', src: '/farming/ore-copper.png', amount: 6},
		{name: 'Iron Ore', src: '/farming/ore-iron.png', amount: 36}
	]},
	{name: 'Platinum Ore', tier: 3, src: '/farming/ore-platinium.png', width: 256, height: 256, cost: [
		{name: 'Copper Ore', src: '/farming/ore-copper.png', amount: 6},
		{name: 'Iron Ore', src: '/farming/ore-iron.png', amount: 18},
		{name: 'Gold Ore', src: '/farming/ore-gold.png', amount: 72},
	]},
	{name: 'Mithril Ore', tier: 4, src: '/farming/ore-mirthril.png', width: 256, height: 256, cost: [
		{name: 'Copper Ore', src: '/farming/ore-copper.png', amount: 6},
		{name: 'Iron Ore', src: '/farming/ore-iron.png', amount: 18},
		{name: 'Gold Ore', src: '/farming/ore-gold.png', amount: 36},
		{name: 'Platinum Ore', src: '/farming/ore-platinium.png', amount: 120},
	]},
	{name: 'Orichalcum Ore', tier: 5, src: '/farming/ore-orichalcum.png', width: 256, height: 256, cost: [
		{name: 'Copper Ore', src: '/farming/ore-copper.png', amount: 6},
		{name: 'Iron Ore', src: '/farming/ore-iron.png', amount: 18},
		{name: 'Gold Ore', src: '/farming/ore-gold.png', amount: 36},
		{name: 'Platinum Ore', src: '/farming/ore-platinium.png', amount: 60},
		{name: 'Mithril Ore', src: '/farming/ore-mirthril.png', amount: 180},
	]},
];


function	ElementFarm({index, name, tier, src, width, height, cost, unlocked}) {
	const	{provider} = useWeb3();
	const	{currentAdventurer} = useRarity();
	const	[estimateHarvest, set_estimateHarvest] = useState(0);
	const	[hasAccess, set_hasAccess] = useState(unlocked || false);

	React.useEffect(() => {
		if (provider && currentAdventurer) {
			const	contract = new ethers.Contract(
				RARITY_EXTENDED_WOOD_FARM[tier],
				[
					'function estimateHarvest(uint _adventurer) public view returns (uint)',
					'function adventurerHasAccess(uint _adventurer) public view returns (bool)'
				],
				provider
			);
			contract.estimateHarvest(currentAdventurer.tokenID).then((e) => set_estimateHarvest(Number(e)));
			contract.adventurerHasAccess(currentAdventurer.tokenID).then((e) => set_hasAccess(unlocked ? unlocked : e));
		}
	}, [provider, currentAdventurer, tier]);

	if (!hasAccess) {
		return (
			<div className={`grid grid-cols-7 gap-x-8 p-4 border-b border-dark-600 ${index === 0 ? 'border-t' : ''}`}>
				<div className={'flex flex-row col-span-2'}>
					<div className={'flex w-20 h-20 bg-500 flex-center'}>
						<Image src={src} width={64} height={64} objectFit={'contain'} />
					</div>
					<div className={'flex flex-col ml-4'}>
						<p className={'mb-1 text-base font-bold text-plain'}>
							{name}
						</p>
						<p className={'text-sm text-plain-60'}>
							{`Tier ${tier}`}
						</p>
						<p className={'text-sm text-plain-60'}>
							{`Require Woodcutter Lvl ${tier}`}
						</p>
					</div>
				</div>

				<div className={'col-span-4'}>
					<p className={'mb-1 text-sm text-black dark:text-dark-200 opacity-60'}>
						{'Cost'}
					</p>
					<div className={'flex flex-row space-x-2'}>
						{cost.map((e) => (
							<div key={e.name} className={''}>
								<div className={'relative p-2 w-14 h-14 bg-500 image-wrapper'}>
									<Image src={e.src} width={48} height={48} />
									<div className={'absolute right-1 bottom-1 text-sm'}>
										{`x${e.amount}`}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className={'flex col-span-1 flex-center'}>
					<div className={'flex flex-row space-x-2 w-full'}>
						<button
							disabled={tier > 1}
							className={'flex w-full flex-center button-highlight'}>
							<p>{'Unlock'}</p>
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={'flex flex-col p-4 bg-500'}>
			<p className={'mb-1 text-base font-bold text-plain'}>
				{name}
			</p>
			<p className={'mb-2 text-sm text-plain-60'}>
				{`Tier ${tier}`}
			</p>
			<div className={'flex flex-row justify-center pb-2 mb-4 w-full'}>
				<div className={'flex h-48'}>
					<Image src={src} width={width} height={height} objectFit={'contain'} />
				</div>
			</div>
			<div className={'flex flex-row mt-auto space-x-2'}>
				<button
					className={'flex mt-4 w-full flex-center button-highlight'}>
					<p>{`Harvest (~${estimateHarvest} ${name})`}</p>
				</button>
			</div>
		</div>
	);
}

function	ModalHelp({isOpen, set_isOpen}) {
	function closeModal() {
		set_isOpen(false);
	}
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as={'div'}
				className={'overflow-y-auto fixed inset-0 z-10'}
				onClose={closeModal}>
				<div className={'px-4 min-h-screen text-center'}>
					<Transition.Child
						as={Fragment}
						enter={'ease-out duration-300'} enterFrom={'opacity-0'} enterTo={'opacity-100'}
						leave={'ease-in duration-200'} leaveFrom={'opacity-100'} leaveTo={'opacity-0'}>
						<Dialog.Overlay className={'fixed inset-0 bg-black/50 transition-opacity'} />
					</Transition.Child>
					
					<span className={'inline-block h-screen align-middle'} aria-hidden={'true'}>&#8203;</span>
					
					<Transition.Child
						as={Fragment}
						enter={'ease-out duration-300'}
						enterFrom={'opacity-0 scale-95'}
						enterTo={'opacity-100 scale-100'}
						leave={'ease-in duration-200'}
						leaveFrom={'opacity-100 scale-100'}
						leaveTo={'opacity-0 scale-95'}>
						<div className={'inline-block overflow-hidden relative p-6 my-8 w-full max-w-screen font-story text-left align-middle transition-all md:max-w-screen-lg box'}>
							<Dialog.Title as={'h3'} className={'text-lg font-bold text-plain'}>
								{'Rarity 101 - Farming'}
							</Dialog.Title>
							<div className={'mt-2 space-y-2 text-sm text-plain-60'}>
								<p>
									{'One of the basic features of any role playing game is the ability to collect ressources to be able to build, craft and upgrade your equipements and weapons. There are different ways to do that: by hunting some peaceful animals, by fighting agains frightening monsters, or simply by harvesting some natural resources.'}
								</p>
								<p>
									{'With the Rarity Farming contracts, you can gather ressources from the land, either Wood, Minerals or Herbs. The contract will be automatically renewed every day. Each harvest will give you between 1 and 3 materials, with a bonus depending on your profession level.'}
								</p>
								<p>
									{'Every harvest will also give you a fixed amount of experience, with a base of 250xp per harvest for your current Farm Tier. If you harvest lower tier, you will earn less xp (-20% per difference between your level and the tier).'}
								</p>
								<p>
									{'Once you have enough XP, you can spend it to level up your profession. This will allow you to unlock more farms, unlock new type of ressources and earn more loot per harvest.'}
								</p>
								<p>
									{'There is currently 3 professions: Herbalist, Woodcutter and Miner. None of them are exclusive to one another, but each one has a different set of ressources to gather.'}
								</p>
							</div>
							<div className={'mt-4 text-base font-bold text-plain'}>
								<h4>{'Woodcutter'}</h4>
							</div>
							<div className={'mt-2 space-y-2 text-sm text-plain-60'}>
								<p>
									{'The hard work of a Woodcutter is as varied as it is rewarding. Every society is in need of food, shelter, and warmth. The Woodcutter helps provide all three of these by; clearing the area of its trees for the use of crops and using the resources for building houses, weapons, tools and for the much needed fire to fend of the frost.'}
								</p>
							</div>
							<div className={'mt-4 text-base font-bold text-plain'}>
								<h4>{'Miner'}</h4>
							</div>
							<div className={'mt-2 space-y-2 text-sm text-plain-60'}>
								<p>
									{'The hard work of a Woodcutter is as varied as it is rewarding. Every society is in need of food, shelter, and warmth. The Woodcutter helps provide all three of these by; clearing the area of its trees for the use of crops and using the resources for building houses, weapons, tools and for the much needed fire to fend of the frost.'}
								</p>
							</div>
							<div className={'mt-4 text-base font-bold text-plain'}>
								<h4>{'Herbalist'}</h4>
							</div>
							<div className={'mt-2 space-y-2 text-sm text-plain-60'}>
								<p>
									{'The hard work of a Woodcutter is as varied as it is rewarding. Every society is in need of food, shelter, and warmth. The Woodcutter helps provide all three of these by; clearing the area of its trees for the use of crops and using the resources for building houses, weapons, tools and for the much needed fire to fend of the frost.'}
								</p>
							</div>

							<div className={'mt-6'}>
								<button className={'button-highlight'} onClick={closeModal}>
									{'Got it, thanks!'}
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
}

function	TabFarmWood() {
	return (
		<>
			<div className={'grid grid-cols-1 gap-4 md:grid-cols-4'}>
				{WOOD_TIERS.filter(e => e.unlocked).map((tier) => (
					<ElementFarm key={tier.name} forceAccess {...tier} />	
				))}
			</div>

			<div className={'mt-12'}>
				<p className={'mb-2 text-lg font-bold text-plain'}>{'Farming Slots'}</p>
				<p className={'w-3/4 text-sm font-normal text-plain-60'}>
					{'Once you reach the required level and have enough resources, you can unlock a slot for your farm. You can have as much slots as you want and you can harvest each slot once a day.'}
				</p>
			</div>
			<div className={'grid grid-cols-1 mt-4'}>
				{WOOD_TIERS.filter(e => !e.unlocked).map((tier, index) => (
					<ElementFarm key={tier.name} index={index} {...tier} />	
				))}
			</div>
		</>
	);
}


function	TabFarmMine() {
	return (
		<>
			<div className={'grid grid-cols-1 gap-4 md:grid-cols-4'}>
				{MINE_TIERS.filter(e => e.unlocked).map((tier) => (
					<ElementFarm key={tier.name} {...tier} />	
				))}
			</div>

			<div className={'mt-12'}>
				<p className={'mb-2 text-lg font-bold text-plain'}>{'Farming Slots'}</p>
				<p className={'w-3/4 text-sm font-normal text-plain-60'}>
					{'Once you reach the required level and have enough resources, you can unlock a slot for your farm. You can have as much slots as you want and you can harvest each slot once a day.'}
				</p>
			</div>
			<div className={'grid grid-cols-1 mt-4'}>
				{MINE_TIERS.filter(e => !e.unlocked).map((tier, index) => (
					<ElementFarm key={tier.name} index={index} {...tier} />	
				))}
			</div>
		</>
	);
}

function	Index() {
	const	[tab, set_tab] = React.useState(0);
	const	[helpModalIsOpen, set_helpModalIsOpen] = useState(false);
	const	farms = [
		{name: 'Woodcutter'},
		{name: 'Miner'},
	];

	return (
		<div id={'content'} className={'p-4 box'}>
			<div className={'flex flex-col pb-2 mb-6 border-b-2 dark:border-b-dark-300'}>
				<div className={'flex flex-row items-center mb-4'}>
					<h2 className={'text-base font-bold text-plain'}>{'Farming'}</h2>
					<div className={'flex ml-2 h-6 flex-center'} onClick={() => set_helpModalIsOpen(true)}>
						<IconHelp />
						<ModalHelp isOpen={helpModalIsOpen} set_isOpen={set_helpModalIsOpen} />
					</div>
				</div>
				<div className={'flex relative flex-row items-center space-x-4'}>
					{farms.map(({name}, index) => (
						<div
							key={name}
							onClick={() => set_tab(index)}
							className={`p-2 -mb-2 ${index === 0 ? 'pl-0' : ''} ${tab === index ? 'text-plain border-b-2 dark:border-b-dark-primary' : 'cursor-pointer text-plain-60 hover-text-plain border-b-2 border-transparent'}`}>
							<p className={'text-sm'}>{name}</p>
						</div>
					))}
				</div>
			</div>

			{tab === 0 ? <TabFarmWood /> : null}
			{tab === 1 ? <TabFarmMine /> : null}
		</div>
	);
}


Index.getLayout = function getLayout(page) {
	return (
		<Template>
			{page}
		</Template>
	);
};

export default Index;
