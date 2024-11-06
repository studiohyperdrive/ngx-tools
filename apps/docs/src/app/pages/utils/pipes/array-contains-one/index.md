---
keyword: ArrayContainsOnePipePage
---

The ArrayContainsOnePipe will check if there is at least one object in an array that has provided properties.

## Example

Checkable array :

```typescript
const array = [
	{ title: 'This is the title', description: 'This is the description' },
	{ title: 'This is the title' },
];
```

{{ NgDocActions.playground("ArrayContainsOnePipePlayground") }}

## How to use

{{ NgDocActions.demo("ArrayContainsOnePipeDemoComponent", {expanded: true}) }}
