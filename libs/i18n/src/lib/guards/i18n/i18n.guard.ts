import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

import { NgxI18nRootService } from '../../services';
import { NgxI18nConfiguration } from '../../i18n.types';
import { NgxI18nConfigurationToken } from '../../tokens';

/**
 * Set the language in the url of the route
 *
 * @param route - The provided route
 */
export const NgxI18nGuard: CanActivateFn = (route: ActivatedRouteSnapshot): boolean => {
	// Iben: Fetch all injectables
	const router: Router = inject(Router);
	const i18nService = inject(NgxI18nRootService);
	const config: NgxI18nConfiguration = inject(NgxI18nConfigurationToken);

	// Iben: Get the two language params
	const currentLanguage = i18nService.currentLanguage || config.defaultLanguage;
	const routeLanguage = getLanguage(route, config);

	// Iben: If both languages are the same, we can continue
	if (currentLanguage === routeLanguage) {
		return true;
	}

	// Iben: If the router language differs, we check if it is available
	if (config?.availableLanguages.includes(routeLanguage)) {
		// Iben: Update the language
		i18nService.setCurrentLanguage(routeLanguage);

		//Iben: Re-route to the new language
		router.navigate(['/', routeLanguage]);

		return true;
	}

	//Iben: The current language is set to "default" when no previous language exists.
	router.navigate(['/', currentLanguage]);

	return false;
};

/**
 * Fetches the language from the route
 *
 * @param route - The provided route
 * @param config - The provided config
 */
const getLanguage = (route: ActivatedRouteSnapshot, config: NgxI18nConfiguration): string => {
	const language = route?.paramMap.get(config.languageRouteParam || 'language');
	const parent = route?.parent;

	if (!parent && !language) {
		return undefined;
	}

	if (config.availableLanguages.includes(language)) {
		return language;
	}

	return getLanguage(parent, config);
};
