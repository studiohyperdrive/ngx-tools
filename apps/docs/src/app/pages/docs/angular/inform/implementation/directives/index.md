---
keyword: DirectivesPage
---

## NgxTooltipDirective

The `ngxTooltip` directive aims to add a customizable ARIA compliant tooltip to any component.

### Setup

In order to display a tooltip, we need to provide a default configuration which the directive will use. This includes two properties, the required `component` property and the optional `defaultPosition` property.

```ts
providers: [
	provideNgxTooltipConfiguration({
		component: MyToolTipComponent,
		defaultPosition: 'right',
	}),
];
```

The `ngxTooltip` directive allows you to add your own component with your own styling as a tooltip. In order for the tooltip to be ARIA compliant this component must extend the `NgxTooltipAbstractComponent`.

The `defaultPosition` can be used to overwrite the default position for all tooltips. By default, this is `above`.

### Implementation

#### TooltipComponent

As mentioned earlier, `ngxTooltip` does not come with a predefined component to render the tooltip. We provide one by setting up our own tooltip component.

```ts
import { Component } from '@angular/core';
import { NgxTooltipAbstractComponent } from '@ngx/layout';

@Component({
	selector: 'tooltip',
	template: `<p [innerHtml]="text"></p>`,
	styleUrl: './tooltip.component.scss',
	standalone: true,
})
export class TooltipComponent extends NgxTooltipAbstractComponent {}
```

The `NgxTooltipAbstractComponent` comes with several properties we can use for further styling or handling. The `position` property will return the set position by the tooltip (being `above`, `below`, `left` and `right`), whilst the `positionClass` property will automatically set a class on the tooltip to effectively handle margins, arrows, or other styling. These classes are `ngx-tooltip-position-above`, `ngx-tooltip-position-below`, `ngx-tooltip-position-left` and `ngx-tooltip-position-right`.

#### NgxTooltip

Once we've defined and provided our component, we can add the tooltip to any existing element. There is only one required input, the `ngxTooltip` input that represents the text we wish to provide to the tooltip.

By default, for accessibility, the directive adds a generated UUID id to the component. If you want to replace this with a custom id, you can overwrite this using `ngxTooltipId`. Be aware that **every id should be unique** to be ARIA compliant.

```html
<h1 ngxTooltip="This is a tooltip!" ngxTooltipId="title_1">Title 1</h1>
```

On top of these two inputs, we have two additional inputs, being `ngxTooltipComponent` and `ngxTooltipPosition`. Both allow to overwrite the default configurations that were set earlier, by replacing the default tooltip component and positions respectively with custom inputs.

```html
<h1
	ngxTooltip="This is a tooltip!"
	ngxTooltipId="title_1"
	ngxTooltipPosition="right"
	[ngxTooltipComponent]="MyCustomTooltipComponent"
>
	Title 1
</h1>
```

When you wish to disable a tooltip and thus prevent it from being shown, you can use the `ngxTooltipDisabled` property. By default, this property is `false`.

### Example

{{ NgDocActions.demo("TooltipDemoComponent", { expanded: true}) }}
