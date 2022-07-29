import { FormControl, FormGroup } from '@angular/forms';

import { allOrNothingRequiredValidator } from './all-or-nothing-required.validator';

describe('allOrNothingRequiredValidator', () => {
	let form: FormGroup;
	beforeEach(() => {
		form = new FormGroup(
			{
				a: new FormControl(''),
				b: new FormControl(''),
				c: new FormControl(''),
			},
			allOrNothingRequiredValidator
		);
	});

	it('should not give an error', () => {
		expect(form.valid).toEqual(true);

		form.patchValue({
			a: true,
			b: 'It',
			c: 'works',
		});

		expect(form.valid).toEqual(true);
	});

	it('should give an error', () => {
		form.patchValue({ a: true });
		expect(form.valid).toEqual(false);
		expect(form.get('b').valid).toEqual(false);
		expect(form.get('c').valid).toEqual(false);
		expect(form.errors).toEqual({ allOrNothingRequiredError: ['b', 'c'] });
		expect(form.get('c').errors).toEqual({ required: true });
		expect(form.get('b').errors).toEqual({ required: true });
	});
});
