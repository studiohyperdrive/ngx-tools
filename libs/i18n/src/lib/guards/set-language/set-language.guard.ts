import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { NgxI18nRootService } from '../../services';
import { NgxI18nConfigurationToken } from '../../tokens';
import { NgxI18nConfiguration } from '../../i18n.types';

/**
 * Set the language in the url of the route
 *
 * @param route - The provided route
 */
export const NgxI18nSetLanguageGuard: CanActivateFn = (): Promise<boolean> => {
	// Iben: Fetch all injectables
	const router: Router = inject(Router);
	const i18nService = inject(NgxI18nRootService);
	const config: NgxI18nConfiguration = inject(NgxI18nConfigurationToken);

	// Iben: If no language was set already, we set the default language
	if (!i18nService.currentLanguage) {
		i18nService.setCurrentLanguage(config.defaultLanguage);
	}

	//Iben: Navigate to the set currentLanguage
	return router.navigate(['/', i18nService.currentLanguage]);
};
