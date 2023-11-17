import { FormControl, FormGroup } from '@angular/forms';

/**
 * Resets the NgxTable form if new data is provided, so new controls can be added to the form
 *
 * @param currentForm - The form we wish to mutate
 * @param data - The provided data in the table
 * @param selectableKey - Optional selectable key
 * @param resetFormOnNewData - Whether we wish to reset the form when new data was provided
 */
export const resetNgxTableForm = (
	currentForm: FormGroup,
	data: unknown[],
	selectableKey?: string,
	resetFormOnNewData?: boolean
): void => {
	// Iben: If no selectableKey was provided but resetFormOnNewData is false, we throw an error. This is because then the form is index based, and it cannot be reset
	if (!resetFormOnNewData && !selectableKey) {
		console.error(
			'NgxTableComponent cannot keep the current form data if no selectableKey was provided, as the keys of the FormGroup are index based. Provide a selectableKey in order for the table to correctly function.'
		);

		return;
	}

	// Iben: If no selectableKey was passed, we assume that we're in the index based form and we can remove all current controls
	if (!selectableKey) {
		// Iben: Loop over the current form and remove all controls
		Object.keys(currentForm.controls || []).forEach((control) => {
			currentForm.removeControl(control, { emitEvent: false });
		});

		// Iben: Loop over data and create the new controls
		data.forEach((_, index) => {
			currentForm.addControl(`${index}`, new FormControl(), {
				emitEvent: false,
			});
		});

		return;
	}

	// Iben: If we can reset the form we remove all controls of the form and add new
	if (resetFormOnNewData) {
		// Iben: Loop over the current form and remove all controls
		Object.keys(currentForm.controls || []).forEach((control) => {
			currentForm.removeControl(control, { emitEvent: false });
		});

		// Iben: Loop over data and create the new controls
		data.forEach((item) => {
			currentForm.addControl(item[selectableKey], new FormControl(), {
				emitEvent: false,
			});
		});

		return;
	}

	// Iben If we cannot reset the form, we add new controls for each new data entry point

	// Iben:We start by grabbing all the current keys so we can see which ones need to be added
	const keys = new Set(Object.keys(currentForm.controls) || []);

	// Iben: Add new controls for the keys that do not exist yet
	[...data].forEach((item) => {
		if (!keys.has(item[selectableKey])) {
			currentForm.addControl(item[selectableKey], new FormControl(), {
				emitEvent: false,
			});
		}
	});
};
