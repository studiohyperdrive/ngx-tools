# ArrayContainsPipe

The ArrayContainsPipe will check if there is at least one object in an array that has provided properties.

For example

```angular2html
{{
    [
        { title: 'This is the title', description: 'This is the description' },
        { title: 'This is the title' }
    ] | arrayContainsOne: ['description']
}}
// Output: true
```

## How to use

```angular2html
<span>
  {{ value | arrayContainsOne : ['prop1', 'prop2'] }}
</span>
```
