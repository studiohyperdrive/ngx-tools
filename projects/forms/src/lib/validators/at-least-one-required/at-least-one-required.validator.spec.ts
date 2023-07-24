import { FormControl, FormGroup } from '@angular/forms';

import { atLeastOneRequiredValidator } from './at-least-one-required.validator';

describe('atLeastOneRequiredValidator', () => {
	let form: FormGroup;
	let formWithKeys: FormGroup;
	let formWithKeysAndMatchFunction: FormGroup;
	beforeEach(() => {
		form = new FormGroup(
			{
				a: new FormControl(''),
				b: new FormControl(''),
				c: new FormControl(''),
			},
			atLeastOneRequiredValidator()
		);

		formWithKeys = new FormGroup(
			{
				a: new FormControl(''),
				b: new FormControl(''),
				c: new FormControl(''),
			},
			atLeastOneRequiredValidator({ controls: ['b', 'c'] })
		);

		formWithKeysAndMatchFunction = new FormGroup(
			{
				a: new FormControl(''),
				b: new FormControl(''),
				c: new FormControl(''),
			},
			atLeastOneRequiredValidator({
				controls: ['b', 'c'],
				conditionalFunction: (value) => value.a,
			})
		);
	});

	it('should not give an error', () => {
		form.patchValue({
			a: true,
		});
		expect(form.valid).toEqual(true);

		formWithKeys.patchValue({
			b: true,
		});
		expect(formWithKeys.valid).toEqual(true);

		formWithKeysAndMatchFunction.patchValue({
			a: true,
			b: true,
		});
		expect(formWithKeysAndMatchFunction.valid).toEqual(true);

		formWithKeysAndMatchFunction.reset();
		expect(formWithKeysAndMatchFunction.valid).toEqual(true);
	});

	it('should give an error', () => {
		expect(form.errors).toEqual({ atLeastOneRequiredError: true });
		expect(form.get('a').errors).toEqual({ required: true });
		expect(form.get('c').errors).toEqual({ required: true });
		expect(form.get('b').errors).toEqual({ required: true });

		expect(formWithKeys.errors).toEqual({ atLeastOneRequiredError: true });
		expect(formWithKeys.get('c').errors).toEqual({ required: true });
		expect(formWithKeys.get('b').errors).toEqual({ required: true });

		formWithKeysAndMatchFunction.patchValue({
			a: true,
		});
		expect(formWithKeysAndMatchFunction.errors).toEqual({
			atLeastOneRequiredError: true,
		});
		expect(formWithKeysAndMatchFunction.get('c').errors).toEqual({
			required: true,
		});
		expect(formWithKeysAndMatchFunction.get('b').errors).toEqual({
			required: true,
		});
	});
});
