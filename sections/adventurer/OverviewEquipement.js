import	React				from	'react';
import	Image				from	'next/image';
import	dayjs				from	'dayjs';
import	relativeTime		from	'dayjs/plugin/relativeTime';
import	IconHelmet			from	'components/icons/IconHelmet';
import	IconGloves			from	'components/icons/IconGloves';
import	IconArmor			from	'components/icons/IconArmor';
import	IconBoots			from	'components/icons/IconBoots';
import	IconWeapon			from	'components/icons/IconWeapon';
import	IconNecklace		from	'components/icons/IconNecklace';
import	IconRing			from	'components/icons/IconRing';
import	{goAdventure}		from	'utils/actions';
import	CLASSES				from	'utils/codex/classes';

dayjs.extend(relativeTime);

function	OverviewEquipement({adventurer, provider, chainTime, updateRarity}) {
	const	canAdventure = !dayjs(new Date(adventurer.log * 1000)).isAfter(dayjs(new Date(chainTime * 1000)));

	function	onClaimXP() {
		goAdventure({
			loader: 'Claiming XP...',
			provider,
			contractAddress: process.env.RARITY_ADDR,
			tokenID: adventurer.tokenID,
		}, ({error, data}) => {
			if (error) {
				return console.error(error);
			}
			updateRarity(data);
		});
	}

	return (
		<div>
			<div className={'flex flex-row'} style={{width: 384}}>
				<div className={'grid grid-cols-1 ml-auto gap-y-4 w-18'}>
					<div className={'w-18 box-darker flex flex-center aspect-1'}>
						<IconHelmet className={'text-400 h-12 w-12'} />
					</div>
					<div className={'w-18 box-darker flex flex-center aspect-1'}>
						<IconGloves className={'text-400 h-12 w-12'} />
					</div>
					<div className={'w-18 box-darker flex flex-center aspect-1'}>
						<IconArmor className={'text-400 h-12 w-12'} />
					</div>
					<div className={'w-18 box-darker flex flex-center aspect-1'}>
						<IconBoots className={'text-400 h-12 w-12'} />
					</div>
				</div>
				<div className={'flex justify-between items-center w-60 flex-col pt-4 pb-8'}>
					<div>
						<p className={'text-plain dark:text-opacity-70 font-bold text-xl font-story text-center'}>
							{adventurer.name || adventurer.tokenID}
						</p>
						<p className={'text-black dark:text-dark-100 text-sm font-story mb-4'}>
							{`${CLASSES[adventurer.class].name} level ${adventurer.level}`}
						</p>
					</div>
					<Image src={adventurer?.skin} width={180} height={180} />
					<div className={'px-4'}>
						<div
							onClick={() => canAdventure ? onClaimXP() : null}
							className={`bg-gray-principal flex flex-center text-center px-4 py-2 mt-4 w-full ${canAdventure ? 'cursor-pointer dark:bg-tag-warning hover:dark:bg-tag-warningDarker hover:bg-gray-secondary text-black font-bold' : 'dark:bg-dark-600 text-plain cursor-not-allowed opacity-40'}`}>
							{canAdventure ?
								<p className={'font-story text-sm select-none normal-case'}>{'Claim XP'}</p>
								:
								<p className={'font-story text-sm select-none normal-case'}>
									{`Ready ${dayjs(new Date(adventurer.log * 1000)).from(dayjs(new Date(chainTime * 1000)))}`}
								</p>
							}
						</div>
					</div>
				</div>
				<div className={'grid grid-cols-1 gap-y-4 w-18'}>
					<div className={'w-18 box-darker flex flex-center aspect-1'}>
						<IconWeapon className={'text-400 h-12 w-12'} />
					</div>
					<div className={'w-18 box-darker flex flex-center aspect-1'}>
						<IconWeapon className={'text-400 h-12 w-12'} />
					</div>
					<div className={'w-18 box-darker flex flex-center aspect-1'}>
						<IconNecklace className={'text-400 h-12 w-12'} />
					</div>
					<div className={'w-18 box-darker flex flex-center aspect-1'}>
						<IconRing className={'text-400 h-12 w-12'} />
					</div>
				</div>
			</div>
		</div>
	);
}


export default OverviewEquipement;