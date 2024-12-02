# TruncateTextPipe

The TruncateTextPipe will truncate a given text to a given number of characters and suffix it with an ellipsis.

It assumes that the provided value is a string.

## How to use

```angular2html
<span>
  {{ value | truncateText: 10 }}
</span>
```

With a given value `'long text that will need to be cut at 10 characters.'`, will result in the following:

```html

```
