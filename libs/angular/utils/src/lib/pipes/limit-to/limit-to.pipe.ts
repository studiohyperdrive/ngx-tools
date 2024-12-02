import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'limitTo',
	standalone: true,
})
export class LimitToPipe implements PipeTransform {
	/**
	 * Limits an array to a specific value
	 *
	 * @param value - The provided array
	 * @param limitedTo - The number to which we want to limit the array
	 */
	public transform(value: any[], limitedTo: number): any[] {
		// Iben: If no value is provided or the value is not an array, we early exit
		if (!value || !Array.isArray(value)) {
			return [];
		}

		// Iben: Slice the array based on the provided limit
		return [...value].slice(0, limitedTo);
	}
}
