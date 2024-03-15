# Angular Tools: NgxLayout (`@studiohyperdrive/ngx-layout`)

Install the package first:

```shell
npm install @studiohyperdrive/ngx-layout
```

## 1. Concept

`ngx-layout` is a collection of Angular components related to layout.

## 2. Components

### 2.1 Configurable layout

The first in the spotlight is a combination of two standalone components related to dynamic views.

The combination exists of an `<ngx-configurable-layout>` and an `<ngx-configurable-layout-item>` (henceforth named `wrapper` and `item` respectively).

The idea of these components is that the order of the items within the template.html does not define the order of the items in the DOM. This is especially useful when building a customizable view. The order in which the items will be rendered, depends on either an input or a reactive form control.

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
<ngx-configurable-layout [keys]="['second-item', 'first-item']">
	<ngx-configurable-layout-item key="first-item">
		<p>This is the first item in the template.</p>
	</ngx-configurable-layout-item>

	<ngx-configurable-layout-item key="second-item">
		<p>This is the first item in the DOM.</p>
	</ngx-configurable-layout-item>
</ngx-configurable-layout>
```
