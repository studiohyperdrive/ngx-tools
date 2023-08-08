import { TransformPipe } from './transform.pipe';

describe('TransformPipe', () => {
	const pipe = new TransformPipe();

	it('should transform a value based on the provided transformer', () => {
		const test = 'Test';
		const lowerCase = (value: string) => {
			return value.toLocaleLowerCase();
		};

		expect(pipe.transform(test, lowerCase)).toEqual('test');
	});

	it('should return the base value if no transformer was provided', () => {
		const test = 'Test';

		expect(pipe.transform(test, undefined)).toEqual('Test');
		expect(pipe.transform(test, null)).toEqual('Test');
	});
});
