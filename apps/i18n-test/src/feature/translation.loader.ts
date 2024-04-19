import { HttpBackend } from '@angular/common/http';
import { MultiTranslationHttpLoader } from '@ngx/i18n';

export function FeatureTranslationLoader(http: HttpBackend) {
	return new MultiTranslationHttpLoader(http, ['./assets/feature/']);
}
