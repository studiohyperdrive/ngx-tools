# Angular Tools: NgxLayout (`@studiohyperdrive/ngx-layout`)

Install the package first:

```shell
npm install @studiohyperdrive/ngx-layout
```

## 1. Concept

`ngx-layout` is a collection of Angular components related to layout.

## 2. Components

### 2.1 Configurable layout

The `configurable layout` provides the ability to render components in a grid depending on a provided two dimensional array of keys and corresponding items with a provided template. The combination exists of an `ngx-configurable-layout` and an `ngx-configurable-layout-item`.

#### 2.1.1 Setup

By using content projection, we render our components inside of a `ngx-configurable-layout-item`. Each item requires a `key` as an input, which will be used to match the provided component with the two dimensional array we provide to the `ngx-configurable-layout` component.

This means that the order of rendering is now no longer depended on how you provide the components in the template, but by the two dimensional array provided to the `ngx-configurable-layout` component. This significantly streamlines the process and allows you to easily refactor existing flows. 

To provide the array to the `ngx-configurable-layout` component, you can either provide it through the `keys` input, or use the layout as a form input for `reactive forms`. 

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
<ngx-configurable-layout [keys]="[['second-item', 'first-item'], ['third-item']]">
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

#### 2.1.2 Item size

To determine how much space an item takes up in the grid, we use the `itemSize` input.

By using the option `fill`, which is the default option, the components will be sized to maximize filling up the grid.

By using the option `fit-content`, the size of the components themselves will define how much space they take up.

By using the option `equal`, all items in the entire grid will take up an equal amount of space. This also applies to the height of the elements, but this will require you to set the height of your items to `height:100%` for this to take effect.

#### 2.1.3 Gaps

In order to create spacing between items in the layout, `ngx-configurable-layout` provides two inputs, `columnGap` and `rowGap`.

Both properties expect a CSS based amount (in px, rem, %, etc.) and are both optional. This is the preferred way of adding spacing between your items, as using margins can sometimes create unexpected results due to the CSS Grid based implementation. 

#### 2.1.4 Drag and drop

`ngx-configurable-layout` provides drag and drop through the Angular CDK implementation. By default, the drag and drop functionality is disabled, and can be enabled through `alowDragAndDrop`.

By default, the package uses the demo styling provided by the Angular CDK team. This can be overwritten by custom styling, using the classes provided in the section `Styling`.

#### 2.1.5 Styling
By default, `ngx-configurable-layout` always provides minimal styling. Several classes are provided to further style the grid as needed.

| Class | |
|--|--|
| ngx-layout-grid | The overarching grid container used by the `ngx-configurable-layout` |
| ngx-layout-row | A row in the `ngx-configurable-layout` |
| ngx-layout-item | A cell in the `ngx-configurable-layout` |
| ngx-layout-drag-placeholder | A class to style the custom placeholder used when drag and drop is enabled. |
