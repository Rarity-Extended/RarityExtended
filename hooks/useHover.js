import React from 'react';

function useHover() {
	const [value, setValue] = React.useState(false);
	const ref = React.useRef(null);
	const handleMouseOver = (e) => setValue(e);
	const handleMouseOut = () => setValue(null);
	React.useEffect(
		() => {
			const node = ref.current;
			if (node) {
				node.addEventListener('mouseover', handleMouseOver);
				node.addEventListener('mouseout', handleMouseOut);
				return () => {
					node.removeEventListener('mouseover', handleMouseOver);
					node.removeEventListener('mouseout', handleMouseOut);
				};
			}
		},
		[ref.current] // Recall only if ref changes
	);
	return [ref, value];
}
export default useHover;