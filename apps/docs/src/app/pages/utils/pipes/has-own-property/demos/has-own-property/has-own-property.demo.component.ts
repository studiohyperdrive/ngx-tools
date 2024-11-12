import { Component } from '@angular/core';
import { HasOwnProperty } from '@ngx/utils';

@Component({
	standalone: true,
	imports: [HasOwnProperty],
	selector: 'has-own-property-demo',
	templateUrl: 'has-own-property.demo.component.html',
})
export class HasOwnPropertyPipeDemoComponent {
	public sourceObject = { property: 'test' };
}
