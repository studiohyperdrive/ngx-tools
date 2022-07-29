import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

import { allOrNothingRequiredValidator } from './all-or-nothing-required/all-or-nothing-required.validator';
import { extendedEmailValidator } from './email/extended-email.validator';

/**
 * Exported Class
 */

export class Validators {
	/**
	 * A stricter validator for e-mail validation
	 *
	 * @param control - A form control
	 */
	static extendedEmail(control: AbstractControl): ValidationErrors | null {
		return extendedEmailValidator(control);
	}

	/**
	 * A validator to check if all or none of the values of a form group are filled in.
	 * Particularly useful in situations where a form group field within itself is optional,
	 * but all fields are required in case it does get filled in
	 *
	 * @param control - A form group control
	 */
	static allOrNothingRequired(control: FormGroup): ValidationErrors | null {
		return allOrNothingRequiredValidator(control);
	}

	// Add other custom validators :-)
}
