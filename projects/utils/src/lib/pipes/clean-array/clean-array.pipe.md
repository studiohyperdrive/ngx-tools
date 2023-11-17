# CleanArrayPipe

The CleanArrayPipe will remove all falsy values from the provided array.

It is possible to retain certain falsy values, by providing the pipe with an exception array.

For example

```
[true, 10, false, null, 'string']
```

will format to:

```
[true, 10, 'string']
```

Watch out for the often forgotten truthy values `[]` and `{}`.

## How to use

```angular2html
<span>
  {{ array | cleanArray }}
</span>
```
