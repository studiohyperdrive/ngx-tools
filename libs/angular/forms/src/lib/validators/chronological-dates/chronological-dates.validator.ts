import { FormGroup, ValidatorFn } from '@angular/forms';
import { format, isValid } from 'date-fns';

import { clearFormError, setFormError } from '../utils';

/**
 * A FormGroup validator to check whether a start and end date are chronologically correct
 *
 * @param startControlKey - The key of the control containing the start date value
 * @param endControlKey - The key of the control containing the end date value
 * @param format - Optional format of the dates provided by the controls, by default yyyy-MM-dd
 */
export const chronologicalDatesValidator = (
	startControlKey: string,
	endControlKey: string,
	dateFormat = 'yyyy-MM-dd'
): ValidatorFn => {
	return (form: FormGroup): { incorrectChronologicalDates: true } | null => {
		// Iben: Get the date values
		const value = form.getRawValue();
		const startValue = value[startControlKey];
		const endValue = value[endControlKey];

		// Iben: Clear the form error on the endControl
		clearFormError(form.get(endControlKey), 'incorrectChronologicalDate');

		// Iben: If either date value is not filled in, we early exit to handle this in a potential required validator
		if (!startValue || !endValue) {
			return null;
		}

		// Iben: If the dates as is are not valid, early exit
		if (!isValid(new Date(startValue)) || !isValid(new Date(endValue))) {
			return null;
		}

		// Iben: Create dates so we can compare them
		const startDate = format(new Date(startValue), dateFormat);
		const endDate = format(new Date(endValue), dateFormat);

		// Iben: If either date is invalid based on the format, we early exit to handle this in a date validator
		if (!isValid(new Date(startDate)) || !isValid(new Date(endDate))) {
			return null;
		}

		// Iben: If the endDate falls before the startDate, we return an error
		if (endDate < startDate) {
			setFormError(form.get(endControlKey), 'incorrectChronologicalDate');

			return { incorrectChronologicalDates: true };
		}

		return null;
	};
};
