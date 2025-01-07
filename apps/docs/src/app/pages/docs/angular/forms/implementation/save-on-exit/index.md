---
keyword: SaveOnExitPage
---

When building forms, we often want to have the ability to notify the user that they're about to leave a filled in form without saving. The `ngx-forms` package offers a workflow that allows you to handle this customizable way.

## NgxSaveOnExitComponent

Starting with the `NgxSaveOnExitComponent`, we provide an abstract component that has all the required methods to handle the flow.

Consisting of two methods, the `isDirty` method is the most important one. This method will let the service and the guard know whether or not the component and its form are dirty and need to trigger the `save-on-exit` flow.

The `isValid` method will allow you to handle different flows whenever the filled in form is valid or not. For instance, when showing a modal to the user, we can prompt that the form is not valid and therefor cannot be saved to the API.

The component also comes with a `window:beforeunload` handler. This means that whenever the user closes the tab or the browser, we can prompt the user that the form has stopped it from closing the window. By default, this behavior is not enabled, but it can be enabled by setting `allowBeforeUnloadHandler` to true.

## NgxSaveOnExitAbstractService

Next up, the `NgxSaveOnExitAbstractService` allows us to handle custom behavior to the dirty state of the component and its form.

This service can be provided globally or can be provided in individual components/modules where you wish to handle the flow differently.

The `handleDirtyState` gets the instance of the component and allows you to decide however you wish to handle your save-on-exit flow. Do you simply want to show a toast message and let the user route? No problem! Do you wish to open a modal and let the user decide? It's all up to you.

If you provide the service on root level and wish to bypass certain routes under certain circumstances, you can do so by implementing the optional `bypassSaveOnExit` method.

## NgxSaveOnExitGuard

Once your component has implemented the `NgxSaveOnExitComponent` abstract and a service was provided for the `NgxSaveOnExitAbstractService`, you can apply the `NgxSaveOnExitGuard` on your route.

The guard will detect whenever the user tries to route away from the component and from there on will handle the entire save-on-exit flow.
