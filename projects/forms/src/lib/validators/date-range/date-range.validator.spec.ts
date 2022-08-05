import { FormControl } from '@angular/forms';

import { dateRangeValidator } from './date-range.validator';

describe('DateRangeValidator', () => {
	describe('Valid min and max dates', () => {
		const validator = dateRangeValidator('2019-01-01', '2019-01-05');

		it('should not give an error', () => {
			expect(validator(new FormControl('2019-01-01'))).toBe(null);
			expect(validator(new FormControl('2019-01-02'))).toBe(null);
			expect(validator(new FormControl('2019-01-04'))).toBe(null);
		});

		it('should give an error', () => {
			expect(validator(new FormControl('2018-12-31'))).toEqual({
				invalidRange: 'dateBeforeMinDate',
			});
			expect(validator(new FormControl('2019-01-06'))).toEqual({
				invalidRange: 'dateAfterMaxDate',
			});
		});
	});
	describe('Invalid min and max dates', () => {
		it('should give an invalid maxDate error', () => {
			const validator = dateRangeValidator('2019-01-01', 'MOUSTACHE');

			expect(validator(new FormControl('2018-12-31'))).toEqual({
				invalidRange: 'invalidMaxDate',
			});
		});

		it('should give an invalid minDate error', () => {
			const validator = dateRangeValidator('MOUSTACHE', '2019-01-05');

			expect(validator(new FormControl('2019-01-06'))).toEqual({
				invalidRange: 'invalidMinDate',
			});
		});
	});
});
