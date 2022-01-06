import React, {useState} from 'react';
import useWeb3 from 'contexts/useWeb3';
import useRarity from 'contexts/useRarity';
import useIndexDB from 'hook/useIDB';
import Adventurer from 'components/Adventurer';
import Button from 'components/Button';
import Box from 'components/Box';
import ModalSelectAdventurer, {levelOptions} from 'components/ModalSelectAdventurer';

import { 
	CANDIES_PER_SUMMONER, 
	sacrifice
} from 'utils/actions/candyRaffle';

function Index({router}) {
	const	{provider} = useWeb3();
	const	[selectSacrificialLambIsOpen, setSelectSacrificialLambIsOpen] = useState(false);
	const 	[selectBeneficiaryIsOpen, setSelectBeneficiaryIsOpen] = useState(false);
	const	[beneficiary, setBeneficiary] = useState(null);
	const	{currentAdventurer, set_currentAdventurer, fetchRarity} = useRarity();
	const	[, set_rarities] = useIndexDB('adventurers', {});

	async function onSacrifice() {
		await sacrifice({
			provider,
			summonerToSacrifice: currentAdventurer.tokenID,
			summonerToSacrificeName: currentAdventurer.name || currentAdventurer.tokenID,
			summonerToReceive: beneficiary.tokenID,
			summonerToReceiveName: beneficiary.name || beneficiary.tokenID
		}, async () => {
			beneficiary.inventory[process.env.LOOT_CANDIES_ADDR] = String(Number(beneficiary.inventory[process.env.LOOT_CANDIES_ADDR]) + CANDIES_PER_SUMMONER);
			set_currentAdventurer(beneficiary);

			set_rarities(prev => {
				delete prev[currentAdventurer.tokenID];
				return ({...prev});
			});

			router.push('/adventure/raffle');
			await fetchRarity();
		});
	}

	function selectBeneficiary() {
		return <div className={'w-adventure-card h-adventure-card'}>
			<Box
				onClick={() => setSelectBeneficiaryIsOpen(true)}
				className={'w-full h-full p-4 flex justify-center items-center flex-col group hover:bg-gray-principal dark:hover:bg-dark-900 cursor-pointer\'} transition-colors relative mb-4 md:mb-0 cursor-pointer'}>
				<p className={'w-full h-full text-6xl flex items-center justify-center'}>{'?'}</p>
			</Box>
			<p className={'mt-10 text-black dark:text-white text-center'}>
				{'Select a beneficiary'}
			</p>
		</div>;
	}

	function beneficiaryCard() {
		return <div className={'w-adventure-card h-adventure-card'}>
			<Adventurer adventurer={beneficiary} onClick={() => setSelectBeneficiaryIsOpen(true)} width={240} height={240}></Adventurer>
			<p className={'mt-8 text-black dark:text-white text-center'}>
				{'This adventurer will receive '}<br /><span className={'text-blood-500'}>{CANDIES_PER_SUMMONER}{' candies'}</span>
			</p>
		</div>;
	}

	return <section className={'max-w-full'}>
		<div className={'max-w-prose w-full relative mt-8 mx-auto px-3 flex flex-col items-center'}>
			<div>
				<p onClick={() => router.back()}
					className={'text-black dark:text-white text-megaxs absolute left-4 top-2 hover:underline cursor-pointer'}>
					{'< Back'}
				</p>
				<h1 className={'text-blood-500 text-2xl'}>
					{'BLOOD SACRIFICE!'}
				</h1>
				<div className={'text-black dark:text-white text-xxs absolute right-4 top-2 flex flex-row items-center'} />
			</div>

			<div className={'mt-24 flex flex-row'}>
				<div>
					<Adventurer adventurer={currentAdventurer}
						onClick={() => setSelectSacrificialLambIsOpen(true)}
						width={240} height={240} 
						borderStyle={'bg-blood-600'} 
						bgStyle={'bg-blood-200 dark:bg-blood-900'}
						hoverStyle={'hover:text-fire-200 hover:bg-blood-400 dark:hover:text-fire-200 dark:hover:bg-blood-400'}>
					</Adventurer>
					<ModalSelectAdventurer 
						isOpen={selectSacrificialLambIsOpen} 
						onClose={() => setSelectSacrificialLambIsOpen(false)} 
						onSelect={adventurer => set_currentAdventurer(adventurer)} 
						options={{ 
							exclusions: [currentAdventurer.tokenID, beneficiary?.tokenID],
							level: levelOptions[4]
						}}>
					</ModalSelectAdventurer>
					<Button onClick={onSacrifice}
						disabled={!beneficiary}
						className={'mt-8 button-bloody'}
						disabledClassName={'mt-8 button-bloody-disabled'}
						borderStyle={'bg-blood-600'}
						disabledBorderStyle={'bg-blood-200 dark:bg-blood-800'}>
						<div className={'text-lg'}>
							{'Sacrifice'}
						</div>
					</Button>
				</div>
				<div className={'mx-16 h-adventure-card text-2xl flex items-center justify-center text-black dark:text-dark-100'}>
					{'-'}&gt;
				</div>
				<div>
					{!beneficiary && selectBeneficiary()}
					{beneficiary && beneficiaryCard()}
					<ModalSelectAdventurer 
						isOpen={selectBeneficiaryIsOpen} 
						onClose={() => setSelectBeneficiaryIsOpen(false)} 
						onSelect={adventurer => setBeneficiary(adventurer)} 
						options={{exclusions: [currentAdventurer.tokenID]}}>
					</ModalSelectAdventurer>
				</div>

			</div>
		</div>
	</section>;
}

export default Index;