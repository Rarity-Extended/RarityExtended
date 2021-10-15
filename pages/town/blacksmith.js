/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				blacksmith.js
******************************************************************************/

import	React, {useState, useEffect}		from	'react';
import	{ethers}							from	'ethers';
import	{Provider, Contract}				from	'ethcall';
import	Image								from	'next/image';
import	Typer								from	'components/Typer';
import	DialogBox							from	'components/DialogBox';
import	Box									from	'components/Box';
import	ModalSkills							from	'components/ModalSkills';
import	useWeb3								from	'contexts/useWeb3';
import	useRarity							from	'contexts/useRarity';
import	SectionArtifactsTheForest			from	'sections/SectionArtifactsTheForest';
import	SectionRestoreArtifactsTheForest	from	'sections/SectionRestoreArtifactsTheForest';
import	SectionCrafting						from	'sections/SectionCrafting';
import	RARITY_ABI							from	'utils/abi/rarity.abi';
import	RARITY_GOLD_ABI						from	'utils/abi/rarityGold.abi';
import	THE_CELLAR_ABI						from	'utils/abi/dungeonTheCellar.abi';
import	{approveERC20}						from	'utils/actions';
import 	Townwidget 							from 	'components/TownWidget';
import 	{ TOWN } 							from 	'utils';


async function newEthCallProvider(provider, devMode) {
	const	ethcallProvider = new Provider();
	if (devMode) {
		await	ethcallProvider.init(new ethers.providers.JsonRpcProvider('http://localhost:8545'));
		ethcallProvider.multicallAddress = '0xc04d660976c923ddba750341fe5923e47900cf24';
		return ethcallProvider;
	}
	await	ethcallProvider.init(provider);
	return	ethcallProvider;
}

function	DialogChoices({router, adventurersCount, set_category, approveStatus, adventurerCanCraft, adventurerHasXp, approveGold, approveCraftingMaterials, openModalSkills}) {
	const	[selectedOption, set_selectedOption] = useState(0);
	const	[dialogNonce, set_dialogNonce] = useState(0);
	const	{currentAdventurer} = useRarity();

	useEffect(() => {
		set_selectedOption(0);
		set_dialogNonce(n => n + 1);
	}, [currentAdventurer?.tokenID, router?.asPath]);

	if (adventurersCount === 0) {
		return (
			<DialogBox
				selectedOption={selectedOption}
				nonce={dialogNonce}
				options={[
					{label: 'GO TO THE TAVERN', onClick: () => router.push('/town/tavern?tab=recruit')},
				]} />
		);
	}
	if (router?.query?.tab === 'workshop') {
		const	options = [];

		if (!adventurerCanCraft) {
			if (!currentAdventurer?.attributes?.isInit) {
				return (
					<DialogBox
						selectedOption={selectedOption}
						nonce={dialogNonce}
						options={[{label: 'Nevermind', onClick: () => router.push('/town/blacksmith')}]} />
				);	
			}
			return (
				<DialogBox
					selectedOption={selectedOption}
					nonce={dialogNonce}
					options={[
						{
							label: (<>{'LEARN HOW TO '}<span className={'text-tag-info'}>{'CRAFT'}</span></>),
							onClick: () => openModalSkills()
						},
						{label: 'Nevermind', onClick: () => router.push('/town/blacksmith')},
					]} />
			);
		}
		if (!adventurerHasXp) {
			return (
				<DialogBox
					selectedOption={selectedOption}
					nonce={dialogNonce}
					options={[
						{label: 'Nevermind', onClick: () => router.push('/town/blacksmith')},
					]} />
			);
		}
		if (!approveStatus.approvedGold) {
			options.push({
				label: 'APPROVE GOLD FOR CRAFTING',
				onClick: () => approveGold()
			});
		}
		if (!approveStatus.approvedCraftingMaterials) {
			options.push({
				label: 'APPROVE CRAFTING MATERIALS',
				onClick: () => approveCraftingMaterials()
			});
		}
		if (options.length > 0) {
			options.push({label: 'Nevermind', onClick: () => router.push('/town/blacksmith')});
			return (
				<DialogBox
					selectedOption={selectedOption}
					nonce={dialogNonce}
					options={options} />
			);
		}

		return (
			<DialogBox
				selectedOption={selectedOption}
				nonce={dialogNonce}
				options={[
					{
						label: (<>{'CRAFT SOME '}<span className={'text-tag-info'}>{'GOODS'}</span></>),
						onClick: () => set_category(0)
					},
					{
						label: (<>{'CRAFT SOME '}<span className={'text-tag-info'}>{'ARMORS'}</span></>),
						onClick: () => set_category(1)
					},
					{
						label: (<>{'CRAFT SOME '}<span className={'text-tag-info'}>{'WEAPONS'}</span></>),
						onClick: () => set_category(2)
					},
					{label: 'Nevermind', onClick: () => router.push('/town/blacksmith')},
				]} />
		);
	}
	return (
		<DialogBox
			selectedOption={selectedOption}
			nonce={dialogNonce}
			options={[
				{label: 'WELCOME', onClick: () => router.push('/town/blacksmith')},
				{label: 'Access the Workshop', onClick: () => router.push('/town/blacksmith?tab=workshop')},
				{label: 'Upgrade an Artifact', onClick: () => router.push('/town/blacksmith?tab=upgrade')},
				{label: 'Restore an Artifact', onClick: () => router.push('/town/blacksmith?tab=restore')},
			]} />
	);
}

