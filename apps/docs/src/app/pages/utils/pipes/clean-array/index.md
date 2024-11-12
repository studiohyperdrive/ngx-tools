---
keyword: CleanArrayPipePage
---

The CleanArrayPipe will remove all falsy values from the provided array.

It is possible to retain certain falsy values, by providing the pipe with an exception array.

For example

```ts
[true, 10, false, null, 'string'];
```

will format to:

```ts
[true, 10, 'string'];
```

Watch out for the often forgotten truthy values `[]` and `{}`.

## How to use

{{ NgDocActions.demo("CleanArrayPipeDemoComponent") }}
