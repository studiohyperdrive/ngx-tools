/**
 * Replaces all special characters to their normal counterparts
 *
 * @param value - The value you want to normalize
 */
export const normalizeString = (value: string): string => {
	return value.normalize('NFD').replace(/([\u0300-\u036f])/g, '');
};
