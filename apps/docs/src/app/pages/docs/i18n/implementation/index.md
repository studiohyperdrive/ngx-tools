---
keyword: ImplementationPage
---

## NgxI18nRootService and NgxI18nService

As `@studiohyperdrive/ngx-i18n` works with a modular approach, each feature has its own instance of the `NgxI18nService` which contains its own set of translations. When working within a feature and requiring a translation from the translation service, always use this service.

However, the package also has a root service, `NgxI18nRootService`. Because whilst each feature will handle and load its own translations when needed, the application needs one single source of truth to which language is being used. This root service serves as this source of truth, and will also save the current language to the localStorage.

## Setup

In this simple example we'll provide the basic setup for the `NgxI18nModule` approach.

First off, in our root module we provide the `NgxI18nModule` in which we'll configure our basic settings.

```ts
@NgModule({
	imports: [
		NgxI18nModule.forRoot({
			defaultLanguage: 'nl',
			availableLanguages: ['nl', 'fr'],
			defaultAssetPaths: ['./assets/i18n/shared/', './assets/i18n/ui/'],
		}),
	],
})
export class AppModule {}
```

Next up, we'll take a look at the lazy loaded feature module. In order to then lazy load our translations, we provide a routing module with the `TranslationResolverGuard` on our root path.

```ts
import { NgxI18nTranslationLoaderGuard } from '@studiohyperdrive/ngx-i18n';

const routes = [
	{
		path: '',
		component: FeatureComponent,
		canActivate: [NgxI18nTranslationLoaderGuard],
	},
];

export const FeatureRoutingModule = RoutingModule.forChild(routes);
```

Afterwards, we setup a translation loader for our feature module we'll lazy load.

```ts
import { NgxI18nMultiTranslationHttpLoader } from '@studiohyperdrive/ngx-i18n';

export function FeatureTranslationLoader(http: HttpBackend) {
	return new NgxI18nMultiTranslationHttpLoader(http, [
		'./assets/i18n/shared/',
		'./assets/i18n/feature',
	]);
}
```

Which we'll then provide to the `NgxI18nModule` in our feature module

```ts
@NgModule({
	imports: [NgxI18nModule.forRoot(FeatureTranslationLoader), FeatureRoutingModule],
})
export class FeatureModule {}
```

With this setup, the translations will be loaded only when navigating to the FeatureModule.

## Standalone

`ngx-i18n` also works with stand-alone components. In order to provide translations as done using modules, we use the `provideWithTranslations` function. Wrapping a `Route` with this function will provide the translations for said route.

```ts
export const TestRoutes: Routes = [
	provideWithTranslations(
		{
			path: '',
			component: TestComponent,
		},
		TestTranslationLoader
	),
];
```

## NgxI18nSetLanguageGuard and NgxI18nGuard

In many applications we want the language parameter to be part of the routing. To do so, `@studiohyperdrive/ngx-i18n` provides two guards, the `NgxI18nSetLanguageGuard` and the `NgxI18nGuard`.

On one hand, the `NgxI18nSetLanguageGuard` can be set on the base route of the application to automatically set the current language of the application to the route. If there was previously a current language selected, the language will be fetched from the localStorage and will be used. If not, the provided default language will be used.

The `NgxI18nGuard` will both ensure that, once the language is set, the correct translations are loaded and will prevent users from altering the url and setting a language that is not available. When linked to a language that is not provided as an available language, this guard will default the language back to the default language.

In some setups, the base route of the application does not have a component and currently redirects to a fixed language. In order to circumvent this issue, `@studiohyperdrive/ngx-i18n` also provides a dummy component `NgxI18nEmptyComponent` that can be used instead.

```ts
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
```
