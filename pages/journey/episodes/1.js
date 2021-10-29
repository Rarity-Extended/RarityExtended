/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday October 2nd 2021
**	@Filename:				mercenaries.js
******************************************************************************/

import	React, {useEffect, useState}		from	'react';
import	Image								from	'next/image';
import	{Contract}							from	'ethcall';
import	{ethers}							from	'ethers';
import	dayjs								from	'dayjs';
import	relativeTime						from	'dayjs/plugin/relativeTime';
import	Box									from	'components/Box';
import	useRarity							from	'contexts/useRarity';
import	useWeb3								from	'contexts/useWeb3';
import	DialogNoBox							from	'components/DialogNoBox';
import	{newEthCallProvider}				from	'utils';
import	CLASSES								from	'utils/codex/classes';
import	{protectBoars}						from	'utils/actions/boar';

dayjs.extend(relativeTime);

function	Tooltip({children}) {
	return (
		<div className={'invisible group-hover:visible absolute mt-6 w-80 shadow-2xl'} style={{zIndex: 10000}}>
			<div className={'bg-white dark:bg-dark-600 border-2 border-black dark:border-dark-100 mx-auto text-black dark:text-white font-normal'}>
				<div className={'p-2'}>
					{children}
				</div>
			</div>
		</div>
	);
}

