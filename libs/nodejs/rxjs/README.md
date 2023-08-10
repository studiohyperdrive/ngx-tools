# RxJS Utilities (`@studiohyperdrive/rxjs-utils`)

Install the package first:
```shell
npm install @studiohyperdrive/rxjs-utils
```

## 1. Operators

A set of custom operators.

### catchAndCallThrough
An operator that wraps around the default `catchError` and returns a new observable with the error to continue the stream.

### combineBoolean
An operator that wraps around the default `combineLatest` and returns a boolean to indicate that all streams have values.

### pluck
An operator that is a custom implementation of the RxJS version, the original one is deprecated in favour of map.

### pluckOr
An operator that will pluck a value based on its existence, with a list of property names in case the property is empty.

### validateContent
An operator that wraps around the default `filter` and returns a boolean depending on the existence of a value in the stream.

## 2. Types

### Observables
A collection of types that extend the default Observable interface.

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
