---
keyword: HighlightPipePage
---

The HighlightPipe will select a piece of text and wrap it in a new element.

When no selector is provided, it will be wrapped in a `<mark>` element.

## How to use

    {{ NgDocActions.demo("HighlightPipeDemoComponent") }}

If the provided value is `In this p there is a text to highlight.` it will result in the following structure:

```html
<p>In this p there is a <mark>text to highlight</mark>.</p>
```

To use a different wrapping element, do the following:

    {{ NgDocActions.demo("HighlightPipeCustomDemoComponent") }}

Will result in:

```html
<p>In this p there is a <strong>text to highlight</strong>.</p>
```
