import { throwError, catchError, of } from 'rxjs';

import { catchAndCallThrough } from './catch-and-call-through.operator';

describe('catchAndCallThrough', () => {
	it('should catch an error, perform the callback and resume the flow', async () => {
		throwError({
			nope: true,
		})
			.pipe(
				catchAndCallThrough((error: unknown) => {
					expect(error).toEqual({
						nope: true,
					});
				})
			)
			.subscribe(() => {
				// We don't need to test a value, just see if the subscription is triggered.
				expect(true).toBeTruthy();
			});
	});

	it('should catch an error, and stop the flow when asked', async () => {
		throwError({
			nope: true,
		})
			.pipe(
				catchAndCallThrough((error: unknown) => {
					expect(error).toEqual({
						nope: true,
					});
				}, 'complete')
			)
			.subscribe(() => {
				// We don't need to test a value, just see if the subscription is triggered.
				expect(true).toBeTruthy();
			});
	});

	it('should catch an error, and throw the error again asked', async () => {
		throwError({
			nope: true,
		})
			.pipe(
				catchAndCallThrough((error: unknown) => {
					expect(error).toEqual({
						nope: true,
					});
				}, 'throw'),
				catchError((error) => {
					expect(error).toEqual({
						nope: true,
					});

					return of(true);
				})
			)
			.subscribe(() => {
				// We don't need to test a value, just see if the subscription is triggered.
				expect(true).toBeTruthy();
			});
	});
});
