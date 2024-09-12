# Angular Tools: NgxI18n (`@studiohyperdrive/ngx-i18n`)

This library provides a lazy-loaded modular approach to translations.

## Installation

Install the package first:

```shell
npm install @studiohyperdrive/ngx-i18n
```

## Versioning and build information

This package will follow a semver-like format, `major.minor.patch`, in which:

- `major`: Follows the Angular major version
- `minor`: Introduces new features and (potential) breaking changes
- `patch`: Introduces bugfixes and minor non-breaking changes

For more information about the build process, authors, contributions and issues, we refer to the [ngx-tools](https://github.com/studiohyperdrive/ngx-tools) repository.

## Concept

`ngx-1i8n` is a layer on top of `ngx-translate` that allows for a lazy-loaded modular approach to translations. This approach allows the user to split up the translations into several independent files, which can be lazy-loaded whenever they're needed.

This approach only works for module-based projects. There is currently no support for standalone-components.

### Modular

In order for a modular translation system, we provide a `TranslationLoader` to each `forChild` method of the `NgxI18nModule`. This loader uses a similar approach as @rbalet's [MultiTranslateHttpLoader](https://github.com/rbalet/ngx-translate-multi-http-loader).

Using an array of source paths, the translation loader loads in only the provided translations. If one of the assets has previously been loaded by a different module, the translation will be fetched from the cache.

```ts
import { NgxI18nMultiTranslationHttpLoader } from '@studiohyperdrive/ngx-i18n';

export function ExampleTranslationLoader(http: HttpBackend) {
	return new NgxI18nMultiTranslationHttpLoader(http, ['./path-to-translation/']);
}
```

If no custom `TranslationLoader` is provided, than the module will use a fall-back loader which has a default array of paths that can be set in the config file.

### Lazy-loaded

In order to provide a lazy loaded translation system, the translations only get loaded when routing to a specific route.

For this purpose we've provided a `NgxI18nTranslationLoaderGuard` which will automatically fetch all translations when the application routes to this route.

At any given time you can query the `NgxI18nLoadingService` to see whether the translations have been loaded into the application. There are two Observables provided, being `translationsLoading$` and `translationsFailed$`;

## Implementation

### NgxI18nRootService and NgxI18nService

As `@studiohyperdrive/ngx-i18n` works with a modular approach, each feature has its own instance of the `NgxI18nService` which contains its own set of translations. When working within a feature and requiring a translation from the translation service, always use this service.

However, the package also has a root service, `NgxI18nRootService`. Because whilst each feature will handle and load its own translations when needed, the application needs one single source of truth to which language is being used. This root service serves as this source of truth, and will also save the current language to the localStorage.

### Setup

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
	return new NgxI18nMultiTranslationHttpLoader(http, ['./assets/i18n/shared/', './assets/i18n/feature']);
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

### Standalone

`ngx-i18n` also works with stand-alone components. In order to provide translations as done using modules, we use the `provideWithTranslations` function. Wrapping a `Route` with this function will provide the translations for said route.

```ts
export const TestRoutes: Routes = [
	provideWithTranslations(
		{
			path: '',
			component: TestComponent
		},
		TestTranslationLoader
	)
];
```

### NgxI18nSetLanguageGuard and NgxI18nGuard

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
