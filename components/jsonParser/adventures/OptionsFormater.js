import	React								from	'react';

function	parseMarkdown(markdownText) {
	const htmlText = markdownText.replace(/~~(.*?)~~/gim, "<span class='text-highlight font-bold'>$1</span>");

	return htmlText.trim();
}

function	OptionsFormater({options, onChoice}) {
	return (
		options.map((opt, index) => (
			<div key={`${opt.goto}_${index}`} onClick={() => onChoice(opt.goto)} className={'rounded-md font-story p-4 flex flex-center text-base bg-light-600 dark:bg-dark-600 bg-opacity-40 hover:bg-opacity-100 transition-visibility cursor-pointer normal-case'}>
				<p dangerouslySetInnerHTML={{__html: parseMarkdown(opt?.text || '')}} />
			</div>
		))
	);
}

export default OptionsFormater;