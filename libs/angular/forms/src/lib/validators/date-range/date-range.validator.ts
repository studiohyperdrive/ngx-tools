import { AbstractControl } from '@angular/forms';
import { isValid, parse } from 'date-fns';

type DateRangeErrorCodes =
	| 'invalidMaxDate'
	| 'invalidMinDate'
	| 'dateAfterMaxDate'
	| 'dateBeforeMinDate';

/**
 * Form control validator which validates if a date is between a provided range (edges not included)
 *
 * @param minDate - Minimum valid date
 * @param maxDate - Maximum valid date
 * @param format - Optional format used for all 3 dates, by default yyyy-MM-dd
 */
export const dateRangeValidator = (min: string, max: string, format: string = 'yyyy-MM-dd') => {
	return (control: AbstractControl): { invalidRange: DateRangeErrorCodes } | null => {
		// Iben: Early exit in case the control or the value does not exist
		if (!control?.value) {
			return null;
		}

		// Iben : Create date objects based on the provided dates
		const date = parse(control.value, format, new Date());
		const maxDate = parse(max, format, new Date());
		const minDate = parse(min, format, new Date());

		// Iben: In case either of the boundary dates is invalid, we mark the input as invalid as we cannot confirm it's in the right range
		if (!isValid(maxDate) || !isValid(minDate)) {
			return {
				invalidRange: !isValid(maxDate) ? 'invalidMaxDate' : 'invalidMinDate',
			};
		}

		// Iben: In case the date itself is invalid, we early exit to let a potential date validator handle the error
		if (!isValid(date)) {
			return null;
		}

		// Iben: We check if the date is in between the boundaries and return an error if need be
		if (!(minDate <= date) || !(date <= maxDate)) {
			return {
				invalidRange: date > maxDate ? 'dateAfterMaxDate' : 'dateBeforeMinDate',
			};
		}

		return null;
	};
};
