/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Friday September 10th 2021
**	@Filename:				useUI.js
******************************************************************************/

import	React, {useEffect, useContext, createContext}	from	'react';
import	useLocalStorage									from	'hook/useLocalStorage';

const	UI = createContext();
export const UIContextApp = ({children}) => {
	const	[theme, set_theme] = useLocalStorage('theme', 'light-initial');
	const	[layout, set_layout] = useLocalStorage('layout', 'default');

	useEffect(() => {
		if (theme !== 'light-initial') {
			const lightModeMediaQuery = window.matchMedia('(prefers-color-scheme: light)');
			if (lightModeMediaQuery.matches)
				set_theme('light');
		}
	}, [theme, set_theme]);

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
			document.documentElement.classList.remove('light');
			document.documentElement.classList.remove('light-initial');
		} else if (theme === 'light' || theme === 'light-initial') {
			document.documentElement.classList.add('light');
			document.documentElement.classList.remove('dark');
		}
	}, [theme]);

	return (
		<UI.Provider
			value={{
				theme,
				layout,
				setTheme: set_theme,
				switchTheme: () => set_theme(t => t === 'dark' ? 'light' : 'dark'),
				switchLayout: () => set_layout(t => t === 'default' ? 'legacy' : 'default')
			}}>
			{children}
		</UI.Provider>
	);
};

export const useUI = () => useContext(UI);
export default useUI;
