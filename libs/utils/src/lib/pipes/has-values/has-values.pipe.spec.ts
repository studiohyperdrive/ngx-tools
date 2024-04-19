import { HasValuesPipe } from './has-values.pipe';

describe('HasValuesPipe', () => {
	const pipe = new HasValuesPipe();

	it('should return true if the object has values', () => {
		const test = {
			message: 'Like and subscribe!',
			url: 'youtube.com/@Iben',
		};

		expect(pipe.transform(test)).toBeTrue();
	});

	it('should return true if the object has no values', () => {
		const test = {
			message: undefined,
		};

		expect(pipe.transform(test)).toBeFalse();

		const testEmpty = {};

		expect(pipe.transform(testEmpty)).toBeFalse();
	});

	it('should return false in case the provided value is not an object', () => {
		expect(pipe.transform(undefined)).toBeFalse();
		expect(pipe.transform(null)).toBeFalse();
		expect(pipe.transform('test' as any)).toBeFalse();
		expect(pipe.transform(['test'] as any)).toBeFalse();
		expect(pipe.transform(0 as any)).toBeFalse();
	});
});
