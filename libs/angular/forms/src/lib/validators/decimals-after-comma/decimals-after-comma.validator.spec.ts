import { FormControl } from '@angular/forms';

import { decimalsAfterCommaValidator } from './decimals-after-comma.validator';

describe('decimalsAfterCommaValidator', () => {
	it('should not give an error', () => {
		expect(decimalsAfterCommaValidator(2)(new FormControl(''))).toEqual(null);
		expect(decimalsAfterCommaValidator(2)(new FormControl(null))).toEqual(null);
		expect(decimalsAfterCommaValidator(2)(new FormControl(undefined))).toEqual(null);
		expect(decimalsAfterCommaValidator(2)(new FormControl(3))).toEqual(null);
		expect(decimalsAfterCommaValidator(2)(new FormControl(0.5))).toEqual(null);
		expect(decimalsAfterCommaValidator(2)(new FormControl(0.51))).toEqual(null);
		expect(decimalsAfterCommaValidator(2)(new FormControl(3044454445.22))).toEqual(null);
		expect(decimalsAfterCommaValidator(3)(new FormControl(0.544))).toEqual(null);
	});

	it('should give an error', () => {
		expect(decimalsAfterCommaValidator(2)(new FormControl(0.51555))).toEqual({
			invalidDecimalsAfterComma: true,
		});
		expect(decimalsAfterCommaValidator(1)(new FormControl(3044454445.22))).toEqual({
			invalidDecimalsAfterComma: true,
		});
		expect(decimalsAfterCommaValidator(2)(new FormControl(0.544))).toEqual({
			invalidDecimalsAfterComma: true,
		});
	});
});
