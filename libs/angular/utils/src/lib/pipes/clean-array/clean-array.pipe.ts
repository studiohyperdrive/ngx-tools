import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'cleanArray',
	standalone: true,
})
export class CleanArrayPipe implements PipeTransform {
	/**
	 * Removes all falsy values from the provided array.
	 *
	 * @param value The values that need to be stripped of falsy values.
	 * @param exceptions The falsy values that may be included in the filtered array.
	 * @returns The filtered array.
	 */
	public transform(value: any[], exceptions: any[] = []): any[] {
		if (!exceptions.length) {
			return value.filter(Boolean);
		}

		return value.filter((entry) => Boolean(entry) || exceptions.includes(entry));
	}
}
