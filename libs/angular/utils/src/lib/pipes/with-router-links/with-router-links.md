# `withRouterLinks`

The `withRouterLinks` pipe will provide a way to transform a string that contains one or more parts that need a routerLink by taking advantage of Angular web components.

This can be useful in combination with translation strings that require in-app links or WYSIWYG content from an external source.

## How to use

### Set up

The pipe requires a couple of things to be provided before it can be used.

First, create a component that wraps around your anchor with router-link:

```typescript
@Component({
	selector: 'link',
	template: '<a [routerLink]="to"></a>',
})
export class LinkComponent {
	// Keep in mind that Angular's innerHTML & outerHTML will convert attributes to lower casing.
	// This input property will need to be lowercased to make this work.
	@Input() public to: string;
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

			customElements.define('link-el', linkComponent);
		}
	}
}
```

Lastly set up the global config in the appropriate module:

```typescript
@NgModule({
	// ...
	providers: [
		//...
		{
			provide: WITH_ROUTER_LINKS_CONFIG,
			useValue: {
				// The selector of the component
				replaceElementSelector: 'link-el',
				// The input property of the component
				linkAttributeName: 'to',
				// The data attribute used in the string to mark the anchor that needs to be targetted
				dataLinkIdAttributeName: 'data-link-id',
			} as WithRouterLinksConfig,
		},
	],
})
export class SomeModule {}
```

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
    dataLinkId: 'someUniqueId',
    link: ['somewhere', 'in', 'the', 'app']
}]"></p>
```

The `linkTo` will transform your array to a string. It also expects plain string paths instead of arrays.

The `hostClass` will allow you to set a class onto the host of the substitute element.

#### Deviating from the global settings

If you'd want to deviate from the global settings and use a different component for a specific string, you can provide additional config like this:

```angular2html
<p [innerHTML]="string | withRouterLinks : [{
    dataLinkId: 'someUniqueId',
    link: ['somewhere', 'in', 'the', 'app'],
    replaceElementSelector: 'my-other-el',
	toAttribute: 'input-prop',
    hostClass: 'someClass',
}]"></p>
```

It is possible to redefine a `hostClass` here. Be aware that this will overwrite the `hostClass` defined by the global style.

Do note, again, that Angular will always lowercase attributes on HTML provided through the innerHTML & outerHTML directives.
