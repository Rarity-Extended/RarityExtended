import	React				from	'react';
import	{LoginBox}			from	'components/ModalLogin';

function	SectionNoWallet() {
	return (
		<section className={'max-w-full'}>
			<div className={'sm:max-w-lg sm:w-full md:mb-96 mx-auto mt-auto'}>
				<LoginBox set_open={() => null} />
			</div>
		</section>
	);		
}

export default SectionNoWallet;
