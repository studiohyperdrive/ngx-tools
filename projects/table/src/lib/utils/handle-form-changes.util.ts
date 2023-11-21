import { FormGroup } from '@angular/forms';

/**
 * Handles the writeValue value of an NgxTableComponent form
 *
 * @param value - The value we wish to convert
 * @param selectableKey - An optional key that is used to fetch the value
 */
export const writeNgxTableValue = (
	value: string[],
	selectableKey?: string
): Record<string, boolean> => {
	// Iben: Early exit if the value is empty or not an array
	if (!Array.isArray(value) || value.length === 0) {
		return {};
	}

	// Iben: Create group value to patch
	return [...value].reduce((previousValue, selectedValue, index) => {
		// Iben: If a selectableKey is provided, we use the value as the key, otherwise we use the index
		const key = selectableKey ? selectedValue : index;

		return {
			...previousValue,
			[key]: true,
		};
	}, {});
};

/**
 * Get for every control in the group a record with the value `true`.
 *
 * @param data The formGroup whose controls will be used.
 * @returns A record with the key of the controls as key with the value `true`.
 */
export const handleNgxTableHeaderValueChanges = (data: FormGroup): Record<string, true> => {
	return Object.keys(data.controls || []).reduce(
		(previousValues, currentValue) => ({
			...previousValues,
			[currentValue]: true,
		}),
		{}
	);
};

/**
 * Handles the value changes of a NgxTableComponent form
 *
 * @param value - The value of the form
 */
export const handleNgxTableValueChanges = (value: Record<string, boolean>): string[] => {
	const result = [];

	// Iben: Foreach over the entries as a map and a filter would mean two loops instead of one
	Object.entries(value || {}).forEach(([key, isSelected]) => {
		if (isSelected) {
			result.push(key);
		}
	});

	return result;
};
