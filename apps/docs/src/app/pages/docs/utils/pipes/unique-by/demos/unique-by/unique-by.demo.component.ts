import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { UniqByPipe } from '@ngx/utils';
import { JsonPipe } from "@angular/common";

@Component({
	imports: [UniqByPipe, JsonPipe],
	selector: 'unique-by-demo',
	templateUrl: 'unique-by.demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniqueByPipeDemoComponent {
	@Input() public checkProperty: string = 'prop1';

	public array = [
		{ prop1: 'a', prop2: true },
		{ prop1: 'a', prop2: false },
		{ prop1: 'b', prop2: true },
	];
}
