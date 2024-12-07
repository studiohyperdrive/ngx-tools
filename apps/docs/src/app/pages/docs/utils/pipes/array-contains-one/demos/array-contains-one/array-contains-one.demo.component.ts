import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArrayContainsOnePipe } from '@ngx/utils';

@Component({
    selector: 'array-contains-one-pipe-demo',
    imports: [ArrayContainsOnePipe],
    templateUrl: './array-contains-one.demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrayContainsOnePipeDemoComponent {
	@Input() public checkProperty: string = 'description';
}
