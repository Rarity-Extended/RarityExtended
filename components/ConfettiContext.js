import {createContext, useContext} from 'react';

export const ConfettiContext = createContext({
	showConfetti: false,
	setShowConfetti: () => {}
});

export const useConfetti = () => useContext(ConfettiContext);