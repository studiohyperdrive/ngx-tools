export const isEmptyInputValue = (value: any): boolean => {
	// we don't check for string here so it also works with arrays
	return value == null || value.length === 0;
};
