import { Component } from '@angular/core';
import { TruncateTextPipe } from '@ngx/utils';

@Component({
	standalone: true,
	imports: [TruncateTextPipe],
	selector: 'truncate-text-demo',
	templateUrl: 'truncate-text.demo.component.html',
})
export class TruncateTextPipeDemoComponent {
	value = 'Long text that will need to be cut at 10 characters.';
}
