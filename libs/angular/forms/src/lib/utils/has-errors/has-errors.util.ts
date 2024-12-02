import { AbstractControl } from '@angular/forms';

/**
 * Recursively checks if a form and its possible children have an error
 *
 * @param  control - The provided abstract control
 */
export const hasErrors = (control: AbstractControl): boolean => {
	// Iben: If the form has no children we just return the state of the current form
	if (!control['controls']) {
		return control.invalid;
	}

	// Iben: If the form has children, we check if some of the child controls have errors
	const controls = control['controls'];

	return (Array.isArray(controls) ? controls : Object.values(controls)).some((control) =>
		hasErrors(control)
	);
};
