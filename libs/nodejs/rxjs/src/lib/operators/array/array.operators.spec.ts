import { Observable, of } from 'rxjs';
import { sortArray } from './sort.operator';
import { mapArray } from './map.operator';
import { sliceArray } from './slice.operator';

describe('Array Operators', () => {
	it('should sort an observable array', async () => {
		const source = of(['a', 'b', 'd', 'c', 'e', 'f']);

		source.pipe(sortArray((a, b) => a.localeCompare(b))).subscribe((result) => {
			expect(result).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
		});
	});

	it('should map an observable array', async () => {
		const source = of(['a', 'b']);

		source.pipe(mapArray((item) => ({ item }))).subscribe((result) => {
			expect(result).toEqual([{ item: 'a' }, { item: 'b' }]);
		});
	});

	it('should slice an observable array', async () => {
		const source = of(['a', 'b', 'c', 'd']);

		source.pipe(sliceArray(0, 2)).subscribe((result) => {
			expect(result).toEqual(['a', 'b']);
		});
	});

	it('should return an empty array if the original was undefined', async () => {
		const source: Observable<string[]> = of(undefined);

		source.pipe(sliceArray(0, 2)).subscribe((result) => {
			expect(result).toEqual([]);
		});

		source.pipe(mapArray((item) => ({ item }))).subscribe((result) => {
			expect(result).toEqual([]);
		});

		source.pipe(sortArray((a, b) => a.localeCompare(b))).subscribe((result) => {
			expect(result).toEqual([]);
		});
	});
});