function	NCPHeadline({step}) {
	if (step === '0') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'I\'m glad you\'re back! Look, about the '}
				<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
					{'rats'}
					<Tooltip>
						<p className={'text-sm leading-normal inline'}>{'The big ugly rat was just one of them after all ...'}</p>
					</Tooltip>
				</span>
				{'... There are so many of them lately. Adventurers are trying to destroy them over and over again, but it doesn’t help!'}
			</h1>
		);
	}
	if (step === '1_0') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'Of course I have, many times! You can ask the '}
				<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
					{'Herbalist'}
					<Tooltip>
						<p className={'text-sm leading-normal inline'}>{'Meredith is the Herbalist of this humber town. She may know something.'}</p>
					</Tooltip>
				</span>
				{', she was preparing a special poison. But there are more and more rats.'}
			</h1>
		);
	}
	if (step === '1_1') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'I wish I knew ... Please '}
				<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
					{'go down to the basement'}
					<Tooltip>
						<p className={'text-sm leading-normal inline'}>{'Not the Cellar this time!'}</p>
					</Tooltip>
				</span>
				{' again and explore it. Maybe you can find a clue?'}
			</h1>
		);
	}
	if (step === '2_0') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'Poison for rats? Yes, the Innkeeper contacted me twice. The third time he refused to pay. Said '}
				<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
					{'the poison is useless'}
					<Tooltip>
						<p className={'text-sm leading-normal inline'}>{'...'}</p>
					</Tooltip>
				</span>
				{'.'}
			</h1>
		);
	}
	if (step === '2_0_0') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'Common rat poison ... Maybe a little stronger. After all, these are big rats!'}
			</h1>
		);
	}
	if (step === '2_0_1') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'SUCCESS'}
				<div className={'my-4'} />
				{'You realize the poison is made from simple yet reliable ingredients. If the rats did not die from such a poison, then they have a huge immunity.'}
			</h1>
		);
	}
	if (step === '2_1') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'The basement is damp and cold. You can feel the flow of air from the corner. When you put away a few barrels, you see a passageway into the darkness.'}
			</h1>
		);
	}
	if (step === '2_1_0') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'SUCCESS'}
				<div className={'my-4'} />
				{'You notice the marks of huge claws. They look like rat foot prints, just very, very huge.'}
			</h1>
		);
	}
	if (step === '3') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'Old passage? Exactly! I forgot about him. It leads directly to the old mill. A couple of years ago I used it to carry flour, but then the mill broke down.'}
			</h1>
		);
	}
	if (step === '4') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'Please, investigate this passage and clean all the rats out of it. I promise I will pay you for this job! And I\'ll treat you to my best ale. But first, '}
				<span className={'text-tag-info dark:text-tag-warning font-bold tooltip cursor-help group inline-flex justify-evenly'}>
					{'make a torch'}
					<Tooltip>
						<p className={'text-sm leading-normal inline'}>{'Torches can be crafted by the blacksmith.'}</p>
					</Tooltip>
				</span>
				{'so you don\'t walk in the dark.'}
			</h1>
		);
	}
	if (step === '5') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'You light a torch and enter the darkness. Water is heard dripping in the distance. It smells awful here, and it\'s getting harder and harder to breathe.'}
				<div className={'my-4'} />
				{'You stop at a fork. On the left, the passage is covered with cobwebs. On the right, you smell a pungent sour smell.'}
			</h1>
		);
	}
	if (step === '6_0') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'You work your way through the spider webs and throw small spiders off of you. Suddenly you stumble upon an old chest filled with old bags and rags.'}
			</h1>
		);
	}
	if (step === '6_0_0') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'The chest is old but sturdy. You won\'t be able to break it. The chest is locked, and there may be something useful in it.'}
			</h1>
		);
	}
	if (step === '6_0_1') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'You can barely open the rusty lock. Inside, among the unnecessary trash, you find some gold and a quality shortsword.'}
				{/* //LOOT */}
			</h1>
		);
	}
	if (step === '6_0_2') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'You decide not to touch the old chest and move on into the darkness.'}
			</h1>
		);
	}
	if (step === '6_1') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'You walk down a narrow aisle and soon find half a horse. Yes. Just half a dead horse. You pinch your nose at the pungent smell and think about what to do.'}
			</h1>
		);
	}
	if (step === '6_1_0') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'SUCCESS'}
				<div className={'my-4'} />
				{'You look closely at the horse. It seems it was someone\'s dinner. Someone has huge teeth and claws. You have to be careful.'}
			</h1>
		);
	}
	if (step === '7') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'The passage goes upstairs. There are more and more rats. But they look at you from the darkness and do not attack. You climb the old steps and find yourself inside the mill.'}
				<div className={'my-4'} />
				{'In the dark, you hear wheezing and rustling. A giant rat comes out to meet you on two legs. She is taller than you. The rest of the rats swarm around her.'}
			</h1>
		);
	}
	if (step === '8') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'Stranger... From town... What are you doing here? Do you want to... take our grain?'}
			</h1>
		);
	}
	if (step === '9_0') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'We need food... Otherwise we will perish. I\'m a big rat... I need a lot of food.'}
				<div className={'my-4'} />
				{'Listen, stranger... Leave us alone. I promise you... we will take food less often in the city... or we will die.'}
			</h1>
		);
	}
	if (step === '9_1') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'I\'m just a huge rat... I\'m just like a regular rat, just bigger... We are trying to survive in this mill...'}
			</h1>
		);
	}
	if (step === '9_2') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'I don\'t know... A few days ago I ate something... in a swamp. And I began to grow... Now I am here... I always want to eat.'}
			</h1>
		);
	}
	if (step === '10_0') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'When the Giant Rat\'s head falls at your feet, you exhale tiredly. Rats scatter in different directions. You decide to burn down the old mill to destroy the rat lair.'}
				<div className={'my-4'} />
				{'Before you leave, you notice a shimmering stone under your feet. It looks like a lump of ore, but you feel a strange energy from it.'}
			</h1>
		);
	}
	if (step === '10_1') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'The Giant Rat gratefully gives you the necklace and hides in the dark. The rest of the rats squeak and swarm around you.'}
				<div className={'my-4'} />
				{'Before you leave, you notice a shimmering stone under your feet. It looks like a lump of ore, but you feel a strange energy from it.'}
			</h1>
		);
	}
	if (step === '11') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'You’re making your way home thinking about decisions you\'ve made. Anyway, you have to meet Facu now. You return to Antar and show the head of a giant rat to the innkeeper.'}
			</h1>
		);
	}
	if (step === '12_0') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'What an abomination, get it out of here! And thank you hero. Take some gold. And now you are a welcome guest in my tavern at any time!'}
			</h1>
		);
	}
	if (step === '12_1') {
		return (
			<h1 className={'text-sm md:text-base leading-normal md:leading-6 font-story normal-case'}>
				{'Oh, what a shame ... You probably aren\'t strong enough for such an adventure yet. The job is not done, so there will be no reward. Sorry.'}
			</h1>
		);
	}
}

