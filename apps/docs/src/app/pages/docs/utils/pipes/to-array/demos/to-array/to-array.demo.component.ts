import { Component } from '@angular/core';
import { ToArrayPipe } from '@ngx/utils';

@Component({
	imports: [ToArrayPipe],
	selector: 'to-array-demo',
	templateUrl: 'to-array.demo.component.html',
})
export class ToArrayPipeDemoComponent {
	public sourceValue = 'Foo Bar';
}
