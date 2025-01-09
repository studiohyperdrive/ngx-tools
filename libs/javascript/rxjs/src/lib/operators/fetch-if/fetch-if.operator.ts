import { Observable, of, switchMap, take } from 'rxjs';

/**
 * Checks whether a value can be found in a source. When the value cannot be found, a provided fetch method will be invoked to fetch the data instead.
 * By default, a take(1) is applied to the source, so the source observable can be altered after fetching.
 *
 * @param  source - A source observable in which we'll search the value
 * @param  search - A search function that needs to return either the searched value or undefined when the value is not found
 * @param fetch - A fetch function that returns an observable to fetch the data when the search function returns undefined
 */
export const fetchIf = <DataType, SourceType>(
	source: Observable<SourceType>,
	search: (data: SourceType) => DataType | undefined,
	fetch: (data: SourceType) => Observable<DataType>
): Observable<DataType> => {
	// Iben: Grab the source observable and listen to the first emit. This allows the source observable to be updated with the fetch result if so desired
	return source.pipe(
		take(1),
		switchMap((data) => {
			// Iben: Search for the value in the data
			const result = search(data);

			// Iben: If the value is found, return the value. If not, call the fetch function
			return result !== undefined ? of(result) : fetch(data);
		})
	);
};
