# validateContent

The following custom operator can be used to validate if content in the stream is valid.

It will, by default, check for `null` or `undefined`.
If strict is set to `false`, it will also allow falsy content to pass the check.

A `customValidatorFn` can be passed which will overwrite the internal checks with custom validation logic.

## How to use

### Strict

```typescript
import { validateContent } from '@studiohyperdrive/rxjs-utils';
import { of } from 'rxjs';

of(undefined)
	.pipe(validateContent())
	.subscribe((result) => {
		// => will not be triggered
	});

of(0)
	.pipe(validateContent())
	.subscribe((result) => {
		// => will be triggered
	});
```

### Non-strict

```typescript
import { validateContent } from '@studiohyperdrive/rxjs-utils';
import { of } from 'rxjs';

of(undefined)
	.pipe(validateContent({ strict: false }))
	.subscribe((result) => {
		// => will not be triggered
	});

of(0)
	.pipe(validateContent({ strict: false }))
	.subscribe((result) => {
		// => will not be triggered
	});
```

### With custom comparator

The `strict` flag will be ignored when adding a `customValidatorFn`.

```typescript
import { validateContent } from '@studiohyperdrive/rxjs-utils';
import { of } from 'rxjs';

of(0)
	.pipe(
		validateContent({}, (value: number): boolean => {
			return value === 2;
		})
	)
	.subscribe((result) => {
		// => will not be triggered
	});

of(2)
	.pipe(
		validateContent({}, (value: number): boolean => {
			return value === 2;
		})
	)
	.subscribe((result) => {
		// => will be triggered
	});
```
