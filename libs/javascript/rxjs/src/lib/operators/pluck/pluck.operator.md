# pluck

Selects a property from the provided Observable value and emits the property

## How to use

```typescript
import { pluck } from '@studiohyperdrive/rxjs-utils';
import { of } from 'rxjs';

of({ name: 'World', firstName: 'Hello' })
	.pipe(pluck('name'))
	.subscribe((result) => {
		// => result: World
	});
```
