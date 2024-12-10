import { Component } from '@angular/core';
import { JoinPipe } from '@ngx/utils';
import {JsonPipe} from "@angular/common";

@Component({
	imports: [JoinPipe, JsonPipe],
	selector: 'join-demo',
	templateUrl: 'join.demo.component.html',
})
export class JoinPipeDemoComponent {
	public array = ['a', 'b', 'c'];
}
