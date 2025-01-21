# `ngxReplaceElements`

The `ngxReplaceElements` pipe will provide a way to transform a string that contains one or more parts that need an Angular component by taking advantage of Angular web components.

This can be useful in combination with translation strings that require in-app links or WYSIWYG content from an external source.

## How to use

### Set up

The pipe requires a couple of things to be provided before it can be used.

First, create a component that will be used to replace your target:

```typescript
@Component({
	selector: 'link',
	template: '<a [routerLink]="link"></a>',
})
export class LinkComponent {
	// Keep in mind that Angular's innerHTML & outerHTML will convert attributes to lower casing.
	// This input property will need to be lowercased to make this work.
	@Input() public link: string;
}
```

Then register it as a web component in your `app.component.ts`:

```typescript
@Component({
	//...
})
export class AppComponent {
	constructor(
		// ...
		private readonly windowService: NgxWindowService,
		private readonly injector: Injector
	) {
		// Note that we are using our NgxWindowService (ngx-core) to avoid SSR issues.
		if (this.windowService.isBrowser) {
			const linkComponent = createCustomElement(LinkComponent, { injector: this.injector });

			customElements.define('ngx-link', linkComponent);
		}
	}
}
```

Lastly set up the global config in your root provider array:

```typescript
providers: [
	//...
	provideNgxReplaceElementsConfiguration({
		link: {
			element: 'ngx-link',
			selector: 'a[data-link-id={{id}}]',
			includeInnerText: true,
		},
		image: {
			element: 'ngx-image',
			selector: 'img[data-link-id={{id}}]',
		},
	}),
];
```

For each element we want to register, we define the WebComponent name using the `element` property. In order to be able to select an item to replace later on in the text, we create a `selector`. This selector should **always** include a part to identify the id, being `{{id}}`.

If we wish to use the original innerText of the element whilst replacing, we can do so by setting `includeInnerText` to true.

### Using the pipe

When the web component is set up, you can start using the pipe.

First set up anchors in your input string:

```text
"This is a text with a <a data-link-id='someUniqueId'>link</a>."
```

The `someUniqueId` will be used by the pipe to find and replace your link element so make sure that each anchor within your translation has a unique identifier.

Within the template you can now provide the string and transform it like this:

```angular2html
<p [innerHTML]="string | withRouterLinks : [{
    id: 'someUniqueId',
    elementId: link,
    data: {
        link: 'somewhere/in/the/app'
    }
}]"></p>
```

Whilst `id` refers to the id in the string, `elementId` refers to the element we have configured in the configuration.

The `data` property can be used to set the inputs of our provided WebComponent. We once again want to stress that due to the nature of WebComponents, these properties can only have lowercase keys.
