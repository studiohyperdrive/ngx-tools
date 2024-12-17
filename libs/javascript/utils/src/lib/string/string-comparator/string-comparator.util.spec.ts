import { stringComparator } from './string-comparator.util';

describe('stringComparator', () => {
	it('should compare two strings', () => {
		expect(stringComparator('a', 'b')).toBe(-1);
		expect(stringComparator('a', 'a')).toBe(0);
		expect(stringComparator('b', 'a')).toBe(1);
	});

	it('should compare a strings to the property of an object', () => {
		expect(stringComparator({ test: 'a' }, 'b', 'test')).toBe(-1);
	});

	it('should return -1 if the value to compare is invalid', () => {
		expect(stringComparator('a', undefined)).toBe(-1);
		expect(stringComparator(undefined, undefined)).toBe(-1);
		expect(stringComparator(undefined, 'b')).toBe(-1);
		expect(stringComparator(null, 'b')).toBe(-1);
		expect(stringComparator(0, 'b')).toBe(-1);
		expect(stringComparator(1, 'b')).toBe(-1);
		expect(stringComparator(false, 'b')).toBe(-1);
		expect(stringComparator(true, 'b')).toBe(-1);
	});
});
