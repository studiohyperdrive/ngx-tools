---
keyword: IntroductionPage
---

This library provides a lazy-loaded modular approach to translations.

`ngx-1i8n` is a layer on top of `ngx-translate` that allows for a lazy-loaded modular approach to translations. This approach allows the user to split up the translations into several independent files, which can be lazy-loaded whenever they're needed.

This approach only works for module-based projects. There is currently no support for standalone-components.

## Modular

In order for a modular translation system, we provide a `TranslationLoader` to each `forChild` method of the `NgxI18nModule`. This loader uses a similar approach as @rbalet's [MultiTranslateHttpLoader](https://github.com/rbalet/ngx-translate-multi-http-loader).

Using an array of source paths, the translation loader loads in only the provided translations. If one of the assets has previously been loaded by a different module, the translation will be fetched from the cache.

```ts
import { NgxI18nMultiTranslationHttpLoader } from '@studiohyperdrive/ngx-i18n';

export function ExampleTranslationLoader(http: HttpBackend) {
	return new NgxI18nMultiTranslationHttpLoader(http, ['./path-to-translation/']);
}
```

If no custom `TranslationLoader` is provided, than the module will use a fall-back loader which has a default array of paths that can be set in the config file.

## Lazy-loaded

In order to provide a lazy loaded translation system, the translations only get loaded when routing to a specific route.

For this purpose we've provided a `NgxI18nTranslationLoaderGuard` which will automatically fetch all translations when the application routes to this route.

At any given time you can query the `NgxI18nLoadingService` to see whether the translations have been loaded into the application. There are two Observables provided, being `translationsLoading$` and `translationsFailed$`;
