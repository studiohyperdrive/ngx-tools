import { AbstractControl, ValidationErrors } from '@angular/forms';

import { isEmptyInputValue } from '../utils';

export const extendedEmailValidator = (control: AbstractControl): ValidationErrors | null => {
	if (isEmptyInputValue(control.value)) {
		return null; // don't validate empty values to allow optional controls
	}

	// Validates more strictly than the default email validator. Requires a period in the tld part.
	return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]+$/gi.test(control.value)
		? null
		: { extendedEmail: true };
};
