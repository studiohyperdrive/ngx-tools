import { Component } from '@angular/core';
import { JoinPipe } from '@ngx/utils';

@Component({
	standalone: true,
	imports: [JoinPipe],
	selector: 'join-demo',
	templateUrl: 'join.demo.component.html',
})
export class JoinPipeDemoComponent {
	public array = ['a', 'b', 'c'];
}
