# MergeArraysPipe

The MergeArraysPipe is a wrapper around the JS native Array.concat with some added safety.

It will start from a source array and concat n-amount of additional arrays into it.

## How to use

```angular2html
<span>
  {{ sourceArray | mergeArrays: firstArray:secondArray:...:NthArray }}
</span>
```
