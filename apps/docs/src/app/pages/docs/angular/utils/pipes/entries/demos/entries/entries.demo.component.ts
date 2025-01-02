import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { EntriesPipe } from '@ngx/utils';

@Component({
	imports: [EntriesPipe, JsonPipe],
	selector: 'entries-demo',
	templateUrl: 'entries.demo.component.html',
})
export class EntriesPipeDemoComponent {
	public object = {
		message: 'Like and subscribe!',
		url: 'youtube.com/@Iben',
	};
}
