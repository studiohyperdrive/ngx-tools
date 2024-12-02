import { ArrayContainsOnePipe } from './array-contains-one.pipe';

describe('ArrayContainsPipe', () => {
	let pipe: ArrayContainsOnePipe;

	beforeEach(() => {
		pipe = new ArrayContainsOnePipe();
	});

	it('should return false if no values are provided', () => {
		expect(pipe.transform(null)).toBe(false);
	});

	it('should return false if values is not an array', () => {
		expect(pipe.transform('test' as any)).toBe(false);
		expect(pipe.transform(true as any)).toBe(false);
		expect(pipe.transform(123 as any)).toBe(false);
		expect(pipe.transform({} as any)).toBe(false);
	});

	it('should return false if no values are provided', () => {
		expect(
			pipe.transform(
				[{ title: 'This is the title', description: 'This is the description' }],
				null
			)
		).toBe(false);
	});

	it('should return false if values is not an array', () => {
		expect(
			pipe.transform(
				[{ title: 'This is the title', description: 'This is the description' }],
				'test' as any
			)
		).toBe(false);
		expect(
			pipe.transform(
				[{ title: 'This is the title', description: 'This is the description' }],
				true as any
			)
		).toBe(false);
		expect(
			pipe.transform(
				[{ title: 'This is the title', description: 'This is the description' }],
				123 as any
			)
		).toBe(false);
		expect(
			pipe.transform(
				[{ title: 'This is the title', description: 'This is the description' }],
				{} as any
			)
		).toBe(false);
	});

	it('should return false if no values were found', () => {
		expect(
			pipe.transform(
				[
					{ title: 'This is the title', description: 'This is the description' },
					{ description: 'This is the description' },
					{ title: 'This is the title' },
				],
				['action', 'label']
			)
		).toBe(false);
	});

	it('should return true if no values were found', () => {
		expect(
			pipe.transform(
				[
					{ title: 'This is the title', description: 'This is the description' },
					{ description: 'This is the description' },
					{ title: 'This is the title' },
				],
				['title', 'description']
			)
		).toBe(true);
	});
});
