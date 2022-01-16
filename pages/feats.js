import	React			from	'react';
import	Template		from	'sections/adventurer/_template';
import	Feats			from	'sections/pages/Feats';

function	Index() {
	return (<Feats />);
}

Index.getLayout = function getLayout(page) {
	return (
		<Template>
			{page}
		</Template>
	);
};

export default Index;