/**
 * earlyReturnEmptyArrayValue
 *
 * Test clause factory that will check if a provided non-array or empty array argument
 * returns in an early return with empty array.
 *
 * @param fn
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const earlyReturnEmptyArrayValue = (fn: Function) => () => {
	expect(fn(undefined)).toEqual([]);
	expect(fn(null)).toEqual([]);
	expect(fn(true)).toEqual([]);
	expect(fn(2)).toEqual([]);
	expect(fn('test')).toEqual([]);
	expect(fn([])).toEqual([]);
};
