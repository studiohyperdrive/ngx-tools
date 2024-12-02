import { EntriesPipe } from './entries.pipe';

describe('EntriesPipe', () => {
	const pipe = new EntriesPipe();

	it('should map an object to a key-value array', () => {
		const test = {
			message: 'Like and subscribe!',
			url: 'youtube.com/@Iben',
		};

		expect(pipe.transform(test)).toEqual([
			['message', 'Like and subscribe!'],
			['url', 'youtube.com/@Iben'],
		]);
	});

	it('should map anything that is not an object to an empty array', () => {
		expect(pipe.transform(undefined as any)).toEqual([]);
		expect(pipe.transform(null as any)).toEqual([]);
		expect(pipe.transform('test' as any)).toEqual([]);
		expect(pipe.transform(['test'] as any)).toEqual([]);
		expect(pipe.transform(0 as any)).toEqual([]);
	});
});
