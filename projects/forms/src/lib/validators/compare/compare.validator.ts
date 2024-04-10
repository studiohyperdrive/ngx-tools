import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

import { clearFormError, setFormError } from '../utils';

/**
 * CompareValidator
 *
 * The CompareValidator will return a validator that compares the values of two FormControls
 * within a FormGroup based on a given comparator function.
 *
 * Note: This validator will only set an error on the group it is set to
 * unless the `setErrorOnKey` argument is given.
 *
 * @param keys {string[]}
 * @param comparatorFn {(...args: ValueType[]) => boolean}
 * @param setErrorOnKey {string}
 * @returns {(group: FormGroup<{ [key: string]: FormControl<ValueType>; }>) => ValidationErrors}
 */
export const CompareValidator = <ValueType = unknown>(
	keys: string[],
	comparatorFn: (...args: ValueType[]) => boolean,
	setErrorOnKey?: string
): ((
	group: FormGroup<{
		[key: string]: FormControl<ValueType>;
	}>
) => ValidationErrors) => {
	return (
		group: FormGroup<{
			[key: string]: FormControl<ValueType>;
		}>
	): ValidationErrors => {
		// Denis: map the values to an array:
		const values: ValueType[] = keys.map((key: string) => group?.get(key).getRawValue());
		const setErrorOnKeyControl = group?.get(setErrorOnKey);

		// Denis: check if any of the keys contains an undefined or null value:
		if (values.some((value: ValueType) => typeof value === 'undefined' || value === null)) {
			setErrorOnKeyControl && clearFormError(group.get(setErrorOnKey), 'compareError');

			return null;
		}

		if (comparatorFn(...values)) {
			setErrorOnKeyControl && setFormError(group.get(setErrorOnKey), 'compareError');

			return {
				compareError: true,
			};
		}

		setErrorOnKeyControl && clearFormError(group.get(setErrorOnKey), 'compareError');

		return null;
	};
};
