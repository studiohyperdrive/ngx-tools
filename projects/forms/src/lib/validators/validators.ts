import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

import { allOrNothingRequiredValidator } from './all-or-nothing-required/all-or-nothing-required.validator';
import {
	AtLeastOneRequiredValidatorOptions,
	atLeastOneRequiredValidator,
} from './at-least-one-required/at-least-one-required.validator';
import { dependedRequiredValidator } from './depended-required/depended-required.validator';
import { decimalsAfterCommaValidator } from './decimals-after-comma/decimals-after-comma.validator';
import { chronologicalDatesValidator } from './chronological-dates/chronological-dates.validator';
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

	/**
	 * FormGroup validator which checks if an array of controls in the control are filled in if the depended control is filled in
	 *
	 * @param controls - An array of controls.
	 * @param dependedControlKey - A control within the group which the other controls depend on.
	 * @param matchFunction - Optional function the dependedControl should check
	 */
	static dependedRequired<KeyType extends string = string>(
		controls: KeyType[],
		dependedControlKey: KeyType,
		matchFunction?: (data: any) => boolean
	): ValidatorFn {
		return dependedRequiredValidator<KeyType>(controls, dependedControlKey, matchFunction);
	}

	/**
	 * Validates whether the inputted value has exceeded the maximum amount of decimals after the comma
	 *
	 * @param max - The maximum number of decimals after the comma
	 */
	static decimalsAfterComma(max: number): ValidatorFn {
		return decimalsAfterCommaValidator(max);
	}

	/**
	 * A FormGroup validator to check whether a start and end date are chronologically correct
	 *
	 * @param startControlKey - The key of the control containing the start date value
	 * @param endControlKey - The key of the control containing the end date value
	 * @param format - Optional format of the dates provided by the controls, by default YYYY-MM-DD
	 */
	static chronologicalDates(
		startControlKey: string,
		endControlKey: string,
		format = 'YYYY-MM-DD'
	): ValidatorFn {
		return chronologicalDatesValidator(startControlKey, endControlKey, format);
	}

	/**
	 * Form control validator which validates if a date is between a provided range
	 *
	 * @param minDate - Minimum valid date
	 * @param maxDate - Maximum valid date
	 * @param format - Optional format used for all 3 dates, by default YYYY-MM-DD
	 */
	static dateRangeValidator(min: string, max: string, format = 'YYYY-MM-DD'): ValidatorFn {
		return this.dateRangeValidator(min, max, format);
	}

	/**
	 * Form control validator which validates if a date is not in the future.
	 */
	static hasNoFutureDateValidator = (): ValidatorFn => {
		return this.hasNoFutureDateValidator();
	};

	// Add other custom validators :-)
}
