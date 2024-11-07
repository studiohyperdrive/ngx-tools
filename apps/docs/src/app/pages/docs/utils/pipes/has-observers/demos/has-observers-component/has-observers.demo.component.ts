import { Component, EventEmitter, Output } from '@angular/core';
import { HasObserversPipe } from '@ngx/utils';

@Component({
	standalone: true,
	imports: [HasObserversPipe],
	templateUrl: './has-observers.demo.component.html',
	selector: 'has-observers-demo-component',
})
export class HasObserversPipeDemoComponent {
	@Output() public somethingHasCompleted: EventEmitter<boolean> = new EventEmitter<boolean>();
}
