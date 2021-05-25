export const checkColorScheme = () => {
	if (
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
	) {
		return 1;
	}

	return 2;
};
