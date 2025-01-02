import { Component } from '@angular/core';
import { LogPipe } from '@ngx/utils';

@Component({
	imports: [LogPipe],
	selector: 'log-demo',
	templateUrl: 'log.demo.component.html',
})
export class LogPipeDemoComponent {
	public value = 'Hello, World!';
}
