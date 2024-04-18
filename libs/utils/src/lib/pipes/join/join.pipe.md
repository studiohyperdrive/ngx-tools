# JoinPipe

The JoinPipe will join values in an array.

This pipe assumes the provided value to be of type `Array<string>`.

For example
`['a', 'b', 'c']` will format to `abc`.

## How to use

```angular2html
<span>
  {{ array | join }}
</span>
```
