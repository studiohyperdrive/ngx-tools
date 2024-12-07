import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BtwPipe } from '@ngx/utils';

@Component({
    selector: 'btw-pipe-demo',
    imports: [BtwPipe],
    templateUrl: './btw-pipe.demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BtwPipeDemoComponent {
	@Input()
	public vatNumber: string = '474603875';
}
