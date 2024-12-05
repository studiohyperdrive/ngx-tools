---
keyword: ServicesPage
---

## NgxModalService

The `NgxModalService` provides a WCAG/ARIA compliant approach to the Angular CDK `Dialog` service. It is important to understand that, unlike the Dialog service of the CDK, `ngx-inform` **will enforce WCAG/ARIA compliance**. Because of that, certain configuration of the CDK Dialog becomes mandatory and other options that would result in incompliance have been disabled.

## Setup

You can use the `NgxModalService` without any prior setup, but the `ngx-inform` package does provide the ability to provide a global configuration that can be applied for all modals. On top of that, you can provide default modals with your specific configuration.

```ts
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
| Property                  |                                                                                                                                  |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------                  |
| closeOnNavigation         | Whether the modal closes on navigation. By default, this is `true`                                                               |
| direction                 | The reading direction of the modal.                                                                                              |
| hasBackdrop               | Whether or not we wish to set a backdrop. By default, this is `true`.                                                            |
| panelClass                | A class set to the `overlay` element. By default, this is an empty array.                                                        |
| autoClose                 | Whether the modal automatically closes after the initial interaction emitted by the `action` output. By default, this is `true`. |

On top of that, by passing a `modals` record, we can define a set preset modals we can use throughout the entire application. We can setup default modals for confirmation, navigating away from a route, etc. Next to overwrites of the global properties above, we can also provide the following properties:

| Property  |                                                              |
| --------- | ------------------------------------------------------------ |
| role      | The ARIA role of the modal, either `dialog` or `alertDialog` |
| component | An implementation of the `NgxModalAbstractComponent`         |
| data      | Any data we wish to provide to the component.                |

## Implementation

The `NgxModalService` allows for two ways of opening a modal. Either by opening a predefined modal we set in the configuration, or a custom modal by passing a new modal component.

To make the modals ARIA compliant either a `label` or a `labelledById` must be provided. If the role of a modal was set to `alertdialog`, the `describedById` property is also required. If no element with the provided id was found in the modal, the `ngx-inform` package will throw an error.

When opening a modal we can overwrite all the globally and modal-specific configuration using the same properties as mentioned earlier. On top of that, we can set several other properties. These properties are:

| Property         |                                                                                                                                                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| injector         | Injector used for the instantiation of the component to be attached. If provided, takes precedence over the injector indirectly provided by ViewContainerRef.                                                                                                                  |
| viewContainerRef | Where the attached component should live in Angular's logical component tree. This affects what is available for injection and the change detection order for the component instantiated inside of the dialog. This does not affect where the dialog content will be rendered. |
| restoreFocus     | Whether the dialog should restore focus to the previously-focused element upon closing. By default, this is `true`                                                                                                                                                             |
| autoFocus        | Where the dialog should focus on open. By default, this is `true`                                                                                                                                                                                                              |

### Predefined modal

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
### Custom modal

We can always create a custom modal for feature-specific use-cases. We do this by providing a component.

```ts
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
