import { Component } from '@angular/core';
import { UniqByPipe } from '@ngx/utils';

@Component({
	standalone: true,
	imports: [UniqByPipe],
	selector: 'unique-by-demo',
	templateUrl: 'unique-by.demo.component.html',
})
export class UniqueByPipeDemoComponent {
	array = [
		{ prop1: 'a', prop2: true },
		{ prop1: 'a', prop2: false },
		{ prop1: 'b', prop2: true },
	];
}
