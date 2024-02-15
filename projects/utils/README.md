# Angular Tools: Utils (`@studiohyperdrive/ngx-utils`)

Install the package first:
```shell
npm install @studiohyperdrive/ngx-utils
```
## Directives
### FocusClickDirective
The FocusClickDirective provides an a11y friendly click handler.

[Full documentation.](src/lib/directives/focus-click/focus-click.directive.md)

## Injects
### getQueryParams
The getQueryParams helper will get query params from the ActivatedRoute and return them as an observable.

[Full documentation.](src/lib/injects/query-params/query-params.inject.md)

## Pipes
### BtwPipe
The BtwPipe will format Belgian VAT numbers.

[Full documentation.](src/lib/pipes/btw/btw.pipe.md)

### EntriesPipe

The BtwPipe will transform an object in to an array of key/value arrays.

[Full documentation.](src/lib/pipes/entries/entries.pipe.md)

### HasObserversPipe

The HasObserversPipe will check if an Output property has observers.

[Full documentation.](src/lib/pipes/has-observers/has-observers.pipe.md)

### hasOwnProperty

The hasOwnProperty will check whether the specified property exists within the given object.

[Full documentation.](src/lib/pipes/has-own-property/has-own-property.pipe.md)

### HasValuesPipe

The HasValuesPipe will check if a provided object has values.

[Full documentation.](src/lib/pipes/has-values/has-values.pipe.md)

### HighlightPipe

The HighlightPipe will select a piece of text and wrap it in a new element.

[Full documentation.](src/lib/pipes/highlight/highlight.pipe.md)

### IbanPipe

The IbanPipe will format an IBAN number.

[Full documentation.](src/lib/pipes/iban/iban.pipe.md)

### IsNotEmptyPipe

The IsNotEmptyPipe will check if a given argument is an object or array and if it is empty.

[Full documentation.](src/lib/pipes/is-not-empty/is-not-empty.pipe.md)

### JoinPipe

The JoinPipe will join values in an array.

[Full documentation.](src/lib/pipes/join/join.pipe.md)

### LimitToPipe

The LimitToPipe will limit an array to x-amount of values.

[Full documentation.](src/lib/pipes/limit-to/limit-to.pipe.md)

### LogPipe

The LogPipe will print the provided value to the console, it will not render the value on the page itself.

[Full documentation.](src/lib/pipes/log/log.pipe.md)

### MergeArraysPipe

The MergeArraysPipe is a wrapper around the JS native Array.concat with some added safety.

[Full documentation.](src/lib/pipes/merge-arrays/merge-arrays.pipe.md)

### SafeHtmlPipe

The SafeHtmlPipe will sanitize a given value with the DomSanitizer.

[Full documentation.](src/lib/pipes/safe-html/safe-html.pipe.md)

### StripHtmlPipe

The StripHtmlPipe will strip HTML from a given value.

[Full documentation.](src/lib/pipes/strip-html/strip-html.pipe.md)

### ToArrayPipe

The ToArrayPipe will check if a value is defined and then wrap it in a new array before returning it.

[Full documentation.](src/lib/pipes/to-array/to-array.pipe.md)

### TransformPipe

The TransformPipe will transform a given value with the provided transform-function.

[Full documentation.](src/lib/pipes/transform/transform.pipe.md)

### TruncateTextPipe

The TruncateTextPipe will truncate a given text to a given number of characters and suffix it with an ellipsis.

[Full documentation.](src/lib/pipes/truncate-text/truncate-text.pipe.md)

### UniqByPipe

The UniqByPipe will execute the uniqBy function (Lodash) on a provided array.

[Full documentation.](src/lib/pipes/truncate-text/truncate-text.pipe.md)

### WithRouterLinksPipe

The withRouterLinks pipe will provide a way to transform a string that contains one or more parts that need a routerLink by taking advantage of Angular web components.

[Full documentation.](src/lib/pipes/with-router-links/with-router-links.md)

## Services
### 1. Window service
This service uses the `DOCUMENT` injection-token to provide several methods to access both document and window and related information.
It is convenient for using the document or window without breaking SSR.

[Full documentation.](src/lib/services/window-service/window.service.md)

### 2. subscription service
This service is a solution to end RxJS subscriptions when component is destroyed.

[Full documentation.](src/lib/services/subscription-service/subscription.service.md)

## build information
This project has been build with:
- Angular CLI : `16.1.4`
- Angular: `16.1.5`
- nodejs: `18.17.0`
- npm: `9.6.7`

For a complete list of packages and version check out the `package.json` file.

## Team

This bundle of tools has been created and is maintained by [Studio Hyperdrive](https://studiohyperdrive.be).

Contributors:
- Axelle Vanden Eynde
- Benoît Dossoine
- [Denis Valcke](https://github.com/DenisValcke)
- [Iben Van de Veire](https://github.com/IbenTesara)
- [Jasper De Smet](https://github.com/jsprds)
- [Pieterjan Van Saet](https://github.com/HybridFox)
- [Wouter Heirstrate](https://github.com/WHeirstrate)
