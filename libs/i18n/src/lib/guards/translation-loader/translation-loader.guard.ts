import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { NgxI18nTranslationLoaderResolver } from '../../resolvers';

/**
 * Loads in all translations for a specific module
 */
export const NgxI18nTranslationLoaderGuard: CanActivateFn = (): ReturnType<CanActivateFn> => {
	// Iben: Fetch all injectables
	const loader: NgxI18nTranslationLoaderResolver = inject(NgxI18nTranslationLoaderResolver);

	if (!loader) {
		return false;
	}

	return loader.resolve();
};
