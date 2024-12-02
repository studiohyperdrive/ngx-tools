import { FormControl, FormGroup } from '@angular/forms';

import { dependedRequiredValidator } from './depended-required.validator';

describe('DependedRequiredValidator', () => {
	let form: FormGroup;
	let formWithMatchValue: FormGroup;
	let shouldBeTest;
	beforeEach(() => {
		shouldBeTest = (value: any) => {
			return value === 'TEST';
		};

		form = new FormGroup(
			{
				a: new FormControl(''),
				b: new FormControl(''),
				c: new FormControl(''),
			},
			dependedRequiredValidator(['b', 'c'], 'a')
		);

		formWithMatchValue = new FormGroup(
			{
				a: new FormControl(''),
				b: new FormControl(''),
				c: new FormControl(''),
			},
			dependedRequiredValidator(['b', 'c'], 'a', shouldBeTest)
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

		form.patchValue({
			a: false,
			b: 'It',
			c: 'works',
		});

		expect(form.valid).toEqual(true);

		form.patchValue({
			a: 0,
			b: 'It',
			c: 'works',
		});

		expect(form.valid).toEqual(true);

		formWithMatchValue.patchValue({
			a: 'TEST',
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
		expect(form.errors).toEqual({ hasDependedRequiredError: ['b', 'c'] });
		expect(form.get('c').errors).toEqual({ required: true });
		expect(form.get('b').errors).toEqual({ required: true });

		form.patchValue({ a: false });
		expect(form.valid).toEqual(false);
		expect(form.get('b').valid).toEqual(false);
		expect(form.get('c').valid).toEqual(false);
		expect(form.errors).toEqual({ hasDependedRequiredError: ['b', 'c'] });
		expect(form.get('c').errors).toEqual({ required: true });
		expect(form.get('b').errors).toEqual({ required: true });

		form.patchValue({ a: 0 });
		expect(form.valid).toEqual(false);
		expect(form.get('b').valid).toEqual(false);
		expect(form.get('c').valid).toEqual(false);
		expect(form.errors).toEqual({ hasDependedRequiredError: ['b', 'c'] });
		expect(form.get('c').errors).toEqual({ required: true });
		expect(form.get('b').errors).toEqual({ required: true });

		formWithMatchValue.patchValue({ a: 'TEST' });
		expect(formWithMatchValue.valid).toEqual(false);
		expect(formWithMatchValue.get('b').valid).toEqual(false);
		expect(formWithMatchValue.get('c').valid).toEqual(false);
		expect(formWithMatchValue.errors).toEqual({
			hasDependedRequiredError: ['b', 'c'],
		});
		expect(formWithMatchValue.get('c').errors).toEqual({ required: true });
		expect(formWithMatchValue.get('b').errors).toEqual({ required: true });
	});
});
