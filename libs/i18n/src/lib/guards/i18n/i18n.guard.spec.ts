import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

import { Observable, of } from 'rxjs';
import { NgxI18nRootService } from '../../services';

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
		availableLanguages$: of(['nl', 'en']),
		defaultLanguage: 'nl',
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
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

			expect(
				subscribeSpyTo(
					NgxI18nGuard(route, undefined) as Observable<boolean>
				).getFirstValue()
			).toBe(true);

			route = {
				parent: {
					paramMap: convertToParamMap({ language: 'nl' }),
				},
				paramMap: convertToParamMap({}),
			} as ActivatedRouteSnapshot;

			expect(
				subscribeSpyTo(
					NgxI18nGuard(route, undefined) as Observable<boolean>
				).getFirstValue()
			).toBe(true);
		});
	});

	it('should set the current language if a new language supported language was provided', () => {
		TestBed.runInInjectionContext(() => {
			let route = {
				paramMap: convertToParamMap({ language: 'en' }),
			} as ActivatedRouteSnapshot;

			expect(
				subscribeSpyTo(
					NgxI18nGuard(route, undefined) as Observable<boolean>
				).getFirstValue()
			).toBe(true);
			expect(i18nService.setCurrentLanguage).toHaveBeenCalledWith('en');
			expect(router.navigate).toHaveBeenCalledWith(['/', 'en']);

			route = {
				parent: {
					paramMap: convertToParamMap({ language: 'en' }),
				},
				paramMap: convertToParamMap({}),
			} as ActivatedRouteSnapshot;

			expect(
				subscribeSpyTo(
					NgxI18nGuard(route, undefined) as Observable<boolean>
				).getFirstValue()
			).toBe(true);
			expect(i18nService.setCurrentLanguage).toHaveBeenCalledWith('en');
			expect(router.navigate).toHaveBeenCalledWith(['/', 'en']);
		});
	});

	it('should redirect to the currently set language if the language is not supported', () => {
		TestBed.runInInjectionContext(() => {
			let route = {
				paramMap: convertToParamMap({ language: 'de' }),
			} as ActivatedRouteSnapshot;

			expect(
				subscribeSpyTo(
					NgxI18nGuard(route, undefined) as Observable<boolean>
				).getFirstValue()
			).toBe(false);
			expect(router.navigate).toHaveBeenCalledWith(['/', 'nl']);

			route = {
				parent: {
					paramMap: convertToParamMap({ language: 'de' }),
				},
				paramMap: convertToParamMap({}),
			} as ActivatedRouteSnapshot;

			expect(
				subscribeSpyTo(
					NgxI18nGuard(route, undefined) as Observable<boolean>
				).getFirstValue()
			).toBe(false);
			expect(router.navigate).toHaveBeenCalledWith(['/', 'nl']);
		});
	});
});