function	NCPHeadline({router, approveStatus, adventurerCanCraft, adventurerHasXp, currentAdventurer}) {
	const	[nonce, set_nonce] = useState(0);
	const	[npcTextIndex, set_npcTextIndex] = useState(0);
	
	const	[hadInitialMessage, set_hadInitialMessage] = useState(false);
	const	[hadUpgradeMessage, set_hadUpgradeMessage] = useState(false);
	const	[hadRestoreMessage, set_hadRestoreMessage] = useState(false);
	const	[hadWorkshopMessage, set_hadWorkshopMessage] = useState(false);

	useEffect(() => {
		set_npcTextIndex(0);
		set_nonce(n => n+1);
	}, [router?.query?.tab, approveStatus, currentAdventurer?.tokenID, adventurerCanCraft, adventurerHasXp]);

	const	renderNCPText = () => {
		if (router?.query?.tab === 'upgrade') {
			if (hadUpgradeMessage) {
				return (
					<>
						{'YOU WENT IN '}
						<span className={'text-tag-info'}>{'THE FOREST'}</span>
						{' AND FOUND SOMETHING ? I HAVE SOME STUFF I COULD USE TO '}
						<span className={'text-tag-info'}>{'UPGRADE'}</span>
						{' THEM. WHICH ONE DO YOU WANT TO UPGRADE?'}
					</>		
				);
			}
			return (
				<>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
						{'YOU WENT IN '}
					</Typer>&nbsp;
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
						{'THE FOREST'}
					</Typer></span>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
						{' AND FOUND SOMETHING ? I HAVE SOME STUFF I COULD USE TO '}
					</Typer>
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
						{'UPGRADE'}
					</Typer></span>
					<Typer
						onDone={() => {
							set_npcTextIndex(i => i + 1);
							set_hadUpgradeMessage(true);
						}}
						shouldStart={npcTextIndex === 4}>
						{' THEM. WHICH ONE DO YOU WANT TO UPGRADE?'}
					</Typer>
				</>
			);
		}
		if (router?.query?.tab === 'restore') {
			if (hadRestoreMessage) {
				return (
					<>
						{'IF YOU HAVE SOME RUSTY ARTIFACTS FROM '}
						<span className={'text-tag-info'}>{'THE OLD FOREST'}</span>
						{', I CAN RESTORE THEM FOR FREE!'}
					</>		
				);
			}
			return (
				<>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
						{'IF YOU HAVE SOME RUSTY ARTIFACTS FROM '}
					</Typer>&nbsp;
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
						{'THE OLD FOREST'}
					</Typer></span>
					<Typer
						onDone={() => {
							set_npcTextIndex(i => i + 1);
							set_hadRestoreMessage(true);
						}}
						shouldStart={npcTextIndex === 2}>
						{', I CAN RESTORE THEM FOR FREE!'}
					</Typer>
				</>
			);
		}
		if (router?.query?.tab === 'workshop') {
			if (!adventurerCanCraft) {
				if (hadWorkshopMessage) {
					return (
						<>
							{'ONLY SOMEONE WHO KNOWS THE '}
							<span className={'text-tag-info'}>{'CRAFT SKILL'}</span>
							{' CAN ACCESS THIS WORKSHOP! LEARN IT FIRST THEN COME BACK!'}
						</>		
					);
				}
				return (
					<>
						<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
							{'ONLY SOMEONE WHO KNOWS THE '}
						</Typer>
						<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
							{'CRAFT SKILL'}
						</Typer></span>
						<Typer
							onDone={() => {
								set_npcTextIndex(i => i + 1);
								set_hadWorkshopMessage(true);
							}}
							shouldStart={npcTextIndex === 2}>
							{' CAN ACCESS THIS WORKSHOP! LEARN IT FIRST THEN COME BACK!'}
						</Typer>
					</>
				);
			}
			if (!adventurerHasXp) {
				if (hadWorkshopMessage) {
					return (
						<>
							{'YOU LOOK TIRED TODAY. YOU NEED AT LEAST '}
							<span className={'text-tag-info'}>{'250 XP'}</span>
							{' TO CRAFT SOMETHING. GO ON AN ADVENTURE AND COME BACK WHEN YOU ARE READY!'}
						</>		
					);
				}
				return (
					<>
						<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
							{'YOU LOOK TIRED TODAY. YOU NEED AT LEAST '}
						</Typer>
						<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
							{'250 XP'}
						</Typer></span>
						<Typer
							onDone={() => {
								set_npcTextIndex(i => i + 1);
								set_hadWorkshopMessage(true);
							}}
							shouldStart={npcTextIndex === 2}>
							{' TO CRAFT SOMETHING. GO ON AN ADVENTURE AND COME BACK WHEN YOU ARE READY!'}
						</Typer>
					</>
				);
			}
			if (!approveStatus.approvedGold && !approveStatus.approvedCraftingMaterials) {
				if (hadWorkshopMessage) {
					return (
						<>
							{'YOU ARE HERE TO '}
							<span className={'text-tag-info'}>{'CRAFT'}</span>
							{' SOMETHING? PERFECT! PLEASE ALLOW ME TO USE SOME OF YOUR '}
							<span className={'text-tag-info'}>{'GOLD'}</span>
							{' AS WELL AS SOME OF YOUR '}
							<span className={'text-tag-info'}>{'RAT SKINS'}</span>
							{'! WE WILL BEGIN IMMEDIATELY!'}
						</>		
					);
				}
				return (
					<>
						<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
							{'YOU ARE HERE TO '}
						</Typer>
						<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
							{'CRAFT'}
						</Typer></span>
						<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
							{' SOMETHING? PERFECT! PLEASE ALLOW ME TO USE SOME OF YOUR '}
						</Typer>
						<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
							{'GOLD'}
						</Typer></span>
						<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 4}>
							{' AS WELL AS SOME OF YOUR '}
						</Typer>
						<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 5}>
							{'RAT SKINS'}
						</Typer></span>
						<Typer
							onDone={() => {
								set_npcTextIndex(i => i + 1);
								set_hadWorkshopMessage(true);
							}}
							shouldStart={npcTextIndex === 6}>
							{'! WE WILL BEGIN IMMEDIATELY!'}
						</Typer>
					</>
				);
			}
			if (!approveStatus.approvedGold) {
				if (hadWorkshopMessage) {
					return (
						<>
							{'YOU ARE HERE TO '}
							<span className={'text-tag-info'}>{'CRAFT'}</span>
							{' SOMETHING? PERFECT! PLEASE ALLOW ME TO USE SOME OF YOUR '}
							<span className={'text-tag-info'}>{'GOLD'}</span>
							{'! WE WILL BEGIN IMMEDIATELY!'}
						</>		
					);
				}
				return (
					<>
						<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
							{'YOU ARE HERE TO '}
						</Typer>
						<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
							{'CRAFT'}
						</Typer></span>
						<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
							{' SOMETHING? PERFECT! PLEASE ALLOW ME TO USE SOME OF YOUR '}
						</Typer>
						<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
							{'GOLD'}
						</Typer></span>
						<Typer
							onDone={() => {
								set_npcTextIndex(i => i + 1);
								set_hadWorkshopMessage(true);
							}}
							shouldStart={npcTextIndex === 4}>
							{'! WE WILL BEGIN IMMEDIATELY!'}
						</Typer>
					</>
				);
			}
			if (!approveStatus.approvedCraftingMaterials) {
				if (hadWorkshopMessage) {
					return (
						<>
							{'YOU ARE HERE TO '}
							<span className={'text-tag-info'}>{'CRAFT'}</span>
							{' SOMETHING? PERFECT! PLEASE ALLOW ME TO USE SOME OF YOUR '}
							<span className={'text-tag-info'}>{'RAT SKINS'}</span>
							{'! WE WILL BEGIN IMMEDIATELY!'}
						</>		
					);
				}
				return (
					<>
						<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
							{'YOU ARE HERE TO '}
						</Typer>
						<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
							{'CRAFT'}
						</Typer></span>
						<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
							{' SOMETHING? PERFECT! PLEASE ALLOW ME TO USE SOME OF YOUR '}
						</Typer>
						<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
							{'RAT SKINS'}
						</Typer></span>
						<Typer
							onDone={() => {
								set_npcTextIndex(i => i + 1);
								set_hadWorkshopMessage(true);
							}}
							shouldStart={npcTextIndex === 4}>
							{'! WE WILL BEGIN IMMEDIATELY!'}
						</Typer>
					</>
				);
			}
			if (hadWorkshopMessage) {
				return (
					<>
						{'LET\'S '}
						<span className={'text-tag-info'}>{'CRAFT'}</span>
						{'! REMEMBER, WHEN YOU TRY TO CRAFT SOMETHING, YOU MAY '}
						<span className={'text-tag-info'}>{'FAIL'}</span>
						{', IT\'S A DIFFICULT TASK. '}
						<span className={'text-tag-info'}>{'YOUR INTELLIGENCE AND CRAFT SKILL'}</span>
						{' CAN HELP YOU.'}
						<div />
						{'EACH ATTEMPT WILL COST YOU '}
						<span className={'text-tag-info'}>{'250XP'}</span>
						{'.'}
					</>		
				);
			}
			return (
				<>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
						{'LET\'S '}
					</Typer>
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
						{'CRAFT'}
					</Typer></span>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
						{'! REMEMBER, WHEN YOU TRY TO CRAFT SOMETHING, YOU MAY '}
					</Typer>
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
						{'FAIL'}
					</Typer></span>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 4}>
						{', IT\'S A DIFFICULT TASK. '}
					</Typer>
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 5}>
						{'YOUR INTELLIGENCE AND CRAFT SKILL'}
					</Typer></span>
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 6}>
						{' CAN HELP YOU.'}
					</Typer>
					<div />
					<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 7}>
						{'EACH ATTEMPT WILL COST YOU '}
					</Typer>
					<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 8}>
						{'250XP'}
					</Typer></span>
					<Typer
						onDone={() => {
							set_npcTextIndex(i => i + 1);
							set_hadRestoreMessage(true);
						}}
						shouldStart={npcTextIndex === 9}>
						{'.'}
					</Typer>
				</>
			);
		}
		if (hadInitialMessage) {
			return (
				<>
					{'WELCOME! I AM '}
					<span className={'text-tag-info'}>{'CEAZOR THE BLACKSMITH'}</span>
					{'. MY WORKSHOP IS OPEN FOR BUSINESS. YOU CAN NOW '}
					<span className={'text-tag-info'}>{'CRAFT AN ITEM'}</span>
					{' IF YOU HAVE THE SKILL AND MATERIALS TO PULL IT OFF. DON\'T WORRY I WILL HELP YOU OUT.  ALSO, IF YOU FOUND SOME ITEMS IN THE FOREST,  I CAN STILL UPGRADE THEM FOR XP. OR RESTORE THE ONES FROM THE OLD FOREST.'}
				</>		
			);
		}
		return (
			<>
				<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
					{'WELCOME! I AM '}
				</Typer>
				<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
					{'CEAZOR THE BLACKSMITH'}
				</Typer></span>
				<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
					{'. MY WORKSHOP IS OPEN FOR BUSINESS. YOU CAN NOW '}
				</Typer>
				<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
					{'CRAFT AN ITEM'}
				</Typer></span>
				<Typer
					onDone={() => {
						set_npcTextIndex(i => i + 1);
						set_hadInitialMessage(true);
					}}
					shouldStart={npcTextIndex === 4}>
					{' IF YOU HAVE THE SKILL AND MATERIALS TO PULL IT OFF. DON\'T WORRY I WILL HELP YOU OUT.  ALSO, IF YOU FOUND SOME ITEMS IN THE FOREST,  I CAN STILL UPGRADE THEM FOR XP. OR RESTORE THE ONES FROM THE OLD FOREST.'}
				</Typer>
			</>
		);
	};
	return (
		<h1 key={nonce} className={'text-xs md:text-xs leading-normal md:leading-8'}>
			{renderNCPText()}
		</h1>
	);
}

