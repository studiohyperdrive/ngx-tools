# NgxStorageService

The `NgxStorageService` provides a SSR proof Observable approach to both session- and localStorage. It allows for listing to change events on specific properties or on the entire storage.

## Approach

In order to provide an Observable based approach to both the session- and localStorage, the session provides a `localStorage` and a `sessionStorage` object that offer custom methods that will also emit to the corresponding Observables. Data that was set to the session- or localStorage on the window directly will not be represented in the Observable.

On top of an Observable based approach, the new `localStorage` and `sessionStorage` implementations will automatically parse the data to a string when saving it to the window session- or localStorage, and will return the parsed value back when calling either `getItem` or `getItemObservable`.

The service is also SSR proof, and will prevent any actions from occurring when not in the browser.

## Properties

### localStorage/sessionStorage

The `localStorage` and `sessionStorage` objects of the `NgxStorageService` provide an Observable based approach to storage.

If we want to get an item from the storage, we can either use `getItem` or `getItemObservable` if we want the real time value vs an Observable respectively.

Using `setItem` and `removeItem` will set and remove an item in/from the storage respectively, and will emit an event on the `storageEvents$` Observable.

When using `clear`, the entire storage will be cleared, the Observables that were fetched using `getItemObservable` will be completed and an event will be emitted on the `storageEvents$` observable.

```typescript
import { NgxStorageService } from '@studiohyperdrive/ngx-utils';

export class YourComponent {
	constructor(private storageService: NgxStorageService) {
		storageService.localStorage.setItem('Hello', { world: true });
		storageService.sessionStorage.setItem('Hello', { world: true });
	}
}
```

### storageEvents$

The `storageEvents$` property is an Observable that will emit a `NgxStorageEvent` whenever the session- or localStorage was updated (set or remove) or cleared.

```typescript
import { NgxStorageService } from '@studiohyperdrive/ngx-utils';

export class YourComponent {
	constructor(private storageService: NgxStorageService) {
		storageService.storageEvent$.subscribe(console.log);
		// logs: {type: 'update', oldValue: undefined, newValue: {world: true}, key: 'Hello', storage: 'local'}
		storageService.localStorage.setItem('Hello', { world: true });
	}
}
```
