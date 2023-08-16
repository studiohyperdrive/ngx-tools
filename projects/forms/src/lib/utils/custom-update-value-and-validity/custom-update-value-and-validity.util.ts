import { AbstractControl } from '@angular/forms';

import { FormStateOptionsEntity } from '../../interfaces';

/**
 * Adds a deep update value and validity to the existing update value and validity
 *
 * @param form - The provided abstract control
 * @param updateValueAndValidity - The existing update value and validity function we wish to call
 * @param options - The options we wish to call along with the update value and validity function
 */
export const customUpdateValueAndValidity = (
	form: AbstractControl,
	updateValueAndValidity: Function,
	options: FormStateOptionsEntity = {},
	updatedControls: string[] = []
) => {
	const formControls = form['controls'];

	// Iben: Call the original updateValueAndValidity
	updateValueAndValidity({ ...options, onlySelf: true });
	console.log('I am the main form and I am updating');
	// Iben: If we don't have the inner form yet we just do the default update value
	if (!form || !formControls) {
		return;
	}

	// Iben: We update the value and validity recursively for each child control
	deepUpdateValueAndValidity(formControls, { ...options, onlySelf: true }, updatedControls);
};
/**
 * Allows for a deep updateValueAndValidity of all controls. Can be used for a FormGroup or a FormArray
 *
 * @param controls - The controls we wish to update the value and validity of
 * @param onlySelf - Whether or not we want it to be only the control itself and not the direct ancestors. Default this is true
 */
export const deepUpdateValueAndValidity = (
	controls: Record<string, AbstractControl> | AbstractControl[],
	options: FormStateOptionsEntity = {},
	updatedControls: string[] = []
) => {
	if (!controls) {
		return;
	}

	if (Array.isArray(controls)) {
		controls.forEach((control) => {
			if (!control['controls']) {
				control.updateValueAndValidity(options);
				return;
			}

			// Iben: If there are child controls, we recursively update the value and validity
			deepUpdateValueAndValidity(control['controls'], options);
		});

		return;
	}

	const [currentLevel, children] = getControlsToUpdate(updatedControls);

	// Iben: We loop over all controls
	Object.entries(controls).forEach(([key, control]) => {
		// Iben: If there are no child controls, we update the value and validity of the control
		if (!control['controls'] && currentLevel.includes(key)) {
			console.log('I am a control and I am updating', key);
			control.updateValueAndValidity(options);
			return;
		}

		// Iben: If there are child controls, we recursively update the value and validity
		deepUpdateValueAndValidity(control['controls'], options, children);
	});
};

const getControlsToUpdate = (keys: string[]): [string[], string[]] => {
	// Iben: Separate the keys into two arrays, the ones we need to update on the current level of the form control, and the ones we'll have to pass to the children
	const currentLevel = [];
	const children = [];

	// Iben: Loop over the keys
	keys.forEach((key) => {
		if (key.includes('.')) {
			children.push(key.slice(key.indexOf('.') + 1));
		} else {
			currentLevel.push(key);
		}
	});

	return [currentLevel, children];
};
