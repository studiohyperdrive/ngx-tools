import { FormGroup } from '@angular/forms';
import clean from 'obj-clean';

import { clearFormError, setFormError } from '../utils';

export interface AtLeastOneRequiredValidatorOptions<KeyType extends string = string> {
	controls?: KeyType[];
	conditionalFunction?: (data: any) => boolean;
}

/**
 * FormGroup validator which checks if either at least one value is filled in
 *
 * @param options - An optional object with configuration options, see below params for more info
 */
export const atLeastOneRequiredValidator = <KeyType extends string = string>(
	options?: AtLeastOneRequiredValidatorOptions<KeyType>
) => {
	return (group: FormGroup): { atLeastOneRequiredError: true } | null => {
		// Iben: Get the optional configuration items
		let conditionalFunction: (data: any) => boolean;
		let keys: KeyType[];

		if (options) {
			conditionalFunction = options.conditionalFunction;
			keys = options.controls;
		}
		// Iben: Setup the needed variables to handle the validator
		const cleanedFormValue = clean(group.value);
		const cleanedKeys = new Set(Object.keys(cleanedFormValue));
		const controls = Object.values(group.controls);
		const empty = cleanedKeys.size === 0;

		// Iben: If nothing is filled in, we return an error
		if (
			(empty && !conditionalFunction) ||
			(empty && conditionalFunction && conditionalFunction(group.value))
		) {
			for (const control of controls) {
				setFormError(control, 'required');
			}

			return { atLeastOneRequiredError: true };
		}

		// Iben: Check if we need to check on a specific key
		if (keys) {
			const hasOneKey = keys.reduce((hasOne, key) => hasOne || cleanedKeys.has(key), false);

			// Iben: Only return an error when there is no key matched at all
			// and in case of a conditionalFunction if the conditionalFunction is matched as well
			if (
				(!hasOneKey && !conditionalFunction) ||
				(!hasOneKey && conditionalFunction && conditionalFunction(group.value))
			) {
				for (const key of keys) {
					setFormError(group.get(key), 'required');
				}

				return { atLeastOneRequiredError: true };
			}
		}

		// Iben: In case there are no errors, clean the required errors and return null
		for (const control of controls) {
			clearFormError(control, 'required');
		}

		return null;
	};
};
