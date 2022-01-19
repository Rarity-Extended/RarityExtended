import	React			from	'react';
import	Template		from	'components/templates/Adventurer';
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