import { Routes } from '@angular/router';

import { FeaturePageComponent } from './pages/feature.component';
import { FeatureTranslationLoader } from './translation.loader';
import { TranslationLoaderGuard, provideWithTranslations } from '@ngx/i18n';

export const FeatureRoutes: Routes = [
	provideWithTranslations(
		{
			path: '',
			component: FeaturePageComponent,
			canActivate: [TranslationLoaderGuard],
		},
		FeatureTranslationLoader
	),
];
