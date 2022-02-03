import	React								from	'react';
import	Tooltip								from	'components/Tooltip';

function	DescriptionFormater({addr, rawDescription, variables}) {
	function	toRender() {
		return (
			rawDescription.map((part, i) => {
				return (
					<div key={`separator_${addr}_${i}`} className={i > 0 ? 'my-4' : ''}>
						{part.map(({text, highlighted, tooltip, hasVariable}, index) => {
							if (hasVariable) {
								text = variables[text];
							}
							if (highlighted) {
								return (
									<span key={`${addr}_${index}`} className={'group inline-flex justify-evenly font-bold cursor-help text-highlight tooltip'}>
										{text}
										<Tooltip>
											{tooltip.map(({text, highlighted, hasVariable}, jindex) => {
												if (hasVariable) {
													text = variables[text];
												}
												if (highlighted) {
													return (
														<p key={`${addr}_${index}_${jindex}`} className={'inline font-bold text-highlight'}>{text}</p>
													);
												}
												return (<p key={`${addr}_${index}_${jindex}`} className={'inline'}>{text}</p>);
											})}
										</Tooltip>
									</span>
								);

							}
							return (<p key={`${addr}_${index}`} className={'inline'}>{text}</p>);
						})}
					</div>
				);
			})
		);
	}
	return (toRender());
}

export default DescriptionFormater;