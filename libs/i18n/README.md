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
import { MultiTranslationHttpLoader } from '@studiohyperdrive/ngx-i18n';

export function ExampleTranslationLoader(http: HttpBackend) {
	return new MultiTranslationHttpLoader(http, ['./path-to-translation/']);
}
```

If no custom `TranslationLoader` is provided, than the module will use a fall-back loader which has a default array of paths that can be set in the config file.

### Lazy-loaded

In order to provide a lazy loaded translation system, the translations only get loaded when routing to a specific route.

For this purpose we've provided a `TranslationLoaderGuard` which will automatically fetch all translations when the application routes to this route.

At any given time you can query the `I18nLoadingService` to see whether the translations have been loaded into the application. There are two Observables provided, being `translationsLoading$` and `translationsFailed$`;

## Implementation

### I18nGuard

The `@studiohyperdrive/ngx-i18n` package also provides us with a `I18nGuard` which will automatically prefix the routes of your application with a language parameter.

The name of the route parameter is `language` by default, but can be overwritten in the config file. The same config file will also provide the opportunity to define a set of permitted languages and a default language for when no language is provided.

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
import { TranslationLoaderGuard } from '@studiohyperdrive/ngx-i18n';

const routes = [
	{
		path: '',
		component: FeatureComponent,
		canActivate: [TranslationLoaderGuard],
	},
];

export const FeatureRoutingModule = RoutingModule.forChild(routes);
```

Afterwards, we setup a translation loader for our feature module we'll lazy load.

```ts
import { MultiTranslationHttpLoader } from '@studiohyperdrive/ngx-i18n';

export function FeatureTranslationLoader(http: HttpBackend) {
	return new MultiTranslationHttpLoader(http, ['./assets/i18n/shared/', './assets/i18n/feature']);
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
			canActivate: [TranslationLoaderGuard],
		},
		TestTranslationLoader
	)
];
```
