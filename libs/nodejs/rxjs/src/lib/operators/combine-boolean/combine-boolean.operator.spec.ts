import { of, tap } from 'rxjs';

import { combineBooleans } from './combine-boolean.operator';

describe('combineBooleans', () => {
	it('should combine booleans according to the AND principle when both are true', async () => {
		const booleanObservableA = of(true);
		const booleanObservableB = of(true);

		combineBooleans([booleanObservableA, booleanObservableB])
			.pipe(
				tap((result) => {
					expect(result).toBe(true);
				})
			)
			.subscribe();
	});

	it('should combine booleans according to the AND principle when both are false', async () => {
		const booleanObservableA = of(false);
		const booleanObservableB = of(false);

		combineBooleans([booleanObservableA, booleanObservableB])
			.pipe(
				tap((result) => {
					expect(result).toBe(false);
				})
			)
			.subscribe();
	});

	it('should combine booleans according to the AND principle when one observable is false', async () => {
		const booleanObservableA = of(true);
		const booleanObservableB = of(false);

		combineBooleans([booleanObservableA, booleanObservableB])
			.pipe(
				tap((result) => {
					expect(result).toBe(false);
				})
			)
			.subscribe();
	});
});
