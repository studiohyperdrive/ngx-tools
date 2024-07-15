# NgxMediaQueryService

The `NgxMediaQueryService` provides a SSR proof Observable approach to the changes in the media queries of the `window` object.

## Properties

### registerMediaQueries

Provided one or more media queries, it will setup a steam that can be subscribed to. When the viewport has passed a certain provided breakpoint, the new value of the triggered media query will be emitted onto the stream.

### getMatchingQuery$

Subscribing to this method with a specified `id`, will allow the subscription to be triggered whenever the breakpoint of the matching query has been triggered. It may be important to note that only the subscribers of the triggered breakpoint will emit. Not all provided breakpoints will emit whenever one query changes.

Every subscription will be triggered once upon creation. This allows for the query subscriptions to be used in operators like a `combineLatest`.
