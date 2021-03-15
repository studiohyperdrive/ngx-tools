# Angular Tools: Utils (`@studiohyperdrive/ngx-utils`)

Install the package first:
```shell
npm install @studiohyperdrive/ngx-utils
```

## 1. Window service

This service uses the `DOCUMENT` injection-token to provide several methods to access both document and window and related information.
It is convenient for using the document or window without breaking SSR.

### width$
The window-service exposes a `width$` observable to get the window-width. It defaults to `1200` when no window is defined.
```typescript
import { WindowService } from '@studiohyperdrive/ngx-utils';

export class YourComponent {
	public windowWidth$: Observable<number>;

	constructor(
		private windowService: WindowService
	) {
		this.windowWidth$ = this.windowService.width$;
	}
}
```

### scrollTo
A `scrollTo` method is provided to scroll to a position on the page. When there is no window, it will do nothing.

The offset is set to `0` by default so triggering the method without a value will scroll to the top of the page. 
```typescript
import { WindowService } from '@studiohyperdrive/ngx-utils';

export class YourComponent {
	constructor(
		private windowService: WindowService
	) {}
	
	public somethingHappened(): void {
		this.windowService.scrollTo(500);
	}
}
```

### hasDocument
The `hasDocument`-method is provided to check if there is a document. 

```typescript
import { WindowService } from '@studiohyperdrive/ngx-utils';

export class YourComponent {
	constructor(
		private windowService: WindowService
	) {}
	
	public aCoolMethod(): void {
		if (this.windowService.hasDocument()) {
		    // do something that depends on the document.
		}
	}
}
```

### isBrowser
The `isBrowser`-method is provided to check if the current platform is a browser.

It uses the `isPlatformBrowser` method with the `PLATFORM_ID` injection-token internally.

```typescript
import { WindowService } from '@studiohyperdrive/ngx-utils';

export class YourComponent {
	constructor(
		private windowService: WindowService
	) {}
	
	public aCoolMethod(): void {
		if (this.windowService.isBrowser()) {
		    // do something that depends on the browser.
		}
	}
}
```

## 2. subscription service
This service is a solution to end RxJS subscriptions when component is destroyed.

It is build on the assumption that a service provided on a component destroys when the component destroys.

To use it, you provide the service on the component and provide its exposed `destroyed$` observable within the `takeUntil` operator in a pipe on your subscription. 
```typescript
import { takeUntil} from 'rxjs/operators';
import { SubscriptionService } from '@studiohyperdrive/ngx-utils';

@Component({
	providers: [ SubscriptionService ],
})
export class YourComponent {
		constructor( 
			private subs: SubscriptionService
		) {
			yourObservable
				.pipe(
					takeUntil(this.subs.destroyed$),
				).subscribe(
					// your subscriptions
				)
		}
	}

```


## build information
This project has been build with:
- Angular CLI : `11.2.1`
- Angular: `11.2.1`
- nodejs: `12.19.0`
- npm: `6.14.8`

For a complete list of packages and version check out the `package.json` file.
