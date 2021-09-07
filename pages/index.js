/******************************************************************************
**	@Author:				The Ape Community
**	@Twitter:				@ape_tax
**	@Date:					Wednesday August 11th 2021
**	@Filename:				index.js
******************************************************************************/

import	React						from	'react';
import	Image						from	'next/image';
import	dayjs						from	'dayjs';
import	relativeTime				from	'dayjs/plugin/relativeTime';
import	{goAdventure}				from	'utils/actions';
import	useWeb3					from	'contexts/useWeb3';

dayjs.extend(relativeTime);

const	classMapping = [
	'',
	'Barbarian',
	'Bard',
	'Cleric',
	'Druid',
	'Fighter',
	'Monk',
	'Paladin',
	'Ranger',
	'Rogue',
	'Sorcerer',
	'Wizard',
];

const	classMappingImg = [
	'',
	'/fighter.png',
	'/bard.png',
	'/cleric.png',
	'/druid.png',
	'/fighter.png',
	'/unset.png',
	'/fighter.png',
	'/ranger.png',
	'/rogue.png',
	'/sorcerer.png',
	'/wizard.png',
];

const		RARITY_ADDR = '0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb';
function	Aventurers({rarity, provider, updateRarity}) {
	return (
		<div className={'w-full'}>
			<div className={'flex flex-row w-full mb-6'}>
				<div className={'w-full flex justify-start flex-row'}>
					<div className={'w-64'}>
						<Image
							src={classMappingImg[rarity.class]}
							quality={100}
							width={256}
							height={256} />
					</div>
					<div>
						<section className={'message -left -mt-16 md:mt-0'}>
							<div className={'nes-balloon from-left font-title text-xs md:text-base'}>
								{
									dayjs(new Date(rarity.log * 1000)).isAfter(dayjs()) ?
										<p>{`Next adventure ready ${dayjs(new Date(rarity.log * 1000)).from(dayjs())}`}</p> :
										<div>
											{'Would you like to go in an adventure ?'}
											<div className={'mt-6'}>
												<label>
													<input
														type={'radio'}
														className={'nes-radio'}
														name={'adventure'}
														onClick={async () => {
															goAdventure({
																provider,
																contractAddress: RARITY_ADDR,
																tokenID: rarity.tokenID,
															}, ({error, data}) => {
																if (error) {
																	return console.error(error);
																}
																updateRarity(data);
															});

														}} />
													<span>{'Yes'}</span>
												</label>
												<label>
													<input type={'radio'} className={'nes-radio ml-6'} name={'adventure'} />
													<span>{'No'}</span>
												</label>
											</div>
										</div>
								}
							</div>
						</section>
					</div>
				</div>
			</div>
			<div className={'flex flex-row w-full space-x-2'}>
				<div className={'nes-container with-title w-2/3'}>
					<p className={'font-title title uppercase mb-1'}>{rarity.tokenID}</p>
					<div className={'flex flex-row items-center w-full py-2'}>
						<div className={'font-title text-gray-800 text-sm w-32'}>{'ID: '}</div>
						<div className={'w-full'}>
							<p className={'font-title uppercase'}>{rarity.tokenID}</p>
						</div>
					</div>
					<div className={'flex flex-row items-center w-full py-2'}>
						<div className={'font-title text-gray-800 text-sm w-32'}>{'CLASS: '}</div>
						<div className={'w-full'}>
							<p className={'font-title uppercase'}>{classMapping[rarity.class]}</p>
						</div>
					</div>
					<div className={'flex flex-row items-center w-full py-2'}>
						<div className={'font-title text-gray-800 text-sm w-32'}>{'LEVEL: '}</div>
						<div className={'w-full'}>
							<p className={'font-title'}>{rarity.level}</p>
						</div>
					</div>
					<div className={'flex flex-row items-center w-full py-2'}>
						<div className={'font-title text-gray-800 text-sm w-32'}>{'XP: '}</div>
						<div className={'w-full'}>
							<progress
								className={'nes-progress is-primary w-full'}
								value={rarity.xp}
								max={rarity.level * 1000} />
						</div>
					</div>
				</div>
				<div className={'nes-container with-title w-1/3'}>
					<p className={'font-title title uppercase mb-1'}>{'Attributes'}</p>
					<div className={'flex flex-row items-center w-full py-2'}>
						<div className={'font-title text-gray-800 text-sm uppercase'}>{'strength: '}</div>
						<div className={'w-full'}>
							<p className={'font-title uppercase'}>{rarity.attributes.strength}</p>
						</div>
					</div>
					<div className={'flex flex-row items-center w-full py-2'}>
						<div className={'font-title text-gray-800 text-sm uppercase'}>{'dexterity: '}</div>
						<div className={'w-full'}>
							<p className={'font-title'}>{rarity.attributes.dexterity}</p>
						</div>
					</div>

					<div className={'flex flex-row items-center w-full py-2'}>
						<div className={'font-title text-gray-800 text-sm uppercase'}>{'constitution: '}</div>
						<div className={'w-full'}>
							<p className={'font-title'}>{rarity.attributes.constitution}</p>
						</div>
					</div>

					<div className={'flex flex-row items-center w-full py-2'}>
						<div className={'font-title text-gray-800 text-sm uppercase'}>{'intelligence: '}</div>
						<div className={'w-full'}>
							<p className={'font-title'}>{rarity.attributes.intelligence}</p>
						</div>
					</div>

					<div className={'flex flex-row items-center w-full py-2'}>
						<div className={'font-title text-gray-800 text-sm uppercase'}>{'wisdom: '}</div>
						<div className={'w-full'}>
							<p className={'font-title'}>{rarity.attributes.wisdom}</p>
						</div>
					</div>

					<div className={'flex flex-row items-center w-full py-2'}>
						<div className={'font-title text-gray-800 text-sm uppercase'}>{'charisma: '}</div>
						<div className={'w-full'}>
							<p className={'font-title'}>{rarity.attributes.charisma}</p>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
}

function	Index({rarities = [], updateRarity}) {
	const	{provider} = useWeb3();

	return (
		<section className={'mt-12'}>
			<div className={'flex flex-col space-y-32 max-w-screen-lg w-full mx-auto'}>
				{
					Object.values(rarities)?.map((rarity) => (
						<Aventurers rarity={rarity} key={rarity.tokenID} provider={provider} updateRarity={updateRarity} />
					))
				}
			</div>


		</section>
	);
}

export default Index;
