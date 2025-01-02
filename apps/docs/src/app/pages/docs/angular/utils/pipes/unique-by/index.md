---
keyword: UniqByPipePage
---

The UniqByPipe will perform a uniqBy (Lodash) operation on a provided array.

A non-Array value will result in an empty array.

## Example

Checkable array :

```typescript
const array = [
    { prop1: 'a', prop2: true },
    { prop1: 'a', prop2: false },
    { prop1: 'b', prop2: true },
];
```

{{ NgDocActions.playground("UniqueByPipePlayground") }}

## How to use

    {{ NgDocActions.demo("UniqueByPipeDemoComponent", { expanded: true } ) }}
