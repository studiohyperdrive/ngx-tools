import { Component } from '@angular/core';
import { HighlightPipe } from '@ngx/utils';

@Component({
    imports: [HighlightPipe],
    selector: 'highlight-pipe-demo',
    templateUrl: 'highlight.demo.component.html'
})
export class HighlightPipeDemoComponent {
	public value = 'In this p there is a text to highlight.';
}