function	DialogChoices({step, set_step}) {
	if (step === '0') {
		return (
			<DialogNoBox
				options={[
					{label: 'Have you tried to poison rats?', onClick: () => set_step('1_0')},
					{label: 'Where do rats come from?', onClick: () => set_step('1_1')},
				]} />
		);
	}
	if (step === '1_0') {
		return (
			<DialogNoBox
				options={[
					{label: 'Talk to Herbalist (Leave Tavern)', onClick: () => set_step('2_0')},
					{label: 'Where do rats come from?', onClick: () => set_step('1_1')},
					{label: 'Back', onClick: () => set_step('0')},
				]} />
		);
	}
	if (step === '1_1') {
		return (
			<DialogNoBox
				options={[
					{label: 'Explore Basement', onClick: () => set_step('2_1')},
					{label: 'Talk to Herbalist (Leave Tavern)', onClick: () => set_step('2_0')},
					{label: 'Back', onClick: () => set_step('0')},
				]} />
		);
	}
	if (step === '2_0') {
		return (
			<DialogNoBox
				options={[
					{label: 'How strong was this poison?', onClick: () => set_step('2_0_0')},
					{label: 'Do you still have this poison? [CHECK Survival 2]	', onClick: () => set_step('2_0_1')},
					{label: 'Undersandable, have a nice day (Back to Tavern)', onClick: () => set_step('1_1')},
				]} />
		);
	}
	if (step === '2_0_0') {
		return (
			<DialogNoBox
				options={[
					{label: 'I see... (Back)', onClick: () => set_step('2_0')}
				]} />
		);
	}
	if (step === '2_0_1') {
		return (
			<DialogNoBox
				options={[
					{label: 'Hm... That’s weird (Back to Tavern)', onClick: () => set_step('1_1')}
				]} />
		);
	}
	if (step === '2_1') {
		return (
			<DialogNoBox
				options={[
					{label: 'Explore the passageway [CHECK Search 2]', onClick: () => set_step('2_1_0')},
					{label: 'Back to Tavern', onClick: () => set_step('3')},
				]} />
		);
	}
	if (step === '2_1_0') {
		return (
			<DialogNoBox
				options={[
					{label: 'Back to Tavern', onClick: () => set_step('3')},
				]} />
		);
	}
	if (step === '3') {
		return (
			<DialogNoBox
				options={[
					{label: 'So...?', onClick: () => set_step('4')},
				]} />
		);
	}
	if (step === '4') {
		//CONDITION TORCH IN INVENTORY
		return (
			<DialogNoBox
				options={[
					{label: 'Go to Basement [CRAFT Torch]', onClick: () => set_step('5')},
				]} />
		);
	}
	if (step === '5') {
		return (
			<DialogNoBox
				options={[
					{label: 'Go left', onClick: () => set_step('6_0')},
					{label: 'Go right', onClick: () => set_step('6_1')},
				]} />
		);
	}
	if (step === '6_0') {
		return (
			<DialogNoBox
				options={[
					{label: 'Inspect the chest', onClick: () => set_step('6_0_0')},
					{label: 'Open the chest [CHECK Open Lock 2]', onClick: () => set_step('6_0_1')},
					{label: 'Go futher', onClick: () => set_step('7')},
				]} />
		);
	}
	if (step === '6_0_0') {
		return (
			<DialogNoBox
				options={[
					{label: 'I wish I could open it... (Back)', onClick: () => set_step('6_0_2')},
				]} />
		);
	}
	if (step === '6_0_1') {
		return (
			<DialogNoBox
				options={[
					{label: 'Nice! (Go futher)', onClick: () => set_step('7')},
				]} />
		);
	}
	if (step === '6_0_2') {
		return (
			<DialogNoBox
				options={[
					{label: 'Go futher', onClick: () => set_step('7')},
				]} />
		);
	}
	if (step === '6_1') {
		return (
			<DialogNoBox
				options={[
					{label: 'Inspect the corpse [CHECH Survival 3]', onClick: () => set_step('6_1_0')},
					{label: 'Go futher', onClick: () => set_step('7')},
				]} />
		);
	}
	if (step === '6_1_0') {
		return (
			<DialogNoBox
				options={[
					{label: 'Go futher', onClick: () => set_step('7')},
					{label: 'Go futher', onClick: () => set_step('7')},
				]} />
		);
	}
	if (step === '7') {
		return (
			<DialogNoBox
				options={[
					{label: 'Oh-oh', onClick: () => set_step('8')},
				]} />
		);
	}
	if (step === '8') {
		return (
			<DialogNoBox
				options={[
					{label: 'Yes! Give me all your grain now!', onClick: () => set_step('9_0')},
					{label: 'No... I don\'t know. But who are you?', onClick: () => set_step('9_1')},
					{label: 'Why are you so big?', onClick: () => set_step('9_2')},
				]} />
		);
	}
	if (step === '9_0') {
		return (
			<DialogNoBox
				options={[
					{label: 'No. Prepare to die.', onClick: () => set_step('10_0')},
					{label: 'Okay, I will leave you alone. I like rats.', onClick: () => set_step('10_1')},
				]} />
		);
	}
	if (step === '9_1') {
		return (
			<DialogNoBox
				options={[
					{label: 'You steal the grain from citizens!', onClick: () => set_step('9_0')},
				]} />
		);
	}
	if (step === '9_2') {
		return (
			<DialogNoBox
				options={[
					{label: 'You steal the grain from citizens!', onClick: () => set_step('9_0')},
				]} />
		);
	}
	if (step === '10_0') {
		return (
			<DialogNoBox
				options={[
					{label: 'Return to Antar', onClick: () => set_step('11')},
				]} />
		);
	}
	if (step === '10_1') {
		return (
			<DialogNoBox
				options={[
					{label: 'Return to Antar', onClick: () => set_step('11')},
				]} />
		);
	}
	if (step === '11') {
		return (
			<DialogNoBox
				options={[
					{label: 'Hey, Facu! I’ve got giant rat head! [ONLY IF HEAD]', onClick: () => set_step('12_0')},
					{label: 'Hey, Facu! I didn’t find anything!', onClick: () => set_step('12_1')},
				]} />
		);
	}
	if (step === '12_0') {
		return (
			<DialogNoBox
				options={[
					{label: 'Return to Antar', onClick: () => set_step('0')},
				]} />
		);
	}
	if (step === '12_1') {
		return (
			<DialogNoBox
				options={[
					{label: 'Return to Antar', onClick: () => set_step('0')},
				]} />
		);
	}
	
}

function	Index({router}) {
	const	[step, set_step] = useState('0');

	return (
		<section>
			<div className={'mt-8 max-w-prose w-full flex-col flex justify-center items-center mx-auto px-3'}>
				<Box className={'p-4 text-xs md:text-xs leading-normal md:leading-8 w-full relative'}>
					{/* <div className={'relative'}>
						<div className={'filter grayscale -m-4 pb-8 opacity-70'}>
							<Image
								src={'/illustrations/illuBoars.jpeg'}
								loading={'eager'}
								objectFit={'cover'}
								objectPosition={'top'}
								quality={85}
								width={1550}
								height={400} />
						</div>
					</div> */}
					<NCPHeadline step={step} />
					<div className={'pt-2 mt-4 border-t-2 border-black dark:border-dark-100 font-story font-bold text-sm md:text-base uppercase'}>
						<DialogChoices step={step} set_step={set_step}/>
					</div>
				</Box>
			</div>
		</section>
	);
}

export default Index;
