# Angular Tools: Utils (`@studiohyperdrive/ngx-utils`)

This library provides several independent utilities to facilitate common use-cases for users and developers.

## Installation

Install the package first:

```shell
npm install @studiohyperdrive/ngx-utils
```

## Versioning and build information

This package will follow a semver-like format, `major.minor.patch`, in which:

- `major`: Follows the Angular major version
- `minor`: Introduces new features and (potential) breaking changes
- `patch`: Introduces bugfixes and minor non-breaking changes

For more information about the build process, authors, contributions and issues, we refer to the [ngx-tools](https://github.com/studiohyperdrive/ngx-tools) repository.

## Concept

The `ngx-utils` package seeks to provide easy to use and to customize solutions to common use-cases. Each of these solutions can be used independently and are meant to enhance both the developer and the user experience of the application.

This package comes with a wide array of pipes, directives, services, types and abstracts. New implementations are added on a regular basis.

## Implementation

### Directives

#### FocusClickDirective

The FocusClickDirective provides an a11y friendly click handler.

[Full documentation.](src/lib/directives/focus-click/focus-click.directive.md)

### Injects

#### getQueryParams

The getQueryParams helper will get query params from the ActivatedRoute and return them as an observable.

[Full documentation.](src/lib/injects/query-params/query-params.inject.md)

### Pipes

#### BtwPipe

The BtwPipe will format Belgian VAT numbers.

[Full documentation.](src/lib/pipes/btw/btw.pipe.md)

#### EntriesPipe

The BtwPipe will transform an object in to an array of key/value arrays.

[Full documentation.](src/lib/pipes/entries/entries.pipe.md)

#### HasObserversPipe

The HasObserversPipe will check if an Output property has observers.

[Full documentation.](src/lib/pipes/has-observers/has-observers.pipe.md)

#### hasOwnProperty

The hasOwnProperty will check whether the specified property exists within the given object.

[Full documentation.](src/lib/pipes/has-own-property/has-own-property.pipe.md)

#### HasValuesPipe

The HasValuesPipe will check if a provided object has values.

[Full documentation.](src/lib/pipes/has-values/has-values.pipe.md)

#### HighlightPipe

The HighlightPipe will select a piece of text and wrap it in a new element.

[Full documentation.](src/lib/pipes/highlight/highlight.pipe.md)

#### IbanPipe

The IbanPipe will format an IBAN number.

[Full documentation.](src/lib/pipes/iban/iban.pipe.md)

#### IsNotEmptyPipe

The IsNotEmptyPipe will check if a given argument is an object or array and if it is empty.

[Full documentation.](src/lib/pipes/is-not-empty/is-not-empty.pipe.md)

#### JoinPipe

The JoinPipe will join values in an array.

[Full documentation.](src/lib/pipes/join/join.pipe.md)

#### LimitToPipe

The LimitToPipe will limit an array to x-amount of values.

[Full documentation.](src/lib/pipes/limit-to/limit-to.pipe.md)

#### LogPipe

The LogPipe will print the provided value to the console, it will not render the value on the page itself.

[Full documentation.](src/lib/pipes/log/log.pipe.md)

#### MergeArraysPipe

The MergeArraysPipe is a wrapper around the JS native Array.concat with some added safety.

[Full documentation.](src/lib/pipes/merge-arrays/merge-arrays.pipe.md)

#### SafeHtmlPipe

The SafeHtmlPipe will sanitize a given value with the DomSanitizer.

[Full documentation.](src/lib/pipes/safe-html/safe-html.pipe.md)

#### StripHtmlPipe

The StripHtmlPipe will strip HTML from a given value.

[Full documentation.](src/lib/pipes/strip-html/strip-html.pipe.md)

#### ToArrayPipe

The ToArrayPipe will check if a value is defined and then wrap it in a new array before returning it.

[Full documentation.](src/lib/pipes/to-array/to-array.pipe.md)

#### TransformPipe

The TransformPipe will transform a given value with the provided transform-function.

[Full documentation.](src/lib/pipes/transform/transform.pipe.md)

#### TruncateTextPipe

The TruncateTextPipe will truncate a given text to a given number of characters and suffix it with an ellipsis.

[Full documentation.](src/lib/pipes/truncate-text/truncate-text.pipe.md)

#### UniqByPipe

The UniqByPipe will execute the uniqBy function (Lodash) on a provided array.

[Full documentation.](src/lib/pipes/truncate-text/truncate-text.pipe.md)

#### WithRouterLinksPipe

The withRouterLinks pipe will provide a way to transform a string that contains one or more parts that need a routerLink by taking advantage of Angular web components.

[Full documentation.](src/lib/pipes/with-router-links/with-router-links.md)

#### NgxReplaceElementsPipe

The ngxReplaceElements pipe will provide a way to transform a string that contains one or more parts that need an Angular component by taking advantage of Angular web components.

[Full documentation.](src/lib/pipes/replace-elements/replace-elements.pipe.md)

### Services

#### Window service

This service uses the `DOCUMENT` injection-token to provide several methods to access both document and window and related information.
It is convenient for using the document or window without breaking SSR.

[Full documentation.](src/lib/services/window-service/window.service.md)

#### subscription service

This service is a solution to end RxJS subscriptions when component is destroyed.

[Full documentation.](src/lib/services/subscription-service/subscription.service.md)

#### NgxStorageService

This service provides a SSR proof Observable based approach to both the local- and the sessionStorage.

[Full documentation.](src/lib/services/storage-service/storage.service.md)

#### NgxMediaQueryService

This service provides a SSR proof way to set and subscribe to the window's media query changes.

[Full documentation.](src/lib/services/media-query/query.service.md)

### Abstracts

#### NgxQueryParamFormSyncComponent

This abstract component provides a way to sync the queryParams with a reactive form. This is ideal to handle filtered views, as it automatically syncs selected filters with the url.

[Full documentation.](src/lib/abstracts/query-param-form-sync/query-param-form-sync.component.abstract.md)
