import { Component } from '@angular/core';
import { LimitToPipe } from '@ngx/utils';

@Component({
	imports: [LimitToPipe],
	selector: 'limit-to-demo',
	templateUrl: 'limit-to.demo.component.html',
})
export class LimitToPipeDemoComponent {
	public array = ['a', 'b', 'c'];
}
