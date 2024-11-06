import { Component } from '@angular/core';
import { TransformPipe } from '@ngx/utils';

@Component({
	standalone: true,
	imports: [TransformPipe],
	selector: 'transform-demo',
	templateUrl: 'transform.demo.component.html',
})
export class TransformPipeDemoComponent {
	value = 'Foo Bar';

	toUpperCase(text: string) {
		return text.toUpperCase();
	}
}
