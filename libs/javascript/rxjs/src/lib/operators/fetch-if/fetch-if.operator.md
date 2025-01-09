# fetchIf

`fetchIf` is an operator that will search for a value through a provided source, and if the value is can be found, will return it. If the value cannot be found, the provided fetch method will be run and the result of said method will be returned.

Aside from a source observable, the `fetchIf` method requires a `search` function that will be used to search for the requested value and a `fetch` function that will be run when the `search` returns `undefined`.

A common use-case for `fetchIf` is to check whether a property already exists within the current state of the application, and when not found it can use an API call to fetch it instead.

## How to use

```typescript
import { fetchIf } from '@studiohyperdrive/rxjs-utils';
import { of } from 'rxjs';

fetchIf(
	of([{ id: 'hello' }]),
	(data) => data.find((item) => item.id === 'world'),
	() => of({ id: 'world' })
).subscribe((result) => {
	// => result: {id: 'world'}
});
```

```typescript
import { fetchIf } from '@studiohyperdrive/rxjs-utils';
import { of } from 'rxjs';

fetchIf(
	of([{ id: 'hello' }]),
	(data) => data.find((item) => item.id === 'world'),
	(data) => of([...data, { id: 'world' }])
).subscribe((result) => {
	// => result: [{id: 'hello' }, {id: 'world'}]
});
```
