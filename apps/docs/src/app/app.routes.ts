import { Routes } from '@angular/router';
import { ERoutes } from './shared/types';

export const appRoutes: Routes = [
	{
		path: ERoutes.LANDING,
		loadComponent: () =>
			import('./pages/landing/landing-page.component').then((m) => m.LandingPageComponent),
	},
	{
		path: ERoutes.DOCS,
		loadChildren: () => import('./pages/docs/landing/docs-page.component'),
	},
];
