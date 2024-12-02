import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'isNotEmpty',
	standalone: true,
})
export class IsNotEmptyPipe implements PipeTransform {
	/**
	 * Checks if a given argument is an object or array and if it is empty.
	 *
	 * @param value - can be any value.
	 * @param checkProps - which props to check.
	 */
	transform(value: unknown, checkProps: string[] = []): boolean {
		// Denis: check for array first, because "typeof Array" will return "object"
		if (Array.isArray(value) && value.length > 0) {
			return true;
		}

		// Denis: check for null values second, because "typeof null" will return "object"
		if (value === null) {
			return false;
		}

		// Denis: if the object is not empty, and checkProps is provided, check those props.
		if (typeof value === 'object' && checkProps.length > 0) {
			const propsWithValues = checkProps.filter(
				(key: string) => typeof value[key] !== 'undefined' && value[key] !== null
			);

			return propsWithValues.length === checkProps.length;
		}

		// Denis: check for empty objects.
		if (typeof value === 'object' && Object.keys(value).length > 0) {
			return true;
		}

		return false;
	}
}
