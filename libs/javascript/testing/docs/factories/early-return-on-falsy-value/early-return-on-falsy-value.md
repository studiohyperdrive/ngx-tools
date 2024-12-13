# earlyReturnOnFalsyValue

The earlyReturnOnFalsyValue testing factory will check if a provided falsy argument returns in an early return (undefined).

This function should work with Karma, Jest & Vitest.

## How to use

```typescript
// Default case
const testFunction = (value: unknown[]) => {
	if (!value) {
		return;
	}

	return value;
};

describe('testfunction', () => {
	// Other test cases

	it('should result in undefined on a falsy value', earlyReturnOnFalsyValue(testFunction));
});

// With a specific return value
const testFunctionWithReturnValue = (value: unknown[]) => {
	if (!value) {
		return false;
	}

	return value;
};

describe('testfunction', () => {
	// Other test cases

	it('should result in false on a falsy value', earlyReturnOnFalsyValue(testFunction, false));
});
```
