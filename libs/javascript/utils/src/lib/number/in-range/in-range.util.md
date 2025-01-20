# inRange

Checks if the provided value is in range of the provided minimum and maximum value.

If no maximum value is provided, it will check if it is smaller than the provided minimum value
If the maximum value is smaller than the provided minimum value, it will switch the both values.

## How to use

```typescript
import { inRange } from '@studiohyperdrive/utils';

let result = inRange(3, 1, 10);
// => result: true

result = inRange(3, 10);
// => result: true

result = inRange(3, 10, 1);
// => result: true

result = inRange(30, 10);
// => result: false
```
