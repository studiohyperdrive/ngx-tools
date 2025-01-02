import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LimitToPipe } from '@ngx/utils';

@Component({
	imports: [LimitToPipe],
	selector: 'limit-to-demo',
	templateUrl: 'limit-to.demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LimitToPipeDemoComponent {
	@Input() public limit = 2;

	public array = ['a', 'b', 'c', 'd', 'e', 'f'];
}
