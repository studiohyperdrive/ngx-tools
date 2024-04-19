# TransformPipe

The TransformPipe will transform a given value with the provided transform-function.

## How to use

```angular2html
<span>
  {{ value | transform: toUpperCase }}
</span>
```

With a given value `'my text'`, will result in the following:

```html
<span>MY TEXT</span>
```
