/**
 * Checks if the provided value is in range of the provided minimum and maximum value.
 * *
 * @param value - The value you want to check
 * @param start - The minimum value of the range
 * @param end - The maximum value of the range
 */
export const inRange = (value: number, start: number, end = 0): boolean => {
	return Math.min(start, end) <= value && value < Math.max(start, end);
};
