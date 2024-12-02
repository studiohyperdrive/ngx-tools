# Angular Tools: NgxInform (`@studiohyperdrive/ngx-inform`)

`ngx-inform` is a collection of Angular flows related to informing end-users.

## Installation
Install the package first:

```shell
npm install @studiohyperdrive/ngx-inform
```

## Versioning and build information

This package will follow a semver-like format, `major.minor.patch`, in which:

- `major`: Follows the Angular major version
- `minor`: Introduces new features and (potential) breaking changes
- `patch`: Introduces bugfixes and minor non-breaking changes

For more information about the build process, authors, contributions and issues, we refer to the [ngx-tools](https://github.com/studiohyperdrive/ngx-tools) repository.

## Concept

`ngx-inform` is a package to help facilitate common user information use-cases such as tooltips, toasts and snackbars. 

At its core, `ngx-inform` is build to be WCAG and ARIA compliant, and will throw errors whenever the necessary setup has not been provided to ensure said compliancy.

Currently the package provides a `ngxTooltip` directive which can be used to attach a customizable ARIA compliant tooltip to any component and the `ngxModalService` which allows for both custom and predefined global modals to be used throughout the application.

## Directives

### NgxTooltipDirective

The `ngxTooltip` directive aims to add a customizable ARIA compliant tooltip to any component. 

#### Setup

In order to display a tooltip, we need to provide a default configuration which the directive will use. This includes two properties, the required `component` property and the optional `defaultPosition` property.

```ts
providers: [
		provideNgxTooltipConfiguration({
            component: MyToolTipComponent,
            defaultPosition: 'right'
		}),
	]
```
The `ngxTooltip` directive allows you to add your own component with your own styling as a tooltip. In order for the tooltip to be ARIA compliant this component must extend the `NgxTooltipAbstractComponent`.

The `defaultPosition` can be used to overwrite the default position for all tooltips. By default, this is `above`.

#### Implementation

##### TooltipComponent

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

##### NgxTooltip

Once we've defined and provided our component, we can add the tooltip to any existing element. There is only one required input, the `ngxTooltip` input that represents the text we wish to provide to the tooltip. 

By default, for accessibility, the directive adds a generated UUID id to the component. If you want to replace this with a custom id, you can overwrite this using `ngxTooltipId`. Be aware that **every id should be unique** to be ARIA compliant.

``` html
<h1 ngxTooltip="This is a tooltip!" ngxTooltipId="title_1">Title 1</h1>
```

On top of these two inputs, we have two additional inputs, being `ngxTooltipComponent` and `ngxTooltipPosition`. Both allow to overwrite the default configurations that were set earlier, by replacing the default tooltip component and positions respectively with custom inputs.

``` html
<h1 ngxTooltip="This is a tooltip!" ngxTooltipId="title_1" ngxTooltipPosition="right" [ngxTooltipComponent]="MyCustomTooltipComponent">Title 1</h1>
```

When you wish to disable a tooltip and thus prevent it from being shown, you can use the `ngxTooltipDisabled` property. By default, this property is `false`.

## Services

### NgxModalService

The `NgxModalService` provides a WCAG/ARIA compliant approach to the Angular CDK `Dialog` service. It is important to understand that, unlike the Dialog service of the CDK, `ngx-inform` **will enforce WCAG/ARIA compliance**. Because of that, certain configuration of the CDK Dialog becomes mandatory and other options that would result in incompliance have been disabled.

### Setup

You can use the `NgxModalService` without any prior setup, but the `ngx-inform` package does provide the ability to provide a global configuration that can be applied for all modals. On top of that, you can provide default modals with your specific configuration.

``` ts
provideNgxModalConfiguration({
	closeOnNavigation: true,
	autoClose: true,
	modals: {
		confirm: {
			component: ConfirmModalComponent,
			role: 'alertdialog',
			panelClass: 'panel-confirm',
		},
	},
}),
```

Using the above configuration, we can set several properties that will be applied to the modals globally. These properties are:
| Property                     |                                                                                                              |
| ------------------------- | --------------------------------------------------------------------------------------------------------------- |
| closeOnNavigation                 | Whether the modal closes on navigation. By default, this is `true` |
| direction                 | The reading direction of the modal. |
| hasBackdrop                | Whether or not we wish to set a backdrop. By default, this is `true`. |
| panelClass                | A class set to the `overlay` element. By default, this is an empty array. |
| autoClose                 | Whether the modal automatically closes after the initial interaction emitted by the `action` output. By default, this is `true`. |

On top of that, by passing a `modals` record, we can define a set preset modals we can use throughout the entire application. We can setup default modals for confirmation, navigating away from a route, etc. Next to overwrites of the global properties above, we can also provide the following properties:

| Property                     |                                                                                                              |
| ------------------------- | --------------------------------------------------------------------------------------------------------------- |
| role                 | The ARIA role of the modal, either `dialog` or `alertDialog`                                                                            |
| component                 | An implementation of the `NgxModalAbstractComponent`                                                                             |
| data               | Any data we wish to provide to the component.                                                                              |

### Implementation

The `NgxModalService` allows for two ways of opening a modal. Either by opening a predefined modal we set in the configuration, or a custom modal by passing a new modal component.

To make the modals ARIA compliant either a `label` or a `labelledById` must be provided. If the role of a modal was set to `alertdialog`, the `describedById` property is also required. If no element with the provided id was found in the modal, the `ngx-inform` package will throw an error.

When opening a modal we can overwrite all the globally and modal-specific configuration using the same properties as mentioned earlier. On top of that, we can set several other properties. These properties are:

| Property                     |                                                                                                              |
| ------------------------- | --------------------------------------------------------------------------------------------------------------- |
| injector                | Injector used for the instantiation of the component to be attached. If provided, takes precedence over the injector indirectly provided by ViewContainerRef. |
| viewContainerRef                | Where the attached component should live in Angular's logical component tree. This affects what is available for injection and the change detection order for the component instantiated inside of the dialog. This does not affect where the dialog content will be rendered. |
| restoreFocus                | Whether the dialog should restore focus to the previously-focused element upon closing. By default, this is `true`|
| autoFocus                | Where the dialog should focus on open. By default, this is `true` |

#### Predefined modal

If we set a predefined modal, we can now call said modal using the `open` method on `NgxModalService`.

```ts
this.modalService
	.open<'Confirm' | 'Deny'>({
		type: 'confirm',
		describedById: 'confirm-button',
		labelledById: 'confirm-label',
		data: {
			title: 'Please confirm your actions!'
		}
	})
	.pipe(
		tap(action => {
			if(action === 'Confirm') {
				// Perform confirm logic
			}

			// Perform non-confirm logic
		})
	)
	.subscribe();
```
#### Custom modal

We can always create a custom modal for feature-specific use-cases. We do this by providing a component.

``` ts
this.modalService
	.open<'Test'>({
		component: ModalComponent,
		label: 'Modal',
		role: 'dialog',
	})
	.pipe(
		tap((action) => {
			if (action === 'Test') {
				console.log('Hello!');
			}
		})
	)
	.subscribe();
```
