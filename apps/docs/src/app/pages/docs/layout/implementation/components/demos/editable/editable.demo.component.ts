import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
	NgxConfigurableLayoutComponent,
	NgxConfigurableLayoutGrid,
	NgxConfigurableLayoutItemComponent,
} from '@ngx/layout';

@Component({
	standalone: true,
	imports: [
		NgxConfigurableLayoutComponent,
		NgxConfigurableLayoutItemComponent,
		ReactiveFormsModule,
	],
	selector: 'layout-editable-demo-name',
	templateUrl: 'editable.demo.component.html',
})
export class LayoutEditableDemoComponent {
	public readonly control: FormControl<NgxConfigurableLayoutGrid | null> = new FormControl([
		[
			{ key: 'second-item', isActive: true },
			{ key: 'first-item', isActive: false },
		],
	]);
}
