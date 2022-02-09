import	React, {useState}	from	'react';
import	Image				from	'next/image';
import	FEATS				from	'utils/codex/core/feats.json';

function	RowFeat({feat, canLearn, onLearn}) {
	const	[expanded, set_expanded] = useState(false);

	return (
		<div className={'p-4'}>
			<div className={'grid grid-cols-12 gap-x-8'}>
				<div className={'flex flex-row col-span-3'}>
					<div className={'flex w-20 min-w-20 h-20 bg-500 flex-center'}>
						<Image src={feat.img} width={80} height={80} objectFit={'contain'} />
					</div>
					<div className={'flex flex-col ml-4 w-full'}>
						<p className={'mb-1 text-base font-bold text-plain'}>
							{feat.name}
						</p>
						<p className={'text-sm text-plain-60'}>
							{`Attribute: ${feat?.attributeLabel || 'None'}`}
						</p>
					</div>
				</div>

				<div className={'flex flex-col col-span-6'}>
					<div className={`text-sm text-plain-60 cursor-help ${expanded ? 'line-clamp-none' : feat?.prerequisites_feat > 0 ? 'line-clamp-3' : 'line-clamp-4'}`} onClick={() => set_expanded(!expanded)}>
						{feat.benefit}
					</div>
					{feat?.prerequisites_feat > 0 ? 
						<div className={'text-sm text-plain-60'}>
							{'You must know '}
							<span className={'font-bold text-highlight'}>{Object.values(FEATS).find(s => s.id === feat?.prerequisites_feat)?.name}</span>
							{'.'}
						</div> : null}
				</div>

				<div className={'flex col-span-3 justify-end items-start w-full'}>
					<button
						disabled={!canLearn}
						onClick={() => canLearn ? onLearn() : null}
						className={'flex w-1/2 flex-center button-highlight'}>
						<p className={'select-none'}>{'Learn'}</p>
					</button>
				</div>
			</div>
		</div>
	);
}

export default RowFeat;