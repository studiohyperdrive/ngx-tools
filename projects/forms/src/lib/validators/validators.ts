import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Helpers
 *
 * Don't add to class because we don't want them to be exposed as static prop
 */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function isEmptyInputValue(value: any): boolean {
	// we don't check for string here so it also works with arrays
	return value == null || value.length === 0;
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function extendedEmailValidator(control: AbstractControl): ValidationErrors | null {
	if (isEmptyInputValue(control.value)) {
		return null; // don't validate empty values to allow optional controls
	}

	// Validates more strictly than the default email validator. Requires a period in the tld part.
	return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(control.value)
		? null
		: { extendedEmail: true };
}

/**
 * Exported Class
 */

export class Validators {
	static extendedEmail(control: AbstractControl): ValidationErrors | null {
		return extendedEmailValidator(control);
	}

	// Add other custom validators :-)
}
