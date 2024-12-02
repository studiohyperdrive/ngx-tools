import { OperatorFunction, map } from 'rxjs';

/**
 * Slices an observable array based on the provided start and end position.
 *
 * Returns an empty array if the array is undefined
 *
 * @template DataType - The type of the items in the array
 * @param start - The beginning index of the specified portion of the array. If start is undefined, then the slice begins at index 0.
 * @param end - The end index of the specified portion of the array. This is exclusive of the element at the index 'end'. If end is undefined, then the slice extends to the end of the array.
 */

export const sliceArray = <DataType>(
	start?: number,
	end?: number
): OperatorFunction<DataType[], DataType[]> => {
	return map((data) => {
		// Iben: If no data is found, we return an empty array
		if (!data) {
			return [];
		}

		// Iben: Slice the array
		return data.slice(start, end);
	});
};
