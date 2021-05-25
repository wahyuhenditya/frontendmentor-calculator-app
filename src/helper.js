export const checkColorScheme = () => {
	if (
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: light)').matches
	) {
		return 2;
	}

	return 1;
};
