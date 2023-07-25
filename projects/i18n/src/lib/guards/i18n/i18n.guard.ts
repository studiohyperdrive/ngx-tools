import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

import { I18nService } from '../../services';
import { I18N_CONFIG } from '../../i18n.const';
import { I18nConfig } from '../../i18n.types';

/**
 * Set the language in the url of the route
 *
 * @param route - The provided route
 */
export const I18nGuard: CanActivateFn = (route: ActivatedRouteSnapshot): boolean => {
	// Iben: Fetch all injectables
	const router: Router = inject(Router);
	const i18nService = inject(I18nService);
	const config: I18nConfig = inject(I18N_CONFIG);

	const currentLanguage = i18nService.currentLanguage || config.defaultLanguage;
	const routeLanguage = getLanguage(route, config);

	if (currentLanguage === routeLanguage) {
		return true;
	}

	if (i18nService.availableLanguages.includes(routeLanguage)) {
		i18nService.setLanguage(routeLanguage);

		// Re-route to the new language
		router.navigate(['/', routeLanguage]);
		return true;
	}

	// The current language is set to "default" when no previous language exists.
	router.navigate(['/', currentLanguage]);

	return false;
};

const getLanguage = (route: ActivatedRouteSnapshot, config: I18nConfig): string => {
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
