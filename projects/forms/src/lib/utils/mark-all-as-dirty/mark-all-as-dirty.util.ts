import { AbstractControl } from '@angular/forms';

import { FormStateOptionsEntity } from '../../interfaces';

/**
 * Allows for a deep markAsDirty of all controls. Can be used for a FormGroup or a FormArray
 *
 * @param controls - The controls we wish to update the value and validity of
 * @param onlySelf - Whether or not we want it to be only the control itself and not the direct ancestors. Default this is true
 */
export const markAllAsDirty = (
	controls: Record<string, AbstractControl> | AbstractControl[],
	options: FormStateOptionsEntity = {}
) => {
	// Iben: We loop over all controls
	(Array.isArray(controls) ? controls : Object.values(controls)).forEach((control) => {
		// Iben: If there are no child controls, we update the value and validity of the control
		if (!control['controls']) {
			control.markAsDirty(options);
			return;
		}

		// Iben: If there are child controls, we recursively update the value and validity
		markAllAsDirty(control['controls'], options);
	});
};
