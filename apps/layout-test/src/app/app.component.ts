import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
	NgxConfigurableLayoutComponent,
	NgxConfigurableLayoutItemComponent,
	NgxConfigurableLayoutGrid,
	NgxConfigurableLayoutItemDropEvent,
	NgxDynamicLayoutData,
	NgxDynamicLayoutComponent,
	NgxDynamicLayoutItemComponent,
} from '@ngx/layout';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	standalone: true,
	imports: [
		CommonModule,
		NgxConfigurableLayoutComponent,
		NgxConfigurableLayoutItemComponent,
		ReactiveFormsModule,
		NgxDynamicLayoutComponent,
		NgxDynamicLayoutItemComponent,
	],
})
export class AppComponent {
	public control: FormControl<NgxConfigurableLayoutGrid> = new FormControl([]);
	public isActive: FormControl<boolean> = new FormControl(false);
	public dragAndDrop: FormControl<boolean> = new FormControl(true);
	public dynamicLayoutData: NgxDynamicLayoutData[] = [
		{
			id: 'container-1',
			isContainer: true,
			children: [
				{
					key: 'a',
					isContainer: false,
					data: [
						{
							hello: 'world',
						},
					],
				},
				{
					key: 'a',
					isContainer: false,
					data: [
						{
							hello: 'test',
						},
					],
				},
			],
		},
		{
			key: 'a',
			isContainer: false,
			data: [
				{
					hello: 'world',
				},
			],
		},
		{
			key: 'a',
			isContainer: false,
			data: [
				{
					hello: 'test',
				},
			],
		},
		{
			key: 'b',
			isContainer: false,
			data: [
				{
					hello: 'iben',
				},
			],
		},
	];
	public isEditable: FormControl<boolean> = new FormControl<boolean>(false);

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
