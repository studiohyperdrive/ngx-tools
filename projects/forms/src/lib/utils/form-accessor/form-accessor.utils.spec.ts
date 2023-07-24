import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { handleFormAccessorControlDisabling } from './form-accessor.utils';

describe('handleFormAccessorControlDisabling', () => {
	describe('FormControl', () => {
		let control: FormControl;

		beforeEach(() => {
			control = new FormControl();
		});

		it('should disable the formControl when the self property is passed along', () => {
			handleFormAccessorControlDisabling(control, new Set(['formAccessorSelf']), true);

			expect(control.disabled).toBeTrue();
		});

		it('should enable the formControl when no key is passed along', () => {
			handleFormAccessorControlDisabling(control, new Set([]), true);

			expect(control.disabled).toBeFalse();
		});
	});

	describe('FormArray', () => {
		let control: FormArray;

		beforeEach(() => {
			control = new FormArray([]);
		});

		it('should disable the formArray when the self property is passed along', () => {
			handleFormAccessorControlDisabling(control, new Set(['formAccessorSelf']), true);

			expect(control.disabled).toBeTrue();
		});

		it('should enable the formArray when no key is passed along', () => {
			handleFormAccessorControlDisabling(control, new Set([]), true);

			expect(control.disabled).toBeFalse();
		});
	});
	describe('FormGroup', () => {
		let control: FormGroup;

		beforeEach(() => {
			control = new FormGroup({
				moustache: new FormControl(),
				wax: new FormControl(),
			});
		});

		it('should disable the formControl when the self property is passed along', () => {
			handleFormAccessorControlDisabling(control, new Set(['moustache']), true);

			expect(control.get('moustache').disabled).toBeTrue();
			expect(control.get('wax').disabled).toBeFalse();
		});

		it('should enable the formControl when no key is passed along', () => {
			handleFormAccessorControlDisabling(control, new Set([]), true);

			expect(control.get('moustache').disabled).toBeFalse();
			expect(control.get('wax').disabled).toBeFalse();
		});
	});
});
