import { of, tap } from 'rxjs';

import { pluck } from './pluck.operator';

describe('pluck', () => {
	it('should pluck a property from a source', async () => {
		const observable = of({
			message: 'Like and subscribe!',
			url: 'youtube.com/@Iben',
		});

		observable
			.pipe(
				pluck('url'),
				tap((result) => {
					expect(result).toEqual('youtube.com/@Iben');
				})
			)
			.subscribe();
	});

	it('should pluck a nested property from a source', async () => {
		const observable = of({
			endCard: {
				message: 'Like and subscribe!',
				url: 'youtube.com/@Iben',
			},
		});

		observable
			.pipe(
				pluck('endCard', 'url'),
				tap((result) => {
					expect(result).toEqual('youtube.com/@Iben');
				})
			)
			.subscribe();
	});

	it('should return undefined if a property does not exist on the source', async () => {
		const observable = of({
			message: 'Like and subscribe!',
			url: 'youtube.com/@Iben',
		});

		observable
			.pipe(
				pluck('hello'),
				tap((result) => {
					expect(result).toEqual(undefined);
				})
			)
			.subscribe();
	});

	it('should return undefined if the source does not exist', async () => {
		const observable = of(undefined);

		observable
			.pipe(
				pluck('url'),
				tap((result) => {
					expect(result).toEqual(undefined);
				})
			)
			.subscribe();
	});
});
