import { throwError } from 'rxjs';

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
});
