---
keyword: HighlightPipePage
---

The HighlightPipe will select a piece of text and wrap it in a new element.

When no selector is provided, it will be wrapped in a `<mark>` element.

> **Note**
> We will not validate whether or not the provided selector is a valid element

## Example

Checkable text :

```typescript
const text = 'In this p there is a text to highlight.';
```

{{ NgDocActions.playground("HighlightPipePlayground") }}

## How to use

{{ NgDocActions.demo("HighlightPipeDemoComponent", { expanded: true }) }}

To use a different wrapping element, do the following:

{{ NgDocActions.demo("HighlightPipeCustomDemoComponent", { expanded: true }) }}
