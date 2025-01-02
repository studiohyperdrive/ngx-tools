import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { JoinPipe } from '@ngx/utils';

@Component({
	imports: [JoinPipe, JsonPipe],
	selector: 'join-demo',
	templateUrl: 'join.demo.component.html',
})
export class JoinPipeDemoComponent {
	public array = ['a', 'b', 'c'];
}
