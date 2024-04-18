import { RouterModule, Routes } from '@angular/router';

import { FeaturePageComponent } from './pages/feature.component';
import { TranslationLoaderGuard } from 'i18n';

const routes: Routes = [
	{
		path: '',
		component: FeaturePageComponent,
		canActivate: [TranslationLoaderGuard],
	},
];

export const FeatureRoutingModule = RouterModule.forChild(routes);
