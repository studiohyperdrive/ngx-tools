export const inRange = (value: number, start: number, end = 0): boolean => {
	return Math.min(start, end) <= value && value < Math.max(start, end);
};
