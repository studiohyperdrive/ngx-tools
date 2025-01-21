# stringComparator

The stringComparator helper compares two strings alphabetically using localeCompare.

Non-String values will result in `-1`.

## How to use

### With String source

```typescript
import { stringComparator } from '@studiohyperdrive/utils';

const result = stringComparator('b', 'a');

// result = 1
```

### With Object source

```typescript
import { stringComparator } from '@studiohyperdrive/utils';

const result = stringComparator({ source: 'b' }, 'b', 'source');

// result = 0
```

### With non-String source

```typescript
import { stringComparator } from '@studiohyperdrive/utils';

const result = stringComparator({ source: undefined }, 'b', 'source');

// result = -1
```
