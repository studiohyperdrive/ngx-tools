import { Component } from '@angular/core';
import { ToArrayPipe } from '@ngx/utils';
import {JsonPipe} from "@angular/common";

@Component({
	imports: [ToArrayPipe, JsonPipe],
	selector: 'to-array-demo',
	templateUrl: 'to-array.demo.component.html',
})
export class ToArrayPipeDemoComponent {
	public sourceValue = 'Foo Bar';
}
