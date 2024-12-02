# HasObserversPipe

The HasObserversPipe will check if an Output property has observers.

## How to use

```angular2html
<span>
  {{ somethingHasCompleted | hasObservers }}
</span>
```

```typescript
@Component({
	templateUrl: './my-component.component.html',
	selector: 'my-component',
})
export class MyComponent {
	@Ouput() public somethingHasCompleted: EventEmitter<boolean> = EventEmitter<boolean>();
}
```

If a parent subscribes to the EventEmitter, hasObservers will return true

```angular2html
<my-component
    (somethingHasCompleted)="doSomething($event)"
/>
```
