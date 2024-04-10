import { FormControl, FormGroup } from '@angular/forms';

import { CompareValidator } from './compare.validator';

describe('CompareValidator', () => {
	describe('without setErrorOnKey', () => {
		let form: FormGroup;
		beforeEach(() => {
			form = new FormGroup(
				{
					controlA: new FormControl<number>(null),
					controlB: new FormControl<number>(null),
				},
				[
					CompareValidator<number>(
						['controlA', 'controlB'],
						(a: number, b: number) => a > b
					),
				]
			);
		});

		it('should not give an error on a valid comparison', () => {
			form.patchValue({
				controlA: 5,
				controlB: 6,
			});

			expect(form.getError('compareError')).toBe(null);
			expect(form.get('controlA').getError('compareError')).toBe(null);
			expect(form.get('controlB').getError('compareError')).toBe(null);
		});

		it('should give an error on an invalid comparison', () => {
			form.patchValue({
				controlA: 6,
				controlB: 5,
			});

			expect(form.getError('compareError')).toBeTrue();
			expect(form.get('controlA').getError('compareError')).toBe(null);
			expect(form.get('controlB').getError('compareError')).toBe(null);
		});
	});

	describe('with setErrorOnKey', () => {
		let form: FormGroup;
		beforeEach(() => {
			form = new FormGroup(
				{
					controlA: new FormControl<number>(null),
					controlB: new FormControl<number>(null),
				},
				[
					CompareValidator<number>(
						['controlA', 'controlB'],
						(a: number, b: number) => a > b,
						'controlA'
					),
				]
			);
		});

		it('should not give an error on a valid comparison', () => {
			form.patchValue({
				controlA: 5,
				controlB: 6,
			});

			expect(form.getError('compareError')).toBe(null);
			expect(form.get('controlA').getError('compareError')).toBe(null);
			expect(form.get('controlB').getError('compareError')).toBe(null);
		});

		it('should give an error on an invalid comparison', () => {
			form.patchValue({
				controlA: 6,
				controlB: 5,
			});

			expect(form.getError('compareError')).toBeTrue();
			expect(form.get('controlA').getError('compareError')).toBeTrue();
			expect(form.get('controlB').getError('compareError')).toBe(null);
		});
	});
});
