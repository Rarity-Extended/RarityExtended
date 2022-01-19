import	React, {useState}			from	'react';
import	Template					from	'components/templates/Adventurer';
import	Image						from	'next/image';
import	Link						from	'next/link';
import	dayjs						from	'dayjs';
import	duration					from	'dayjs/plugin/duration';
import	relativeTime				from	'dayjs/plugin/relativeTime';
import	useRarity					from	'contexts/useRarity';
import	Tooltip						from	'components/Tooltip';
import	ADVENTURES					from	'utils/codex/adventures/adventures';

dayjs.extend(duration);
dayjs.extend(relativeTime);

function	FormatedDescription({addr, rawDescription}) {
	function	toRender() {
		return (
			rawDescription.map((part, i) => {
				return (
					<div key={`separator_${addr}_${i}`} className={i > 0 ? 'my-4' : ''}>
						{part.map(({text, highlighted, tooltip}, index) => {
							if (highlighted) {
								return (
									<span key={`${addr}_${index}`} className={'text-highlight font-bold tooltip cursor-help group inline-flex justify-evenly'}>
										{text}
										<Tooltip>
											{tooltip.map(({text, highlighted}, jindex) => {
												if (highlighted) {
													return (
														<p key={`${addr}_${index}_${jindex}`} className={'inline text-highlight font-bold'}>{text}</p>
													);
												}
												return (<p key={`${addr}_${index}_${jindex}`} className={'inline'}>{text}</p>);
											})}
										</Tooltip>
									</span>
								);

							}
							return (<p key={`${addr}_${index}`} className={'inline text-50'}>{text}</p>);
						})}
					</div>
				);
			})
		);
	}
	return (toRender());
}

