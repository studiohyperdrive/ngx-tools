import { merge } from './merge.util';

describe('Merge', () => {
	type TestType = {
		hello: string;
		world?: string;
		test?: {
			message?: string;
			url?: string;
		};
	};

	it('should merge objects correctly', () => {
		expect(merge<TestType>({}, ['hello', 'world'])).toEqual({ hello: 'world' });

		expect(merge<TestType>({}, ['hello', 'world'], ['world', undefined])).toEqual({
			hello: 'world',
		});

		expect(merge<TestType>({}, ['hello', 'world'], ['world', null])).toEqual({
			hello: 'world',
		});

		expect(merge<TestType>({}, ['hello', 'world'], ['world', 'Earth'])).toEqual({
			hello: 'world',
			world: 'Earth',
		});

		expect(merge<TestType>({}, ['hello', 'world'], ['test', { message: undefined }])).toEqual({
			hello: 'world',
		});

		expect(
			merge<TestType>(
				{},
				['hello', 'world'],
				['test', { message: 'Like and subscribe!', url: 'youtube.com/@Iben' }]
			)
		).toEqual({
			hello: 'world',
			test: { message: 'Like and subscribe!', url: 'youtube.com/@Iben' },
		});
	});
});
