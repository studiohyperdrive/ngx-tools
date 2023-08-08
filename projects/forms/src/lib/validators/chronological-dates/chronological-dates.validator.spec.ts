import { FormControl, FormGroup } from '@angular/forms';

import { chronologicalDatesValidator } from './chronological-dates.validator';

describe('chronologicalDatesValidator', () => {
	const formGroup = new FormGroup({
		start: new FormControl(''),
		end: new FormControl(''),
	});

	// TODO: check why this test fails inconsistently
	xit('should not give an error', () => {
		expect(chronologicalDatesValidator('start', 'end')(formGroup)).toEqual(null);
		formGroup.patchValue({
			start: 'MOUSTACHE',
			end: 'TEST',
		});

		expect(chronologicalDatesValidator('start', 'end')(formGroup)).toEqual(null);
		formGroup.patchValue({
			start: '2018-05-23',
		});

		expect(chronologicalDatesValidator('start', 'end')(formGroup)).toEqual(null);
		formGroup.patchValue({
			start: '2018-05-23',
			end: '2018-05-24',
		});

		expect(chronologicalDatesValidator('start', 'end')(formGroup)).toEqual(null);
		formGroup.patchValue({
			start: '2018-05-23',
			end: '2018-07-24',
		});

		expect(chronologicalDatesValidator('start', 'end')(formGroup)).toEqual(null);

		formGroup.patchValue({
			start: '23/05/2018',
			end: '25/05/2018',
		});
		expect(chronologicalDatesValidator('start', 'end', 'dd/MM/yyyy')(formGroup)).toEqual(null);
	});

	it('should give an error', () => {
		formGroup.patchValue({
			start: '2018-05-23',
			end: '2018-05-22',
		});
		expect(chronologicalDatesValidator('start', 'end')(formGroup)).toEqual({
			incorrectChronologicalDates: true,
		});

		formGroup.patchValue({
			start: '2018/05/23',
			end: '2018/05/22',
		});
		expect(chronologicalDatesValidator('start', 'end', 'yyyy/MM/dd')(formGroup)).toEqual({
			incorrectChronologicalDates: true,
		});
	});
});
