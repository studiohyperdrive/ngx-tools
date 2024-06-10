import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'mergeArrays',
	standalone: true,
})
export class MergeArraysPipe implements PipeTransform {
	/**
	 * The mergeArrays pipe will take a source array and concat it with all provided additional arrays.
	 * Undefined or null values are filtered from the flattened result.
	 *
	 * @param source{any[]}
	 * @param arrays{any[]}
	 */
	public transform(source: any[] = [], ...arrays: any[][]): any[] {
		// Denis: If the source is not a valid array, fallback to an empty array.
		if (!Array.isArray(source)) {
			return [];
		}

		return (
			source
				// Denis: Concat the source with the provided arguments, filter out the non-array values from the arguments.
				.concat(...arrays.filter((array: any[]) => Array.isArray(array)))
				// Denis: Filter undefined or null values from the flattened result.
				.filter((value: any) => typeof value !== 'undefined' && value !== null)
		);
	}
}
