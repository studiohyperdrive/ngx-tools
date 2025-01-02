import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HasOwnProperty } from '@ngx/utils';

@Component({
	imports: [HasOwnProperty],
	selector: 'has-own-property-demo',
	templateUrl: 'has-own-property.demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HasOwnPropertyPipeDemoComponent {
	@Input() public checkProperty: string = 'property';

	public sourceObject = { property: 'test' };
}
