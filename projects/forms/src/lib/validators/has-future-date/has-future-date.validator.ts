import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * hasFutureDateValidator
 *
 * Validator function to ensure that the selected date is not in the future.
 * If the date is in the future, it returns an error.
 * @returns ValidationErrors if the date is in the future, otherwise null.
 *
 */
export const hasFutureDateValidator = (): ValidatorFn => {
	return (control: FormControl): ValidationErrors | null => {
		if (!control.value) {
			return null;
		}

		const currentDate = new Date();
		const inputDate = new Date(control.value);

		return inputDate <= currentDate ? null : { invalidDate: { valid: false } };
	};
};
