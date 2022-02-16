import {useEffect, useMemo, useRef} from 'react';

function useUnmountEffect(effect) {
	useEffect(() => () => {
		effect();
	}, []);
}

function useDebouncedCallback(callback, deps, delay, maxWait = 0) {
	const timeout = useRef();
	const waitTimeout = useRef();
	const lastCall = useRef();

	const clear = () => {
		if (timeout.current) {
			clearTimeout(timeout.current);
			timeout.current = undefined;
		}

		if (waitTimeout.current) {
			clearTimeout(waitTimeout.current);
			waitTimeout.current = undefined;
		}
	};

	// cancel scheduled execution on unmount
	useUnmountEffect(clear);

	return useMemo(
		() => {
			const execute = () => {
				// barely possible to test this line
				if (!lastCall.current) return;

				const context = lastCall.current;
				lastCall.current = undefined;

				callback.apply(context.this, context.args);

				clear();
			};

			// eslint-disable-next-line func-names
			const wrapped = function (...args) {
				if (timeout.current) {
					clearTimeout(timeout.current);
				}

				lastCall.current = {args, this: this};

				// plan regular execution
				timeout.current = setTimeout(execute, delay);

				// plan maxWait execution if required
				if (maxWait > 0 && !waitTimeout.current) {
					waitTimeout.current = setTimeout(execute, maxWait);
				}
			};

			Object.defineProperties(wrapped, {
				length: {value: callback.length},
				name: {value: `${callback.name || 'anonymous'}__debounced__${delay}`},
			});

			return wrapped;
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[delay, maxWait, ...deps]
	);
}

function useDebouncedEffect(callback, deps, delay, maxWait = 0) {
	useEffect(useDebouncedCallback(callback, deps, delay, maxWait), deps);
}

export default useDebouncedEffect;