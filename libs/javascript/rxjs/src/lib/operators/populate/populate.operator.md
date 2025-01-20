# populate

Populates the missing values within data provided by observables provided in a key-based record.

It expects a record of Observables that match with the keys of the object. An optional matching function can be presented to define when data should be populated

## How to use

```typescript
import { populate } from '@studiohyperdrive/rxjs-utils';
import { of } from 'rxjs';

of({ hello: 'world' })
	.pipe(
		populate({
			world: () => of('hello'),
			'foo.bar': (data) => of(data.hello),
		})
	)
	.subscribe((result) => {
		// => result: {hello: 'world', world: 'hello', foo: {bar: 'world'}}
	});
```
