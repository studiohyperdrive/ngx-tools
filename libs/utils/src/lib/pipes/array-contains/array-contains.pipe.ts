import { Pipe, PipeTransform } from '@angular/core';

/**
 * A pipe that will search an array to see if on of its objects contains specific values on provided keys.
 *
 * Usage:
 * value | arrayContains : ['prop1', 'prop2', ...]
 *
 * Examples:
 * 	{{
 * 		[
 * 			{ title: 'This is the title', description: 'This is the description' },
 * 			{ title: 'This is the title' }
 * 		] | arrayContains: ['description']
 * 	}}
 * 	Output: true
 */
@Pipe({ name: 'arrayContains' })
export class ArrayContainsPipe implements PipeTransform {
	public transform(values: unknown[], checkProps: string[] = []): any {
		if (
			!Array.isArray(values) ||
			values.length === 0 ||
			!Array.isArray(checkProps) ||
			checkProps.length === 0
		) {
			return false;
		}

		const results = values.filter((item: unknown) => {
			const propsWithValues = checkProps.filter(
				(key: string) => typeof item[key] !== 'undefined' && item[key] !== null
			);

			return propsWithValues.length === checkProps.length;
		});

		return results.length > 0;
	}
}
