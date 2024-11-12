import { Component } from '@angular/core';
import { HasValuesPipe } from '@ngx/utils';

@Component({
	standalone: true,
	imports: [HasValuesPipe],
	selector: 'has-values-demo',
	templateUrl: 'has-values.demo.component.html',
})
export class HasValuesPipeDemoComponent {
	public emptyObject = {};
	public object = { foo: 'bar' };
}
