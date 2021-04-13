import { FormControl, FormGroup } from '@angular/forms';

import { Validators } from './validators';

describe('Extended Email Validator', () => {
	it('should throw an error if e-mail is not valid', () => {
		const control1 = new FormControl('test');
		const control2 = new FormControl('test@test');

		expect(Validators.extendedEmail(control1)).toEqual({ extendedEmail: true });
		expect(Validators.extendedEmail(control2)).toEqual({ extendedEmail: true });
	});

	it('should not throw an error if e-mail is valid', () => {
		const control1 = new FormControl(''); // Should be valid, use Validators.required for this
		const control2 = new FormControl('test@test.be');

		expect(Validators.extendedEmail(control1)).toBeNull();
		expect(Validators.extendedEmail(control2)).toBeNull();
	});

	it('should work as validator in a reactive form', () => {
		const form = new FormGroup({
			email1: new FormControl('', [Validators.extendedEmail]),
			email2: new FormControl('', [Validators.extendedEmail]),
		});

		form.get('email1').setValue('test@test');
		form.get('email2').setValue('test@test.be');

		expect(form.get('email1').errors).toEqual({ extendedEmail: true });
		expect(form.get('email2').errors).toBeNull();
	});
});
