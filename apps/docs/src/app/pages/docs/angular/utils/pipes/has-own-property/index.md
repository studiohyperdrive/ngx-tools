---
keyword: HasOwnPropertyPage
---

The HasOwnProperty checks whether the specified property exists within the given object.  
It is a wrapper around Object.hasOwnProperty.

## Example

Checkable array :

```typescript
const sourceObject = { property: 'test' };
```

{{ NgDocActions.playground("HasOwnPropertyPipePlayground") }}

## How to use

{{ NgDocActions.demo("HasOwnPropertyPipeDemoComponent", { expanded: true }) }}
