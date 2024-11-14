import { Component } from '@angular/core';
import { TransformPipe } from '@ngx/utils';

@Component({
	standalone: true,
	imports: [TransformPipe],
	selector: 'transform-demo',
	templateUrl: 'transform.demo.component.html',
})
export class TransformPipeDemoComponent {
	public value = 'Foo Bar';

	public toUpperCase(text: string): string {
		return text.toUpperCase();
	}
}
