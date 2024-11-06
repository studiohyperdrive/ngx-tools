import { Component, OnInit } from '@angular/core';
import { NgDocNotifyService } from '@ng-doc/ui-kit';
import { FocusClickDirective } from '@ngx/utils';

@Component({
	standalone: true,
	imports: [FocusClickDirective],
	selector: 'click-focus-demo',
	templateUrl: 'click-focus.demo.component.html',
})
export class ClickFocusDemoComponent {
	constructor(private readonly notifyService: NgDocNotifyService) {}

	doSomething() {
		this.notifyService.notify('Done something');
	}
}
