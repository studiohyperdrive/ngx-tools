import { Component } from '@angular/core';
import { NgDocNotifyService } from '@ng-doc/ui-kit';
import { FocusClickDirective } from '@ngx/utils';

@Component({
    imports: [FocusClickDirective],
    selector: 'click-focus-demo',
    templateUrl: 'click-focus.demo.component.html'
})
export class ClickFocusDemoComponent {
	constructor(private readonly notifyService: NgDocNotifyService) {}

	public doSomething(): void {
		this.notifyService.notify('Done something');
	}
}
