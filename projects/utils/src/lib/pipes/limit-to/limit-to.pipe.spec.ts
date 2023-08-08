import { LimitToPipe } from './limit-to.pipe';

describe('LimitToPipe', () => {
	const pipe = new LimitToPipe();

	it('should limit an array based on the provided number', () => {
		const test = ['a', 'b', 'c'];

		expect(pipe.transform(test, 2)).toEqual(['a', 'b']);
	});

	it('should map anything that is not an array to an empty array', () => {
		expect(pipe.transform(undefined, 2)).toEqual([]);
		expect(pipe.transform(null, 2)).toEqual([]);
		expect(pipe.transform('test' as any, 2)).toEqual([]);
		expect(pipe.transform(0 as any, 2)).toEqual([]);
		expect(pipe.transform({ test: 'test' } as any, 2)).toEqual([]);
	});
});
