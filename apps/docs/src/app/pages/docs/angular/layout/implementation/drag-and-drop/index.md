---
keyword: LayoutDragAndDropPage
---

Drag and drop is a common and well known pattern for end users, but often ends up being inaccessible for users that prefer or need to use a keyboard for interacting with the interface. On top of that, for visually impaired users, it becomes difficult to understand how to use this pattern.

Within this package we use `Angular CDK Drag and Drop`, but further enhance to make it accessible for keyboard users and users using screen readers. We already provide several measures for this functionality, but further input from the developer is required.

## Concept

To make the drag and drop pattern accessible for keyboard users, we allow the items in the drag and drop container to be moved using keyboard interactions. By tabbing to the item and pressing `Enter` or `Space`, we can select an element and then move it using the `Arrow` keys. Once the item is in the correct place, we can deselect the element by pressing the `Enter` or `Space` key again.

For users with assistive technologies, such as screenreaders, we provide a a live region that will announce each change in the drag and drop container. This will announce select events, deselect events and move events. `ngx-layout` provides a set of default messages for a select amount of languages, but offers the ability to overwrite these with your own messages when needed.

## Implementation

In order to make the drag and drop accessible for every user, you need to provide an implementation of the `NgxAccessibleDragAndDropAbstractService`. This service requires you to provide the current language of your application by implementing the `currentLanguage` method. This can be either a string or an Observable string.

If you wish to overwrite the default message record with your own, you can do that by providing the `customMessages` property. This is however optional, if not provided, the default language options will be provided.

You can provide your service in the following manner:

```ts
providers: [
    provideNgxDragAndDropService(DragAndDropService),
]
```

## Setup
