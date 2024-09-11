import { EnvironmentProviders, Provider, importProvidersFrom } from '@angular/core';
import { HttpBackend } from '@angular/common/http';

import { Route } from '@angular/router';
import { NgxI18nModule } from '../i18n.module';
import { NgxI18nConfiguration } from '../i18n.types';
import { NgxI18nMultiTranslationHttpLoader } from '../loader';

/**
 * Returns the root providers for the NgxI18nModule
 *
 * @param config - The configuration for the NgxI18nModule
 * @param translationLoader - An optional translation loader
 */
export const importNgxI18nProviders = (
	config: NgxI18nConfiguration,
	translationLoader?: (http: HttpBackend) => NgxI18nMultiTranslationHttpLoader
): (Provider | EnvironmentProviders)[] => {
	// Iben: Return the providers from the module
	return [importProvidersFrom(NgxI18nModule.forRoot(config, translationLoader))];
};

/**
 * Returns a route with the provided translations
 *
 * @param route - The route we wish to provide with translations
 * @param translationLoader - An optional translation loader
 */
export const provideWithTranslations = (
	route: Route,
	translationLoader?: (http: HttpBackend) => NgxI18nMultiTranslationHttpLoader
): Route => {
	// Iben: Grab the existing route and extend the providers with the providers from the module
	return {
		...route,
		providers: [
			...(route.providers || []),
			importProvidersFrom(NgxI18nModule.forChild(translationLoader)),
		],
	};
};
