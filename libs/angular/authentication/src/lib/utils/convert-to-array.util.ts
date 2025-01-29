/**
 * Converts an single item to an array or returns the array as is. This is to help the guards, directives and pipes in this feature due to the typing in the abstract service
 */
export const convertToArray = <DataType>(item: DataType | DataType[]): DataType[] => {
	return Array.isArray(item) ? item : [item];
};
