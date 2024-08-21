import { FormGroup } from '@angular/forms';
import clean from 'obj-clean';

import { clearFormError, setFormError } from '../utils';

const EMPTY_SET = new Set([undefined, null, '']);

/**
 * FormGroup validator which checks if either all values or no values are filled in
 *
 * @param controls - An array of controls.
 * @param dependedControlKey - A control within the group which the other controls depend on.
 * @param matchFunction - Optional function the dependedControl should check
 */
export const allOrNothingRequiredValidator = (
	form: FormGroup
): { allOrNothingRequiredError: string[] } | null => {
	const keys = Object.keys(form.value);

	// Iben:  If the group is completely empty we clear all required errors
	if (Object.keys(clean(form.value, { preserveArrays: false })).length === 0) {
		for (const key of keys) {
			clearFormError(form.get(key), 'required');
		}

		return null;
	}

	// Iben:  Collect all control keys that are missing values
	const requiredKeys = new Set<string>();

	// Iben: Loop over all keys and check each control on whether it is empty or not
	keys.forEach((key) => {
		const control = form.get(key);

		// Iben: Check if the control is empty
		const isEmpty =
			typeof control.value === 'object' && control.value !== null
				? Object.keys(clean(control.value)).length === 0
				: EMPTY_SET.has(control.value);

		// Iben: Add/remove the errors when needed
		if (isEmpty) {
			setFormError(control, 'required');

			requiredKeys.add(key);
		} else {
			clearFormError(control, 'required');

			requiredKeys.delete(key);
		}
	});

	// Iben: Return either null or the list of controls that are missing values based on the empty state
	return requiredKeys.size === 0 ? null : { allOrNothingRequiredError: Array.from(requiredKeys) };
};
