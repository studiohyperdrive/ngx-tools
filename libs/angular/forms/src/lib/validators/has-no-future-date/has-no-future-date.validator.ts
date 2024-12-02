import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isValid } from 'date-fns';

/**
 * hasNoFutureDateValidator
 *
 * Validator function to ensure that the selected date is not in the future.
 * If the date is in the future, it returns an error.
 * @returns ValidationErrors if the date is in the future, otherwise null.
 *
 */
export const hasNoFutureDateValidator = (): ValidatorFn => {
	return (control: FormControl): ValidationErrors | null => {
		// Early exit in case the control or the value does not exist
		if (!control.value) {
			return null;
		}

		// Create date objects based on the provided date and current date
		const inputDate = new Date(control.value);
		const currentDate = new Date();

		// In case the date itself is invalid, we early exit to let a potential date validator handle the error
		if (!isValid(inputDate)) {
			return null;
		}

		return inputDate <= currentDate ? null : { isFutureDate: { valid: false } };
	};
};
