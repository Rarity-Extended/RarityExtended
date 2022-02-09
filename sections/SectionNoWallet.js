import	React				from	'react';
import	{LoginBox}			from	'components/modals/ModalLogin';

function	SectionNoWallet() {
	return (
		<section className={'max-w-full'}>
			<div className={'mx-auto mt-auto sm:w-full sm:max-w-lg md:mb-96'}>
				<LoginBox set_open={() => null} />
			</div>
		</section>
	);		
}

export default SectionNoWallet;
