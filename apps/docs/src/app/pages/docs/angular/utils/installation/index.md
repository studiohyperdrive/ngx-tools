---
keyword: InstallationPage
---

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

#### `*FocusClickDirectivePage`

The FocusClickDirective provides an a11y friendly click handler.

### Injects

#### `*getQueryParamsInjectPage`

The getQueryParams helper will get query params from the ActivatedRoute and return them as an observable.

### Pipes

#### `*BtwPipePage`

The BtwPipe will format Belgian VAT numbers.

#### `*EntriesPipePage`

The BtwPipe will transform an object in to an array of key/value arrays.

#### `*HasObserversPipePage`

The HasObserversPipe will check if an Output property has observers.

#### `*HasOwnPropertyPage`

The hasOwnProperty will check whether the specified property exists within the given object.

#### `*HasValuesPipePage`

The HasValuesPipe will check if a provided object has values.

#### `*NgxHighlightPipePage`

The NgxHighlightPipe will select a piece of text and wrap it in a new element.

#### `*IbanPipePage`

The IbanPipe will format an IBAN number.

#### `*IsNotEmptyPipePage`

The IsNotEmptyPipe will check if a given argument is an object or array and if it is empty.

#### `*JoinPipePage`

The JoinPipe will join values in an array.

#### `*LimitToPipePage`

The LimitToPipe will limit an array to x-amount of values.

#### `*LogPipePage`

The LogPipe will print the provided value to the console, it will not render the value on the page itself.

#### `*MergeArraysPipePage`

The MergeArraysPipe is a wrapper around the JS native Array.concat with some added safety.

#### `*SafeHtmlPipePage`

The SafeHtmlPipe will sanitize a given value with the DomSanitizer.

#### `*StripHtmlPipePage`

The StripHtmlPipe will strip HTML from a given value.

#### `*ToArrayPipePage`

The ToArrayPipe will check if a value is defined and then wrap it in a new array before returning it.

#### `*TransformPipePage`

The TransformPipe will transform a given value with the provided transform-function.

#### `*TruncateTextPipePage`

The TruncateTextPipe will truncate a given text to a given number of characters and suffix it with an ellipsis.

#### `*UniqByPipePage`

The UniqByPipe will execute the uniqBy function (Lodash) on a provided array.

#### `*WithRouterLinksPipePage`

The withRouterLinks pipe will provide a way to transform a string that contains one or more parts that need a routerLink by taking advantage of Angular web components.

#### `*NgxReplaceElementsPipePage`

The ngxReplaceElements pipe will provide a way to transform a string that contains one or more parts that need an Angular component by taking advantage of Angular web components.

### Services

#### `*NgxWindowServicePage`

This service uses the `DOCUMENT` injection-token to provide several methods to access both document and window and related information.
It is convenient for using the document or window without breaking SSR.

#### `*NgxSubscriptionServicePage`

This service is a solution to end RxJS subscriptions when component is destroyed.

#### `*NgxStorageServicePage`

This service provides a SSR proof Observable based approach to both the local- and the sessionStorage.

#### `*NgxMediaQueryServicePage`

This service provides a SSR proof way to set and subscribe to the window's media query changes.

#### `*NgxBroadcastChannelServicePage`

This service provides a SSR proof way to create channels for the BroadcastChannel API, post messages on those channels and subscribe to the events.

### Abstracts

#### `*NgxQueryParamFormSyncComponentPage`

This abstract component provides a way to sync the queryParams with a reactive form. This is ideal to handle filtered views, as it automatically syncs selected filters with the url.
