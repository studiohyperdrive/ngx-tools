# catchAndCallThrough

The catchAndCallThrough operator will enrich the catchError operator with a return of the error.

It expects a callback function.

## How to use

```typescript
import { catchAndCallThrough } from '@studiohyperdrive/rxjs-utils';
import { throwError } from 'rxjs';

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

An optional `handle` can be passed which can be `'complete'`, `'throw'` or `'continue'` and will default to `'continue'`:

```typescript
import { catchAndCallThrough } from '@studiohyperdrive/rxjs-utils';
import { throwError } from 'rxjs';

of(throwError('Something went wrong'))
	.pipe(
		catchAndCallThrough((error) => {
			console.log({ error });
		}, 'throw'),
		catchError((error) => {
			// This catchError will be triggered.
		})
	)
	.subscribe(() => {
		// The subscription will not be triggered.
	});
```
