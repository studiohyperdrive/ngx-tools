import { Pipe, PipeTransform } from '@angular/core';
import { isObject } from 'lodash';
import * as clean from 'obj-clean';

@Pipe({
	name: 'hasValues',
})
export class HasValuesPipe implements PipeTransform {
	/**
	 * Checks whether an object has values
	 *
	 * @param value - The provided value
	 */
	public transform(value: Object): boolean {
		// Iben: If the value is not an object, return valse
		if (!value || !isObject(value) || Array.isArray(value)) {
			return false;
		}

		// Iben: Return when the object has values
		return Object.keys(clean(value)).length > 0;
	}
}
