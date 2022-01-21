import { useEffect, useRef } from "react";

export const useKeypress = (keys: string | string[], handler: Function) => {
	const eventListenerRef = useRef(null);

	useEffect(() => {
		eventListenerRef.current = (event) => {
			if (Array.isArray(keys) ? keys.includes(event.key) : keys === event.key) {
				handler?.(event);
			}
		};
	}, [keys, handler]);

	useEffect(() => {
		const eventListener = (event) => {
			eventListenerRef.current(event);
		};
		window.addEventListener("keydown", eventListener);
		return () => {
			window.removeEventListener("keydown", eventListener);
		};
	}, []);
};
