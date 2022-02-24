import	React, {useState}	from	'react';
import	{useRouter}			from	'next/router';
import	IconHelp			from	'components/icons/IconHelp';
import	ModalHelpDefault	from	'components/modals/HelpDefault';

function SectionHead({children, title, tabs, button, tab, set_tab}) {
	const	[modalOpen, set_modalOpen] = useState(false);

	return (
		<header id={'content'} aria-label={`tab ${tab}`} className={'pb-6 box'}>
			<div className={'flex flex-col p-4 pb-2 border-b-2 dark:border-b-dark-300'}>
				<div className={'flex flex-row justify-between items-start mb-4 h-9 md:items-center'}>
					<div className={'flex flex-row items-center'}>
						<h2 className={'text-base font-bold text-plain'}>{title}</h2>
						<div
							onClick={() => set_modalOpen(!modalOpen)}
							className={'flex ml-2 h-6 flex-center'} >
							<IconHelp />
						</div>
					</div>
					<div className={'flex flex-col-reverse items-center space-x-0 md:flex-row md:space-x-4'}>
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
				<nav className={'hidden relative flex-row items-center space-x-4 md:flex'}>
					{tabs.map((name, index) => (
						<div
							key={name}
							onClick={() => set_tab(index)}
							className={`p-2 -mb-2 ${index === 0 ? 'pl-0' : ''} ${tab === index ? 'text-plain border-b-2 border-b-light-primary dark:border-b-dark-primary' : 'cursor-pointer text-plain-60 hover-text-plain border-b-2 border-transparent'}`}>
							<p className={'text-sm'}>{name}</p>
						</div>
					))}
				</nav>
				<nav className={'flex relative flex-row items-center my-2 mt-4 md:hidden'}>
					<select
						value={tab}
						className={'flex items-center py-2 px-3 w-full text-sm dark:text-white whitespace-nowrap bg-light-primary-lighter dark:bg-dark-500 rounded-sm border-none cursor-pointer'}
						onChange={(e) => set_tab(Number(e.target.value))}>
						{tabs.map((name, index) => (
							<option className={'cursor-pointer'} key={index} value={index}>{name}</option>
						))}
					</select>
				</nav>
			</div>
			{React.createElement(ModalHelpDefault, {isOpen: modalOpen, set_isOpen: set_modalOpen})}
		</header>
	);
}

function Section({children, help, headChildren, title, tabs, button, className = 'box'}) {
	const	router = useRouter();
	const	[tab, set_tab] = React.useState(0);
	const	[search, set_search] = useState(router?.query?.search || '');

	React.useLayoutEffect(() => {
		if (router?.query?.search) set_search(router.query.search);
		if (router?.query?.tab) set_tab(Number(router.query.tab) || 0);
	}, [router]);

	return (
		<section id={'content'} className={className}>
			<SectionHead
				title={title}
				tabs={tabs}
				button={button}
				tab={tab}
				set_tab={set_tab}
				help={help}>
				{headChildren}
			</SectionHead>
			{React.cloneElement(children, {tab, set_tab, search})}
		</section>
	);
}

export default Section;
