import { getKeyByValue } from './get-key-by-value.util';

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('getKeyByValue', () => {
	it('should early return when the given value is evaluated as falsy', () => {
		expect(getKeyByValue(0 as any, 'test')).toBeUndefined();
		expect(getKeyByValue('' as any, 'test')).toBeUndefined();
		expect(getKeyByValue(false as any, 'test')).toBeUndefined();
		expect(getKeyByValue(null, 'test')).toBeUndefined();
		expect(getKeyByValue(undefined, 'test')).toBeUndefined();
	});

	it('should return when te given object is empty', () => {
		// Denis: this helper could work with an array, but using it like this will result in TS errors.
		expect(getKeyByValue([] as any, 'test')).toBeUndefined();
		expect(getKeyByValue({}, 'test')).toBeUndefined();
	});

	it('should return the key for the provided value', () => {
		expect(
			getKeyByValue(
				{
					testProp: 'my-value',
				},
				'my-value'
			)
		).toBe('testProp');
	});
});
