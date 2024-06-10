import { Pipe, PipeTransform } from '@angular/core';
import { isObject } from 'lodash';

@Pipe({
	name: 'entries',
	standalone: true,
})
export class EntriesPipe implements PipeTransform {
	/**
	 * Transforms a record into a [key, value] array
	 *
	 * @param value - The provided record
	 */
	public transform(value: Record<string, unknown>): [string, unknown][] {
		// Iben: If there's no value or the value is not an object, we return an empty array to prevent frontend breaking
		if (!value || !isObject(value) || Array.isArray(value)) {
			return [];
		}

		// Iben: Transform the record to a [key,value] array
		return Array.from(Object.entries(value));
	}
}
