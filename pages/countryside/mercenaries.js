/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday October 2nd 2021
**	@Filename:				mercenaries.js
******************************************************************************/

import	React, {useEffect, useState}		from	'react';
import	Image								from	'next/image';
import	Box									from	'components/Box';
import	Typer								from	'components/Typer';
import	useRarity							from	'contexts/useRarity';
import	useWeb3								from	'contexts/useWeb3';
import	DialogNoBox							from	'components/DialogNoBox';
import	CLASSES								from	'utils/codex/classes';
import	{recruitMercenary}					from	'utils/actions';

function	NCPHeadline({children, hasDoneAdventure, isProcessingTransaction}) {
	const	[nonce, set_nonce] = useState(0);
	const	[npcTextIndex, set_npcTextIndex] = useState(0);
	const	[hadInitialMessage, set_hadInitialMessage] = useState(false);

	useEffect(() => {
		set_npcTextIndex(0);
		set_nonce(n => n+1);
	}, [hasDoneAdventure, isProcessingTransaction]);

	const	renderNCPText = () => {
		if (isProcessingTransaction) {
			return (
				<>
					<Typer
						speed={30}
						onDone={() => set_npcTextIndex(i => i + 1)}
						shouldStart={npcTextIndex === 0}>
						{'NOW, YOU ONLY HAVE TO WAIT FOR THIS BIG BARBARIAN TO RETURNS ...'}
					</Typer>
				</>
			);
		}
		if (hasDoneAdventure) {
			return (
				<>
					<Typer speed={30} onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
						{'THE STRONG MERCENARY COME BACK FROM THE TAVERN. NO DOUBT HE HAS ALREADY USED HIS BONUS FOR A BEER AFTER TAKING CARE OF THE RAT. OR BEFORE, WHO KNOWS?'}
					</Typer>
					<div className={'my-4'} />
					<Typer speed={30} onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
						{'HE STOPS IN FRONT OF YOU AND HANDS YOU A BAG. OPENING IT, YOU FIND YOUR '}
					</Typer>
					<span className={'text-tag-info'}><Typer speed={30} onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
						{'12 RAT SKINS'}
					</Typer></span>
					<Typer speed={30} onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
						{'.'}
					</Typer>
					<div className={'my-4'} />
					<Typer speed={30} onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 4}>
						{'HE SEEMS READY TO GO BACK AND HIT SOME MORE RATS.'}
					</Typer>
					{npcTextIndex === 5 ? children : null}
				</>
			);
		}
		if (hadInitialMessage) {
			return (
				<>
					{'JUST OUTSIDE THE VILLAGE, A MERCENARY CAMP HAD BEEN BUILT. THESE MEN AND WOMEN HAVE THE FEROCITY OF LIONS AND THE DANGER OF SCORPIONS. THEY WILL DO WHATEVER YOU ASK THEM TO DO...  IF YOU HAVE THE MONEY.'}
					<div className={'my-4'} />
					{'WITH A NOD, THEIR LEADER LETS YOU KNOW THAT THEY ARE AVAILABLE. THEY WILL GO AND ERADICATE THESE '}
					<span className={'text-tag-info'}>{'BIG UGLY RATS'}</span>
					{' FOR YOU. THEY WILL BRING YOU '}
					<span className={'text-tag-info'}>{' 12 RAT SKINS'}</span>
					{children}
				</>
			);
		}
		return (
			<>
				<Typer speed={30} onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 0}>
					{'JUST OUTSIDE THE VILLAGE, A MERCENARY CAMP HAD BEEN BUILT. THESE MEN AND WOMEN HAVE THE FEROCITY OF LIONS AND THE DANGER OF SCORPIONS. THEY WILL DO WHATEVER YOU ASK THEM TO DO...  IF YOU HAVE THE MONEY.'}
				</Typer>
				<div className={'my-4'} />
				<Typer speed={30} onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 1}>
					{'WITH A NOD, THEIR LEADER LETS YOU KNOW THAT THEY ARE AVAILABLE. THEY WILL GO AND ERADICATE THESE '}
				</Typer>
				<span className={'text-tag-info'}><Typer speed={30} onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 2}>
					{'BIG UGLY RATS'}
				</Typer></span>
				<Typer speed={30} onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 3}>
					{' FOR YOU. THEY WILL BRING YOU '}
				</Typer>
				<span className={'text-tag-info'}><Typer speed={30} onDone={() => set_npcTextIndex(i => i + 1)} shouldStart={npcTextIndex === 4}>
					{' 12 RAT SKINS'}
				</Typer></span>
				<Typer
					speed={30}
					onDone={() => {
						set_npcTextIndex(i => i + 1);
						set_hadInitialMessage(true);
					}}
					shouldStart={npcTextIndex === 5}>
					{'.'}
				</Typer>
				{npcTextIndex === 6 ? children : null}
			</>
		);
	};
	return (
		<h1 key={nonce} className={'text-xs md:text-xs leading-normal md:leading-8'}>
			{renderNCPText()}
		</h1>
	);
}

function	Index({router}) {
	const	[hasDoneAdventure, set_hasDoneAdventure] = useState(false);
	const	[isProcessingTransaction, set_isProcessingTransaction] = useState(false);
	const	{currentAdventurer, openCurrentAventurerModal, updateRarity} = useRarity();
	const	{provider} = useWeb3();

	return (
		<section>
			<div className={'mt-8 max-w-prose w-full flex-col flex justify-center items-center mx-auto'}>

				<Box className={'p-4 text-xs md:text-xs leading-normal md:leading-8 w-full'}>
					<div className={'relative'}>
						<div className={'filter grayscale -m-4 pb-8 opacity-70'}>
							<Image
								src={'/illustrations/illuCastle.jpeg'}
								loading={'eager'}
								objectFit={'cover'}
								objectPosition={'bottom'}
								quality={85}
								width={1123.2}
								height={250} />
						</div>
					</div>
					<NCPHeadline
						hasDoneAdventure={hasDoneAdventure}
						isProcessingTransaction={isProcessingTransaction}>
						<div className={'mt-6'}>
							<DialogNoBox
								options={[
									{
										label: (
											<>
												{'HIRE A MERCENARY WITH '}
												<span className={'text-tag-info'}>{`${currentAdventurer.tokenID}, ${CLASSES[currentAdventurer?.class].name} LVL ${currentAdventurer.level}`}</span>
												{' FOR '}
												<span className={'text-tag-info'}>{'1 FTM'}</span>
											</>
										),
										onClick: () => {
											recruitMercenary({
												provider,
												contractAddress: '0x991fC50C97A791BB7519E0997741a18376dD852c',
												adventurerID: currentAdventurer.tokenID,
											}, ({error, wait}) => {
												if (wait) {
													set_isProcessingTransaction(true);
													return;	
												}
												if (error) {
													return console.error(error);
												}
												set_hasDoneAdventure(true);
												set_isProcessingTransaction(false);
												updateRarity(currentAdventurer.tokenID);
											});
										}
									},
									{label: 'SELECT ANOTHER ADVENTURER', onClick: () => openCurrentAventurerModal()},
									{label: 'GO BACK IN TOWN', onClick: () => router.back()},
								]} />
						</div>
					</NCPHeadline>
				</Box>
			</div>
		</section>
	);
}

export default Index;
