# catchAndCallThrough

The catchAndCallThrough operator will enrich the catchError operator with a return of the error.

It expects a callback function.

## How to use

```typescript
import { catchAndCallThrough } from "@studiohyperdrive/rxjs-utils";
import { throwError } from "rxjs";

of(throwError('Something went wrong'))
  .pipe(
    catchAndCallThrough((error) => {
        console.log({ error });
    })
  )
  .subscribe(() => {
    // The subscription will still be triggered.
  });
```
