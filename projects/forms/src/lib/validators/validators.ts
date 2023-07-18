import {
	AbstractControl,
	FormGroup,
	ValidationErrors,
	ValidatorFn,
} from '@angular/forms';

import { allOrNothingRequiredValidator } from './all-or-nothing-required/all-or-nothing-required.validator';
import {
	AtLeastOneRequiredValidatorOptions,
	atLeastOneRequiredValidator,
} from './at-least-one-required/at-least-one-required.validator';
import { extendedEmailValidator } from './email/extended-email.validator';

/**
 * Exported Class
 */

export class NgxValidators {
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

	/**
	 * A validator to check if at least one of the provided controls of the form group are filled in
	 *
	 * @param options - An optional object with configuration options, see below params for more info
	 * @param controlNames - Optional list of controls, if not provided the validator is applied to all controls of the group
	 * @param conditionalFunction - Optional function the form value needs to return true to for the required to be se
	 */
	static atLeastOneRequired<KeyType extends string = string>(
		options?: AtLeastOneRequiredValidatorOptions<KeyType>
	): ValidatorFn {
		return atLeastOneRequiredValidator<KeyType>(options);
	}

	// Add other custom validators :-)
}
