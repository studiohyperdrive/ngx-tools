import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';

import { NgxI18nRootService } from '../../services';

import { NgxI18nConfigurationToken } from '../../tokens/i18n.token';
import { NgxI18nGuard } from './i18n.guard';

describe('NgxI18nGuard', () => {
	const router: any = {
		navigate: jasmine.createSpy(),
	};
	const i18nService: any = {
		currentLanguage: 'nl',
		availableLanguages: ['nl', 'en'],
		setCurrentLanguage: jasmine.createSpy(),
		initializeLanguage: jasmine.createSpy(),
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: NgxI18nConfigurationToken,
					useValue: {
						defaultLanguage: 'nl',
						availableLanguages: ['nl', 'en'],
					},
				},
				{
					provide: NgxI18nRootService,
					useValue: i18nService,
				},
				{
					provide: Router,
					useValue: router,
				},
			],
		});
	});

	it('should return true if the route language matches the currentLanguage', () => {
		TestBed.runInInjectionContext(() => {
			let route = {
				paramMap: convertToParamMap({ language: 'nl' }),
			} as ActivatedRouteSnapshot;

			expect(NgxI18nGuard(route, undefined)).toBe(true);

			route = {
				parent: {
					paramMap: convertToParamMap({ language: 'nl' }),
				},
				paramMap: convertToParamMap({}),
			} as ActivatedRouteSnapshot;

			expect(NgxI18nGuard(route, undefined)).toBe(true);
		});
	});

	it('should set the current language if a new language supported language was provided', () => {
		TestBed.runInInjectionContext(() => {
			let route = {
				paramMap: convertToParamMap({ language: 'en' }),
			} as ActivatedRouteSnapshot;

			expect(NgxI18nGuard(route, undefined)).toBe(true);
			expect(i18nService.setCurrentLanguage).toHaveBeenCalledWith('en');
			expect(router.navigate).toHaveBeenCalledWith(['/', 'en']);

			route = {
				parent: {
					paramMap: convertToParamMap({ language: 'en' }),
				},
				paramMap: convertToParamMap({}),
			} as ActivatedRouteSnapshot;

			expect(NgxI18nGuard(route, undefined)).toBe(true);
			expect(i18nService.setCurrentLanguage).toHaveBeenCalledWith('en');
			expect(router.navigate).toHaveBeenCalledWith(['/', 'en']);
		});
	});

	it('should redirect to the currently set language if the language is not supported', () => {
		TestBed.runInInjectionContext(() => {
			let route = {
				paramMap: convertToParamMap({ language: 'de' }),
			} as ActivatedRouteSnapshot;

			expect(NgxI18nGuard(route, undefined)).toBe(false);
			expect(router.navigate).toHaveBeenCalledWith(['/', 'nl']);

			route = {
				parent: {
					paramMap: convertToParamMap({ language: 'de' }),
				},
				paramMap: convertToParamMap({}),
			} as ActivatedRouteSnapshot;

			expect(NgxI18nGuard(route, undefined)).toBe(false);
			expect(router.navigate).toHaveBeenCalledWith(['/', 'nl']);
		});
	});
});
