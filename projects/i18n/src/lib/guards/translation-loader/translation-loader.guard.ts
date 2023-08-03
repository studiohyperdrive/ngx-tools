import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { TranslationLoaderResolver } from '../../resolvers';

/**
 * Loads in all translations for a specific module
 */
export const TranslationLoaderGuard: CanActivateFn = (): ReturnType<CanActivateFn> => {
	// Iben: Fetch all injectables
	const loader: TranslationLoaderResolver = inject(TranslationLoaderResolver);

	if (!loader) {
		return false;
	}

	return loader.resolve();
};
