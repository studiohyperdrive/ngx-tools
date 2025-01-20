import { filter, last, Observable, of, Subscription, switchMap, take } from 'rxjs';
import { NgxI18nLoadingService } from './i18n-loading.service';
import { TranslationLoaderActionEntity } from './i18n-loading.types';

describe('NgxI18nLoadingService', () => {
	const subscriptions: Subscription[] = [];

	afterEach(() => {
		subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
	});

	xdescribe('observables', () => {
		describe('translationsLoaded$', () => {
			it('should return false if no results have been found', (done: DoneFn) => {
				const service = new NgxI18nLoadingService();

				subscriptions.push(
					service['translationLoaderActionsSubject$']
						.pipe(
							filter(
								(action: TranslationLoaderActionEntity) => action.id === 'test-id'
							),
							switchMap(() => service.translationsLoaded$)
						)
						.subscribe((loading: boolean) => {
							expect(loading).toBeTrue();

							done();
						})
				);

				service['translationLoaderActionsSubject$'].next({
					id: 'test-id',
					state: 'LOADING',
				});
			});

			it('should return true if results have been found', (done: DoneFn) => {
				const service = new NgxI18nLoadingService();

				subscriptions.push(
					service['translationLoaderActionsSubject$']
						.pipe(
							filter(
								(action: TranslationLoaderActionEntity) => action.id === 'test-id'
							),
							switchMap(() => service.translationsLoaded$)
						)
						.subscribe((loading: boolean) => {
							expect(loading).toBeTrue();

							done();
						})
				);

				service['translationLoaderActionsSubject$'].next({
					id: 'test-id',
					state: 'LOADED',
				});
			});
		});
	});

	describe('dispatchTranslationLoaderAction', () => {
		it('should push a new action to the translationLoaderActionsSubject$', (done: DoneFn) => {
			const service = new NgxI18nLoadingService();
			const action: TranslationLoaderActionEntity = {
				id: 'test-id',
				state: 'LOADING',
			};

			subscriptions.push(
				service['translationLoaderActionsSubject$'].subscribe(
					(action: TranslationLoaderActionEntity) => {
						expect(action).toEqual(action);

						done();
					}
				)
			);

			service.dispatchTranslationLoaderAction(action);
		});
	});

	describe('addLoadedTranslations', () => {
		it('should merge & push a new value to the translationsSubject$', (done: DoneFn) => {
			const service = new NgxI18nLoadingService();
			const existingTranslations: Record<string, unknown> = {
				en: 'test-translation',
			};
			const newTranslations: Record<string, unknown> = {
				nl: 'test-translation',
			};

			// Denis: push existing translations
			service['translationsSubject$'].next(existingTranslations);

			subscriptions.push(
				service['translationsSubject$']
					.pipe(
						filter((translations) => !!translations),
						switchMap(() => service['translationsSubject$']),
						// Denis: only take the 2 values
						take(2),
						// Denis: proceed with the last of both
						last()
					)
					.subscribe((translations: Record<string, unknown>) => {
						expect(translations).toEqual({
							...existingTranslations,
							...newTranslations,
						});

						done();
					})
			);

			// Denis: test the method to see if it pushes new values to the subject
			service.addLoadedTranslations(newTranslations);
		});
	});

	describe('getTranslations', () => {
		it('should get return the current value of the translationsSubject$', (done: DoneFn) => {
			const service = new NgxI18nLoadingService();
			const existingTranslations: Record<string, unknown> = {
				en: 'test-translation',
			};

			service['translationsSubject$'].next(existingTranslations);

			service['translationsSubject$']
				.pipe(filter((translations) => !!translations))
				.subscribe((translations) => {
					expect(service.getTranslations()).toEqual(translations);

					done();
				});
		});
	});

	describe('loadTranslations', () => {
		it('should create a new entries in the translationsLoading record if the path does not exist', (done: DoneFn) => {
			const service = new NgxI18nLoadingService();

			service['translationsLoading'] = {};

			expect(service['translationsLoading']['something']).toBeUndefined();

			service
				.loadTranslations(
					'something',
					of({
						en: 'test-translation',
					})
				)
				.subscribe((value) => {
					expect(value).toEqual({
						en: 'test-translation',
					});

					expect(service['translationsLoading']['something']).toBeInstanceOf(Observable);

					done();
				});
		});

		it('should return the existing observable if it exists', (done: DoneFn) => {
			const service = new NgxI18nLoadingService();

			service['translationsLoading'] = {
				something: of({
					en: 'test-translation',
				}),
			};

			expect(service['translationsLoading']['something']).toBeInstanceOf(Observable);

			service
				.loadTranslations(
					'something',
					of({
						nl: 'test-translation',
					})
				)
				.subscribe((value) => {
					expect(value).toEqual({
						en: 'test-translation',
					});

					done();
				});
		});
	});

	describe('markTranslationsLoadedAsFailed', () => {
		it('should push a false value the translationsFailedSubject$', (done: DoneFn) => {
			const service = new NgxI18nLoadingService();

			service['translationsFailedSubject$']
				.pipe(take(2), last())
				.subscribe((failed: boolean) => {
					expect(failed).toBeFalse();

					done();
				});

			service.markTranslationsLoadedAsFailed();
		});
	});
});
