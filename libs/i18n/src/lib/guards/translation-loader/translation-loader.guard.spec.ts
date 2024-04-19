import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TranslationLoaderResolver } from '../../resolvers';
import { I18nService } from '../../services';
import { TranslationLoaderGuard } from './translation-loader.guard';

describe('TranslationLoaderGuard', () => {
	describe('with resolver provided', () => {
		const router: any = {
			navigate: jasmine.createSpy(),
		};

		beforeEach(() => {
			TestBed.configureTestingModule({
				providers: [
					{
						provide: Router,
						useValue: router,
					},
					{
						provide: TranslationLoaderResolver,
						useValue: null,
					},
				],
			});
		});

		it('should return false when no resolver was provided', () => {
			TestBed.runInInjectionContext(() => {
				const route = {} as ActivatedRouteSnapshot;

				expect(TranslationLoaderGuard(route, null)).toBe(false);
			});
		});
	});

	describe('without resolver provided', () => {
		const router: any = {
			navigate: jasmine.createSpy(),
		};
		const i18nService: any = {
			currentLanguage: 'nl',
			getCurrentLanguageForRoute: jasmine.createSpy().and.returnValue('nl'),
			availableLanguages: ['nl', 'en'],
			setLanguage: jasmine.createSpy(),
			initI18n: jasmine.createSpy().and.returnValue(of(true)),
		};

		beforeEach(() => {
			TestBed.configureTestingModule({
				providers: [
					{
						provide: Router,
						useValue: router,
					},
					{
						provide: I18nService,
						useValue: i18nService,
					},
					TranslationLoaderResolver,
				],
			});
		});

		it('should resolve the loader when a resolver is provided', () => {
			TestBed.runInInjectionContext(() => {
				const route = {} as ActivatedRouteSnapshot;

				expect(TranslationLoaderGuard(route, null)).toBeInstanceOf(Observable);
			});
		});
	});
});
