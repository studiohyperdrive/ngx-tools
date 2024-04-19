// Iben: This implementation is from https://github.com/nglrx/pipes/blob/master/packages/pipes/src/lib/array/join/join.pipe.ts
// The package is no longer supported and is not compatible with more recent versions of Angular

import { JoinPipe } from './join.pipe';

describe('JoinPipe', () => {
	let pipe: JoinPipe;

	beforeEach(() => {
		pipe = new JoinPipe();
	});

	it(`should create an instance`, () => {
		expect(pipe).toBeTruthy();
	});

	it(`should join an array using default separator`, () => {
		expect(pipe.transform(['a', 'b', 'c', 'd', 'e'])).toEqual('a,b,c,d,e');
	});

	it(`should join an array using a given separator`, () => {
		expect(pipe.transform(['a', 'b', 'c', 'd', 'e'], ' - ')).toEqual('a - b - c - d - e');
	});

	it(`should join an array with undefined, null or empty values`, () => {
		expect(pipe.transform(['a', undefined, null, '', 'e'])).toEqual('a,,,,e');
	});

	it(`should return empty string for an empty array`, () => {
		expect(pipe.transform([])).toEqual('');
	});

	it(`should be null safe`, () => {
		expect(pipe.transform(null)).toBeNull();
	});
});
