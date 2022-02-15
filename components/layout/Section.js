import	React, {useState, useEffect}	from	'react';
import	{useRouter}						from	'next/router';
import	IconHelp						from	'components/icons/IconHelp';

function Head({children, title, tabs, button, tab, set_tab}) {
	return (
		<header id={'content'} aria-label={`tab ${tab}`} className={'pb-6 box'}>
			<div className={'flex flex-col p-4 pb-2 border-b-2 dark:border-b-dark-300'}>
				<div className={'flex flex-row justify-between items-center mb-4 h-9'}>
					<div className={'flex flex-row items-center'}>
						<h2 className={'text-base font-bold text-plain'}>{title}</h2>
						<div className={'flex ml-2 h-6 flex-center'}>
							<IconHelp />
						</div>
					</div>
					<div className={'flex flex-row items-center space-x-4'}>
						{children}
						<div>
							{button ? <button
								onClick={() => button.onClick(tab)}
								disabled={typeof(button.disabled) === 'function' ? button.disabled(tab) : button.disabled}
								className={`flex flex-center button-highlight ${button.className}`}>
								<p className={'select-none'}>{typeof(button.label) === 'function' ? button.label(tab) : button.label}</p>
							</button> : null}
						</div>
					</div>
				</div>
				<nav className={'flex relative flex-row items-center space-x-4'}>
					{tabs.map((name, index) => (
						<div
							key={name}
							onClick={() => set_tab(index)}
							className={`p-2 -mb-2 ${index === 0 ? 'pl-0' : ''} ${tab === index ? 'text-plain border-b-2 dark:border-b-dark-primary' : 'cursor-pointer text-plain-60 hover-text-plain border-b-2 border-transparent'}`}>
							<p className={'text-sm'}>{name}</p>
						</div>
					))}
				</nav>
			</div>
		</header>
	);
}

function Section({children, headChildren, title, tabs, button, className = 'box'}) {
	const	router = useRouter();
	const	[tab, set_tab] = React.useState(0);
	const	[search, set_search] = useState(router?.query?.search || '');

	useEffect(() => {
		if (router?.query?.search) set_search(router.query.search);
		if (router?.query?.tab) set_tab(Number(router.query.tab) || 0);
	}, [router]);

	return (
		<section id={'content'} className={className}>
			<Head
				title={title}
				tabs={tabs}
				button={button}
				tab={tab}
				set_tab={set_tab}>
				{headChildren}
			</Head>
			{React.cloneElement(children, {tab, set_tab, search})}
		</section>
	);
}

export default Section;
