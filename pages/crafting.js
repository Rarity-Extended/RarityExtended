import	React			from	'react';
import	Template		from	'components/templates/Adventurer';
import	Crafting		from	'sections/pages/crafting';

function	Index() {
	return (<Crafting />);
}

Index.getLayout = function getLayout(page) {
	return (
		<Template>
			{page}
		</Template>
	);
};

export default Index;
