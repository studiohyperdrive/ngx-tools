import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'btw',
	standalone: true,
})
export class BtwPipe implements PipeTransform {
	/**
	 * Converts a BTW number to the correct format
	 *
	 * @param value - The value we wish to convert
	 */
	public transform(value: string): string {
		if (!value) {
			// Denis: if the value is falsy, return it without transform.
			return value;
		}

		const addCharAtIndex = (original: string, char: string, index: number): string => {
			return original.slice(0, index) + char + original.slice(index);
		};

		// Iben: Convert to string if it's a number
		value = value.toString();

		if (value.replace(/\./g, '').length === 9) {
			value = '0' + value;
		}

		// Iben: Format: xxxx.xxx.xxx
		if (value.charAt(4) !== '.') {
			value = addCharAtIndex(value, '.', 4);
		}

		if (value.charAt(8) !== '.') {
			value = addCharAtIndex(value, '.', 8);
		}

		return value;
	}
}
