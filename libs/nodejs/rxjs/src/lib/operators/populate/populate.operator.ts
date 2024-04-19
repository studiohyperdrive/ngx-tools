import { Observable, OperatorFunction, combineLatest, map, of, switchMap } from 'rxjs';
import { cloneDeep, get, set } from 'lodash';

//TODO: Iben: Find out a way to type this better than with any, but without introducing a complex typing hell
/**
 * Populates an existing data source with additional data from provided observables
 *
 * @param  populater - A record of which keys need to be updated with a provided observable
 * @param populateIf - An optional function to determine when a value needs to be fetched
 */
export const populate = <DataType extends object>(
	populater: Record<string, (data: DataType) => Observable<any>>,
	populateIf?: (value: any) => boolean
): OperatorFunction<DataType, DataType> => {
	return switchMap((data) => {
		// Iben: Filter out all keys that are populated
		const keys = Object.keys(populater).filter((key) => {
			const value = get(data, key);

			// Iben: If no populateIf function is provided, we check if the value is undefined or null
			if (!populateIf) {
				return value === undefined || value === null;
			}

			// Iben: If a populateIf function is provided, we use this function to see whether we should populate a key
			return populateIf(value);
		});

		// Iben: Map the keys to their corresponding observables
		const observables = [...keys].map((key) => populater[key](data));

		// Iben: If no Observables were generated, return the data as is
		if (observables.length === 0) {
			return of(data);
		}

		// Iben: Loop over the provided observables and populate the data
		return combineLatest(observables).pipe(
			map((results) => {
				// Iben: Use cloneDeep to avoid issues with readonly properties
				const result = cloneDeep(data) as DataType;

				// Iben: Loop over the results and merge them into the value
				results.forEach((value, index) => {
					set(result, keys[index], value);
				});

				return result;
			})
		);
	});
};
