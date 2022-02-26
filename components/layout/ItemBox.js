import	React			from	'react';
import	Image			from	'next/image';
import	Tooltip			from	'components/Tooltip';

function	ItemBox({item, replacedAmount, width = 56, height = 56}) {
	return (
		<div className={'group relative rounded-sm cursor-help bg-500 image-wrapper tooltip'} style={{width, height}}>
			<Image src={item.img} width={width} height={height} />
			{(item.amount && item.amount > 0) || (item.amount === -1 && replacedAmount && replacedAmount > 0) ? <div className={'absolute right-1 bottom-1 text-sm'}>
				{`x${(item.amount === -1 && replacedAmount && replacedAmount > 0) ? replacedAmount :  item.amount}`}
			</div> : null}
			<Tooltip className={'pt-2 w-80 text-sm'}> 
				<div className={'flex flex-col justify-center items-center w-full'}>
					<Image src={item.img} width={80} height={80} />
					<div className={'px-2 w-full'}>
						<b className={'mb-1'}>{item.name}</b>
						<p className={'mb-1 text-xs opacity-60'}>{item.description}</p>
						<p className={'text-xs italic opacity-60'}>{`${item.amount && item.amount === -1 ? 'Rat skins are optional for this craft but increase the chances of success.' : ''}`}</p>
					</div>
				</div>
			</Tooltip>
		</div>
	);
}

export default ItemBox;