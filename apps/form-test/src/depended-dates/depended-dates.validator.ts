import { FormGroup, ValidationErrors } from '@angular/forms';
import { clearFormError, setFormError } from 'projects/forms/src/public-api';

export const DependedDatesValidator = (form: FormGroup<any>): ValidationErrors | null => {
	// Wouter: Get the values of the form.
	const values: any = form.getRawValue();
	const error: ValidationErrors = {
		dependedDates: true,
	};

	clearFormError(form.get('world.start'), 'dependedDates');

	if (!Boolean(values.hello.start) || !Boolean(values.world.start)) {
		return null;
	}

	if (values.hello.start > values.world.start) {
		setFormError(form.get('world.start'), 'dependedDates');

		return error;
	}

	return null;
};
