import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

import { Observable, take, map } from 'rxjs';
import { NgxI18nRootService } from '../../services';

/**
 * Set the language in the url of the route
 *
 * @param route - The provided route
 */
export const NgxI18nGuard: CanActivateFn = (route: ActivatedRouteSnapshot): Observable<boolean> => {
	// Iben: Fetch all injectables
	const router: Router = inject(Router);
	const i18nService = inject(NgxI18nRootService);

	// Iben: Initialize the current language of the application
	i18nService.initializeLanguage();

	return i18nService.availableLanguages$.pipe(
		take(1),
		map((availableLanguages) => {
			// Iben: Get the two language params
			const currentLanguage = i18nService.currentLanguage;
			const routeLanguage = getLanguage(
				route,
				availableLanguages,
				i18nService.languageRouteParam
			);

			// Iben: If both languages are the same, we can continue
			if (currentLanguage === routeLanguage) {
				return true;
			}

			// Iben: If the router language differs, we check if it is available
			if (availableLanguages.includes(routeLanguage)) {
				// Iben: Update the language
				i18nService.setCurrentLanguage(routeLanguage);

				//Iben: Re-route to the new language
				router.navigate(['/', routeLanguage]);

				return true;
			}

			//Iben: The current language is set to "default" when no previous language exists.
			router.navigate(['/', currentLanguage]);

			return false;
		})
	);
};

/**
 * Fetches the language from the route
 *
 * @param route - The provided route
 * @param config - The provided config
 */
const getLanguage = (
	route: ActivatedRouteSnapshot,
	availableLanguages: string[],
	languageRouteParam: string
): string => {
	const language = route?.paramMap.get(languageRouteParam || 'language');
	const parent = route?.parent;

	if (!parent && !language) {
		return undefined;
	}

	if (availableLanguages.includes(language)) {
		return language;
	}

	return getLanguage(parent, availableLanguages, languageRouteParam);
};
