import { finalize, of, Subscription } from 'rxjs';
import { NgxI18nTranslationLoaderResolver } from './i18n.resolver';
import objectContaining = jasmine.objectContaining;

const i18nService: any = {
	currentLanguage: 'nl',
	initI18n: jasmine.createSpy().and.returnValue(of(true)),
};

const i18nLoadingService: any = {
	dispatchTranslationLoaderAction: jasmine.createSpy(),
};

describe('NgxI18nTranslationLoaderResolver', () => {
	const subscriptions: Subscription[] = [];

	afterEach(() => {
		subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
	});

	describe('resolve', () => {
		it('should trigger the initI18n method and set the translation loader to loaded', (done: DoneFn) => {
			const resolver = new NgxI18nTranslationLoaderResolver(i18nService, i18nLoadingService);

			subscriptions.push(
				resolver
					.resolve()
					.pipe(
						finalize(() => {
							expect(
								i18nLoadingService.dispatchTranslationLoaderAction
							).toHaveBeenCalledWith(
								objectContaining({
									state: 'LOADED',
								})
							);
						})
					)
					.subscribe((result: boolean) => {
						expect(result).toBeTrue();

						expect(
							i18nLoadingService.dispatchTranslationLoaderAction
						).toHaveBeenCalledWith(
							objectContaining({
								state: 'LOADING',
							})
						);

						expect(i18nService.initI18n).toHaveBeenCalledWith(
							i18nService.currentLanguage
						);

						done();
					})
			);
		});
	});
});
