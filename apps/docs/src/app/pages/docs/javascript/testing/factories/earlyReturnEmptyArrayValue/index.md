---
keyword: earlyReturnEmptyArrayValuePage
---

The earlyReturnEmptyArrayValue testing factory will check if a provided non-array or empty array argument returns in an early return with empty array.

This function should work with Karma, Jest & Vitest.

## How to use

```typescript
const testFunction = (value: unknown[]) => {
	if (!value) {
		return [];
	}

	return value;
};

describe('testfunction', () => {
	// Other test cases

	it('should result in an empty array on a falsy value', earlyReturnEmptyArrayValue(testFunction));
});
```
