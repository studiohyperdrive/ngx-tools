import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxI18nEmptyComponent, NgxI18nGuard, NgxI18nSetLanguageGuard } from '@ngx/i18n';

const routes: Routes = [
	{
		path: '',
		canActivate: [NgxI18nSetLanguageGuard],
		component: NgxI18nEmptyComponent,
	},
	{
		path: ':language',
		canActivate: [NgxI18nGuard],
		loadChildren: () => import('../feature/feature.routes').then((m) => m.FeatureRoutes),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
