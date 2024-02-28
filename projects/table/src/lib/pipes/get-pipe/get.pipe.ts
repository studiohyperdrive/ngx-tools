import { Pipe, PipeTransform } from '@angular/core';
import { getProperty } from 'dot-prop';

/**
 * This pipe returns a value based on a provided path
 *
 * @export
 * @class NgxTableGetPipe
 * @implements {PipeTransform}
 */
@Pipe({
	name: 'getProp',
	standalone: true,
})
export class NgxTableGetPipe implements PipeTransform {
	public transform(value: unknown, path: string): any {
		// Iben: Check if the value is not an object and return an empty string so the frontend doesn't break and warn the user
		if (typeof value !== 'object' || Array.isArray(value) || value === null) {
			console.warn(
				'NgxTableGetPipe encountered a value that was not an object and returned an empty string instead.'
			);

			return '';
		}

		// Iben: If no path was provided, we return the value and warn the user
		if (!path) {
			console.warn(
				'NgxTableGetPipe did not receive a path to a property and returned an empty string instead.'
			);

			return value;
		}

		// Iben: Return the property using dot-prop
		return getProperty(value, path);
	}
}
