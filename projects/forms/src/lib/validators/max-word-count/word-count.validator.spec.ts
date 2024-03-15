import { FormControl } from '@angular/forms';

import { WordCountValidator } from './word-count.validator';

describe('WordCountValidator', () => {
	it('should not give an error when no min and max are provided', () => {
		expect(WordCountValidator({})(new FormControl('These'))).toBeNull();
	});

	it('should not give an error when no value is provided', () => {
		expect(WordCountValidator({ max: 3 })(new FormControl(null))).toBeNull();
		expect(WordCountValidator({ max: 3 })(new FormControl(undefined))).toBeNull();
		expect(WordCountValidator({ max: 3 })(new FormControl(0))).toBeNull();
		expect(WordCountValidator({ max: 3 })(new FormControl(1))).toBeNull();
		expect(WordCountValidator({ max: 3 })(new FormControl(false))).toBeNull();
		expect(WordCountValidator({ max: 3 })(new FormControl(true))).toBeNull();
		expect(WordCountValidator({ max: 3 })(new FormControl([]))).toBeNull();
		expect(WordCountValidator({ max: 3 })(new FormControl({}))).toBeNull();
	});

	it('should not give an error when the value is a string that does not exceed the maximum word count', () => {
		expect(WordCountValidator({ max: 3 })(new FormControl('These'))).toBeNull();
		expect(WordCountValidator({ max: 3 })(new FormControl('These Words'))).toBeNull();
		expect(WordCountValidator({ max: 3 })(new FormControl('These Words Count'))).toBeNull();
	});

	it('should trim the spaces before and after the provided string', () => {
		expect(WordCountValidator({ min: 2 })(new FormControl(' These Words Count '))).toBeNull();
		expect(WordCountValidator({ max: 3 })(new FormControl(' These Words Count '))).toBeNull();
	});

	it('should give an error when the value is a string that does exceed the maximum word count', () => {
		expect(WordCountValidator({ max: 3 })(new FormControl('These Words Do Not'))).toEqual({
			maxWordCountReached: { valid: false },
		});
	});

	it('should give an error when the value is a string that does not exceed the minimum word count', () => {
		expect(WordCountValidator({ min: 5 })(new FormControl('These Words Do Not'))).toEqual({
			minWordCountNotReached: { valid: false },
		});
	});
});
