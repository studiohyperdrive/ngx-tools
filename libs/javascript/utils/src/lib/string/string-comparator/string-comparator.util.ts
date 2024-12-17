/**
 * Compares two strings alphabetically using localeCompare.
 *
 * @param a - String to compare
 * @param b - String to compare
 * @param key - specific value from object that you want to compare
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stringComparator = (a: any, b: any, key?: string) => {
	if (!a) {
		return -1;
	}

	const compareTo = key && a[key] ? a[key] : a;

	if (typeof compareTo !== 'string') {
		return -1;
	}

	return compareTo.localeCompare(b);
};
