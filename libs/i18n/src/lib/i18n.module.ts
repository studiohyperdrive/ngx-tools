import { ModuleWithProviders, NgModule, inject } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { HttpBackend } from '@angular/common/http';
import { I18nConfig } from './i18n.types';
import { I18N_CONFIG } from './i18n.const';
import { MultiTranslationHttpLoader } from './loader';
import { I18nService } from './services';
import { TranslationLoaderResolver } from './resolvers';

function FallBackTranslationLoader(http: HttpBackend) {
	// Iben: Inject the config
	const config = inject(I18N_CONFIG);

	// Iben: Return a default loader
	return new MultiTranslationHttpLoader(http, config.defaultAssetPaths || []);
}

@NgModule({
	imports: [TranslateModule],
	exports: [TranslateModule],
})
export class NgxI18nModule {
	public static forRoot(
		config: I18nConfig,
		translationLoader?: (http: HttpBackend) => MultiTranslationHttpLoader
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
				provide: I18N_CONFIG,
				useValue: config,
			},
			I18nService,
		];

		return {
			ngModule: NgxI18nModule,
			providers,
		};
	}

	public static forChild(
		translationLoader?: (http: HttpBackend) => MultiTranslationHttpLoader
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
			I18nService,
			TranslationLoaderResolver,
		];

		return {
			ngModule: NgxI18nModule,
			providers,
		};
	}
}
