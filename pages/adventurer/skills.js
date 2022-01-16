import	React		from	'react';
import	Template	from	'sections/adventurer/_template';
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
