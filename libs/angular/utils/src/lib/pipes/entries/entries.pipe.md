# EntriesPipe

The BtwPipe will transform an object in to an array of key/value arrays.

It uses Object.entries() and will transform the top-level object (nested objects remain untouched).

For example

```
{
    message: 'Like and subscribe!',
    url: 'youtube.com/@Iben',
}
```

will format to:

```
[
    ['message', 'Like and subscribe!'],
    ['url', 'youtube.com/@Iben'],
]
```

All invalid Objects will result in an empty array.

## How to use

```angular2html
<span>
  {{ object | entries }}
</span>
```
