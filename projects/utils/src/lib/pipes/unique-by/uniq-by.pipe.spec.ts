import { UniqByPipe } from './uniq-by.pipe';

describe('UniqByPipe', () => {
	const pipe = new UniqByPipe();

	it('should execute the lodash uniqBy function on the provided array', () => {
		const testArray = [
			{
				prop1: 'a',
				prop2: true,
			},
			{
				prop1: 'a',
				prop2: false,
			},
			{
				prop1: 'b',
				prop2: true,
			},
		];

		expect(pipe.transform(testArray, 'prop1')).toEqual([
			{
				prop1: 'a',
				prop2: true,
			},
			{
				prop1: 'b',
				prop2: true,
			},
		]);
	});

	it('should handle an empty array', () => {
		expect(pipe.transform([], 'prop')).toEqual([]);
	});

	it('should map anything that is not an array to an empty array', () => {
		expect(pipe.transform(undefined, 'prop')).toEqual([]);
		expect(pipe.transform(null, 'prop')).toEqual([]);
		expect(pipe.transform('test' as any, 'prop')).toEqual([]);
		expect(pipe.transform(0 as any, 'prop')).toEqual([]);
		expect(pipe.transform({ test: 'test' } as any, 'prop')).toEqual([]);
	});
});
