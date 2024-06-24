import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		loadComponent: () => import('./pages/main/main.component').then((m) => m.MainComponent),
	},
	{
		path: 'secondary',
		loadComponent: () =>
			import('./pages/secondary/secondary.component').then((m) => m.SecondaryComponent),
	},
];
