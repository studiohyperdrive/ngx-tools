import { FormControl, FormGroup } from '@angular/forms';

/**
 * Generates a NgxTable form based on a provided selectable key. If no key is provided, the form is based on the index instead
 *
 * @param form - The form provided by the table
 * @param data - The data provided by the table
 * @param selectableKey - An optional key that will be used to fetch the keys of the controls
 */
export const generateNgxTableForm = (
	form: FormGroup,
	data: unknown[],
	selectableKey?: string
): void => {
	// Iben: Early exit if the data is null or if no items were provided
	if (!data || data.length === 0) {
		return;
	}

	// Iben: If no selectable key was provided, we build a form based on the index
	if (!selectableKey) {
		return buildNgxTableForm(form, 'ngxTableIndex', data);
	}

	// Iben: If a selectable key was provided, we build a form based on the key
	return buildNgxTableForm(form, selectableKey, data);
};

/**
 * Builds the NgxTable form
 *
 * @param key - A key to determine whether we need to build the form based on the index or an actual key
 * @param data - The data provided by the table
 */
const buildNgxTableForm = (
	form: FormGroup,
	key: 'ngxTableIndex' | string,
	data: unknown[]
): void => {
	// Iben: Check if the selectableKey is unique, otherwise the form cannot be set correctly
	if (key !== 'ngxTableIndex') {
		const keys = new Set([...data].map((item) => item[key]));

		if (keys.size !== data.length) {
			console.error(
				'NgxTableComponent encountered a non unique selectableKey and can therefor not generate a FormGroup. Please provide a key with unique values.'
			);

			return;
		}
	}

	// Iben: Add a new control based on the index or on the provided key
	data.forEach((item, index) => {
		form.addControl(key === 'ngxTableIndex' ? `${index}` : item[key], new FormControl());
	});
};
