import { Component } from '@angular/core';
import { NgxHighlightPipe } from '@ngx/utils';

@Component({
	imports: [NgxHighlightPipe],
	selector: 'highlight-pipe-demo',
	templateUrl: 'highlight.demo.component.html',
})
export class HighlightPipeDemoComponent {
	public value = 'In this p there is a text to highlight.';
}
