# normalizeString

The normalizeString helper will replace all special characters to their normal counterparts

## How to use

```typescript
import { normalizeString } from '@studiohyperdrive/utils';

const result = normalizeString('áéíóúý ÁÉÍÓÚÝ aeiuc');

// result = 'aeiouy AEIOUY aeiuc'
```
