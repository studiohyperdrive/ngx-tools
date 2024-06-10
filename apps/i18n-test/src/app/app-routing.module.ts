import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { I18nGuard } from '@ngx/i18n';

const routes: Routes = [
	{
		path: ':language',
		canActivate: [I18nGuard],
		loadChildren: () => import('../feature/feature.routes').then((m) => m.FeatureRoutes),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
