import { FormGroup } from '@angular/forms';

import { clearFormError, setFormError } from '../utils';

const EMPTY_SET = new Set([undefined, null, '']);

/**
 * FormGroup validator which checks if an array of controls in the control are filled in if the depended control is filled in
 *
 * @param controls - An array of controls.
 * @param dependedControlKey - A control within the group which the other controls depend on.
 * @param matchFunction - Optional function the dependedControl should check
 */
export const dependedRequiredValidator = <KeyType extends string = string>(
	controls: KeyType[],
	dependedControlKey: KeyType,
	matchFunction?: (data: any) => boolean
) => {
	return (form: FormGroup): { hasDependedRequiredError: string[] } | null => {
		// Iben: Make a set so we know which controls are not filled in
		const keysWithErrors = new Set<KeyType>();
		const dependedControl = form.get(dependedControlKey);

		// Iben: If the control is not filled in or the value doesn't match, we do an early exit and remove all potential required errors
		if (
			!dependedControl ||
			!(matchFunction
				? matchFunction(dependedControl.value)
				: !EMPTY_SET.has(dependedControl.value))
		) {
			for (const key of controls) {
				const control = form.get(key);

				// Continue if control does not exist
				if (!control) {
					continue;
				}

				clearFormError(control, 'required');
			}

			return null;
		}

		// Iben: Set an overall error so we can see if all controls are filled in or not
		let hasError = false;

		for (const key of controls) {
			const control = form.get(key);

			// Iben: Continue if control does not exist
			if (!control) {
				continue;
			}

			hasError = hasError || EMPTY_SET.has(control.value);

			// Iben: If the control is not filled in we set a required error, if not, we remove it
			if (!EMPTY_SET.has(control.value)) {
				clearFormError(control, 'required');
				keysWithErrors.delete(key);
			} else {
				setFormError(control, 'required');
				keysWithErrors.add(key);
			}
		}

		const errors = Array.from(keysWithErrors);

		return hasError ? { hasDependedRequiredError: errors } : null;
	};
};
