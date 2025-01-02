import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ToArrayPipe } from '@ngx/utils';

@Component({
	imports: [ToArrayPipe, JsonPipe],
	selector: 'to-array-demo',
	templateUrl: 'to-array.demo.component.html',
})
export class ToArrayPipeDemoComponent {
	public sourceValue = 'Foo Bar';
}
