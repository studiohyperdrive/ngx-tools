import { of, tap } from 'rxjs';

import { pluckOr } from './pluck-or.operator';

describe('pluck-or', () => {
	it('should pluck an item from a source', async () => {
		const observable = of({
			message: 'Like and subscribe!',
			url: 'youtube.com/@Iben',
		});

		observable
			.pipe(
				pluckOr('url', 'message'),
				tap((result) => {
					expect(result).toEqual('youtube.com/@Iben');
				})
			)
			.subscribe();
	});
	it('should pluck the backup item from a source if the initial item does not exist', async () => {
		const observable = of({
			message: 'Like and subscribe!',
		});

		observable
			.pipe(
				pluckOr('url', 'message'),
				tap((result) => {
					expect(result).toEqual('Like and subscribe!');
				})
			)
			.subscribe();
	});

	it('should return undefined if the source does not exist', async () => {
		const observable = of(undefined);

		observable
			.pipe(
				pluckOr('url', 'message'),
				tap((result) => {
					expect(result).toEqual(undefined);
				})
			)
			.subscribe();
	});

	it('should return undefined if the item and backup item was not found', async () => {
		const observable = of({ hello: 'world' });

		observable
			.pipe(
				pluckOr('url', 'message'),
				tap((result) => {
					expect(result).toEqual(undefined);
				})
			)
			.subscribe();
	});
});
