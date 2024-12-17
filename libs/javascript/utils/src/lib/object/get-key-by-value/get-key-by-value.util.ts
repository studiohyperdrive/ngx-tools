/**
 * getKeyByValue
 *
 * The getKeyByValue helper function will search for a key within an object, based on the provided value.
 * This function should work with both plain objects and enums.
 * It will return the first key found. If a value exists more than once,
 * it will only return the key of the first corresponding value.
 *
 * @param object
 * @param value
 * @returns string
 */
export const getKeyByValue = (object: { [key: string]: unknown }, value: unknown): string => {
	if (!object || Object.values(object).length === 0) {
		return undefined;
	}

	const index = Object.values(object).indexOf(value);

	return Object.keys(object)[index];
};
