import { OperatorFunction, map } from 'rxjs';

/**
 * Maps an observable array based on the provided mapFunction.
 *
 * Returns an empty array if the array is undefined
 *
 * @template DataType - The type of the items in the array
 * @template ResultType - The type of the result items in the array
 * @param mapFunction - A function that accepts up to three arguments. The map method calls the mapFunction function one time for each element in the array.
 * @param mapArguments - An object to which the this keyword can refer in the mapFunction function. If this is omitted, undefined is used as the this value
 */

export const mapArray = <DataType, ResultType>(
	mapFunction: (item: DataType) => ResultType,
	mapArguments?: any
): OperatorFunction<DataType[], ResultType[]> => {
	return map((data) => {
		// Iben: If no data is found, we return an empty array
		if (!data) {
			return [];
		}

		// Iben: Map the array
		return data.map(mapFunction, mapArguments);
	});
};
