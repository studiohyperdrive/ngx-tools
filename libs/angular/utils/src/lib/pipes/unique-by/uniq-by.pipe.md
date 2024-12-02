# UniqByPipe

The UniqByPipe will perform a uniqBy (Lodash) operation on a provided array.

For example
`[{ prop1: 'a', prop2: true }, { prop1: 'a', prop2: false }, { prop1: 'b', prop2: true }]` with the key set to 'prop1' will result in `[{ prop1: 'a', prop2: true }, { prop1: 'b', prop2: true }]`.

A non-Array value will result in an empty array.

## How to use

```angular2html
<span>
  {{ array | uniqBy: 'prop1' }}
</span>
```
