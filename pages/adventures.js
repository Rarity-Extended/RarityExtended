import	React			from	'react';
import	Template		from	'sections/adventurer/_template';
import	Adventures		from	'sections/pages/Adventures';

function	Index() {
	return (<Adventures />);
}

Index.getLayout = function getLayout(page) {
	return (
		<Template>
			{page}
		</Template>
	);
};

export default Index;
