/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Monday September 18th 2021
**	@Filename:				useSkins.js
******************************************************************************/

import	React, {useContext, createContext}	from	'react';
import	useLocalStorage									from	'hook/useLocalStorage';

const	SkinsContext = createContext();

export const SkinsContextApp = ({children}) => {
	const	[skins, set_skins] = useLocalStorage('skins', 'off');

	return (
		<SkinsContext.Provider
			value={{
				skins,
				setSkins: set_skins,
				switchSkins: () => set_skins(t => t === 'off' ? 'on' : 'off'),
			}}>
			{children}
		</SkinsContext.Provider>
	);
};

export const useSkins = () => useContext(SkinsContext);
export default useSkins;
