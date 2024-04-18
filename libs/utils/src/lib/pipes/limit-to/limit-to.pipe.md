# LimitToPipe

The LimitToPipe will limit an array to x-amount of values.

For example
`['a', 'b', 'c']` with a value of 2 will result in `['a', 'b']`.

A non-Array value will result in an empty array.

## How to use

```angular2html
<span>
  {{ array | limitTo: 2 }}
</span>
```
