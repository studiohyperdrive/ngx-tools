import { Pipe, PipeTransform } from '@angular/core';

/**
 * A pipe that will search an array to see if on of its objects contains specific values on provided keys.
 *
 * Usage:
 * value | arrayContainsOne : ['prop1', 'prop2', ...]
 *
 * Examples:
 * 	{{
 * 		[
 * 			{ title: 'This is the title', description: 'This is the description' },
 * 			{ title: 'This is the title' }
 * 		] | arrayContainsOne: ['description']
 * 	}}
 * 	Output: true
 */
@Pipe({
	name: 'arrayContainsOne',
	standalone: true,
})
export class ArrayContainsOnePipe implements PipeTransform {
	public transform(values: unknown[], checkProps: string[] = []): boolean {
		if (
			!Array.isArray(values) ||
			values.length === 0 ||
			!Array.isArray(checkProps) ||
			checkProps.length === 0
		) {
			return false;
		}

		return values.some((item: unknown) =>
			checkProps.some((key) => item[key] !== null && item[key] !== undefined)
		);
	}
}
