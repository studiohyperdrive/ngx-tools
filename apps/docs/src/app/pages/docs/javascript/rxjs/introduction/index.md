---
keyword: IntroductionPage
---

## Operators

A set of custom operators.

### `*catchAndCallThroughPage`

An operator that wraps around the default `catchError` and returns a new observable with the error to continue the stream.

### `*combineBooleanPage`

An operator that wraps around the default `combineLatest` and returns a boolean to indicate that all streams have values.

### `*populatePage`

An operator that will populate provided values in an observable, if the provided values are empty or match with a populateIf function.

### `*fetchIfPage`

An operator that will return a value from an observable source when present or fetch it when not.

### `*pluckPage`

An operator that is a custom implementation of the RxJS version, the original one is deprecated in favour of map.

### `*pluckOrPage`

An operator that will pluck a value based on its existence, with a list of property names in case the property is empty.

### `*validateContentPage`

An operator that wraps around the default `filter` and returns a boolean depending on the existence of a value in the stream.

## `*ObservableTypesPage`

A collection of types that extend the default Observable interface.
