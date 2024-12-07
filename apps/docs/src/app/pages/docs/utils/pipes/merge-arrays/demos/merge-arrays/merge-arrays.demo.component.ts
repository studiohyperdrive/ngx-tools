import { Component } from '@angular/core';
import { MergeArraysPipe } from '@ngx/utils';

@Component({
    imports: [MergeArraysPipe],
    selector: 'merge-arrays-demo',
    templateUrl: 'merge-arrays.demo.component.html'
})
export class MergeArraysPipeDemoComponent {
	public sourceArray = ['a', 'b', 'c'];
	public firstArray = ['d', 'e', 'f'];
	public secondArray = ['g', 'h', 'i'];
}
