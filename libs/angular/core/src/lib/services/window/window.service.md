# NgxNgxWindowService

This service uses the `DOCUMENT` injection-token to provide several methods to access both document and window and related information.
It is convenient for using the document or window without breaking SSR.

## Properties

### width$

The window-service exposes a `width$` observable to get the window-width. It defaults to `1200` when no window is defined.

```typescript
import { NgxWindowService } from '@studiohyperdrive/ngx-core';

export class YourComponent {
	public windowWidth$: Observable<number>;

	constructor(private windowService: NgxWindowService) {
		this.windowWidth$ = this.windowService.width$;
	}
}
```

### scrollingUp$

The window-service exposes a `scrollingUp$` observable to know when the scroll has ended.

```typescript
import { NgxWindowService } from '@studiohyperdrive/ngx-core';

export class YourComponent {
	public scrollingUp$: Observable<number>;

	constructor(private windowService: NgxWindowService) {
		this.scrollingUp$ = this.windowService.scrollingUp$;
	}
}
```

### currentScrollPosition

The window-service exposes a `currentScrollPosition` property that contains the currentScrollPosition after handleContentScroll has been called.

```typescript
import { NgxWindowService } from '@studiohyperdrive/ngx-core';

export class YourComponent {
	public currentScrollPosition: Observable<number>;

	constructor(private windowService: NgxWindowService) {
		this.currentScrollPosition = this.windowService.currentScrollPosition;
	}
}
```

### window

The window-service exposes the `window` property which is a link to the `Window` object.

```typescript
import { NgxWindowService } from '@studiohyperdrive/ngx-core';

export class YourComponent {
	public window$: Observable<Window>;

	constructor(private windowService: NgxWindowService) {
		this.window = this.windowService.window;
	}
}
```

### document

The window-service also exposes the `document` property which is a link to the `Document` object.

```typescript
import { NgxWindowService } from '@studiohyperdrive/ngx-core';

export class YourComponent {
	public document$: Observable<Document>;

	constructor(private windowService: NgxWindowService) {
		this.document = this.windowService.document;
	}
}
```

## Methods

### scrollTo

A `scrollTo` method is provided to scroll to a position on the page. When there is no window, it will do nothing.

The offset is set to `0` by default so triggering the method without a value will scroll to the top of the page.

```typescript
import { NgxWindowService } from '@studiohyperdrive/ngx-core';

export class YourComponent {
	constructor(private windowService: NgxWindowService) {}

	public somethingHappened(): void {
		this.windowService.scrollTo(500);
	}
}
```

### hasDocument

The `hasDocument`-method is provided to check if there is a document.

```typescript
import { NgxWindowService } from '@studiohyperdrive/ngx-core';

export class YourComponent {
	constructor(private windowService: NgxWindowService) {}

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
import { NgxWindowService } from '@studiohyperdrive/ngx-core';

export class YourComponent {
	constructor(private windowService: NgxWindowService) {}

	public aCoolMethod(): void {
		if (this.windowService.isBrowser()) {
			// do something that depends on the browser.
		}
	}
}
```

### runInBrowser

The `runInBrowser`-method is provided to run a specific callback only when in the browser.

The callback has access to the window and the document elements provided in its parameters.

```typescript
import { NgxWindowService } from '@studiohyperdrive/ngx-core';

export class YourComponent {
	constructor(private windowService: NgxWindowService) {}

	public aCoolMethod(): void {
		this.windowService.runInBrowser(({ browserWindow, browserDocument }) => {
			// Do something with the browser window or document
		});
	}
}
```
