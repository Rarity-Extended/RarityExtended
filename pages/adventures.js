import	React, {useState}			from	'react';
import	Template					from	'components/templates/Head';
import	Image						from	'next/image';
import	Link						from	'next/link';
import	dayjs						from	'dayjs';
import	duration					from	'dayjs/plugin/duration';
import	relativeTime				from	'dayjs/plugin/relativeTime';
import	useRarity					from	'contexts/useRarity';
import	useDungeons					from	'contexts/useDungeons';
import	{Media}						from	'contexts/useUI';
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
									<span key={`${addr}_${index}`} className={'group inline-flex justify-evenly font-bold cursor-help text-highlight tooltip'}>
										{text}
										<Tooltip>
											{tooltip.map(({text, highlighted}, jindex) => {
												if (highlighted) {
													return (
														<p key={`${addr}_${index}_${jindex}`} className={'inline font-bold text-highlight'}>{text}</p>
													);
												}
												return (<p key={`${addr}_${index}_${jindex}`} className={'inline'}>{text}</p>);
											})}
										</Tooltip>
									</span>
								);

							}
							return (<p key={`${addr}_${index}`} className={'inline text-plain-60'}>{text}</p>);
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
	const	{dungeons} = useDungeons();
	const	[selectedAdventure, set_selectedAdventure] = useState(0);
	
	function	renderAdventures() {
		const	adventure = ADVENTURES[selectedAdventure];
		const	canAdventure = dungeons[currentAdventurer.tokenID]?.[adventure.key]?.canAdventure;
		const	nextAdventure = dungeons[currentAdventurer.tokenID]?.[adventure.key]?.nextAdventure;
		return (
			<div key={adventure.address}>
				<div className={'overflow-hidden relative w-full box'}>
					<div className={'overflow-hidden relative opacity-100'}>
						<Image
							src={adventure.img}
							loading={'eager'}
							objectFit={'cover'}
							quality={70}
							width={1500}
							height={300} />
						<div className={'absolute inset-0 bottom-1.5 opacity-30'} style={{backgroundColor: adventure.overlayColor}} />
					</div>

					<div className={'flex relative flex-col'}>
						<div className={'p-6 pt-4 w-full h-full'}>
							<div className={'flex flex-row justify-between items-center mb-4'}>
								<h1 className={'text-xl font-bold'}>{adventure.name}</h1>
								<div>
									<Link href={`/adventures/${adventure.path}#action`}>
										<button
											disabled={!canAdventure}
											className={`flex flex-center w-full button-highlight ${nextAdventure ? '' : 'pointer-events-none'}`}
											style={!nextAdventure ? {opacity: 0} : {}}>
											{canAdventure ? 'Accept Adventure' : `Ready ${dungeons[currentAdventurer.tokenID]?.[adventure.key]?.nextAdventure}`}
										</button>
									</Link>
								</div>
							</div>
							<div className={'inline text-sm leading-normal normal-case'}>
								<FormatedDescription addr={adventure.address} rawDescription={adventure.description} />
							</div>
							<h1 className={'mt-12 mb-2 text-base font-bold text-plain-60'}>{'Potential Rewards'}</h1>
							<div className={'grid grid-cols-3 gap-4 -ml-2 w-2/3'}>
								{adventure.rewards.map(([envName, name, addr]) => (
									<div key={addr} className={'flex flex-row items-center'}>
										<div className={'flex w-14 h-14 flex-center'} style={{minWidth: 56}}>
											<Image src={`/items/${process?.env?.[envName] || addr}.png`} width={56} height={56} />
										</div>
										<p className={'ml-1 text-sm text-plain text-plain-60'}>
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

	function	renderAdventuresSelectionMobile() {
		const	resultOK = [];
		const	resultKO = [];
		for (let index = 0; index < ADVENTURES.length; index++) {
			const adventure = ADVENTURES[index];
			const nextAdventure = dungeons[currentAdventurer.tokenID]?.[adventure.key]?.nextAdventure;
			if (dungeons[currentAdventurer.tokenID]?.[adventure.key]?.canAdventure) {
				resultOK.push(
					<Link key={adventure.address}href={`/adventures/${adventure.path}#action`}>
						<div
							onClick={() => set_selectedAdventure(index)}
							className={'group overflow-hidden relative w-full cursor-pointer box'}>
							<div className={`relative flex flex-row ${selectedAdventure === index ? 'border-l-0 md:border-l-4 border-highlight' : 'pl-0 md:pl-1'}`}>
								<div className={'p-4 w-full h-full'}>
									<h1 className={'text-lg font-bold'}>{adventure.name}</h1>
									<div className={'flex flex-row justify-between items-center mt-2 opacity-60'}>
										<div className={'flex flex-row items-center'}>
											<p className={'text-xs'}>{adventure.minimalDescription}</p>
										</div>
									</div>
									<div className={'flex flex-col justify-between mt-4'}>
										<div className={'flex flex-row items-center'}>
											<p className={'text-xs'}>{'Rewards'}</p>
										</div>
										<div className={'grid grid-cols-2 gap-1 mt-2 -ml-2 w-full'}>
											{adventure.rewards.map(([envName, name, addr]) => (
												<div key={addr} className={'flex flex-row items-center'}>
													<div className={'flex w-10 h-10 flex-center'} style={{minWidth: 40}}>
														<Image src={`/items/${process?.env?.[envName] || addr}.png`} width={40} height={40} />
													</div>
													<p className={'ml-1 text-sm text-plain text-plain-60'}>
														{name}
													</p>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</Link>
				);
			} else {
				resultKO.push(
					<div
						key={adventure.address}
						onClick={() => set_selectedAdventure(index)}
						className={'group overflow-hidden relative w-full opacity-40 box'}>
						<div className={`relative flex flex-row ${selectedAdventure === index ? 'border-l-4 border-highlight' : 'pl-1'}`}>
							<div className={'p-4 w-full h-full'}>
								<h1 className={'text-lg font-bold'}>{adventure.name}</h1>
								<div className={'flex flex-row justify-between items-center mt-2'}>
									<div className={'flex flex-row items-center'}>
										<p className={'text-xs'}>{nextAdventure ? `Ready ${nextAdventure}` : 'Not eligible'}</p>
									</div>
								</div>
								<div className={'flex flex-row justify-between items-center mt-2 opacity-60'}>
									<div className={'flex flex-row items-center'}>
										<p className={'text-xs'}>{adventure.minimalDescription}</p>
									</div>
								</div>
								<div className={'flex flex-col justify-between mt-4'}>
									<div className={'flex flex-row items-center'}>
										<p className={'text-xs'}>{'Rewards'}</p>
									</div>
									<div className={'grid grid-cols-2 gap-1 mt-2 -ml-2 w-full'}>
										{adventure.rewards.map(([envName, name, addr]) => (
											<div key={addr} className={'flex flex-row items-center'}>
												<div className={'flex w-10 h-10 flex-center'} style={{minWidth: 40}}>
													<Image src={`/items/${process?.env?.[envName] || addr}.png`} width={40} height={40} />
												</div>
												<p className={'ml-1 text-sm text-plain text-plain-60'}>
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
		}
		return ([...resultOK, ...resultKO]);
	}

	function	renderAdventuresSelection() {
		const	resultOK = [];
		const	resultKO = [];
		for (let index = 0; index < ADVENTURES.length; index++) {
			const adventure = ADVENTURES[index];
			const nextAdventure = dungeons[currentAdventurer.tokenID]?.[adventure.key]?.nextAdventure;
			if (dungeons[currentAdventurer.tokenID]?.[adventure.key]?.canAdventure) {
				resultOK.push(
					<div
						key={adventure.address}
						onClick={() => set_selectedAdventure(index)}
						className={'group overflow-hidden relative w-full cursor-pointer box'}>
						<div className={`relative flex flex-row ${selectedAdventure === index ? 'border-l-0 md:border-l-4 border-highlight' : 'pl-0 md:pl-1'}`}>
							<div className={'p-4 w-full h-full'}>
								<h1 className={'text-lg font-bold'}>{adventure.name}</h1>
				
								<div className={'flex flex-row justify-between items-center mt-2'}>
									<div className={'flex flex-row items-center'}>
										<p className={'text-xs'}>{nextAdventure ? `Ready ${nextAdventure}` : 'Not eligible'}</p>
									</div>
								</div>
								<div className={'flex flex-row justify-between items-center mt-2 opacity-60'}>
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
						className={'group overflow-hidden relative w-full opacity-40 box'}>
						<div className={`relative flex flex-row ${selectedAdventure === index ? 'border-l-4 border-highlight' : 'pl-1'}`}>
							<div className={'p-4 w-full h-full'}>
								<h1 className={'text-lg font-bold'}>{adventure.name}</h1>
								<div className={'flex flex-row justify-between items-center mt-2'}>
									<div className={'flex flex-row items-center'}>
										<p className={'text-xs'}>{nextAdventure ? `Ready ${nextAdventure}` : 'Not eligible'}</p>
									</div>
								</div>
								<div className={'flex flex-row justify-between items-center mt-2 opacity-60'}>
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
			<div className={'flex flex-col grid-cols-12 gap-x-10 max-w-full md:grid'}>
				<div className={'relative col-span-3'}>
					<Media lessThan={'md'}>
						<div className={'grid sticky top-4 grid-cols-1 gap-4 max-h-full md:grid-cols-1 md:max-h-screen'}>
							{renderAdventuresSelectionMobile()}
						</div>
					</Media>
					<Media greaterThan={'md'}>
						<div className={'grid sticky top-4 grid-cols-1 gap-4 max-h-full md:grid-cols-1 md:max-h-screen'}>
							{renderAdventuresSelection()}
						</div>
					</Media>
				</div>
				<div className={'hidden col-span-9 md:block'} style={{minHeight: 800}}>
					<Media greaterThan={'md'}>
						{renderAdventures()}
					</Media>
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
