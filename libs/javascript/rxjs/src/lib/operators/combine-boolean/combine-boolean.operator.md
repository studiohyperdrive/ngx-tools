# combineBooleans

Combines a series of ObservableBooleans using 'AND' and returns a single ObservableBoolean.

It expects an array of `Observable<boolean>`.

## How to use

```typescript
import { combineBooleans } from '@studiohyperdrive/rxjs-utils';
import { of } from 'rxjs';

combineBooleans([of(true), of(false)]).subscribe((result) => {
	// => result: true
});
```
