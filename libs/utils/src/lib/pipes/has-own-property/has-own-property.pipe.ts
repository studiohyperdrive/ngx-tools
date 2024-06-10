import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'hasOwnProperty',
	standalone: true,
})
export class HasOwnProperty implements PipeTransform {
	/**
	 * Checks whether the specified property exists within the given object.
	 *
	 * @param {unknown} object - The object to check for the presence of the property.
	 * @param {string} prop - The property name to check for within the object.
	 * @return {boolean} - Returns `true` if the property exists in the object, `false` otherwise.
	 */
	public transform(object: unknown, prop: string): boolean {
		// Use Object.prototype.hasOwnProperty to check if the property exists in the object
		const hasOwnProperty = Object.prototype.hasOwnProperty;

		// Check if the object is not null or undefined, and if it has the specified property
		return object != null && hasOwnProperty.call(object, prop);
	}
}