function	Index() {
	const	{currentAdventurer} = useRarity();
	const	[selectedAdventure, set_selectedAdventure] = useState(0);
	
	function	renderAdventures() {
		const	adventure = ADVENTURES[selectedAdventure];
		const	canAdventure = currentAdventurer?.adventures?.[adventure.key]?.canAdventure;
		const	nextAdventure = currentAdventurer?.adventures?.[adventure.key]?.nextAdventure;
		return (
			<div key={adventure.address}>
				<div className={'w-full relative box overflow-hidden'}>
					<div className={'opacity-100 overflow-hidden relative'}>
						<Image
							src={adventure.img}
							loading={'eager'}
							objectFit={'cover'}
							quality={70}
							width={1500}
							height={300} />
						<div className={'absolute inset-0 bottom-1 opacity-30'} style={{backgroundColor: adventure.overlayColor}} />
					</div>

					<div className={'relative flex flex-col font-story'}>
						<div className={'w-full h-full p-6 pt-4'}>
							<div className={'flex flex-row justify-between items-center mb-4'}>
								<h1 className={'text-xl font-bold'}>{adventure.name}</h1>
								<div>
									<Link href={`/adventures/${adventure.path}#action`}>
										<div className={`flex flex-center text-center px-4 py-2 w-full tracking-wide text-sm ${canAdventure ? 'cursor-pointer button-highlight font-bold' : 'cursor-not-allowed bg-600 opacity-60 text-plain'} ${nextAdventure ? '' : 'pointer-events-none'}`} style={!nextAdventure ? {opacity: 0} : {}}>
											{canAdventure ? 'Accept Adventure' : `Ready ${currentAdventurer?.adventures?.[adventure.key]?.nextAdventure}`}
										</div>
									</Link>
								</div>
							</div>
							<div className={'normal-case font-story text-sm leading-normal inline'}>
								<FormatedDescription addr={adventure.address} rawDescription={adventure.description} />
							</div>
							<h1 className={'text-base font-bold mt-12 text-50 mb-2'}>{'Potential Rewards'}</h1>
							<div className={'grid grid-cols-3 gap-4 w-2/3 -ml-2'}>
								{adventure.rewards.map(([envName, name, addr]) => (
									<div key={addr} className={'flex flex-row items-center'}>
										<div className={'w-14 h-14 flex flex-center'} style={{minWidth: 56}}>
											<Image src={`/items/${process?.env?.[envName] || addr}.png`} width={56} height={56} />
										</div>
										<p className={'text-plain font-story text-sm text-50 normal-case ml-1'}>
											{name}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	function	renderAdventuresSelection() {
		const	resultOK = [];
		const	resultKO = [];
		for (let index = 0; index < ADVENTURES.length; index++) {
			const adventure = ADVENTURES[index];
			const nextAdventure = currentAdventurer?.adventures?.[adventure.key]?.nextAdventure;
			if (currentAdventurer?.adventures?.[adventure.key]?.canAdventure) {
				resultOK.push(
					<div
						key={adventure.address}
						onClick={() => set_selectedAdventure(index)}
						className={'w-full relative box group overflow-hidden cursor-pointer font-story'}>
						<div className={`relative flex flex-row ${selectedAdventure === index ? 'border-l-4 border-highlight' : 'pl-1'}`}>
							<div className={'w-full h-full p-4'}>
								<h1 className={'text-lg font-bold'}>{adventure.name}</h1>
				
								<div className={'flex flex-row items-center justify-between mt-2 normal-case'}>
									<div className={'flex flex-row items-center'}>
										<p className={'text-xs'}>{nextAdventure ? `Ready ${nextAdventure}` : 'Not eligible'}</p>
									</div>
								</div>
								<div className={'flex flex-row items-center justify-between mt-2 normal-case opacity-60'}>
									<div className={'flex flex-row items-center'}>
										<p className={'text-xs'}>{'Difficulty'}</p>
									</div>
									<p className={`text-sm capitalize ${adventure.difficulty === 'easy' ? 'text-difficulty-easy' : adventure.difficulty === 'medium' ? 'text-difficulty-medium' : 'text-difficulty-hard'}`}>{adventure.difficulty}</p>
								</div>
							</div>
						</div>
					</div>
				);
			} else {
				resultKO.push(
					<div
						key={adventure.address}
						onClick={() => set_selectedAdventure(index)}
						className={'w-full relative box group overflow-hidden font-story opacity-40'}>
						<div className={`relative flex flex-row ${selectedAdventure === index ? 'border-l-4 border-highlight' : 'pl-1'}`}>
							<div className={'w-full h-full p-4'}>
								<h1 className={'text-lg font-bold'}>{adventure.name}</h1>
								<div className={'flex flex-row items-center justify-between mt-2 normal-case'}>
									<div className={'flex flex-row items-center'}>
										<p className={'text-xs'}>{nextAdventure ? `Ready ${nextAdventure}` : 'Not eligible'}</p>
									</div>
								</div>
								<div className={'flex flex-row items-center justify-between mt-2 normal-case opacity-60'}>
									<div className={'flex flex-row items-center'}>
										<p className={'text-xs'}>{'Difficulty'}</p>
									</div>
									<p className={`text-sm capitalize ${adventure.difficulty === 'easy' ? 'text-difficulty-easy' : adventure.difficulty === 'medium' ? 'text-difficulty-medium' : 'text-difficulty-hard'}`}>{adventure.difficulty}</p>
								</div>
							</div>
						</div>
					</div>
				);
			}
		}
		return ([...resultOK, ...resultKO]);
	}

	return (
		<div>
			<div className={'flex flex-col md:grid grid-cols-12 gap-x-10 max-w-full'}>
				<div className={'col-span-3 relative'}>
					<div className={'grid grid-cols-2 md:grid-cols-1 gap-4 sticky top-4 max-h-screen'}>
						{renderAdventuresSelection()}
					</div>
				</div>
				<div className={'col-span-9'} style={{minHeight: 800}}>
					{renderAdventures()}
				</div>
			</div>
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
