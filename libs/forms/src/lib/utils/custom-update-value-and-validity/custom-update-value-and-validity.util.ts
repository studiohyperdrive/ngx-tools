import { AbstractControl } from '@angular/forms';

import { FormStateOptionsEntity } from '../../interfaces';

/**
 * Adds a deep update value and validity to the existing update value and validity
 *
 * @param form - The provided abstract control
 * @param options - The options we wish to call along with the update value and validity function
 */
export const updateAllValueAndValidity = (
	form: AbstractControl,
	options: FormStateOptionsEntity = {}
) => {
	// Iben: Call the original updateValueAndValidity
	form.updateValueAndValidity(options);
	// Iben: If we don't have the inner form yet we just do the default update value
	if (!form || !form['controls']) {
		return;
	}

	// Iben: We update the value and validity recursively for each child control
	deepUpdateValueAndValidity(form['controls'], { ...options, onlySelf: true });
};
/**
 * Allows for a deep updateValueAndValidity of all controls. Can be used for a FormGroup or a FormArray
 *
 * @param controls - The controls we wish to update the value and validity of
 * @param onlySelf - Whether or not we want it to be only the control itself and not the direct ancestors. Default this is true
 */
export const deepUpdateValueAndValidity = (
	controls: Record<string, AbstractControl> | AbstractControl[],
	options: FormStateOptionsEntity = {}
) => {
	// Iben: We loop over all controls
	(Array.isArray(controls) ? controls : Object.values(controls)).forEach((control) => {
		// Iben: If there are no child controls, we update the value and validity of the control
		if (!control['controls']) {
			control.updateValueAndValidity(options);
			return;
		}

		// Iben: If there are child controls, we recursively update the value and validity
		deepUpdateValueAndValidity(control['controls'], options);
	});
};
