import { Component } from '@angular/core';
import { LogPipe } from '@ngx/utils';

@Component({
	standalone: true,
	imports: [LogPipe],
	selector: 'log-demo',
	templateUrl: 'log.demo.component.html',
})
export class LogPipeDemoComponent {
	value = 'Hello, World!';
}
