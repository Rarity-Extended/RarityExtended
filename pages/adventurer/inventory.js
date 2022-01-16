import	React			from	'react';
import	Template		from	'sections/adventurer/_template';
import	Inventory		from	'sections/pages/Inventory';

function	Index() {
	return (<Inventory />);
}

Index.getLayout = function getLayout(page) {
	return (
		<Template>
			{page}
		</Template>
	);
};

export default Index;
