import	React			from	'react';
import	Image			from	'next/image';
import	{xpRequired}	from	'utils/libs/rarity';

const RowFarms = React.memo(function RowFarms({farm, level, xp}) {
	return (
		<div className={'grid grid-cols-7 gap-x-8 p-4'}>
			<div className={'flex flex-row col-span-2'}>
				<div className={'flex w-20 min-w-20 h-20 bg-500 flex-center'}>
					<Image src={farm.src} width={64} height={64} objectFit={'contain'} />
				</div>
				<div className={'flex flex-col ml-4 w-full'}>
					<p className={'-mt-0.5 mb-1 text-base font-bold text-plain'}>
						{farm.name}
					</p>
					<p className={'text-sm text-plain-60'}>
						{`Tier: ${farm.tier}`}
					</p>
					<p className={'text-sm text-plain-60'}>
						{`Required level: ${farm.tier}`}
					</p>
				</div>
			</div>

			<div className={'flex col-span-3 pl-8'}>
				<div className={'flex flex-row space-x-2'}>
					{farm.cost.map(({name, src, amount}) => (
						<div key={name} className={''}>
							<div className={'relative p-2 w-14 h-14 bg-500 image-wrapper'}>
								<Image src={`/items/${src}.png`} width={48} height={48} />
								<div className={'absolute right-1 bottom-1 text-sm'}>
									{`x${amount}`}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className={'flex col-span-2 justify-end items-start'}>
				<div className={'flex flex-row w-1/2'}>
					<button
						disabled={level + 1 < farm.tier || xp < xpRequired(farm.tier)}
						className={'flex w-full flex-center button-highlight'}>
						<p>{'Unlock'}</p>
					</button>
				</div>
			</div>
		</div>
	);
});

export default RowFarms;