import { of } from 'rxjs';
import { isString } from 'lodash';
import { populate } from './populate.operator';

describe('populate', () => {
	describe('Default populateIf', () => {
		const page = of({
			title: 'Test',
			description: 'Test',
			ads: {
				adsId: '1',
			},
			linkId: '1',
		});

		const populateRecord = {
			'ads.items': (data: any) => of([data.ads.adsId]),
			link: () => of({ url: 'youtube.com/@Iben' }),
		};
		it('should correctly populate the missing keys', async () => {
			page.pipe(populate(populateRecord)).subscribe((result) => {
				expect(result).toEqual({
					title: 'Test',
					description: 'Test',
					link: { url: 'youtube.com/@Iben' },
					linkId: '1',
					ads: {
						adsId: '1',
						items: ['1'],
					},
				});
			});
		});
	});

	describe('Default populateIf', () => {
		const page = of({
			title: 'Test',
			description: 'Test',
			ads: '1',
			link: '1',
		});
		const populateRecord = {
			ads: (data: any) => of([data.ads]),
			link: () => of({ url: 'youtube.com/@Iben' }),
		};

		it('should correctly populate the missing keys', async () => {
			page.pipe(populate(populateRecord, (value) => isString(value))).subscribe((result) => {
				expect(result).toEqual({
					title: 'Test',
					description: 'Test',
					link: { url: 'youtube.com/@Iben' },
					ads: ['1'],
				});
			});
		});
	});
});
