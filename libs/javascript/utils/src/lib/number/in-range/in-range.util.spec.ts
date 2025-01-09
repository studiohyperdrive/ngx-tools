import { inRange } from './in-range.util';

test('inRange', () => {
	expect(inRange(3, 1, 10)).toEqual(true);
	expect(inRange(3, 10)).toEqual(true);
	expect(inRange(3, 10, undefined)).toEqual(true);
	expect(inRange(3, 10, 1)).toEqual(true);

	expect(inRange(30, 1, 10)).toEqual(false);
	expect(inRange(30, 1)).toEqual(false);
	expect(inRange(30, 1, undefined)).toEqual(false);
	expect(inRange(30, 10, 1)).toEqual(false);
});
