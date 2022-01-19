import	React		from	'react';
import	Template	from	'components/templates/Adventurer';
import	Skills		from	'sections/pages/Skills';

function	Index() {
	return (<Skills />);
}

Index.getLayout = function getLayout(page) {
	return (
		<Template>
			{page}
		</Template>
	);
};

export default Index;
