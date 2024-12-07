import { Component } from '@angular/core';
import { IsNotEmptyPipe } from '@ngx/utils';

@Component({
    imports: [IsNotEmptyPipe],
    selector: 'is-not-empty-demo',
    templateUrl: 'is-not-empty.demo.component.html'
})
export class IsNotEmptyPipeDemoComponent {
	sourceValue = {};
}
