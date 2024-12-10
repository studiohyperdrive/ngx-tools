import { Component } from '@angular/core';
import { EntriesPipe } from '@ngx/utils';
import {JsonPipe} from "@angular/common";

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
