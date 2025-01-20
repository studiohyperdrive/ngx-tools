# searchValueForSome

The searchValueForSome helper searches a given value for potential matches.
By default the search will be done normalized and case-insensitive, although it is possible to search not normalized or case-sensitive.

The searchTerm will be split into multiple pieces based on space in order to match **any** given part of the searchTerm itself

## How to use

### Search for multiple parts

```typescript
import { searchValueForSome } from '@studiohyperdrive/utils';

let result = searchValueForSome('some random válue', 'some');
// result = true

result = searchValueForSome('some random válue', 'a Z X');
// result = true

result = searchValueForSome('some random válue', 'nothing to match');
// result = false

result = searchValueForSome('some random válue', 'random match');
// result = true
```

### Normalized and case-insensitive

```typescript
import { searchValueForSome } from '@studiohyperdrive/utils';

let result = searchValueForSome('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'a');
// result = true

result = searchValueForSome('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'A');
// result = true

result = searchValueForSome('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'á');
// result = true

result = searchValueForSome('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'Á');
// result = true
```

### Normalized and case-sensitive

```typescript
import { searchValueForSome } from '@studiohyperdrive/utils';

let result = searchValueForSome('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'a', true, false);
// result = true

result = searchValueForSome('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'A', true, false);
// result = false

result = searchValueForSome('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'á', true, false);
// result = true

result = searchValueForSome('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'Á', true, false);
// result = false
```

### Not normalized and case-insensitive

```typescript
import { searchValueForSome } from '@studiohyperdrive/utils';

let result = searchValueForSome('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'a', false, true);
// result = false

result = searchValueForSome('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'A', false, true);
// result = false

result = searchValueForSome('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'á', false, true);
// result = true

result = searchValueForSome('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'Á', false, true);
// result = true
```

### Not normalized and case-sensitive

```typescript
import { searchValueForSome } from '@studiohyperdrive/utils';

let result = searchValueForSome('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'a', false, false);
// result = false

result = searchValueForSome('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'A', false, false);
// result = false

result = searchValueForSome('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'á', false, false);
// result = true

result = searchValueForSome('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'Á', false, false);
// result = false
```

# searchValueForEvery

The searchValueForEvery helper searches a given value for potential matches.
By default the search will be done normalized and case-insensitive, although it is possible to search not normalized or case-sensitive.

The searchTerm will be split into multiple pieces based on space in order to match **every** given part of the searchTerm itself

## How to use

### Search for multiple parts

```typescript
import { searchValueForEvery } from '@studiohyperdrive/utils';

let result = searchValueForEvery('some random válue', 'some');
// result = true

result = searchValueForEvery('some random válue', 'a Z X');
// result = false

result = searchValueForEvery('some random válue', 'nothing to match');
// result = false

result = searchValueForEvery('some random válue', 'random match');
// result = false
```

### Normalized and case-insensitive

```typescript
import { searchValueForEvery } from '@studiohyperdrive/utils';

let result = searchValueForEvery('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'a');
// result = true

result = searchValueForEvery('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'A');
// result = true

result = searchValueForEvery('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'á');
// result = true

result = searchValueForEvery('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'Á');
// result = true
```

### Normalized and case-sensitive

```typescript
import { searchValueForEvery } from '@studiohyperdrive/utils';

let result = searchValueForEvery('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'a', true, false);
// result = true

result = searchValueForEvery('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'A', true, false);
// result = false

result = searchValueForEvery('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'á', true, false);
// result = true

result = searchValueForEvery('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'Á', true, false);
// result = false
```

### Not normalized and case-insensitive

```typescript
import { searchValueForEvery } from '@studiohyperdrive/utils';

let result = searchValueForEvery('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'a', false, true);
// result = false

result = searchValueForEvery('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'A', false, true);
// result = false

result = searchValueForEvery('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'á', false, true);
// result = true

result = searchValueForEvery('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'Á', false, true);
// result = true
```

### Not normalized and case-sensitive

```typescript
import { searchValueForEvery } from '@studiohyperdrive/utils';

let result = searchValueForEvery('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'a', false, false);
// result = false

result = searchValueForEvery('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'A', false, false);
// result = false

result = searchValueForEvery('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'á', false, false);
// result = true

result = searchValueForEvery('áéíóúýàèìòùâêîôûäëïöüÿãñõç', 'Á', false, false);
// result = false
```
