import { Component } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
	NgxConfigurableLayoutComponent,
	NgxConfigurableLayoutItemComponent,
	NgxConfigurableLayoutGrid,
	NgxConfigurableLayoutItemDropEvent,
	NgxDisplayContentDirective,
} from '@ngx/layout';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	standalone: true,
	imports: [
		NgxConfigurableLayoutComponent,
		NgxConfigurableLayoutItemComponent,
		ReactiveFormsModule,
		NgxDisplayContentDirective,
	],
})
export class AppComponent {
	public control: FormControl<NgxConfigurableLayoutGrid> = new FormControl([]);
	public isActive: FormControl<boolean> = new FormControl(false);
	public dragAndDrop: FormControl<boolean> = new FormControl(true);
	public form: FormGroup = new FormGroup({
		loading: new FormControl<boolean>(false),
		offline: new FormControl<boolean>(false),
		error: new FormControl<boolean>(false),
	});

	ngOnInit() {
		this.control.patchValue([
			[
				{ key: '1', isActive: true },
				{ key: '2', isActive: true },
				{ key: 'a', isActive: false },
			],
			[{ key: 'b', isActive: true }],
		]);
	}

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
