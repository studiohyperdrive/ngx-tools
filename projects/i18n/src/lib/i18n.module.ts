import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { HttpBackend } from '@angular/common/http';
import { I18nConfig } from './i18n.types';
import { I18N_CONFIG } from './i18n.const';
import { MultiTranslationHttpLoader } from './loader';
import { I18nService } from './services';
import { TranslationLoaderResolver } from './resolvers';

function FallBackTranslationLoader(http: HttpBackend) {
	return new MultiTranslationHttpLoader(http, ['./assets/i18n/shared/i18n/']);
}

@NgModule({
	imports: [TranslateModule],
	exports: [TranslateModule],
})
export class I18nModule {
	public static forRoot(
		config: I18nConfig,
		translationLoader?: (http: HttpBackend) => MultiTranslationHttpLoader
	): ModuleWithProviders<I18nModule> {
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
			ngModule: I18nModule,
			providers,
		};
	}

	public static forChild(
		translationLoader?: (http: HttpBackend) => MultiTranslationHttpLoader
	): ModuleWithProviders<I18nModule> {
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
			ngModule: I18nModule,
			providers,
		};
	}
}
