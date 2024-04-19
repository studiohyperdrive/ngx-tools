import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { NgxMediaQueryService } from '@ngx/utils';
import { NgxModalService } from '@ngx/inform';
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
	standalone: true,
	imports: [
		RouterModule,
		CommonModule,
		NgxConfigurableLayoutComponent,
		NgxConfigurableLayoutItemComponent,
		ReactiveFormsModule,
		NgxDynamicLayoutComponent,
		NgxDynamicLayoutItemComponent,
	],
})
export class AppComponent {
	constructor(
		private readonly mediaService: NgxMediaQueryService,
		private readonly modalService: NgxModalService
	) {
		// Wouter: To see these in action, navigate to '/queries' in the browser
		this.mediaService.registerMediaQueries(
			['small', '(max-width: 500px)'],
			['medium', '(max-width: 600px)'],
			['large', '(max-width: 700px)']
		);
	}

	public sayHello(): void {
		this.modalService
			.open({
				component: ModalComponent,
				label: 'Modal',
				role: 'dialog',
				panelClass: 'modal-panel',
			})
			.pipe(
				tap((action) => {
					if (action === 'Test') {
						console.log('Hello!');
					}
				})
			)
			.subscribe();
	}

	confirm(): void {
		this.modalService
			.open<{
				type: 'Confirm';
				data: string;
			}>({
				type: 'confirm',
				describedById: 'id',
				labelledById: 'hello',
			})
			.pipe(
				tap((value) => {
					console.log(value);
				})
			)
			.subscribe();
	}

	public control: FormControl<NgxConfigurableLayoutGrid> = new FormControl([]);
	public isActive: FormControl<boolean> = new FormControl(false);
	public dragAndDrop: FormControl<boolean> = new FormControl(true);
	public dynamicLayoutData: NgxDynamicLayoutData[] = [
		{
			id: 'container-1',
			isContainer: true,
			children: [
				{
					id: 'container-2',
					isContainer: true,
					children: [
						{
							id: 'b1',
							key: 'b',
							isContainer: false,
							data: [
								{
									hello: 'iben',
								},
							],
						},
						{
							id: 'b2',
							key: 'b',
							isContainer: false,
							data: [
								{
									hello: 'iben',
								},
							],
						},
					],
				},
				{
					id: 'a1',
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
			id: 'a2',
			key: 'a',
			isContainer: false,
			data: [
				{
					hello: 'world',
				},
			],
		},
		{
			id: 'a3',
			key: 'a',
			isContainer: false,
			data: [
				{
					hello: 'test',
				},
			],
		},
		{
			id: 'a4',
			key: 'b',
			isContainer: false,
			data: [
				{
					hello: 'iben',
				},
			],
		},
	];
	public isEditable: FormControl<boolean> = new FormControl<boolean>(true);

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
