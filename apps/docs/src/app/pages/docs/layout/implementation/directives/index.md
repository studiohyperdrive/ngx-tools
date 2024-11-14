---
keyword: LayoutDirectivesPage
---

# NgxDisplayContentDirective

The `displayContent` directive provides the ability to hide parts of the template based on a loading, error and/or offline status and optionally replace those by default components provided in the application.

## Setup

In order for the directive to function correctly, some base configuration has to be provided. For each status, we can provide a fallback component we wish to render when each of these statuses are true. These components should implement the `NgxDisplayContentComponent` abstract.

Each component is optional and can be overwritten by a custom template where the directive is used.

```ts
providers: [
	provideNgxDisplayContentConfiguration({
		components: {
			loading: DisplayContentLoadingComponent,
			error: DisplayContentErrorComponent,
			offline: DisplayContentOfflineComponent,
		},
	}),
];
```

Due to the fact that these components are optional, we might provide a loading state to the directive and not have a loading component to show. By default, the directive will then render the initial template. To override this behavior the configuration allows a property `hideWhenNoTemplateProvided` to be set to true, which will hide the initial template instead.

By default, we need to provide the offline condition to the directive ourself in order to display the offline fallback. Because this status, unlike the error and the loading status, is based on a single input; we've provided the ability to automatically listen to the the online status of the application, using the `NgxOnlineService` provided in this package. Setting `listenToOnlineStatus` to true will automatically handle the offline status.

```ts
providers: [
	provideNgxDisplayContentConfiguration({
		hideWhenNoTemplateProvided: true,
		listenToOnlineStatus: true,
		components: {
			loading: DisplayContentLoadingComponent,
			error: DisplayContentErrorComponent,
			offline: DisplayContentOfflineComponent,
		},
	}),
];
```

## Implementation

Once the initial configuration is provided, we can use the `displayContent` directive. This directive is a structural directive and requires an object with the status as an input. The directive has 3 potential statuses to listen to, being `offline`, `loading` and `error`. These statuses are checked in the earlier mentioned order.

As an example, if the application is offline and we automatically listen to the online status, the offline fallback will be shown first; even if the loading status is currently set to true. Once the application is back online, then the loading fallback will be shown. Only then, if the loading status is false, will a potential error fallback be shown based on the error condition.

```html
<!-- This will not render the provided div, but the provided loading fallback instead -->
<div *displayContent="{loading: true}">Hello! This content will be rendered when</div>

<!-- This will render the provided div -->
<div *displayContent="{loading: false}">Hello! This content will be rendered when</div>
```

## Override configuration

In certain cases we wish to override the default components we've provided or we wish to provide extra information to the default components. We can use this by providing additional configuration to the `displayContent` directive.

Each implementation of the `NgxDisplayContentComponent` comes with a any-typed data Input. We can pass this data to the component by providing this in the configuration object.

```html
<!-- This will not render the provided div, but the provided error fallback including the provided data-->
<div *displayContent="{error: true}; condition: {error: {data: 'This is the error'}}">
	Hello! This content will be rendered when
</div>
```

Sometimes, we do not wish to use the default component at all, and want to provide a custom template instead. We can also do this by providing a template in the override configuration.

```html
<ng-template #errorTmpl> This is our custom error template! </ng-template>

<!-- This will not render the provided div nor the provided fallback component, but will render the errorTmpl above.-->
<div *displayContent="{error: true}; condition: {error: {template: errorTmpl}}">
	Hello! This content will be rendered when
</div>
```

## Accessibility

In order to provide a WCAG/ARIA compliant implementation, the `displayContent` directive automatically sets the `aria-live` and `aria-busy` labels when needed.

By default, the `aria-live` label gets set to `polite`. You can overwrite this setting using the `ariaLive` property in the override configuration.

```html
<div *displayContent="{loading: true}; ariaLive:'assertive' ">Hello world!</div>
```

If multiple items in a parent have this directive or if the parent already has an `aria-live` label set, the label with the highest importance gets used. The ranking is `assertive`, `polite` and `off` respectively.
