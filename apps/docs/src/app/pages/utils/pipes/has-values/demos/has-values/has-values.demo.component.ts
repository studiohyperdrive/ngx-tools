import { Component } from '@angular/core';
import { HasValuesPipe } from '@ngx/utils';

@Component({
	standalone: true,
	imports: [HasValuesPipe],
	selector: 'has-values-demo',
	templateUrl: 'has-values.demo.component.html',
})
export class HasValuesPipeDemoComponent {
	emptyObject = {};
	object = { foo: 'bar' };
}
