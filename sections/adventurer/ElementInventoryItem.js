
import	React					from	'react';
import	Image					from	'next/image';

function	ElementInventoryItem({item}) {
	return (
		<div key={item.name} className={'flex flex-row items-center button-fake'}>
			<div className={'flex w-14 h-14 flex-center'} style={{minWidth: 56}}>
				<Image src={item.img} width={56} height={56} />
			</div>
			<div className={'ml-1 w-full text-start'}>
				<p className={'text-sm text-plain text-plain-60'}>
					{item.name}
				</p>
				<p className={'text-sm text-plain text-plain-60'}>
					{`(x${Number(item.balance)})`}
				</p>
			</div>
		</div>
	);
}

export default ElementInventoryItem;