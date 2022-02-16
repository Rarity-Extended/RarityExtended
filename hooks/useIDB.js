/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Saturday September 11th 2021
**	@Filename:				useIDB.js
******************************************************************************/

import {useState, useEffect} from 'react';

const hasIDB = typeof window !== 'undefined';

const dbp = new Promise((resolve, reject) => {
	if (!hasIDB) {
		return resolve(undefined);
	}
	const openreq = window.indexedDB.open('rarityExtendedV1', 1);
	openreq.onerror = () => reject(openreq.error);
	openreq.onsuccess = () => resolve(openreq.result);
	openreq.onupgradeneeded = () => openreq.result.createObjectStore('idb');
});

const call = async (type, method, ...args) => {
	const db = await dbp;
	return new Promise((resolve, reject) => {
		if (hasIDB){
			const transaction = db.transaction('idb', type);
			const store = transaction.objectStore('idb');
			const req = store[method](...args);
			transaction.oncomplete = () => resolve(req);
			transaction.onabort = transaction.onerror = () => reject(transaction.error);
		} else {
			resolve(undefined);
		}
	});
};

const get = async key => (await call('readonly', 'get', key)).result;
const set = (key, value) => value === undefined ? call('readwrite', 'delete', key) : call('readwrite', 'put', value, key);

const useIdb = (key, initialState) => {
	const [item, setItem] = useState(initialState);
	const [staleItems, setStaleItems] = useState([]);
	const [init, setInit] = useState(false);

	useEffect(() => {
		get(key).then((value) => {
			setInit(true);
			onInitEnded([value === undefined || value, ...staleItems]);
			return value === undefined || setItem(value);
		});
	}, [key]);

	function onInitEnded() {
		staleItems.forEach((value) => {
			if (value instanceof Function) {
				setItem((prev) => {
					const newState = value(prev);
					set(key, newState);
					return newState;
				});
			} else {
				setItem(value);
				return set(key, value);
			}
		});
	}

	return [
		item,
		(value) => {
			if (!init){
				setStaleItems((prev) => [...prev, value]);
				return;
			}
			if (value instanceof Function) {
				setItem((prev) => {
					const newState = value(prev);
					set(key, newState);
					return newState;
				});
			} else {
				setItem(value);
				return set(key, value);
			}
		}
	];
};
export default useIdb;