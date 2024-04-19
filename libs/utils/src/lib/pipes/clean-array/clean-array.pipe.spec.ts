import { CleanArrayPipe } from './clean-array.pipe';

describe('CleanArrayPipe', () => {
	const pipe = new CleanArrayPipe();
	const allFalsyValues: any[] = [false, undefined, null, 0, '', NaN];

	it('should remove all falsy values when no exceptions are provided', () => {
		expect(pipe.transform(allFalsyValues)).toEqual([]);
	});

	it('should keep all falsy values provided in the exceptions array', () => {
		expect(pipe.transform(allFalsyValues, [false, NaN])).toEqual([false, NaN]);
		expect(pipe.transform(allFalsyValues, allFalsyValues)).toEqual(allFalsyValues);
		expect(pipe.transform(allFalsyValues, [])).toEqual([]);
	});

	it('should ignore exception values that do not match the provided array', () => {
		expect(pipe.transform([], [false, NaN])).toEqual([]);
		expect(pipe.transform([], allFalsyValues)).toEqual([]);
		expect(pipe.transform([], ['a', true, {}, [], 1])).toEqual([]);
	});

	it('should pass with a combination of truthy and falsy values', () => {
		expect(pipe.transform([0, 'a', undefined, {}, false], [false, undefined])).toEqual([
			'a',
			undefined,
			{},
			false,
		]);
	});
});
