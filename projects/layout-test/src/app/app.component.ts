import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
	NgxConfigurableLayoutComponent,
	NgxConfigurableLayoutGrid,
	NgxConfigurableLayoutItemComponent,
} from 'projects/layout/src/public-api';

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
	],
})
export class AppComponent {
	public control: FormControl<NgxConfigurableLayoutGrid> = new FormControl([
		[
			{ key: '1', isActive: true },
			{ key: '2', isActive: true },
			{ key: 'a', isActive: false },
		],
		[{ key: 'b', isActive: true }],
	]);
	public isActive: FormControl<boolean> = new FormControl(false);
	public dragAndDrop: FormControl<boolean> = new FormControl(false);
}
