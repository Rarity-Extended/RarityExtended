/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				blacksmith.js
******************************************************************************/

import	React, {useState, useEffect}		from	'react';
import	Image								from	'next/image';
import	{ethers}							from	'ethers';
import	useWeb3								from	'contexts/useWeb3';
import	Typer								from	'components/Typer';
import	DialogBox							from	'components/DialogBox';
import	Box									from	'components/Box';
import	SectionArtifactsTheForest			from	'sections/SectionArtifactsTheForest';
import	SectionRestoreArtifactsTheForest	from	'sections/SectionRestoreArtifactsTheForest';
import	SectionCrafting						from	'sections/SectionCrafting';

function	DialogChoices({router, adventurersCount}) {
	if (adventurersCount === 0) {
		return (
			<DialogBox
				options={[
					{label: 'GO TO THE TAVERN', onClick: () => router.push('/town/tavern?tab=recruit')},
				]} />
		);
	}
	return (
		<DialogBox
			options={[
				{label: 'WELCOME', onClick: () => router.push('/town/blacksmith')},
				{label: 'Access the Workshop', onClick: () => router.push('/town/blacksmith?tab=workshop')},
				{label: 'Upgrade an Artifact', onClick: () => router.push('/town/blacksmith?tab=upgrade')},
				{label: 'Restore an Artifact', onClick: () => router.push('/town/blacksmith?tab=restore')},
			]} />
	);
}

function	NCPHeadline({router}) {
	const	[nonce, set_nonce] = useState(0);
	const	[npcTextIndex, set_npcTextIndex] = useState(0);
	
	const	[hadInitialMessage, set_hadInitialMessage] = useState(false);
	const	[hadUpgradeMessage, set_hadUpgradeMessage] = useState(false);
	const	[hadRestoreMessage, set_hadRestoreMessage] = useState(false);

	useEffect(() => {
		set_npcTextIndex(0);
		set_nonce(n => n);
	}, [router?.query?.tab]);

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
		if (hadInitialMessage) {
			return (
				<>
					{'WELCOME! I AM '}
					<span className={'text-tag-info'}>{'CEAZOR THE BLACKSMITH'}</span>
					{'. MY WORKSHOP IS UNDER CONSTRUCTION, BUT IF YOU FOUND SOME ITEMS IN THE FOREST, MAYBE I CAN UPGRADE THEM FOR XP. OR RESTORE THE ONES FROM THE FORMER FOREST.'}
				</>		
			);
		}
		return (
			<>
				<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
					{'WELCOME! I AM '}
				</Typer>&nbsp;
				<span className={'text-tag-info'}><Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
					{'CEAZOR THE BLACKSMITH'}
				</Typer></span>
				<Typer
					onDone={() => {
						set_npcTextIndex(i => i + 1);
						set_hadInitialMessage(true);
					}}
					shouldStart={npcTextIndex === 2}>
					{'. MY WORKSHOP IS UNDER CONSTRUCTION, BUT IF YOU FOUND SOME ITEMS IN THE FOREST, MAYBE I CAN UPGRADE THEM FOR XP. OR RESTORE THE ONES FROM THE FORMER FOREST.'}
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
	const	{active, address} = useWeb3();
	const	adventurers = Object.values(rarities);

	// useEffect(() => {
	// 	const	rarityManifest = new ethers.Contract(
	// 		process.env.RARITY_ADDR, [
	// 			'function getApproved(uint256 tokenId) external view returns (address operator)'
	// 		],
	// 		provider
	// 	);
	// 	rarityManifest.getApproved(tokenID);
	// }, []);


	return (
		<section className={'max-w-full'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
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
						/>
					</Box>
				</div>
				<DialogChoices
					router={router}
					adventurersCount={adventurers.length}
					adventurer={rarities} />
				<SectionCrafting
					shouldDisplay={router?.query?.tab === 'workshop'} />
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
		</section>
	);		
}

export default Index;
