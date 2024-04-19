import { MergeArraysPipe } from './merge-arrays.pipe';

describe('mergeArrays', () => {
	const pipe: MergeArraysPipe = new MergeArraysPipe();

	describe('transform', () => {
		it('should return an empty array when the source is an invalid array', () => {
			expect(pipe.transform(undefined)).toEqual([]);
			expect(pipe.transform(null)).toEqual([]);
			expect(pipe.transform(true as any)).toEqual([]);
			expect(pipe.transform(2 as any)).toEqual([]);
			expect(pipe.transform('test' as any)).toEqual([]);
			expect(pipe.transform({ something: 'else' } as any)).toEqual([]);
		});

		it('should return the source array without further operators with no additional arguments provided', () => {
			const result = pipe.transform(['a', 'b', 'c']);

			expect(result).toEqual(['a', 'b', 'c']);
		});

		it('should return the source array with additional arrays', () => {
			const result = pipe.transform(['a', 'b', 'c'], [1, 2, 3], ['z', 'y', 'x']);

			expect(result).toEqual(['a', 'b', 'c', 1, 2, 3, 'z', 'y', 'x']);
		});

		it('should return the source array with additional arrays where some are undefined or null', () => {
			const result = pipe.transform(['a', 'b', 'c'], undefined, ['z', 'y', 'x'], null);

			expect(result).toEqual(['a', 'b', 'c', 'z', 'y', 'x']);
		});
	});
});
