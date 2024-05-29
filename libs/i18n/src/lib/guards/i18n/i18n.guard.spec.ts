import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';

import { I18nService, RootI18nService } from '../../services';

import { I18N_CONFIG } from '../../i18n.const';
import { I18nGuard } from './i18n.guard';

describe('I18nGuard', () => {
	const router: any = {
		navigate: jasmine.createSpy(),
	};
	const i18nService: any = {
		currentLanguage: 'nl',
		getCurrentLanguageForRoute: jasmine.createSpy().and.returnValue('nl'),
		availableLanguages: ['nl', 'en'],
		setLanguage: jasmine.createSpy(),
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: I18N_CONFIG,
					useValue: {
						defaultLanguage: 'nl',
						availableLanguages: ['nl', 'en'],
					},
				},
				{
					provide: I18nService,
					useValue: i18nService,
				},
				{
					provide: Router,
					useValue: router,
				},
				RootI18nService,
			],
		});
	});

	it('should return true if the route language matches the currentLanguage', () => {
		TestBed.runInInjectionContext(() => {
			let route = {
				paramMap: convertToParamMap({ language: 'nl' }),
			} as ActivatedRouteSnapshot;

			expect(I18nGuard(route, undefined)).toBe(true);

			route = {
				parent: {
					paramMap: convertToParamMap({ language: 'nl' }),
				},
				paramMap: convertToParamMap({}),
			} as ActivatedRouteSnapshot;

			expect(I18nGuard(route, undefined)).toBe(true);
		});
	});

	it('should set the current language if a new language supported language was provided', () => {
		TestBed.runInInjectionContext(() => {
			let route = {
				paramMap: convertToParamMap({ language: 'en' }),
			} as ActivatedRouteSnapshot;

			expect(I18nGuard(route, undefined)).toBe(true);
			expect(i18nService.setLanguage).toHaveBeenCalledWith('en');
			expect(router.navigate).toHaveBeenCalledWith(['/', 'en']);

			route = {
				parent: {
					paramMap: convertToParamMap({ language: 'en' }),
				},
				paramMap: convertToParamMap({}),
			} as ActivatedRouteSnapshot;

			expect(I18nGuard(route, undefined)).toBe(true);
			expect(i18nService.setLanguage).toHaveBeenCalledWith('en');
			expect(router.navigate).toHaveBeenCalledWith(['/', 'en']);
		});
	});

	it('should redirect to the currently set language if the language is not supported', () => {
		TestBed.runInInjectionContext(() => {
			let route = {
				paramMap: convertToParamMap({ language: 'de' }),
			} as ActivatedRouteSnapshot;

			expect(I18nGuard(route, undefined)).toBe(false);
			expect(router.navigate).toHaveBeenCalledWith(['/', 'nl']);

			route = {
				parent: {
					paramMap: convertToParamMap({ language: 'de' }),
				},
				paramMap: convertToParamMap({}),
			} as ActivatedRouteSnapshot;

			expect(I18nGuard(route, undefined)).toBe(false);
			expect(router.navigate).toHaveBeenCalledWith(['/', 'nl']);
		});
	});
});
