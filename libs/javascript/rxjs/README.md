# RxJS Utilities (`@studiohyperdrive/rxjs-utils`)

Install the package first:
```shell
npm install @studiohyperdrive/rxjs-utils
```

## 1. Operators

A set of custom operators.

### catchAndCallThrough
An operator that wraps around the default `catchError` and returns a new observable with the error to continue the stream.

[Full documentation.](./docs/operators/catch-and-call-through/catch-and-call-through.operator.md)

### combineBoolean
An operator that wraps around the default `combineLatest` and returns a boolean to indicate that all streams have values.

[Full documentation.](./docs/operators/combine-boolean/combine-boolean.operator.md)


### populate
An operator that will populate provided values in an observable, if the provided values are empty or match with a populateIf function.

[Full documentation.](./docs/operators/populate/populate.operator.md)

### fetchIf
An operator that will return a value from an observable source when present or fetch it when not.

[Full documentation.](./docs/operators/fetch-if/fetch-if.operator.md)

### pluck
An operator that is a custom implementation of the RxJS version, the original one is deprecated in favour of map.

[Full documentation.](./docs/operators/pluck/pluck.operator.md)

### pluckOr
An operator that will pluck a value based on its existence, with a list of property names in case the property is empty.

[Full documentation.](./docs/operators/pluck-or/pluck-or.operator.md)

### validateContent
An operator that wraps around the default `filter` and returns a boolean depending on the existence of a value in the stream.

[Full documentation.](./docs/operators/validate-content/validate-content.operator.md)

## 2. Types

### Observables
A collection of types that extend the default Observable interface.

[Full documentation.](./docs/types/observable/observable.types.md)

## build information
This project has been build with:
- nodejs: `18.17.0`
- npm: `9.6.7`

For a complete list of packages and version check out the `package.json` file.

## Team

This bundle of tools has been created and is maintained by [Studio Hyperdrive](https://studiohyperdrive.be).

Contributors:
- [Denis Valcke](https://github.com/DenisValcke)
- [Iben Van de Veire](https://github.com/IbenTesara)
- [Wouter Heirstrate](https://github.com/WHeirstrate)
