import { ToArrayPipe } from './to-array.pipe';

describe('toArray', () => {
	describe('transform', () => {
		it('should return an empty array when the given value is undefined or null', () => {
			const pipe = new ToArrayPipe();

			expect(pipe.transform(undefined)).toEqual([]);
			expect(pipe.transform(null)).toEqual([]);
		});

		it('should return the original array when an array is given', () => {
			const pipe = new ToArrayPipe();
			const array = ['test1', 0, true];

			// Denis: toBe check to check on reference to see if the same array is returned.
			expect(pipe.transform(array)).toBe(array);
			expect(pipe.transform(array)).toEqual(array);
		});

		it('should return the original array when an array is given', () => {
			const pipe = new ToArrayPipe();
			const value = 'test1';

			expect(pipe.transform(value)).toEqual([value]);
		});
	});
});
