---
keyword: HeaderPage
---

By default, the header row is always visible, even when no data is provided or when the loading state is active. This behavior can be overwritten in individual tables by `hideHeaderWhen`, but can also be overwritten globally using the `NgxTableConfig`.

If you want the header to not be visible when loading or empty or both, you can pass an array of states that define when the headers are not shown. You can pass just `when-empty` or `when-loading`, but both can also be applied.

## When loading

{{ NgDocActions.demo("TableOneDemoComponent") }}

## When empty

{{ NgDocActions.demo("TableTwoDemoComponent") }}
