/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				useClientEffect.js
******************************************************************************/

import {useEffect, useLayoutEffect} from 'react';

const	isBrowser = typeof window !== 'undefined';
const	useClientEffect = isBrowser ? useLayoutEffect : useEffect;

export default useClientEffect;