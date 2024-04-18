# HasValuesPipe

The HasValuesPipe will check if a provided object has values.

It uses the Object.keys() to validate the object having content.

If the provided value is not an object, the result will be false.

## How to use

```angular2html
<span>
  {{ object | hasValues }}
</span>
```