function	Index({rarities, router}) {
	const	{provider, chainID} = useWeb3();
	const	{currentAdventurer} = useRarity();
	const	[category, set_category] = useState(0);
	const	[isModalSkillsOpen, set_isModalSkillsOpen] = useState(false);
	const	[approveStatus, set_approveStatus] = useState({approvedGold: false, approvedCraftingMaterials: false});
	const	adventurers = Object.values(rarities);

	async function	checkCraftingStatus() {
		const	rarity = new Contract(process.env.RARITY_ADDR, RARITY_ABI);
		const	rarityGold = new Contract(process.env.RARITY_GOLD_ADDR, RARITY_GOLD_ABI);
		const	rarityDungeonCellar = new Contract(process.env.DUNGEON_THE_CELLAR_ADDR, THE_CELLAR_ABI);
		const calls = [
			rarity.getApproved(currentAdventurer?.tokenID),
			rarityGold.allowance(currentAdventurer?.tokenID, process.env.RARITY_CRAFTING_ID),
			rarityDungeonCellar.allowance(currentAdventurer?.tokenID, process.env.RARITY_CRAFTING_ID),
		];

		const	ethcallProvider = await newEthCallProvider(provider, Number(chainID) === 1337);
		const	callResult = await ethcallProvider.all(calls);
		const	[rarityApprovedAddr, goldAllowance, craftingMaterialsAllowance] = callResult;
		set_approveStatus({
			approvedAdventurer: rarityApprovedAddr === process.env.RARITY_CRAFTING_ADDR,
			approvedGold: !ethers.BigNumber.from(goldAllowance).isZero(),
			approvedCraftingMaterials: !ethers.BigNumber.from(craftingMaterialsAllowance).isZero(),
		});
		return (callResult);
	}
	async function	approveGold() {
		approveERC20({
			provider,
			contractAddress: process.env.RARITY_GOLD_ADDR,
			spender: process.env.RARITY_CRAFTING_ID,
			adventurerID: currentAdventurer.tokenID,
			amount: ethers.constants.MaxUint256,
			name: 'gold'
		}, ({error}) => {
			if (!error) {
				checkCraftingStatus();
			}
		});
	}
	async function	approveCraftingMaterials() {
		approveERC20({
			provider,
			contractAddress: process.env.DUNGEON_THE_CELLAR_ADDR,
			spender: process.env.RARITY_CRAFTING_ID,
			adventurerID: currentAdventurer.tokenID,
			amount: ethers.constants.MaxUint256,
			name: 'Rat Skins'
		}, ({error}) => {
			if (!error) {
				checkCraftingStatus();
			}
		});
	}

	useEffect(() => {
		checkCraftingStatus();
	}, [currentAdventurer?.tokenID]);

	return (
		<section className={'max-w-full'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
				<Townwidget location={TOWN.blacksmith} />
				<div className={'flex flex-col md:flex-row items-center mb-8 md:mb-8'}>
					<div className={'w-auto md:w-64 mr-0 md:mr-8'} style={{minWidth: 256}}>
						<Image
							src={'/avatar/ceazor.gif'}
							loading={'eager'}
							quality={100}
							width={256}
							height={256} />
					</div>
					<Box className={'p-4'}>
						<NCPHeadline
							router={router}
							approveStatus={approveStatus}
							currentAdventurer={currentAdventurer}
							adventurerCanCraft={currentAdventurer?.skills?.[5] > 0}
							adventurerHasXp={currentAdventurer?.xp >= 250}
						/>
					</Box>
				</div>
				<DialogChoices
					router={router}
					set_category={set_category}
					adventurersCount={adventurers.length}
					approveStatus={approveStatus}
					adventurer={rarities}
					approveCraftingMaterials={approveCraftingMaterials}
					approveGold={approveGold}
					adventurerCanCraft={currentAdventurer?.skills?.[5] > 0}
					adventurerHasXp={currentAdventurer?.xp >= 250}
					openModalSkills={() => set_isModalSkillsOpen(true)}
				/>
				<SectionCrafting
					category={category}
					set_category={set_category}
					approveStatus={approveStatus}
					shouldDisplay={router?.query?.tab === 'workshop' && approveStatus.approvedGold && approveStatus.approvedCraftingMaterials} />
				<SectionArtifactsTheForest
					shouldDisplay={router?.query?.tab === 'upgrade'}
					router={router}
					adventurers={rarities}
					adventurersCount={adventurers.length} />
				<SectionRestoreArtifactsTheForest
					shouldDisplay={router?.query?.tab === 'restore'}
					router={router}
					adventurers={Object.values(rarities)}
					adventurersCount={adventurers.length} />
			</div>
			{isModalSkillsOpen && <ModalSkills
				adventurer={currentAdventurer}
				isOpen={isModalSkillsOpen}
				closeModal={() => set_isModalSkillsOpen(false)} />}
		</section>
	);		
}

export default Index;
