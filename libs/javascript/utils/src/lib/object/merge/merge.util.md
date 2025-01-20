# merge

Merges all provided values into a single Object, as long as the value is defined.

It requires a start Object to merge the remaining properties in.

## How to use

```typescript
import { merge } from '@studiohyperdrive/utils';

interface Example {
	id: string;
	books?: string[];
	user?: User;
	metaData?: MetaData;
}

const metaData = undefined;
const books = ['Hello world', 'Java: How To Program'];
const user = {};

merge(
	{
		id: 'test',
	},
	['books', books],
	['user', { name: user?.userName }],
	['metaData', metaData]
);

// => result: {id: 'test', books: ['Hello world', 'Java: How To Program']}
```
