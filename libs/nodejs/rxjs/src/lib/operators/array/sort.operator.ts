import { OperatorFunction, map } from 'rxjs';

/**
 * Sort an observable array based on the sort function.
 *
 * Returns an empty array if the array is undefined
 *
 * @template DataType - The type of the items in the array
 * @param compareFunction - Function used to determine the order of the elements. It is expected to return a negative value if the first argument is less than the second argument, zero if they're equal, and a positive value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
 */
export const sortArray = <DataType>(
	compareFunction?: (a: DataType, b: DataType) => number
): OperatorFunction<DataType[], DataType[]> => {
	return map((data) => {
		// Iben: If no data is found, we return an empty array
		if (!data) {
			return [];
		}

		// Iben: sort the array
		return data.sort(compareFunction);
	});
};
