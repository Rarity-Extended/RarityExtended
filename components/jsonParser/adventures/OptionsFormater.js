import	React								from	'react';

function	parseMarkdown(markdownText) {
	const htmlText = markdownText.replace(/~~(.*?)~~/gim, "<span class='text-highlight font-bold'>$1</span>");

	return htmlText.trim();
}

function	OptionsFormater({options, onChoice}) {
	return (
		options.map((opt, index) => (
			<div key={`${opt.goto}_${index}`} onClick={() => onChoice(opt.goto)} className={'flex flex-center button-regular'}>
				<p className={'text-base'} dangerouslySetInnerHTML={{__html: parseMarkdown(opt?.text || '')}} />
			</div>
		))
	);
}

export default OptionsFormater;