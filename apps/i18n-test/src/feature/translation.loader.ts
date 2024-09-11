import { HttpBackend } from '@angular/common/http';
import { NgxI18nMultiTranslationHttpLoader } from '@ngx/i18n';

export function FeatureTranslationLoader(http: HttpBackend) {
	return new NgxI18nMultiTranslationHttpLoader(http, ['./assets/feature/']);
}
