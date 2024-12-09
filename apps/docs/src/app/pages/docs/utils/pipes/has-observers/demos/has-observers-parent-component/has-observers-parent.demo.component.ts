import { Component } from '@angular/core';
import { NgDocNotifyService } from '@ng-doc/ui-kit';
import { HasObserversPipeDemoComponent } from '../has-observers-component/has-observers.demo.component';

@Component({
	imports: [HasObserversPipeDemoComponent],
	selector: 'has-observer-parent-demo-component',
	templateUrl: 'has-observers-parent.demo.component.html',
})
export class HasObserversPipeDemoParentComponent {
	constructor(private readonly notifyService: NgDocNotifyService) {}

	public doSomething(event: any): void {
		this.notifyService.notify(event);
	}
}
