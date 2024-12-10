import { Component } from '@angular/core';
import { CleanArrayPipe } from '@ngx/utils';
import {JsonPipe} from "@angular/common";

@Component({
	imports: [CleanArrayPipe, JsonPipe],
	selector: 'clean-array-demo',
	templateUrl: 'clean-array.demo.component.html',
})
export class CleanArrayPipeDemoComponent {
	public array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, null, undefined, 0, '', ' ', false, NaN];
}
