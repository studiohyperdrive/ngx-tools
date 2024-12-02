import { ModuleWithProviders, NgModule, inject } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { HttpBackend } from '@angular/common/http';
import { NgxI18nConfiguration } from './i18n.types';
import { NgxI18nConfigurationToken } from './tokens/i18n.token';
import { NgxI18nMultiTranslationHttpLoader } from './loader';
import { NgxI18nService } from './services';
import { NgxI18nTranslationLoaderResolver } from './resolvers';

function FallBackTranslationLoader(http: HttpBackend) {
	// Iben: Inject the config
	const config = inject(NgxI18nConfigurationToken);

	// Iben: Return a default loader
	return new NgxI18nMultiTranslationHttpLoader(http, config.defaultAssetPaths || []);
}

@NgModule({
	imports: [TranslateModule],
	exports: [TranslateModule],
})
export class NgxI18nModule {
	public static forRoot(
		config: NgxI18nConfiguration,
		translationLoader?: (http: HttpBackend) => NgxI18nMultiTranslationHttpLoader
	): ModuleWithProviders<NgxI18nModule> {
		const providers = [
			...TranslateModule.forRoot({
				loader: {
					provide: TranslateLoader,
					useFactory: translationLoader || FallBackTranslationLoader,
					deps: [HttpBackend],
				},
				useDefaultLang: true,
			}).providers,
			{
				provide: NgxI18nConfigurationToken,
				useValue: config,
			},
			NgxI18nService,
		];

		return {
			ngModule: NgxI18nModule,
			providers,
		};
	}

	public static forChild(
		translationLoader?: (http: HttpBackend) => NgxI18nMultiTranslationHttpLoader
	): ModuleWithProviders<NgxI18nModule> {
		const providers = [
			...TranslateModule.forChild({
				loader: {
					provide: TranslateLoader,
					useFactory: translationLoader || FallBackTranslationLoader,
					deps: [HttpBackend],
				},
				isolate: true,
			}).providers,
			NgxI18nService,
			NgxI18nTranslationLoaderResolver,
		];

		return {
			ngModule: NgxI18nModule,
			providers,
		};
	}
}
