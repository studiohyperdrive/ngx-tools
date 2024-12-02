import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { NgxI18nRootService } from '../../services';

/**
 * Set the language in the url of the route
 *
 * @param route - The provided route
 */
export const NgxI18nSetLanguageGuard: CanActivateFn = (): Promise<boolean> => {
	// Iben: Fetch all injectables
	const router: Router = inject(Router);
	const i18nService = inject(NgxI18nRootService);

	// Iben: Initialize the current language of the application
	i18nService.initializeLanguage();

	//Iben: Navigate to the set currentLanguage
	return router.navigate(['/', i18nService.currentLanguage]);
};
