import { Component } from '@angular/core';
import { MergeArraysPipe } from '@ngx/utils';

@Component({
	standalone: true,
	imports: [MergeArraysPipe],
	selector: 'merge-arrays-demo',
	templateUrl: 'merge-arrays.demo.component.html',
})
export class MergeArraysPipeDemoComponent {
	sourceArray = ['a', 'b', 'c'];
	firstArray = ['d', 'e', 'f'];
	secondArray = ['g', 'h', 'i'];
}
