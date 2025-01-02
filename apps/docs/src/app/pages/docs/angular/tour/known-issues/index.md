---
keyword: KnownIssuesPage
---

### Navigation

When the tour requires routing between multiple pages, we suggest including an `onClose` function that routes back to the original page when the tour closes. This ensures that the tour will go back to the initial page, regardless of where the user decides to close the tour.

It should be noted though, that this can sometimes cause issues with the changeDetection, of which we currently don't have an in-package solution. The current fix is to run the change detection manually after the routing, which can be done in the `onClose` function.

```ts
this.tourService.startTour(
    [...],
    () => {
        return from(this.router.navigate([''])).pipe(
            tap(() => {
                this.cdRef.detectChanges();
            })
        );
    }
)
```

### Auto scroll

The `NgxTourService` will always try to make sure the active element is visible. For this, we use the [scrollIntoView()](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) method. It is possible that this will fail in case the previous element is not found.

A solution would be to implement a custom scrolling method to scroll the viewport until the desired element is centered.
