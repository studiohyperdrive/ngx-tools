import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * WordCountValidator
 *
 * The WordCountValidator validator will check the amount of words provided in a control.
 *
 * @param .min
 * @param .max
 * @returns ValidatorFn
 */
export const WordCountValidator = ({ min, max }: { min?: number; max?: number }): ValidatorFn => {
	return (control: FormControl): ValidationErrors | null => {
		if (
			typeof control?.value !== 'string' ||
			(typeof min !== 'number' && typeof max !== 'number')
		) {
			return null;
		}

		const wordCount = control.value.trim().split(' ').length;

		if (typeof min === 'number' && wordCount <= min) {
			return { minWordCountNotReached: { valid: false } };
		}

		if (typeof max === 'number' && wordCount > max) {
			return { maxWordCountReached: { valid: false } };
		}

		return null;
	};
};
