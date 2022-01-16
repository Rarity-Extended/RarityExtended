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
	const	[theme, set_theme] = useLocalStorage('theme', 'dark-initial');
	const	[raritySkins, set_raritySkins] = useLocalStorage('skins', true);

	useEffect(() => {
		if (theme !== 'dark-initial') {
			const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			if (darkModeMediaQuery.matches)
				set_theme('dark');
		}
	}, []);

	useEffect(() => {
		if (theme === 'light') {
			document.documentElement.classList.add('light');
			document.documentElement.classList.remove('dark');
			document.documentElement.classList.remove('dark-initial');
		} else if (theme === 'dark' || theme === 'dark-initial') {
			document.documentElement.classList.add('dark');
			document.documentElement.classList.remove('light');
		}
	}, [theme]);

	return (
		<UI.Provider
			value={{
				theme,
				setTheme: set_theme,
				raritySkins: raritySkins,
				switchTheme: () => set_theme(t => t === 'dark' ? 'light' : 'dark'),
				switchSkin: () => set_raritySkins(t => t === true ? false : true)
			}}>
			{children}
		</UI.Provider>
	);
};

export const useUI = () => useContext(UI);
export default useUI;
