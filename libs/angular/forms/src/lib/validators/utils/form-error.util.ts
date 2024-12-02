import { AbstractControl } from '@angular/forms';
import clean from 'obj-clean';

/**
 * Removes an error from a form control
 *
 * @param control - Form control to remove the error from.
 * @param error  - Name of the error to remove from the control.
 */
export const clearFormError = (control: AbstractControl, error: string): void => {
	// Iben: Check if there are no errors existing on this control or if the the provided error does not exist, and early exit if needed
	const errors = new Set(Object.keys(control.errors || {}));

	if (errors.size === 0 || !errors.has(error)) {
		return;
	}

	// Iben: In case the provided error is the only error on the control, clear all errors and early exit
	if (errors.has(error) && errors.size === 1) {
		control.setErrors(null);

		return;
	}

	// Iben: In case there are more errors, remove only the provided error
	control.setErrors(
		clean({
			...control.errors,
			[error]: undefined,
		})
	);
};

/**
 * Adds an error to a form control
 *
 * @param control - Form control to attach the error to.
 * @param error - Name of the error to attach to the control.
 * @param value - Value of the error being attached to the control
 */
export const setFormError = (control: AbstractControl, error: string, value: any = true): void => {
	// Iben: Early exit in case the control already has the error
	if (control.hasError(error)) {
		return;
	}

	// Iben: Add the provided error
	control.setErrors({
		...control.errors,
		[error]: value,
	});
};
