/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Friday October 1st 2021
**	@Filename:				useNotifications.js
******************************************************************************/

import {useCallback} from 'react';

const useNotification = (title, options) => {
	const fireNotify = useCallback(() => {
		if (!('Notification' in window)) {
			return;
		}

		if (Notification.permission !== 'granted') {
			Notification.requestPermission().then(permission => {
				if (permission === 'granted') {
					new Notification(title, options);
				}
			});
		} else {
			new Notification(title, options);
		}
	}, [typeof(window) !== 'undefined']);

	if (typeof(window) !== 'undefined' && !('Notification' in window)) {
		return;
	}

	return fireNotify;
};

export default useNotification;
