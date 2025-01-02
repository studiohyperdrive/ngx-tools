// snippet-from-file="../app.config.ts" "Application Config"
// snippet-from-file="../drag-and-drop.service.ts" "drag-and-drop.service.ts"

// snippet#component "Typescript"
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
	NgxConfigurableLayoutComponent,
	NgxConfigurableLayoutGrid,
	NgxConfigurableLayoutItemComponent,
	NgxConfigurableLayoutItemDropEvent,
} from '@ngx/layout';

@Component({
	imports: [
		NgxConfigurableLayoutComponent,
		NgxConfigurableLayoutItemComponent,
		ReactiveFormsModule,
	],
	selector: 'layout-editable-demo',
	styleUrl: './editable.demo.component.scss',
	templateUrl: './editable.demo.component.html',
})
export class LayoutEditableDemoComponent {
	public readonly control: FormControl<NgxConfigurableLayoutGrid> = new FormControl([
		[
			{ key: '1', isActive: true },
			{ key: '2', isActive: true },
			{ key: 'a', isActive: false },
		],
		[{ key: 'b', isActive: true }],
	]);
	public readonly isActive: FormControl<boolean> = new FormControl(false);
	public readonly dragAndDrop: FormControl<boolean> = new FormControl(true);

	drop(event: NgxConfigurableLayoutItemDropEvent): boolean {
		if (event.eventType == 'sorting') {
			return true;
		}

		const grid = event.showInactive
			? event.currentGrid
			: [...event.currentGrid].map((row) => row.filter((item) => item.isActive));

		return grid[event.targetRowIndex].length < 2;
	}
}
// snippet#component
