/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				blacksmith.js
******************************************************************************/

import	React, {useEffect, useState}		from	'react';
import	Image								from	'next/image';
// import	{ethers}							from	'ethers';
import	useWeb3								from	'contexts/useWeb3';
import	Typer								from	'components/Typer';
import	DialogBox							from	'components/DialogBox';
import	SectionArtifactsTheForest			from	'sections/SectionArtifactsTheForest';
import	SectionRestoreArtifactsTheForest	from	'sections/SectionRestoreArtifactsTheForest';
// import	SectionCrafting						from	'sections/SectionCrafting';

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
				// {label: 'Access the Workshop', onClick: () => router.push('/town/blacksmith?tab=workshop')},
				{label: 'Upgrade an Artifact', onClick: () => router.push('/town/blacksmith?tab=upgrade')},
				{label: 'Restore an Artifact', onClick: () => router.push('/town/blacksmith?tab=restore')},
			]} />
	);
}

function	NCPHeadline({router, active, address}) {
	const	[nonce, set_nonce] = useState(0);
	const	[npcTextIndex, set_npcTextIndex] = useState(0);
	
	useEffect(() => {
		set_npcTextIndex(0);
		set_nonce(n => n+1);
	}, [router?.query?.tab, active, address]);

	const	renderNCPText = () => {
		if (router?.query?.tab === 'workshop') {
			return (
				<>
					<Typer>
						{'OH YES. WHICH ADVENTURER WANTS TO GO IN MY WORKSHOP ? '}
					</Typer>
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
				<Typer onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
					{'. MY WORKSHOP IS UNDER CONSTRUCTION, BUT IF YOU FOUND SOME ITEMS IN THE FOREST, MAYBE I CAN UPGRADE THEM FOR XP. OR RESTORE THE ONES FROM THE FORMER FOREST.'}
				</Typer>
			</>
		);
	};
	return (
		<h1 key={nonce} className={'text-sm md:text-lg leading-normal md:leading-10'}>
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
		<section className={'mt-12 max-w-full'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
				<div className={'flex flex-col md:flex-row items-center md:items-center mb-8 md:mb-8'}>
					<div className={'w-auto md:w-64 mr-0 md:mr-16'} style={{minWidth: 256}}>
						<Image
							src={'/avatar/ceazor.gif'}
							loading={'eager'}
							quality={100}
							width={256}
							height={256} />
					</div>
					<NCPHeadline
						address={address}
						active={active}
						router={router}
					/>
				</div>
				<DialogChoices
					router={router}
					adventurersCount={adventurers.length}
					adventurer={rarities} />
				{/* <SectionCrafting adventurer={adventurers[0]} /> */}
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
