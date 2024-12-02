import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'toArray',
	standalone: true,
})
export class ToArrayPipe implements PipeTransform {
	/**
	 * Checks if a given argument is an array, if not, it will wrap the argument in a new array.
	 */
	// Denis: Intentional any interface. The argument can be any kind of value.
	public transform(value: any): any[] {
		if (typeof value === 'undefined' || value === null) {
			return [];
		}

		if (Array.isArray(value)) {
			return value;
		}

		return [value];
	}
}
