# Array Operators

`rxjs-utils` provides a series of common array operators as operators for ObservableArrays.

These are analogue to the existing array operators.

## mapArray

```typescript
import { mapArray } from '@studiohyperdrive/rxjs-utils';

of(['a', 'b'])
	.pipe(mapArray((item) => ({ item })))
	.subscribe((result) => {
		// => result: [{item: 'a'}, {item: 'b'}]
	});
```

## sliceArray

```typescript
import { sliceArray } from '@studiohyperdrive/rxjs-utils';

of(['a', 'b', 'c'])
	.pipe(sliceArray(0, 2))
	.subscribe((result) => {
		// => result: ['a', 'b']
	});
```

## sortArray

```typescript
import { sortArray } from '@studiohyperdrive/rxjs-utils';

of(['a', 'c', 'b'])
	.pipe(sortArray((a, b) => a.localeCompare(b)))
	.subscribe((result) => {
		// => result: ['a', 'b', 'c']
	});
```
