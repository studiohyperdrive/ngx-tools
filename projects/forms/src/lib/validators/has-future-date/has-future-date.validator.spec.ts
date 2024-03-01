import { FormControl } from '@angular/forms';
import { hasFutureDateValidator } from './has-future-date.validator';

describe('hasFutureDateValidator', () => {
	let control: FormControl;

	beforeEach(() => {
		control = new FormControl(null, hasFutureDateValidator());
	});

	it('should return null when the date is in the past', () => {
		control.setValue('2022-01-01');
		expect(control.errors).toBeNull();
	});

	it('should return null when the date is today', () => {
		const currentDate = new Date();
		const formattedDate = currentDate.toISOString().substring(0, 10);
		control.setValue(formattedDate);
		expect(control.errors).toBeNull();
	});

	it('should return an error when the date is in the future', () => {
		const futureDate = new Date();
		futureDate.setDate(futureDate.getDate() + 1);
		const formattedDate = futureDate.toISOString().substring(0, 10);
		control.setValue(formattedDate);
		expect(control.errors).toEqual({ invalidDate: { valid: false } });
	});

	it('should return null when the control value is empty', () => {
		control.setValue('');
		expect(control.errors).toBeNull();
	});

	it('should return null when the control value is undefined', () => {
		control.setValue(undefined);
		expect(control.errors).toBeNull();
	});

	it('should return null when the control value is null', () => {
		control.setValue(null);
		expect(control.errors).toBeNull();
	});
});
