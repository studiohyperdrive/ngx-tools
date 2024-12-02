import { NgxTableGetPipe } from './get.pipe';

describe('NgxTableGetPipe', () => {
	const pipe = new NgxTableGetPipe();
	const value = { test: 'snor', product: { id: 'test' } };

	it('should return an empty string if the value is not an object', () => {
		expect(pipe.transform(null, 'test')).toEqual('');
		expect(pipe.transform(undefined, 'test')).toEqual('');
		expect(pipe.transform(3, 'test')).toEqual('');
		expect(pipe.transform('test', 'test')).toEqual('');
		expect(pipe.transform([3], 'test')).toEqual('');
	});

	it('should return the value if no path was provided', () => {
		expect(pipe.transform(value, undefined)).toEqual(value);
	});

	it('should return the value of a property when a path is provided', () => {
		expect(pipe.transform(value, 'test')).toEqual('snor');
		expect(pipe.transform(value, 'product.id')).toEqual('test');
	});
});
