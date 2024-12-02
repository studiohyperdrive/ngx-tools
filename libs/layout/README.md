# Angular Tools: NgxLayout (`@studiohyperdrive/ngx-layout`)

`ngx-layout` is a collection of Angular components related to layout.

## Installation

Install the package first:

```shell
npm install @studiohyperdrive/ngx-layout
```

## Versioning and build information

This package will follow a semver-like format, `major.minor.patch`, in which:

-   `major`: Follows the Angular major version
-   `minor`: Introduces new features and (potential) breaking changes
-   `patch`: Introduces bugfixes and minor non-breaking changes

For more information about the build process, authors, contributions and issues, we refer to the [ngx-tools](https://github.com/studiohyperdrive/ngx-tools) repository.

## Concept

`ngx-layout` is a package to help facilitate common layout use-cases.

Currently the package provides a `configurable layout` component which can be used to render components in a grid based on provided templates. This approach is ideal for use-cases such as a custom configurable dashboard.

## Implementation

### Components

#### Accordion

The `ngx-accordion` provides a easy to use WCAG/ARIA compliant implementation for an accordion. Its implementation exists of a `NgxAccordionComponent` and a `NgxAccordionItemComponent` component. Both can be imported simultaneously by importing `NgxAccordion`.

##### Implementation

Using the `NgxAccordionComponent` as a container for our accordion items (`NgxAccordionItemComponent`), we are able to provide correct keyboard navigation for end users. Therefore it is important to always warp your items in the container component.

We use content projection to pass the header and the content of each accordion item, by using the `headerTmpl` and `contentTmpl` ng-templates. Both templates allow for fetching the open state of the accordion, by using the $implicit outlet context.

In the example below you can find a simple implementation of the accordion.

```ts
import { NgxAccordion } from '@ngx/layout';

@Component({
	...
	standalone: true,
	imports: [NgxAccordion],
})
```

```html
<ngx-accordion>
	@for (item of testData; track $index) {
	<ngx-accordion-item>
		<ng-template #headerTmpl let-isOpen> {{item.title}} {{isOpen}} </ng-template>

		<ng-template #contentTmpl> {{item.content}} </ng-template>
	</ngx-accordion-item>
	}
</ngx-accordion>
```

##### Extra configuration

The `NgxAccordionComponent` allows for opening a set of accordion items from the start. This is useful for when you want to open the first item, or specific items in the accordion. By using the `open` property you can either open all items, the first item, a specific item or a set of specific items by passing `all`, `first`, the index of an item or an array of indexes respectively.

An individual `NgxAccordionItemComponent` can also be disabled by providing the `disabled` property. Once disabled, an item's open or closed state cannot be altered by the user. To allow an item to be open from the start and not closeable by the end-user, the `open` property of the `NgxAccordionComponent` will ignore the disabled state of the individual items.

##### Styling

The accordion implementation provides several classes we can use to target elements in the accordion. Internally the `NgxAccordionItemComponent` uses the `details` HTML element.

| Class                 |                                                   |
| --------------------- | ------------------------------------------------- |
| ngx-accordion         | A class set to the `NgxAccordionComponent`.       |
| ngx-accordion-item    | A class set to the `NgxAccordionItemComponent`.   |
| ngx-accordion-content | A class set to the content of the accordion item. |
| ngx-accordion-header  | A class set to the header of the accordion item.  |

#### Configurable layout

The `configurable layout` provides the ability to render components in a grid depending on a provided two dimensional array of keys and corresponding items with a provided template. The combination exists of an `ngx-configurable-layout` and an `ngx-configurable-layout-item`.

##### Setup

By using content projection, we render our components inside of a `ngx-configurable-layout-item`. Each item requires a `key` as an input, which will be used to match the provided component with the two dimensional array we provide to the `ngx-configurable-layout` component.

This means that the order of rendering is now no longer depended on how you provide the components in the template, but by the two dimensional array provided to the `ngx-configurable-layout` component. This significantly streamlines the process and allows you to easily refactor existing flows. In the chapters below we'll explain how to provide the two dimensional array to the component.

##### Static

Earlier we mentioned that the layout is build up using a provided two dimensional array. Depending on whether you want this layout to be `static` or `editable`, we provide the array in a different fashion.

When making a `static` layout, the layout itself can not be readjusted on the spot by the end user. A good use-case for this could be a dashboard that comes with a predefined set of layouts the user can pick from.

When the `layoutType` of the `ngx-configurable-layout` is set to `static`, the two dimensional array needs to provided through a `keys` input. This input takes a two dimensional array of key strings that match the ones presented in the template.

Below is a simple example for a static configurable layout.

```ts
import { NgxConfigurableLayoutComponent, NgxConfigurableLayoutItemComponent } from '@studiohyperdrive/ngx-layout';

@Component({
	...,
	standalone: true,
	imports: [NgxConfigurableLayoutComponent, NgxConfigurableLayoutItemComponent],
	...
})
```

```html
<ngx-configurable-layout
	layoutType="static"
	[keys]="[['second-item', 'first-item'], ['third-item']]"
>
	<ngx-configurable-layout-item key="first-item">
		<p>This is the second item in the DOM.</p>
	</ngx-configurable-layout-item>

	<ngx-configurable-layout-item key="second-item">
		<p>This is the first item in the DOM.</p>
	</ngx-configurable-layout-item>

	<ngx-configurable-layout-item key="third-item">
		<p>This is the third item in the DOM.</p>
	</ngx-configurable-layout-item>
</ngx-configurable-layout>
```

##### Editable

Unlike with the `static` layout, the `editable` layout allows the user to readjust on the spot by the end user. This means that the end user can toggle items and ,when enabled, reorder these items through drag and drop. A use-case that fits this approach is a fully configurable dashboard, where an end user can pick and choose which items they wish to see.

When setting the `layoutType` to `editable`, the two dimensional array is provided by attaching a `FormControl` to the `ngx-configurable-layout`. Unlike with the `keys` input, the control expects an object with a `key` and an `isActive` property. The latter will be used to let the end user toggle items within the view.

As long as the `showInactive` property is set to false, the inactive items will not be shown in the view. By setting it to true, the inactive items become visible, including a toggle that gets attached to all the items in the view. This toggle allows the items in the view be toggled on and off.

If you for some reason do not wish to make an item in the list toggable, you can set individual items in the control as disabled. You can do this by simply setting the `disabled` property of the item in the two dimensional array to true. This will prevent the toggle from being shown and the corresponding item will receive the class `ngx-layout-item-disabled`.

By default, the toggle is represented by a default html checkbox in the top right corner of the item. This checkbox has the `ngx-layout-item-toggle` class. This toggle however can be overwritten by using the custom `checkboxTmpl` template.

Below is a simple example for an editable configurable layout.

```ts
import { NgxConfigurableLayoutComponent, NgxConfigurableLayoutItemComponent,NgxConfigurableLayoutGrid } from '@studiohyperdrive/ngx-layout';

@Component({
	...,
	standalone: true,
	imports: [NgxConfigurableLayoutComponent, NgxConfigurableLayoutItemComponent],
	...
})

...

public readonly control: FormControl<NgxConfigurableLayoutGrid> = new FormControl([[{key: 'second-item', isActive: true}, {key: 'first-item', isActive: false}, ]])
```

```html
<ngx-configurable-layout layoutType="editable" [formControl]="control">
	<ngx-configurable-layout-item key="first-item">
		<p>
			This is the second item in the DOM. It will only be visible when the showInactive
			property is set to true.
		</p>
	</ngx-configurable-layout-item>

	<ngx-configurable-layout-item key="second-item">
		<p>This is the first item in the DOM.</p>
	</ngx-configurable-layout-item>

	<ng-template #checkboxTmpl let-control>
		This is an optional custom checkboxTmpl!

		<input type="checkbox" [formControl]="control" class="my-custom-checkbox" />
	</ng-template>
</ngx-configurable-layout>
```

##### Drag and drop

`ngx-configurable-layout` provides drag and drop through the Angular CDK implementation. By default, the drag and drop functionality is disabled, and can be enabled through `allowDragAndDrop`.

By default, the package uses the demo styling provided by the Angular CDK team. This can be overwritten by custom styling, using the classes provided in the section `Styling`.

When `allowDragAndDrop` is enabled, we can pass a `dropPredicate`. This function is bound to the layout component and will allow you to determine whether dropping an element in a specific spot is allowed by returning true or false. For more information on the predicate, we refer to the CDK Drag and Drop documentation.

##### Item size

To determine how much space an item takes up in the grid, we use the `itemSize` input.

By using the option `fill`, which is the default option, the components will be sized to maximize filling up the grid.

By using the option `fit-content`, the size of the components themselves will define how much space they take up.

By using the option `equal`, all items in the entire grid will take up an equal amount of space. This also applies to the height of the elements, but this will require you to set the height of your items to `height:100%` for this to take effect.

##### Gaps

In order to create spacing between items in the layout, `ngx-configurable-layout` provides two inputs, `columnGap` and `rowGap`.

Both properties expect a CSS based amount (in px, rem, %, etc.) and are both optional. This is the preferred way of adding spacing between your items, as using margins can sometimes create unexpected results due to the CSS Grid based implementation.

##### Styling

By default, `ngx-configurable-layout` always provides minimal styling. Several classes are provided to further style the grid as needed.

| Class                          |                                                                             |
| ------------------------------ | --------------------------------------------------------------------------- |
| ngx-layout-grid                | The overarching grid container used by the `ngx-configurable-layout`        |
| ngx-layout-row                 | A row in the `ngx-configurable-layout`                                      |
| ngx-layout-item                | A cell in the `ngx-configurable-layout`                                     |
| ngx-layout-drag-placeholder    | A class to style the custom placeholder used when drag and drop is enabled. |
| ngx-layout-item-toggle         | A class to style the default checkbox used in `editable` layouts.           |
| ngx-layout-item-inactive       | A class to style the inactive items used in `editable` layouts.             |
| ngx-layout-item-disabled       | A class to style the disabled items used in `editable` layouts.             |
| ngx-layout-grid-inactive-shown | A class given to the container when the inactive items are being shown.     |

### Directives

#### NgxDisplayContentDirective

The `*displayContent` directive provides the ability to hide parts of the template based on a loading, error and/or offline status and optionally replace those by default components provided in the application.

#### Setup

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

#### Implementation

Once the initial configuration is provided, we can use the `*displayContent` directive. This directive is a structural directive and requires an object with the status as an input. The directive has 3 potential statuses to listen to, being `offline`, `loading` and `error`. These statuses are checked in the earlier mentioned order.

As an example, if the application is offline and we automatically listen to the online status, the offline fallback will be shown first; even if the loading status is currently set to true. Once the application is back online, then the loading fallback will be shown. Only then, if the loading status is false, will a potential error fallback be shown based on the error condition.

```html
<!-- This will not render the provided div, but the provided loading fallback instead -->
<div *displayContent="{loading: true}">Hello! This content will be rendered when</div>

<!-- This will render the provided div -->
<div *displayContent="{loading: false}">Hello! This content will be rendered when</div>
```

#### Override configuration

In certain cases we wish to override the default components we've provided or we wish to provide extra information to the default components. We can use this by providing additional configuration to the `*displayContent` directive.

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

#### Accessibility

In order to provide a WCAG/ARIA compliant implementation, the `*displayContent` directive automatically sets the `aria-live` and `aria-busy` labels when needed.

By default, the `aria-live` label gets set to `polite`. You can overwrite this setting using the `ariaLive` property in the override configuration.

```html
<div *displayContent="{loading: true}; ariaLive:'assertive' ">Hello world!</div>
```

If multiple items in a parent have this directive or if the parent already has an `aria-live` label set, the label with the highest importance gets used. The ranking is `assertive`, `polite` and `off` respectively.

### Services

#### NgxOnlineService

`ngx-layout` provides a root service `NgxOnlineService` that offers a SSR friendly approach to the online status of the application. Listening to the `online$` Observable will provide you with a simple true or false based on the current status.
