# getQueryParams

The getQueryParams helper will use Angular's `inject` function to get the queryParams from the ActivatedRoute.

## How to use

```typescript
class MyClass {
	public readonly params$: Observable<MyInterface> = getQueryParams<MyInterface>();
}
```
