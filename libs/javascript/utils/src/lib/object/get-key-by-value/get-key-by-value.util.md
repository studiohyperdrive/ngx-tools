# getKeyByValue

The getKeyByValue helper function will search for a key within an object, based on the provided value.

This function should work with both plain objects and enums.

It will return the first key found. If a value exists more than once,  
it will only return the key of the first corresponding value.

## How to use

```typescript
import { getKeyByValue } from '@studiohyperdrive/utils';

const result = getKeyByValue(
	{
		thisKey: 'value',
		notThisKey: 'other value',
	},
	'value'
);

// result = 'thisKey;
```
