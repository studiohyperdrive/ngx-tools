import { FormControl } from '@angular/forms';

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
});
