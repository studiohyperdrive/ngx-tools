# HasOwnProperty

The HasOwnProperty checks whether the specified property exists within the given object.  
It is a wrapper around Object.hasOwnProperty.

## How to use

```angular2html
<span>
  {{ sourceObject | hasOwnProperty: 'property' }}
</span>
```
